
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisResult, WritingStyle, WritingContext, PlagiarismResult, TargetLanguage, TranslationResult } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("API_KEY tidak ditemukan. Pastikan variabel lingkungan sudah diatur.");
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey });
};

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

export const generateSpeech = async (text: string, lang: string = 'id') => {
  try {
    const ai = getAI();
    const prompt = lang === 'id' 
      ? `Bacakan teks berikut dengan perlahan dan tenang: ${text}`
      : `Read this text clearly in ${lang}: ${text}`;
      
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: lang === 'id' ? 'Kore' : 'Zephyr' } },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), audioCtx, 24000);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  } catch (err) {
    console.error("Gagal memutar suara:", err);
  }
};

export const translateText = async (text: string, targetLang: TargetLanguage): Promise<TranslationResult> => {
  const langMap: Record<TargetLanguage, string> = {
    en: 'Bahasa Inggris',
    ja: 'Bahasa Jepang',
    ar: 'Bahasa Arab',
    ko: 'Bahasa Korea'
  };

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Terjemahkan naskah ini ke ${langMap[targetLang]}: "${text}"`,
      config: {
        systemInstruction: `Anda adalah Tara si Pohon Kersen, seorang penerjemah yang puitis dan akurat. 
        Terjemahkan teks dengan mempertahankan rasa, konteks, dan tingkat formalitasnya.
        Hasil harus dalam JSON.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: { type: Type.STRING },
            note: { type: Type.STRING, description: "Catatan singkat tentang nuansa terjemahan." }
          },
          required: ["translatedText"]
        }
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      translatedText: result.translatedText,
      languageName: langMap[targetLang],
      note: result.note
    };
  } catch (err) {
    console.error("Terjemahan gagal:", err);
    throw err;
  }
};

export const askTaraAboutPlatform = async (): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Jelaskan siapa kamu (Tara si Pohon Kersen) dan apa itu platform 'Teduh Aksara' ini kepada pengguna.",
      config: {
        systemInstruction: "Anda adalah Tara si Pohon Kersen, maskot pohon kersen yang bijak dan tenang. Jelaskan bahwa Teduh Aksara adalah platform untuk mengoreksi tata bahasa Indonesia (EYD V), gaya bahasa, dan cek plagiarisme. Gunakan gaya bahasa yang puitis, santun, and menenangkan (vibes alam). Maksimal 3 kalimat pendek.",
      },
    });
    return response.text || "Aku Tara si Pohon Kersen, penjaga Teduh Aksara. Di sini, aku membantu menyelaraskan setiap aksaramu agar tumbuh rapi dan indah sesuai kaidah bahasa kita.";
  } catch (err) {
    return "Aku Tara si Pohon Kersen, di sini untuk membantumu merapikan naskah agar lebih nyaman dibaca.";
  }
};

export const checkPlagiarism = async (text: string): Promise<PlagiarismResult> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Periksa sumber internet untuk teks ini: "${text}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        uri: chunk.web?.uri || "",
        title: chunk.web?.title || "Sumber Internet"
      }));

    return {
      score: sources.length > 0 ? Math.min(sources.length * 15, 95) : 0,
      sources: sources,
      summary: sources.length > 0 
        ? `Terdapat kemiripan dengan beberapa sumber di web.`
        : `Teks tampak asli dan tidak ditemukan di database publik.`
    };
  } catch (err) {
    console.error("Gagal cek plagiarisme:", err);
    return { score: 0, sources: [], summary: "Layanan cek plagiarisme sedang beristirahat." };
  }
};

export const analyzeGrammar = async (
  text: string, 
  style: WritingStyle, 
  context: WritingContext,
  withPlagiarism: boolean = false
): Promise<AnalysisResult> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Koreksi naskah ini: "${text}". Gaya: ${style}, Konteks: ${context}.`,
      config: {
        systemInstruction: `Anda adalah Tara si Pohon Kersen, pakar bahasa Indonesia yang bijak. Tugas Anda:
        1. Koreksi teks sesuai KBBI dan PUEBI (EYD V).
        2. Kategori wajib: 'Ejaan', 'Tata Bahasa', 'Gaya Bahasa', 'Tanda Baca', 'Budaya'.
        3. Hasil harus dalam JSON.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctedText: { type: Type.STRING },
            summary: { type: Type.STRING },
            styleScore: { type: Type.INTEGER },
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
            }
          },
          required: ["correctedText", "summary", "styleScore", "suggestions"]
        }
      },
    });

    if (!response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    const data: AnalysisResult = JSON.parse(response.text);

    if (withPlagiarism) {
      data.plagiarism = await checkPlagiarism(text);
    }

    return data;
  } catch (err) {
    console.error("Analisis gagal:", err);
    throw err;
  }
};
