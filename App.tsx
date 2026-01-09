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
import { analyzeGrammar, generateSpeech, askTaraAboutPlatform, transcribeAudio } from './services/geminiService';
import { saveData, getData, clearStore } from './services/dbService';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext, TargetLanguage } from './types';

const STORE_DRAFT = 'draft';
const STORE_HISTORY = 'history';
const STORE_SETTINGS = 'settings';

const KEY_CURRENT_DRAFT = 'current_draft';
const KEY_HISTORY_LIST = 'history_list';
const KEY_PREF_STYLE = 'pref_style';
const KEY_PREF_CONTEXT = 'pref_context';
const KEY_PREF_LANG = 'pref_lang';
const KEY_DYSLEXIA = 'dyslexia_mode';
const KEY_USAGE_COUNT = 'daily_usage_count';
const KEY_USAGE_DATE = 'daily_usage_date';
const KEY_VIOLATION_COUNT = 'violation_count';

const MAX_DAILY_REQUESTS = 25;
const MAX_VIOLATIONS = 2;
const MAX_CHARACTERS = 1000;

/**
 * DAFTAR KATA TERLARANG (PROFANITY & SECURITY)
 */
const FORBIDDEN_PATTERN = /(anjing|babi|bangsat|kontol|memek|jembut|ngentot|peler|asu|bajingan|tempik|tolol|goblok|idiot|perek|lonte|pantek|jablay|pecun|ngewe|itil|ngocok|brengsek|setan|iblis|pelacur|bencong|homo|lesbi|bejat|keparat|biadab|titit|vagina|penis|porn|bokep|lendir|sange|coly|coli|script|javascript:|eval\(|union\s+select|drop\s+table|insert\s+into|delete\s+from|--|<[^>]*>|onerror|onload)/gi;

const MESSAGE_ROTATION_MS = 3000;    

const CALMING_MESSAGES = [
  "Tarik napas sejenak, biarkan Tara merapikan dahan bahasamu...",
  "Sabar ya, aksara terbaik butuh waktu untuk tumbuh sempurna...",
  "Tara sedang menyisir setiap kata dengan penuh kasih sayang...",
  "Menanti sejenak selagi embun aksara membasahi naskahmu...",
  "Nikmati ketenangan ini, Tara tidak akan membiarkan diksimu layu...",
  "Memilah diksi, merajut arti, semua demi naskah yang terpuji...",
  "Seperti kersen yang matang perlahan, naskahmu pun butuh ketelatenan...",
  "Menenangkan pikiran, menjernihkan tulisan...",
  "Tara sedang berbisik pada dahan-dahan web untukmu..."
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
  { value: 'jv_central', label: 'Jawa Tengah (Solo) 🇮🇩' },
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

const AdSlot: React.FC = () => (
  <div className="mt-8 bg-emerald-50/30 dark:bg-emerald-900/10 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-800/10 text-center group transition-all">
    <span className="text-[9px] font-bold text-emerald-800/20 dark:text-emerald-400/20 uppercase tracking-[0.3em] mb-4 block">Ruang Sponsor</span>
    <div className="aspect-video bg-emerald-100/20 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center border border-dashed border-emerald-200 dark:border-emerald-800/40 group-hover:bg-emerald-100/40 transition-all">
       <p className="text-[10px] text-emerald-800/40 dark:text-emerald-400/30 italic font-medium">Slot Iklan Tersedia</p>
    </div>
  </div>
);

const SkeletonResult: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-emerald-50/20 dark:bg-forest-950/20 p-10 rounded-[3rem] border border-emerald-100/50 dark:border-emerald-900/10 relative overflow-hidden">
        <div className="h-2 w-24 bg-emerald-100 dark:bg-emerald-900/50 rounded mb-6 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-emerald-50 dark:bg-emerald-900/30 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-emerald-50 dark:bg-emerald-900/30 rounded w-[90%] animate-pulse"></div>
          <div className="h-4 bg-emerald-50 dark:bg-emerald-900/30 rounded w-[75%] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const BannedView: React.FC = () => (
  <div className="fixed inset-0 z-[999] bg-rose-950 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
     <div className="w-32 h-32 bg-rose-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(244,63,94,0.4)] animate-pulse">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
     </div>
     <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-widest leading-tight">Akses Ditutup Permanen</h1>
     <p className="text-rose-200/60 max-w-lg text-lg leading-relaxed italic mb-10">
        "Kesantunan adalah akar dari dahan bahasa yang indah. Karena telah melanggar Etika Beraksara di taman Teduh Aksara sebanyak 2 kali, dahan komunikasimu di sini telah kami tutup selamanya."
     </p>
     <div className="bg-rose-900/30 border border-rose-500/20 p-6 rounded-3xl text-rose-300 text-sm font-bold uppercase tracking-widest">
        Pelanggaran Etika Terdeteksi Sistem Otomatis
     </div>
  </div>
);

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
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
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [funFactMsg, setFunFactMsg] = useState("");
  
  const [permissionType, setPermissionType] = useState<'mic' | 'plagiarism' | null>(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isFanGalleryModalOpen, setIsFanGalleryModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);
  const isCanceledRef = useRef(false);
  const prevViolationRef = useRef(false);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isLimitReached = usageCount >= MAX_DAILY_REQUESTS;
  const isBanned = violationCount >= MAX_VIOLATIONS;

  const playWarningChime = useCallback(() => {
    try {
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
      setTimeout(() => ctx.close(), 500);
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
      setMascotMessage("Dahanku gemetar... mohon gunakan bahasa yang santun, Sahabat.");
    } else if (!forbidden && prevViolationRef.current) {
      setMascotMessage("Terima kasih telah merapikan naskahmu kembali.");
    }
    setIsViolationDetected(forbidden);
    prevViolationRef.current = forbidden;
  };

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
        if (dy !== undefined) setIsDyslexiaMode(dy);
        if (savedViolations !== undefined) setViolationCount(savedViolations);

        if (savedUsageDate !== today) {
          setUsageCount(0);
          saveData(STORE_SETTINGS, KEY_USAGE_DATE, today);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, 0);
        } else {
          setUsageCount(savedUsageCount || 0);
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
    const isAnyModalOpen = !hasAcceptedConsent || isHistoryModalOpen || isGuideModalOpen || isDevModalOpen || isLimitModalOpen || isFanGalleryModalOpen || isCatalogModalOpen || !!permissionType || isBanned;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [hasAcceptedConsent, isHistoryModalOpen, isGuideModalOpen, isDevModalOpen, isLimitModalOpen, isFanGalleryModalOpen, isCatalogModalOpen, permissionType, isBanned]);

  useEffect(() => {
    let interval: number | null = null;
    if ((isAnalyzing || isSpeaking) && !showSkeleton) {
      interval = window.setInterval(() => {
        setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
        setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
      }, MESSAGE_ROTATION_MS);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isAnalyzing, isSpeaking, showSkeleton]);

  const incrementUsage = useCallback(async () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
  }, [usageCount]);

  const incrementViolations = useCallback(async () => {
    const newCount = violationCount + 1;
    setViolationCount(newCount);
    await saveData(STORE_SETTINGS, KEY_VIOLATION_COUNT, newCount);
  }, [violationCount]);

  const handleCancelProcess = useCallback((silent = false) => {
    isCanceledRef.current = true;
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setShowSkeleton(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    if (loadingTimerRef.current) window.clearTimeout(loadingTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    setIsRecording(false);
    if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
    if (!silent) setMascotMessage("Proses dibatalkan, Sahabat.");
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => { saveData(STORE_DRAFT, KEY_CURRENT_DRAFT, inputText); }, 800);
    return () => clearTimeout(timeoutId);
  }, [inputText, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveData(STORE_HISTORY, KEY_HISTORY_LIST, history);
      saveData(STORE_SETTINGS, KEY_PREF_STYLE, selectedStyle);
      saveData(STORE_SETTINGS, KEY_PREF_CONTEXT, selectedContext);
      saveData(STORE_SETTINGS, KEY_PREF_LANG, targetLang);
      saveData(STORE_SETTINGS, KEY_DYSLEXIA, isDyslexiaMode);
      document.body.classList.toggle('dyslexia-mode', isDyslexiaMode);
    }
  }, [history, selectedStyle, selectedContext, targetLang, isDyslexiaMode, isLoaded]);

  const startMicProcess = async () => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        if (isCanceledRef.current) { stream.getTracks().forEach(track => track.stop()); return; }
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        setIsTranscribing(true);
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          if (!processActiveRef.current || isCanceledRef.current) { setIsTranscribing(false); return; }
          const base64Audio = (reader.result as string).split(',')[1];
          try {
            const transcribedText = await transcribeAudio(base64Audio, mediaRecorder.mimeType);
            if (processActiveRef.current && !isCanceledRef.current && transcribedText) {
              const newText = inputText ? `${inputText} ${transcribedText}` : transcribedText;
              const finalVal = newText.slice(0, MAX_CHARACTERS);
              setInputText(finalVal);
              const forbidden = FORBIDDEN_PATTERN.test(finalVal);
              if (forbidden && !prevViolationRef.current) playWarningChime();
              setIsViolationDetected(forbidden);
              prevViolationRef.current = forbidden;
              FORBIDDEN_PATTERN.lastIndex = 0;
              setMascotMessage("Aku sudah menyalin suaramu ke kotak aksara.");
              incrementUsage();
            }
          } catch (e) { setMascotMessage("Gagal menyalin suaramu."); }
          setIsTranscribing(false);
          processActiveRef.current = false;
        };
        stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(true);
      setRecordingCountdown(5);
      mediaRecorder.start();
      countdownIntervalRef.current = window.setInterval(() => {
        setRecordingCountdown(prev => {
          if (prev <= 1) {
            if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) { alert("Tara butuh izin mikrofon."); processActiveRef.current = false; }
  };

  const executeAnalysis = async (plagiarism: boolean) => {
    if (isViolationDetected) return; 
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    // CRITICAL FIX: Set showSkeleton to false to let the jokes/facts overlay appear
    setShowSkeleton(false); 
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    
    if (plagiarism) {
       setMascotMessage("Tara sedang menelusuri dahan-dahan web untuk naskahmu...");
    } else {
       setMascotMessage("Tara sedang menyisir dahan bahasamu...");
    }

    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current || isCanceledRef.current) return;

      if (data.isViolation) {
        await incrementViolations();
        playWarningChime();
        setMascotMessage(violationCount + 1 >= MAX_VIOLATIONS ? "Dahanku berguncang... Etika Beraksara dilanggar." : "Hati-hati, Sahabat. Naskahmu melanggar Etika Beraksara. Ini peringatan pertama.");
        setIsViolationDetected(true);
        prevViolationRef.current = true;
        setIsAnalyzing(false);
        processActiveRef.current = false;
        return;
      }

      setResult(data);
      setMascotMessage(data.summary);
      incrementUsage();
      setHistory(prev => [{ id: Date.now().toString(36), timestamp: Date.now(), originalText: inputText, result: data, options: { style: selectedStyle, context: selectedContext } }, ...prev].slice(0, 30));
    } catch (error) { if (processActiveRef.current) setMascotMessage("Dahanku berguncang, coba lagi ya."); }
    finally { 
      setIsAnalyzing(false); 
      processActiveRef.current = false; 
    }
  };

  const handleMicClick = () => {
    if (isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    setPermissionType('mic');
  };

  const handlePlagiarismClick = () => {
    if (!inputText.trim() || isBusy || isViolationDetected) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    setPermissionType('plagiarism');
  };

  const handleAnalyzeNormal = () => {
    if (!inputText.trim() || isBusy || isViolationDetected) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    executeAnalysis(false);
  };

  const handleSpeech = async () => {
    if (isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    const textToRead = result?.correctedText || inputText;
    if (!textToRead.trim()) return;
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsSpeaking(true);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    setMascotMessage("Tara sedang merangkai suara untuk naskahmu...");
    try {
      await generateSpeech(textToRead, result?.translation?.translatedText);
      if (!isCanceledRef.current) setMascotMessage("Begitulah alunan aksaramu, Sahabat.");
      incrementUsage();
    } catch (error) { if (!isCanceledRef.current) setMascotMessage("Aduh, suaraku tersangkut."); }
    finally { setIsSpeaking(false); processActiveRef.current = false; }
  };

  const handleClear = useCallback(() => {
    setInputText('');
    setIsViolationDetected(false);
    prevViolationRef.current = false;
    setResult(null);
    setMascotMessage("Lembaran baru telah siap, mari mulai menulis kembali.");
  }, []);

  if (!isLoaded) return null;
  if (isBanned) return <BannedView />;

  const quotaPercent = (usageCount / MAX_DAILY_REQUESTS) * 100;
  const isQuotaLow = MAX_DAILY_REQUESTS - usageCount <= 5;
  const charCount = inputText.length;
  const isCharLimitNear = charCount >= MAX_CHARACTERS * 0.9;

  const getSuggestionTypeColor = (type: string) => {
    switch(type) {
      case 'Ejaan': return 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300';
      case 'Tata Bahasa': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300';
      case 'Tanda Baca': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300';
      case 'Gaya Bahasa': return 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Layout 
      activeModal={isHistoryModalOpen ? 'history' : isGuideModalOpen ? 'guide' : isDevModalOpen ? 'dev' : isFanGalleryModalOpen ? 'gallery' : isCatalogModalOpen ? 'catalog' : null}
      onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
      onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
      onDevClick={() => !isBusy && setIsDevModalOpen(true)}
      onGalleryClick={() => !isBusy && setIsFanGalleryModalOpen(true)}
      onCatalogClick={() => !isBusy && setIsCatalogModalOpen(true)}
      onEditorClick={() => { if(!isBusy) { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsDevModalOpen(false); setIsFanGalleryModalOpen(false); setIsCatalogModalOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}}
      isHelpActive={isHelpActive}
      onHelpToggle={() => setIsHelpActive(!isHelpActive)}
    >
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button disabled={isBusy} onClick={() => setIsDyslexiaMode(!isDyslexiaMode)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white' : 'bg-white dark:bg-[#1a110c] text-amber-600 hover:scale-110 active:scale-90'}`} data-help="Mode Khusus Disleksia."><span className="font-bold text-xl">D</span></button>
        <button onClick={handleMicClick} disabled={isBusy} className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-rose-600 transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${isLimitReached ? 'grayscale opacity-50' : ''}`} data-help="Rekam Suaramu."><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button>
        <button onClick={handleSpeech} disabled={isBusy} className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-emerald-600 transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${isLimitReached ? 'grayscale opacity-50' : ''}`} data-help="Dengarkan Naskah."><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl w-full mx-auto pb-32">
        <div className="lg:col-span-8 space-y-8">
          <Mascot message={mascotMessage} isLoading={isBusy} forcedExpression={isViolationDetected ? 'shocked' : undefined} onAskInfo={async () => {
            if (isBusy) return;
            if (isLimitReached) { setIsLimitModalOpen(true); return; }
            const info = await askTaraAboutPlatform();
            setMascotMessage(info);
            incrementUsage();
          }} />

          <div className="bg-white dark:bg-forest-900 p-5 rounded-[2rem] border border-emerald-50 dark:border-emerald-800/10 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <span className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-[0.2em]">Kapasitas Harian</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${isQuotaLow ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 animate-quota-low' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`}>
                   {MAX_DAILY_REQUESTS - usageCount} / {MAX_DAILY_REQUESTS} Tersisa
                </span>
             </div>
             <div className="quota-bar-container"><div className={`quota-bar-fill ${isLimitReached ? 'bg-rose-500' : isQuotaLow ? 'bg-amber-500' : 'bg-emerald-600'}`} style={{ width: `${quotaPercent}%` }}></div></div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-forest-900 p-6 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800/20">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] ml-4">Gaya</label>
              <select disabled={isBusy} value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value as any)} className="bg-forest-50 dark:bg-forest-950 p-3.5 rounded-2xl font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-transparent focus:border-emerald-200">{STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] mb-1.5 ml-4">Konteks</label>
              <select disabled={isBusy} value={selectedContext} onChange={(e) => setSelectedContext(e.target.value as any)} className="bg-forest-50 dark:bg-forest-950 p-3.5 rounded-2xl font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-transparent focus:border-emerald-200">{CONTEXT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] mb-1.5 ml-4">Bahasa Target</label>
              <select disabled={isBusy} value={targetLang} onChange={(e) => setTargetLang(e.target.value as any)} className="bg-forest-50 dark:bg-forest-950 p-3.5 rounded-2xl font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-transparent focus:border-emerald-200">{LANG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
            </div>
          </section>

          <section className={`bg-white dark:bg-forest-900 rounded-[3.5rem] p-6 md:p-10 shadow-xl relative border transition-all duration-300 ${isViolationDetected ? 'border-rose-500 shadow-rose-500/10 animate-shake' : 'border-emerald-50 dark:border-emerald-800/20'}`}>
            {inputText && !isBusy && (<button onClick={handleClear} className="absolute top-8 right-8 p-3 text-emerald-800/20 hover:text-rose-600 transition-all active:scale-90 z-10"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg></button>)}

            {isBusy && !showSkeleton && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-forest-950/95 backdrop-blur-md rounded-[3.5rem] p-8 sm:p-12 text-center animate-in fade-in">
                {isRecording ? (
                  <div className="flex flex-col items-center w-full max-w-sm">
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4"><div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping"></div><div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center shadow-lg"><span className="text-4xl font-bold text-white">{recordingCountdown}</span></div></div>
                    <p className="text-rose-800 dark:text-rose-400 font-bold text-2xl uppercase tracking-widest mb-6">Mendengarkan...</p>
                    <button onClick={() => handleCancelProcess()} className="px-10 py-4 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800/30 rounded-full text-base font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-all active:scale-95 shadow-sm">Batal Merekam</button>
                  </div>
                ) : (
                  <div className="max-w-md w-full space-y-8 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <div className="space-y-6">
                      <p className="text-emerald-900 dark:text-emerald-50 font-bold italic text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" key={loadingMsg}>"{loadingMsg}"</p>
                      <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800/20 relative animate-in zoom-in-95 duration-500" key={funFactMsg}>
                         <div className="flex items-center gap-2 mb-3 justify-center"><span className="text-sm">💡</span><span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Tahukah Kamu?</span></div>
                         <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed italic">{funFactMsg}</p>
                      </div>
                    </div>
                    <button onClick={() => handleCancelProcess()} className="px-8 py-3 bg-white dark:bg-forest-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-full text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 transition-all active:scale-95 mt-4">Batalkan Proses</button>
                  </div>
                )}
              </div>
            )}
            
            <div className="relative">
              <textarea value={inputText} disabled={isBusy} onChange={handleInputChange} maxLength={MAX_CHARACTERS} placeholder="Tuliskan naskahmu di sini..." className={`w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-xl leading-relaxed placeholder-emerald-100 pr-12 transition-colors ${isViolationDetected ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-950 dark:text-emerald-50'}`} />
              <div className={`absolute bottom-0 right-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isViolationDetected ? 'text-rose-600 animate-pulse' : isCharLimitNear ? 'text-rose-500 scale-110' : charCount > MAX_CHARACTERS * 0.7 ? 'text-amber-500' : 'text-emerald-700/30 dark:text-emerald-400/20'}`}>{isViolationDetected ? '⚠️ POLA TERLARANG' : `${charCount} / ${MAX_CHARACTERS}`}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={handleAnalyzeNormal} disabled={!inputText.trim() || isBusy || isLimitReached || isViolationDetected} className={`flex-1 py-5 bg-emerald-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-700/20 disabled:opacity-30 ${isLimitReached || isViolationDetected ? 'grayscale cursor-not-allowed' : ''}`}>Koreksi & Terjemahkan</button>
              <button onClick={handlePlagiarismClick} disabled={!inputText.trim() || isBusy || isLimitReached || isViolationDetected} className={`flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg disabled:opacity-30 ${isLimitReached || isViolationDetected ? 'grayscale cursor-not-allowed' : ''}`}>Cek Plagiarisme</button>
            </div>
          </section>

          {showSkeleton && isAnalyzing && <SkeletonResult />}

          {result && !isAnalyzing && (
            <div id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-emerald-50/40 dark:bg-forest-950/40 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30">
                  <h2 className="text-[10px] font-bold text-emerald-700/40 uppercase tracking-[0.3em] mb-4">Hasil Perbaikan</h2>
                  <p className="text-xl text-emerald-950 dark:text-emerald-50 whitespace-pre-wrap leading-relaxed">{result.correctedText}</p>
                  {result.readingGuideIndo && (<div className="mt-6 pt-6 border-t border-emerald-100/50 dark:border-emerald-900/20"><h3 className="text-[9px] font-bold text-emerald-700/30 uppercase tracking-[0.2em] mb-2">Panduan Baca (Suku Kata)</h3><p className="text-sm text-emerald-800/60 dark:text-emerald-400 font-medium italic">{result.readingGuideIndo}</p></div>)}
               </div>
               {result.suggestions && result.suggestions.length > 0 && (
                 <div className="space-y-4">
                    <h2 className="text-[10px] font-bold text-emerald-700/40 uppercase tracking-[0.3em] ml-6">Analisis Aksara ({result.suggestions.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {result.suggestions.map((s, idx) => (
                         <div key={idx} className="bg-white dark:bg-forest-900 p-6 rounded-[2rem] border border-emerald-50 dark:border-emerald-800/10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4"><span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest ${getSuggestionTypeColor(s.type)}`}>{s.type}</span></div>
                            <div className="flex items-center gap-3 mb-3 text-sm font-bold"><span className="text-rose-400 line-through decoration-2 opacity-50">{s.original}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400"><path d="M5 12h14M12 5l7 7-7 7"/></svg><span className="text-emerald-600 dark:text-emerald-400">{s.replacement}</span></div>
                            <p className="text-xs text-emerald-900/60 dark:text-emerald-500 font-medium leading-relaxed italic">"{s.reason}"</p>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
               {result.translation && (
                 <div className="bg-[#fff9f0] dark:bg-[#1a1410] p-10 rounded-[3rem] border border-amber-100/30">
                    <h2 className="text-[10px] font-bold text-amber-800/40 uppercase tracking-[0.3em] mb-4">Terjemahan ({result.translation.languageName})</h2>
                    <p className="text-xl text-amber-950 dark:text-amber-50 whitespace-pre-wrap leading-relaxed">{result.translation.translatedText}</p>
                    {result.translation.readingGuide && (<div className="mt-6 pt-6 border-t border-amber-100/20"><h3 className="text-[9px] font-bold text-amber-800/30 uppercase tracking-[0.2em] mb-2">Panduan Pelafalan</h3><p className="text-sm text-amber-800/50 dark:text-amber-400 font-medium italic">{result.translation.readingGuide}</p></div>)}
                 </div>
               )}
               {result.plagiarism && (
                 <div className="bg-rose-50/10 dark:bg-rose-900/5 p-10 rounded-[3rem] border border-rose-100/20 dark:border-rose-900/10">
                    <div className="flex justify-between items-center mb-4"><h2 className="text-[10px] font-bold text-rose-800/40 uppercase tracking-[0.3em]">Status Keaslian</h2><span className="text-lg font-bold text-rose-600">{result.plagiarism.score}% Kemiripan</span></div>
                    <p className="text-base text-rose-900/70 dark:text-rose-400 italic font-medium mb-4">{result.plagiarism.summary}</p>
                    {result.plagiarism.sources.length > 0 && (<div className="flex flex-wrap gap-2">{result.plagiarism.sources.map((src, i) => (<a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold px-3 py-1 bg-white dark:bg-white/5 border border-rose-100 dark:border-rose-900/20 rounded-lg text-rose-600 hover:bg-rose-600 hover:text-white transition-all">{src.title || 'Sumber Web'} ↗</a>))}</div>)}
                 </div>
               )}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white dark:bg-forest-900 p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800/10 sticky top-8">
            <h2 className="text-[10px] font-bold text-emerald-700/30 uppercase tracking-[0.3em] mb-6">Jejak Lokal</h2>
            <div className="space-y-4">
              {history.slice(0, 4).map(item => <HistoryCard key={item.id} item={item} onSelect={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); const forbidden = FORBIDDEN_PATTERN.test(it.originalText); setIsViolationDetected(forbidden); prevViolationRef.current = forbidden; FORBIDDEN_PATTERN.lastIndex = 0; window.scrollTo({top:0, behavior:'smooth'}); } }} />)}
              {history.length === 0 && <p className="text-center py-10 text-emerald-900/10 italic">Kotak jejak masih kosong.</p>}
            </div>
            <AdSlot />
          </div>
        </aside>
      </div>

      <ConsentModal isOpen={!hasAcceptedConsent} onAccept={() => setHasAcceptedConsent(true)} onReject={() => window.location.href = 'https://google.com'} />
      {permissionType && <PermissionModal type={permissionType} onAccept={() => { if (permissionType === 'mic') startMicProcess(); else if (permissionType === 'plagiarism') executeAnalysis(true); setPermissionType(null); }} onDeny={() => setPermissionType(null)} />}
      <LimitModal isOpen={isLimitReached && isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); const forbidden = FORBIDDEN_PATTERN.test(it.originalText); setIsViolationDetected(forbidden); prevViolationRef.current = forbidden; FORBIDDEN_PATTERN.lastIndex = 0; } }} onClearAll={() => { if(!isBusy && confirm("Hapus semua?")) { setHistory([]); clearStore(STORE_HISTORY); } }} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
      <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
      <FanGalleryModal isOpen={isFanGalleryModalOpen} onClose={() => setIsFanGalleryModalOpen(false)} />
      <CatalogModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
    </Layout>
  );
};

export default App;