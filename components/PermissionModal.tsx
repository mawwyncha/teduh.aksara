
import React, { useState, useEffect } from 'react';

interface PermissionModalProps {
  type: 'mic' | 'plagiarism';
  onAccept: () => void;
  onDeny: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ type, onAccept, onDeny }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');
  const isMic = type === 'mic';

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

  // Dynamic Styles
  const modalBg = theme === 'flower' ? 'bg-petal-50' : 'bg-white dark:bg-[#0a1a12]';
  const titleColor = theme === 'flower' ? 'text-pink-600' : 'text-emerald-950 dark:text-emerald-50';
  const textColor = theme === 'flower' ? 'text-petal-800' : 'text-emerald-900/70 dark:text-emerald-200/50';
  const borderColor = theme === 'flower' ? 'border-pink-200 shadow-pink-500/5' : 'border-emerald-50 dark:border-emerald-800/10';
  
  const iconBg = isMic 
    ? (theme === 'flower' ? 'bg-rose-100 text-rose-500' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600')
    : (theme === 'flower' ? 'bg-pink-100 text-pink-500' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600');

  const acceptBtn = theme === 'flower' ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20';
  const denyBtn = theme === 'flower' ? 'text-pink-400 hover:text-pink-600' : 'text-emerald-800/40 dark:text-emerald-200/20 hover:text-rose-600';
  const footerText = theme === 'flower' ? 'text-pink-500/20' : 'text-emerald-900/20 dark:text-emerald-100/10';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`${modalBg} w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-center border ${borderColor}`}>
        <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-inner ${iconBg}`}>
          {isMic ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          )}
        </div>
        
        <h3 className={`text-2xl font-bold mb-4 ${titleColor}`}>
          {isMic ? 'Izinkan Tara Mendengar?' : 'Izinkan Tara Menelusuri Web?'}
        </h3>
        
        <p className={`${textColor} font-medium mb-10 leading-relaxed italic text-sm`}>
          {isMic 
            ? 'Tara perlu meminjam pendengaranmu untuk mengubah suara menjadi aksara. Rekaman suaramu hanya diproses seketika untuk transkripsi dan tidak akan pernah kami simpan di dahan ingatan permanen kami.'
            : 'Naskahmu akan dibandingkan dengan berbagai dahan teks di web luas untuk memastikan kemurniannya. Kami menjamin privasi naskahmu; pencarian ini hanya untuk verifikasi keaslian tanpa menyimpan naskahmu di tempat lain.'}
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onAccept}
            className={`w-full py-4 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${acceptBtn}`}
          >
            Ya, Saya Setuju
          </button>
          <button 
            onClick={onDeny}
            className={`w-full py-4 font-bold transition-colors text-sm uppercase tracking-widest ${denyBtn}`}
          >
            Lain Kali Saja
          </button>
        </div>
        
        <div className={`mt-8 text-[9px] uppercase tracking-[0.3em] font-bold ${footerText}`}>
          Keamanan Privasi Sahabat Aksara Diutamakan
        </div>
      </div>
    </div>
  );
};
