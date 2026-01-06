
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
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-center border border-emerald-50 dark:border-emerald-800/10">
        <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-inner ${isMic ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}>
          {isMic ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
          {isMic ? 'Izinkan Tara Mendengar?' : 'Izinkan Tara Menelusuri Web?'}
        </h3>
        
        <p className="text-emerald-900/70 dark:text-emerald-200/50 font-medium mb-10 leading-relaxed italic">
          {isMic 
            ? 'Tara perlu meminjam pendengaranmu untuk mengubah suara menjadi aksara. Rekaman suaramu hanya diproses seketika untuk transkripsi dan tidak akan pernah kami simpan di dahan ingatan permanen kami.'
            : 'Naskahmu akan dibandingkan dengan berbagai dahan teks di web luas untuk memastikan kemurniannya. Kami menjamin privasi naskahmu; pencarian ini hanya untuk verifikasi keaslian tanpa menyimpan naskahmu di tempat lain.'}
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
            Tidak, Lain Kali Saja
          </button>
        </div>
        
        <div className="mt-6 text-[10px] text-emerald-900/20 dark:text-emerald-100/10 uppercase tracking-widest font-bold">
          Keamanan Privasi Sahabat Aksara Diutamakan
        </div>
      </div>
    </div>
  );
};
