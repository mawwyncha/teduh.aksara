
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

/**
 * ============================================================
 * KONFIGURASI KATALOG & MERCHANDISE (Mudah Diupdate)
 * ============================================================
 */
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

const MERCH_REMAINING = 12; // Update angka ini berkala
const MIN_DONATION = "100.000";
const CONTACT_EMAIL = "tara-teduhaksara@proton.me";

export const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveIdx(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % CATALOG_ITEMS.length);
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + CATALOG_ITEMS.length) % CATALOG_ITEMS.length);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white dark:bg-[#0a1a12] w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slideshow Section */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-emerald-50 dark:bg-emerald-900/10">
          <img 
            src={CATALOG_ITEMS[activeIdx].url} 
            className="w-full h-full object-cover transition-all duration-700" 
            alt={CATALOG_ITEMS[activeIdx].title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white text-xl font-bold mb-1">{CATALOG_ITEMS[activeIdx].title}</h3>
            <p className="text-white/70 text-sm italic">{CATALOG_ITEMS[activeIdx].desc}</p>
          </div>

          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Donation Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-emerald-300 hover:text-rose-500 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="mb-8">
            <span className="text-[10px] font-bold text-emerald-600/40 uppercase tracking-[0.3em] block mb-2">Dukungan Sahabat</span>
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50 mb-4">Pupuk Kemajuan Tara</h2>
            <p className="text-sm text-emerald-800/60 dark:text-emerald-300/60 leading-relaxed italic">
              "Setiap kontribusimu membantu dahan-dahan Teduh Aksara terus tumbuh rimbun dan melayani lebih banyak Sahabat Penulis."
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-widest mb-2">🎁 Merchandise Eksklusif</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                Bagi Sahabat yang berdonasi mulai dari <span className="font-bold text-emerald-900 dark:text-white">Rp{MIN_DONATION}</span>, Tara menyiapkan paket merchandise spesial (seperti item di katalog samping).
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold bg-rose-500 text-white px-3 py-1 rounded-full animate-pulse">Sisa {MERCH_REMAINING} Paket</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 italic">Terbatas & Otentik</span>
              </div>
            </div>
          </div>

          <a 
            href={`mailto:${CONTACT_EMAIL}?subject=Donasi Teduh Aksara&body=Halo Tara, saya ingin berdonasi untuk membantu pengembangan platform Teduh Aksara.`}
            className="w-full py-5 premium-shimmer text-white rounded-[2rem] font-bold text-center shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
            Donasi Sekarang
          </a>
          
          <p className="text-center mt-4 text-[9px] text-emerald-900/30 dark:text-emerald-100/20 font-bold uppercase tracking-widest">
            Terhubung via: {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    </div>
  );
};
