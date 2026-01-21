
import React, { useState, useEffect } from 'react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAccept, onReject }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('flower')) setTheme('flower');
      else if (document.documentElement.classList.contains('dark')) setTheme('dark');
      else setTheme('light');
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  if (!isOpen) return null;

  const isFlower = theme === 'flower';
  
  // Dynamic Styles
  const modalBg = isFlower ? 'bg-petal-800 border-pink-500/20 shadow-pink-500/10' : 'bg-white dark:bg-[#0a1a12] border-emerald-100 dark:border-emerald-800/20';
  const titleColor = isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-50';
  const subtitleColor = isFlower ? 'text-pink-400' : 'text-emerald-700 dark:text-emerald-300';
  const sectionText = isFlower ? 'text-pink-100/90' : 'text-emerald-900 dark:text-emerald-100';
  
  const boxEtika = isFlower ? 'bg-rose-900/40 border-rose-500/30' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-500';
  const boxData = isFlower ? 'bg-pink-900/30 border-pink-500/10' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/10';
  const boxPenting = isFlower ? 'bg-amber-900/20 border-amber-500/20' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-500/20';
  const boxHak = isFlower ? 'bg-blue-900/20 border-blue-500/20' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500/20';

  const btnAccept = isFlower ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20';
  const btnReject = isFlower ? 'bg-petal-900 text-pink-300 border-pink-500/20 hover:bg-black' : 'bg-white dark:bg-forest-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`${modalBg} rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border max-h-[85vh] overflow-y-auto no-scrollbar transition-colors duration-500`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${titleColor} mb-2`}>
            Selamat Datang di Tara! {isFlower ? '🌸' : '🌳'}
          </h2>
          <p className={`text-sm font-medium ${subtitleColor}`}>
            Sebelum mulai menyemai aksara, mohon baca informasi penting ini
          </p>
        </div>

        <div className={`space-y-5 text-sm ${sectionText} mb-10`}>
          <div className={`${boxEtika} p-5 rounded-3xl border-l-4 shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-rose-300' : 'text-rose-900 dark:text-rose-300'}`}>
              <span>🌸</span> Etika Beraksara (PENTING):
            </h3>
            <p className={`text-xs leading-relaxed font-medium ${isFlower ? 'text-pink-100/70' : 'text-rose-800 dark:text-rose-200'}`}>
              Tara adalah taman yang teduh. Mohon gunakan kata-kata yang <strong>sopan dan pantas</strong>. 
              Sistem kami akan mendeteksi penggunaan kata-kata kotor atau tidak senonoh. 
              Jika melanggar sebanyak <strong>2 kali</strong>, akses Anda ke seluruh fitur akan <strong>ditutup secara permanen</strong> demi menjaga kenyamanan bersama.
            </p>
          </div>

          <div className={`${boxData} p-5 rounded-3xl border shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-pink-300' : 'text-emerald-900 dark:text-emerald-100'}`}>
              <span>📋</span> Data yang Kami Kumpulkan:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
              <li>Teks yang Anda input untuk dianalisis</li>
              <li>Rekaman suara (hanya saat menggunakan fitur mikrofon)</li>
              <li>Riwayat analisis dan preferensi (disimpan lokal di perangkat Anda)</li>
            </ul>
          </div>

          <div className={`${boxPenting} p-5 rounded-3xl border shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-amber-300' : 'text-amber-900 dark:text-amber-300'}`}>
              <span>⚠️</span> Penting untuk Diketahui:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
              <li>Data Anda dikirim ke <strong>Google Gemini API</strong> untuk pemrosesan AI</li>
              <li>Riwayat disimpan <strong>lokal di perangkat Anda</strong>, bukan di server kami</li>
              <li>Rekaman audio langsung dihapus setelah ditranskripsi</li>
            </ul>
          </div>

          <div className={`${boxHak} p-5 rounded-3xl border shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-blue-300' : 'text-blue-900 dark:text-blue-300'}`}>
              <span>✅</span> Hak Anda:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
              <li>Mengakses dan menghapus data Anda kapan saja</li>
              <li>Menarik persetujuan ini dan berhenti menggunakan aplikasi</li>
              <li>Data Anda adalah milik Anda sepenuhnya</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onAccept}
            className={`w-full py-5 ${btnAccept} text-white rounded-[1.5rem] font-bold transition-all active:scale-95 shadow-lg text-lg`}
          >
            Saya Mengerti dan Setuju
          </button>
          <button
            onClick={onReject}
            className={`w-full py-4 ${btnReject} rounded-[1.5rem] font-bold border-2 transition-all active:scale-95 text-sm uppercase tracking-widest`}
          >
            Tidak, Bawa Saya Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
