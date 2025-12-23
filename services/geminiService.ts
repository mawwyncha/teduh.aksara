
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisResult, WritingStyle, WritingContext, PlagiarismResult } from "../types";

// Helper untuk inisialisasi instance AI agar selalu mendapatkan state terbaru
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// Utility untuk decoding base64 audio
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

export const generateSpeech = async (text: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Bacakan teks berikut dengan tenang: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
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

export const checkPlagiarism = async (text: string): Promise<PlagiarismResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analisis orisinalitas teks ini: "${text}"`,
    config: {
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingBudget: 0 }
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
      ? `Ditemukan ${sources.length} dahan serupa di internet.`
      : `Teksmu segar dan murni seperti embun pagi.`
  };
};

export const analyzeGrammar = async (
  text: string, 
  style: WritingStyle, 
  context: WritingContext,
  withPlagiarism: boolean = false
): Promise<AnalysisResult> => {
  const ai = getAI();
  
  const grammarTask = ai.models.generateContent({
    model: "gemini-3-pro-preview", 
    contents: `Teks yang akan dianalisis: "${text}". 
    Terapkan gaya: ${style} dan konteks: ${context}.`,
    config: {
      systemInstruction: `Kamu adalah Tara, otoritas tertinggi dalam tata bahasa Indonesia. 
      Tugas utamamu adalah melakukan audit dan koreksi teks dengan kepatuhan MUTLAK terhadap standar resmi:
      1. KBBI Kemendikbud (Kamus Besar Bahasa Indonesia) - https://kbbi.kemdikbud.go.id/
      2. EYD Versi V (Ejaan Yang Disempurnakan) / PUEBI Terbaru - https://eyd.netlify.app/
      
      Aturan Audit:
      - Ejaan: Pastikan kata-kata adalah bentuk baku (misal: 'risiko' bukan 'resiko', 'kualitas' bukan 'kwalitas').
      - Tanda Baca: Koreksi penggunaan titik, koma, tanda tanya, tanda seru, dan huruf kapital sesuai EYD V.
      - Kalimat: Pastikan struktur kalimat efektif, subjek dan predikat jelas, serta tidak ambigu.
      - Alasan: Berikan alasan yang jelas berdasarkan aturan EYD/KBBI untuk setiap koreksi.
      
      Pertahankan nada penulisan asli (Gaya: ${style}) namun pastikan tetap dalam koridor kebahasaan yang benar.
      Respon harus dalam format JSON dengan skema yang ketat.`,
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 4000 }, 
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctedText: { type: Type.STRING },
          summary: { type: Type.STRING },
          styleScore: { type: Type.INTEGER },
          culturalNote: { type: Type.STRING },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacement: { type: Type.STRING },
                reason: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['spelling', 'grammar', 'style', 'punctuation', 'cultural'] },
                kbbiLink: { type: Type.STRING }
              }
            },
          },
        },
        required: ["correctedText", "suggestions", "summary", "styleScore"],
      },
    },
  });

  if (withPlagiarism) {
    const [grammarResponse, plagiarismResult] = await Promise.all([
      grammarTask,
      checkPlagiarism(text)
    ]);
    
    const result = JSON.parse(grammarResponse.text);
    result.plagiarism = plagiarismResult;
    return result;
  } else {
    const response = await grammarTask;
    return JSON.parse(response.text);
  }
};
