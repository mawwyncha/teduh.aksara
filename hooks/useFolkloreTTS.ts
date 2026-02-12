import { useState, useCallback, useRef, useEffect } from 'react';
import { fetchTTSAudio } from '../services/tts-service';

interface UseFolkloreTTSCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  onProgress?: (progress: number) => void;
  onSeek?: (time: number) => void;
}

export const useFolkloreTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const estimatedDurationRef = useRef<number>(3000);
  const isWebSpeechRef = useRef<boolean>(false);
  const fullTextRef = useRef<string>('');

  // ========== CLEANUP ==========
  const stopAllAudio = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setIsPlaying(false);
    setIsLoading(false);
    setProgress(0);
    setCurrentTime(0);
    isWebSpeechRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [stopAllAudio]);

  // ========== PROGRESS SIMULATION ==========
  const startProgressSimulation = (durationMs: number = 3000) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    estimatedDurationRef.current = durationMs;
    setDuration(durationMs / 1000);
    setProgress(0);
    setCurrentTime(0);
    
    const startTime = Date.now();
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / estimatedDurationRef.current) * 100, 99);
      const calculatedTime = elapsed / 1000;
      
      setProgress(calculatedProgress);
      setCurrentTime(calculatedTime);
    }, 100);
  };

  const stopProgressSimulation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // ========== ESTIMATE DURATION ==========
  const estimateDuration = (text: string): number => {
    const words = text.split(' ').length;
    return Math.max(2000, words * 300);
  };

  // ========== SEEK - WEB SPEECH VERSION ==========
  const handleSeek = useCallback(async (newProgress: number, text: string, voiceId: string) => {
    setProgress(newProgress);
    
    if (isWebSpeechRef.current) {
      console.log(`🎯 Web Speech seek ke ${newProgress}%`);
      
      // Potong teks berdasarkan progress
      const words = fullTextRef.current.split(' ');
      const totalWords = words.length;
      const targetWordIndex = Math.min(
        Math.floor((newProgress / 100) * totalWords),
        totalWords - 1
      );
      
      const remainingText = words.slice(targetWordIndex).join(' ');
      
      // Cancel speech lama
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Update durasi berdasarkan sisa teks
      const newEstimatedDuration = estimateDuration(remainingText);
      estimatedDurationRef.current = newEstimatedDuration;
      setDuration(newEstimatedDuration / 1000);
      
      const newCurrentTime = (newProgress / 100) * (estimatedDurationRef.current / 1000);
      setCurrentTime(newCurrentTime);
      
      startProgressSimulation(newEstimatedDuration);
      
      // Mulai bicara dari posisi yang dipilih
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(remainingText);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        const indonesianVoice = voices.find(v => 
          v.lang.includes('id') || v.lang.includes('ID') || v.name.includes('Indonesian')
        );
        if (indonesianVoice) utterance.voice = indonesianVoice;
        
        utterance.onstart = () => {
          setIsPlaying(true);
        };
        
        utterance.onend = () => {
          stopProgressSimulation();
          setProgress(100);
          setCurrentTime(estimatedDurationRef.current / 1000);
          setIsPlaying(false);
          isWebSpeechRef.current = false;
        };
        
        utterance.onerror = (event) => {
          if (event.error === 'interrupted') {
            console.log('⏸️ Web Speech: diinterupsi');
          } else {
            console.error('❌ Web Speech error:', event);
          }
        };
        
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
      
    } else if (audioRef.current) {
      // HTML Audio: langsung seek
      const newTime = (newProgress / 100) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  // ========== PLAY ==========
  const play = useCallback(async (
    text: string,
    voiceId: string,
    callbacks?: UseFolkloreTTSCallbacks,
    startProgress: number = 0
  ) => {
    try {
      stopAllAudio();
      
      setIsLoading(true);
      setIsPlaying(false);
      setError(null);
      
      fullTextRef.current = text;
      callbacks?.onStart?.();
      
      // ========== DEV MODE - WEB SPEECH ==========
      if (process.env.NODE_ENV === 'development') {
        console.log('🎵 [DEV] Web Speech untuk:', text.substring(0, 50));
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Potong teks jika seek
        let textToSpeak = text;
        if (startProgress > 0) {
          const words = text.split(' ');
          const totalWords = words.length;
          const targetWordIndex = Math.floor((startProgress / 100) * totalWords);
          textToSpeak = words.slice(targetWordIndex).join(' ');
          console.log(`🔍 Seek ke ${startProgress}%, mulai dari kata ke-${targetWordIndex}`);
        }
        
        const estimatedDuration = estimateDuration(textToSpeak);
        
        setIsLoading(false);
        setIsPlaying(true);
        isWebSpeechRef.current = true;
        
        startProgressSimulation(estimatedDuration);
        callbacks?.onSuccess?.();
        
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
          } catch (e) {}
          
          await new Promise(resolve => setTimeout(resolve, 50));
          
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'id-ID';
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          
          const voices = window.speechSynthesis.getVoices();
          const indonesianVoice = voices.find(v => 
            v.lang.includes('id') || v.lang.includes('ID') || v.name.includes('Indonesian')
          );
          if (indonesianVoice) utterance.voice = indonesianVoice;
          
          utterance.onstart = () => {
            setIsPlaying(true);
          };
          
          utterance.onend = () => {
            stopProgressSimulation();
            setProgress(100);
            setCurrentTime(estimatedDuration / 1000);
            setIsPlaying(false);
            isWebSpeechRef.current = false;
            callbacks?.onEnd?.();
          };
          
          utterance.onerror = (event) => {
            if (event.error === 'interrupted') {
              console.log('⏸️ Web Speech: diinterupsi');
            } else {
              console.error('❌ Web Speech error:', event);
              stopAllAudio();
              setError('Gagal memutar suara');
              callbacks?.onError?.(new Error('Gagal memutar suara'));
            }
          };
          
          utteranceRef.current = utterance;
          
          setTimeout(() => {
            try {
              window.speechSynthesis.speak(utterance);
            } catch (e) {
              console.error('❌ Speech synthesis error:', e);
            }
          }, 50);
        }
        
        return;
      }
      
      // ========== PRODUCTION - HTML AUDIO ==========
      const audioData = await fetchTTSAudio(text, voiceId);
      
      if (!audioData) {
        throw new Error('No audio data received');
      }
      
      const audio = new Audio(audioData);
      audioRef.current = audio;
      
      setIsLoading(false);
      setIsPlaying(true);
      isWebSpeechRef.current = false;
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        if (startProgress > 0) {
          audio.currentTime = (startProgress / 100) * audio.duration;
        }
      };
      
      audio.ontimeupdate = () => {
        if (audio.duration) {
          const currentProgress = (audio.currentTime / audio.duration) * 100;
          setProgress(currentProgress);
          setCurrentTime(audio.currentTime);
          callbacks?.onProgress?.(currentProgress);
        }
      };
      
      audio.onended = () => {
        stopProgressSimulation();
        setProgress(100);
        setCurrentTime(audio.duration || 0);
        setIsPlaying(false);
        callbacks?.onEnd?.();
      };
      
      audio.onerror = () => {
        stopAllAudio();
        setError('Gagal memutar audio');
        callbacks?.onError?.(new Error('Gagal memutar audio'));
      };
      
      audio.oncanplay = () => {
        if (startProgress > 0) {
          audio.currentTime = (startProgress / 100) * audio.duration;
        }
      };
      
      await audio.play();
      callbacks?.onSuccess?.();
      
    } catch (err) {
      console.error('❌ TTS failed:', err);
      stopAllAudio();
      setError(err instanceof Error ? err.message : 'Gagal memuat audio');
      callbacks?.onError?.(err instanceof Error ? err : new Error('Gagal memuat audio'));
    }
  }, [stopAllAudio]);

  // ========== STOP ==========
  const stop = useCallback(() => {
    stopAllAudio();
  }, [stopAllAudio]);

  // ========== PAUSE ==========
  const pause = useCallback(() => {
    if (audioRef.current && isPlaying && !isWebSpeechRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  // ========== RESUME ==========
  const resume = useCallback(() => {
    if (audioRef.current && !isPlaying && !isWebSpeechRef.current && audioRef.current.currentTime > 0) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return {
    isPlaying,
    isLoading,
    error,
    progress,
    duration,
    currentTime,
    play,
    stop,
    pause,
    resume,
    seek: handleSeek,
    stopAllAudio
  };
};