import { useState, useEffect, useCallback } from 'react';
import { getData, saveData, STORES } from '../services/dbService';

const MAX_DAILY_REQUESTS = 25;
const KEY_USAGE_COUNT = 'daily_usage_count';
const KEY_USAGE_DATE = 'daily_usage_date';

/**
 * useSecurityValidation Hook
 * Mengelola kuota harian 25 permintaan dan verifikasi keamanan reCAPTCHA.
 * Menggunakan status 'isVerifiedSession' agar user hanya perlu captcha sekali per sesi.
 */
export const useSecurityValidation = (recaptchaWidgetId: number | null) => {
  const [usageCount, setUsageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isVerifiedSession, setIsVerifiedSession] = useState(false);

  // Muat Kuota Harian saat inisialisasi
  useEffect(() => {
    const loadQuota = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const savedUsageDate = await getData(STORES.SETTINGS, KEY_USAGE_DATE);
        const savedUsageCount = await getData(STORES.SETTINGS, KEY_USAGE_COUNT);

        if (savedUsageDate !== today) {
          // Reset kuota jika hari berganti
          setUsageCount(0);
          setIsLimitReached(false);
          await saveData(STORES.SETTINGS, KEY_USAGE_DATE, today);
          await saveData(STORES.SETTINGS, KEY_USAGE_COUNT, 0);
        } else {
          const count = savedUsageCount || 0;
          setUsageCount(count);
          setIsLimitReached(count >= MAX_DAILY_REQUESTS);
        }
      } catch (err) {
        console.warn("Gagal memuat data kuota:", err);
      }
    };
    loadQuota();
  }, []);

  // Menambah jumlah penggunaan secara lokal dan di DB
  const incrementUsage = useCallback(async () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    setIsLimitReached(newCount >= MAX_DAILY_REQUESTS);
    await saveData(STORES.SETTINGS, KEY_USAGE_COUNT, newCount);
    return newCount;
  }, [usageCount]);

  /**
   * Fungsi utama untuk memvalidasi setiap permintaan submit.
   * @returns boolean - true jika diizinkan, false jika ditolak (kuota habis/captcha gagal)
   */
  const validateRequest = useCallback(async (): Promise<boolean> => {
    // 1. Cek Kuota Harian
    if (usageCount >= MAX_DAILY_REQUESTS) {
      return false;
    }

    // 2. Bypass untuk Pengembangan Lokal
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      await incrementUsage();
      return true;
    }

    // 3. JIKA sudah terverifikasi di sesi ini, langsung lolos (Bypass reCAPTCHA)
    if (isVerifiedSession) {
      await incrementUsage();
      return true;
    }

    // 4. Eksekusi reCAPTCHA (Hanya untuk verifikasi pertama kali)
    if (window.grecaptcha && recaptchaWidgetId !== null) {
      return new Promise((resolve) => {
        // Callback global yang dipicu oleh grecaptcha.execute
        window.onSubmitCaptcha = async (token: string) => {
          if (!token) {
            resolve(false);
            return;
          }

          try {
            const response = await fetch('/.netlify/functions/verify-recaptcha', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token })
            });
            const data = await response.json();
            
            if (data.success) {
              // Tandai sesi sebagai terverifikasi manusia
              setIsVerifiedSession(true);
              await incrementUsage();
              resolve(true);
            } else {
              // Jika gagal (token expired/bot), reset widget
              window.grecaptcha.reset(recaptchaWidgetId);
              resolve(false);
            }
          } catch (error) {
            console.error("Kesalahan verifikasi reCAPTCHA:", error);
            window.grecaptcha.reset(recaptchaWidgetId);
            resolve(false);
          }
        };

        try {
          // Reset sebelum eksekusi untuk memastikan status widget 'fresh'
          window.grecaptcha.reset(recaptchaWidgetId);
          window.grecaptcha.execute(recaptchaWidgetId);
        } catch (e) {
          console.warn("Eksekusi reCAPTCHA macet, mencoba fallback...", e);
          // Fallback jika API Google tidak merespon tapi user masih punya kuota
          incrementUsage().then(() => resolve(true));
        }
      });
    }

    // 5. Fallback jika reCAPTCHA belum siap tetapi kuota masih ada
    await incrementUsage();
    return true;
  }, [usageCount, recaptchaWidgetId, incrementUsage, isVerifiedSession]);

  return {
    usageCount,
    isLimitReached,
    validateRequest,
    MAX_DAILY_REQUESTS,
    isVerified: isVerifiedSession
  };
};