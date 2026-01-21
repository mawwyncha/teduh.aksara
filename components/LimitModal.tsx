
import React, { useState, useEffect } from 'react';

interface LimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LimitModal: React.FC<LimitModalProps> = ({ isOpen, onClose }) => {
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

  // Dynamic Styles
  const modalBg = theme === 'flower' ? 'bg-petal-50' : 'bg-white dark:bg-[#0a1a12]';
  const titleColor = theme === 'flower' ? 'text-pink-600' : 'text-emerald-950 dark:text-emerald-50';
  const textColor = theme === 'flower' ? 'text-petal-800' : 'text-emerald-900/60 dark:text-emerald-200/40';
  const iconBg = theme === 'flower' ? 'bg-pink-100' : 'bg-amber-50 dark:bg-amber-900/20';
  const infoBoxBg = theme === 'flower' ? 'bg-pink-100/50 border-pink-200 text-pink-700' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/10 text-emerald-800 dark:text-emerald-200';
  const acceptBtn = theme === 'flower' ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20';
  const borderColor = theme === 'flower' ? 'border-pink-200' : 'border-transparent';

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`${modalBg} w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center border ${borderColor}`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${iconBg}`}>
          <span className="text-5xl">{theme === 'flower' ? '🌸' : '🍒'}</span>
        </div>
        
        <h2 className={`text-2xl font-bold mb-4 leading-tight ${titleColor}`}>
          Maafkan Tara, Sahabat Aksara...
        </h2>
        
        <p className={`${textColor} font-medium mb-10 leading-relaxed italic text-sm`}>
          "Dahan bahasaku butuh waktu untuk tumbuh kembali. Kamu telah mencapai batas harian permintaan hari ini."
        </p>
        
        <div className={`p-6 rounded-[2rem] mb-10 border text-xs font-bold leading-relaxed ${infoBoxBg}`}>
          Silakan kembali besok pagi saat embun pertama turun untuk merawat aksaramu kembali bersama Tara.
        </div>
        
        <button 
          onClick={onClose}
          className={`w-full py-4 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${acceptBtn}`}
        >
          Mengerti, Sampai Jumpa
        </button>
      </div>
    </div>
  );
};
