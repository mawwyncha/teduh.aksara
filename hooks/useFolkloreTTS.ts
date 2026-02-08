import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTTSAudio, checkTTSCache, preloadFolkloreTTS } from '../services/geminiService';

interface UseFolkloreTTSProps {
  storyText: string;
  languageName: string;
  isModalOpen: boolean;
}

// Helper function - Convert PCM base64 to WAV Blob
function createWavBlob(pcmBase64: string, sampleRate: number = 24000): Blob {
  const binary = atob(pcmBase64);
  const pcmData = new Uint8Array(binary.length);
  
  for (let i = 0; i < binary.length; i++) {
    pcmData[i] = binary.charCodeAt(i);
  }
  
  const buffer = new ArrayBuffer(44 + pcmData.length);
  const view = new DataView(buffer);
  
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  // WAV header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcmData.length, true);
  
  // Copy PCM data
  for (let i = 0; i < pcmData.length; i++) {
    view.setUint8(44 + i, pcmData[i]);
  }
  
  return new Blob([buffer], { type: 'audio/wav' });
}

export const useFolkloreTTS = ({ storyText, languageName, isModalOpen }: UseFolkloreTTSProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ FIX: Pakai useRef untuk audio element (tidak trigger re-render)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // ✅ Prepare audio saat modal dibuka
  useEffect(() => {
    if (!isModalOpen || !storyText) {
      // Modal ditutup - cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      audioRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    // Modal dibuka - prepare audio
    let isCancelled = false;
    
    const prepareAudio = async () => {
      setIsLoading(true);
      
      try {
        // Cek cache
        const cached = await checkTTSCache(storyText, languageName);
        
        if (!cached) {
          console.log('🔄 Preloading audio...');
          await preloadFolkloreTTS(storyText, languageName);
          console.log('✅ Audio preloaded');
        }

        if (isCancelled) return;

        // Fetch audio
        console.log('🎵 Preparing audio element...');
        const audioBase64 = await fetchTTSAudio(storyText, languageName);
        
        if (!audioBase64 || isCancelled) {
          console.error('❌ Failed to fetch audio');
          setIsLoading(false);
          return;
        }

        // Convert to WAV
        const audioBlob = createWavBlob(audioBase64, 24000);
        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;

        // Create audio element
        const audio = new Audio(audioUrl);
        
        audio.onplay = () => {
          console.log('▶️ Playing');
          setIsPlaying(true);
        };
        
        audio.onended = () => {
          console.log('⏹️ Ended');
          setIsPlaying(false);
        };
        
        audio.onerror = (e) => {
          console.error('❌ Audio error:', e);
          setIsPlaying(false);
        };

        if (!isCancelled) {
          audioRef.current = audio;
          setIsReady(true);
          setIsLoading(false);
          console.log('✅ Audio ready for instant play!');
        }
        
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to prepare audio:', err);
          setIsReady(false);
          setIsLoading(false);
        }
      }
    };

    prepareAudio();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [isModalOpen, storyText, languageName]); // ✅ Dependency benar (tanpa audioRef)

  // ✅ Play function
  const playAudio = useCallback(async () => {
    if (!audioRef.current) {
      console.warn('⚠️ Audio not ready');
      return;
    }

    try {
      await audioRef.current.play();
      console.log('✅ Playing instantly!');
    } catch (error) {
      console.error('❌ Play error:', error);
    }
  }, []); // ✅ Empty dependency (akses via ref)

  // ✅ Stop function
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []); // ✅ Empty dependency (akses via ref)

  // ✅ Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  return {
    isReady,
    isPlaying,
    isLoading,
    playAudio,
    stopAudio
  };
};