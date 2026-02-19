
import React from 'react';

export const GardenPromoBox: React.FC<{ isFlower: boolean; isDark: boolean }> = ({ isFlower, isDark }) => {
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden group/promo h-full flex flex-col ${isFlower ? 'bg-petal-800 border-pink-500/20 shadow-xl' : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${isFlower ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/20'}`}>Kabar Taman</h2>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isFlower ? 'bg-pink-500/20 text-pink-300' : 'bg-amber-50/10 text-amber-600 dark:text-amber-400'}`}>Promosi</span>
      </div>
      <div className="relative flex-1 rounded-3xl overflow-hidden mb-4 border border-white/5 min-h-[100px]">
        <img 
          src="https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Story/page1.jpeg" 
          className="w-full h-full object-cover grayscale opacity-60 group-hover/promo:grayscale-0 group-hover/promo:scale-105 group-hover/promo:opacity-100 transition-all duration-700"
          alt="Promo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <a 
        href="mailto:tara-teduhaksara@proton.me?subject=Kabar Taman - Promosi Sahabat"
        className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 mt-auto ${isFlower ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20'}`}
      >
        Hubungi Tara
      </a>
    </div>
  );
};
