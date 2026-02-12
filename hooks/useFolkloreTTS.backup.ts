import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTTSAudio } from '../services/tts-service';

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
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcmData.length, true);
  
  for (let i = 0; i < pcmData.length; i++) {
    view.setUint8(44 + i, pcmData[i]);
  }
  
  return new Blob([buffer], { type: 'audio/wav' });
}

export const useFolkloreTTS = ({ storyText, languageName, isModalOpen }: UseFolkloreTTSProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const isCancelledRef = useRef(false);
  const preparePromiseRef = useRef<Promise<void> | null>(null);

  // ✅ Prepare audio saat modal dibuka
  useEffect(() => {
    isCancelledRef.current = false;

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
      preparePromiseRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Modal dibuka - prepare audio
    const prepareAudio = async () => {
      setIsLoading(true);
      setError(null);
      setIsReady(false);
      
      try {
        console.log('🎵 Preparing audio for:', languageName);
        
        const audioBase64 = await fetchTTSAudio(storyText, languageName);
        
        if (!audioBase64 || isCancelledRef.current) {
          if (!isCancelledRef.current) {
            setIsLoading(false);
            setError('Gagal mendapatkan audio');
          }
          return;
        }

        console.log('🔄 Converting to WAV...');
        const audioBlob = createWavBlob(audioBase64, 24000);
        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;

        // Create audio element
        const audio = new Audio(audioUrl);
        
        // Wait for audio to be ready
        await new Promise<void>((resolve, reject) => {
          audio.addEventListener('canplaythrough', () => resolve(), { once: true });
          audio.addEventListener('error', (e) => reject(e), { once: true });
          audio.load();
        });

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = (e) => {
          console.error('❌ Audio playback error:', e);
          setIsPlaying(false);
          setError('Gagal memutar audio');
        };

        if (!isCancelledRef.current) {
          audioRef.current = audio;
          setIsReady(true);
          setIsLoading(false);
          console.log('✅ Audio ready to play!');
        }
        
      } catch (err) {
        if (!isCancelledRef.current) {
          console.error('❌ Failed to prepare audio:', err);
          const errorMessage = err instanceof Error ? err.message : 'Gagal memuat audio';
          setError(errorMessage);
          setIsReady(false);
          setIsLoading(false);
        }
      }
    };

    preparePromiseRef.current = prepareAudio();

    // Cleanup function
    return () => {
      isCancelledRef.current = true;
    };
  }, [isModalOpen, storyText, languageName]);

  // ✅ Play function - DENGAN GUARD & AUTO-WAIT
  const playAudio = useCallback(async () => {
    // Guard 1: Cek error state
    if (error) {
      console.error('❌ Cannot play - error state:', error);
      return;
    }

    // Guard 2: Kalau masih loading, tunggu sampai ready
    if (isLoading && preparePromiseRef.current) {
      console.log('⏳ Audio still preparing, waiting...');
      try {
        await preparePromiseRef.current;
      } catch (err) {
        console.error('❌ Prepare failed:', err);
        return;
      }
    }

    // Guard 3: Cek audioRef setelah menunggu
    if (!audioRef.current) {
      console.warn('⚠️ Audio not ready after waiting');
      setError('Audio tidak siap, coba muat ulang halaman');
      return;
    }

    // All good - play!
    try {
      await audioRef.current.play();
      console.log('✅ Playing audio!');
    } catch (err) {
      console.error('❌ Play error:', err);
      setError('Gagal memutar audio');
    }
  }, [isLoading, error]);

  // ✅ Stop function
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

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
    error,
    playAudio,
    stopAudio
  };
};