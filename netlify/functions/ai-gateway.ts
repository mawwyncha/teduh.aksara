// netlify/functions/ai-gateway.ts
// ✅ PATCH: Add fallback mechanism without changing existing logic

import { Handler } from '@netlify/functions';

// Rate limiting storage (in-memory)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }
  
  try {
    const requestData = JSON.parse(event.body || '{}');
    const { provider, task, input, payload, options, enableFallback = false } = requestData;
    const userId = options?.userId || event.headers['client-ip'] || 'anonymous';
    
    // Validate required fields
    if (!provider || !task) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: provider, task' 
        })
      };
    }
    
    // ✨ NEW - Handle Google TTS redirect to Gemini
    if (provider === 'google-tts' && (task === 'synthesize' || task === 'tts')) {
      console.log('🎤 TTS request detected, suggesting Gemini fallback...');
      
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Google TTS not configured, please use Gemini API directly',
          suggestion: 'Use provider: "gemini" with task: "tts"'
        })
      };
    }
    
    // Rate limiting (50 requests per hour)
    const rateLimitKey = `${userId}_${provider}`;
    const now = Date.now();
    const userLimit = rateLimitStore.get(rateLimitKey);
    
    if (userLimit && now < userLimit.resetTime && userLimit.count >= 50) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Rate limit exceeded. Coba lagi nanti.',
          retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
        })
      };
    }
    
    // Route to appropriate provider
    let response;
    let usedProvider = provider;
    
    try {
      // ==================== GEMINI ====================
      if (provider === 'gemini') {
        console.log('🔷 Routing to Gemini API...');
        
        const geminiUrl = `${process.env.URL || ''}/.netlify/functions/gemini-api`;
        
        response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: task === 'tts' ? 'generateTTS' : 'generateContent',
            params: payload || {
              text: typeof input === 'string' ? input : input?.text,
              language: options?.language || 'Indonesia',
              ...options
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`Gemini returned ${response.status}`);
        }
      }
      
      // ==================== DEEPSEEK ====================
      else if (provider === 'deepseek') {
        console.log('🔶 Routing to DeepSeek...');
        
        const deepseekKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY_BACKUP;
        if (!deepseekKey) {
          throw new Error('DeepSeek API key not configured');
        }
        
        response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: `You are a helpful assistant for ${task} task.`
              },
              { 
                role: 'user', 
                content: typeof input === 'string' ? input : JSON.stringify(input)
              }
            ],
            max_tokens: 1000,
            temperature: 0.7
          })
        });
        
        if (!response.ok) {
          throw new Error(`DeepSeek returned ${response.status}`);
        }
      }
      
      // ==================== GROQ ====================
      else if (provider === 'groq') {
        console.log('⚡ Routing to Groq...');
        
        const groqKey = process.env.GROQ_API_KEY || process.env.GROQ_API_KEY_BACKUP;
        if (!groqKey) {
          throw new Error('Groq API key not configured');
        }
        
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: options?.model || 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'system',
                content: `You are a helpful assistant for ${task} task.`
              },
              { 
                role: 'user', 
                content: typeof input === 'string' ? input : JSON.stringify(input)
              }
            ],
            max_tokens: 800,
            temperature: 0.7
          })
        });
        
        if (!response.ok) {
          throw new Error(`Groq returned ${response.status}`);
        }
      }
      
      // ==================== HUGGINGFACE ====================
      else if (provider === 'huggingface') {
        console.log('🤗 Routing to HuggingFace...');
        
        const hfKey = process.env.HF_API_KEY || process.env.HF_API_KEY_BACKUP;
        if (!hfKey) {
          throw new Error('HuggingFace API key not configured');
        }
        
        const model = options?.model || 'indonesian-nlp/gpt2-small-indonesian';
        
        response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${hfKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              inputs: typeof input === 'string' ? input : JSON.stringify(input),
              parameters: {
                max_length: 500,
                temperature: 0.7,
                return_full_text: false
              }
            })
          }
        );
        
        if (!response.ok) {
          throw new Error(`HuggingFace returned ${response.status}`);
        }
      }
      
      else {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: `Provider ${provider} tidak didukung`
          })
        };
      }
      
    } catch (providerError: any) {
      console.error(`❌ Provider ${provider} failed:`, providerError.message);
      
      // ✨ NEW - Optional fallback to Gemini if enabled
      if (enableFallback && provider !== 'gemini') {
        console.log('🔄 Trying Gemini as fallback...');
        
        try {
          const geminiUrl = `${process.env.URL || ''}/.netlify/functions/gemini-api`;
          
          response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'generateContent',
              params: {
                text: typeof input === 'string' ? input : JSON.stringify(input),
                ...options
              }
            })
          });
          
          if (response.ok) {
            usedProvider = 'gemini';
            console.log('✅ Fallback to Gemini successful');
          } else {
            throw providerError;
          }
        } catch (fallbackError) {
          throw providerError; // Throw original error
        }
      } else {
        throw providerError;
      }
    }
    
    // Parse response
    const result = await response.json();
    
    // Update rate limit
    const resetTime = now + 3600000; // 1 hour
    rateLimitStore.set(rateLimitKey, {
      count: (userLimit?.count || 0) + 1,
      resetTime
    });
    
    // Success response
    console.log(`✅ AI Gateway: Success with ${usedProvider}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: result,
        provider: usedProvider,
        fallbackUsed: usedProvider !== provider
      })
    };
    
  } catch (error: any) {
    console.error('❌ AI Gateway error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};