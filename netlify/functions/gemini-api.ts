// netlify/functions/gemini-api.ts
// ✅ FIXED: Updated to use valid Gemini models

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
    
    // 4. Initialize Gemini with VALID MODELS
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ✨ FIXED - Use VALID and STABLE models
    const requestedModel = params.model || "gemini-1.5-flash";
    let modelName;
    
    // Map all models to VALID CURRENT models
    const MODEL_MAPPING = {
      // Deprecated models → Valid replacements
      "gemini-1.5-flash": "gemini-1.5-flash-latest",
      "gemini-2.0-flash-exp": "gemini-2.0-flash-exp", 
      "gemini-exp": "gemini-2.0-flash-exp",
      "gemini-2.0": "gemini-1.5-pro-latest",
      "gemini-1.5-pro": "gemini-1.5-pro-latest",
    };
    
    // Use mapping or fallback to latest flash
    modelName = MODEL_MAPPING[requestedModel] || "gemini-1.5-flash-latest";
    
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