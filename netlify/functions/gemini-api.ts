// netlify/functions/gemini-api.ts - VERSI DIPERBARUI
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // 1. Validasi API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' })
    };
  }
  
  // 2. Parse request
  const { action, params } = JSON.parse(event.body || '{}');
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    if (action === 'generateTTS') {
      // Untuk TTS
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp"  // Model yang support TTS
      });
      
      const result = await model.generateContent({
        contents: params.contents,
        generationConfig: params.config
      });
      
      const response = await result.response;
      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          audioBase64: audioData || null 
        })
      };
    } else {
      // Untuk regular content
      const model = genAI.getGenerativeModel({ 
        model: params.model || "gemini-2.0-flash-exp",
        systemInstruction: params.config?.systemInstruction,
        generationConfig: params.config
      });
      
      const result = await model.generateContent(params.contents);
      const response = await result.response;
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          text: response.text(),
          candidates: response.candidates
        })
      };
    }
  } catch (error: any) {
    console.error('Gemini Function error:', error);
    
    // Berikan error yang lebih informatif
    let errorMessage = error.message;
    if (errorMessage.includes('quota')) {
      errorMessage = 'Kuota Gemini telah habis. Coba lagi nanti atau gunakan fitur lain.';
    } else if (errorMessage.includes('model not found')) {
      errorMessage = 'Model Gemini tidak ditemukan. Coba model lain.';
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: errorMessage 
      })
    };
  }
};