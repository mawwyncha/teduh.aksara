import { useState, useEffect, useCallback } from 'react';
import { fetchTTSAudio, checkTTSCache, preloadFolkloreTTS } from '../services/geminiService';

interface UseFolkloreTTSProps {
  storyText: string;
  languageName: string;
  isModalOpen: boolean; // Trigger untuk cek cache
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
  const [isReady, setIsReady] = useState(false); // Audio udah ready di cache?
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Cek cache saat modal dibuka
  useEffect(() => {
    if (!isModalOpen || !storyText) {
      // Modal ditutup, stop audio dan cleanup
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        if (audioElement.src) {
          URL.revokeObjectURL(audioElement.src);
        }
        setAudioElement(null);
      }
      setIsReady(false);
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    const checkCache = async () => {
      const cached = await checkTTSCache(storyText, languageName);
      setIsReady(cached);
      
      // Jika belum ada di cache, preload di background
      if (!cached) {
        console.log('🔄 Preloading audio in background...');
        preloadFolkloreTTS(storyText, languageName).then(() => {
          console.log('✅ Audio preloaded');
          setIsReady(true);
        }).catch(err => {
          console.error('Preload failed:', err);
        });
      }
    };

    checkCache();
  }, [isModalOpen, storyText, languageName, audioElement]);

  // Function untuk play audio
  const playAudio = useCallback(async () => {
    if (!storyText) return;

    setIsLoading(true);

    try {
      // Fetch atau ambil dari cache
      const audioBase64 = await fetchTTSAudio(storyText, languageName);
      
      if (!audioBase64) {
        console.error('❌ Failed to fetch audio: audioBase64 is null');
        throw new Error('Gagal generate audio');
      }

      console.log('✅ Audio fetched, converting to WAV...');

      // Convert base64 PCM to WAV blob
      const audioBlob = createWavBlob(audioBase64, 24000);
      const audioUrl = URL.createObjectURL(audioBlob);
      
      console.log('✅ WAV blob created, size:', audioBlob.size, 'bytes');

      const audio = new Audio(audioUrl);
      setAudioElement(audio);
      
      audio.onplay = () => {
        console.log('▶️ Audio started playing');
        setIsPlaying(true);
      };
      
      audio.onended = () => {
        console.log('⏹️ Audio ended');
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = (e) => {
        console.error('❌ Audio playback error:', e);
        console.error('Audio error code:', audio.error?.code);
        console.error('Audio error message:', audio.error?.message);
        setIsPlaying(false);
        setIsLoading(false);
      };

      console.log('🎵 Attempting to play audio...');
      await audio.play();
      setIsReady(true);
      console.log('✅ Audio playing successfully');
    } catch (error) {
      console.error('❌ Error in playAudio:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    } finally {
      setIsLoading(false);
    }
  }, [storyText, languageName]);

  // Function untuk stop audio
  const stopAudio = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioElement]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [audioElement]);

  return {
    isReady,
    isPlaying,
    isLoading,
    playAudio,
    stopAudio
  };
};