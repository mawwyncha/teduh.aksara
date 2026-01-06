import React from 'react';

interface LimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LimitModal: React.FC<LimitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-emerald-950/50 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center border border-emerald-50 dark:border-emerald-800/20">
        <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
          Dahan Tara Perlu Beristirahat
        </h3>

        <p className="text-emerald-900/70 dark:text-emerald-400/60 leading-relaxed italic mb-8">
          Mohon maaf, Sahabat Aksara. Kamu telah mencapai batas maksimal <strong>25 permintaan</strong> untuk hari ini. Tara butuh waktu untuk memulihkan dahan bahasanya agar tetap rindang.
        </p>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-2xl mb-8 border border-emerald-100/50">
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
            Fitur AI akan aktif kembali secara otomatis esok hari.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all active:scale-95 shadow-lg shadow-emerald-700/20"
        >
          Mengerti, Sampai Jumpa Esok
        </button>

        <p className="mt-6 text-[10px] text-emerald-900/30 dark:text-emerald-100/10 uppercase tracking-widest font-bold">
          Kesabaranmu adalah embun bagi dahan ini
        </p>
      </div>
    </div>
  );
};