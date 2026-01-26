import type { Handler } from '@netlify/functions';
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY_BACKUP;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  return new GoogleGenAI({ apiKey });
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { action, params } = JSON.parse(event.body || '{}');
    const ai = getAI();

    let result;

    switch (action) {
      case 'generateContent':
        // General content generation (analysis, transcription, etc)
        result = await ai.models.generateContent(params);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: result.text,
            candidates: result.candidates
          })
        };

      case 'generateTTS':
        // Text-to-Speech generation
        result = await ai.models.generateContent(params);
        const audioData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: audioData || null
          })
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Unknown action' })
        };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};