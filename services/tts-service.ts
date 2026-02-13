import { callGeminiAPI } from './gemini-core';
import { voiceService } from './voiceService';

// ==================== TTS SERVICE - DENGAN WEB SPEECH UNTUK DEV MODE ====================

/**
 * PLAY SUARA LANGSUNG PAKAI WEB SPEECH API (DEV MODE)
 */
const speakWithWebSpeech = (text: string): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('⚠️ Web Speech API tidak didukung');
    return;
  }

  // Cancel speech yang sedang berjalan
  window.speechSynthesis.cancel();

  // Buat utterance baru
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set bahasa Indonesia
  utterance.lang = 'id-ID';
  
  // Kecepatan normal (0.9 biar lebih natural)
  utterance.rate = 0.9;
  
  // Pitch normal
  utterance.pitch = 1.0;
  
  // Volume maksimal
  utterance.volume = 1.0;

  // Cari voice Indonesia
  const voices = window.speechSynthesis.getVoices();
  const indonesianVoice = voices.find(voice => 
    voice.lang.includes('id') || 
    voice.lang.includes('ID') ||
    voice.name.includes('Indonesian')
  );
  
  if (indonesianVoice) {
    utterance.voice = indonesianVoice;
  }

  // Event listeners untuk debugging
  utterance.onstart = () => console.log('🔊 Web Speech: mulai bicara');
  utterance.onend = () => console.log('✅ Web Speech: selesai');
  utterance.onerror = (event) => console.error('❌ Web Speech error:', event);

  // Mulai bicara!
  window.speechSynthesis.speak(utterance);
};

/**
 * Direct TTS API call via Netlify Function (AI Gateway)
 */
export const directTTSApiCall = async (text: string, voiceId: string): Promise<any> => {
  // VALIDASI INPUT
  if (!text) {
    console.error('❌ [VALIDATION] text is undefined or empty');
    throw new Error('Text is required for TTS');
  }
  
  if (!voiceId) {
    console.warn('⚠️ [VALIDATION] voiceId is empty, using default');
    voiceId = 'default';
  }

  console.log('📤 [TTS REQUEST] Text length:', text.length);
  console.log('📤 [TTS REQUEST] First 100 chars:', text.substring(0, 100));
  console.log('📤 [TTS REQUEST] Voice ID:', voiceId);

  // ============== DEV MODE ==============
  if (process.env.NODE_ENV === 'development') {
    console.log('🔇 [DEV] TTS API bypass - menggunakan Web Speech langsung');
    
    // LANGSUNG BICARA PAKAI WEB SPEECH!
    speakWithWebSpeech(text);
    
    return {
      success: true,
      audioContent: '',
      provider: 'web-speech-dev'
    };
  }
  // ======================================

  // ============== PRODUCTION ==============
  try {
    // AI GATEWAY mengharapkan format: { provider, task, input }
    const response = await fetch('/.netlify/functions/ai-gateway', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        provider: 'google-tts',        // Field yang diharapkan
        task: 'synthesize',             // Field yang diharapkan
        input: {                        // Field yang diharapkan
          text: String(text).trim(),
          language: voiceId,
          voice: voiceId
        }
      })
    });
    
    console.log('📥 [TTS RESPONSE] Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [TTS ERROR] Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ [TTS SUCCESS] Response received');
    return data;
  } catch (error) {
    console.error('❌ [TTS API] Error:', error);
    throw error;
  }
  // ======================================
};

/**
 * Fetch TTS audio - MAIN FUNCTION
 */
export const fetchTTSAudio = async (text: string, voiceId: string): Promise<string> => {
  // VALIDASI INPUT DI AWAL
  if (!text) {
    console.error('❌ [fetchTTSAudio] text is undefined or empty');
    throw new Error('Text is required for TTS');
  }

  console.log('🔊 [fetchTTSAudio] Memproses TTS untuk:', text.substring(0, 50) + '...');
  console.log('🔊 [fetchTTSAudio] Voice ID:', voiceId);

  // ============== DEV MODE CHECK ==============
  if (process.env.NODE_ENV === 'development') {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Panggil directTTSApiCall yang akan memainkan Web Speech
    await directTTSApiCall(text, voiceId);
    
    return '';
  }
  // ============================================

  // ============== PRODUCTION ==============
  try {
    // Try AI Gateway first
    const directResult = await directTTSApiCall(text, voiceId);
    if (directResult.success && directResult.audioContent) {
      console.log('✅ [TTS] Success from AI Gateway');
      return directResult.audioContent;
    }
  } catch (error) {
    console.warn('⚠️ Direct API failed, trying Gemini API...');
  }

  try {
    // Fallback ke Gemini API dengan format yang benar
    console.log('🔄 [TTS] Falling back to Gemini API');
    
    // Ekstrak language dari voiceId (misal: "Bahasa Sunda" -> "Sunda")
    let language = voiceId;
    if (voiceId.startsWith('Bahasa ')) {
      language = voiceId.replace('Bahasa ', '');
    }
    
    const geminiResult = await callGeminiAPI('generateContent', {
      text: text,
      language: language,
      model: "gemini-2.0-flash-exp"
    });
    
    if (geminiResult.success && geminiResult.text) {
      console.log('✅ [TTS] Success from Gemini API');
      
      // Di Gemini API, kita perlu generate audio dari text
      // Ini bisa diimplementasikan dengan Google Cloud TTS atau lainnya
      return geminiResult.text; // Sementara return text dulu
    }
  } catch (error) {
    console.error('❌ Gemini API also failed:', error);
    throw error;
  }

  throw new Error('All TTS methods failed');
  // ======================================
};

/**
 * Check TTS cache
 */
export const checkTTSCache = async (text: string, voiceId: string): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  return false;
};

/**
 * Generate speech (alias untuk fetchTTSAudio)
 */
export const generateSpeech = fetchTTSAudio;

/**
 * Get audio context (untuk Tone.js)
 */
export const getAudioContext = (): AudioContext | null => {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch (e) {
    console.warn('⚠️ AudioContext not supported');
    return null;
  }
};

/**
 * Preload TTS untuk multiple teks
 */
export const preloadFolkloreTTS = async (text: string, voiceId: string): Promise<string> => {
  console.log('🎵 Preloading TTS untuk:', text.substring(0, 30) + '...');
  
  if (!text) {
    console.error('❌ [preloadFolkloreTTS] text is undefined');
    throw new Error('Text is required for preload');
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('⏳ Simulasi preload (1 detik)');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return '';
  }
  
  return fetchTTSAudio(text, voiceId);
};

/**
 * Preload semua voices Web Speech
 */
export const preloadWebSpeechVoices = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log(`🗣️ ${voices.length} voices tersedia`);
      resolve();
      return;
    }

    window.speechSynthesis.addEventListener('voiceschanged', () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      console.log(`🗣️ ${loadedVoices.length} voices dimuat`);
      resolve();
    });

    setTimeout(resolve, 2000);
  });
};