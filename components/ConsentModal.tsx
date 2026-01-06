import React from 'react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-forest-900 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border border-emerald-100 dark:border-emerald-800/20 max-h-[85vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50 mb-2">
            Selamat Datang di Tara! 🌳
          </h2>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Sebelum mulai, mohon baca informasi penting ini
          </p>
        </div>

        <div className="space-y-4 text-sm text-emerald-900 dark:text-emerald-100 mb-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl">
            <h3 className="font-bold mb-2">📋 Data yang Kami Kumpulkan:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Teks yang Anda input untuk dianalisis</li>
              <li>Rekaman suara (hanya saat menggunakan fitur mikrofon)</li>
              <li>Riwayat analisis dan preferensi (disimpan lokal di perangkat Anda)</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl">
            <h3 className="font-bold mb-2 text-amber-900 dark:text-amber-300">⚠️ Penting untuk Diketahui:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-800 dark:text-amber-200">
              <li>Data Anda dikirim ke <strong>Google Gemini API</strong> untuk pemrosesan AI</li>
              <li>Riwayat disimpan <strong>lokal di perangkat Anda</strong>, bukan di server kami</li>
              <li>Rekaman audio langsung dihapus setelah ditranskripsi</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
            <h3 className="font-bold mb-2 text-blue-900 dark:text-blue-300">✅ Hak Anda:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-blue-800 dark:text-blue-200">
              <li>Mengakses dan menghapus data Anda kapan saja</li>
              <li>Menarik persetujuan ini dan berhenti menggunakan aplikasi</li>
              <li>Mengajukan keluhan ke Lembaga Pelindung Data Pribadi Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onAccept}
            className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all active:scale-95"
          >
            Saya Mengerti dan Setuju
          </button>
          <button
            onClick={onReject}
            className="w-full py-4 bg-white dark:bg-forest-950 text-emerald-700 dark:text-emerald-400 rounded-2xl font-bold border-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 transition-all active:scale-95"
          >
            Tidak, Bawa Saya Keluar
          </button>
          <a
            href="/PRIVACY_POLICY.md"
            target="_blank"
            className="text-center text-xs text-emerald-600 dark:text-emerald-400 underline"
          >
            Baca Kebijakan Privasi Lengkap →
          </a>
        </div>
      </div>
    </div>
  );
};