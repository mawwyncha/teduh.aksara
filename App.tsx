import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { DeveloperModal } from './components/DeveloperModal';
import { FanGalleryModal } from './components/FanGalleryModal';
import { PermissionModal } from './components/PermissionModal';
import { LimitModal } from './components/LimitModal';
import { ConsentModal } from './components/ConsentModal';
import { analyzeGrammar, generateSpeech, askTaraAboutPlatform, transcribeAudio } from './services/geminiService';
import { saveData, getData, clearStore, deleteData } from './services/dbService';
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

const MAX_DAILY_REQUESTS = 25;

const LOADING_TRANSITION_MS = 8000; 
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

const App: React.FC = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en_us');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usageCount, setUsageCount] = useState(0);
  const [isHelpActive, setIsHelpActive] = useState(false);
  
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
  const [isLoaded, setIsLoaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isLimitReached = usageCount >= MAX_DAILY_REQUESTS;

  // ✅ CONSENT HANDLERS - Define BEFORE useEffect
  const handleAcceptConsent = useCallback(async () => {
    await saveData(STORE_SETTINGS, 'user_consent', true);
    setHasConsent(true);
    setShowConsentModal(false);
  }, []);

  const handleRejectConsent = useCallback(() => {
    alert('Tanpa persetujuan, Anda tidak dapat menggunakan aplikasi ini. Anda akan diarahkan keluar.');
    window.location.href = 'about:blank';
  }, []);

  // ✅ HYDRATION useEffect - FIXED
  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Cek consent PERTAMA
        const consent = await getData(STORE_SETTINGS, 'user_consent');
        if (consent === null || consent === undefined) {
          setShowConsentModal(true);
          setHasConsent(false);
          setIsLoaded(true);
          return; // STOP di sini jika belum consent
        } else {
          setHasConsent(consent);
        }

        // Load data lainnya SETELAH consent
        const [d, h, s, c, l, dy, savedUsageDate, savedUsageCount] = await Promise.all([
          getData(STORE_DRAFT, KEY_CURRENT_DRAFT),
          getData(STORE_HISTORY, KEY_HISTORY_LIST),
          getData(STORE_SETTINGS, KEY_PREF_STYLE),
          getData(STORE_SETTINGS, KEY_PREF_CONTEXT),
          getData(STORE_SETTINGS, KEY_PREF_LANG),
          getData(STORE_SETTINGS, KEY_DYSLEXIA),
          getData(STORE_SETTINGS, KEY_USAGE_DATE),
          getData(STORE_SETTINGS, KEY_USAGE_COUNT)
        ]);

        if (d) setInputText(d);
        if (h) setHistory(h);
        if (s) setSelectedStyle(s);
        if (c) setSelectedContext(c);
        if (l) setTargetLang(l);
        if (dy !== undefined) setIsDyslexiaMode(dy);

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
    const isAnyModalOpen = isHistoryModalOpen || isGuideModalOpen || isDevModalOpen || isLimitModalOpen || isFanGalleryModalOpen || !!permissionType || showConsentModal;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHistoryModalOpen, isGuideModalOpen, isDevModalOpen, isLimitModalOpen, isFanGalleryModalOpen, permissionType, showConsentModal]);

  useEffect(() => {
    let interval: number | null = null;
    if (isAnalyzing && !showSkeleton) {
      interval = window.setInterval(() => {
        setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
        setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
      }, MESSAGE_ROTATION_MS);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isAnalyzing, showSkeleton]);

  const incrementUsage = useCallback(async () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
  }, [usageCount]);

  const handleCancelProcess = useCallback((silent = false) => {
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setShowSkeleton(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    if (loadingTimerRef.current) window.clearTimeout(loadingTimerRef.current);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
    if (!silent) setMascotMessage("Proses dibatalkan sesuai permintaanmu, Sahabat.");
  }, [isRecording]);

  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
      saveData(STORE_DRAFT, KEY_CURRENT_DRAFT, inputText);
    }, 800);
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
    processActiveRef.current = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        setIsTranscribing(true);
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          if (!processActiveRef.current) return;
          const base64Audio = (reader.result as string).split(',')[1];
          const transcribedText = await transcribeAudio(base64Audio, mediaRecorder.mimeType);
          if (processActiveRef.current && transcribedText) {
            setInputText(prev => prev ? `${prev} ${transcribedText}` : transcribedText);
            setMascotMessage("Aku sudah menyalin suaramu ke kotak aksara.");
            incrementUsage();
          }
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
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setShowSkeleton(false);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    
    if (plagiarism) {
       setMascotMessage("Tara sedang menelusuri dahan-dahan web untuk naskahmu...");
    } else {
       setMascotMessage("Tara sedang menyisir dahan bahasamu...");
    }

    loadingTimerRef.current = window.setTimeout(() => {
      if (processActiveRef.current) {
        setShowSkeleton(true);
        setMascotMessage(plagiarism ? "Penelusuran dahan web hampir selesai..." : "Perapian aksara hampir selesai...");
      }
    }, LOADING_TRANSITION_MS);

    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current) return;
      setResult(data);
      setMascotMessage(data.summary);
      incrementUsage();
      setHistory(prev => [{ id: Date.now().toString(36), timestamp: Date.now(), originalText: inputText, result: data, options: { style: selectedStyle, context: selectedContext } }, ...prev].slice(0, 30));
    } catch (error) { if (processActiveRef.current) setMascotMessage("Dahanku berguncang, coba lagi ya."); }
    finally { 
      setIsAnalyzing(false); 
      setShowSkeleton(false);
      processActiveRef.current = false; 
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    }
  };

  const handleMicClick = () => {
    if (isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    setPermissionType('mic');
  };

  const handlePlagiarismClick = () => {
    if (!inputText.trim() || isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    setPermissionType('plagiarism');
  };

  const handleAnalyzeNormal = () => {
    if (!inputText.trim() || isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    executeAnalysis(false);
  };

  const handleSpeech = async () => {
    if (isBusy) return;
    if (isLimitReached) { setIsLimitModalOpen(true); return; }
    const textToRead = result?.correctedText || inputText;
    if (!textToRead.trim()) return;
    processActiveRef.current = true;
    setIsSpeaking(true);
    try {
      await generateSpeech(textToRead, result?.translation?.translatedText);
      setMascotMessage("Begitulah alunan aksaramu, Sahabat.");
      incrementUsage();
    } catch (error) { setMascotMessage("Aduh, suaraku tersangkut."); }
    finally { setIsSpeaking(false); processActiveRef.current = false; }
  };

  const handleClear = useCallback(() => {
    setInputText('');
    setResult(null);
    setMascotMessage("Lembaran baru telah siap, mari mulai menulis kembali.");
  }, []);

  // ✅ EARLY RETURN untuk Consent Modal
  if (!hasConsent && hasConsent !== null) {
    return (
      <ConsentModal 
        isOpen={showConsentModal} 
        onAccept={handleAcceptConsent} 
        onReject={handleRejectConsent} 
      />
    );
  }

  if (!isLoaded) return null;

  const quotaPercent = (usageCount / MAX_DAILY_REQUESTS) * 100;
  const isQuotaLow = MAX_DAILY_REQUESTS - usageCount <= 5;

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
      activeModal={isHistoryModalOpen ? 'history' : isGuideModalOpen ? 'guide' : isDevModalOpen ? 'dev' : isFanGalleryModalOpen ? 'gallery' : null}
      onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
      onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
      onDevClick={() => !isBusy && setIsDevModalOpen(true)}
      onGalleryClick={() => !isBusy && setIsFanGalleryModalOpen(true)}
      onEditorClick={() => { if(!isBusy) { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsDevModalOpen(false); setIsFanGalleryModalOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}}
      isHelpActive={isHelpActive}
      onHelpToggle={() => setIsHelpActive(!isHelpActive)}
    >
      {/* REST OF YOUR CODE - UNCHANGED */}
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button 
          disabled={isBusy} 
          onClick={() => setIsDyslexiaMode(!isDyslexiaMode)} 
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white' : 'bg-white dark:bg-[#1a110c] text-amber-600 hover:scale-110 active:scale-90'}`}
        >
          <span className="font-bold text-xl">D</span>
        </button>
        {/* ... rest of buttons ... */}
      </div>

      {/* Main content grid - your existing code continues here */}
      
      {/* Modals at the end */}
      {permissionType && <PermissionModal type={permissionType} onAccept={() => { if (permissionType === 'mic') startMicProcess(); else if (permissionType === 'plagiarism') executeAnalysis(true); setPermissionType(null); }} onDeny={() => setPermissionType(null)} />}
      <LimitModal isOpen={isLimitReached && isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); } }} onClearAll={() => { if(!isBusy && confirm("Hapus semua?")) { setHistory([]); clearStore(STORE_HISTORY); } }} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
      <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
      <FanGalleryModal isOpen={isFanGalleryModalOpen} onClose={() => setIsFanGalleryModalOpen(false)} />
    </Layout>
  );
};

export default App;