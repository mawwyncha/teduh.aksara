// services/ai-providers.ts
// Konfigurasi semua AI providers FREE TIER untuk Teduh Aksara

export type AITask = 'grammar' | 'translation' | 'tts' | 'stt' | 'pronunciation' | 'analysis';
export type AIProvider = 'gemini' | 'deepseek' | 'groq' | 'huggingface' | 'webspeech';

export interface ProviderConfig {
  id: AIProvider;
  name: string;
  freeLimit: { daily: number; monthly: number };
  supports: AITask[];
  endpoint: string;
  headers: (apiKey?: string) => Record<string, string>;
  parseResponse: (data: any, task: AITask) => any;
  costPerRequest: number;
  priority: number;
  isHealthy: boolean;
}

// GOOGLE GEMINI (Primary)
export const geminiProvider: ProviderConfig = {
  id: 'gemini',
  name: 'Google Gemini 1.5 Flash',
  freeLimit: { daily: 1500, monthly: 1000000 },
  supports: ['grammar', 'translation', 'tts', 'stt', 'pronunciation', 'analysis'],
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  headers: () => ({
    'Content-Type': 'application/json',
  }),
  parseResponse: (data, task) => {
    if (task === 'tts') {
      return { audioBase64: data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data };
    }
    return JSON.parse(data.text || '{}');
  },
  costPerRequest: 0.000075,
  priority: 1,
  isHealthy: true
};

// DEEPSEEK (Backup 1)
export const deepseekProvider: ProviderConfig = {
  id: 'deepseek',
  name: 'DeepSeek Chat',
  freeLimit: { daily: 100, monthly: 10000000 },
  supports: ['grammar', 'translation', 'analysis'],
  endpoint: 'https://api.deepseek.com/v1/chat/completions',
  headers: (apiKey) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }),
  parseResponse: (data) => ({
    text: data.choices?.[0]?.message?.content || ''
  }),
  costPerRequest: 0.000014,
  priority: 2,
  isHealthy: true
};

// GROQ (Backup 2)
export const groqProvider: ProviderConfig = {
  id: 'groq',
  name: 'Groq (Llama 3.1 8B)',
  freeLimit: { daily: 500, monthly: 100000 },
  supports: ['grammar', 'analysis'],
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  headers: (apiKey) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }),
  parseResponse: (data) => ({
    text: data.choices?.[0]?.message?.content || ''
  }),
  costPerRequest: 0,
  priority: 3,
  isHealthy: true
};

// HUGGING FACE (Backup 3 - Indonesian khusus)
export const huggingfaceProvider: ProviderConfig = {
  id: 'huggingface',
  name: 'Hugging Face GPT2 Indonesian',
  freeLimit: { daily: 50, monthly: 30000 },
  supports: ['grammar', 'translation'],
  endpoint: 'https://api-inference.huggingface.co/models/indonesian-nlp/gpt2-small-indonesian',
  headers: (apiKey) => ({
    'Authorization': `Bearer ${apiKey}`
  }),
  parseResponse: (data) => ({
    text: data?.[0]?.generated_text || ''
  }),
  costPerRequest: 0,
  priority: 4,
  isHealthy: true
};

// WEB SPEECH API (Fallback - browser built-in)
export const webspeechProvider: ProviderConfig = {
  id: 'webspeech',
  name: 'Web Speech API',
  freeLimit: { daily: 9999, monthly: 999999 },
  supports: ['tts', 'stt'],
  endpoint: '',
  headers: () => ({}),
  parseResponse: () => ({}),
  costPerRequest: 0,
  priority: 5,
  isHealthy: true
};

// Helper: Get providers for specific task
export function getProvidersForTask(task: AITask): ProviderConfig[] {
  const allProviders = [geminiProvider, deepseekProvider, groqProvider, huggingfaceProvider, webspeechProvider];
  return allProviders
    .filter(p => p.supports.includes(task))
    .sort((a, b) => a.priority - b.priority);
}

// Helper: Get provider by ID
export function getProviderById(id: AIProvider): ProviderConfig | undefined {
  const providers = { gemini: geminiProvider, deepseek: deepseekProvider, groq: groqProvider, huggingface: huggingfaceProvider, webspeech: webspeechProvider };
  return providers[id];
}