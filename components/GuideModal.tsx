
import React, { useState, useEffect } from 'react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('flower')) setTheme('flower');
      else if (document.documentElement.classList.contains('dark')) setTheme('dark');
      else setTheme('light');
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  if (!isOpen) return null;

  const isFlower = theme === 'flower';
  const isDark = theme === 'dark';

  // Helper function to get specific category styles
  const getFeatureStyles = (type: 'ejaan' | 'tata' | 'tanda' | 'gaya') => {
    const base = "p-6 rounded-3xl border-2 shadow-xl transition-all hover:scale-[1.02] duration-500";
    
    switch (type) {
      case 'ejaan':
        return isFlower 
          ? `${base} bg-petal-900 border-amber-500/40 text-amber-300` 
          : isDark 
            ? `${base} bg-amber-900/10 border-amber-500/30 text-amber-200`
            : `${base} bg-amber-50 border-amber-100 text-amber-800`;
      case 'tata':
        return isFlower 
          ? `${base} bg-petal-900 border-emerald-500/40 text-emerald-300` 
          : isDark 
            ? `${base} bg-emerald-900/10 border-emerald-500/30 text-emerald-200`
            : `${base} bg-emerald-50 border-emerald-100 text-emerald-800`;
      case 'tanda':
        return isFlower 
          ? `${base} bg-petal-900 border-blue-500/40 text-blue-300` 
          : isDark 
            ? `${base} bg-blue-900/10 border-blue-500/30 text-blue-200`
            : `${base} bg-blue-50 border-blue-100 text-blue-800`;
      case 'gaya':
        return isFlower 
          ? `${base} bg-petal-900 border-rose-500/40 text-rose-300` 
          : isDark 
            ? `${base} bg-rose-900/10 border-rose-500/30 text-rose-200`
            : `${base} bg-rose-50 border-rose-100 text-rose-800`;
    }
  };

  const features = [
    { type: 'ejaan' as const, title: "✏️ Ejaan", desc: "Mendeteksi salah ketik secara instan" },
    { type: 'tata' as const, title: "🌿 Tata Bahasa", desc: "Menyempurnakan struktur kalimat" },
    { type: 'tanda' as const, title: "📖 Tanda Baca", desc: "Mengatur ritme bacaan dengan tepat" },
    { type: 'gaya' as const, title: "✨ Gaya Bahasa", desc: "Diksi yang lebih luwes & variatif" }
  ];

  const modalBg = isFlower ? 'bg-petal-800' : 'bg-white dark:bg-[#0a1a12]';
  const textColor = isFlower ? 'text-pink-50' : 'text-emerald-900 dark:text-emerald-50';
  const subTextColor = isFlower ? 'text-pink-400/50' : 'text-emerald-600/50 dark:text-emerald-400/40';
  
  // Perbaikan sectionBg agar border tidak putih di mode gelap
  const sectionBg = isFlower 
    ? 'bg-pink-900/40 border-pink-500/20' 
    : isDark 
      ? 'bg-emerald-900/10 border-emerald-800/30' 
      : 'bg-emerald-50/30 border-emerald-100';

  const closeButtonColor = isFlower ? 'text-pink-300 hover:text-pink-500' : 'text-emerald-300 dark:text-emerald-700 hover:text-rose-500';
  const stepBadgeColor = isFlower ? 'bg-pink-500' : 'bg-emerald-600 dark:bg-emerald-500';
  const stepTextColor = isFlower ? 'text-pink-100/80' : 'text-emerald-800/70 dark:text-emerald-200/60';
  const headerSubtextColor = isFlower ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/20';

  const disclaimerBoxStyles = isFlower 
    ? "bg-petal-900/80 border-amber-500/30 text-pink-100" 
    : isDark 
      ? "bg-amber-900/20 border-amber-500/40 text-amber-200" 
      : "bg-amber-50 border-amber-200 text-amber-900";

  const rulesBoxStyles = isFlower 
    ? "bg-petal-900/80 border-rose-500/30 text-rose-100" 
    : isDark 
      ? "bg-rose-900/20 border-rose-500/40 text-rose-200" 
      : "bg-rose-50 border-rose-200 text-rose-900";

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer" onClick={onClose}>
      <div className={`${modalBg} w-full max-w-xl max-h-[85vh] rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col transition-all cursor-default border ${isFlower ? 'border-pink-500/20' : 'border-white/5'}`} onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className={`absolute top-8 right-8 p-2 transition-colors z-30 ${closeButtonColor}`}
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex justify-between items-start mb-8 pr-12">
          <div>
            <h2 className={`text-3xl font-bold ${textColor}`}>Panduan Tara</h2>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${subTextColor}`}>Merawat Naskahmu Bersama AI</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar modal-content-scroll space-y-8 pr-2">
          {/* AI Disclaimer Section */}
          <div className={`p-6 rounded-[2rem] text-xs border-2 transition-colors duration-500 ${disclaimerBoxStyles}`}>
            <strong className="uppercase tracking-[0.2em] flex items-center gap-2 mb-2 text-amber-500">
              <span>⚠️</span> Penafian (Disclaimer)
            </strong>
            <p className="opacity-80 leading-relaxed font-medium italic">
              Tara menggunakan AI yang tidak 100% akurat. Hasil analisis adalah saran, bukan kebenaran mutlak. 
              Untuk dokumen penting, selalu verifikasi manual.
            </p>
          </div>

          {/* Aturan Taman Section */}
          <div className={`p-6 rounded-[2rem] text-xs border-2 transition-colors duration-500 ${rulesBoxStyles}`}>
            <strong className="uppercase tracking-[0.2em] flex items-center gap-2 mb-2 text-rose-500">
              <span>🌸</span> Aturan Taman
            </strong>
            <p className="italic font-medium leading-relaxed opacity-80">
              Gunakan bahasa yang santun. Pelanggaran etika berulang akan mengakibatkan penutupan akses otomatis secara permanen demi kenyamanan bersama.
            </p>
          </div>

          {/* Steps Section */}
          <section className={`${sectionBg} rounded-[2.5rem] p-8 space-y-6 border-2 transition-all duration-500`}>
            {[ 
              "Ketikan naskah di area menulis utama.", 
              "Pilih gaya naskah sesuai kebutuhanmu.", 
              "Klik tombol koreksi untuk penyelarasan instan."
            ].map((step, i) => (
              <div key={i} className="flex gap-5 items-center">
                <span className={`w-10 h-10 rounded-full ${stepBadgeColor} flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0 transition-colors duration-500`}>{i+1}</span>
                <p className={`text-base font-bold ${stepTextColor} transition-colors duration-500`}>{step}</p>
              </div>
            ))}
          </section>

          {/* Features Section */}
          <section className="pb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ml-2 ${headerSubtextColor} transition-colors duration-500`}>Apa yang Tara Periksa?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className={getFeatureStyles(f.type)}>
                  <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                  <p className="text-xs opacity-70 italic font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
