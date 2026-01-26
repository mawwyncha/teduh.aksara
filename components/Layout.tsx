
import React, { useEffect, useState, useRef } from 'react';
import { getData, saveData } from '../services/dbService';

interface LayoutProps {
  children: React.ReactNode;
  activeModal: 'history' | 'guide' | 'dev' | 'gallery' | 'catalog' | null;
  onHistoryClick: () => void;
  onGuideClick: () => void;
  onDevClick: () => void;
  onGalleryClick: () => void;
  onCatalogClick: () => void;
  onEditorClick: () => void;
  isHelpActive: boolean;
  onHelpToggle: () => void;
}

const STORE_SETTINGS = 'settings';
const KEY_THEME = 'theme';

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeModal,
  onHistoryClick, 
  onGuideClick,
  onDevClick,
  onGalleryClick,
  onCatalogClick,
  onEditorClick,
  isHelpActive,
  onHelpToggle
}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');
  const [isReady, setIsReady] = useState(false);
  const [hoveredHelp, setHoveredHelp] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await getData(STORE_SETTINGS, KEY_THEME);
        if (savedTheme !== undefined) {
          setTheme(savedTheme as any);
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
        }
      } catch (e) {
        setTheme('light');
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.classList.remove('dark', 'flower');
    if (theme !== 'light') {
      document.documentElement.classList.add(theme);
    }
    saveData(STORE_SETTINGS, KEY_THEME, theme);
  }, [theme, isReady]);

  useEffect(() => {
    if (!isHelpActive) {
      setHoveredHelp(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const helpText = target.closest('[data-help]')?.getAttribute('data-help');
      if (helpText) {
        setHoveredHelp(helpText);
        setMousePos({ x: e.clientX, y: e.clientY });
      } else {
        setHoveredHelp(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredHelp) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHelpActive, hoveredHelp]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('flower');
    else setTheme('light');
  };

  const navLinkClass = `px-4 py-2 font-bold transition-all text-base md:text-xl ${
    theme === 'flower' 
      ? 'text-pink-300 hover:text-pink-100' 
      : 'text-[#2d4d3a] dark:text-emerald-200/60 hover:text-emerald-700 dark:hover:text-emerald-400'
  }`;

  const mobileNavClass = "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all active:scale-95";
  const mobileNavActiveClass = theme === 'flower' 
    ? "text-pink-100 font-bold bg-pink-500/20 rounded-2xl" 
    : "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl";

  if (!isReady) return null;

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 transition-colors duration-700 pb-24 lg:pb-8 ${isHelpActive ? 'cursor-help' : ''} ${theme === 'flower' ? 'bg-petal-50 text-petal-800' : 'bg-[#faf9f6] dark:bg-[#050a08] text-[#1a0f0e] dark:text-emerald-50'}`}>
      
      {isHelpActive && hoveredHelp && (
        <div 
          ref={tooltipRef}
          className="fixed z-[999] pointer-events-none bg-emerald-900/95 dark:bg-emerald-50/95 text-white dark:text-emerald-950 px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-sm font-bold max-w-xs transition-opacity animate-in fade-in zoom-in-95"
          style={{ 
            left: mousePos.x + 20, 
            top: mousePos.y + 20,
            transform: mousePos.x > window.innerWidth - 300 ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs">💧</span>
             <span className="text-[10px] uppercase tracking-widest opacity-60">Embun Penjelas</span>
          </div>
          {hoveredHelp}
        </div>
      )}

      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 px-2 gap-6">
        <div className="flex items-center group cursor-help scale-75 md:scale-100 origin-left">
          <div className="flex items-end" data-help="Identitas Teduh Aksara. Tara si Pohon Kersen adalah penjaga naskahmu di sini.">
            <span className={`text-6xl md:text-8xl font-serif select-none leading-[0.7] transform transition-all duration-700 group-hover:scale-y-110 origin-bottom ${theme === 'flower' ? 'text-pink-500' : 'text-emerald-800 dark:text-emerald-400'}`}>
              तारा
            </span>
            <div className="flex flex-col justify-end ml-[-2px] md:ml-[-4px] pb-[2px] md:pb-[4px]">
              <div className="block group-hover:hidden">
                <h1 className={`text-2xl md:text-4xl font-sans font-bold tracking-[0.2em] leading-none opacity-90 ${theme === 'flower' ? 'text-brown-500/60' : 'text-red-600 dark:text-yellow-500'}`}>☆</h1>
              </div>
              <div className="hidden group-hover:block ml-4 md:ml-6 mb-1">
                <h1 className={`text-2xl md:text-4xl font-bold tracking-tighter leading-none mb-1 md:mb-2 whitespace-nowrap ${theme === 'flower' ? 'text-pink-600' : 'text-red-600 dark:text-yellow-500'}`}>Teduh Aksara</h1>
                <p className={`text-base font-bold uppercase tracking-[0.3em] leading-[1.4] whitespace-pre-line ${theme === 'flower' ? 'text-brown-500/60' : 'text-emerald-900/60 dark:text-emerald-400/60'}`}>Tapis Ambigu.{"\n"}Rapi Arti.</p>
              </div>
            </div>
          </div>
        </div>
        
        <nav className={`hidden lg:flex gap-2 items-center px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm ${theme === 'flower' ? 'bg-petal-800 border border-pink-500/20' : 'bg-white/50 dark:bg-[#1a110c]/30'}`}>
          <button onClick={onEditorClick} className={navLinkClass} data-help="Kembali ke lembaran editor untuk mulai merawat aksara baru.">Editor</button>
          <div className={`w-[1px] h-4 ${theme === 'flower' ? 'bg-pink-500/20' : 'bg-emerald-100 dark:bg-emerald-900'}`}></div>
          <button onClick={onHistoryClick} className={navLinkClass} data-help="Melihat jejak naskah yang pernah kamu semai di perangkat ini.">Riwayat</button>
          <div className={`w-[1px] h-4 ${theme === 'flower' ? 'bg-pink-500/20' : 'bg-emerald-100 dark:bg-emerald-900'}`}></div>
          <button onClick={onGuideClick} className={navLinkClass} data-help="Pelajari cara terbaik untuk menggunakan fitur-fitur Tara.">Panduan</button>
          <div className={`w-[1px] h-4 ${theme === 'flower' ? 'bg-pink-500/20' : 'bg-emerald-100 dark:bg-emerald-900'}`}></div>
          <button onClick={onDevClick} className={navLinkClass} data-help="Kenali sosok di balik tumbuhnya dahan-dahan Teduh Aksara.">Tentang Kami</button>
        </nav>

        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={onCatalogClick}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${activeModal === 'catalog' ? 'bg-amber-600 text-white' : (theme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-[#2d1e17] text-red-600 dark:text-amber-400')}`}
            data-help="Katalog Dukungan. Lihat merchandise dan cara mendukung pengembangan Teduh Aksara."
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>

          <button 
            onClick={onGalleryClick}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${activeModal === 'gallery' ? 'bg-emerald-700 text-white' : (theme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-[#2d1e17] text-emerald-700 dark:text-emerald-400')}`}
            data-help="Galeri Sahabat. Lihat karya dan kiriman kenangan dari sesama Sahabat Aksara."
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>

          <button 
            onClick={onHelpToggle}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${isHelpActive ? 'premium-shimmer text-white rotate-12' : (theme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-[#2d1e17] text-emerald-700 dark:text-emerald-400')}`}
            data-help="Mode Bantuan. Aktifkan lalu arahkan parahmu ke tombol lain untuk penjelasan."
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>

          <button 
            onClick={cycleTheme}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm hover:scale-110 hover:rotate-12 transition-all flex items-center justify-center ${theme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : (theme === 'dark' ? 'bg-[#2d1e17] text-amber-600 dark:text-emerald-300' : 'bg-white text-red-600')}`}
            title="Ubah Suasana Taman"
            data-help="Ubah suasana taman: Embun Pagi (Cerah), Rimbun Malam (Tenang), atau Kembang Lestari (Floral)."
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
                <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
                <path d="M12 4c1 0 3 2 3 4.5S13.5 12 12 12s-3-1.5-3-4.5S11 4 12 4z"/>
                <path d="M12 20c-1 0-3-2-3-4.5s1.5-3.5 3-3.5 3 1 3 3.5-1 4.5-1 4.5z"/>
                <path d="M4 12c0-1 2-3 4.5-3S12 10.5 12 12s-1.5 3-4.5 3S4 13 4 12z"/>
                <path d="M20 12c0 1-2 3-4.5 3S12 13.5 12 12s1.5-3 4.5-3S20 11 20 12z"/>
              </svg>
            )}
          </button>
        </div>
      </header>
      
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-8 md:gap-12">
        {children}
      </main>

      <nav className={`fixed bottom-4 left-4 right-4 h-24 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/20 flex items-center justify-around px-2 z-[80] lg:hidden ${theme === 'flower' ? 'bg-petal-800 border-pink-500/20' : 'bg-white/90 dark:bg-[#1a110c]/80'}`}>
        <button onClick={onEditorClick} className={`${mobileNavClass} ${activeModal === null ? mobileNavActiveClass : (theme === 'flower' ? 'text-pink-300' : 'text-emerald-800/60 dark:text-emerald-400/50')}`} data-help="Laman Utama Editor.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Aksara</span>
        </button>
        <button onClick={onHistoryClick} className={`${mobileNavClass} ${activeModal === 'history' ? mobileNavActiveClass : (theme === 'flower' ? 'text-pink-300' : 'text-emerald-800/60 dark:text-emerald-400/50')}`} data-help="Jejak Riwayat.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v4l3 3"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Jejak</span>
        </button>
        <button onClick={onGuideClick} className={`${mobileNavClass} ${activeModal === 'guide' ? mobileNavActiveClass : (theme === 'flower' ? 'text-pink-300' : 'text-emerald-800/60 dark:text-emerald-400/50')}`} data-help="Panduan Tara.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/>
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Panduan</span>
        </button>
        <button onClick={onDevClick} className={`${mobileNavClass} ${activeModal === 'dev' ? mobileNavActiveClass : (theme === 'flower' ? 'text-pink-300' : 'text-emerald-800/60 dark:text-emerald-400/50')}`} data-help="Tentang Kami.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Tentang</span>
        </button>
      </nav>

      <footer className={`mt-16 md:mt-28 text-center font-bold text-sm md:text-base pb-10 md:pb-14 pt-10 md:pt-14 w-full max-w-6xl border-t mb-24 lg:mb-0 ${theme === 'flower' ? 'border-pink-500/20 text-petal-800/40' : 'border-emerald-100 dark:border-emerald-900/20 text-[#2d4d3a]/60 dark:text-emerald-500/40'}`}>
        <p className="mb-2">
          &copy;2025 Teduh Aksara • Google AI Studio x Yotam Mann •{" "}
          <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
            This site is powered by Netlify
          </a>{" "}
          {theme === 'flower' ? '🌸🌿' : theme === 'dark' ? '🌟🌿' : '🍃🌿'}
        </p>
        <div className="text-[10px] opacity-10 uppercase tracking-[0.4em] font-medium pointer-events-none select-none mt-4">Platform Penyelarasan Bahasa AI</div>
      </footer>
    </div>
  );
};
