
import React, { useState, useRef, useEffect } from 'react';

interface BookPage {
  imageUrl: string; 
  videoUrl: string; 
  caption?: string;
}

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BOOK_CONFIG = {
  mainTitle: "तारा",           
  subTitle: "TEDUH AKSARA",        
  headerTitle: "Kisah Tara Si Pohon Kersen", 
  instructionText: "Ketuk untuk Membuka",
  videoPlayingText: "Video Sedang Diputar",
  clickToPlayText: "Ketuk Gambar Untuk Memutar Video"
};

const BOOK_THEME = {
  coverBackground: "#7f1d1d",
  spineBorder: "#450a0a",
  accentColor: "text-red-100",
  accentBorder: "border-red-400/20",
  sealStroke: "#ffffff",
  sealBackground: "#450a0a"
};

const TARA_STORY_PAGES: BookPage[] = [
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page1.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video1.mp4",
  },
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page2.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video2.mp4",
  },
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page3.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video3.mp4",
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-sunlight-shining-through-the-leaves-of-a-tree-2407-large.mp4",
  },
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page5.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video5.mp4",
  },
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page6.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video6.mp4",
  },
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/page7.jpeg",
    videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/video7.mp4",
  }
];

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [isBookClosed, setIsBookClosed] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isFlower, setIsFlower] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkTheme = () => setIsFlower(document.documentElement.classList.contains('flower'));
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsBookClosed(true);
      setCurrentPage(0);
      setIsPlaying(false);
      setIsFading(false);
    }
  }, [isOpen]);

  const playSoftChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const notes = [
        261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 
        1046.50, 1318.51, 1567.98
      ];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      const volume = freq > 1000 ? 0.04 : 0.06;
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
      setTimeout(() => ctx.close(), 700);
    } catch (e) {}
  };

  if (!isOpen) return null;

  const currentContent = TARA_STORY_PAGES[currentPage];

  const coverBg = isFlower ? '#4a2c2a' : BOOK_THEME.coverBackground;
  const spineBorder = isFlower ? '#2d1b1a' : BOOK_THEME.spineBorder;
  const accentColor = isFlower ? 'text-pink-100' : BOOK_THEME.accentColor;
  const accentBorder = isFlower ? 'border-pink-400/20' : BOOK_THEME.accentBorder;
  const sealBg = isFlower ? '#2d1b1a' : BOOK_THEME.sealBackground;
  const headerAccent = isFlower ? 'bg-pink-500' : 'bg-emerald-600';
  const closeBtnHover = isFlower ? 'md:hover:bg-pink-600/40' : 'md:hover:bg-emerald-600/40';
  const closeBtnHoverInner = isFlower ? 'md:hover:bg-pink-600' : 'md:hover:bg-emerald-600';

  const handleOpenBook = () => {
    playSoftChime();
    setIsFading(true);
    setTimeout(() => {
      setIsBookClosed(false);
      setIsFading(false);
    }, 600);
  };

  const navigate = (direction: 'next' | 'prev') => {
    playSoftChime();
    setIsFading(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage((prev) => (prev + 1) % TARA_STORY_PAGES.length);
      } else {
        setCurrentPage((prev) => (prev - 1 + TARA_STORY_PAGES.length) % TARA_STORY_PAGES.length);
      }
      setIsPlaying(false);
      setIsFading(false);
    }, 400);
  };

  const handleMediaClick = () => {
    playSoftChime();
    setIsPlaying(!isPlaying);
  };

  if (isBookClosed) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-700 overflow-hidden">
        <div 
          className={`relative w-full max-w-[340px] aspect-[3/4] rounded-r-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-l-[12px] cursor-pointer transition-all duration-700 md:hover:scale-105 active:scale-95 group perspective-1000 ${isFading ? 'opacity-0 scale-105 blur-xl' : 'opacity-100'}`}
          style={{ backgroundColor: coverBg, borderColor: spineBorder }}
          onClick={handleOpenBook}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay rounded-r-3xl"></div>
          <div className={`absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 rounded-tl-xl ${accentBorder}`}></div>
          <div className={`absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 rounded-tr-xl ${accentBorder}`}></div>
          <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 rounded-bl-xl ${accentBorder}`}></div>
          <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 rounded-br-xl ${accentBorder}`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div 
                className="relative z-10 p-6 rounded-full border-2 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all"
                style={{ backgroundColor: sealBg }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={isFlower ? "#f472b6" : BOOK_THEME.sealStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-0 right-0 text-center">
            <h1 className="text-white/30 font-serif italic tracking-[0.4em] uppercase text-xs mb-2">{BOOK_CONFIG.subTitle}</h1>
            <h2 className={`font-serif text-2xl tracking-widest drop-shadow-md ${accentColor}`}>{BOOK_CONFIG.mainTitle}</h2>
          </div>
        </div>
        <button onClick={onClose} className={`absolute top-8 right-8 p-4 bg-white/5 backdrop-blur-xl rounded-full text-white/40 border border-white/5 transition-all ${closeBtnHover}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center animate-in fade-in duration-700 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-700">
        <img src={currentContent.imageUrl} className="w-full h-full object-cover blur-3xl scale-110" alt="blur-bg" />
      </div>
      <div className={`relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative w-full h-full flex items-center justify-center cursor-pointer group" onClick={handleMediaClick}>
          {isPlaying ? (
            <video ref={videoRef} key={currentContent.videoUrl} autoPlay muted loop playsInline className="max-w-full max-h-full object-contain shadow-2xl">
              <source src={currentContent.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative max-w-full max-h-full flex items-center justify-center p-4">
              <img src={currentContent.imageUrl} alt={`Sampul Halaman ${currentPage + 1}`} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 md:group-hover:bg-black/10 transition-all duration-500">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-[2px] rounded-full flex items-center justify-center border border-white/10 transition-all duration-500 md:group-hover:scale-110">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" className="opacity-40 md:group-hover:opacity-90 transition-opacity ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-20 text-center pointer-events-none">
            {currentContent.caption && (
              <p className="text-white text-lg sm:text-3xl font-medium italic leading-relaxed drop-shadow-2xl max-w-4xl mx-auto">
                "{currentContent.caption}"
              </p>
            )}
            <p className="mt-6 text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">
              {isPlaying ? BOOK_CONFIG.videoPlayingText : BOOK_CONFIG.clickToPlayText}
            </p>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); navigate('prev'); }} className="absolute left-4 sm:left-10 p-4 sm:p-5 bg-white/5 md:hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10 z-[110] group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="md:group-hover:-translate-x-1 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button onClick={(e) => { e.stopPropagation(); navigate('next'); }} className="absolute right-4 sm:right-10 p-4 sm:p-5 bg-white/5 md:hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10 z-[110] group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="md:group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div className="absolute top-0 left-0 right-0 p-6 sm:p-8 flex justify-between items-start z-[120] pointer-events-none">
        <div className="bg-black/40 backdrop-blur-2xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 flex items-center gap-3 sm:gap-4">
          <span className={`w-2 h-2 rounded-full animate-pulse ${headerAccent}`}></span>
          <h2 className="text-white/90 text-xs sm:text-sm font-serif italic tracking-[0.2em] truncate max-w-[150px] sm:max-w-none">{BOOK_CONFIG.headerTitle}</h2>
          <span className="text-white/30 text-[10px] font-bold border-l border-white/10 pl-3 sm:pl-4">{currentPage + 1} / {TARA_STORY_PAGES.length}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className={`p-3 sm:p-4 bg-white/10 backdrop-blur-xl rounded-full text-white pointer-events-auto border border-white/10 ${closeBtnHoverInner}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
};
