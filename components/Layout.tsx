
import React, { useEffect, useState } from 'react';
import { getData, saveData } from '../services/dbService';

interface LayoutProps {
  children: React.ReactNode;
  activeModal: 'history' | 'guide' | null;
  onHistoryClick: () => void;
  onGuideClick: () => void;
  onEditorClick: () => void;
}

const STORE_SETTINGS = 'settings';
const KEY_THEME = 'theme';

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeModal,
  onHistoryClick, 
  onGuideClick,
  onEditorClick
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load theme from IndexedDB on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await getData(STORE_SETTINGS, KEY_THEME);
        if (savedTheme !== undefined) {
          setIsDark(savedTheme === 'dark');
        } else {
          // Default to system preference if no DB entry
          setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (e) {
        console.error("Gagal memuat tema dari IndexedDB", e);
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

  const toggleTheme = () => setIsDark(!isDark);

  const navLinkClass = "px-4 py-2 text-[#2d4d3a] dark:text-emerald-200/60 font-bold hover:text-rose-600 dark:hover:text-emerald-400 transition-all text-base md:text-xl";
  
  const mobileNavClass = "flex flex-col items-center justify-center gap-1 flex-1 py-2 text-emerald-800/60 dark:text-emerald-400/50 transition-all active:scale-95";
  const mobileNavActiveClass = "text-rose-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl";

  if (!isReady) return null; // Prevent flickering during initial theme load

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#050a08] flex flex-col items-center p-4 md:p-8 text-[#1a0f0e] dark:text-emerald-50 transition-colors duration-700 pb-24 lg:pb-8">
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16 animate-fade-in px-2 gap-6">
        <div className="flex items-center group cursor-help scale-75 md:scale-100 origin-left">
          <div className="flex items-end">
            <span className="text-6xl md:text-8xl font-serif text-emerald-800 dark:text-emerald-400 select-none leading-[0.7] inline-block transform transition-all duration-700 group-hover:scale-y-110 origin-bottom group-hover:text-rose-600">
              तार
            </span>
            
            <div className="flex flex-col justify-end ml-[-2px] md:ml-[-4px] pb-[2px] md:pb-[4px]">
              <div className="block group-hover:hidden animate-in fade-in duration-500">
                <h1 className="text-2xl md:text-4xl font-sans font-bold text-emerald-800 dark:text-emerald-200 tracking-[0.2em] leading-none opacity-90">
                  ARA
                </h1>
              </div>

              <div className="hidden group-hover:block animate-in fade-in slide-in-from-left-4 duration-500 ml-4 md:ml-6 mb-1">
                <h1 className="text-2xl md:text-4xl font-bold text-rose-600 dark:text-emerald-400 tracking-tighter leading-none mb-1 md:mb-2 whitespace-nowrap">
                  Teduh Aksara
                </h1>
                <p className="text-base font-bold text-emerald-900/60 dark:text-emerald-500 uppercase tracking-[0.3em] leading-[1.4] whitespace-pre-line">
                  Tapis Ambigu.{"\n"}Rapi Arti.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-2 items-center bg-white/50 dark:bg-[#1a110c]/30 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
          <button onClick={onEditorClick} className={navLinkClass}>Editor</button>
          <div className="w-[1px] h-4 bg-emerald-100 dark:bg-emerald-900"></div>
          <button onClick={onHistoryClick} className={navLinkClass}>Riwayat</button>
          <div className="w-[1px] h-4 bg-emerald-100 dark:bg-emerald-900"></div>
          <button onClick={onGuideClick} className={navLinkClass}>Panduan</button>
        </nav>

        <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-end">
          <button 
            onClick={toggleTheme}
            className="p-3 md:p-4 bg-white dark:bg-[#2d1e17] rounded-xl md:rounded-2xl text-amber-600 dark:text-emerald-300 shadow-sm hover:scale-110 hover:rotate-12 transition-all"
            title={isDark ? "Kembali ke Embun Pagi" : "Masuki Rimbun Malam"}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </header>
      
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-8 md:gap-12 px-0 md:px-4">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 h-24 bg-white/90 dark:bg-[#1a110c]/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)] border border-white/20 flex items-center justify-around px-6 z-[80] lg:hidden animate-in slide-in-from-bottom-10 duration-700">
        <button 
          onClick={onEditorClick}
          className={`${mobileNavClass} ${activeModal === null ? mobileNavActiveClass : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <span className="text-base uppercase tracking-widest font-bold">Aksara</span>
        </button>
        
        <button 
          onClick={onHistoryClick}
          className={`${mobileNavClass} ${activeModal === 'history' ? mobileNavActiveClass : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
          <span className="text-base uppercase tracking-widest font-bold">Jejak</span>
        </button>

        <button 
          onClick={onGuideClick}
          className={`${mobileNavClass} ${activeModal === 'guide' ? mobileNavActiveClass : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/></svg>
          <span className="text-base uppercase tracking-widest font-bold">Panduan</span>
        </button>
      </nav>

      <footer className="mt-16 md:mt-28 text-center text-[#2d4d3a]/60 dark:text-emerald-500/40 font-bold text-base md:text-lg pb-10 md:pb-14 pt-10 md:pt-14 w-full max-w-6xl border-t border-emerald-50 dark:border-emerald-900/20 mb-24 lg:mb-0 relative group/footer">
        <p className="mb-2">&copy; 2024 Teduh Aksara. Dirawat sepenuh hati oleh Tara si Pohon Kersen. 🍒🌿</p>
        
        <div className="text-base opacity-10 dark:opacity-5 group-hover/footer:opacity-40 transition-opacity duration-1000 uppercase tracking-[0.4em] font-medium pointer-events-none select-none mt-4">
          Hak cipta milik mawwyncha
        </div>
      </footer>
    </div>
  );
};
