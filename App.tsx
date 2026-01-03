
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { DeveloperModal } from './components/DeveloperModal';
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

const LOADING_MESSAGES_ANALYSIS = [
  "Tara sedang menyisir diksi...",
  "Menata dahan bahasa...",
  "Mencari embun aksara...",
  "Tara meneliti naskahmu..."
];

const LOADING_MESSAGES_SPEECH = [
  "Tara sedang melatih pita suara...",
  "Menyiapkan melodi aksara...",
  "Menghidupkan bunyi kata...",
  "Meresapi nada bicara..."
];

const LOADING_MESSAGES_TRANSCRIPTION = [
  "Tara sedang menyalin bisikanmu...",
  "Merangkai suara menjadi kata...",
  "Menangkap sari ucapanmu...",
  "Menerjemahkan bunyi ke aksara..."
];

const REASSURANCE_MESSAGES = [
  "Tetap tenang, Tara sedang bekerja seteliti mungkin...",
  "Sedikit lagi, dahan bahasamu hampir rapi...",
  "Tara butuh waktu sejenak karena naskahmu berharga...",
  "Kesabaranmu adalah pupuk bagi aksara ini..."
];

const FUN_FACTS = [
  "Bahasa Indonesia memiliki lebih dari 110.000 kosakata dalam KBBI V.",
  "Kata 'Matahari' berasal dari gabungan kata 'Mata' dan 'Hari', yang berarti 'Mata dari Sang Hari'.",
  "Bahasa Indonesia adalah bahasa ke-10 yang paling banyak digunakan di dunia.",
  "Bahasa Jawa adalah salah satu bahasa daerah dengan jumlah penutur terbanyak di dunia, setelah bahasa Mandarin",
  "Ada sekitar 718 bahasa daerah di Indonesia, tetapi Bahasa Indonesia menyatukan semuanya.",
  "Bahasa Minangkabau memiliki pola kalimat yang unik, di mana subjek dan predikat bisa berubah tergantung konteks sosial.",
  "Bahasa Batak memiliki berbagai dialek, dan setiap dialek memiliki ciri khas berbeda.",
  "Bahasa Aceh memiliki bunyi konsonan yang unik, seperti bunyi 'glottal stop' yang jarang ditemukan di bahasa lain.",
  "Bahasa Betawi dikenal dengan logatnya yang unik dan sering digunakan dalam berbagai kesenian tradisional.",
  "Bahasa Sasak di Lombok memiliki pengaruh dari bahasa Bali dan Jawa, menciptakan campuran yang khas.",
  "Kata 'Rumah Sakit' adalah terjemahan harfiah dari bahasa Belanda 'Ziekenhuis'.",
  "Bahasa Ternate dan Tidore di Maluku memiliki sejarah panjang sebagai bahasa perdagangan di kawasan timur Indonesia.",
  "Bahasa Ambon memiliki kosakata yang dipengaruhi oleh bahasa Portugis, sebagai warisan masa lalu.",
  "Bahasa Indonesia menggunakan abjad Latin, namun dulunya pernah menggunakan aksara Jawi.",
  "Huruf 'Q' dan 'X' biasanya hanya digunakan untuk nama atau istilah ilmiah dalam Bahasa Indonesia.",
  "Bahasa Indonesia adalah bahasa yang dipilih sebagai bahasa persatuan dan memiliki lebih dari 700 bahasa daerah di Indonesia."
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
  { value: 'zh_cantonese_id', label: 'Cina (Hokkien-Medan/Jkt) 🇮🇩' },
  { value: 'lp', label: 'Lampung 🇮🇩' },
  { value: 'sas', label: 'Sasak (Lombok) 🇮🇩' },
  { value: 'pap', label: 'Papua (Melayu) 🇮🇩' },
  { value: 'amb', label: 'Ambon (Melayu) 🇮🇩' },
  { value: 'go', label: 'Gorontalo 🇮🇩' },
  { value: 'ni', label: 'Nias 🇮🇩' },
  { value: 'tet', label: 'Tetum (Timor Leste) 🇹🇱' },
  { value: 'pt_tl', label: 'Portugis (Timor Leste) 🇹🇱' }
];

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en_us');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES_ANALYSIS[0]);
  const [reassuranceMsg, setReassuranceMsg] = useState("");
  const [currentFunFact, setCurrentFunFact] = useState<string | null>(null);
  const [showFunFact, setShowFunFact] = useState(false);
  
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const funFactTimerRef = useRef<number | null>(null);
  const timeoutTimerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isWaiting = isAnalyzing || isTranscribing || isRecording || isSpeaking;

  useEffect(() => {
    (async () => {
      try {
        const [d, h, s, c, l, dy] = await Promise.all([
          getData(STORE_DRAFT, KEY_CURRENT_DRAFT),
          getData(STORE_HISTORY, KEY_HISTORY_LIST),
          getData(STORE_SETTINGS, KEY_PREF_STYLE),
          getData(STORE_SETTINGS, KEY_PREF_CONTEXT),
          getData(STORE_SETTINGS, KEY_PREF_LANG),
          getData(STORE_SETTINGS, KEY_DYSLEXIA)
        ]);
        if (d) setInputText(d);
        if (h) setHistory(h);
        if (s) setSelectedStyle(s);
        if (c) setSelectedContext(c);
        if (l) setTargetLang(l);
        if (dy !== undefined) setIsDyslexiaMode(dy);
        setMascotMessage("Selamat datang kembali, Sahabat Aksara. Aku Tara, mari merawat naskahmu.");
      } catch (err) {
        console.warn("Hydration error:", err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  const handleCancelProcess = useCallback((silent = false) => {
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setShowFunFact(false);
    setCurrentFunFact(null);
    if (funFactTimerRef.current) window.clearTimeout(funFactTimerRef.current);
    if (timeoutTimerRef.current) window.clearTimeout(timeoutTimerRef.current);
    if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
    if (!silent) setMascotMessage("Proses dibatalkan sesuai permintaanmu, Sahabat.");
  }, [isRecording]);

  useEffect(() => {
    if (isWaiting && !isRecording) {
      funFactTimerRef.current = window.setTimeout(() => {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        const randomReassurance = REASSURANCE_MESSAGES[Math.floor(Math.random() * REASSURANCE_MESSAGES.length)];
        setCurrentFunFact(randomFact);
        setReassuranceMsg(randomReassurance);
        setShowFunFact(true);
      }, 3000);

      timeoutTimerRef.current = window.setTimeout(() => {
        handleCancelProcess(true);
        setMascotMessage("Maafkan Tara, dahan bahasaku sedikit tersangkut. Mari kita coba lagi nanti.");
      }, 15000);
    } else {
      if (funFactTimerRef.current) window.clearTimeout(funFactTimerRef.current);
      if (timeoutTimerRef.current) window.clearTimeout(timeoutTimerRef.current);
      if (!isWaiting) {
        setShowFunFact(false);
        setCurrentFunFact(null);
      }
    }
    return () => {
      if (funFactTimerRef.current) window.clearTimeout(funFactTimerRef.current);
      if (timeoutTimerRef.current) window.clearTimeout(timeoutTimerRef.current);
    };
  }, [isWaiting, isRecording, handleCancelProcess]);

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

  const handleClear = useCallback(() => {
    if (isBusy) return;
    if (inputText.length > 500 && !confirm("Naskah panjang dideteksi. Hapus?")) return;
    setInputText('');
    setResult(null);
    deleteData(STORE_DRAFT, KEY_CURRENT_DRAFT);
  }, [inputText, isBusy]);

  const stopRecordingManually = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }
  }, [isRecording]);

  const handleMicClick = async () => {
    if (isBusy) return; 
    processActiveRef.current = true;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        setIsTranscribing(true);
        setLoadingMsg(LOADING_MESSAGES_TRANSCRIPTION[Math.floor(Math.random() * LOADING_MESSAGES_TRANSCRIPTION.length)]);
        
        try {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            if (!processActiveRef.current) return;
            const base64Audio = (reader.result as string).split(',')[1];
            const transcribedText = await transcribeAudio(base64Audio, mediaRecorder.mimeType);
            if (processActiveRef.current && transcribedText) {
              setInputText(prev => prev ? `${prev} ${transcribedText}` : transcribedText);
              setMascotMessage("Aku sudah menyalin suaramu ke kotak aksara.");
            }
            setIsTranscribing(false);
            processActiveRef.current = false;
          };
        } catch (error) {
          console.error("Transcription failed:", error);
          if (processActiveRef.current) setMascotMessage("Maaf, aku kesulitan menangkap suaramu. Coba lagi ya?");
          setIsTranscribing(false);
          processActiveRef.current = false;
        }
        stream.getTracks().forEach(track => track.stop());
      };

      setIsRecording(true);
      setRecordingCountdown(5);
      mediaRecorder.start();

      countdownIntervalRef.current = window.setInterval(() => {
        setRecordingCountdown(prev => {
          if (prev <= 1) {
            stopRecordingManually();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Mic access denied:", err);
      alert("Tara butuh izin mikrofon untuk mendengar suaramu.");
      processActiveRef.current = false;
    }
  };

  const handleAnalyze = async (plagiarism: boolean = false) => {
    if (!inputText.trim() || isBusy) return;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setLoadingMsg(LOADING_MESSAGES_ANALYSIS[Math.floor(Math.random() * LOADING_MESSAGES_ANALYSIS.length)]);
    
    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current) return;
      setResult(data);
      setMascotMessage(data.summary);
      
      const newItem: HistoryItem = {
        id: Date.now().toString(36),
        timestamp: Date.now(),
        originalText: inputText,
        result: data,
        options: { style: selectedStyle, context: selectedContext }
      };
      setHistory(prev => [newItem, ...prev].slice(0, 30));
      setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error("Analyze error:", error);
      if (processActiveRef.current) setMascotMessage("Dahanku berguncang, ada kendala teknis. Coba lagi ya.");
    } finally {
      setIsAnalyzing(false);
      processActiveRef.current = false;
    }
  };

  const handleSpeech = async () => {
    if (isBusy) return;
    const textToRead = result?.correctedText || inputText;
    const translationToRead = result?.translation?.translatedText;
    if (!textToRead.trim()) return;

    processActiveRef.current = true;
    setIsSpeaking(true);
    setLoadingMsg(LOADING_MESSAGES_SPEECH[Math.floor(Math.random() * LOADING_MESSAGES_SPEECH.length)]);
    
    try {
      await generateSpeech(textToRead, translationToRead);
      setMascotMessage("Begitulah alunan aksaramu jika diucapkan, Sahabat.");
    } catch (error: any) {
      console.error("Speech interaction failed:", error);
      if (error.message?.includes("INTERNAL")) {
         setMascotMessage("Maaf, pita suaraku sedang serak (Internal Error). Coba dengan teks yang lebih pendek.");
      } else {
         setMascotMessage("Aduh, suaraku tersangkut di dahan. Coba sebentar lagi ya?");
      }
    } finally {
      setIsSpeaking(false);
      processActiveRef.current = false;
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-forest-50 dark:bg-forest-950 text-emerald-600 font-bold animate-pulse">Menyiapkan Aksara...</div>;

  const getActiveModal = () => {
    if (isHistoryModalOpen) return 'history';
    if (isGuideModalOpen) return 'guide';
    if (isDevModalOpen) return 'dev';
    return null;
  };

  return (
    <Layout 
      activeModal={getActiveModal()}
      onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
      onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
      onDevClick={() => !isBusy && setIsDevModalOpen(true)}
      onEditorClick={() => { if(!isBusy) { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsDevModalOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}}
    >
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <div className="relative group">
          <button 
            disabled={isBusy} 
            onClick={() => setIsDyslexiaMode(!isDyslexiaMode)} 
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white' : 'bg-white dark:bg-[#1a110c] text-amber-600 hover:scale-110 active:scale-90'} ${isBusy ? 'opacity-50 cursor-not-allowed' : ''}`} 
            title="Mode Disleksia"
          >
            <span className="font-bold text-xl">D</span>
          </button>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/90 dark:bg-forest-900/90 backdrop-blur-md rounded-xl shadow-lg text-emerald-800 dark:text-emerald-200 text-xs font-bold whitespace-nowrap opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-emerald-50 dark:border-emerald-800/30">
            Mode Disleksia: Memudahkan pembacaan naskah bagi Sahabat.
          </div>
        </div>

        <div className="relative group">
          <button 
            onClick={handleMicClick}
            disabled={isBusy}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-rose-600 transition-all ${isBusy ? 'opacity-50 cursor-not-allowed scale-90' : 'hover:scale-110 active:scale-90'}`}
            title="Petik Suara (Dikte)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/90 dark:bg-forest-900/90 backdrop-blur-md rounded-xl shadow-lg text-emerald-800 dark:text-emerald-200 text-xs font-bold whitespace-nowrap opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-emerald-50 dark:border-emerald-800/30">
            Petik Suara: Tara akan menyalin ucapanmu menjadi aksara.
          </div>
        </div>

        <div className="relative group">
          <button 
            onClick={handleSpeech} 
            disabled={isBusy}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-emerald-600 transition-all ${isBusy ? 'opacity-50 cursor-not-allowed scale-90' : 'hover:scale-110 active:scale-90'}`}
            title={isSpeaking ? "Tara sedang membacakan..." : "Bacakan Naskah"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              {isSpeaking ? (
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
              ) : (
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              )}
            </svg>
          </button>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/90 dark:bg-forest-900/90 backdrop-blur-md rounded-xl shadow-lg text-emerald-800 dark:text-emerald-200 text-xs font-bold whitespace-nowrap opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-emerald-50 dark:border-emerald-800/30">
            Bacakan Naskah: Dengarkan Tara melantunkan naskahmu.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl w-full mx-auto pb-32">
        <div className="lg:col-span-8 space-y-8">
          <Mascot message={mascotMessage} isLoading={isWaiting} onAskInfo={async () => {
            if (isBusy) return;
            setIsAnalyzing(true);
            const info = await askTaraAboutPlatform();
            setMascotMessage(info);
            setIsAnalyzing(false);
          }} />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-forest-900 p-6 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800/20">
            {[ 
              { label: 'Gaya', val: selectedStyle, set: setSelectedStyle, opt: STYLE_OPTIONS },
              { label: 'Konteks', val: selectedContext, set: setSelectedContext, opt: CONTEXT_OPTIONS },
              { label: 'Bahasa Target', val: targetLang, set: setTargetLang, opt: LANG_OPTIONS }
            ].map((cfg, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] ml-4">{cfg.label}</label>
                <select disabled={isBusy} value={cfg.val as string} onChange={(e) => cfg.set(e.target.value as any)} className="bg-forest-50 dark:bg-forest-950 p-3.5 rounded-2xl font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-transparent focus:border-emerald-200 transition-colors disabled:opacity-50">
                  {cfg.opt.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            ))}
          </section>

          <section className="bg-white dark:bg-forest-900 rounded-[3.5rem] p-6 md:p-10 shadow-xl relative border border-emerald-50 dark:border-emerald-800/20">
            {isWaiting && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-forest-950/95 backdrop-blur-md rounded-[3.5rem] p-10 text-center animate-in fade-in duration-500">
                {isRecording ? (
                  <div className="flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping"></div>
                      <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-600/40">
                         <span className="text-4xl font-bold text-white">{recordingCountdown}</span>
                      </div>
                    </div>
                    <p className="mt-8 text-rose-800 dark:text-rose-400 font-bold text-2xl uppercase tracking-widest">Mendengarkan...</p>
                    <p className="mt-2 text-emerald-900/40 dark:text-emerald-400/30 text-sm italic">Ucapkan naskahmu sekarang, Sahabat.</p>
                    <button 
                      onClick={stopRecordingManually}
                      className="mt-10 px-8 py-3 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full font-bold hover:bg-rose-100 transition-colors shadow-lg"
                    >
                      Selesaikan Cepat
                    </button>
                  </div>
                ) : !showFunFact ? (
                  <>
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="mt-8 text-emerald-900 dark:text-emerald-50 font-bold italic text-xl">{loadingMsg}</p>
                    <p className="mt-4 text-emerald-800/40 dark:text-emerald-400/30 text-xs font-bold uppercase tracking-widest">Satu momen lagi, Sahabat...</p>
                    {(!isTranscribing && !isSpeaking) && (
                      <button 
                        onClick={() => handleCancelProcess()}
                        className="mt-10 px-6 py-2 border-2 border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-bold hover:bg-emerald-50 transition-colors"
                      >
                        Batalkan Proses
                      </button>
                    )}
                  </>
                ) : (
                  <div className="max-w-md animate-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-6 flex justify-center">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                      </div>
                    </div>
                    <h5 className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm mb-3">Tahukah Kamu?</h5>
                    <p className="text-emerald-950 dark:text-emerald-50 text-xl leading-relaxed font-medium italic mb-4">"{currentFunFact}"</p>
                    <p className="text-emerald-600/60 dark:text-emerald-400/50 text-sm font-bold italic">{reassuranceMsg}</p>
                    <div className="mt-8 flex items-center justify-center gap-2 mb-8">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-150"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-300"></span>
                    </div>
                    {(!isTranscribing && !isSpeaking) && (
                      <button 
                        onClick={() => handleCancelProcess()}
                        className="px-6 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-bold hover:bg-rose-100 transition-colors shadow-sm"
                      >
                        Batalkan
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            <textarea
              value={inputText}
              disabled={isBusy}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan naskahmu di sini..."
              className="w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-emerald-950 dark:text-emerald-50 text-xl leading-relaxed placeholder-emerald-100 disabled:opacity-50"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => handleAnalyze(false)} 
                disabled={!inputText.trim() || isBusy} 
                className="flex-1 py-5 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all active:scale-95 shadow-lg shadow-emerald-700/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Koreksi & Terjemahkan Otomatis
              </button>
              <button 
                onClick={() => handleAnalyze(true)} 
                disabled={!inputText.trim() || isBusy} 
                className="flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Cek Plagiarisme
              </button>
            </div>
            {inputText && !isBusy && (
              <button onClick={handleClear} className="absolute top-8 right-8 text-rose-400 hover:text-rose-600 font-bold uppercase text-xs tracking-widest">
                Hapus
              </button>
            )}
          </section>

          {result && !isAnalyzing && !isTranscribing && (
            <div id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-emerald-50/40 dark:bg-forest-950/40 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[10px] font-bold text-emerald-700/40 uppercase tracking-[0.3em]">Hasil Perbaikan</h2>
                    <span className="text-xs font-bold text-emerald-600 bg-white dark:bg-forest-900 px-3 py-1 rounded-full">Skor: {result.styleScore}%</span>
                  </div>
                  <p className="text-xl text-emerald-950 dark:text-emerald-50 whitespace-pre-wrap leading-relaxed mb-4">{result.correctedText}</p>
                  {result.readingGuideIndo && (
                    <div className="bg-white/50 dark:bg-forest-900/50 p-4 rounded-2xl border border-emerald-100/50">
                      <h4 className="text-[9px] font-bold text-emerald-800/40 uppercase tracking-widest mb-1">Cara Baca (Pemenggalan):</h4>
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium italic">{result.readingGuideIndo}</p>
                    </div>
                  )}
               </div>

               {result.translation && (
                 <div id="translation-section" className="bg-[#fff9f0] dark:bg-[#1a1410] p-10 rounded-[3rem] border border-amber-100/30">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-[10px] font-bold text-amber-800/40 uppercase tracking-[0.3em]">Terjemahan ({result.translation.languageName})</h2>
                    </div>
                    <p className="text-xl text-amber-950 dark:text-amber-50 whitespace-pre-wrap leading-relaxed mb-6 font-medium">
                      {result.translation.translatedText}
                    </p>
                    <div className="bg-white/40 dark:bg-black/20 p-5 rounded-2xl border border-amber-200/20">
                      <h4 className="text-[9px] font-bold text-amber-800/40 uppercase tracking-widest mb-1">Cara Membaca (Fonetik Indonesia):</h4>
                      <p className="text-amber-900 dark:text-amber-200 font-bold italic text-lg">
                        {result.translation.readingGuide}
                      </p>
                    </div>
                 </div>
               )}
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.suggestions.map((s, idx) => (
                  <div key={idx} className="bg-white dark:bg-forest-900 p-5 rounded-3xl border border-emerald-50 dark:border-emerald-800/10 shadow-sm">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 mb-2 block">{s.type}</span>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="line-through text-rose-300 text-sm">{s.original}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">→ {s.replacement}</span>
                    </div>
                    <p className="text-xs text-emerald-900/40 dark:text-emerald-500/50 italic mb-3">{s.reason}</p>
                    <div className="flex gap-2">
                      {s.type === 'Ejaan' && <a href={`https://kbbi.kemdikbud.go.id/entri/${s.replacement}`} target="_blank" className="text-[9px] font-bold text-rose-400 uppercase tracking-widest hover:underline">KBBI ↗</a>}
                      {s.type === 'Gaya Bahasa' && <a href={`https://tesaurus.kemendikdasmen.go.id/tematis/cari/${s.replacement}`} target="_blank" className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest hover:underline">Tesaurus ↗</a>}
                    </div>
                  </div>
                ))}
               </div>

               {result.plagiarism && (
                 <div className="bg-white dark:bg-forest-900 p-8 rounded-[2.5rem] border border-rose-100 dark:border-rose-900/20">
                    <h3 className="text-[10px] font-bold text-rose-800/40 uppercase tracking-widest mb-4">Audit Kemiripan</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full border-4 border-rose-100 flex items-center justify-center font-bold text-rose-600">{result.plagiarism.score}%</div>
                      <p className="text-emerald-950 dark:text-emerald-50/70 font-medium">{result.plagiarism.summary}</p>
                    </div>
                    {result.plagiarism.sources.length > 0 && (
                      <div className="space-y-2">
                        {result.plagiarism.sources.map((src, i) => (
                          <a key={i} href={src.uri} target="_blank" className="block p-3 bg-rose-50/50 dark:bg-rose-900/10 rounded-xl text-xs text-rose-700 hover:bg-rose-100 transition-colors truncate">
                            {src.title} ↗
                          </a>
                        ))}
                      </div>
                    )}
                 </div>
               )}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-forest-900 p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800/10 sticky top-8">
            <h2 className="text-[10px] font-bold text-emerald-700/30 uppercase tracking-[0.3em] mb-6">Jejak Lokal</h2>
            <div className="space-y-4">
              {history.slice(0, 4).map(item => <HistoryCard key={item.id} item={item} onSelect={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); window.scrollTo({top:0, behavior:'smooth'}); } }} />)}
              {history.length === 0 && <p className="text-center py-10 text-emerald-900/10 italic">Kotak jejak masih kosong.</p>}
            </div>
            {history.length > 4 && <button disabled={isBusy} onClick={() => setIsHistoryModalOpen(true)} className="w-full mt-6 text-emerald-600 font-bold text-sm hover:underline disabled:opacity-30">Lihat Semua Jejak →</button>}
          </div>
        </aside>
      </div>

      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); } }} onClearAll={() => { if(!isBusy && confirm("Hapus semua?")) { setHistory([]); clearStore(STORE_HISTORY); } }} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
      <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </Layout>
  );
};

export default App;
