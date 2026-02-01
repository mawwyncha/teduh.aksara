
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { DeveloperModal } from './components/DeveloperModal';
import { FanGalleryModal } from './components/FanGalleryModal';
import { CatalogModal } from './components/CatalogModal';
import { PermissionModal } from './components/PermissionModal';
import { LimitModal } from './components/LimitModal';
import { ConsentModal } from './components/ConsentModal';
import { PronunciationModal } from './components/PronunciationModal';
import { analyzeGrammar, generateSpeech, askTaraAboutPlatform, transcribeAudio, preloadWebSpeechVoices } from './services/geminiService';
import { saveData, getData } from './services/dbService';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext, TargetLanguage } from './types';
import { NusantaraMapSection } from './components/nusantara/NusantaraMapSection';

declare global {
  interface Window {
    grecaptcha: any;
    onSubmitCaptcha: (token: string) => void;
  }
}

const STORE_DRAFT = 'draft';
const STORE_HISTORY = 'history';
const STORE_SETTINGS = 'settings';

const KEY_CURRENT_DRAFT = 'current_draft';
const KEY_HISTORY_LIST = 'history_list';
const KEY_PREF_STYLE = 'pref_style';
const KEY_PREF_CONTEXT = 'pref_context';
const KEY_VIOLATION_COUNT = 'violation_count';
const KEY_PREF_LANG = 'pref_lang';
const KEY_DYSLEXIA = 'dyslexia_mode';
const KEY_USAGE_COUNT = 'daily_usage_count';
const KEY_USAGE_DATE = 'daily_usage_date';

const MAX_DAILY_REQUESTS = 25;
const MAX_VIOLATIONS = 2;
const MAX_CHARACTERS = 1000;

const RECAPTCHA_SITE_KEY = "6LdTFlUsAAAAALH-MlZGFD7tFEo_1x1FJBWIYNAK";

const DONORS = [
  { name: "Sahabat Budi", amount: 250000, date: "15 Jan 2026" },
  { name: "Rina Aksara", amount: 750000, date: "18 Jan 2026" },
  { name: "Wira Teduh", amount: 150000, date: "20 Jan 2026" },
  { name: "Laras Hati", amount: 300000, date: "22 Jan 2026" },
  { name: "Dewangga", amount: 500000, date: "24 Jan 2026" }
];

const FORBIDDEN_PATTERN = /(anjing|babi|bangsat|kontol|memek|jembut|ngentot|peler|asu|bajingan|tempik|tolol|goblok|idiot|perek|lonte|pantek|jablay|pecun|ngewe|itil|ngocok|brengsek|setan|iblis|pelacur|bencong|homo|lesbi|bejat|keparat|biadab|titit|vagina|penis|porn|bokep|lendir|sange|coly|coli|script|javascript:|eval\(|union\s+select|drop\s+table|insert\s+into|delete\s+from|--|<[^>]*>|onerror|onload)/gi;

const CALMING_MESSAGES = [
  "Tarik napas sejenak, biarkan Tara merapikan dahan bahasamu...",
  "Sabar ya, aksara terbaik butuh waktu untuk tumbuh sempurna...",
  "Tara sedang menyisir setiap kata dengan penuh kasih sayang...",
  "Menanti sejenak selagi embun aksara membasahi naskahmu...",
  "Nikmati ketenangan ini, Tara tidak akan membiarkan diksimu layu...",
  "Memilah diksi, merajut arti, semua demi naskah yang terpuji...",
  "Seperti kersen yang matang perlahan, naskahmu pun butuh ketelatenan...",
  "Menenangkan pikiran, menjernihkan tulisan...",
  "Tara sedang berbisik pada dahan-dahanan web untukmu..."
];

const TARA_FUN_FACTS = [
  "Tahukah kamu? Kata 'Matahari' berasal dari gabungan 'Mata' dan 'Hari'.",
  "Fakta Unik: Bahasa Indonesia adalah bahasa ke-9 yang paling banyak digunakan di dunia!",
  "Tahukah kamu? Huruf yang paling sering muncul dalam Bahasa Indonesia adalah huruf 'A'.",
  "Jokes: Kenapa titik itu kecil? Karena kalau besar namanya bintik-bintik.",
  "Fakta: Kata 'Pelangi' berasal dari bahasa Melayu kuno 'Pelang' yang berarti warna.",
  "Tahukah kamu? 'Satu' adalah satu-satunya angka yang tidak punya huruf 'E' di dalamnya.",
  "Jokes: Singkatan 'DLL' itu bukan 'Dan Lain-Lain', tapi 'Diseduh Lalu Lahap'... eh, itu mie instan.",
  "Fakta: KBBI saat ini memiliki lebih dari 110.000 kosakata dan terus tumbuh!",
  "Tahukah kamu? Kata 'Baku' awalnya berarti 'pokok' atau 'utama'.",
  "Jokes: Kenapa kamus itu tebal? Karena kalau tipis namanya kartu nama.",
  "Fakta: Bahasa Indonesia diresmikan pada Sumpah Pemuda 28 Oktober 1928.",
  "Jokes: Kenapa buku pelajaran sejarah membosankan? Karena dia membicarakan masa lalu yang sulit dilupakan.",
  "Fakta: Kata 'Sia-sia' berasal dari bahasa Sanskerta 'sesa' yang berarti sisa.",
  "Fakta: Huruf 'Q' dan 'X' adalah huruf yang paling jarang digunakan dalam bahasa Indonesia."
];

const STYLE_OPTIONS = [
  { value: 'formal', label: 'Baku' },
  { value: 'casual', label: 'Luwes' },
  { value: 'academic', label: 'Ilmiah' },
  { value: 'creative', label: 'Kreatif' }
];

const CONTEXT_OPTIONS = [
  { value: 'business', label: 'Bisnis' },
  { value: 'education', label: 'Edukasi' },
  { value: 'social_media', label: 'Sosmed' },
  { value: 'general', label: 'Umum' }
];

const LANG_OPTIONS = [
  { value: 'en_us', label: 'Inggris (AS) 🇺🇸' },
  { value: 'en_uk', label: 'Inggris (Britania) 🇬🇧' },
  { value: 'en_au', label: 'Inggris (Australia) 🇦🇺' },
  { value: "jv_central", label: 'Jawa Tengah (Solo) 🇮🇩' },
  { value: 'jv_yogyakarta', label: 'Jawa Yogyakarta 🇮🇩' },
  { value: 'jv_central_coastal', label: 'Jawa (Semarang/Demak) 🇮🇩' },
  { value: 'jv_east', label: 'Jawa Timur 🇮🇩' },
  { value: 'su', label: 'Sunda 🇮🇩' },
  { value: 'min', label: 'Minangkabau 🇮🇩' },
  { value: 'ban', label: 'Bali 🇮🇩' },
  { value: 'bug', label: 'Bugis 🇮🇩' },
  { value: 'mad', label: 'Madura 🇮🇩' },
  { value: 'ace', label: 'Aceh 🇮🇩' },
  { value: 'bjn', label: 'Banjar 🇮🇩' },
  { value: 'mk', label: 'Makassar 🇮🇩' },
  { value: 'bt_toba', label: 'Batak Toba 🇮🇩' },
  { value: 'bt_karo', label: 'Batak Karo 🇮🇩' },
  { value: 'zh_hokkien_medan', label: 'Hokkien Medan 🇮🇩' },
  { value: 'zh_hokkien_jakarta', label: 'Hokkien Jakarta 🇮🇩' },
  { value: 'zh_hakka_singkawang', label: 'Hakka Singkawang 🇮🇩' },
  { value: 'zh_hakka_bangka', label: 'Hakka Bangka 🇮🇩' },
  { value: 'zh_teochew_pontianak', label: 'Teochew Pontianak 🇮🇩' },
  { value: 'zh_cantonese_id', label: 'Kanton (Konghu) 🇮🇩' },
  { value: 'lp', label: 'Lampung 🇮🇩' },
  { value: 'sas', label: 'Sasak (Lombok) 🇮🇩' },
  { value: 'pap', label: 'Papua (Melayu) 🇮🇩' },
  { value: 'amb', label: 'Ambon (Melayu) 🇮🇩' },
  { value: 'go', label: 'Gorontalo 🇮🇩' },
  { value: 'ni', label: 'Nias 🇮🇩' },
  { value: 'tet', label: 'Tetum (Timor Leste) 🇹🇱' },
  { value: 'pt_tl', label: 'Portugis (Timor Leste) 🇹🇱' }
];

const TreeHugger: React.FC = () => {
  const maxDonation = Math.max(...DONORS.map(d => d.amount));
  const [particles, setParticles] = useState<any[]>([]);
  const [isFlower, setIsFlower] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsFlower(document.documentElement.classList.contains('flower'));
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const handleDonorClick = (isTop: boolean) => {
    const type = isFlower ? (isTop ? 'flower' : 'leaf') : (isTop ? 'cherry' : 'leaf');
    const count = isTop ? 20 : 12;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      type,
      left: Math.random() * 100,
      duration: (1 + Math.random() * 1.5) + 's',
      drift: (Math.random() * 120 - 60) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 3000);
  };
  
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden h-full flex flex-col ${isFlower ? 'bg-petal-800 border-pink-500/20 shadow-xl' : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10 shadow-sm'}`}>
      <div className="absolute inset-0 pointer-events-none z-50">
        {particles.map(p => (
          <div 
            key={p.id}
            className="animate-particle"
            style={{ 
              left: `${p.left}%`, 
              top: '-20px',
              '--duration': p.duration,
              '--drift': p.drift 
            } as React.CSSProperties}
          >
             {p.type === 'cherry' ? (
                <div className="flex flex-col items-center">
                    <div className={`w-0.5 h-2 rounded-full mb-[-1px] ${isDark ? 'bg-amber-800' : 'bg-green-800'}`} />
                    <div className={`w-3 h-3 rounded-full shadow-md transition-all ${isDark ? 'bg-[#fbbf24] shadow-amber-500/80 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-red-600 shadow-rose-500/20'}`} />
                </div>
             ) : p.type === 'flower' ? (
                <div className="w-3.5 h-3.5 bg-pink-300 rounded-full shadow-md border border-pink-100" />
             ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill={isFlower ? "#f472b6" : "#10b981"} style={{ transform: `rotate(${p.rotation})` }}>
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.31,20 22,14 22,10C22,10 21,8 17,8Z" />
                </svg>
             )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${isFlower ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/20'}`}>Tree Hugger</h2>
        <span className={`text-[9px] font-bold uppercase tracking-widest font-sans ${isFlower ? 'text-pink-500' : 'text-rose-500/40 dark:text-amber-500/40'}`}>Apresiasi</span>
      </div>
      
      <div className="space-y-4 flex-1">
        {DONORS.sort((a, b) => b.amount - a.amount).slice(0, 4).map((donor, idx) => {
          const isTop = donor.amount === maxDonation;
          const topClass = isFlower ? 'bg-pink-900/40 border border-pink-500/40 shadow-md' : (isDark ? 'bg-amber-900/5 border border-amber-400/20 shadow-lg shadow-amber-500/5' : 'bg-emerald-50/50 border border-emerald-200');
          
          return (
            <div 
              key={idx} 
              onClick={() => handleDonorClick(isTop)}
              className={`flex items-center justify-between group cursor-pointer p-2 rounded-2xl transition-all duration-500 ${isTop ? topClass : 'hover:bg-black/20 border border-transparent'}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs bg-transparent">
                  {isTop ? (isDark ? "🌟" : "⭐") : isFlower ? "🌸" : "🌿"}
                </div>
                <div className="truncate max-w-[80px] sm:max-w-none">
                  <p className={`text-[11px] font-bold truncate transition-colors font-sans ${isTop ? (isFlower ? 'text-pink-300' : (isDark ? 'text-amber-200' : 'text-red-700')) : (isFlower ? 'text-pink-100/60' : 'text-emerald-950 dark:text-emerald-50')}`}>
                    {donor.name}
                  </p>
                </div>
              </div>
              <p className={`text-[11px] font-bold transition-colors font-sans whitespace-nowrap ${isTop ? (isFlower ? 'text-pink-300' : (isDark ? 'text-amber-400' : 'text-red-700')) : (isFlower ? 'text-pink-100/60' : 'text-emerald-800 dark:text-emerald-400')}`}>
                Rp{donor.amount / 1000}rb
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GardenPromoBox: React.FC<{ isFlower: boolean; isDark: boolean }> = ({ isFlower, isDark }) => {
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden group/promo h-full flex flex-col ${isFlower ? 'bg-petal-800 border-pink-500/20 shadow-xl' : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10 shadow-sm'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${isFlower ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/20'}`}>Kabar Taman</h2>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isFlower ? 'bg-pink-500/20 text-pink-300' : 'bg-amber-50/10 text-amber-600 dark:text-amber-400'}`}>Promosi</span>
      </div>
      
      <div className="relative flex-1 rounded-3xl overflow-hidden mb-4 border border-white/5 min-h-[100px]">
        <img 
          src="https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Story/page1.jpeg" 
          alt="Teduh Aksara Promo"
          className="w-full h-full object-cover grayscale opacity-60 group-hover/promo:grayscale-0 group-hover/promo:scale-105 group-hover/promo:opacity-100 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-2 left-3">
           <p className="text-white text-[9px] font-bold uppercase tracking-widest">Aksara Bersemi</p>
        </div>
      </div>

      <a 
        href="mailto:tara-teduhaksara@proton.me?subject=Kabar Taman - Promosi Sahabat"
        className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 mt-auto ${isFlower ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20'}`}
      >
        Hubungi Tara
      </a>
    </div>
  );
};

const BannedView: React.FC = () => (
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

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [honeypot, setHoneypot] = useState(''); 
  const [isViolationDetected, setIsViolationDetected] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en_us');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usageCount, setUsageCount] = useState(0);
  const [violationCount, setViolationCount] = useState(0); 
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [hasAcceptedConsent, setHasAcceptedConsent] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'flower'>('light');
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [funFactMsg, setFunFactMsg] = useState("");
  
  const [permissionType, setPermissionType] = useState<'mic' | 'plagiarism' | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isFanGalleryModalOpen, setIsFanGalleryModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isPronunciationModalOpen, setIsPronunciationModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);
  const isCanceledRef = useRef(false);
  const prevViolationRef = useRef(false);
  const pendingPlagiarismRef = useRef(false);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isBanned = violationCount >= MAX_VIOLATIONS;

  const currentLangLabel = LANG_OPTIONS.find(opt => opt.value === targetLang)?.label || targetLang;

  useEffect(() => {
    if (isDyslexiaMode) {
      document.documentElement.classList.add('dyslexia-mode');
    } else {
      document.documentElement.classList.remove('dyslexia-mode');
    }
    
    if (isLoaded) {
      saveData(STORE_SETTINGS, KEY_DYSLEXIA, isDyslexiaMode);
    }
  }, [isDyslexiaMode, isLoaded]);

  useEffect(() => {
    const isAnyModalOpen = !hasAcceptedConsent || isLimitModalOpen || isHistoryModalOpen || 
                           isGuideModalOpen || isDevModalOpen || isFanGalleryModalOpen || 
                           isCatalogModalOpen || isPronunciationModalOpen || permissionType || 
                           isAnalyzing || isRecording || isTranscribing;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hasAcceptedConsent, isLimitModalOpen, isHistoryModalOpen, isGuideModalOpen, 
      isDevModalOpen, isFanGalleryModalOpen, isCatalogModalOpen, isPronunciationModalOpen, 
      permissionType, isAnalyzing, isRecording, isTranscribing]);

  const playWarningChime = useCallback(() => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate([100, 30, 100, 30, 150]); 
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
      
      setTimeout(() => {
        ctx.close().catch(err => console.warn("Failed to close AudioContext:", err));
      }, 500);
    } catch (e) {
      console.warn("Audio chime failed", e);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    const forbidden = FORBIDDEN_PATTERN.test(val);
    FORBIDDEN_PATTERN.lastIndex = 0;

    if (forbidden && !prevViolationRef.current) {
      playWarningChime();
      setMascotMessage("Dahanku berguncang... mohon gunakan bahasa yang santun, Sahabat.");
    } else if (!forbidden && prevViolationRef.current) {
      setMascotMessage("Terima kasih telah merapikan naskahmu kembali.");
    }
    setIsViolationDetected(forbidden);
    prevViolationRef.current = forbidden;
  };

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.classList.contains('flower') ? 'flower' : (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      setCurrentTheme(theme);
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [d, h, s, c, l, dy, savedUsageDate, savedUsageCount, savedViolations] = await Promise.all([
          getData(STORE_DRAFT, KEY_CURRENT_DRAFT),
          getData(STORE_HISTORY, KEY_HISTORY_LIST),
          getData(STORE_SETTINGS, KEY_PREF_STYLE),
          getData(STORE_SETTINGS, KEY_PREF_CONTEXT),
          getData(STORE_SETTINGS, KEY_PREF_LANG),
          getData(STORE_SETTINGS, KEY_DYSLEXIA),
          getData(STORE_SETTINGS, KEY_USAGE_DATE),
          getData(STORE_SETTINGS, KEY_USAGE_COUNT),
          getData(STORE_SETTINGS, KEY_VIOLATION_COUNT)
        ]);

        if (d) {
          setInputText(d);
          const forbidden = FORBIDDEN_PATTERN.test(d);
          setIsViolationDetected(forbidden);
          prevViolationRef.current = forbidden;
          FORBIDDEN_PATTERN.lastIndex = 0;
        }
        if (h) setHistory(h);
        if (s) setSelectedStyle(s);
        if (c) setSelectedContext(c);
        if (l) setTargetLang(l);
        if (dy !== undefined) {
           setIsDyslexiaMode(dy);
           document.documentElement.classList.toggle('dyslexia-mode', dy);
        }
        if (savedViolations !== undefined) setViolationCount(savedViolations);

        if (savedUsageDate !== today) {
          setUsageCount(0);
          saveData(STORE_SETTINGS, KEY_USAGE_DATE, today);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, 0);
        } else {
          const count = savedUsageCount || 0;
          setUsageCount(count);
          setIsLimitReached(count >= MAX_DAILY_REQUESTS);
        }

        setMascotMessage("Selamat datang kembali, Sahabat Aksara. Aku Tara, mari merawat naskahmu.");
      } catch (err) {
        console.warn("Hydration error:", err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    preloadWebSpeechVoices();
  }, []);

  const handleCancelProcess = useCallback((silent = false) => {
    isCanceledRef.current = true;
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.warn("Failed to stop media recorder:", err);
      }
    }
    
    setIsRecording(false);
    
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    
    if (!silent) setMascotMessage("Proses dibatalkan, Sahabat.");
  }, []);

  const startAnalysis = useCallback(async (plagiarism: boolean) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    
    if (plagiarism) {
       setMascotMessage("Tara sedang menelusuri dahan-dahanan web untuk naskahmu...");
    } else {
       setMascotMessage("Tara sedang menyisir dahan bahasamu...");
    }

    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current || isCanceledRef.current) return;

      if (data.isViolation) {
        const newViolations = violationCount + 1;
        setViolationCount(newViolations);
        await saveData(STORE_SETTINGS, KEY_VIOLATION_COUNT, newViolations);
        
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
        
        playWarningChime();
        setMascotMessage(newViolations >= MAX_VIOLATIONS ? "Dahanku berguncang... Etika Beraksara dilanggar." : "Hati-hati, Sahabat. Naskahmu melanggar Etika Beraksara. Ini peringatan pertama.");
        setIsViolationDetected(true);
        prevViolationRef.current = true;
        setIsAnalyzing(false);
        processActiveRef.current = false;
        return;
      }

      setResult(data);
      setMascotMessage(data.summary);
      
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      setIsLimitReached(newCount >= MAX_DAILY_REQUESTS);
      await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);

      const newHistoryItem: HistoryItem = { id: Date.now().toString(36), timestamp: Date.now(), originalText: inputText, result: data, options: { style: selectedStyle, context: selectedContext } };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 30);
      setHistory(updatedHistory);
      saveData(STORE_HISTORY, KEY_HISTORY_LIST, updatedHistory);
      
    } catch (error) { 
      if (processActiveRef.current) setMascotMessage("Dahanku berguncang, coba lagi ya."); 
    } finally { 
      setIsAnalyzing(false); 
      processActiveRef.current = false; 
    }
  }, [inputText, selectedStyle, selectedContext, targetLang, violationCount, usageCount, history, playWarningChime]); 

  const triggerAnalysis = useCallback(async (plagiarism: boolean) => {
    if (isViolationDetected || isBusy) return;
    if (honeypot) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { 
      setIsLimitModalOpen(true); 
      return; 
    }
    
    pendingPlagiarismRef.current = plagiarism;
    await startAnalysis(plagiarism);
  }, [isViolationDetected, isBusy, honeypot, usageCount, startAnalysis]);
  
  const startRecording = async () => {
    if (isBusy || usageCount >= MAX_DAILY_REQUESTS) return;
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        processAudioTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(true);
      setRecordingCountdown(5);
      mediaRecorder.start();
      setMascotMessage("Aku mendengarkan... silakan bicara, Sahabat.");
      countdownIntervalRef.current = window.setInterval(() => {
        setRecordingCountdown(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) { 
      setMascotMessage("Aduh, aku tidak bisa mendengar. Pastikan izin mikrofon aktif.");
    }
  };

  const stopRecording = (cancel = false) => {
    if (countdownIntervalRef.current) { 
      clearInterval(countdownIntervalRef.current); 
      countdownIntervalRef.current = null; 
    }
    
    if (mediaRecorderRef.current) {
      if (cancel) mediaRecorderRef.current.onstop = null;
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsRecording(false);
  };

  const processAudioTranscription = async (blob: Blob) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsTranscribing(true);
    setLoadingMsg("Tara sedang merangkai suaramu menjadi aksara...");
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    setMascotMessage("Mencoba menangkap setiap dahan suaraku...");
    
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      try {
        const text = await transcribeAudio(base64Audio, mediaRecorderRef.current?.mimeType || 'audio/webm');
        if (!processActiveRef.current || isCanceledRef.current) return;

        if (text && text.trim()) {
          setInputText(prev => prev ? prev + " " + text : text);
          setMascotMessage("Suaramu telah aku tanam di lembaran editor.");
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
        } else {
          setMascotMessage("Maaf, suaraku tidak terdengar jelas oleh dahan-dahanku.");
        }
      } catch (e) { 
        if (processActiveRef.current) setMascotMessage("Dahanku berguncang saat mencoba mendengar."); 
      } finally { 
        setIsTranscribing(false); 
        processActiveRef.current = false;
      }
    };
  };

  const handleSpeech = async () => {
    if (isBusy || (!inputText.trim() && !result)) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitModalOpen(true); return; }

    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsSpeaking(true);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    setMascotMessage("Tara sedang merangkai suara untuk naskahmu...");

    try {
      if (result) {
        await generateSpeech(`Hasil perbaikannya ${result.correctedText}`, "Bahasa Indonesia", result.readingGuideIndo);
        if (!isCanceledRef.current && result.translation) {
          await new Promise(r => setTimeout(r, 600));
          if (!isCanceledRef.current) {
            await generateSpeech(
              `Terjemahan aksaranya ${result.translation.translatedText}`, 
              result.translation.languageName, 
              result.translation.readingGuide
            );
          }
        }
      } else {
        await generateSpeech(inputText, "Bahasa Indonesia");
      }
      if (!isCanceledRef.current) setMascotMessage("Begitulah alunan aksaramu, Sahabat.");
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      setIsLimitReached(newCount >= MAX_DAILY_REQUESTS);
      await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
    } catch (error) { 
      if (!isCanceledRef.current) setMascotMessage("Aduh, suaraku tersangkut."); 
    } finally { 
      setIsSpeaking(false); 
      processActiveRef.current = false; 
    }
  };

  const handleCopyTranslation = () => {
    if (result?.translation?.translatedText) {
      navigator.clipboard.writeText(result.translation.translatedText);
      setMascotMessage("Terjemahan sudah aku salin ke papan klip, Sahabat.");
    }
  };

  if (!isLoaded) return null;
  if (isBanned) return <BannedView />;

  const quotaPercent = (usageCount / MAX_DAILY_REQUESTS) * 100;
  const isQuotaLow = MAX_DAILY_REQUESTS - usageCount <= 5;
  const charCount = inputText.length;
  const isCharLimitNear = charCount >= MAX_CHARACTERS * 0.9;

  const getSuggestionTypeColor = (type: string) => {
  switch (type) {
    case 'Ejaan':
      return currentTheme === 'flower'
        ? 'bg-pink-500/25 text-pink-100'
        : currentTheme === 'dark'
        ? 'bg-amber-900/50 text-amber-200'
        : 'bg-amber-50 text-amber-800 border border-amber-200';

    case 'Tata Bahasa':
      return currentTheme === 'flower'
        ? 'bg-emerald-500/25 text-emerald-100'
        : currentTheme === 'dark'
        ? 'bg-emerald-900/50 text-emerald-200'
        : 'bg-emerald-50 text-emerald-800 border border-emerald-200';

    case 'Tanda Baca':
      return currentTheme === 'flower'
        ? 'bg-blue-500/25 text-blue-100'
        : currentTheme === 'dark'
        ? 'bg-blue-900/50 text-blue-200'
        : 'bg-blue-50 text-blue-800 border border-blue-200';

    case 'Gaya Bahasa':
      return currentTheme === 'flower'
        ? 'bg-rose-500/25 text-rose-100'
        : currentTheme === 'dark'
        ? 'bg-rose-900/50 text-rose-200'
        : 'bg-rose-50 text-rose-800 border border-rose-200';

    default:
      return currentTheme === 'dark'
        ? 'bg-gray-800 text-gray-300'
        : 'bg-gray-100 text-gray-700';
  }
};


  const inputBgClass = currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl text-petal-50' 
    : (currentTheme === 'dark' ? 'bg-emerald-950/20 border-emerald-800/30 shadow-none' : 'bg-white border-emerald-50 shadow-sm');

  const resultCardBg = currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl' 
    : (currentTheme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/40 shadow-none' : 'bg-emerald-50/40 border-emerald-100 shadow-sm');

  const translationCardBg = currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl' 
    : (currentTheme === 'dark' ? 'bg-amber-950/10 border-amber-500/10' : 'bg-red-50/30 border-red-200/50 shadow-sm');

  const selectClass = `p-3.5 rounded-2xl font-bold outline-none border transition-all backdrop-blur-md font-sans focus:ring-2 focus:ring-opacity-50 ${
    currentTheme === 'flower' 
      ? 'bg-petal-900 text-pink-100 border-pink-500/20 focus:ring-pink-500 focus:border-pink-500/50' 
      : currentTheme === 'dark'
        ? 'bg-emerald-950/40 text-emerald-200 border-emerald-800/30 focus:ring-emerald-500 focus:border-emerald-600/50'
        : 'bg-white/40 text-emerald-800 border-emerald-100/50 focus:ring-emerald-600 focus:border-emerald-700/50 shadow-sm'
  }`;

  return (
    <>
      <div className="pt-10 md:pt-12 font-sans">
        <Layout
          activeModal={isHistoryModalOpen ? 'history' : isGuideModalOpen ? 'guide' : isDevModalOpen ? 'dev' : isFanGalleryModalOpen ? 'gallery' : isCatalogModalOpen ? 'catalog' : null}
          onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
          onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
          onDevClick={() => !isBusy && setIsDevModalOpen(true)}
          onGalleryClick={() => !isBusy && setIsFanGalleryModalOpen(true)}
          onCatalogClick={() => !isBusy && setIsCatalogModalOpen(true)}
          onEditorClick={() => { if(!isBusy) { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsDevModalOpen(false); setIsFanGalleryModalOpen(false); setIsCatalogModalOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}}
          isHelpActive={isHelpActive}
          onHelpToggle={() => !isBusy && setIsHelpActive(prev => !prev)}
        >
          <div className="flex flex-col gap-8 max-w-7xl w-full mx-auto pb-32">
            <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
              <button 
                disabled={isBusy} 
                onClick={() => setIsDyslexiaMode(prev => !prev)} 
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-red-700 text-white scale-110 shadow-red-500/60 ring-4 ring-red-500/30' : (currentTheme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-emerald-950 text-red-700 dark:text-red-400 hover:scale-110 active:scale-90')}`} 
                data-help="Mode Khusus Disleksia. Mengubah font agar lebih mudah dibaca bagi penyandang disleksia."
              >
                <span className="font-bold text-xl">D</span>
              </button>
              <button onClick={() => !isBusy && setPermissionType('mic')} disabled={isBusy} className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${usageCount >= MAX_DAILY_REQUESTS ? 'grayscale opacity-50' : ''} ${currentTheme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-emerald-950 text-red-600 dark:text-red-400'}`} data-help="Rekam Suaramu."><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" cy="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button>
              <button onClick={handleSpeech} disabled={isBusy} className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${usageCount >= MAX_DAILY_REQUESTS ? 'grayscale opacity-50' : ''} ${currentTheme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'}`} data-help="Dengarkan Naskah."><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>
              <button onClick={() => !isBusy && setIsPronunciationModalOpen(true)} disabled={isBusy} className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${usageCount >= MAX_DAILY_REQUESTS ? 'grayscale opacity-50' : ''} ${currentTheme === 'flower' ? 'bg-petal-800 text-pink-400 border border-pink-500/20' : 'bg-white dark:bg-emerald-950 text-blue-600 dark:text-blue-400'}`} data-help={`Latihan Tutur. Berlatih melafalkan naskahmu dalam ${currentLangLabel}.`}>
                <span className="text-xl">{currentTheme === 'flower' ? '🌸' : '🗣️'}</span>
              </button>
            </div>

            <div className="space-y-8 w-full max-w-5xl mx-auto">
              <Mascot message={mascotMessage} isLoading={isBusy} forcedExpression={isViolationDetected ? 'shocked' : (isRecording ? 'happy' : undefined)} onAskInfo={async () => {
                if (isBusy) return;
                if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitReached(true); return; }
                const info = await askTaraAboutPlatform();
                setMascotMessage(info);
                const nc = usageCount + 1;
                setUsageCount(nc);
                saveData(STORE_SETTINGS, KEY_USAGE_COUNT, nc);
              }} />

              <div className={`p-5 rounded-[2rem] border shadow-sm ${inputBgClass}`}>
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${currentTheme === 'flower' ? 'bg-pink-400' : 'bg-emerald-500'}`}></span>
                       <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-sans ${currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-700/50 dark:text-emerald-400/40'}`}>Kapasitas Harian</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors font-sans ${isQuotaLow ? 'bg-red-50 text-red-600 animate-quota-low' : (currentTheme === 'flower' ? 'bg-pink-500/20 text-pink-300' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400')}`}>
                       {MAX_DAILY_REQUESTS - usageCount} / {MAX_DAILY_REQUESTS} Tersisa
                    </span>
                 </div>
                 <div className="quota-bar-container"><div className={`quota-bar-fill ${usageCount >= MAX_DAILY_REQUESTS ? 'bg-red-600' : isQuotaLow ? 'bg-red-500' : (currentTheme === 'flower' ? 'bg-pink-500' : 'bg-emerald-600')}`} style={{ width: `${quotaPercent}%` }}></div></div>
              </div>

              <NusantaraMapSection currentTheme={currentTheme} targetLang={targetLang} inputBgClass={inputBgClass} />

              <section className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-[2.5rem] border ${inputBgClass}`}>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-4 font-sans ${currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Gaya</label>
                  <select disabled={isBusy} value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value as any)} className={selectClass}>
                    {STYLE_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 text-current">{o.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ml-4 font-sans ${currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Konteks</label>
                  <select disabled={isBusy} value={selectedContext} onChange={(e) => setSelectedContext(e.target.value as any)} className={selectClass}>
                    {CONTEXT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 text-current">{o.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ml-4 font-sans ${currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Bahasa Target</label>
                  <select disabled={isBusy} value={targetLang} onChange={(e) => setTargetLang(e.target.value as any)} className={selectClass}>
                    {LANG_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 text-current">{o.label}</option>)}
                  </select>
                </div>
              </section>

              <section className={`rounded-[3.5rem] p-6 md:p-10 relative border transition-all duration-300 ${isViolationDetected ? 'border-red-600 shadow-red-600/10 animate-shake' : inputBgClass}`}>
                {inputText && !isBusy && (<button onClick={() => { setInputText(''); setResult(null); }} className={`absolute top-8 right-8 p-3 transition-all active:scale-90 z-10 ${currentTheme === 'flower' ? 'text-pink-100/20 hover:text-pink-500' : 'text-emerald-800/20 dark:text-emerald-400/20 hover:text-red-700'}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg></button>)}

                {isBusy && !isRecording && (
                  <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 sm:p-12 text-center animate-in fade-in ${currentTheme === 'flower' ? 'bg-petal-900/90' : 'bg-white/95 dark:bg-[#050a08]/95'}`}>
                    <div className="max-w-md w-full space-y-8 flex flex-col items-center">
                        <div className={`w-16 h-16 border-4 rounded-full animate-spin ${currentTheme === 'flower' ? 'border-pink-500 border-t-transparent' : 'border-emerald-100 dark:border-emerald-900 border-t-emerald-600'}`}></div>
                        <div className="space-y-6">
                          <p className={`font-bold italic text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 ${currentTheme === 'flower' ? 'text-pink-100' : 'text-emerald-950 dark:text-emerald-50'}`} key={loadingMsg}>"{loadingMsg}"</p>
                          <div className={`p-6 rounded-[2.5rem] border relative animate-in zoom-in-95 duration-500 ${currentTheme === 'flower' ? 'bg-pink-900/50 border-pink-500/20' : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/20'}`} key={funFactMsg}>
                             <div className="flex items-center gap-2 mb-3 justify-center"><span className="text-sm">💡</span><span className={`text-[10px] font-bold uppercase tracking-widest font-sans ${currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-800/40'}`}>Tahukah Kamu?</span></div>
                             <p className={`text-sm font-medium leading-relaxed italic ${currentTheme === 'flower' ? 'text-pink-100' : 'text-emerald-800 dark:text-emerald-200'}`}>{funFactMsg}</p>
                          </div>
                        </div>
                        <button onClick={() => handleCancelProcess()} className={`px-8 py-3 border-2 rounded-full text-sm font-bold transition-all active:scale-95 mt-4 font-sans ${currentTheme === 'flower' ? 'bg-petal-800 border-pink-500/50 text-pink-300' : 'bg-white dark:bg-emerald-950 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'}`}>Batalkan Proses</button>
                    </div>
                  </div>
                )}
                
                {isRecording && (
                   <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 sm:p-12 text-center animate-in fade-in ${currentTheme === 'flower' ? 'bg-petal-900/90' : 'bg-red-50/80 dark:bg-red-950/80'}`}>
                      <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-red-600/40">
                         <span className="text-white text-4xl font-bold">{recordingCountdown}</span>
                      </div>
                      <p className={`text-2xl font-bold mb-8 ${currentTheme === 'flower' ? 'text-pink-100' : 'text-red-900 dark:text-red-100'}`}>Tara sedang mendengar...</p>
                      <button onClick={() => stopRecording()} className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg active:scale-95">Berhenti</button>
                   </div>
                )}

                <div className="relative">
                  <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="confirm_access_token">Don't fill this if you are human</label>
                    <input type="text" id="confirm_access_token" name="confirm_access_token" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                  </div>
                  <textarea value={inputText} disabled={isBusy} onChange={handleInputChange} maxLength={MAX_CHARACTERS} placeholder="Tuliskan naskahmu di sini..." className={`w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-xl leading-relaxed pr-12 transition-colors ${isViolationDetected ? 'text-red-700 dark:text-red-400' : (currentTheme === 'flower' ? 'text-pink-50 placeholder-pink-500/30' : 'text-emerald-950 dark:text-emerald-50 placeholder-red-700/30')}`} />
                  <div className={`absolute bottom-0 right-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 font-sans ${isViolationDetected ? 'text-red-600 animate-pulse' : isCharLimitNear ? 'text-red-600 scale-110' : charCount > MAX_CHARACTERS * 0.7 ? 'text-amber-500' : 'text-emerald-700/30 dark:text-emerald-400/20'}`}>{isViolationDetected ? '⚠️ POLA TERLARANG' : `${charCount} / ${MAX_CHARACTERS}`}</div>
                </div>  

                <div className="flex flex-col items-center gap-6 mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                      onClick={() => triggerAnalysis(false)} 
                      disabled={!inputText.trim() || isBusy || usageCount >= MAX_DAILY_REQUESTS || isViolationDetected} 
                      className={`flex-1 py-5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg font-sans disabled:opacity-30 ${usageCount >= MAX_DAILY_REQUESTS || isViolationDetected ? 'grayscale cursor-not-allowed' : ''} ${currentTheme === 'flower' ? 'bg-pink-500 text-white shadow-pink-500/20' : 'bg-emerald-700 text-white shadow-emerald-700/20'}`}
                    >
                      Koreksi & Terjemahkan
                    </button>
                    
                    <button 
                      onClick={() => setPermissionType('plagiarism')} 
                      disabled={!inputText.trim() || isBusy || usageCount >= MAX_DAILY_REQUESTS || isViolationDetected} 
                      className="flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg font-sans disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                    >
                      Cek Plagiarisme
                    </button>
                  </div>
                </div>
              </section>

              {result && !isAnalyzing && (
                <div id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className={`p-10 rounded-[3rem] border ${resultCardBg}`}>
                      <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 font-sans ${currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/30'}`}>Hasil Perbaikan</h2>
                      <p className={`text-xl whitespace-pre-wrap leading-relaxed ${currentTheme === 'flower' ? 'text-pink-50' : 'text-emerald-950 dark:text-emerald-50'}`}>{result.correctedText}</p>
                      {result.readingGuideIndo && (<div className={`mt-6 pt-6 border-t ${currentTheme === 'flower' ? 'border-pink-500/20' : 'border-emerald-100/50 dark:border-emerald-800/20'}`}><h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 font-sans ${currentTheme === 'flower' ? 'text-pink-500/40' : 'text-emerald-700/30 dark:text-emerald-400/60'}`}>Panduan Baca (Suku Kata)</h3><p className={`text-sm font-medium italic ${currentTheme === 'flower' ? 'text-pink-100/60' : 'text-emerald-800/60 dark:text-emerald-400/60'}`}>{result.readingGuideIndo}</p></div>)}
                   </div>

                   {result.plagiarism && (
                     <div className={`p-8 rounded-[3rem] border animate-in zoom-in-95 duration-500 ${
                        currentTheme === 'flower' 
                        ? 'bg-petal-900/90 border-pink-500/30 shadow-2xl' 
                        : (currentTheme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/20 shadow-none' : 'bg-white border-emerald-100 shadow-xl')}`}>
                        <div className="flex justify-between items-center mb-6">
                           <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${currentTheme === 'flower' ? 'text-pink-400' : (currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')}`}>Keaslian Aksara</h2>
                           <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${result.plagiarism.score > 20 ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                              Kemiripan: {result.plagiarism.score}%
                           </div>
                        </div>
                        <p className={`text-sm font-medium italic mb-8 leading-relaxed ${currentTheme === 'flower' ? 'text-pink-100/80' : (currentTheme === 'dark' ? 'text-emerald-100/70' : 'text-emerald-950/70')}`}>"{result.plagiarism.summary}"</p>
                        {result.plagiarism.sources.length > 0 && (
                          <div className="space-y-4">
                             <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] ${currentTheme === 'flower' ? 'text-pink-500' : (currentTheme === 'dark' ? 'text-emerald-500/60' : 'text-emerald-700/50')}`}>Dahan Rujukan di Web Terbuka:</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {result.plagiarism.sources.map((src, i) => (
                                   <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className={`p-5 rounded-2xl border transition-all hover:translate-x-1 hover:shadow-md flex items-center justify-between group ${
                                      currentTheme === 'flower' 
                                      ? 'bg-petal-800 border-pink-500/10 hover:bg-pink-500/10' 
                                      : (currentTheme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100/50')}`}>
                                      <span className={`text-xs font-bold truncate max-w-[140px] sm:max-w-xs ${currentTheme === 'flower' ? 'text-pink-100' : (currentTheme === 'dark' ? 'text-emerald-100' : 'text-emerald-900')}`}>{src.title}</span>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`opacity-30 group-hover:opacity-100 transition-all ${currentTheme === 'flower' ? 'text-pink-400' : (currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')}`}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                                   </a>
                                ))}
                             </div>
                          </div>
                        )}
                     </div>
                   )}

                   {result.translation && (
                     <div className={`p-10 rounded-[3rem] border relative group ${translationCardBg}`}>
                        <div className="flex justify-between items-center mb-4">
                           <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${currentTheme === 'flower' ? 'text-pink-400' : (currentTheme === 'dark' ? 'text-amber-400' : 'text-red-700')}`}>Terjemahan Aksara ({result.translation.languageName})</h2>
                           <button onClick={handleCopyTranslation} className={`p-2 rounded-lg transition-all ${currentTheme === 'flower' ? 'text-pink-500/40 hover:text-pink-500 hover:bg-pink-500/10' : (currentTheme === 'dark' ? 'text-amber-500/40 hover:text-amber-400 hover:bg-amber-500/10' : 'text-red-700/40 hover:text-red-700 hover:bg-red-500/10')}`}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                           </button>
                        </div>
                        <p className={`text-xl whitespace-pre-wrap leading-relaxed italic ${currentTheme === 'flower' ? 'text-pink-100/80' : 'text-emerald-950 dark:text-emerald-50'}`}>{result.translation.translatedText}</p>
                        {result.translation.readingGuide && (
                          <div className={`mt-6 pt-6 border-t ${currentTheme === 'flower' ? 'border-pink-500/20' : (currentTheme === 'dark' ? 'border-amber-500/10' : 'border-red-500/10')}`}>
                            <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 font-sans ${currentTheme === 'flower' ? 'text-pink-400/40' : (currentTheme === 'dark' ? 'text-amber-400/40' : 'text-red-700/30')}`}>Panduan Baca Fonetik</h3>
                            <p className={`text-sm font-medium italic ${currentTheme === 'flower' ? 'text-pink-100/40' : (currentTheme === 'dark' ? 'text-amber-400/40' : 'text-emerald-800/40')}`}>{result.translation.readingGuide}</p>
                          </div>
                        )}
                     </div>
                   )}

                   {result.suggestions && result.suggestions.length > 0 && (
                     <div className="space-y-4">
                        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ml-6 font-sans ${currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/30'}`}>Analisis Aksara ({result.suggestions.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {result.suggestions.map((s, idx) => (
                             <div key={idx} className={`p-6 rounded-[2rem] border shadow-sm hover:shadow-md transition-shadow ${currentTheme === 'flower' ? 'bg-petal-800 border-pink-500/20' : (currentTheme === 'dark' ? 'bg-emerald-950/20 border-emerald-800/20' : 'bg-white border-emerald-50')}`}>
                                <div className="flex justify-between items-start mb-4"><span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border-b-2 uppercase tracking-widest font-sans ${getSuggestionTypeColor(s.type)}`}>{s.type}</span></div>
                                <div className="flex items-center gap-3 mb-3 text-sm font-bold font-sans"><span className="text-red-400 line-through decoration-2 opacity-50">{s.original}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={currentTheme === 'flower' ? 'text-pink-500/40' : 'text-emerald-400'}><path d="M5 12h14M12 5l7 7-7 7"/></svg><span className={currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-600 dark:text-emerald-400'}>{s.replacement}</span></div>
                                <p className={`text-xs font-medium leading-relaxed italic ${currentTheme === 'flower' ? 'text-pink-100/60' : 'text-emerald-900/60 dark:text-emerald-500'}`}>"{s.reason}"</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className={`p-8 rounded-[2.5rem] border flex flex-col h-full ${inputBgClass}`}>
                  <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-6 font-sans ${currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/30 dark:text-emerald-400/20'}`}>Jejak Lokal</h2>
                  <div className="space-y-4 flex-1">
                    {history.slice(0, 3).map(item => <HistoryCard key={item.id} item={item} onSelect={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); window.scrollTo({top:0, behavior:'smooth'}); } }} />)}
                    {history.length === 0 && <p className={`text-center py-10 italic font-sans ${currentTheme === 'flower' ? 'text-pink-100/20' : 'text-emerald-900/10 dark:text-emerald-400/10'}`}>Kotak jejak masih kosong.</p>}
                  </div>
                </div>
                <TreeHugger />
                <GardenPromoBox isFlower={currentTheme === 'flower'} isDark={currentTheme === 'dark'} />
              </div>
            </div>
          </div>
        </Layout>

          <ConsentModal isOpen={!hasAcceptedConsent} onAccept={() => setHasAcceptedConsent(true)} onReject={() => window.location.href = 'https://google.com'} recaptchaSiteKey={RECAPTCHA_SITE_KEY} />
          {permissionType && <PermissionModal type={permissionType} onAccept={() => { if (permissionType === 'mic') { startRecording(); } else if (permissionType === 'plagiarism') triggerAnalysis(true); setPermissionType(null); }} onDeny={() => setPermissionType(null)} />}
          <LimitModal isOpen={isLimitReached && isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
          <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={(it) => { setInputText(it.originalText); setResult(it.result); }} onClearAll={() => { if(confirm("Hapus semua?")) setHistory([]); }} />
          <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
          <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
          <FanGalleryModal isOpen={isFanGalleryModalOpen} onClose={() => setIsFanGalleryModalOpen(false)} />
          <CatalogModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
          <PronunciationModal isOpen={isPronunciationModalOpen} onClose={() => setIsPronunciationModalOpen(false)} originalText={result?.correctedText || inputText} translation={result?.translation} currentTargetLangLabel={currentLangLabel} onSuccess={() => {}} />
      </div>
    </>
  );
};
export default App;
