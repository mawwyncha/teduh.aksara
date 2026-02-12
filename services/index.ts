// services/index.ts - Re-export semua services dengan nama yang sama

// TTS Service exports
export { generateSpeech, fetchTTSAudio, checkTTSCache, preloadFolkloreTTS } from './tts-service';

// Analysis Service exports  
export { analyzeGrammar, transcribeAudio, analyzePronunciation, askTaraAboutPlatform } from './analysis-service';

// Voice Service exports (tetap dari voiceService.ts)
export { 
  stopCurrentAudio, 
  cleanupAudioEngine, 
  stopWebSpeech, 
  preloadVoices as preloadWebSpeechVoices,
  getAudioContext,
  speakWithWebSpeech,
  generateOptimizedPrompt
} from './voiceService';

// DB Service exports
export { getData, saveData, clearStore, STORES } from './dbService';

// Gemini Core exports (untuk internal use only)
export { callGeminiAPI, directTTSApiCall, sanitizeInput, sanitizeForTTS, hashText } from './gemini-core';