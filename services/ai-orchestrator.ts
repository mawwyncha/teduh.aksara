// services/ai-orchestrator.ts
// Hybrid AI Orchestrator dengan failover otomatis untuk Teduh Aksara

import { 
  getProvidersForTask, 
  getProviderById,
  type AITask,
  type AIProvider 
} from './ai-providers';
import { getData, saveData, STORES } from './dbService';

export interface AIRequest {
  task: AITask;
  input: any;
  options?: {
    language?: string;
    style?: string;
    context?: string;
    userId?: string;
    forceProvider?: AIProvider;
  };
}

export interface AIResponse {
  success: boolean;
  provider: string;
  result: any;
  latency: number;
  cached: boolean;
  error?: string;
  fallbackUsed: boolean;
}

export interface AIRequestOptions {
  language?: string;
  style?: string;
  context?: string;
  userId?: string;
  forceProvider?: AIProvider;
  
  // TAMBAHKAN INI UNTUK TRANSLATION
  sourceLanguage?: string;      // ← TAMBAH
  targetLanguage?: string;      // ← TAMBAH (alias untuk language)
  
  // TAMBAHKAN INI UNTUK STT
  mimeType?: string;           // ← TAMBAH
  
  // TAMBAHKAN UNTUK TTS
  voiceName?: string;         // ← TAMBAH (optional)
  speakingRate?: number;      // ← TAMBAH (optional)
  
  // Allow any additional properties untuk extensibility
  [key: string]: any;        // ← TAMBAH (fallback)
}

// Cache for provider health
const providerHealth = new Map<AIProvider, {
  isHealthy: boolean;
  lastError: number;
  successCount: number;
  errorCount: number;
  lastResponseTime: number;
}>();

export class AIOrchestrator {
  private static instance: AIOrchestrator;
  
  private constructor() {
    // Initialize health tracking
    this.initializeHealthTracking();
  }
  
  static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }
  
  private initializeHealthTracking(): void {
    const providers: AIProvider[] = ['gemini', 'deepseek', 'groq', 'huggingface'];
    providers.forEach(provider => {
      providerHealth.set(provider, {
        isHealthy: true,
        lastError: 0,
        successCount: 0,
        errorCount: 0,
        lastResponseTime: 0
      });
    });
  }
  
  // MARK: Main orchestration method
  async execute(request: AIRequest): Promise<AIResponse> {
    const { task, input, options } = request;
    const userId = options?.userId || 'anonymous';
    
    // Check cache first
    const cacheKey = this.generateCacheKey(task, input, options);
    const cachedResult = await this.checkCache(cacheKey);
    
    if (cachedResult) {
      return {
        success: true,
        provider: 'cache',
        result: cachedResult,
        latency: 0,
        cached: true,
        fallbackUsed: false
      };
    }
    
    // Get available providers for this task
    let providers = getProvidersForTask(task);
    
    // Force specific provider if requested
    if (options?.forceProvider) {
      const forcedProvider = getProviderById(options.forceProvider);
      if (forcedProvider) {
        providers = [forcedProvider];
      }
    }
    
    // Filter out unhealthy providers
    const availableProviders = providers.filter(p => 
      p.id === 'webspeech' || this.isProviderHealthy(p.id)
    );
    
    if (availableProviders.length === 0) {
      return {
        success: false,
        provider: 'none',
        result: null,
        latency: 0,
        cached: false,
        error: 'Semua AI provider sedang tidak tersedia',
        fallbackUsed: true
      };
    }
    
    // Try providers in order
    for (const provider of availableProviders) {
      try {
        console.log(`🔄 Mencoba provider: ${provider.name} untuk task: ${task}`);
        
        const startTime = Date.now();
        const result = await this.callProvider(provider, task, input, options);
        const latency = Date.now() - startTime;
        
        // Update health stats
        this.recordSuccess(provider.id, latency);
        
        // Cache successful result
        await this.cacheResult(cacheKey, result);
        
        return {
          success: true,
          provider: provider.name,
          result,
          latency,
          cached: false,
          fallbackUsed: provider.priority > 1
        };
        
      } catch (error: any) {
        console.warn(`❌ Provider ${provider.name} gagal:`, error.message);
        this.recordError(provider.id, error);
        
        // Continue to next provider
        continue;
      }
    }
    
    // All providers failed
    return {
      success: false,
      provider: 'none',
      result: null,
      latency: 0,
      cached: false,
      error: 'Semua AI provider gagal memproses permintaan',
      fallbackUsed: true
    };
  }
  
  // MARK: Grammar analysis with fallback
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
      options: {
        language: targetLang,
        style,
        context,
        userId
      }
    });
  }
  
  // MARK: TTS with fallback
  async generateTTS(
    text: string,
    languageName: string,
    context: 'greeting' | 'story' | 'pronunciation' = 'greeting',
    userId?: string
  ): Promise<AIResponse> {
    return this.execute({
      task: 'tts',
      input: text,
      options: {
        language: languageName,
        context,
        userId
      }
    });
  }
  
  // MARK: Helper methods
  private async callProvider(
    provider: any,
    task: AITask,
    input: any,
    options?: any
  ): Promise<any> {
    // Call via Netlify AI Gateway
    const response = await fetch('/.netlify/functions/ai-gateway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: provider.id,
        task,
        input,
        options,
        timestamp: Date.now()
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Provider ${provider.id} gagal`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error from provider');
    }
    
    return provider.parseResponse(data.data, task);
  }
  
  private generateCacheKey(task: AITask, input: any, options?: any): string {
    const inputStr = typeof input === 'string' ? input : JSON.stringify(input);
    const optionsStr = options ? JSON.stringify(options) : '';
    return `ai_cache_${task}_${this.hashString(inputStr + optionsStr)}`;
  }
  
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
  
  private async checkCache(key: string): Promise<any> {
    try {
      return await getData(STORES.CACHE, key);
    } catch (error) {
      return null;
    }
  }
  
  private async cacheResult(key: string, data: any): Promise<void> {
    try {
      // Cache for 1 hour
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + 3600000
      };
      await saveData(STORES.CACHE, key, cacheData);
    } catch (error) {
      console.warn('Failed to cache result:', error);
    }
  }
  
  private isProviderHealthy(providerId: AIProvider): boolean {
    const health = providerHealth.get(providerId);
    if (!health) return true;
    
    // Check if recently errored
    if (!health.isHealthy && Date.now() - health.lastError < 300000) {
      return false;
    }
    
    // Check error rate
    const totalRequests = health.successCount + health.errorCount;
    if (totalRequests > 10 && (health.errorCount / totalRequests) > 0.5) {
      return false;
    }
    
    return true;
  }
  
  private recordSuccess(providerId: AIProvider, latency: number): void {
    const health = providerHealth.get(providerId);
    if (health) {
      health.successCount++;
      health.isHealthy = true;
      health.lastResponseTime = latency;
    }
  }
  
  private recordError(providerId: AIProvider, error: any): void {
    const health = providerHealth.get(providerId);
    if (health) {
      health.errorCount++;
      health.lastError = Date.now();
      health.isHealthy = false;
      
      // Auto-recovery after 5 minutes
      setTimeout(() => {
        const currentHealth = providerHealth.get(providerId);
        if (currentHealth) {
          currentHealth.isHealthy = true;
        }
      }, 300000);
    }
  }
  
  // MARK: Get system stats (for monitoring)
  getSystemStats() {
    const stats: any = {};
    
    providerHealth.forEach((health, providerId) => {
      const total = health.successCount + health.errorCount;
      stats[providerId] = {
        isHealthy: health.isHealthy,
        successCount: health.successCount,
        errorCount: health.errorCount,
        errorRate: total > 0 ? (health.errorCount / total) * 100 : 0,
        avgResponseTime: health.successCount > 0 ? health.lastResponseTime : 0,
        lastError: health.lastError ? new Date(health.lastError).toISOString() : null
      };
    });
    
    return stats;
  }
}

// Export singleton instance
export const aiOrchestrator = AIOrchestrator.getInstance();