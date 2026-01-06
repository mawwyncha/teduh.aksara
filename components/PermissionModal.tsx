
import React from 'react';

interface PermissionModalProps {
  type: 'mic' | 'plagiarism';
  onAccept: () => void;
  onDeny: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({ type, onAccept, onDeny }) => {
  const isMic = type === 'mic';
  
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isMic ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
          {isMic ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
          {isMic ? 'Gunakan Mikrofon?' : 'Periksa Kemiripan Web?'}
        </h3>
        
        <p className="text-emerald-900/60 dark:text-emerald-200/40 font-medium mb-8 leading-relaxed">
          {isMic 
            ? 'Tara perlu mendengar suaramu untuk menyalinnya menjadi aksara. Data suara akan dikirim secara aman untuk transkripsi dan tidak akan disimpan permanen oleh sistem kami.'
            : 'Naskahmu akan dibandingkan dengan dahan-dahan naskah publik di web untuk memastikan keasliannya. Kami sangat menghargai privasi dan kerahasiaan naskahmu.'}
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onAccept}
            className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all active:scale-95 shadow-lg"
          >
            Ya, Saya Setuju
          </button>
          <button 
            onClick={onDeny}
            className="w-full py-4 text-emerald-800/40 dark:text-emerald-200/20 font-bold hover:text-rose-600 transition-colors"
          >
            Lain Kali Saja
          </button>
        </div>
      </div>
    </div>
  );
};
