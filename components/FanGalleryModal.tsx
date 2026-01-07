import React, { useState, useEffect, useCallback } from 'react';

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

/**
 * ============================================================
 * PENGATURAN GALERI
 * ============================================================
 */
const GALLERY_CONFIG = {
  mainTitle: "ALBUM SAHABAT",
  subTitle: "MEMORI & AKSARA",
  headerTitle: "Pustaka Kenangan Sahabat",
  instructionText: "Ketuk untuk Membuka Album",
  contactEmail: "tara-teduhaksara@proton.me"
};

/**
 * ============================================================
 * 2. PENGATURAN WARNA TEMA (Emerald Daun)
 * ============================================================
 */
const GALLERY_THEME = {
  coverBackground: "#064e3b",        // Hijau Emerald Gelap
  spineBorder: "#065f46",            // Emerald Pekat
  accentColor: "text-emerald-100",   // Teks Terang
  accentBorder: "border-emerald-400/10",
  sealStroke: "#ffffff",             // Putih
  sealBackground: "#059669"          // Dasar segel emerald cerah
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

  /**
   * Menghasilkan bunyi dentingan melodi beragam (Pentatonik G Major)
   */
  const playBeautifulChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const scale = [783.99, 880.00, 987.77, 1174.66, 1318.51]; // G5, A5, B5, D6, E6
      
      const noteCount = 2 + Math.floor(Math.random() * 2);
      const selectedNotes = Array.from({ length: noteCount }, () => scale[Math.floor(Math.random() * scale.length)]);

      selectedNotes.forEach((freq, index) => {
        const startTime = ctx.currentTime + (index * 0.15);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 1.0);
      });

      setTimeout(() => ctx.close(), 2500);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsBookClosed(true);
      setSelectedIdx(null);
      setIsFading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenBook = () => {
    playBeautifulChime();
    setIsFading(true);
    setTimeout(() => {
      setIsBookClosed(false);
      setIsFading(false);
    }, 600);
  };

  const handleCloseDetail = () => {
    setSelectedIdx(null);
  };

  if (isBookClosed) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-500 overflow-hidden">
        <div 
          className={`relative w-full max-w-[320px] aspect-[3/4] rounded-r-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] border-l-[12px] cursor-pointer transition-all duration-700 md:hover:scale-105 active:scale-95 group ${isFading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100'}`}
          style={{ backgroundColor: GALLERY_THEME.coverBackground, borderColor: GALLERY_THEME.spineBorder }}
          onClick={handleOpenBook}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay rounded-r-3xl"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div 
               className="p-8 rounded-full border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all animate-pulse"
               style={{ backgroundColor: GALLERY_THEME.sealBackground }}
             >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={GALLERY_THEME.sealStroke} strokeWidth="1.5">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                   <circle cx="8.5" cy="8.5" r="1.5" />
                   <polyline points="21 15 16 10 5 21" />
                </svg>
             </div>
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center">
            <p className="text-emerald-100/20 text-[9px] tracking-[0.5em] uppercase mb-2 font-bold">{GALLERY_CONFIG.subTitle}</p>
            <h2 className={`font-serif text-2xl tracking-widest ${GALLERY_THEME.accentColor}`}>{GALLERY_CONFIG.mainTitle}</h2>
          </div>
          
          <div className="absolute -bottom-16 left-0 right-0 text-center animate-bounce">
            <span className="text-emerald-500/60 text-[9px] uppercase tracking-[0.6em] font-bold">{GALLERY_CONFIG.instructionText}</span>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-8 right-8 p-4 bg-white/5 rounded-full text-white/30 border border-white/5 md:hover:bg-emerald-600 md:hover:text-white transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#050a08] flex flex-col items-center animate-in fade-in duration-500 overflow-hidden">
      
      <header className="w-full p-6 sm:p-10 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-none mb-1">{GALLERY_CONFIG.headerTitle}</h2>
            <p className="text-emerald-400/40 text-[10px] uppercase tracking-[0.2em] font-bold">{FAN_CONTENT.length} Memori Tersimpan</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 md:hover:bg-emerald-600 rounded-full text-white/40 md:hover:text-white transition-all border border-white/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-6 sm:p-12 no-scrollbar">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Submission Info Box */}
          <div className="bg-emerald-900/20 rounded-[2.5rem] border border-emerald-500/20 p-8 sm:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.4em] mb-4 block">Kirimkan Aksaramu</span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">Abadikan Puisi & Fanart-mu di Taman Tara</h3>
              <p className="text-emerald-100/60 text-sm sm:text-base leading-relaxed italic mb-8">
                "Sahabat ingin karyanya dipajang di Album Sahabat? Kirimkan Puisi atau Fanart orisinalmu ke alamat di bawah ini. Sahabat yang beruntung akan mendapatkan kiriman Merchandise eksklusif dari Tara!"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-black/20 backdrop-blur-md p-5 rounded-3xl border border-white/5">
                   <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">🌸 Aturan Taman</h4>
                   <p className="text-[11px] text-emerald-100/40 leading-relaxed font-medium">
                     Wajib mengikuti Etika Teduh Aksara: Tidak mengandung kata kotor, SARA, atau gambar tidak senonoh/vulgar.
                   </p>
                </div>
                <div className="bg-black/20 backdrop-blur-md p-5 rounded-3xl border border-white/5">
                   <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">📫 Alamat Kirim</h4>
                   <p className="text-[11px] text-white font-bold tracking-wider mb-1">{GALLERY_CONFIG.contactEmail}</p>
                   <p className="text-[10px] text-emerald-100/40 italic">Sertakan nama panggilanmu!</p>
                </div>
              </div>

              <a 
                href={`mailto:${GALLERY_CONFIG.contactEmail}?subject=Karya untuk Album Sahabat&body=Halo Tara, ini adalah karya (puisi/fanart) saya untuk dipajang di Album Sahabat.`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
              >
                Kirim Karya Sekarang
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10">
            {FAN_CONTENT.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => { setSelectedIdx(idx); playBeautifulChime(); }}
                className="group cursor-pointer animate-in zoom-in-95 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`relative bg-emerald-50 p-2 pb-8 sm:p-3 sm:pb-12 shadow-xl transition-all duration-500 md:group-hover:-translate-y-4 md:group-hover:rotate-0 rotate-${(idx % 2 === 0 ? '1' : '-1')} border border-white/20`}>
                  <div className="aspect-square bg-emerald-100 overflow-hidden relative">
                    <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" alt={`Karya ${item.sender}`} />
                    {item.videoUrl && (
                      <div className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-lg">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                     <p className="text-[10px] sm:text-xs font-bold text-emerald-800/40 uppercase tracking-widest mb-1 truncate">Oleh: {item.sender}</p>
                     <div className="h-0.5 w-4 bg-emerald-500/20 mx-auto rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full p-6 text-center text-white/10 text-[10px] uppercase tracking-[0.5em] font-bold border-t border-white/5">
        Klik Salah Satu Foto untuk Melihat Ukuran Penuh
      </footer>

      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-[30px] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300"
          onClick={handleCloseDetail}
        >
          <button className="absolute top-6 right-6 z-[310] p-4 bg-white/10 rounded-full text-white md:hover:bg-emerald-600 transition-all active:scale-90 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIdx(p => p !== null ? (p - 1 + FAN_CONTENT.length) % FAN_CONTENT.length : null); playBeautifulChime(); }}
            className="absolute left-6 p-5 bg-white/5 md:hover:bg-white/10 rounded-full text-white transition-all hidden sm:block shadow-xl backdrop-blur-md"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIdx(p => p !== null ? (p + 1) % FAN_CONTENT.length : null); playBeautifulChime(); }}
            className="absolute right-6 p-5 bg-white/5 md:hover:bg-white/10 rounded-full text-white transition-all hidden sm:block shadow-xl backdrop-blur-md"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div className="relative max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative group perspective-1000">
              {FAN_CONTENT[selectedIdx].videoUrl ? (
                <video 
                  autoPlay loop playsInline 
                  className="max-w-[90vw] max-h-[75vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-xl ring-1 ring-white/10"
                >
                  <source src={FAN_CONTENT[selectedIdx].videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={FAN_CONTENT[selectedIdx].imageUrl} 
                  className="max-w-[90vw] max-h-[75vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-xl animate-in zoom-in-95 duration-300 ring-1 ring-white/10" 
                  alt="Full view"
                />
              )}
            </div>

            <div className="mt-10 text-center max-w-2xl px-6 animate-in slide-in-from-bottom-4 duration-500">
               <p className="text-white text-xl sm:text-3xl font-medium italic mb-4 drop-shadow-lg">"{FAN_CONTENT[selectedIdx].caption}"</p>
               <div className="flex items-center justify-center gap-4">
                 <span className="w-12 h-[1.5px] bg-gradient-to-r from-transparent to-emerald-500/50"></span>
                 <p className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-[0.4em] drop-shadow-md">Sahabat {FAN_CONTENT[selectedIdx].sender}</p>
                 <span className="w-12 h-[1.5px] bg-gradient-to-l from-transparent to-emerald-500/50"></span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};