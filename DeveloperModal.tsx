
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

/**
 * ============================================================
 * 1. PENGATURAN JUDUL & TEKS
 * ============================================================
 */
const BOOK_CONFIG = {
  mainTitle: "तारा",           
  subTitle: "TEDUH AKSARA",        
  headerTitle: "Kisah Tara Si Pohon Kersen", 
  instructionText: "Ketuk untuk Membuka",
  videoPlayingText: "Video Sedang Diputar",
  clickToPlayText: "Ketuk Gambar Untuk Memutar Video"
};

/**
 * ============================================================
 * 2. PENGATURAN WARNA TEMA (REVERSE: Merah Cherry & Hijau Daun)
 * ============================================================
 */
const BOOK_THEME = {
  coverBackground: "#7f1d1d",        // Merah Cherry Gelap
  spineBorder: "#450a0a",            // Merah Hitam Pekat
  accentColor: "text-red-100",       // Warna teks judul
  accentBorder: "border-red-400/20", // Warna ornamen sudut
  sealStroke: "#ffffff",             // Putih (Agar lebih kontras)
  sealBackground: "#450a0a"          // Dasar segel merah gelap
};

/**
 * ============================================================
 * 3. DAFTAR ISI AUDIOVISUAL
 * ============================================================
 */
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsBookClosed(true);
      setCurrentPage(0);
      setIsPlaying(false);
      setIsFading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentContent = TARA_STORY_PAGES[currentPage];

  const handleOpenBook = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsBookClosed(false);
      setIsFading(false);
    }, 600);
  };

  const navigate = (direction: 'next' | 'prev') => {
    setIsFading(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentPage((prev) => (prev + 1) % TARA_STORY_PAGES.length);
      } else {
        setCurrentPage((prev) => (prev - 1 + TARA_STORY_PAGES.length) % TARA_STORY_PAGES.length);
      }
      setIsPlaying(true);
      setIsFading(false);
    }, 400);
  };

  const handleMediaClick = () => {
    setIsPlaying(!isPlaying);
  };

  if (isBookClosed) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-700">
        <div 
          className={`relative w-full max-w-[340px] aspect-[3/4] rounded-r-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-l-[12px] cursor-pointer transition-all duration-700 hover:scale-105 active:scale-95 group perspective-1000 ${isFading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100'}`}
          style={{ backgroundColor: BOOK_THEME.coverBackground, borderColor: BOOK_THEME.spineBorder }}
          onClick={handleOpenBook}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay rounded-r-3xl"></div>
          
          <div className={`absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 rounded-tl-xl ${BOOK_THEME.accentBorder}`}></div>
          <div className={`absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 rounded-tr-xl ${BOOK_THEME.accentBorder}`}></div>
          <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 rounded-bl-xl ${BOOK_THEME.accentBorder}`}></div>
          <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 rounded-br-xl ${BOOK_THEME.accentBorder}`}></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              
              <div 
                className="relative z-10 p-6 rounded-full border-2 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all"
                style={{ backgroundColor: BOOK_THEME.sealBackground }}
              >
                {/* Ikon Bintang (TARA) */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={BOOK_THEME.sealStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center">
            <h1 className="text-red-100/30 font-serif italic tracking-[0.4em] uppercase text-xs mb-2">{BOOK_CONFIG.subTitle}</h1>
            <h2 className={`font-serif text-2xl tracking-widest drop-shadow-md ${BOOK_THEME.accentColor}`}>{BOOK_CONFIG.mainTitle}</h2>
          </div>

          <div className="absolute inset-y-8 -left-3 w-1.5 flex flex-col justify-around">
            <div className="h-4 w-full bg-white/20 rounded-full shadow-lg"></div>
            <div className="h-4 w-full bg-white/20 rounded-full shadow-lg"></div>
            <div className="h-4 w-full bg-white/20 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute -bottom-16 left-0 right-0 text-center animate-bounce">
            <span className="text-red-500/40 text-[10px] uppercase tracking-[0.5em] font-bold">{BOOK_CONFIG.instructionText}</span>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-emerald-600/40 backdrop-blur-xl rounded-full text-white/40 border border-white/5 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center animate-in fade-in duration-700 overflow-hidden">
      <div className="absolute inset-0 z-0 scale-110 blur-3xl opacity-30 pointer-events-none transition-all duration-700">
        <img src={currentContent.imageUrl} className="w-full h-full object-cover" alt="blur-bg" />
      </div>

      <div className={`relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative w-full h-full flex items-center justify-center cursor-pointer group" onClick={handleMediaClick}>
          {isPlaying ? (
            <video ref={videoRef} key={currentContent.videoUrl} autoPlay muted loop playsInline className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500">
              <source src={currentContent.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative max-w-full max-h-full flex items-center justify-center p-4">
              <img src={currentContent.imageUrl} alt={`Sampul Halaman ${currentPage + 1}`} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-all duration-500">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-[2px] rounded-full flex items-center justify-center border border-white/10 scale-100 group-hover:scale-110 transition-all duration-500">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" className="opacity-40 group-hover:opacity-90 transition-opacity ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 right-0 p-10 sm:p-20 text-center pointer-events-none">
            {currentContent.caption && (
              <p className="text-white text-xl sm:text-3xl font-medium italic leading-relaxed drop-shadow-2xl animate-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
                "{currentContent.caption}"
              </p>
            )}
            <p className="mt-6 text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">
              {isPlaying ? BOOK_CONFIG.videoPlayingText : BOOK_CONFIG.clickToPlayText}
            </p>
          </div>
        </div>

        <button onClick={(e) => { e.stopPropagation(); navigate('prev'); }} className="absolute left-6 sm:left-10 p-5 bg-white/5 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10 z-[110] group">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button onClick={(e) => { e.stopPropagation(); navigate('next'); }} className="absolute right-6 sm:right-10 p-5 bg-white/5 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10 z-[110] group">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-[120] pointer-events-none">
        <div className="bg-black/40 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
          <h2 className="text-white/90 text-sm font-serif italic tracking-[0.2em]">{BOOK_CONFIG.headerTitle}</h2>
          <span className="text-white/30 text-[10px] font-bold border-l border-white/10 pl-4">{currentPage + 1} / {TARA_STORY_PAGES.length}</span>
        </div>
        
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-4 bg-white/10 hover:bg-emerald-600 backdrop-blur-xl rounded-full text-white pointer-events-auto border border-white/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
};
