
import React from 'react';

interface ActionSidebarProps {
  isBusy: boolean;
  isDyslexiaMode: boolean;
  toggleDyslexia: () => void;
  openMicPermission: () => void;
  handleSpeech: () => void;
  openPronunciation: () => void;
  currentTheme: string;
}

export const ActionSidebar: React.FC<ActionSidebarProps> = ({ 
  isBusy, isDyslexiaMode, toggleDyslexia, openMicPermission, handleSpeech, openPronunciation, currentTheme 
}) => {
  const isFlower = currentTheme === 'flower';
  
  const btnBase = "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all shadow-lg";
  const btnHover = "hover:scale-110 active:scale-90 disabled:opacity-30";
  const themeBg = isFlower ? "bg-petal-800 text-pink-400 border border-pink-500/20" : "bg-white dark:bg-emerald-950";

  return (
    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
      <button 
        disabled={isBusy} 
        onClick={toggleDyslexia} 
        className={`${btnBase} ${btnHover} ${isDyslexiaMode ? 'bg-red-700 text-white scale-110' : themeBg + ' text-red-700'}`} 
        data-help="Mode Disleksia"
      >
        <span className="font-bold text-xl">D</span>
      </button>

      <button 
        disabled={isBusy} 
        onClick={openMicPermission} 
        className={`${btnBase} ${btnHover} ${themeBg} text-red-600`} 
        data-help="Rekam Suara"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" cy="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </button>

      <button 
        disabled={isBusy} 
        onClick={handleSpeech} 
        className={`${btnBase} ${btnHover} ${themeBg} text-emerald-600`} 
        data-help="Dengar Naskah"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      </button>

      <button 
        disabled={isBusy} 
        onClick={openPronunciation} 
        className={`${btnBase} ${btnHover} ${themeBg} text-amber-600`} 
        data-help="Latih Tutur"
      >
        <span className="text-xl">🗣️</span>
      </button>
    </div>
  );
};
