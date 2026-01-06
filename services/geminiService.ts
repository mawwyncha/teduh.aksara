
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisResult, WritingStyle, WritingContext, TargetLanguage } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  return new GoogleGenAI({ apiKey });
};

// Fungsi decode manual sesuai panduan Coding Guidelines
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

export const generateSpeech = async (text: string, translationText?: string): Promise<void> => {
  const sanitizedText = text.slice(0, 1000).replace(/[*_#~]/g, '');
  const sanitizedTranslation = translationText?.slice(0, 1000).replace(/[*_#~]/g, '');

  return new Promise(async (resolve, reject) => {
    try {
      const ai = getAI();
      const combinedPrompt = sanitizedTranslation 
        ? `Bacakan: ${sanitizedText}. Lalu katakan 'Dalam bahasa lain' dan bacakan: ${sanitizedTranslation}`
        : `Bacakan dengan tenang: ${sanitizedText}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: combinedPrompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { voiceName: 'Kore' } 
            } 
          },
        },
      });

      const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!b64) {
        resolve();
        return;
      }

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const bytes = decode(b64);
      const buf = await decodeAudioData(bytes, ctx, 24000, 1);
      
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      
      src.onended = () => {
        setTimeout(() => ctx.close(), 100);
        resolve();
      };

      src.start();
    } catch (err: any) {
      console.error("Detail Error TTS:", err);
      reject(err);
    }
  });
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const ai = getAI();
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
  const langMap: Record<TargetLanguage, string> = { 
    en_us: 'Inggris (Amerika Serikat)',
    en_uk: 'Inggris (Britania Raya)',
    en_au: 'Inggris (Australia)',
    jv_central: 'Jawa Tengah (Solo/Mataraman)',
    jv_yogyakarta: 'Jawa Yogyakarta',
    jv_central_coastal: 'Jawa (Semarang/Demak)',
    jv_east: 'Jawa Timur (Arekan)',
    su: 'Sunda',
    min: 'Minangkabau',
    ban: 'Bali',
    bug: 'Bugis',
    mad: 'Madura',
    ace: 'Aceh',
    bjn: 'Banjar',
    mk: 'Makassar',
    bt_toba: 'Batak Toba',
    bt_karo: 'Batak Karo (Gunakan dialek Karo otentik)',
    lp: 'Lampung',
    sas: 'Sasak (Lombok)',
    pap: 'Melayu Papua',
    amb: 'Melayu Ambon',
    go: 'Gorontalo',
    ni: 'Nias',
    tet: 'Tetum (Timor Leste)',
    pt_tl: 'Portugis (Timor Leste)',
    zh_hokkien_medan: 'Hokkien Medan',
    zh_hokkien_jakarta: 'Hokkien Jakarta',
    zh_hakka_singkawang: 'Hakka Singkawang',
    zh_hakka_bangka: 'Hakka Bangka',
    zh_teochew_pontianak: 'Teochew Pontianak',
    zh_cantonese_id: 'Cina Kanton Indonesia (Konghu)'
  };
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Koreksi teks ini: "${text}". Gaya: ${style}, Konteks: ${context}. Selain itu, terjemahkan hasil koreksinya ke bahasa ${langMap[targetLang]} dan berikan cara membacanya (fonetik Indonesia).`,
    config: {
      systemInstruction: `Anda Tara, pakar bahasa Indonesia dan berbagai dialek Nusantara termasuk ragam Cina Indonesia regional. 
      Tugas: 
      1. Koreksi naskah.
      2. Berikan 'readingGuideIndo' berupa pemenggalan suku kata teks Indonesia.
      3. Terjemahkan ke dialek target. JANGAN gunakan Mandarin standar. Gunakan dialek regional Indonesia yang diminta secara otentik.
      4. Berikan 'readingGuide' untuk teks terjemahan tersebut.
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
      systemInstruction: "Anda Tara, maskot Teduh Aksara. Jelaskan platform ini sebagai pengoreksi bahasa yang menenangkan. Maks 2 kalimat puitis. Jangan bahas KBBI, Puebi, dan EYD.",
    },
  });
  return response.text || "Aku Tara, penjaga Teduh Aksara yang membantumu merapikan dahan bahasa agar aksaramu tumbuh indah.";
};
