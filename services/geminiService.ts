
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisResult, WritingStyle, WritingContext, TargetLanguage } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  return new GoogleGenAI({ apiKey });
};

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0, l = dataInt16.length; i < l; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

export const generateSpeech = async (text: string, translationText?: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ai = getAI();
      const combinedPrompt = translationText 
        ? `Bacakan naskah Indonesia ini dengan tenang: "${text}". Beri jeda sejenak, lalu katakan 'Dalam bahasa lain' dan bacakan terjemahannya: "${translationText}"`
        : `Bacakan naskah ini dengan tenang: ${text}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: combinedPrompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!b64) {
        resolve();
        return;
      }

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      
      const buf = await decodeAudioData(bytes, ctx, 24000);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      
      src.onended = () => {
        resolve();
      };

      src.start();
    } catch (err) {
      console.warn("TTS Failed", err);
      reject(err);
    }
  });
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  // Clean mimeType (e.g. "audio/webm;codecs=opus" -> "audio/webm")
  const cleanMimeType = mimeType.split(';')[0] || "audio/webm";
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "Transkripsikan audio ini ke dalam teks Bahasa Indonesia dengan sangat akurat. Berikan hanya teks transkripsinya saja tanpa komentar tambahan." },
          { inlineData: { data: base64Audio, mimeType: cleanMimeType } }
        ]
      }
    ],
  });
  return response.text || "";
};

export const analyzeGrammar = async (
  text: string, 
  style: WritingStyle, 
  context: WritingContext,
  targetLang: TargetLanguage,
  withPlagiarism: boolean = false
): Promise<AnalysisResult> => {
  const ai = getAI();
  const langMap = { 
    en: 'Inggris', 
    ja: 'Jepang', 
    ar: 'Arab', 
    ko: 'Korea',
    ru: 'Rusia',
    ms: 'Malaysia (Melayu)',
    zh: 'Tionghoa (Mandarin)',
    tet: 'Tetun (Timor Leste)',
    hi: 'Hindi (India)',
    fr: 'Perancis',
    nl: 'Belanda'
  };
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Koreksi teks ini: "${text}". Gaya: ${style}, Konteks: ${context}. Selain itu, terjemahkan hasil koreksinya ke bahasa ${langMap[targetLang]} dan berikan cara membacanya (fonetik) agar mudah diucapkan oleh orang Indonesia.`,
    config: {
      systemInstruction: `Anda Tara, pakar bahasa Indonesia. 
      Tugas: 
      1. Koreksi naskah sesuai EYD V dan KBBI.
      2. Berikan 'readingGuideIndo' berupa pemenggalan suku kata untuk teks Indonesia (contoh: 'mem-ba-ca').
      3. Terjemahkan ke bahasa target.
      4. Berikan 'readingGuide' untuk teks terjemahan tersebut (cara baca fonetik untuk lidah orang Indonesia).
      Respon WAJIB JSON sesuai schema.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctedText: { type: Type.STRING },
          summary: { type: Type.STRING },
          styleScore: { type: Type.INTEGER },
          readingGuideIndo: { type: Type.STRING },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacement: { type: Type.STRING },
                reason: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['Ejaan', 'Tata Bahasa', 'Gaya Bahasa', 'Tanda Baca', 'Budaya'] }
              },
              required: ["original", "replacement", "reason", "type"]
            }
          },
          translation: {
            type: Type.OBJECT,
            properties: {
              translatedText: { type: Type.STRING },
              readingGuide: { type: Type.STRING }
            },
            required: ["translatedText", "readingGuide"]
          }
        },
        required: ["correctedText", "summary", "styleScore", "suggestions", "translation", "readingGuideIndo"]
      }
    },
  });

  const data: AnalysisResult = JSON.parse(response.text || "{}");
  if (data.translation) {
    data.translation.languageName = langMap[targetLang];
  }

  if (withPlagiarism) {
    const pResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Cari kemiripan web untuk naskah: "${text}"`,
      config: { tools: [{ googleSearch: {} }] },
    });
    const chunks = pResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks.filter(c => c.web).map(c => ({ uri: c.web!.uri!, title: c.web!.title! }));
    data.plagiarism = {
      score: sources.length > 0 ? Math.min(sources.length * 20, 98) : 0,
      sources,
      summary: sources.length > 0 ? "Ditemukan kemiripan di dahan web lain." : "Naskahmu murni dan asli."
    };
  }
  return data;
};

export const askTaraAboutPlatform = async (): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Siapa kamu?",
    config: {
      systemInstruction: "Anda Tara, maskot Teduh Aksara. Jelaskan platform ini sebagai pengoreksi EYD V & KBBI AI yang menenangkan. Maks 2 kalimat puitis.",
    },
  });
  return response.text || "Aku Tara, penjaga Teduh Aksara yang membantumu merapikan dahan bahasa agar aksaramu tumbuh indah.";
};
