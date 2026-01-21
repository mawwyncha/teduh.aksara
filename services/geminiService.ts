
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

// Security: Sanitization helper to strip potentially dangerous script/injection chars
const sanitizeInput = (text: string): string => {
  return text
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]/g, ' ') // Strip non-printable/dangerous chars
    .trim();
};

// Internal decoding helpers
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
    .slice(0, 800)
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

const canUseWebSpeech = (languageName: string): string | null => {
  const webSpeechMap: Record<string, string> = {
    'Bahasa Indonesia': 'id-ID',
    'Inggris (AS)': 'en-US',
    'Inggris (UK)': 'en-GB',
    'Inggris (AU)': 'en-AU',
    'Jawa': 'jv-ID',
    'Sunda': 'su-ID',
    'Kanton Indo': 'zh-HK',
    'Portugis TL': 'pt-PT',
    'Hokkien Medan': 'zh-CN',
    'Hokkien JKT': 'zh-CN',
    'Hakka Singkawang': 'zh-CN',
    'Teochew Pontianak': 'zh-CN'
  };
  return webSpeechMap[languageName] || null;
};

const speakWithWebAPI = (text: string, lang: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('WEB_SPEECH_NOT_SUPPORTED'));
      return;
    }
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    
    speechSynthesis.speak(utterance);
  });
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
      
      src.onended = () => {
        ctx.close();
        resolve();
      };
      
      src.start();
    } catch (e) {
      console.error("Playback error:", e);
      resolve(); 
    }
  });
};

export const generateSpeech = async (
  text: string, 
  languageName: string = "Bahasa Indonesia", 
  phoneticGuide?: string
): Promise<void> => {
  const cleanText = sanitizeForTTS(text);
  if (!cleanText) return;

  const webLang = canUseWebSpeech(languageName);
  
  if (webLang && !phoneticGuide) {
    try {
      await speakWithWebAPI(cleanText, webLang);
      return;
    } catch (e) {
      console.warn(`Web Speech failed for ${languageName}, falling back to Gemini TTS`);
    }
  }

  const cacheKey = `tts_${hashText(cleanText + languageName + (phoneticGuide || ""))}`;
  try {
    const cached = await getData(STORES.TTS_CACHE, cacheKey);
    if (cached) {
      await playAudioBuffer(cached);
      return;
    }
  } catch (e) {}

  const ai = getAI();
  const prompt = phoneticGuide 
    ? `Speak this in ${languageName} accent: "${cleanText}". Phonetic guide: ${phoneticGuide}`
    : `Speak this in ${languageName} accent: "${cleanText}"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { 
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } 
      },
    },
  });

  const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (b64) {
    saveData(STORES.TTS_CACHE, cacheKey, b64).catch(() => {});
    await playAudioBuffer(b64);
  }
};

export const preloadWebSpeechVoices = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) resolve();
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  });
};

const LANG_NAME_MAP: Record<TargetLanguage, string> = { 
  en_us: 'Inggris (AS)', en_uk: 'Inggris (UK)', en_au: 'Inggris (AU)',
  jv_central: 'Jawa', jv_yogyakarta: 'Jawa Jogja', jv_central_coastal: 'Jawa Pesisir', jv_east: 'Jawa Timur',
  su: 'Sunda', min: 'Minang', ban: 'Bali', bug: 'Bugis', mad: 'Madura', ace: 'Aceh', bjn: 'Banjar', mk: 'Makassar',
  bt_toba: 'Batak Toba', bt_karo: 'Batak Karo', lp: 'Lampung', sas: 'Sasak', pap: 'Melayu Papua', amb: 'Melayu Ambon',
  go: 'Gorontalo', ni: 'Nias', tet: 'Tetum', pt_tl: 'Portugis TL',
  zh_hokkien_medan: 'Hokkien Medan', zh_hokkien_jakarta: 'Hokkien JKT', zh_hakka_singkawang: 'Hakka Singkawang',
  zh_hakka_bangka: 'Hakka Bangka', zh_teochew_pontianak: 'Teochew Pontianak', zh_cantonese_id: 'Kanton Indo'
};

export const analyzeGrammar = async (
  text: string, 
  style: WritingStyle, 
  context: WritingContext,
  targetLang: TargetLanguage,
  withPlagiarism: boolean = false
): Promise<AnalysisResult> => {
  const ai = getAI();
  const langName = LANG_NAME_MAP[targetLang];
  const safeText = sanitizeInput(text);

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analisis teks: "${safeText}". Gaya: ${style}, Konteks: ${context}, Target: ${langName}.`,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: `Anda Tara, pakar bahasa Indonesia. Tugas: 1. Koreksi EYD. 2. Summary singkat. 3. ReadingGuideIndo. 4. Translation. 5. Suggestions. 6. isViolation detection (kasar/SARA/serangan teknis). Respon JSON murni.`,
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
                type: { type: Type.STRING, enum: ['Ejaan', 'Tata Bahasa', 'Gaya Bahasa', 'Tanda Baca', 'Budaya'] }
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
  if (data.translation) data.translation.languageName = langName;

  if (withPlagiarism) {
    const pResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Cek plagiarisme di web untuk: "${safeText}".`,
      config: { thinkingConfig: { thinkingBudget: 0 }, tools: [{ googleSearch: {} }] },
    });
    const chunks = pResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks.filter(c => c.web).map(c => ({ uri: c.web!.uri!, title: c.web!.title! })).slice(0, 3);
    data.plagiarism = {
      score: sources.length > 0 ? 40 : 0,
      sources,
      summary: sources.length > 0 ? "Ditemukan beberapa kemiripan dahan di web." : "Naskahmu tampak orisinal."
    };
  }

  return data;
};

/**
 * CHAT REGIONAL (Kawan Aksara AI)
 */
export const chatRegional = async (
  messages: { role: 'user' | 'model'; text: string }[],
  targetLang: TargetLanguage
): Promise<string> => {
  const ai = getAI();
  const langName = LANG_NAME_MAP[targetLang];
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: messages.map(m => ({ role: m.role, parts: [{ text: sanitizeInput(m.text) }] })),
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: `Anda adalah "Kawan Aksara", asisten cerdas yang sangat ahli dalam ${langName} dan budaya Indonesia. 
      Tugas Anda adalah membalas percakapan pengguna HANYA menggunakan ${langName}. 
      Gunakan nada bicara yang hangat, sopan, puitis (seperti teman lama), dan edukatif. 
      Jika pengguna bertanya tentang bahasa tersebut, berikan penjelasan singkat yang menarik. 
      Patuhi Etika Beraksara: Jangan gunakan kata kasar.`
    }
  });

  return response.text || "Maaf, dahan pikiranku sedang tersangkut angin.";
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { parts: [{ text: "Transkripsikan audio ini ke teks Bahasa Indonesia." }, { inlineData: { data: base64Audio, mimeType: mimeType.split(';')[0] } }] }
    ],
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
  const safeTarget = sanitizeInput(targetText);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: `Evaluasi pelafalan "${safeTarget}" dalam ${languageName}. Berikan skor (0-100), feedback, encouragement, dan transkripsi. Respon JSON.` },
          { inlineData: { data: base64Audio, mimeType: mimeType.split(';')[0] } }
        ]
      }
    ],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
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
