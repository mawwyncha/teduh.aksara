// services/gemini-core.ts - VERSI AMAN
const IS_DEV = import.meta.env.DEV;

// ==================== GEMINI API CALLER ====================

export const callGeminiAPI = async (action: 'generateContent' | 'generateTTS', params: any): Promise<any> => {
  // SELALU PAKAI NETLIFY FUNCTION DI PRODUCTION
  // Di development, kita bisa pakai local function atau langsung
  
  if (IS_DEV) {
    console.log('🔧 [DEV MODE] Menggunakan Netlify Function lokal');
    // Di development, kita asumsi ada netlify dev server yang jalan
  }

  // PASTIKAN: Semua calls melalui Netlify Function
  console.log('🔒 Memanggil Gemini via Netlify Function');
  
  try {
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
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    throw error;
  }
};

// ✅ VERSI AMAN untuk TTS (melalui server)
export const directTTSApiCall = async (prompt: string, voiceName: string = "Puck"): Promise<string | null> => {
  try {
    console.log('🎤 Memanggil TTS via Netlify Function...');
    
    // KIRIM REQUEST KE NETLIFY FUNCTION, BUKAN LANGSUNG KE GEMINI
    const response = await fetch('/.netlify/functions/ai-gateway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'tts',
        provider: 'gemini',
        payload: {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName }
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      console.error('❌ TTS API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.success && data.data?.audioBase64) {
      console.log('✅ TTS audio received via gateway');
      return data.data.audioBase64;
    } else {
      console.warn('⚠️ No audio data in response');
      return null;
    }
  } catch (error) {
    console.error('❌ TTS call failed:', error);
    return null;
  }
};

// ==================== HELPER FUNCTIONS ====================

export const sanitizeInput = (text: string): string => {
  return text
    .replace(/<[^>]*>?/gm, '') 
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]/g, ' ') 
    .trim();
};

export const sanitizeForTTS = (text: string) => {
  return text
    .slice(0, 2000) 
    .replace(/[*_#~`>|]/g, ' ')
    .replace(/[^\w\s,.?!;()\-'\u00C0-\u00FF]/gi, '')
    .trim();
};

export const hashText = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

// Language mapping (tetap sama)
export const LANGUAGE_MAP: Record<string, string> = {
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