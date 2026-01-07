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
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hoveredHelp, setHoveredHelp] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await getData(STORE_SETTINGS, KEY_THEME);
        if (savedTheme !== undefined) {
          setIsDark(savedTheme === 'dark');
        } else {
          setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (e) {
        setIsDark(false);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      saveData(STORE_SETTINGS, KEY_THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      saveData(STORE_SETTINGS, KEY_THEME, 'light');
    }
  }, [isDark, isReady]);

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

  const toggleTheme = () => {
    if (isHelpActive) return;
    setIsDark(!isDark);
  };

  const wrapAction = (action: () => void) => () => {
    if (isHelpActive) return;
    action();
  };

  const navLinkClass = "px-4 py-2 text-[#2d4d3a] dark:text-emerald-200/60 font-bold hover:text-rose-600 dark:hover:text-emerald-400 transition-all text-base md:text-xl";
  const mobileNavClass = "flex flex-col items-center justify-center gap-1 flex-1 py-2 text-emerald-800/60 dark:text-emerald-400/50 transition-all active:scale-95";
  const mobileNavActiveClass = "text-rose-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl";

  if (!isReady) return null;

  return (
    <div className={`min-h-screen bg-[#faf9f6] dark:bg-[#050a08] flex flex-col items-center p-4 md:p-8 text-[#1a0f0e] dark:text-emerald-50 transition-colors duration-700 pb-24 lg:pb-8 ${isHelpActive ? 'cursor-help' : ''}`}>
      
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
            <span className="text-6xl md:text-8xl font-serif text-emerald-800 dark:text-emerald-400 select-none leading-[0.7] transform transition-all duration-700 group-hover:scale-y-110 origin-bottom group-hover:text-rose-600">
              तारा
            </span>
            <div className="flex flex-col justify-end ml-[-2px] md:ml-[-4px] pb-[2px] md:pb-[4px]">
              <div className="block group-hover:hidden">
                <h1 className="text-2xl md:text-4xl font-sans font-bold text-emerald-800 dark:text-emerald-200 tracking-[0.2em] leading-none opacity-90">☆</h1>
              </div>
              <div className="hidden group-hover:block ml-4 md:ml-6 mb-1">
                <h1 className="text-2xl md:text-4xl font-bold text-rose-600 dark:text-emerald-400 tracking-tighter leading-none mb-1 md:mb-2 whitespace-nowrap">Teduh Aksara</h1>
                <p className="text-base font-bold text-emerald-900/60 dark:text-emerald-500 uppercase tracking-[0.3em] leading-[1.4] whitespace-pre-line">Tapis Ambigu.{"\n"}Rapi Arti.</p>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex gap-2 items-center bg-white/50 dark:bg-[#1a110c]/30 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          <button onClick={wrapAction(onEditorClick)} className={`${navLinkClass} ${isHelpActive ? 'opacity-50 cursor-help' : ''}`} data-help="Kembali ke lembaran editor untuk mulai merawat aksara baru.">Editor</button>
          <div className="w-[1px] h-4 bg-emerald-100 dark:bg-emerald-900"></div>
          <button onClick={wrapAction(onHistoryClick)} className={`${navLinkClass} ${isHelpActive ? 'opacity-50 cursor-help' : ''}`} data-help="Melihat jejak naskah yang pernah kamu semai di perangkat ini.">Riwayat</button>
          <div className="w-[1px] h-4 bg-emerald-100 dark:bg-emerald-900"></div>
          <button onClick={wrapAction(onGuideClick)} className={`${navLinkClass} ${isHelpActive ? 'opacity-50 cursor-help' : ''}`} data-help="Pelajari cara terbaik untuk menggunakan fitur-fitur Tara.">Panduan</button>
          <div className="w-[1px] h-4 bg-emerald-100 dark:bg-emerald-900"></div>
          <button onClick={wrapAction(onDevClick)} className={`${navLinkClass} ${isHelpActive ? 'opacity-50 cursor-help' : ''}`} data-help="Kenali sosok di balik tumbuhnya dahan-dahan Teduh Aksara.">Tentang Kami</button>
        </nav>

        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-end">
          {/* Tombol Katalog & Donasi - Hidden on Mobile/Tablet */}
          <button 
            onClick={wrapAction(onCatalogClick)}
            className={`hidden md:flex p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 items-center justify-center ${activeModal === 'catalog' ? 'bg-emerald-700 text-white' : 'bg-white dark:bg-[#2d1e17] text-emerald-700 dark:text-emerald-400'} ${isHelpActive ? 'opacity-50 cursor-help scale-100' : ''}`}
            data-help="Katalog & Donasi. Lihat produk eksklusif dan dukung keberlanjutan taman aksara kami."
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>

          {/* Tombol Galeri */}
          <button 
            onClick={wrapAction(onGalleryClick)}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${activeModal === 'gallery' ? 'bg-emerald-700 text-white' : 'bg-white dark:bg-[#2d1e17] text-emerald-700 dark:text-emerald-400'} ${isHelpActive ? 'opacity-50 cursor-help scale-100' : ''}`}
            data-help="Galeri Sahabat. Lihat karya dan kiriman kenangan dari sesama Sahabat Aksara."
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>

          {/* Tombol Tanya (?) - Tetap Aktif */}
          <button 
            onClick={onHelpToggle}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${isHelpActive ? 'premium-shimmer text-white rotate-12 scale-110' : 'bg-white dark:bg-[#2d1e17] text-emerald-700 dark:text-emerald-400'}`}
            data-help={isHelpActive ? "Matikan Mode Bantuan untuk kembali menulis." : "Mode Bantuan. Aktifkan lalu arahkan panahmu ke tombol lain untuk penjelasan."}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>

          <button 
            onClick={toggleTheme}
            className={`p-3 md:p-4 bg-white dark:bg-[#2d1e17] rounded-xl md:rounded-2xl text-amber-600 dark:text-emerald-300 shadow-sm transition-all ${isHelpActive ? 'opacity-50 cursor-help grayscale' : 'hover:scale-110 hover:rotate-12'}`}
            title={isDark ? "Kembali ke Embun Pagi" : "Masuki Rimbun Malam"}
            data-help="Ubah suasana taman. Pilih Embun Pagi yang cerah atau Rimbun Malam yang tenang."
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </header>
      
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-8 md:gap-12">
        {children}
      </main>

      <nav className="fixed bottom-4 left-4 right-4 h-24 bg-white/90 dark:bg-[#1a110c]/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/20 flex items-center justify-around px-2 z-[80] lg:hidden">
        <button onClick={wrapAction(onEditorClick)} className={`${mobileNavClass} ${activeModal === null ? mobileNavActiveClass : ''} ${isHelpActive ? 'opacity-30' : ''}`} data-help="Laman Utama Editor.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Aksara</span>
        </button>
        <button onClick={wrapAction(onHistoryClick)} className={`${mobileNavClass} ${activeModal === 'history' ? mobileNavActiveClass : ''} ${isHelpActive ? 'opacity-30' : ''}`} data-help="Jejak Riwayat.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Jejak</span>
        </button>
        <button onClick={wrapAction(onGuideClick)} className={`${mobileNavClass} ${activeModal === 'guide' ? mobileNavActiveClass : ''} ${isHelpActive ? 'opacity-30' : ''}`} data-help="Panduan Tara.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/></svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Panduan</span>
        </button>
        <button onClick={wrapAction(onDevClick)} className={`${mobileNavClass} ${activeModal === 'dev' ? mobileNavActiveClass : ''} ${isHelpActive ? 'opacity-30' : ''}`} data-help="Tentang Kami.">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="text-[10px] uppercase tracking-widest font-bold">Tentang</span>
        </button>
      </nav>

      <footer className="mt-16 md:mt-28 text-center text-[#2d4d3a]/60 dark:text-emerald-500/40 font-bold text-sm md:text-base pb-10 md:pb-14 pt-10 md:pt-14 w-full max-w-6xl border-t border-emerald-50 dark:border-emerald-900/20 mb-24 lg:mb-0">
        <p className="mb-2">&copy; 2024 Teduh Aksara. Dirawat sepenuh hati oleh Tara si Pohon Kersen. 🍒🌿</p>
        <div className="text-[10px] opacity-10 uppercase tracking-[0.4em] font-medium pointer-events-none select-none mt-4">Platform Penyelarasan Bahasa AI</div>
      </footer>
    </div>
  );
};