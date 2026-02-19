// services/ai-orchestrator.ts
// Hybrid AI Orchestrator — Production-Ready
// Features: Circuit Breaker, Retry with Backoff, Health Monitoring, Cost Tracking, Auto-Healing

import {
  getProvidersForTask,
  getProviderById,
  type AITask,
  type AIProvider,
  type ProviderConfig,
} from './ai-providers';
import { getData, saveData, STORES } from './dbService';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AIRequest {
  task: AITask;
  input: any;
  options?: AIRequestOptions;
}

export interface AIRequestOptions {
  language?: string;
  style?: string;
  context?: string;
  userId?: string;
  forceProvider?: AIProvider;
  sourceLanguage?: string;
  targetLanguage?: string;
  mimeType?: string;
  voiceName?: string;
  speakingRate?: number;
  withPlagiarism?: boolean;
  skipCache?: boolean;
  maxRetries?: number;
  [key: string]: any;
}

export interface AIResponse {
  success: boolean;
  provider: string;
  providerId?: AIProvider | 'cache' | 'none';
  result: any;
  latency: number;
  cached: boolean;
  error?: string;
  fallbackUsed: boolean;
  attemptCount: number;
  totalCost: number;  // estimasi USD
}

// ─── Circuit Breaker State ────────────────────────────────────────────────────

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface ProviderHealth {
  // Circuit breaker
  circuitState: CircuitState;
  consecutiveErrors: number;
  lastErrorTime: number;
  halfOpenTestTime: number;

  // Metrics
  successCount: number;
  errorCount: number;
  totalLatency: number;
  lastLatency: number;

  // Error classification
  lastErrorType: 'network' | 'rateLimit' | 'serverError' | 'timeout' | 'unknown' | null;
  rateLimitResetTime: number;  // epoch ms kapan rate limit expired
}

// Circuit breaker thresholds
const CIRCUIT_OPEN_THRESHOLD = 3;       // error berturut-turut sebelum OPEN
const CIRCUIT_HALF_OPEN_DELAY = 60_000; // 1 menit sebelum coba lagi (HALF_OPEN)
const RATE_LIMIT_BACKOFF = 60_000;      // 1 menit backoff jika rate-limited

// ─── Main Orchestrator ────────────────────────────────────────────────────────

export class AIOrchestrator {
  private static instance: AIOrchestrator;
  private health = new Map<AIProvider, ProviderHealth>();
  private sessionCost = 0;  // total cost session ini dalam USD

  private constructor() {
    this.initHealth();
  }

  static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  private initHealth(): void {
    const providers: AIProvider[] = ['gemini', 'deepseek', 'groq', 'huggingface', 'webspeech'];
    providers.forEach(id => {
      this.health.set(id, {
        circuitState: 'CLOSED',
        consecutiveErrors: 0,
        lastErrorTime: 0,
        halfOpenTestTime: 0,
        successCount: 0,
        errorCount: 0,
        totalLatency: 0,
        lastLatency: 0,
        lastErrorType: null,
        rateLimitResetTime: 0,
      });
    });
  }

  // ─── Main Execute ──────────────────────────────────────────────────────────

  async execute(request: AIRequest): Promise<AIResponse> {
    const { task, input, options = {} } = request;
    const maxRetries = options.maxRetries ?? 1;

    // 1. Check cache (kecuali diminta skip)
    if (!options.skipCache) {
      const cacheKey = this.makeCacheKey(task, input, options);
      const cached = await this.readCache(cacheKey);
      if (cached) {
        return {
          success: true,
          provider: 'cache',
          providerId: 'cache',
          result: cached,
          latency: 0,
          cached: true,
          fallbackUsed: false,
          attemptCount: 0,
          totalCost: 0,
        };
      }
    }

    // 2. Pilih providers
    let providers = getProvidersForTask(task);

    if (options.forceProvider) {
      const forced = getProviderById(options.forceProvider);
      if (forced) providers = [forced];
    }

    // Filter provider yang bisa dipakai sekarang
    const available = providers.filter(p => this.canUseProvider(p.id));

    if (available.length === 0) {
      return this.failResponse('Semua AI provider sedang tidak tersedia. Coba lagi dalam beberapa menit.');
    }

    // 3. Coba setiap provider dengan retry
    let attemptCount = 0;
    let lastError = '';

    for (const provider of available) {
      const retriesForProvider = provider.retryable ? maxRetries : 1;

      for (let attempt = 0; attempt < retriesForProvider; attempt++) {
        attemptCount++;

        // Exponential backoff untuk retry
        if (attempt > 0) {
          await this.sleep(Math.pow(2, attempt) * 500);
        }

        try {
          console.log(`🔄 [${provider.name}] Task: ${task} | Attempt: ${attempt + 1}/${retriesForProvider}`);

          const startTime = Date.now();
          const result = await this.callWithTimeout(provider, task, input, options);
          const latency = Date.now() - startTime;

          // Sukses!
          this.recordSuccess(provider.id, latency);

          // Cache hasilnya
          if (!options.skipCache) {
            const cacheKey = this.makeCacheKey(task, input, options);
            await this.writeCache(cacheKey, result);
          }

          const cost = this.estimateCost(provider, input);
          this.sessionCost += cost;

          return {
            success: true,
            provider: provider.name,
            providerId: provider.id,
            result,
            latency,
            cached: false,
            fallbackUsed: provider.priority > 1,
            attemptCount,
            totalCost: cost,
          };

        } catch (err: any) {
          lastError = err.message || 'Unknown error';
          const errType = this.classifyError(err);

          console.warn(`❌ [${provider.name}] Attempt ${attempt + 1} gagal: ${lastError} (${errType})`);
          this.recordError(provider.id, errType, err);

          // Jika rate-limited, langsung pindah provider (jangan retry)
          if (errType === 'rateLimit') break;
        }
      }
    }

    // 4. Semua gagal
    console.error(`💥 Semua provider gagal untuk task "${task}". Last error: ${lastError}`);
    return {
      ...this.failResponse(`Semua AI provider gagal. Pesan: ${lastError}`),
      attemptCount,
    };
  }

  // ─── Convenience Methods ───────────────────────────────────────────────────

  async analyzeGrammar(
    text: string,
    style: string,
    context: string,
    targetLang: string,
    userId?: string
  ): Promise<AIResponse> {
    return this.execute({
      task: 'grammar',
      input: text,
      options: { language: targetLang, style, context, userId },
    });
  }

  async generateTTS(
    text: string,
    languageName: string,
    context: 'greeting' | 'story' | 'pronunciation' = 'greeting',
    userId?: string
  ): Promise<AIResponse> {
    return this.execute({
      task: 'tts',
      input: text,
      options: { language: languageName, context, userId },
    });
  }

  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage = 'Bahasa Indonesia',
    userId?: string
  ): Promise<AIResponse> {
    return this.execute({
      task: 'translation',
      input: text,
      options: { language: targetLanguage, sourceLanguage, userId },
    });
  }

  // ─── Circuit Breaker Logic ─────────────────────────────────────────────────

  /**
   * Apakah provider ini boleh dipakai sekarang?
   * Implementasi Circuit Breaker pattern
   */
  private canUseProvider(id: AIProvider): boolean {
    // WebSpeech selalu bisa (browser built-in)
    if (id === 'webspeech') return true;

    const h = this.health.get(id);
    if (!h) return true;

    const now = Date.now();

    // Rate limit belum habis
    if (h.rateLimitResetTime > now) {
      console.log(`⏳ [${id}] Rate-limited, reset in ${Math.round((h.rateLimitResetTime - now) / 1000)}s`);
      return false;
    }

    switch (h.circuitState) {
      case 'CLOSED':
        // Normal — boleh dipakai
        return true;

      case 'OPEN':
        // Circuit terbuka — cek apakah sudah waktunya HALF_OPEN
        if (now - h.lastErrorTime >= CIRCUIT_HALF_OPEN_DELAY) {
          h.circuitState = 'HALF_OPEN';
          h.halfOpenTestTime = now;
          console.log(`🔁 [${id}] Circuit HALF_OPEN — test request diizinkan`);
          return true;
        }
        console.log(`🚫 [${id}] Circuit OPEN — skip provider`);
        return false;

      case 'HALF_OPEN':
        // Izinkan satu test request
        return true;

      default:
        return true;
    }
  }

  private recordSuccess(id: AIProvider, latency: number): void {
    const h = this.health.get(id);
    if (!h) return;

    h.successCount++;
    h.consecutiveErrors = 0;
    h.totalLatency += latency;
    h.lastLatency = latency;
    h.lastErrorType = null;

    // Tutup circuit jika HALF_OPEN berhasil
    if (h.circuitState === 'HALF_OPEN') {
      h.circuitState = 'CLOSED';
      console.log(`✅ [${id}] Circuit CLOSED kembali — provider sehat`);
    }
  }

  private recordError(id: AIProvider, errType: ProviderHealth['lastErrorType'], err: any): void {
    const h = this.health.get(id);
    if (!h) return;

    h.errorCount++;
    h.consecutiveErrors++;
    h.lastErrorTime = Date.now();
    h.lastErrorType = errType;

    // Rate limit: set reset timer
    if (errType === 'rateLimit') {
      h.rateLimitResetTime = Date.now() + RATE_LIMIT_BACKOFF;
      console.warn(`⚡ [${id}] Rate-limited. Backoff ${RATE_LIMIT_BACKOFF / 1000}s`);
    }

    // Circuit Breaker: buka jika error berturut-turut
    if (h.consecutiveErrors >= CIRCUIT_OPEN_THRESHOLD) {
      h.circuitState = 'OPEN';
      console.error(`🔴 [${id}] Circuit OPEN — terlalu banyak error. Auto-recovery in ${CIRCUIT_HALF_OPEN_DELAY / 1000}s`);
    }

    // Jika HALF_OPEN test gagal, kembalikan ke OPEN
    if (h.circuitState === 'HALF_OPEN') {
      h.circuitState = 'OPEN';
      h.lastErrorTime = Date.now();
      console.warn(`🔄 [${id}] HALF_OPEN test gagal — kembali ke OPEN`);
    }
  }

  private classifyError(err: any): ProviderHealth['lastErrorType'] {
    const msg = (err?.message || '').toLowerCase();
    const status = err?.status || err?.statusCode || 0;

    if (status === 429 || msg.includes('rate limit') || msg.includes('quota')) return 'rateLimit';
    if (status >= 500 || msg.includes('server error') || msg.includes('internal')) return 'serverError';
    if (msg.includes('timeout') || msg.includes('timed out') || err?.name === 'AbortError') return 'timeout';
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) return 'network';
    return 'unknown';
  }

  // ─── HTTP call dengan timeout ──────────────────────────────────────────────

  private async callWithTimeout(
    provider: ProviderConfig,
    task: AITask,
    input: any,
    options: AIRequestOptions
  ): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), provider.timeoutMs);

    try {
      const response = await fetch('/.netlify/functions/ai-gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          provider: provider.id,
          task,
          input,
          options,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        let errBody: any = {};
        try { errBody = await response.json(); } catch { /* ignore */ }

        const err: any = new Error(errBody.error || `HTTP ${response.status}`);
        err.status = response.status;
        throw err;
      }

      const data = await response.json();

      if (!data.success) {
        const err: any = new Error(data.error || 'Provider returned failure');
        err.status = data.statusCode || 0;
        throw err;
      }

      return provider.parseResponse(data.data, task);
    } finally {
      clearTimeout(timer);
    }
  }

  // ─── Cache ─────────────────────────────────────────────────────────────────

  private makeCacheKey(task: AITask, input: any, options: AIRequestOptions): string {
    const inputStr = typeof input === 'string' ? input : JSON.stringify(input);
    // Exclude userId dan skipCache dari cache key
    const { userId, skipCache, ...stableOptions } = options;
    const optStr = JSON.stringify(stableOptions);
    return `orchcache_${task}_${this.hash(inputStr + optStr)}`;
  }

  private async readCache(key: string): Promise<any | null> {
    try {
      const entry = await getData(STORES.CACHE, key);
      if (!entry) return null;
      // Check expired (TTL 1 jam)
      if (entry.expiresAt && Date.now() > entry.expiresAt) return null;
      console.log(`💾 Cache hit: ${key}`);
      return entry.data;
    } catch {
      return null;
    }
  }

  private async writeCache(key: string, data: any): Promise<void> {
    try {
      await saveData(STORES.CACHE, key, {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + 3_600_000, // 1 jam
      });
    } catch {
      // Cache failure jangan crash app
    }
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private hash(str: string): string {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h).toString(36);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }

  private estimateCost(provider: ProviderConfig, input: any): number {
    // Rough token estimate: 1 token ≈ 4 karakter
    const chars = typeof input === 'string' ? input.length : JSON.stringify(input).length;
    const tokens = chars / 4;
    return (tokens / 1000) * provider.costPerRequest;
  }

  private failResponse(error: string): AIResponse {
    return {
      success: false,
      provider: 'none',
      providerId: 'none',
      result: null,
      latency: 0,
      cached: false,
      error,
      fallbackUsed: true,
      attemptCount: 0,
      totalCost: 0,
    };
  }

  // ─── Monitoring & Stats ────────────────────────────────────────────────────

  /**
   * Get health dashboard semua provider
   */
  getSystemStats(): Record<string, any> {
    const stats: Record<string, any> = {
      sessionCostUSD: this.sessionCost.toFixed(6),
      providers: {},
    };

    this.health.forEach((h, id) => {
      const total = h.successCount + h.errorCount;
      const avgLatency = h.successCount > 0 ? Math.round(h.totalLatency / h.successCount) : 0;
      const errorRate = total > 0 ? ((h.errorCount / total) * 100).toFixed(1) : '0.0';

      // Status label yang mudah dibaca
      let status = '🟢 Sehat';
      if (h.circuitState === 'OPEN') status = '🔴 Down (Circuit Open)';
      else if (h.circuitState === 'HALF_OPEN') status = '🟡 Pemulihan';
      else if (h.rateLimitResetTime > Date.now()) status = '⚡ Rate Limited';
      else if (h.consecutiveErrors > 0) status = '🟠 Tidak stabil';

      stats.providers[id] = {
        status,
        circuitState: h.circuitState,
        successCount: h.successCount,
        errorCount: h.errorCount,
        errorRate: `${errorRate}%`,
        avgLatencyMs: avgLatency,
        lastLatencyMs: h.lastLatency,
        lastErrorType: h.lastErrorType,
        rateLimitEnds: h.rateLimitResetTime > Date.now()
          ? new Date(h.rateLimitResetTime).toLocaleTimeString()
          : null,
      };
    });

    return stats;
  }

  /**
   * Paksa reset circuit breaker untuk provider tertentu (untuk admin/debug)
   */
  resetProvider(id: AIProvider): void {
    const h = this.health.get(id);
    if (h) {
      h.circuitState = 'CLOSED';
      h.consecutiveErrors = 0;
      h.rateLimitResetTime = 0;
      console.log(`🔧 [${id}] Circuit breaker di-reset manual`);
    }
  }

  /**
   * Reset semua circuit breakers
   */
  resetAll(): void {
    this.health.forEach((_, id) => this.resetProvider(id));
  }

  /**
   * Get provider yang paling sehat dan termurah untuk task ini
   */
  getBestProvider(task: AITask): string {
    const { getProvidersForTask } = require('./ai-providers');
    const providers = getProvidersForTask(task) as ProviderConfig[];
    const available = providers.filter(p => this.canUseProvider(p.id));

    if (available.length === 0) return 'Tidak ada provider tersedia';

    // Urutkan: gratis dulu, lalu latency rendah
    const best = available.sort((a, b) => {
      if (a.costPerRequest !== b.costPerRequest) return a.costPerRequest - b.costPerRequest;
      const ha = this.health.get(a.id);
      const hb = this.health.get(b.id);
      const latA = ha && ha.successCount > 0 ? ha.totalLatency / ha.successCount : Infinity;
      const latB = hb && hb.successCount > 0 ? hb.totalLatency / hb.successCount : Infinity;
      return latA - latB;
    })[0];

    return best.name;
  }
}

// Singleton export
export const aiOrchestrator = AIOrchestrator.getInstance();