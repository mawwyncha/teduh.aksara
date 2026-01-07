
import React from 'react';

interface LimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LimitModal: React.FC<LimitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
        <div className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl">🍒</span>
        </div>
        
        <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4 leading-tight">
          Maafkan Tara, Sahabat Aksara...
        </h2>
        
        <p className="text-emerald-900/60 dark:text-emerald-200/40 font-medium mb-10 leading-relaxed italic">
          "Dahan bahasaku butuh waktu untuk tumbuh kembali. Kamu telah mencapai batas harian 25 permintaan hari ini."
        </p>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2rem] mb-10 border border-emerald-100 dark:border-emerald-800/10 text-emerald-800 dark:text-emerald-200 text-sm font-bold">
          Silakan kembali besok pagi saat embun pertama turun untuk merawat aksaramu kembali.
        </div>
        
        <button 
          onClick={onClose}
          className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all active:scale-95 shadow-lg"
        >
          Mengerti, Sampai Jumpa Besok
        </button>
      </div>
    </div>
  );
};
