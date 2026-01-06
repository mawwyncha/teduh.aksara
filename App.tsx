import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { DeveloperModal } from './components/DeveloperModal';
import { PermissionModal } from './components/PermissionModal';
import { LimitModal } from './components/LimitModal';
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

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en_us');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Usage tracking
  const [usageCount, setUsageCount] = useState(0);
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES_ANALYSIS[0]);
  
  const [permissionType, setPermissionType] = useState<'mic' | 'plagiarism' | null>(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isWaiting = isAnalyzing || isTranscribing || isRecording || isSpeaking;
  const isLimitReached = usageCount >= MAX_DAILY_REQUESTS;

  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
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

        // Reset usage if day has changed
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

  const incrementUsage = useCallback(async () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
  }, [usageCount]);

  const handleCancelProcess = useCallback((silent = false) => {
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
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
    if (isLimitReached) {
      setIsLimitModalOpen(true);
      return;
    }

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
              incrementUsage();
            }
            setIsTranscribing(false);
            processActiveRef.current = false;
          };
        } catch (error) {
          console.error("Transcription failed:", error);
          if (processActiveRef.current) setMascotMessage("Maaf, aku kesulitan menangkap suaramu.");
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
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();
              setIsRecording(false);
            }
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      alert("Tara butuh izin mikrofon.");
      processActiveRef.current = false;
    }
  };

  const handleMicClick = () => {
    if (isBusy) return; 
    if (isLimitReached) {
      setIsLimitModalOpen(true);
      return;
    }
    setPermissionType('mic');
  };

  const executeAnalysis = async (plagiarism: boolean) => {
    if (isLimitReached) {
      setIsLimitModalOpen(true);
      return;
    }

    processActiveRef.current = true;
    setIsAnalyzing(true);
    setLoadingMsg(LOADING_MESSAGES_ANALYSIS[Math.floor(Math.random() * LOADING_MESSAGES_ANALYSIS.length)]);
    
    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current) return;
      setResult(data);
      setMascotMessage(data.summary);
      incrementUsage();
      
      const newItem: HistoryItem = {
        id: Date.now().toString(36),
        timestamp: Date.now(),
        originalText: inputText,
        result: data,
        options: { style: selectedStyle, context: selectedContext }
      };
      setHistory(prev => [newItem, ...prev].slice(0, 30));
    } catch (error) {
      if (processActiveRef.current) setMascotMessage("Dahanku berguncang, coba lagi ya.");
    } finally {
      setIsAnalyzing(false);
      processActiveRef.current = false;
    }
  };

  const handleAnalyze = async (plagiarism: boolean = false) => {
    if (!inputText.trim() || isBusy) return;
    if (isLimitReached) {
      setIsLimitModalOpen(true);
      return;
    }
    if (plagiarism) {
      setPermissionType('plagiarism');
    } else {
      executeAnalysis(false);
    }
  };

  const handleSpeech = async () => {
    if (isBusy) return;
    if (isLimitReached) {
      setIsLimitModalOpen(true);
      return;
    }
    const textToRead = result?.correctedText || inputText;
    const translationToRead = result?.translation?.translatedText;
    if (!textToRead.trim()) return;

    processActiveRef.current = true;
    setIsSpeaking(true);
    setLoadingMsg(LOADING_MESSAGES_SPEECH[Math.floor(Math.random() * LOADING_MESSAGES_SPEECH.length)]);
    
    try {
      await generateSpeech(textToRead, translationToRead);
      setMascotMessage("Begitulah alunan aksaramu jika diucapkan, Sahabat.");
      incrementUsage();
    } catch (error: any) {
      setMascotMessage("Aduh, suaraku tersangkut di dahan.");
    } finally {
      setIsSpeaking(false);
      processActiveRef.current = false;
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-forest-50 dark:bg-forest-950 text-emerald-600 font-bold animate-pulse">Menyiapkan Aksara...</div>;

  return (
    <Layout 
      activeModal={isHistoryModalOpen ? 'history' : isGuideModalOpen ? 'guide' : isDevModalOpen ? 'dev' : null}
      onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
      onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
      onDevClick={() => !isBusy && setIsDevModalOpen(true)}
      onEditorClick={() => { if(!isBusy) { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsDevModalOpen(false); window.scrollTo({top:0, behavior:'smooth'}); }}}
    >
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button 
          disabled={isBusy} 
          onClick={() => setIsDyslexiaMode(!isDyslexiaMode)} 
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white' : 'bg-white dark:bg-[#1a110c] text-amber-600 hover:scale-110 active:scale-90'}`}
        >
          <span className="font-bold text-xl">D</span>
        </button>

        <button 
          onClick={handleMicClick}
          disabled={isBusy}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-rose-600 transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${isLimitReached ? 'grayscale opacity-50' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>

        <button 
          onClick={handleSpeech} 
          disabled={isBusy}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#1a110c] shadow-2xl flex items-center justify-center text-emerald-600 transition-all ${isBusy ? 'opacity-50' : 'hover:scale-110 active:scale-90'} ${isLimitReached ? 'grayscale opacity-50' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl w-full mx-auto pb-32">
        <div className="lg:col-span-8 space-y-8">
          <Mascot message={mascotMessage} isLoading={isWaiting} onAskInfo={async () => {
            if (isBusy) return;
            const info = await askTaraAboutPlatform();
            setMascotMessage(info);
          }} />

          {/* Progress Bar Kuota */}
          <div className="bg-white dark:bg-forest-900 p-4 rounded-2xl border border-emerald-50 dark:border-emerald-800/20 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-widest">Sisa Kuota Harian</span>
                <span className="text-[10px] font-bold text-emerald-800">{MAX_DAILY_REQUESTS - usageCount} / {MAX_DAILY_REQUESTS}</span>
             </div>
             <div className="w-full h-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${isLimitReached ? 'bg-rose-500' : 'bg-emerald-600'}`} 
                  style={{ width: `${(usageCount / MAX_DAILY_REQUESTS) * 100}%` }}
                ></div>
             </div>
          </div>

          <section className="bg-white dark:bg-forest-900 rounded-[3.5rem] p-6 md:p-10 shadow-xl relative border border-emerald-50 dark:border-emerald-800/20">
            {isWaiting && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-forest-950/95 backdrop-blur-md rounded-[3.5rem] p-10 text-center animate-in fade-in">
                {isRecording ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping"></div>
                      <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center shadow-lg"><span className="text-4xl font-bold text-white">{recordingCountdown}</span></div>
                    </div>
                    <p className="mt-8 text-rose-800 dark:text-rose-400 font-bold text-2xl uppercase tracking-widest">Mendengarkan...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="mt-8 text-emerald-900 dark:text-emerald-50 font-bold italic text-xl">{loadingMsg}</p>
                    <button onClick={() => handleCancelProcess()} className="mt-10 px-6 py-2 border-2 border-emerald-100 rounded-full text-sm font-bold text-emerald-600">Batalkan</button>
                  </>
                )}
              </div>
            )}
            <textarea
              value={inputText}
              disabled={isBusy}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan naskahmu di sini..."
              className="w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-emerald-950 dark:text-emerald-50 text-xl leading-relaxed placeholder-emerald-100"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => handleAnalyze(false)} 
                disabled={!inputText.trim() || isBusy || isLimitReached} 
                className={`flex-1 py-5 bg-emerald-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-700/20 disabled:opacity-30 ${isLimitReached ? 'grayscale cursor-not-allowed' : ''}`}
              >
                Koreksi & Terjemahkan
              </button>
              <button 
                onClick={() => handleAnalyze(true)} 
                disabled={!inputText.trim() || isBusy || isLimitReached} 
                className={`flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg disabled:opacity-30 ${isLimitReached ? 'grayscale cursor-not-allowed' : ''}`}
              >
                Cek Plagiarisme
              </button>
            </div>
          </section>

          {result && !isAnalyzing && !isTranscribing && (
            <div id="result-section" className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-emerald-50/40 dark:bg-forest-950/40 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30">
                  <h2 className="text-[10px] font-bold text-emerald-700/40 uppercase tracking-[0.3em] mb-4">Hasil Perbaikan</h2>
                  <p className="text-xl text-emerald-950 dark:text-emerald-50 whitespace-pre-wrap leading-relaxed">{result.correctedText}</p>
               </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white dark:bg-forest-900 p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-emerald-800/10 sticky top-8">
            <h2 className="text-[10px] font-bold text-emerald-700/30 uppercase tracking-[0.3em] mb-6">Jejak Lokal</h2>
            <div className="space-y-4">
              {history.slice(0, 4).map(item => <HistoryCard key={item.id} item={item} onSelect={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); window.scrollTo({top:0, behavior:'smooth'}); } }} />)}
              {history.length === 0 && <p className="text-center py-10 text-emerald-900/10 italic">Kotak jejak masih kosong.</p>}
            </div>
          </div>
        </aside>
      </div>

      {permissionType && <PermissionModal type={permissionType} onAccept={() => { if (permissionType === 'mic') startMicProcess(); else if (permissionType === 'plagiarism') executeAnalysis(true); setPermissionType(null); }} onDeny={() => setPermissionType(null)} />}
      
      <LimitModal isOpen={isLimitReached && isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
      
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={(it) => { if(!isBusy) { setInputText(it.originalText); setResult(it.result); } }} onClearAll={() => { if(!isBusy && confirm("Hapus semua?")) { setHistory([]); clearStore(STORE_HISTORY); } }} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
      <DeveloperModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </Layout>
  );
};

export default App;