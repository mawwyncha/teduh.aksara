
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = mode === 'signup' ? name : email.split('@')[0];
    onSuccess(finalName || 'Sahabat Alam');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 max-h-[85vh] overflow-y-auto no-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-emerald-300 dark:text-emerald-700 hover:text-emerald-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex justify-center mb-6 sm:mb-8 mt-4 sm:mt-0">
          <div className="inline-flex p-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl">
            <button 
              onClick={() => setMode('login')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all ${mode === 'login' ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm' : 'text-emerald-400 dark:text-emerald-600'}`}
            >
              Masuk
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all ${mode === 'signup' ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm' : 'text-emerald-400 dark:text-emerald-600'}`}
            >
              Daftar
            </button>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 dark:text-emerald-50 mb-2 sm:mb-3">
            {mode === 'login' ? 'Selamat Datang' : 'Mari Bergabung'}
          </h2>
          <p className="text-sm sm:text-base text-emerald-600/60 dark:text-emerald-400/40 font-medium italic">
            {mode === 'login' ? 'Mari lanjut memupuk tulisanmu.' : 'Mulai perjalanan menulis yang menenangkan.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {mode === 'signup' && (
            <div className="group">
              <label className="block text-[10px] font-bold text-emerald-700/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] mb-1.5 ml-4">Nama Panggilan</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Siapa namamu?"
                className="w-full px-6 py-3.5 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl outline-none transition-all text-base sm:text-lg text-emerald-900 dark:text-emerald-50 placeholder-emerald-200 dark:placeholder-emerald-800 shadow-inner"
              />
            </div>
          )}
          <div className="group">
            <label className="block text-[10px] font-bold text-emerald-700/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] mb-1.5 ml-4">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-6 py-3.5 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl outline-none transition-all text-base sm:text-lg text-emerald-900 dark:text-emerald-50 placeholder-emerald-200 dark:placeholder-emerald-800 shadow-inner"
            />
          </div>
          <div className="group">
            <label className="block text-[10px] font-bold text-emerald-700/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] mb-1.5 ml-4">Kata Sandi</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-3.5 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl outline-none transition-all text-base sm:text-lg text-emerald-900 dark:text-emerald-50 placeholder-emerald-200 dark:placeholder-emerald-800 shadow-inner"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 sm:py-5 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.98] mt-4"
          >
            {mode === 'login' ? 'Mulai Menulis' : 'Buat Akun Sahabat'}
          </button>
        </form>
      </div>
    </div>
  );
};
