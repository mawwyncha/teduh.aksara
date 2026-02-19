
import React, { useState, useEffect } from 'react';

interface CatalogItem {
  id: number;
  url: string;
  title: string;
  desc: string;
}

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1887&auto=format&fit=crop",
    title: "Buku Jurnal Aksara",
    desc: "Buku catatan kulit premium untuk menyemai naskah harianmu."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    title: "Pena Kayu Kersen",
    desc: "Alat tulis tangan ergonomis dari kayu kersen pilihan."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    title: "Kaos Teduh Aksara",
    desc: "Bahan katun organik yang nyaman untuk menemani waktu menulis."
  }
];

const MERCH_REMAINING = 12;
const MIN_DONATION = "100.000";
const CONTACT_EMAIL = "tara-teduhaksara@proton.me";

export const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlower, setIsFlower] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsFlower(document.documentElement.classList.contains('flower'));
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) setActiveIdx(0);
  }, [isOpen]);

  // Keyboard Navigation Support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIdx]);

  if (!isOpen) return null;

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % CATALOG_ITEMS.length);
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + CATALOG_ITEMS.length) % CATALOG_ITEMS.length);

  // Dynamic Styles
  const modalBg = isFlower ? 'bg-petal-800 border-pink-500/20' : 'bg-white dark:bg-[#0a1a12] border-transparent';
  const leftSideBg = isFlower ? 'bg-petal-900/50' : 'bg-emerald-50/50 dark:bg-emerald-900/20';
  const rightSideBg = isFlower ? 'bg-petal-800' : 'bg-white dark:bg-[#0a1a12]';
  const labelColor = isFlower ? 'text-pink-400' : 'text-emerald-600/40';
  const titleColor = isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-50';
  const descColor = isFlower ? 'text-pink-200/60' : 'text-emerald-800/60 dark:text-emerald-300/60';
  const merchBoxBg = isFlower ? 'bg-petal-900/80 border-pink-500/20' : 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30';
  const merchTitleColor = isFlower ? 'text-pink-300' : 'text-emerald-800 dark:text-emerald-200';
  const ctaButton = isFlower ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'premium-shimmer shadow-lg';
  const footerText = isFlower ? 'text-pink-100/20' : 'text-emerald-900/30 dark:text-emerald-100/20';

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className={`${modalBg} w-full max-w-4xl max-h-[92vh] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden border flex flex-col md:flex-row cursor-default`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-rose-500 backdrop-blur-md rounded-full text-white transition-all z-[160] md:hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
        </button>

        <div className={`w-full md:w-1/2 h-64 sm:h-80 md:h-auto relative ${leftSideBg} flex-shrink-0 overflow-hidden`}>
          <img 
            src={CATALOG_ITEMS[activeIdx].url} 
            className="w-full h-full object-contain md:object-cover transition-all duration-700 md:hover:scale-110" 
            alt={CATALOG_ITEMS[activeIdx].title}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:block hidden"></div>
          
          <div className="absolute bottom-6 left-6 right-6 md:block hidden">
            <h3 className="text-white text-xl font-bold mb-1">{CATALOG_ITEMS[activeIdx].title}</h3>
            <p className="text-white/70 text-sm italic">{CATALOG_ITEMS[activeIdx].desc}</p>
          </div>

          <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all shadow-lg active:scale-90 border border-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-6 md:h-6"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all shadow-lg active:scale-90 border border-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-6 md:h-6"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {CATALOG_ITEMS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}></div>
            ))}
          </div>
        </div>

        <div className={`w-full md:w-1/2 p-6 sm:p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col relative ${rightSideBg}`}>
          <button onClick={onClose} className={`absolute top-8 right-8 p-2 transition-colors z-20 hidden md:block ${isFlower ? 'text-pink-300 hover:text-pink-500' : 'text-emerald-300 dark:text-emerald-700 hover:text-rose-500'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="mb-6 md:mb-8">
            <div className="md:hidden mb-2">
              <h3 className={`${titleColor} text-xl font-bold`}>{CATALOG_ITEMS[activeIdx].title}</h3>
              <p className={`${descColor} text-xs italic`}>{CATALOG_ITEMS[activeIdx].desc}</p>
            </div>
            
            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] block mb-2 mt-4 md:mt-0 ${labelColor}`}>Dukungan Sahabat</span>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${titleColor}`}>Pupuk Kemajuan Tara</h2>
            <p className={`text-xs md:text-sm leading-relaxed italic ${descColor}`}>
              "Setiap kontribusimu membantu dahan-dahanan Teduh Aksara terus tumbuh rimbun dan melayani lebih banyak Sahabat Penulis."
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className={`p-5 rounded-[2rem] border ${merchBoxBg} shadow-sm transition-all`}>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${merchTitleColor}`}>🎁 Merchandise Eksklusif</h4>
              <p className={`text-xs leading-relaxed ${isFlower ? 'text-pink-100/70' : 'text-emerald-700 dark:text-emerald-400'}`}>
                Bagi Sahabat yang berdonasi mulai dari <span className={`font-bold ${isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-white'}`}>Rp{MIN_DONATION}</span>, Tara menyiapkan paket merchandise spesial yang terinspirasi dari alam.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold bg-rose-500 text-white px-3 py-1 rounded-full animate-pulse shadow-lg shadow-rose-500/20">Sisa {MERCH_REMAINING} Paket</span>
                <span className={`text-[10px] italic ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>Terbatas & Otentik</span>
              </div>
            </div>
          </div>

          <a 
            href={`mailto:${CONTACT_EMAIL}?subject=Donasi Teduh Aksara&body=Halo Tara, saya ingin berdonasi untuk membantu pengembangan platform Teduh Aksara.`}
            className={`w-full py-4 md:py-5 ${ctaButton} text-white rounded-2xl md:rounded-[2rem] font-bold text-center transition-all active:scale-95 flex items-center justify-center gap-3 mt-auto shadow-xl`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
            Donasi Sekarang
          </a>
          
          <p className={`text-center mt-4 text-[9px] font-bold uppercase tracking-widest ${footerText}`}>
            Terhubung via: {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    </div>
  );
};
