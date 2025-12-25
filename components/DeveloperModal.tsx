
import React from 'react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer" onClick={onClose}>
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative overflow-hidden transition-all cursor-default text-center" onClick={(e) => e.stopPropagation()}>
        
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50 dark:from-emerald-950/30 to-transparent pointer-events-none opacity-50"></div>
        
        <div className="relative mt-4">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-4xl">🌱</span>
          </div>
          
          <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">Kami</h2>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs mb-8">Penanam Benih Teduh Aksara</p>
          
          <div className="bg-emerald-50/30 dark:bg-emerald-950/20 p-8 rounded-[2.5rem] border border-emerald-100/50 dark:border-emerald-800/10 mb-8">
            <p className="text-emerald-900/70 dark:text-emerald-200/50 text-lg leading-relaxed italic font-medium">
              "Teduh Aksara lahir dari keinginan kami untuk merawat Bahasa Indonesia agar tetap selaras dengan zaman, namun tetap berakar pada tradisi dan ketenangan."
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-forest-900 rounded-2xl border border-emerald-50 dark:border-emerald-800/20 text-emerald-800 dark:text-emerald-200 shadow-sm">
               <span className="font-bold text-sm uppercase tracking-widest opacity-40">Sosok</span>
               <span className="font-bold ml-auto">Tim Pengembang</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-forest-900 rounded-2xl border border-emerald-50 dark:border-emerald-800/20 text-emerald-800 dark:text-emerald-200 shadow-sm">
               <span className="font-bold text-sm uppercase tracking-widest opacity-40">Misi</span>
               <span className="font-bold ml-auto">Merawat Literasi</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-12 text-emerald-900/20 dark:text-emerald-100/10 hover:text-rose-400 dark:hover:text-emerald-500 font-bold uppercase tracking-[0.4em] text-[10px] transition-colors"
        >
          Kembali Berteduh
        </button>

        {/* Dekorasi Daun */}
        <div className="absolute -bottom-6 -right-6 opacity-5 dark:opacity-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600">
             <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.31,20 22,14 22,10C22,10 21,8 17,8Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
