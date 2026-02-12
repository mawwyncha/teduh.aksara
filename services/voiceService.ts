// src/services/voiceService.ts

import { 
  getDialectPrompt, 
  getLanguageCode, 
  getVoiceName,
  getSpeakingStyle 
} from './dialectPrompts';

/**
 * Voice Service untuk handle semua kebutuhan audio/logat
 * Dengan memory management yang baik
 */

// ==================== AUDIO ENGINE ====================

let audioContext: AudioContext | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;
let audioInstanceCount = 0;

/**
 * Get or create AudioContext singleton
 */
export const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000,
      latencyHint: 'interactive'
    });
    audioInstanceCount++;
    console.log('🎵 AudioContext created, total instances:', audioInstanceCount);
  }
  return audioContext;
}

/**
 * Stop current audio playback
 */
export function stopCurrentAudio(): void {
  if (currentAudioSource) {
    try {
      console.log('⏹️ Stopping current audio');
      currentAudioSource.stop();
      currentAudioSource.disconnect();
    } catch (e) {
      // Source sudah stopped, ignore error
    }
    currentAudioSource = null;
  }
}

/**
 * Cleanup semua resources audio
 */
export function cleanupAudioEngine(): void {
  console.log('🧹 Cleaning up audio engine...');
  
  stopCurrentAudio();
  
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close().then(() => {
      console.log('✅ AudioContext closed');
      audioContext = null;
      audioInstanceCount = Math.max(0, audioInstanceCount - 1);
    }).catch(err => {
      console.warn('⚠️ Failed to close AudioContext:', err);
    });
  }
}

/**
 * Play audio buffer dengan proper cleanup
 */
export async function playAudioBuffer(base64: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    // Stop audio sebelumnya
    stopCurrentAudio();
    
    try {
      const ctx = getAudioContext();
      
      // Resume jika suspended
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      // Decode base64 to bytes
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Decode audio data
      const dataInt16 = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      const frameCount = dataInt16.length;
      const buffer = ctx.createBuffer(1, frameCount, 24000);
      const channelData = buffer.getChannelData(0);
      
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }
      
      // Create and play source
      const source = ctx.createBufferSource();
      currentAudioSource = source;
      
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        console.log('✅ Audio playback finished');
        currentAudioSource = null;
        resolve();
      };
      
      console.log('🎵 Starting audio playback');
      source.start();
      
    } catch (error) {
      console.error('❌ Failed to play audio:', error);
      currentAudioSource = null;
      reject(error);
    }
  });
}

// ==================== WEB SPEECH API ====================

/**
 * Speak using Web Speech API with dialect configuration
 */
export function speakWithWebSpeech(
  text: string, 
  dialectName: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: any) => void
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('❌ Web Speech API not supported');
    if (onError) onError(new Error('Web Speech API not supported'));
    return null;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();
  
  const langCode = getLanguageCode(dialectName);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  // Find suitable voice
  const voices = speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => {
    if (v.lang === langCode) return true;
    if (langCode.startsWith('id') && v.lang.startsWith('id')) return true;
    if (langCode.startsWith('jv') && v.lang.startsWith('jv')) return true;
    if (langCode.startsWith('su') && v.lang.startsWith('su')) return true;
    return false;
  });
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
    console.log(`🎤 Using Web Speech voice: ${preferredVoice.name} (${preferredVoice.lang})`);
  }
  
  // Event handlers
  utterance.onstart = () => {
    console.log('🔊 Web Speech started');
    if (onStart) onStart();
  };
  
  utterance.onend = () => {
    console.log('✅ Web Speech ended');
    if (onEnd) onEnd();
  };
  
  utterance.onerror = (event) => {
    console.error('❌ Web Speech error:', event);
    if (onError) onError(event);
  };
  
  // Start speaking
  speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stop Web Speech API
 */
export function stopWebSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    speechSynthesis.cancel();
    console.log('⏹️ Web Speech stopped');
  }
}

/**
 * Preload voices untuk performa yang lebih baik
 */
export function preloadVoices(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }
    
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log(`🗣️ ${voices.length} voices preloaded`);
      resolve();
      return;
    }
    
    // Wait for voices to load
    const onVoicesChanged = () => {
      const loadedVoices = speechSynthesis.getVoices();
      console.log(`🗣️ Voices loaded: ${loadedVoices.length}`);
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve();
    };
    
    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    
    // Timeout fallback
    setTimeout(() => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      console.log('⚠️ Voice loading timeout');
      resolve();
    }, 2000);
  });
}

// ==================== PROMPT GENERATION ====================

/**
 * Generate optimized prompt for TTS based on dialect and context
 */
export function generateOptimizedPrompt(
  text: string,
  dialectName: string,
  context: 'greeting' | 'story' | 'pronunciation' = 'greeting',
  phoneticGuide?: string
): { prompt: string; voiceName: string } {
  
  // Get base prompt
  const prompt = getDialectPrompt(dialectName, text, context);
  
  // Add phonetic guide if provided
  let finalPrompt = prompt;
  if (phoneticGuide) {
    finalPrompt += ` Perhatikan pelafalan: ${phoneticGuide}`;
  }
  
  // Get voice name
  const voiceName = getVoiceName(dialectName);
  const speakingStyle = getSpeakingStyle(dialectName);
  
  console.log(`📝 Generated prompt for ${dialectName}:`);
  console.log(`  Context: ${context}`);
  console.log(`  Style: ${speakingStyle}`);
  console.log(`  Voice: ${voiceName}`);
  
  return {
    prompt: finalPrompt,
    voiceName
  };
}

/**
 * Check if audio is currently playing
 */
export function isAudioPlaying(): boolean {
  return currentAudioSource !== null;
}

/**
 * Get current audio state
 */
export function getAudioState(): {
  isPlaying: boolean;
  contextState: string | null;
  instanceCount: number;
} {
  return {
    isPlaying: currentAudioSource !== null,
    contextState: audioContext?.state || null,
    instanceCount: audioInstanceCount
  };
}
export const voiceService = {
  getAudioContext,
  stopCurrentAudio,
  cleanupAudioEngine,
  playAudioBuffer,
  speakWithWebSpeech,
  stopWebSpeech,
  preloadVoices,
  generateOptimizedPrompt,
  isAudioPlaying,
  getAudioState
};
