// services/secure-ai-client.ts
// Frontend AI client yang aman — production-ready
// Handles semua edge cases, memberikan pesan error yang user-friendly

import { aiOrchestrator } from './ai-orchestrator';
import type { AIResponse } from './ai-orchestrator';

// ─── Error Messages (bahasa Tara yang puitis) ─────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  rateLimit: 'Dahanku perlu istirahat sejenak, Sahabat. Coba lagi dalam beberapa menit ya.',
  network: 'Angin sedang tidak bersahabat hari ini. Periksa koneksi internetmu, lalu coba lagi.',
  serverError: 'Tara sedang tidak sehat, mohon bersabar dan coba lagi.',
  timeout: 'Naskahmu terlalu panjang untuk diproses sekarang. Coba penggal menjadi bagian lebih kecil.',
  allFailed: 'Semua jalan menuju Tara sedang tertutup. Coba lagi dalam beberapa saat.',
  invalidInput: 'Naskahmu tidak dapat diproses. Pastikan teks tidak kosong dan tidak terlalu panjang.',
  unknown: 'Sesuatu yang tak terduga terjadi. Coba lagi ya.',
};

// ─── Input Validation ─────────────────────────────────────────────────────────

function validateText(text: string, maxLength = 10_000): void {
  if (!text || typeof text !== 'string') {
    throw new Error(ERROR_MESSAGES.invalidInput);
  }
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error('Naskahmu masih kosong, Sahabat. Tuliskan sesuatu dulu ya.');
  }
  if (trimmed.length > maxLength) {
    throw new Error(`Naskahmu terlalu panjang (${trimmed.length} karakter). Maksimal ${maxLength} karakter.`);
  }
}

function validateAudio(base64: string): void {
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Data audio tidak valid.');
  }
  // Rough size check: base64 of 5MB audio ≈ 6.7M chars
  if (base64.length > 7_000_000) {
    throw new Error('Rekaman terlalu panjang. Maksimal 5 menit.');
  }
}

// ─── Response Handler ─────────────────────────────────────────────────────────

function handleFailedResponse(response: AIResponse): never {
  const error = response.error || ERROR_MESSAGES.allFailed;

  // Klasifikasi untuk pesan yang lebih tepat
  if (error.toLowerCase().includes('rate limit') || error.toLowerCase().includes('quota')) {
    throw new Error(ERROR_MESSAGES.rateLimit);
  }
  if (error.toLowerCase().includes('timeout')) {
    throw new Error(ERROR_MESSAGES.timeout);
  }
  if (error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')) {
    throw new Error(ERROR_MESSAGES.network);
  }

  throw new Error(error);
}

// ─── SecureAIClient ───────────────────────────────────────────────────────────

export class SecureAIClient {
  private userId: string;
  private requestCount = 0;
  private sessionStart = Date.now();

  constructor(userId?: string) {
    this.userId = userId || this.generateAnonymousId();
  }

  // ─── Grammar Analysis ────────────────────────────────────────────────────

  async analyzeGrammar(
    text: string,
    style = 'formal',
    context = 'general',
    targetLang = 'Bahasa Indonesia',
    withPlagiarism = false
  ): Promise<AIResponse> {
    validateText(text, 5_000);

    const response = await aiOrchestrator.execute({
      task: 'grammar',
      input: text,
      options: {
        language: targetLang,
        style,
        context,
        userId: this.userId,
        withPlagiarism,
      },
    });

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Text-to-Speech ──────────────────────────────────────────────────────

  async generateTTS(
    text: string,
    languageName = 'Bahasa Indonesia',
    context: 'greeting' | 'story' | 'pronunciation' = 'greeting'
  ): Promise<AIResponse> {
    validateText(text, 2_000);

    const response = await aiOrchestrator.generateTTS(text, languageName, context, this.userId);

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Translation ─────────────────────────────────────────────────────────

  async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage = 'Bahasa Indonesia'
  ): Promise<AIResponse> {
    validateText(text, 3_000);
    if (!targetLanguage?.trim()) {
      throw new Error('Pilih bahasa tujuan terlebih dahulu, Sahabat.');
    }

    const response = await aiOrchestrator.translate(text, targetLanguage, sourceLanguage, this.userId);

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Speech-to-Text ──────────────────────────────────────────────────────

  async transcribeAudio(
    audioBase64: string,
    mimeType = 'audio/webm'
  ): Promise<AIResponse> {
    validateAudio(audioBase64);

    const response = await aiOrchestrator.execute({
      task: 'stt',
      input: audioBase64,
      options: { mimeType, userId: this.userId },
    });

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Pronunciation Analysis ───────────────────────────────────────────────

  async analyzePronunciation(
    audioBase64: string,
    mimeType: string,
    targetText: string,
    languageName: string
  ): Promise<AIResponse> {
    validateAudio(audioBase64);
    validateText(targetText, 500);

    const response = await aiOrchestrator.execute({
      task: 'pronunciation',
      input: audioBase64,
      options: {
        mimeType,
        context: targetText,
        language: languageName,
        userId: this.userId,
      },
    });

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Fact Check ───────────────────────────────────────────────────────────

  async checkFacts(text: string): Promise<AIResponse> {
    validateText(text, 3_000);

    const response = await aiOrchestrator.execute({
      task: 'factcheck',
      input: text,
      options: {
        userId: this.userId,
        skipCache: true, // fakta harus selalu segar
      },
    });

    this.requestCount++;

    if (!response.success) handleFailedResponse(response);
    return response;
  }

  // ─── Availability Check ───────────────────────────────────────────────────

  async checkAvailability(): Promise<{
    available: boolean;
    primaryHealthy: boolean;
    healthyProviders: string[];
    degradedProviders: string[];
  }> {
    try {
      const stats = aiOrchestrator.getSystemStats();
      const providers = stats.providers || {};

      const healthy: string[] = [];
      const degraded: string[] = [];

      Object.entries(providers).forEach(([id, info]: [string, any]) => {
        if (info.circuitState === 'CLOSED' && !info.rateLimitEnds) {
          healthy.push(id);
        } else {
          degraded.push(id);
        }
      });

      return {
        available: healthy.length > 0,
        primaryHealthy: healthy.includes('gemini'),
        healthyProviders: healthy,
        degradedProviders: degraded,
      };
    } catch {
      return { available: false, primaryHealthy: false, healthyProviders: [], degradedProviders: [] };
    }
  }

  // ─── Session Info ─────────────────────────────────────────────────────────

  getSessionInfo(): {
    userId: string;
    requestCount: number;
    sessionDurationMin: number;
    estimatedCostUSD: string;
    providerStats: Record<string, any>;
  } {
    const stats = aiOrchestrator.getSystemStats();
    return {
      userId: this.userId,
      requestCount: this.requestCount,
      sessionDurationMin: Math.round((Date.now() - this.sessionStart) / 60_000),
      estimatedCostUSD: stats.sessionCostUSD,
      providerStats: stats.providers,
    };
  }

  // ─── User Management ──────────────────────────────────────────────────────

  getUserId(): string { return this.userId; }
  setUserId(id: string): void { this.userId = id; }

  private generateAnonymousId(): string {
    return `anon_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
  }
}

// Singleton export
export const secureAIClient = new SecureAIClient();