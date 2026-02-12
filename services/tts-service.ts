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
 * Mock TTS untuk development mode - PAKAI WEB SPEECH API
 */
const getMockAudio = (): string => {
  // Di DEV mode, kita gak perlu return audio base64
  // Karena suara langsung dari Web Speech API
  console.log('🔊 [DEV MODE] Menggunakan Web Speech API (bukan mock audio)');
  return ''; // Return empty string, tidak dipakai
};

/**
 * Direct TTS API call via Netlify Function
 */
export const directTTSApiCall = async (text: string, voiceId: string): Promise<any> => {
  // ============== DEV MODE ==============
  if (process.env.NODE_ENV === 'development') {
    console.log('🔇 [DEV] TTS API bypass - menggunakan Web Speech langsung');
    console.log('🎤 Teks:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    
    // LANGSUNG BICARA PAKAI WEB SPEECH!
    speakWithWebSpeech(text);
    
    return {
      success: true,
      audioContent: '', // Empty karena gak dipakai
      provider: 'web-speech-dev'
    };
  }
  // ======================================

  // ============== PRODUCTION ==============
  try {
    const response = await fetch('/.netlify/functions/ai-gateway', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId, type: 'tts' })
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('❌ TTS API error:', error);
    throw error;
  }
  // ======================================
};

/**
 * Fetch TTS audio - MAIN FUNCTION
 */
export const fetchTTSAudio = async (text: string, voiceId: string): Promise<string> => {
  // ============== DEV MODE CHECK ==============
  if (process.env.NODE_ENV === 'development') {
    console.log('🔊 [DEV MODE] Memproses TTS untuk:', text.substring(0, 50) + '...');
    
    // Simulasi network delay (biar keliatan loading)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Panggil directTTSApiCall yang akan memainkan Web Speech
    await directTTSApiCall(text, voiceId);
    
    // Return empty string karena suara langsung dari Web Speech
    return '';
  }
  // ============================================

  // ============== PRODUCTION ==============
  try {
    // Try direct API first
    const directResult = await directTTSApiCall(text, voiceId);
    if (directResult.success && directResult.audioContent) {
      return directResult.audioContent;
    }
  } catch (error) {
    console.warn('⚠️ Direct API failed, trying SDK...');
  }

  try {
    // Fallback ke Gemini API
    const geminiResult = await callGeminiAPI('generateContent', {
      model: "gemini-1.5-flash",
      contents: [{
        parts: [{
          text: text
        }]
      }],
      config: {
        responseModalities: ["AUDIO"]
      }
    });
    
    if (geminiResult.success && geminiResult.audioContent) {
      return geminiResult.audioContent;
    }
  } catch (error) {
    console.error('❌ SDK also failed:', error);
    throw error;
  }

  throw new Error('All TTS methods failed');
  // ======================================
};

/**
 * Check TTS cache
 */
export const checkTTSCache = async (text: string, voiceId: string): Promise<boolean> => {
  // DEV MODE - selalu false biar simulasi jalan
  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  // TODO: Implement actual cache check untuk production
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
  
  // Di DEV mode, preload cuma simulasi
  if (process.env.NODE_ENV === 'development') {
    console.log('⏳ Simulasi preload (1 detik)');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return '';
  }
  
  return fetchTTSAudio(text, voiceId);
};

/**
 * Preload semua voices Web Speech (biar cepet)
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

    // Timeout 2 detik
    setTimeout(resolve, 2000);
  });
};