// services/analysis-service.ts - VERSI DIPERBARUI DENGAN HYBRID AI
import { callGeminiAPI, sanitizeInput, LANGUAGE_MAP } from './gemini-core';
import { 
  AnalysisResult, 
  WritingStyle, 
  WritingContext, 
  TargetLanguage, 
  PronunciationResult,
  GrammarSuggestion,
  SuggestionType
} from '../types';
import { secureAIClient } from './secure-ai-client';

/**
 * Analyze grammar, style, and translate text dengan HYBRID AI
 */
export const analyzeGrammar = async (
  text: string, 
  style: WritingStyle, 
  context: WritingContext, 
  targetLang: TargetLanguage, 
  withPlagiarism: boolean = false
): Promise<AnalysisResult> => {
  const targetLanguageName = LANGUAGE_MAP[targetLang] || targetLang;
  
  try {
    // ✅ PAKAI HYBRID AI CLIENT (DENGAN FAILOVER)
    console.log(`🔍 Menggunakan Hybrid AI untuk analisis grammar...`);
    
    const aiResult = await secureAIClient.analyzeGrammar(
      text,
      style,
      context,
      targetLanguageName,
      withPlagiarism
    );
    
    if (!aiResult.success) {
      throw new Error(aiResult.error || 'Hybrid AI gagal');
    }
    
    console.log(`✅ Berhasil menggunakan: ${aiResult.provider} (${aiResult.latency}ms)`);
    
    // Parse hasil berdasarkan provider
    let data: AnalysisResult;
    
    if (aiResult.provider === 'cache') {
      // Hasil dari cache
      data = aiResult.result;
    } else if (aiResult.provider.includes('Gemini')) {
      // Hasil dari Gemini (format JSON)
      data = typeof aiResult.result === 'string' 
        ? JSON.parse(aiResult.result) 
        : aiResult.result;
    } else {
      // Hasil dari provider lain (DeepSeek, Groq, dll)
      // Konversi ke format yang sama dengan Gemini
      data = convertToAnalysisResult(aiResult.result, text, style, context, targetLanguageName);
    }
    
    // ✨ METADATA DIHAPUS - pindah ke HistoryItem nanti
    
    // Pastikan translation punya languageName
    if (data.translation && !data.translation.languageName) {
      data.translation.languageName = targetLanguageName;
    }

    // Pastikan readingGuideIndo ada
    if (!data.readingGuideIndo) {
      data.readingGuideIndo = generateReadingGuide(data.correctedText || text);
    }

    // Plagiarism check if requested (hanya Gemini yang support)
    if (withPlagiarism) {
      try {
        console.log('🔎 Melakukan plagiarism check dengan Gemini...');
        
        // Untuk plagiarism, pakai Gemini langsung karena butuh web search
        const pResponse = await callGeminiAPI('generateContent', {
          model: "gemini-1.5-flash",
          contents: [{
            parts: [{
              text: `Lakukan analisis orisinalitas/plagiarisme untuk naskah ini: "${sanitizeInput(text)}". 
HANYA cari kemiripan pada dahan-dahan web yang bersifat OPEN SOURCE, PUBLIC DOMAIN, atau berlisensi CREATIVE COMMONS.
DILARANG KERAS merujuk pada konten berbayar (paywall) atau situs privat tertutup.
Konteks penulisan ini adalah ${context} dengan gaya ${style}.`
            }]
          }],
          config: { 
            tools: [{ googleSearchRetrieval: {} }]
          }
        });
        
        const chunks = pResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ 
            uri: c.web!.uri!, 
            title: c.web!.title! || "Sumber Web"
          }))
          .slice(0, 3);

        data.plagiarism = {
          score: sources.length > 0 ? (sources.length * 20 + 15) : 0,
          sources,
          summary: sources.length > 0 
            ? "Tara menemukan kemiripan aksaramu pada beberapa dahan di web luas, Sahabat." 
            : "Naskahmu tampak sangat murni dan orisinal di taman web."
        };
      } catch (e) {
        console.error("Plagiarism check failed:", e);
        data.plagiarism = { 
          score: 0, 
          sources: [], 
          summary: "Gagal menelusuri dahan web saat ini." 
        };
      }
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Hybrid AI system gagal, falling back ke Gemini langsung:', error);
    
    // ✅ FALLBACK: Pakai Gemini langsung
    return await analyzeGrammarWithGemini(text, style, context, targetLang, withPlagiarism);
  }
};

/**
 * Fallback function: Pakai Gemini langsung
 */
async function analyzeGrammarWithGemini(
  text: string, 
  style: WritingStyle, 
  context: WritingContext, 
  targetLang: TargetLanguage, 
  withPlagiarism: boolean = false
): Promise<AnalysisResult> {
  const targetLanguageName = LANGUAGE_MAP[targetLang] || targetLang;
  
  console.log('🔄 Fallback ke Gemini langsung...');
  
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-1.5-flash",
    contents: [{
      parts: [{
        text: `Analisis teks: "${sanitizeInput(text)}". 
Gaya: ${style}, Konteks: ${context}.
Tugas tambahan: Terjemahkan 'correctedText' ke dalam ${targetLanguageName}.`
      }]
    }],
    config: {
      systemInstruction: `Anda Tara, pakar bahasa Indonesia.
Tugas utama:
1. Koreksi EYD dan tata bahasa Indonesia sesuai gaya '${style}' dan konteks '${context}'.
2. Berikan summary singkat dalam bahasa Indonesia.
3. Berikan ReadingGuideIndo (panduan baca suku kata).
4. WAJIB TERJEMAHKAN naskah hasil koreksi ke '${targetLanguageName}'. Berikan hasil yang SANGAT AUTENTIK dengan dialek daerah tersebut.
5. Berikan saran perbaikan (Suggestions) yang mendalam.
6. Deteksi isViolation (kata kotor/SARA).
Respon dalam format JSON murni.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          correctedText: { type: "string" },
          summary: { type: "string" },
          styleScore: { type: "number" },
          readingGuideIndo: { type: "string" },
          isViolation: { type: "boolean" },
          suggestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                original: { type: "string" },
                replacement: { type: "string" },
                reason: { type: "string" },
                type: { type: "string" }
              }
            }
          },
          translation: {
            type: "object",
            properties: {
              translatedText: { type: "string" },
              languageName: { type: "string" },
              readingGuide: { type: "string" }
            }
          }
        },
        required: ["correctedText", "summary", "styleScore", "suggestions", "translation", "readingGuideIndo", "isViolation"]
      }
    }
  });

  const data: AnalysisResult = JSON.parse(response.text || "{}");
  
  if (data.translation && !data.translation.languageName) {
    data.translation.languageName = targetLanguageName;
  }

  // Plagiarism check if requested
  if (withPlagiarism) {
    try {
      const pResponse = await callGeminiAPI('generateContent', {
        model: "gemini-1.5-flash",
        contents: [{
          parts: [{
            text: `Lakukan analisis orisinalitas/plagiarisme untuk naskah ini: "${sanitizeInput(text)}". 
HANYA cari kemiripan pada dahan-dahan web yang bersifat OPEN SOURCE, PUBLIC DOMAIN, atau berlisensi CREATIVE COMMONS.
DILARANG KERAS merujuk pada konten berbayar (paywall) atau situs privat tertutup.
Konteks penulisan ini adalah ${context} dengan gaya ${style}.`
          }]
        }],
        config: { 
          tools: [{ googleSearchRetrieval: {} }]
        }
      });
      
      const chunks = pResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .filter((c: any) => c.web)
        .map((c: any) => ({ 
          uri: c.web!.uri!, 
          title: c.web!.title! || "Sumber Web"
        }))
        .slice(0, 3);

      data.plagiarism = {
        score: sources.length > 0 ? (sources.length * 20 + 15) : 0,
        sources,
        summary: sources.length > 0 
          ? "Tara menemukan kemiripan aksaramu pada beberapa dahan di web luas, Sahabat." 
          : "Naskahmu tampak sangat murni dan orisinal di taman web."
      };
    } catch (e) {
      console.error("Plagiarism check failed:", e);
      data.plagiarism = { 
        score: 0, 
        sources: [], 
        summary: "Gagal menelusuri dahan web saat ini." 
      };
    }
  }
  
  // ✨ METADATA DIHAPUS
  
  return data;
}

/**
 * Convert hasil dari non-Gemini providers ke format AnalysisResult
 */
function convertToAnalysisResult(
  rawResult: any,
  originalText: string,
  style: string,
  context: string,
  targetLanguage: string
): AnalysisResult {
  // Jika rawResult sudah dalam format yang benar
  if (rawResult.correctedText && rawResult.suggestions) {
    return rawResult;
  }
  
  // Jika berupa plain text dari DeepSeek/Groq
  if (typeof rawResult.text === 'string') {
    const text = rawResult.text;
    
    // Coba parse JSON dari teks
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Bukan JSON, lanjut ke parsing manual
    }
    
    // Parsing manual dari teks
    return {
      correctedText: originalText,
      summary: text.substring(0, 200),
      styleScore: 70,
      readingGuideIndo: generateReadingGuide(originalText),
      isViolation: false,
      suggestions: extractSuggestionsFromText(text),
      translation: {
        translatedText: originalText,
        languageName: targetLanguage,
        readingGuide: generateReadingGuide(originalText)
      }
      // ✨ METADATA DIHAPUS
    };
  }
  
  // Default fallback
  return {
    correctedText: originalText,
    summary: "Analisis selesai.",
    styleScore: 50,
    readingGuideIndo: generateReadingGuide(originalText),
    isViolation: false,
    suggestions: [],
    translation: {
      translatedText: originalText,
      languageName: targetLanguage,
      readingGuide: generateReadingGuide(originalText)
    }
  };
}

/**
 * Generate reading guide untuk teks
 */
function generateReadingGuide(text: string): string {
  if (!text) return '';
  return text.split(' ').map(word => {
    if (word.length <= 3) return word;
    return word.match(/.{1,2}/g)?.join('-') || word;
  }).join(' ');
}

/**
 * Extract suggestions dari teks plain
 */
function extractSuggestionsFromText(text: string): GrammarSuggestion[] {
  const suggestions: GrammarSuggestion[] = [];
  
  const lines = text.split('\n');
  lines.forEach(line => {
    if (line.includes('seharusnya') || line.includes('sebaiknya')) {
      suggestions.push({
        original: '...',
        replacement: '...',
        reason: line.substring(0, 100),
        type: 'Gaya Bahasa' // ← PAKAI SuggestionType yang valid
      });
    }
  });
  
  // Jika tidak ada saran, kasih default
  if (suggestions.length === 0) {
    suggestions.push({
      original: '...',
      replacement: '...',
      reason: 'Teks sudah sesuai dengan kaidah',
      type: 'Gaya Bahasa'
    });
  }
  
  return suggestions;
}

/**
 * Transcribe audio to text (tetap pakai Gemini untuk akurasi)
 */
export const transcribeAudio = async (
  base64Audio: string, 
  mimeType: string
): Promise<string> => {
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-1.5-flash",
    contents: [{ 
      parts: [
        { text: "Transkripsikan audio ini ke teks Bahasa Indonesia." }, 
        { 
          inlineData: { 
            data: base64Audio, 
            mimeType: mimeType.split(';')[0] 
          } 
        }
      ] 
    }],
    config: {
      systemInstruction: "Kamu adalah mesin transkripsi otomatis. Tugasmu hanya menuliskan kembali ucapan dari audio secara akurat. DILARANG memberikan pembukaan seperti 'Hasil transkripsi adalah', DILARANG memberikan penjelasan, dan DILARANG memberikan komentar apapun. Cukup keluarkan teks transkripsinya saja.", 
    }
  });
  
  return (response.text || "").trim();
};

/**
 * Analyze pronunciation quality (tetap pakai Gemini)
 */
export const analyzePronunciation = async (
  base64Audio: string, 
  mimeType: string, 
  targetText: string, 
  languageName: string
): Promise<PronunciationResult> => {
  const response = await callGeminiAPI('generateContent', {
    model: "gemini-1.5-flash",
    contents: [{
      parts: [
        { 
          text: `Evaluasi pelafalan "${targetText}" dalam ${languageName}. Berikan skor (0-100), feedback, encouragement, dan transkripsi. Respon JSON.` 
        },
        { 
          inlineData: { 
            data: base64Audio, 
            mimeType: mimeType.split(';')[0] 
          } 
        }
      ]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          score: { type: "number" },
          feedback: { type: "string" },
          encouragement: { type: "string" },
          transcription: { type: "string" }
        },
        required: ["score", "feedback", "encouragement", "transcription"]
      }
    }
  });
  
  return JSON.parse(response.text || "{}");
};

/**
 * Ask Tara about the platform
 */
export const askTaraAboutPlatform = async (): Promise<string> => {
  try {
    const aiResult = await secureAIClient.analyzeGrammar(
      "Jelaskan Teduh Aksara secara singkat dan puitis sebagai Tara si Pohon Kersen.",
      "poetic" as WritingStyle,
      "introduction" as WritingContext,
      "Bahasa Indonesia",
      false
    );
    
    if (aiResult.success && aiResult.result.summary) {
      return aiResult.result.summary;
    }
    
    const response = await callGeminiAPI('generateContent', {
      model: "gemini-1.5-flash",
      contents: [{
        parts: [{ 
          text: "Jelaskan Teduh Aksara secara singkat dan puitis sebagai Tara si Pohon Kersen." 
        }]
      }]
    });
    
    return response.text || "Aku adalah Tara, tempat naskahmu berteduh.";
  } catch (e) {
    console.error('Ask Tara failed:', e);
    return "Dahanku berayun tertiup angin, coba lagi ya.";
  }
};