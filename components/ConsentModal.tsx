import React, { useState, useEffect, useRef } from 'react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  recaptchaSiteKey: string;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onAccept,
  onReject,
  recaptchaSiteKey,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const captchaRef  = useRef<HTMLDivElement>(null);
  const modalRef    = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // ─── Deteksi tema ─────────────────────────────────────────────────────────
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

  // ─── Focus & Keyboard Management ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    // Fokus modal agar keyboard scroll & Enter bekerja
    requestAnimationFrame(() => modalRef.current?.focus());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (isVerified || captchaError)) onAccept();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isVerified, captchaError, onAccept]);

  // ─── Load reCAPTCHA Script ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    if (document.getElementById('recaptcha-script')) return;

    const script = document.createElement('script');
    script.id  = 'recaptcha-script';
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onerror = () => setCaptchaError(true);
    document.head.appendChild(script);
  }, [isOpen]);

  // ─── Render reCAPTCHA Widget ───────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !captchaRef.current || captchaError) return;

    const doRender = () => {
      // Jangan render ulang jika sudah ada widget
      if (widgetIdRef.current !== null) {
        try { window.grecaptcha.reset(widgetIdRef.current); } catch { widgetIdRef.current = null; }
        if (widgetIdRef.current !== null) return;
      }

      // Jangan render jika elemen sudah berisi widget
      if (!captchaRef.current || captchaRef.current.childElementCount > 0) return;

      try {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: recaptchaSiteKey,
          callback: handleCaptchaSuccess,
          'expired-callback': handleCaptchaExpired,
          'error-callback': handleCaptchaError,
          theme: theme === 'dark' ? 'dark' : 'light',
        });
      } catch (error) {
        console.error('Failed to render reCAPTCHA:', error);
        setCaptchaError(true);
      }
    };

    // grecaptcha.ready() adalah cara resmi Google
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(doRender);
    } else {
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (window.grecaptcha?.ready) {
          clearInterval(poll);
          window.grecaptcha.ready(doRender);
        }
        if (attempts > 75) {
          clearInterval(poll);
          setCaptchaError(true);
        }
      }, 200);
      return () => clearInterval(poll);
    }
  }, [isOpen, recaptchaSiteKey, theme, captchaError]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleCaptchaSuccess = async (token: string) => {
    setIsVerifying(true);

    // Bypass untuk development localhost
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      console.log('Localhost — bypass reCAPTCHA');
      setIsVerified(true);
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.success) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        if (widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current);
        alert('Verifikasi reCAPTCHA gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setCaptchaError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCaptchaExpired = () => setIsVerified(false);
  const handleCaptchaError   = () => setCaptchaError(true);

  const handleAccept = () => {
    if (isVerified || captchaError) onAccept();
  };

  if (!isOpen) return null;

  // ─── Theme helpers ─────────────────────────────────────────────────────────
  const isFlower = theme === 'flower';
  const isDark   = theme === 'dark';

  const modalBg     = isFlower ? 'bg-petal-800 border-pink-500/20 shadow-pink-500/10' : 'bg-white dark:bg-[#0a1a12] border-emerald-100 dark:border-emerald-800/20';
  const titleColor  = isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-50';
  const subColor    = isFlower ? 'text-pink-400' : 'text-emerald-700 dark:text-emerald-300';
  const sectionText = isFlower ? 'text-pink-100/90' : 'text-emerald-900 dark:text-emerald-100';

  const boxEtika   = isFlower ? 'bg-rose-900/40 border-rose-500/30'   : 'bg-rose-50 dark:bg-rose-900/20 border-rose-500';
  const boxData    = isFlower ? 'bg-pink-900/30 border-pink-500/10'   : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/10';
  const boxPenting = isFlower ? 'bg-amber-900/20 border-amber-500/20' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-500/20';
  const boxHak     = isFlower ? 'bg-blue-900/20 border-blue-500/20'   : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500/20';
  const boxCaptcha = isFlower ? 'bg-purple-900/20 border-purple-500/20' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-500/20';

  const btnAccept = isFlower ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20';
  const btnReject = isFlower ? 'bg-petal-900 text-pink-300 border-pink-500/20 hover:bg-black' : 'bg-white dark:bg-forest-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50';

  const canProceed = isVerified || captchaError;

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`${modalBg} rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border outline-none max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar transition-colors duration-500`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${titleColor} mb-2`}>
            Selamat Datang di Tara! {isFlower ? '🌸' : '🌳'}
          </h2>
          <p className={`text-sm font-medium ${subColor}`}>
            Sebelum mulai menyemai aksara, mohon baca informasi penting ini
          </p>
          <p className={`text-xs italic mt-2 opacity-50 ${sectionText}`}>
            "Gunakan tombol panah pada keyboard untuk membaca seluruh panduan ini dengan tenang."
          </p>
        </div>

        {/* Konten */}
        <div className={`space-y-5 text-sm ${sectionText} mb-8`}>

          {/* Etika */}
          <div className={`${boxEtika} p-5 rounded-3xl border-l-4 shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-rose-300' : 'text-rose-900 dark:text-rose-300'}`}>
              <span>🌸</span> Etika Beraksara (PENTING):
            </h3>
            <p className={`text-xs leading-relaxed ${isFlower ? 'text-pink-100/70' : 'text-rose-800 dark:text-rose-200'}`}>
              Tara adalah taman yang teduh. Mohon gunakan kata-kata yang <strong>sopan dan pantas</strong>.
              Sistem kami mendeteksi penggunaan kata-kata kotor atau tidak senonoh.
              Jika melanggar sebanyak <strong>2 kali</strong>, akses akan <strong>ditutup secara permanen</strong> demi kenyamanan bersama.
            </p>
          </div>

          {/* Data yang dikumpulkan */}
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

          {/* Penting */}
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

          {/* Hak pengguna */}
          <div className={`${boxHak} p-5 rounded-3xl border shadow-sm`}>
            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isFlower ? 'text-blue-300' : 'text-blue-900 dark:text-blue-300'}`}>
              <span>🛡️</span> Hak Anda:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
              <li>Mengakses dan menghapus data Anda kapan saja</li>
              <li>Menarik persetujuan ini dan berhenti menggunakan aplikasi</li>
              <li>Data Anda adalah milik Anda sepenuhnya</li>
            </ul>
          </div>
        </div>

        {/* reCAPTCHA */}
        <div className={`${boxCaptcha} p-6 rounded-3xl border flex flex-col items-center gap-4 mb-6 transition-all`}>
          <h3 className={`font-bold text-center uppercase tracking-widest text-[10px] ${isFlower ? 'text-pink-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
            Konfirmasi Kemanusiaan
          </h3>

          {!captchaError ? (
            <>
              <div ref={captchaRef} className="recaptcha-container min-h-[78px]" />
              {isVerifying && (
                <p className="text-[10px] animate-pulse opacity-60">Memproses verifikasi...</p>
              )}
            </>
          ) : (
            <p className="text-center text-xs italic text-rose-400 py-2">
              Verifikasi teknis mengalami kendala — Anda tetap dapat melanjutkan.
            </p>
          )}

          {isVerified && (
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs animate-in zoom-in duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Terverifikasi Sebagai Manusia
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleAccept}
            disabled={!canProceed}
            className={`w-full py-5 ${btnAccept} text-white rounded-[1.5rem] font-bold transition-all active:scale-95 shadow-lg text-lg disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {!canProceed ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Centang Box di Atas Dahulu
              </>
            ) : (
              'Saya Mengerti dan Setuju'
            )}
          </button>

          <button
            onClick={onReject}
            className={`w-full py-4 ${btnReject} rounded-[1.5rem] font-bold border-2 transition-all active:scale-95 text-sm uppercase tracking-widest`}
          >
            Tidak, Keluar
          </button>
        </div>
      </div>
    </div>
  );
};