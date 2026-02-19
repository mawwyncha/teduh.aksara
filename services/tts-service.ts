import { callGeminiAPI } from './gemini-core';

// Helper untuk deteksi mode development secara aman
const isDevMode = () => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) return true;
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') return true;
  return false;
};

/**
 * PLAY SUARA LANGSUNG PAKAI WEB SPEECH API (DEV MODE)
 */
const speakWithWebSpeech = (text: string): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('⚠️ Web Speech API tidak didukung');
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const indonesianVoice = voices.find(voice => 
    voice.lang.includes('id') || 
    voice.lang.includes('ID') ||
    voice.name.includes('Indonesian')
  );
  
  if (indonesianVoice) {
    utterance.voice = indonesianVoice;
  }

  utterance.onstart = () => console.log('🔊 Web Speech: mulai bicara');
  utterance.onend = () => console.log('✅ Web Speech: selesai');
  utterance.onerror = (event) => console.error('❌ Web Speech error:', event);

  window.speechSynthesis.speak(utterance);
};

/**
 * Direct TTS API call via Netlify Function (AI Gateway)
 */
export const directTTSApiCall = async (text: string, voiceId: string): Promise<any> => {
  if (!text) {
    console.error('❌ [VALIDATION] text is undefined or empty');
    throw new Error('Text is required for TTS');
  }
  
  if (!voiceId) {
    console.warn('⚠️ [VALIDATION] voiceId is empty, using default');
    voiceId = 'default';
  }

  console.log('📤 [TTS REQUEST] Text length:', text.length);
  
  if (isDevMode()) {
    console.log('🔇 [DEV] TTS API bypass - menggunakan Web Speech langsung');
    speakWithWebSpeech(text);
    return {
      success: true,
      audioContent: '',
      provider: 'web-speech-dev'
    };
  }

  try {
    const response = await fetch('/.netlify/functions/ai-gateway', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        provider: 'google-tts',
        task: 'synthesize',
        input: {
          text: String(text).trim(),
          language: voiceId,
          voice: voiceId
        },
        enableFallback: true
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [TTS ERROR] Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ [TTS API] Error:', error);
    throw error;
  }
};

/**
 * Fetch TTS audio - MAIN FUNCTION
 */
export const fetchTTSAudio = async (text: string, voiceId: string): Promise<string> => {
  if (!text) {
    console.error('❌ [fetchTTSAudio] text is undefined or empty');
    throw new Error('Text is required for TTS');
  }

  if (isDevMode()) {
    await new Promise(resolve => setTimeout(resolve, 800));
    await directTTSApiCall(text, voiceId);
    return '';
  }

  try {
    const directResult = await directTTSApiCall(text, voiceId);
    if (directResult.success && directResult.audioContent) {
      return directResult.audioContent;
    }
  } catch (error) {
    console.warn('⚠️ Direct API failed, trying Gemini API...');
  }

  try {
    let language = voiceId;
    if (voiceId.startsWith('Bahasa ')) {
      language = voiceId.replace('Bahasa ', '');
    }
    
    const geminiResult = await callGeminiAPI('generateContent', {
      text: text,
      language: language,
      model: "gemini-1.5-flash"
    });
    
    if (geminiResult.success && geminiResult.text) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        speakWithWebSpeech(geminiResult.text);
      }
      return geminiResult.text;
    }
  } catch (error) {
    console.error('❌ Gemini API juga gagal:', error);
    throw error;
  }

  throw new Error('All TTS methods failed');
};

/**
 * Check TTS cache
 */
export const checkTTSCache = async (text: string, voiceId: string): Promise<boolean> => {
  if (isDevMode()) return false;
  return false;
};

/**
 * Generate speech (alias untuk fetchTTSAudio)
 * Parameter ke-3 readingGuide diterima tapi tidak dipakai di TTS,
 * hanya untuk kompatibilitas dengan pemanggil di App.tsx
 */
export const generateSpeech = (text: string, voiceId: string, _readingGuide?: string): Promise<string> => {
  return fetchTTSAudio(text, voiceId);
};

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
  if (!text) {
    console.error('❌ [preloadFolkloreTTS] text is undefined');
    throw new Error('Text is required for preload');
  }
  
  if (isDevMode()) {
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
      resolve();
      return;
    }

    window.speechSynthesis.addEventListener('voiceschanged', () => {
      resolve();
    });

    setTimeout(resolve, 2000);
  });
};