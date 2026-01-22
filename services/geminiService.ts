
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { 
  AnalysisResult, 
  WritingStyle, 
  WritingContext, 
  TargetLanguage, 
  PronunciationResult 
} from "../types";
import { getData, saveData } from "./dbService";

const STORES = {
  TTS_CACHE: 'tts_cache',
  CACHE: 'cache'
};

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  return new GoogleGenAI({ apiKey });
};

const sanitizeInput = (text: string): string => {
  return text
    .replace(/<[^>]*>?/gm, '') 
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]/g, ' ') 
    .trim();
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const sanitizeForTTS = (text: string) => {
  return text
    .slice(0, 2000) 
    .replace(/[*_#~`>|]/g, ' ')
    .replace(/[^\w\s,.?!;()]/gi, '')
    .trim();
};

const hashText = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

const playAudioBuffer = (base64: string): Promise<void> => {
  return new Promise(async (resolve) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const bytes = decode(base64);
      const buf = await decodeAudioData(bytes, ctx, 24000, 1);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.onended = () => { ctx.close(); resolve(); };
      src.start();
    } catch (e) { resolve(); }
  });
};

/**
 * Fix: Added missing export for preloadWebSpeechVoices to resolve compilation error in App.tsx
 */
export const preloadWebSpeechVoices = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
};

/**
 * Mendapatkan data audio Base64 untuk pemutar kustom (mendukung fitur geser/seeking)
 */
export const fetchTTSAudio = async (text: string, languageName: string = "Bahasa Indonesia"): Promise<string | null> => {
  const cleanText = sanitizeForTTS(text);
  if (!cleanText) return null;

  const cacheKey = `tts_raw_puck_${hashText(cleanText + languageName)}`;
  try {
    const cached = await getData(STORES.TTS_CACHE, cacheKey);
    if (cached) return cached;
  } catch (e) {}

  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    // Fix: Using standard contents structure with parts
    contents: { parts: [{ text: `Bacakan dongeng ini dengan gaya anak-anak yang ekspresif dalam logat ${languageName}: "${cleanText}"` }] },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { 
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } 
      },
    },
  });

  const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (b64) {
    saveData(STORES.TTS_CACHE, cacheKey, b64).catch(() => {});
    return b64;
  }
  return null;
};

export const generateSpeech = async (
  text: string, 
  languageName: string = "Bahasa Indonesia", 
  phoneticGuide?: string
): Promise<void> => {
  const cleanText = sanitizeForTTS(text);
  if (!cleanText) return;
  const cacheKey = `tts_puck_${hashText(cleanText + languageName + (phoneticGuide || ""))}`;
  try {
    const cached = await getData(STORES.TTS_CACHE, cacheKey);
    if (cached) { await playAudioBuffer(cached); return; }
  } catch (e) {}

  const ai = getAI();
  const prompt = phoneticGuide 
    ? `Speak this cheerfully as a child in ${languageName} accent: "${cleanText}". Phonetic guide: ${phoneticGuide}`
    : `Speak this cheerfully as a child in ${languageName} accent: "${cleanText}"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    // Fix: Using standard contents structure with parts
    contents: { parts: [{ text: prompt }] },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
    },
  });

  const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (b64) {
    saveData(STORES.TTS_CACHE, cacheKey, b64).catch(() => {});
    await playAudioBuffer(b64);
  }
};

export const analyzeGrammar = async (text: string, style: WritingStyle, context: WritingContext, targetLang: TargetLanguage, withPlagiarism: boolean = false): Promise<AnalysisResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analisis teks: "${sanitizeInput(text)}". Gaya: ${style}, Konteks: ${context}, Target Bahasa: ${targetLang}.`,
    config: {
      thinkingConfig: { thinkingBudget: 0 }, // Mempercepat respon
      systemInstruction: `Anda Tara, pakar bahasa Indonesia. Tugas: 1. Koreksi EYD. 2. Summary singkat. 3. ReadingGuideIndo. 4. Translation. 5. Suggestions. 6. isViolation detection. Respon dalam format JSON murni. Jangan berpura-pura berpikir lama, berikan hasil instan.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctedText: { type: Type.STRING },
          summary: { type: Type.STRING },
          styleScore: { type: Type.INTEGER },
          readingGuideIndo: { type: Type.STRING },
          isViolation: { type: Type.BOOLEAN },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacement: { type: Type.STRING },
                reason: { type: Type.STRING },
                type: { type: Type.STRING }
              }
            }
          },
          translation: {
            type: Type.OBJECT,
            properties: {
              translatedText: { type: Type.STRING },
              readingGuide: { type: Type.STRING }
            }
          }
        },
        required: ["correctedText", "summary", "styleScore", "suggestions", "translation", "readingGuideIndo", "isViolation"]
      }
    },
  });

  const data: AnalysisResult = JSON.parse(response.text || "{}");
  if (withPlagiarism) {
    const pResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Cek plagiarisme di web untuk: "${sanitizeInput(text)}".`,
      config: { tools: [{ googleSearch: {} }], thinkingConfig: { thinkingBudget: 0 } },
    });
    const chunks = pResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks.filter(c => c.web).map(c => ({ uri: c.web!.uri!, title: c.web!.title! })).slice(0, 3);
    data.plagiarism = {
      score: sources.length > 0 ? 40 : 0,
      sources,
      summary: sources.length > 0 ? "Ditemukan kemiripan di dahan web." : "Naskahmu tampak orisinal."
    };
  }
  return data;
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    // Fix: Wrapped parts in a single content object for consistency
    contents: { 
      parts: [
        { text: "Transkripsikan audio ini ke teks Bahasa Indonesia secara cepat." }, 
        { inlineData: { data: base64Audio, mimeType: mimeType.split(';')[0] } }
      ] 
    },
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });
  return (response.text || "").trim();
};

export const analyzePronunciation = async (
  base64Audio: string, 
  mimeType: string, 
  targetText: string, 
  languageName: string
): Promise<PronunciationResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    // Fix: Wrapped parts in a single content object for consistency
    contents: {
      parts: [
        { text: `Evaluasi pelafalan "${targetText}" dalam ${languageName}. Berikan skor (0-100), feedback, encouragement, dan transkripsi. Respon JSON.` },
        { inlineData: { data: base64Audio, mimeType: mimeType.split(';')[0] } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          feedback: { type: Type.STRING },
          encouragement: { type: Type.STRING },
          transcription: { type: Type.STRING }
        },
        required: ["score", "feedback", "encouragement", "transcription"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const askTaraAboutPlatform = async (): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Jelaskan tentang Teduh Aksara secara singkat dan puitis sebagai Tara si Pohon Kersen.",
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });
  return response.text || "Aku adalah Tara, pohon kersen tempat naskahmu berteduh dan tumbuh.";
};
