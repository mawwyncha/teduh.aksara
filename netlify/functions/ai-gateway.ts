// netlify/functions/ai-gateway.ts
// Central gateway untuk semua AI providers dengan rate limiting dan security

import { Handler } from '@netlify/functions';

// Rate limiting storage (in-memory, reset on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Allowed models for security
const ALLOWED_MODELS = {
  deepseek: ['deepseek-chat'],
  groq: ['llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
  huggingface: ['indonesian-nlp/gpt2-small-indonesian', 'facebook/mbart-large-50-many-to-many-mmt']
};

// Helper: Generate system prompt based on task
function getSystemPrompt(task: string, options: any): string {
  const basePrompts: Record<string, string> = {
    grammar: `Kamu adalah ahli bahasa Indonesia. Koreksi tata bahasa dan EYD dengan gaya ${options?.style || 'formal'} untuk konteks ${options?.context || 'umum'}.`,
    translation: `Kamu adalah penerjemah ahli. Terjemahkan teks ke ${options?.language || 'Bahasa Indonesia'} dengan dialek yang autentik.`,
    analysis: `Analisis teks dengan mendalam, berikan feedback konstruktif.`,
    pronunciation: `Evaluasi pelafalan dan berikan saran perbaikan.`
  };
  
  return basePrompts[task] || 'Bantu pengguna dengan respons yang helpful dan akurat.';
}

export const handler: Handler = async (event) => {
  // 1. Security: Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }
  
  // 2. Parse and validate request
  let requestData;
  try {
    requestData = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: 'Invalid JSON' })
    };
  }
  
  const { provider, task, input, options, timestamp } = requestData;
  const userId = options?.userId || event.headers['client-ip'] || 'anonymous';
  
  if (!provider || !task || !input) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: provider, task, input' 
      })
    };
  }
  
  // 3. Rate limiting (50 requests per hour per user)
  const rateLimitKey = `${userId}_${provider}`;
  const now = Date.now();
  const userLimit = rateLimitStore.get(rateLimitKey);
  
  if (userLimit && now < userLimit.resetTime && userLimit.count >= 50) {
    return {
      statusCode: 429,
      body: JSON.stringify({ 
        success: false, 
        error: 'Rate limit exceeded. Coba lagi nanti.',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
      })
    };
  }
  
  // 4. Route to appropriate provider
  try {
    let response;
    let result;
    
    switch (provider) {
      case 'gemini':
        // Gunakan localhost untuk development, domain untuk production
        const geminiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:8888/.netlify/functions/gemini-api'
          : `/.netlify/functions/gemini-api`;
          
        response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: task === 'tts' ? 'generateTTS' : 'generateContent',
            params: {
              contents: [{ parts: [{ text: input }] }],
              config: options || {}
            }
          })
        });
        break;
        
      case 'deepseek':
        response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: getSystemPrompt(task, options) // PERBAIKAN: gunakan fungsi langsung
              },
              { role: 'user', content: input }
            ],
            max_tokens: 1000,
            temperature: 0.7
          })
        });
        break;
        
      case 'groq':
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'system',
                content: getSystemPrompt(task, options) // PERBAIKAN: gunakan fungsi langsung
              },
              { role: 'user', content: input }
            ],
            max_tokens: 800
          })
        });
        break;
        
      case 'huggingface':
        // Validate model
        const model = options?.model || 'indonesian-nlp/gpt2-small-indonesian';
        if (!ALLOWED_MODELS.huggingface.includes(model)) {
          return {
            statusCode: 403,
            body: JSON.stringify({ 
              success: false, 
              error: 'Model tidak diizinkan' 
            })
          };
        }
        
        response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.HF_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              inputs: input,
              parameters: {
                max_length: 500,
                temperature: 0.7,
                return_full_text: false
              }
            })
          }
        );
        break;
        
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            success: false, 
            error: 'Provider tidak didukung' 
          })
        };
    }
    
    // 5. Handle provider response
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Provider ${provider} error:`, response.status, errorText);
      throw new Error(`Provider ${provider} returned ${response.status}`);
    }
    
    result = await response.json();
    
    // 6. Update rate limit
    const resetTime = now + 3600000; // 1 hour
    rateLimitStore.set(rateLimitKey, {
      count: (userLimit?.count || 0) + 1,
      resetTime
    });
    
    // 7. Log (non-sensitive)
    console.log(`✅ AI Gateway: ${provider} for ${task}, user: ${userId}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result,
        provider,
        task,
        cached: false
      })
    };
    
  } catch (error: any) {
    console.error('❌ AI Gateway error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};