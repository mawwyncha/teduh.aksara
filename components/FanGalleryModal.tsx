import React, { useState, useEffect } from 'react';

interface GalleryPage {
  imageUrl: string; 
  videoUrl?: string; 
  sender: string;
  caption?: string;
}

interface FanGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GALLERY_CONFIG = {
  mainTitle: "ALBUM SAHABAT",
  subTitle: "MEMORI & AKSARA",
  headerTitle: "Pustaka Kenangan Sahabat",
  instructionText: "Ketuk untuk Membuka Album",
  contactEmail: "tara-teduhaksara@proton.me"
};

const GALLERY_THEME = {
  coverBackground: "#991b1b",
  spineBorder: "#7f1d1d",
  accentColor: "text-red-100",
  accentBorder: "border-red-400/10",
  sealStroke: "#ffffff",
  sealBackground: "#7f1d1d"
};

const FAN_CONTENT: GalleryPage[] = [
  { 
    imageUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/WhatsApp%20Image%202026-01-04%20at%208.45.44%20PM%20(1).jpeg",
    sender: "Admin Tara",
    caption: "Awal mula dahan-dahan Teduh Aksara tumbuh."
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?q=80&w=1887&auto=format&fit=crop",
    sender: "Budi",
    caption: "Senangnya bisa menulis lebih rapi bersama Tara!"
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1453722751116-9592642515ff?q=80&w=2070&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-silent-lake-1601-large.mp4", 
    sender: "Siti",
    caption: "Inspirasi menulis di bawah cahaya rembulan."
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    sender: "Andi",
    caption: "Kopi dan koreksi tata bahasa, kombinasi sempurna."
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop",
    sender: "Rina",
    caption: "Merapikan dahan jurnal harian saya setiap pagi."
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1973&auto=format&fit=crop",
    sender: "Fajar",
    caption: "Aksara yang tertata membuat pikiran lebih tenang."
  }
];

export const FanGalleryModal: React.FC<FanGalleryModalProps> = ({ isOpen, onClose }) => {
  const [isBookClosed, setIsBookClosed] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isFlower, setIsFlower] = useState(false);

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
      setSelectedIdx(null);
      setIsFading(false);
    }
  }, [isOpen]);

  const playSoftChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Rentang 250Hz - 2000Hz (Skala Pentatonik Harmonis)
      const bells = [
        293.66, 440.00, 587.33, 880.00, 1174.66, 1318.51, 1567.98, 1760.00, 1975.53
      ];
      const freq = bells[Math.floor(Math.random() * bells.length)];
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      const volume = freq > 1200 ? 0.04 : 0.05;
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
      setTimeout(() => ctx.close(), 800);
    } catch (e) {}
  };

  if (!isOpen) return null;

  const coverBg = isFlower ? '#2a1a12' : GALLERY_THEME.coverBackground;
  const spineBorder = isFlower ? '#1a0f0e' : GALLERY_THEME.spineBorder;
  const accentText = isFlower ? 'text-pink-100' : GALLERY_THEME.accentColor;
  const sealBg = isFlower ? '#3d2b1f' : GALLERY_THEME.sealBackground;
  const sealStroke = GALLERY_THEME.sealStroke;
  const bodyBg = isFlower ? 'bg-petal-800' : 'bg-[#0c0505]';
  const headerAccent = isFlower ? 'text-pink-400' : 'text-red-400/40';
  const cardBg = isFlower ? 'bg-petal-100' : 'bg-red-50';
  const cardText = isFlower ? 'text-petal-900/40' : 'text-red-800/40';
  const ctaBg = isFlower ? 'bg-petal-900/80 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'bg-white/5';
  const ctaBorder = isFlower ? 'border-pink-500/30' : 'border-white/10';
  const iconColor = isFlower ? "#f472b6" : "#10b981";
  const hoverBg = isFlower ? 'md:hover:bg-pink-600' : 'md:hover:bg-emerald-600';

  const handleOpenBook = () => {
    playSoftChime();
    setIsFading(true);
    setTimeout(() => {
      setIsBookClosed(false);
      setIsFading(false);
    }, 600);
  };

  const handleSelectIdx = (idx: number) => {
    playSoftChime();
    setSelectedIdx(idx);
  };

  const handleCloseDetail = () => {
    setSelectedIdx(null);
  };

  if (isBookClosed) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-500 overflow-hidden">
        <div 
          className={`relative w-full max-w-[320px] aspect-[3/4] rounded-r-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] border-l-[12px] cursor-pointer transition-all duration-700 md:hover:scale-105 active:scale-95 group ${isFading ? 'opacity-0 scale-105 blur-xl' : 'opacity-100'}`}
          style={{ backgroundColor: coverBg, borderColor: spineBorder }}
          onClick={handleOpenBook}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay rounded-r-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div 
               className="p-8 rounded-full border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all animate-pulse"
               style={{ backgroundColor: sealBg }}
             >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={sealStroke} strokeWidth="1.5">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                   <circle cx="8.5" cy="8.5" r="1.5" />
                   <polyline points="21 15 16 10 5 21" />
                </svg>
             </div>
          </div>
          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-white/20 text-[9px] tracking-[0.5em] uppercase mb-2 font-bold">{GALLERY_CONFIG.subTitle}</p>
            <h2 className={`font-serif text-2xl tracking-widest ${accentText}`}>{GALLERY_CONFIG.mainTitle}</h2>
          </div>
        </div>
        <button onClick={onClose} className={`absolute top-8 right-8 p-4 bg-white/5 rounded-full text-white/30 border border-white/5 ${hoverBg} md:hover:text-white transition-all`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[200] ${bodyBg} flex flex-col items-center animate-in fade-in duration-500 overflow-hidden`}>
      <header className="w-full p-6 sm:p-10 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isFlower ? 'bg-pink-500/10 border-pink-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-none mb-1">{GALLERY_CONFIG.headerTitle}</h2>
            <p className={`${headerAccent} text-[10px] uppercase tracking-[0.2em] font-bold`}>{FAN_CONTENT.length} Memori Tersimpan</p>
          </div>
        </div>
        <button onClick={onClose} className={`p-3 bg-white/5 ${hoverBg} rounded-full text-white/40 md:hover:text-white transition-all border border-white/5`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-6 sm:p-12 no-scrollbar">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10">
          {FAN_CONTENT.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleSelectIdx(idx)}
              className="group cursor-pointer animate-in fade-in duration-500"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`relative ${cardBg} p-2 pb-8 sm:p-3 sm:pb-12 shadow-xl transition-all duration-500 md:group-hover:-translate-y-4 md:group-hover:rotate-0 rotate-${(idx % 2 === 0 ? '1' : '-1')} border border-white/20`}>
                <div className="aspect-square bg-black/5 overflow-hidden relative">
                  <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" alt={`Karya ${item.sender}`} />
                  {item.videoUrl && (
                    <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-lg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                   <p className={`text-[10px] sm:text-xs font-bold ${cardText} uppercase tracking-widest mb-1 truncate`}>Oleh: {item.sender}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="group animate-in fade-in duration-500" style={{ animationDelay: `${FAN_CONTENT.length * 50}ms` }}>
             <a 
               href={`mailto:${GALLERY_CONFIG.contactEmail}?subject=Kirim Karya Sahabat Aksara&body=Halo Tara, saya ingin mengirimkan [Fanart/Puisi] untuk Album Sahabat.`}
               className={`relative ${ctaBg} border-2 border-dashed ${ctaBorder} aspect-square rounded-[2rem] flex flex-col items-center justify-center p-6 text-center transition-all duration-500 md:group-hover:border-pink-500/50 md:group-hover:scale-95 group-active:scale-90`}
             >
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${isFlower ? 'bg-pink-500 text-white shadow-pink-500/30' : 'bg-emerald-500 text-white shadow-emerald-500/30'} shadow-lg`}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isFlower ? 'text-pink-100' : 'text-white'}`}>Kirim Karyamu</p>
                <p className={`text-[9px] font-medium italic ${isFlower ? 'text-pink-100/40' : 'text-white/40'}`}>Fanart, Puisi, atau Video</p>
             </a>
          </div>
        </div>
        <div className={`mt-16 max-w-2xl mx-auto p-8 rounded-[2.5rem] border ${ctaBg} ${ctaBorder} text-center space-y-6`}>
           <div className="space-y-4">
             <h3 className={`text-xs font-bold uppercase tracking-[0.3em] ${isFlower ? 'text-pink-400' : 'text-emerald-400'}`}>Ingingin Karyamu Dipajang?</h3>
             <p className={`text-sm leading-relaxed italic ${isFlower ? 'text-pink-100/60' : 'text-white/60'}`}>
               "Tara sangat senang menerima dahan-dahanan kreativitas dari Sahabat Aksara. Kirimkan Fanart, Puisi, atau video dokumentasi menulismu untuk kami abadikan di Pustaka Kenangan ini."
             </p>
           </div>
           <div className={`py-4 px-6 rounded-2xl ${isFlower ? 'bg-pink-900/30' : 'bg-white/5'} border ${isFlower ? 'border-pink-500/20' : 'border-white/5'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isFlower ? 'text-pink-300' : 'text-rose-400'}`}>🌸 Etika Beraksara (PENTING):</h4>
              <p className={`text-11px leading-relaxed italic ${isFlower ? 'text-pink-100/40' : 'text-white/40'}`}>
                "Karya yang mengandung kata-kata kotor, tidak senonoh, atau ujaran kebencian tidak akan kami tayangkan. Mari merawat taman ini dengan bahasa yang santun."
              </p>
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                 <span className="text-sm">📧</span>
                 <span className={`text-[11px] font-bold ${isFlower ? 'text-pink-100' : 'text-white'}`}>{GALLERY_CONFIG.contactEmail}</span>
              </div>
              <span className="hidden sm:block opacity-20">|</span>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isFlower ? 'text-pink-500' : 'text-emerald-500'}`}>Subjek: Karya Sahabat Aksara</p>
           </div>
        </div>
      </div>

      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[300] bg-black/98 flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300"
          onClick={handleCloseDetail}
        >
          <button className={`absolute top-6 right-6 z-[310] p-4 bg-white/10 rounded-full text-white ${hoverBg} transition-all active:scale-90`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); playSoftChime(); setSelectedIdx(p => p !== null ? (p - 1 + FAN_CONTENT.length) % FAN_CONTENT.length : null); }}
            className="absolute left-6 p-5 bg-white/5 md:hover:bg-white/10 rounded-full text-white transition-all hidden sm:block"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); playSoftChime(); setSelectedIdx(p => p !== null ? (p + 1) % FAN_CONTENT.length : null); }}
            className="absolute right-6 p-5 bg-white/5 md:hover:bg-white/10 rounded-full text-white transition-all hidden sm:block"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="relative max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {FAN_CONTENT[selectedIdx].videoUrl ? (
                <video 
                  autoPlay muted loop playsInline 
                  className="max-w-[90vw] max-h-[75vh] object-contain shadow-2xl rounded-lg"
                >
                  <source src={FAN_CONTENT[selectedIdx].videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={FAN_CONTENT[selectedIdx].imageUrl} 
                  className="max-w-[90vw] max-h-[75vh] object-contain shadow-2xl rounded-lg" 
                  alt="Full view"
                />
              )}
            </div>
            <div className="mt-8 text-center max-w-2xl px-6">
               <p className="text-white text-xl sm:text-2xl font-medium italic mb-3">"{FAN_CONTENT[selectedIdx].caption}"</p>
               <div className="flex items-center justify-center gap-3">
                 <span className={`w-8 h-[1px] ${isFlower ? 'bg-pink-500/50' : 'bg-emerald-50/50'}`}></span>
                 <p className={`${isFlower ? 'text-pink-400' : 'text-emerald-400'} text-xs sm:text-sm font-bold uppercase tracking-[0.3em]`}>Sahabat {FAN_CONTENT[selectedIdx].sender}</p>
                 <span className={`w-8 h-[1px] ${isFlower ? 'bg-pink-500/50' : 'bg-emerald-50/50'}`}></span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};