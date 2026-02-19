// services/ai-providers.ts
// Konfigurasi semua AI providers FREE TIER untuk Teduh Aksara
// Production-ready dengan cost tracking dan capability matrix

export type AITask = 'grammar' | 'translation' | 'tts' | 'stt' | 'pronunciation' | 'analysis' | 'factcheck';
export type AIProvider = 'gemini' | 'deepseek' | 'groq' | 'huggingface' | 'webspeech';

export interface RateLimit {
  daily: number;
  monthly: number;
  perMinute?: number;
  perHour?: number;
}

export interface ProviderCapability {
  maxInputTokens: number;
  maxOutputTokens: number;
  supportsBinary: boolean;   // untuk audio/image input
  supportsStreaming: boolean;
  supportsJSON: boolean;     // structured JSON output
  languages: 'all' | string[];
}

export interface ProviderConfig {
  id: AIProvider;
  name: string;
  freeLimit: RateLimit;
  supports: AITask[];
  endpoint: string;
  headers: (apiKey?: string) => Record<string, string>;
  parseResponse: (data: any, task: AITask) => any;
  costPerRequest: number;       // USD per 1000 tokens approximate
  priority: number;             // 1 = tertinggi
  isHealthy: boolean;
  capability: ProviderCapability;
  timeoutMs: number;            // berapa lama sebelum dianggap timeout
  retryable: boolean;           // apakah aman untuk di-retry
}

// ─── GOOGLE GEMINI (Primary) ───────────────────────────────────────────────
export const geminiProvider: ProviderConfig = {
  id: 'gemini',
  name: 'Google Gemini 1.5 Flash',
  freeLimit: { daily: 1500, monthly: 1_000_000, perMinute: 15 },
  supports: ['grammar', 'translation', 'tts', 'stt', 'pronunciation', 'analysis', 'factcheck'],
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  headers: () => ({ 'Content-Type': 'application/json' }),
  parseResponse: (data, task) => {
    if (task === 'tts') {
      return { audioBase64: data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data };
    }
    // Untuk grammar/analysis, coba parse JSON dulu
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    try { return JSON.parse(text); } catch { return { text }; }
  },
  costPerRequest: 0.000075,
  priority: 1,
  isHealthy: true,
  capability: {
    maxInputTokens: 1_000_000,
    maxOutputTokens: 8192,
    supportsBinary: true,
    supportsStreaming: true,
    supportsJSON: true,
    languages: 'all',
  },
  timeoutMs: 30_000,
  retryable: true,
};

// ─── DEEPSEEK (Backup 1) ──────────────────────────────────────────────────
export const deepseekProvider: ProviderConfig = {
  id: 'deepseek',
  name: 'DeepSeek Chat',
  freeLimit: { daily: 100, monthly: 10_000_000 },
  supports: ['grammar', 'translation', 'analysis', 'factcheck'],
  endpoint: 'https://api.deepseek.com/v1/chat/completions',
  headers: (apiKey) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }),
  parseResponse: (data) => {
    const text = data.choices?.[0]?.message?.content || '';
    try { return JSON.parse(text); } catch { return { text }; }
  },
  costPerRequest: 0.000014,
  priority: 2,
  isHealthy: true,
  capability: {
    maxInputTokens: 64_000,
    maxOutputTokens: 4096,
    supportsBinary: false,
    supportsStreaming: true,
    supportsJSON: true,
    languages: 'all',
  },
  timeoutMs: 20_000,
  retryable: true,
};

// ─── GROQ (Backup 2 — paling cepat, tapi terbatas task) ──────────────────
export const groqProvider: ProviderConfig = {
  id: 'groq',
  name: 'Groq (Llama 3.1 8B)',
  freeLimit: { daily: 500, monthly: 100_000, perMinute: 30 },
  supports: ['grammar', 'analysis', 'translation'],
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  headers: (apiKey) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }),
  parseResponse: (data) => {
    const text = data.choices?.[0]?.message?.content || '';
    try { return JSON.parse(text); } catch { return { text }; }
  },
  costPerRequest: 0,
  priority: 3,
  isHealthy: true,
  capability: {
    maxInputTokens: 8192,
    maxOutputTokens: 2048,
    supportsBinary: false,
    supportsStreaming: true,
    supportsJSON: false,
    languages: 'all',
  },
  timeoutMs: 10_000,
  retryable: true,
};

// ─── HUGGING FACE (Backup 3 — Indonesian khusus) ─────────────────────────
export const huggingfaceProvider: ProviderConfig = {
  id: 'huggingface',
  name: 'Hugging Face GPT2 Indonesian',
  freeLimit: { daily: 50, monthly: 30_000 },
  supports: ['grammar', 'translation'],
  endpoint: 'https://api-inference.huggingface.co/models/indonesian-nlp/gpt2-small-indonesian',
  headers: (apiKey) => ({ 'Authorization': `Bearer ${apiKey}` }),
  parseResponse: (data) => ({ text: data?.[0]?.generated_text || '' }),
  costPerRequest: 0,
  priority: 4,
  isHealthy: true,
  capability: {
    maxInputTokens: 1024,
    maxOutputTokens: 512,
    supportsBinary: false,
    supportsStreaming: false,
    supportsJSON: false,
    languages: ['id', 'jv', 'su'],
  },
  timeoutMs: 15_000,
  retryable: false,  // HF sering timeout saat cold start, jangan retry
};

// ─── WEB SPEECH API (Fallback — browser built-in) ─────────────────────────
export const webspeechProvider: ProviderConfig = {
  id: 'webspeech',
  name: 'Web Speech API',
  freeLimit: { daily: 9999, monthly: 999_999 },
  supports: ['tts', 'stt'],
  endpoint: '',
  headers: () => ({}),
  parseResponse: () => ({}),
  costPerRequest: 0,
  priority: 99,   // paling akhir, hanya fallback
  isHealthy: true,
  capability: {
    maxInputTokens: 500,
    maxOutputTokens: 0,
    supportsBinary: true,
    supportsStreaming: true,
    supportsJSON: false,
    languages: ['id', 'en', 'jv', 'su'],
  },
  timeoutMs: 5_000,
  retryable: false,
};

// ─── Registry lengkap ─────────────────────────────────────────────────────
const ALL_PROVIDERS: Record<AIProvider, ProviderConfig> = {
  gemini: geminiProvider,
  deepseek: deepseekProvider,
  groq: groqProvider,
  huggingface: huggingfaceProvider,
  webspeech: webspeechProvider,
};

/**
 * Get daftar providers yang support task ini, diurutkan prioritas
 */
export function getProvidersForTask(task: AITask): ProviderConfig[] {
  return Object.values(ALL_PROVIDERS)
    .filter(p => p.supports.includes(task))
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Get provider by ID
 */
export function getProviderById(id: AIProvider): ProviderConfig | undefined {
  return ALL_PROVIDERS[id];
}

/**
 * Get semua provider yang gratis (costPerRequest === 0) untuk task tertentu
 */
export function getFreeProvidersForTask(task: AITask): ProviderConfig[] {
  return getProvidersForTask(task).filter(p => p.costPerRequest === 0);
}

/**
 * Get estimasi biaya request dalam USD
 */
export function estimateCost(providerId: AIProvider, tokenCount: number): number {
  const provider = ALL_PROVIDERS[providerId];
  if (!provider) return 0;
  return (tokenCount / 1000) * provider.costPerRequest;
}