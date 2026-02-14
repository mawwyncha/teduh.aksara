import { useState, useEffect, useRef } from 'react';
import { fetchTTSAudio, checkTTSCache } from '../services/tts-service';

interface FolkloreItem {
  provinceName: string;
  languageName: string;
  story: string;
  title: string;
}

interface PreloadProgress {
  total: number;
  completed: number;
  current: string;
  isLoading: boolean;
  isComplete: boolean;
  errors: string[];
}

/**
 * Hook untuk preload semua folklore TTS audio
 * Otomatis download saat pertama kali mount dan simpan ke IndexedDB
 */
export const usePreloadAllFolklore = (folkloreData: FolkloreItem[]) => {
  const [progress, setProgress] = useState<PreloadProgress>({
    total: 0,
    completed: 0,
    current: '',
    isLoading: false,
    isComplete: false,
    errors: []
  });

  const isPreloadingRef = useRef(false);
  const hasPreloadedRef = useRef(false);

  useEffect(() => {
    // Jangan preload kalau udah pernah atau sedang preload
    if (hasPreloadedRef.current || isPreloadingRef.current || folkloreData.length === 0) {
      return;
    }

    const preloadAll = async () => {
      // ==================== DEV MODE CHECK ====================
      // Fix: Gunakan optional chaining untuk akses safe ke import.meta.env
      if (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) {
        console.log('🎯 [DEV MODE] Simulating TTS preload without API calls');
        
        isPreloadingRef.current = true;
        hasPreloadedRef.current = true;
        
        const total = folkloreData.length;
        const steps = Math.min(total, 20); // Max 20 steps untuk simulasi cepat
        
        setProgress({
          total,
          completed: 0,
          current: 'Starting simulation...',
          isLoading: true,
          isComplete: false,
          errors: []
        });
        
        // Simulasi progress dengan delay
        for (let i = 0; i <= steps; i++) {
          await new Promise(resolve => setTimeout(resolve, 150));
          
          const currentItem = i < steps 
            ? folkloreData[Math.floor(i * total / steps)]
            : { provinceName: 'Complete', title: 'All done!' };
          
          setProgress(prev => ({
            ...prev,
            completed: Math.floor((i / steps) * total),
            current: `${currentItem.provinceName} - ${currentItem.title}`,
            isLoading: i < steps
          }));
        }
        
        // Mark as complete
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setProgress(prev => ({
          ...prev,
          isComplete: true,
          isLoading: false,
          current: 'Preload simulation complete!'
        }));
        
        isPreloadingRef.current = false;
        
        console.log(`✅ [DEV] Simulated preload for ${total} folklores`);
        return;
      }
      // ==================== END DEV MODE ====================
      
      isPreloadingRef.current = true;
      hasPreloadedRef.current = true;

      setProgress({
        total: folkloreData.length,
        completed: 0,
        current: '',
        isLoading: true,
        isComplete: false,
        errors: []
      });

      console.log(`🎵 Starting preload for ${folkloreData.length} folklores...`);

      const errors: string[] = [];
      let completed = 0;

      // Process sequentially dengan delay untuk avoid rate limit
      for (const folklore of folkloreData) {
        setProgress(prev => ({
          ...prev,
          current: `${folklore.provinceName} - ${folklore.title}`,
          completed
        }));

        try {
          // Check cache dulu
          const isCached = await checkTTSCache(folklore.story, folklore.languageName);
          
          if (isCached) {
            console.log(`✅ Already cached: ${folklore.provinceName}`);
          } else {
            console.log(`⏳ Downloading: ${folklore.provinceName}...`);
            
            // Download dan cache
            await fetchTTSAudio(folklore.story, folklore.languageName);
            
            console.log(`✅ Downloaded: ${folklore.provinceName}`);
          }

          completed++;
          
          // Delay 500ms antar request untuk avoid rate limit
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
          console.error(`❌ Failed to preload ${folklore.provinceName}:`, error);
          errors.push(`${folklore.provinceName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        setProgress(prev => ({
          ...prev,
          completed,
          errors
        }));
      }

      setProgress(prev => ({
        ...prev,
        isLoading: false,
        isComplete: true,
        current: ''
      }));

      isPreloadingRef.current = false;

      if (errors.length === 0) {
        console.log('🎉 All folklore audio preloaded successfully!');
      } else {
        console.warn(`⚠️ Preload completed with ${errors.length} errors`);
      }
    };

    preloadAll();
  }, [folkloreData]);

  return progress;
};