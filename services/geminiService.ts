import { Type, Modality } from "@google/genai";
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

const LANGUAGE_MAP: Record<TargetLanguage, string> = {
  'en_us': 'English (US)',
  'en_uk': 'English (UK)',
  'en_au': 'English (Australia)',
  'jv_central': 'Bahasa Jawa Dialek Jawa Tengah (Solo/Semarang)',
  'jv_yogyakarta': 'Bahasa Jawa Dialek Yogyakarta (Ngayogyakarta)',
  'jv_east': 'Bahasa Jawa Dialek Jawa Timur (Suroboyoan)',
  'jv_central_coastal': 'Bahasa Jawa Dialek Pantura (Pesisir Jawa Tengah)',
  'su': 'Bahasa Sunda (Priangan/Jawa Barat)',
  'min': 'Bahasa Minangkabau (Sumatera Barat)',
  'ban': 'Bahasa Bali (Dataran/Bali Tengah)',
  'bug': 'Bahasa Bugis (Sulawesi Selatan)',
  'mad': 'Bahasa Madura (Jawa Timur)',
  'ace': 'Bahasa Aceh (Serambi Mekkah)',
  'bjn': 'Bahasa Banjar (Kalimantan Selatan)',
  'mk': 'Bahasa Makassar (Sulawesi Selatan)',
  'bt_toba': 'Bahasa Batak Toba (Sumatera Utara)',
  'bt_karo': 'Bahasa Batak Karo (Sumatera Utara)',
  'lp': 'Bahasa Lampung (Sumatera Selatan)',
  'sas': 'Bahasa Sasak (Lombok/NTB)',
  'pap': 'Bahasa Melayu Papua (Pesisir Papua)',
  'amb': 'Bahasa Melayu Ambon (Maluku Tengah)',
  'go': 'Bahasa Gorontalo (Sulawesi Utara)',
  'ni': 'Bahasa Nias (Sumatera Utara)',
  'tet': 'Bahasa Tetum (Nusa Tenggara Timur)',
  'pt_tl': 'Bahasa Portugis (Timor Leste)',
  'zh_hokkien_medan': 'Bahasa Hokkien Dialek Medan',
  'zh_hokkien_jakarta': 'Bahasa Hokkien Dialek Jakarta',
  'zh_hakka_singkawang': 'Bahasa Hakka Dialek Singkawang',
  'zh_hakka_bangka': 'Bahasa Hakka Dialek Bangka',
  'zh_teochew_pontianak': 'Bahasa Teochew Dialek Pontianak',
  'zh_cantonese_id': 'Bahasa Kanton (Kantonis Indonesia)'
};

// Helper function untuk call Gemini API
const IS_DEV = import.meta.env.DEV;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const callGeminiAPI = async (action: 'generateContent' | 'generateTTS', params: any) => {
  // Development mode: Call Gemini directly
  if (IS_DEV && GEMINI_API_KEY) {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    try {
      const result = await ai.models.generateContent(params);
      
      if (action === 'generateTTS') {
        const audioData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return { audioBase64: audioData || null };
      }
      
      return {
        text: result.text,
        candidates: result.candidates
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }
  
  // Production mode: Call via Netlify Function
  const response = await fetch('/.netlify/functions/gemini-api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, params })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API call failed');
  }

  return await response.json();
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

export const preloadWebSpeechVoices = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
};

export const fetchTTSAudio = async (text: string, languageName: string = "Bahasa Indonesia"): Promise<string | null> => {
  const cleanText = sanitizeForTTS(text);
  if (!cleanText) return null;

  const cacheKey = `tts_raw_puck_${hashText(cleanText + languageName)}`;
  try {
    const cached = await getData(STORES.TTS_CACHE, cacheKey);
    if (cached) return cached;
  } catch (e) {}

  const response = await callGeminiAPI('generateTTS', {
    model: "gemini-2.5-flash-preview-tts",
    contents: { parts: [{ text: `Bacakan dongeng ini dengan gaya anak-anak yang ekspresif dalam logat ${languageName}: "${cleanText}"` }] },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { 
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } 
      },
    },
  });

  const b64 = response.audioBase64;
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

  const prompt = phoneticGuide 
    ? `Speak this cheerfully as a child in ${languageName} accent: "${cleanText}". Phonetic guide: ${phoneticGuide}`
    : `Speak this cheerfully as a child in ${languageName} accent: "${cleanText}"`;

  const response = await callGeminiAPI('generateTTS', {
    model: "gemini-2.5-flash-preview-tts",
    contents: { parts: [{ text: prompt }] },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
    },
  });

  const b64 = response.audioBase64;
  if (b64) {
    saveData(STORES.TTS_CACHE, cacheKey, b64).catch(() => {});
    await playAudioBuffer(b64);
  }
};

export const analyzeGrammar = async (text: string, style: WritingStyle, context: WritingContext, targetLang: TargetLanguage, withPlagiarism: boolean = false): Promise<AnalysisResult> => {
  const targetLanguageName = LANGUAGE_MAP[targetLang] || targetLang;
  
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-3-flash-preview",
    contents: `Analisis teks: "${sanitizeInput(text)}". 
    Gaya: ${style}, Konteks: ${context}.
    Tugas tambahan: Terjemahkan 'correctedText' ke dalam ${targetLanguageName}.`,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: `Anda Tara, pakar bahasa Indonesia.
      Tugas utama:
      1. Koreksi EYD dan tata bahasa Indonesia sesuai gaya '${style}' dan konteks '${context}'.
      2. Berikan summary singkat dalam bahasa Indonesia.
      3. Berikan ReadingGuideIndo (panduan baca suku kata).
      4. WAJIB TERJEMAHKAN naskah hasil koreksi ke '${targetLanguageName}'. Berikan hasil yang SANGAT AUTENTIK dengan dialek daerah tersebut (pilihan diksi yang lazim di daerah tersebut).
      5. Berikan saran perbaikan (Suggestions) yang mendalam.
      6. Deteksi isViolation (kata kotor/SARA).
      Respon dalam format JSON murni sesuai schema.`,
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
              languageName: { type: Type.STRING },
              readingGuide: { type: Type.STRING }
            }
          }
        },
        required: ["correctedText", "summary", "styleScore", "suggestions", "translation", "readingGuideIndo", "isViolation"]
      }
    },
  });

  const data: AnalysisResult = JSON.parse(response.text || "{}");
  
  if (data.translation && !data.translation.languageName) {
    data.translation.languageName = targetLanguageName;
  }

  if (withPlagiarism) {
    const pResponse = await callGeminiAPI('generateContent', {
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
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-3-flash-preview",
    contents: { 
      parts: [
        { text: "Transkripsikan audio ini." }, 
        { inlineData: { data: base64Audio, mimeType: mimeType.split(';')[0] } }
      ] 
    },
    config: {
      systemInstruction: "Kamu adalah mesin transkripsi otomatis. Tugasmu hanya menuliskan kembali ucapan dari audio secara akurat. DILARANG memberikan pembukaan seperti 'Hasil transkripsi adalah', DILARANG memberikan penjelasan, dan DILARANG memberikan komentar apapun. Cukup keluarkan teks transkripsinya saja.", 
      thinkingConfig: { thinkingBudget: 0 } 
    }
  });
  return (response.text || "").trim();
};

export const analyzePronunciation = async (
  base64Audio: string, 
  mimeType: string, 
  targetText: string, 
  languageName: string
): Promise<PronunciationResult> => {
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-3-flash-preview",
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
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-3-flash-preview",
    contents: "Jelaskan tentang Teduh Aksara secara singkat dan puitis sebagai Tara si Pohon Kersen.",
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });
  return response.text || "Aku adalah Tara, pohon kersen tempat naskahmu berteduh dan tumbuh.";
};