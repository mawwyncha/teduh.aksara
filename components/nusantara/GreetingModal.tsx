import React, { useEffect, useState, useRef, useCallback } from 'react';
import { DialectInfo } from './ProvinceInterfaces';
import { 
  generateSpeech, 
  stopCurrentAudio, 
  stopWebSpeech 
} from '../../services';

interface GreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dialect: DialectInfo | null;
  regionImage: string;
  theme: 'light' | 'dark' | 'flower';
}

export const GreetingModal: React.FC<GreetingModalProps> = ({ 
  isOpen, 
  onClose, 
  dialect, 
  regionImage, 
  theme
}) => {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const isPlayingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup semua resources saat unmount
  useEffect(() => {
    return () => {
      // Clear semua timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Stop semua audio
      stopAllAudio();
      
      console.log('🧹 GreetingModal unmounted and cleaned up');
    };
  }, []);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen && dialect) {
      console.log('🎭 Modal opened for:', dialect.name);
      
      timeoutRef.current = setTimeout(() => {
        setShowContent(true);
        setHasError(false);
      }, 300);
      
    } else {
      setShowContent(false);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(false);
      isPlayingRef.current = false;
      
      // Stop audio dengan delay kecil
      timeoutRef.current = setTimeout(() => {
        stopAllAudio();
      }, 100);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, dialect]);

  const stopAllAudio = useCallback(() => {
    stopCurrentAudio();
    stopWebSpeech();
    isPlayingRef.current = false;
  }, []);

  const playGreeting = useCallback(async () => {
    if (!dialect || isPlayingRef.current || isLoading) {
      console.log('⏸️ Play blocked:', { 
        hasDialect: !!dialect, 
        isPlaying: isPlayingRef.current, 
        isLoading 
      });
      return;
    }
    
    setIsLoading(true);
    setIsPlaying(true);
    setHasError(false);
    isPlayingRef.current = true;
    
    try {
      console.log('🎵 Playing greeting for:', dialect.name);
      
      const textToSpeak = dialect.iconicGreeting || dialect.name;
      
      await generateSpeech(textToSpeak, dialect.name);
      
    } catch (error: any) {
      console.error('❌ Failed to play greeting:', error);
      setHasError(true);
      
      // Auto reset setelah error
      timeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        setIsLoading(false);
        isPlayingRef.current = false;
      }, 1000);
      
    } finally {
      // Hanya reset state jika tidak error atau sudah selesai
      if (!hasError) {
        timeoutRef.current = setTimeout(() => {
          setIsPlaying(false);
          setIsLoading(false);
          isPlayingRef.current = false;
        }, 500);
      }
    }
  }, [dialect, isLoading, hasError]);

  const handleReplay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Stop audio yang sedang playing
    stopAllAudio();
    
    // Tunggu sebentar sebelum play baru
    timeoutRef.current = setTimeout(() => {
      playGreeting();
    }, 200);
  }, [playGreeting, stopAllAudio]);

  const handleClose = useCallback(() => {
    console.log('❌ Closing modal');
    
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Stop semua audio
    stopAllAudio();
    
    // Reset state
    setIsPlaying(false);
    setIsLoading(false);
    isPlayingRef.current = false;
    
    // Close modal
    onClose();
  }, [onClose, stopAllAudio]);

  if (!isOpen || !dialect) return null;

  const isFlower = theme === 'flower';
  const modalBg = isFlower ? 'bg-petal-900/90' : 'bg-black/80';
  const accentColor = isFlower ? 'text-pink-400' : 'text-emerald-400';
  const textColor = isFlower ? 'text-pink-50' : 'text-white';
  const buttonBg = isFlower ? 'bg-pink-500 hover:bg-pink-600' : 'bg-emerald-500 hover:bg-emerald-600';
  const errorColor = 'text-red-400';

  return (
    <div 
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-500"
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-lg aspect-[4/5] sm:aspect-square rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-700 ${showContent ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 rotate-2'}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={regionImage} 
            className="w-full h-full object-cover blur-md scale-110 opacity-60" 
            alt={`${dialect.name} region`}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop';
            }}
          />
          <div className={`absolute inset-0 ${modalBg} mix-blend-multiply`}></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-6">
            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${accentColor}`}>
              Gema Aksara
            </span>
            <div className={`h-0.5 w-12 mx-auto mt-2 ${isFlower ? 'bg-pink-500' : 'bg-emerald-500'} rounded-full`}></div>
          </div>

          <h3 className={`text-4xl sm:text-5xl font-bold mb-4 leading-tight ${textColor} drop-shadow-lg`}>
            "{dialect.iconicGreeting || dialect.name}"
          </h3>

          <div className="space-y-1">
            <p className={`text-sm font-bold uppercase tracking-widest ${accentColor} opacity-80`}>
              {dialect.name}
            </p>
            {dialect.endonim && (
              <p className="text-xs text-white/40 italic font-medium">
                Endonim: {dialect.endonim}
              </p>
            )}
            {dialect.phoneticGuide && (
              <p className="text-xs text-white/50 mt-1">
                📝 {dialect.phoneticGuide}
              </p>
            )}
          </div>

          {/* Audio Controls */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button 
              onClick={handleReplay}
              onMouseDown={(e) => e.preventDefault()}
              disabled={isLoading}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                isLoading ? 'bg-gray-500 cursor-not-allowed' : 
                hasError ? 'bg-red-500 hover:bg-red-600' : buttonBg
              } ${isPlaying ? 'ring-2 ring-white ring-opacity-50' : ''}`}
              aria-label={isPlaying ? 'Sedang memutar' : 'Putar sapaan'}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : hasError ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              ) : isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </button>
            
            <p className={`text-xs ${hasError ? errorColor : 'text-white/60'}`}>
              {hasError ? 'Gagal memutar, coba lagi' : 
               isLoading ? 'Menyiapkan sapaan...' : 
               isPlaying ? 'Sedang memutar...' : 
               'Klik untuk mendengar sapaan'}
            </p>
          </div>

          {/* Audio Visualizer Animation */}
          {isPlaying && !hasError && (
            <div className="mt-6 h-8 flex items-center gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full animate-music-bar ${isFlower ? 'bg-pink-400' : 'bg-emerald-400'}`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.3}s`
                  }}
                ></div>
              ))}
            </div>
          )}

          <button 
            onClick={handleClose}
            onMouseDown={(e) => e.preventDefault()}
            className={`mt-8 px-8 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all active:scale-95 border border-white/20 ${
              isFlower ? 'bg-pink-500/50 hover:bg-pink-500 text-white' : 
              'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Tutup Sapaan
          </button>
        </div>

        {/* Corner Decorations */}
        <div className={`absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl opacity-20 border-white`}></div>
        <div className={`absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl opacity-20 border-white`}></div>
      </div>
    </div>
  );
};