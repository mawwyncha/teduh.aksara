
import React from 'react';

export const BannedView: React.FC = () => (
  <div className="fixed inset-0 z-[999] bg-red-950 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
     <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(220,38,38,0.4)] animate-pulse">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" cy="9" x2="9" y2="15"/><line x1="9" cy="9" x2="15" y2="15"/></svg>
     </div>
     <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-widest leading-tight font-sans">Akses Ditutup Permanen</h1>
     <p className="text-red-100/60 max-w-lg text-lg leading-relaxed italic mb-10">
        "Kesantunan adalah akar dari dahan bahasa yang indah. Karena telah melanggar Etika Beraksara di taman Teduh Aksara sebanyak 2 kali, dahan komunikasimu di sini telah kami tutup selamanya."
     </p>
     <div className="bg-red-900/30 border border-red-500/20 p-6 rounded-3xl text-red-300 text-sm font-bold uppercase tracking-widest font-sans">
        Pelanggaran Etika Terdeteksi Sistem Otomatis
     </div>
  </div>
);
