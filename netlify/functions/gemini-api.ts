// netlify/functions/gemini-api.ts
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  console.log("🚀 Gemini function invoked");
  
  try {
    // 1. Validasi API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }
    
    // 2. Parse request - MENERIMA FORMAT DARI TTS-SERVICE
    const body = JSON.parse(event.body || '{}');
    console.log("📝 Raw request body:", body);
    
    // 3. EKSTRAK DATA - BISA DARI ROOT ATAU DARI params
    let text, language, model;
    
    if (body.action === 'generateContent' && body.params) {
      // Format dari TTS service: { action, params: { text, language, model } }
      text = body.params.text;
      language = body.params.language;
      model = body.params.model;
    } else {
      // Format langsung: { text, language, region }
      text = body.text;
      language = body.language;
    }
    
    // 4. Validasi data
    if (!text) {
      console.error("❌ Missing required text field");
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          success: false, 
          error: "Missing required fields: text is required" 
        })
      };
    }
    
    if (!language) {
      language = "Indonesia"; // Default language
    }
    
    console.log("✅ Valid request:", { text: text.substring(0, 50) + "...", language, model });
    
    // 5. Inisialisasi Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const geminiModel = genAI.getGenerativeModel({ 
      model: model || "gemini-2.0-flash-exp"
    });
    
    // 6. Buat prompt
    const prompt = `Buatkan ucapan selamat datang dalam bahasa ${language} untuk aplikasi budaya. Teks: "${text}"`;
    
    // 7. Generate content
    const result = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });
    
    const response = await result.response;
    const outputText = response.text();
    
    console.log("✅ Gemini response received, length:", outputText.length);
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        success: true, 
        text: outputText 
      })
    };
    
  } catch (error) {
    console.error("❌ Gemini Function error:", error);
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