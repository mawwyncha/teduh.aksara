// netlify/functions/gemini-api.ts
// ✅ PATCH: Only fix deprecated model name

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  console.log("🚀 Gemini function invoked");
  
  try {
    // 1. Validasi API key dengan BACKUP support
    let apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey && process.env.GEMINI_API_KEY_BACKUP) {
      console.log("⚠️ Using backup API key");
      apiKey = process.env.GEMINI_API_KEY_BACKUP;
    }
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }
    
    // 2. Parse request
    const body = JSON.parse(event.body || '{}');
    console.log("📝 Raw request body:", JSON.stringify(body).substring(0, 200));
    
    // 3. Extract data
    const { action, params } = body;
    
    if (!action || !params) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          success: false, 
          error: "Missing required fields: action, params" 
        })
      };
    }
    
    // 4. Initialize Gemini with STABLE MODEL
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ✨ FIX - Use stable model with fallback
    const requestedModel = params.model || "gemini-1.5-flash";
    let modelName;
    
    // Map deprecated models to stable ones
    const MODEL_MAPPING = {
      "gemini-2.0-flash-exp": "gemini-1.5-flash",
      "gemini-exp": "gemini-1.5-flash",
      "gemini-2.0": "gemini-1.5-pro",
    };
    
    modelName = MODEL_MAPPING[requestedModel] || requestedModel;
    
    console.log(`🔷 Using model: ${modelName} (requested: ${requestedModel})`);
    
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // 5. Handle different actions
    let result;
    
    if (action === 'generateContent') {
      // Standard content generation
      const contents = params.contents || [
        {
          role: "user",
          parts: [{ text: params.text || "" }]
        }
      ];
      
      result = await model.generateContent({
        contents,
        generationConfig: params.config || {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          success: true,
          text: text,
          model: modelName
        })
      };
      
    } else if (action === 'generateTTS') {
      // TTS generation (generate text for TTS)
      const prompt = params.text || "";
      const language = params.language || "Indonesia";
      
      result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ 
              text: `Generate natural ${language} speech text for: "${prompt.substring(0, 100)}..."`
            }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          success: true,
          text: text,
          model: modelName,
          language: language
        })
      };
      
    } else {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          success: false,
          error: `Unknown action: ${action}`
        })
      };
    }
    
  } catch (error) {
    console.error("❌ Gemini Function error:", error.message);
    
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        success: false, 
        error: error.message
      })
    };
  }
};