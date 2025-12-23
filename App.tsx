
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { AuthModal } from './components/AuthModal';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { analyzeGrammar, generateSpeech } from './services/geminiService';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext } from './types';

const INITIAL_MASCOT_MESSAGE = "Selamat datang di bawah rimbunnya dahanku, Sahabat. Aku Tara. Gunakan fitur suara jika ingin aku membacakannya untukmu.";

const FUN_FACTS = [
  "Palindrom terpanjang dalam Bahasa Indonesia yang populer adalah 'KASUR INI RUSAK'.",
  "Bahasa Indonesia adalah bahasa ke-9 yang paling banyak digunakan di dunia.",
  "Kata 'Air' adalah salah satu kata dasar asli Austronesia yang tidak berubah selama ribuan tahun.",
  "Bahasa Indonesia memiliki lebih dari 110.000 lema (kata) dalam KBBI daring terbaru.",
  "Huruf 'Q' dan 'X' biasanya hanya ditemukan dalam kata serapan asing dalam Bahasa Indonesia.",
  "Bahasa Indonesia ditetapkan sebagai bahasa resmi Sidang Umum UNESCO pada tahun 2023."
];

const ZEN_QUOTES = [
  "Bahasa adalah cermin bangsa.",
  "Kata yang baik adalah sedekah.",
  "Rawatlah aksara, maka makna akan menjagamu.",
  "Keindahan bahasa terletak pada ketepatannya.",
  "Menulis adalah menanam benih keabadian."
];

const LOADING_MESSAGES = [
  "Menghirup makna, menghembus kata...",
  "Menyisir dahan literasi...",
  "Menenangkan riuh aksara...",
  "Mencari embun di sela kalimat...",
  "Tara sedang menata ranting bahasa..."
];

const STYLE_LABELS: Record<WritingStyle, string> = {
  formal: 'Baku',
  casual: 'Luwes',
  academic: 'Ilmiah',
  creative: 'Kreatif'
};

const CONTEXT_LABELS: Record<WritingContext, string> = {
  business: 'Bisnis',
  education: 'Edukasi',
  social_media: 'Sosmed',
  general: 'Umum'
};

interface User {
  name: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<'grammar' | 'plagiarism' | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mascotMessage, setMascotMessage] = useState(INITIAL_MASCOT_MESSAGE);
  
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const recognitionRef = useRef<any>(null);

  const randomFact = useMemo(() => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)], []);
  const zenQuote = useMemo(() => ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)], []);

  // Lock scroll when any modal is open
  useEffect(() => {
    if (isHistoryModalOpen || isGuideModalOpen || isAuthOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isHistoryModalOpen, isGuideModalOpen, isAuthOpen]);

  useEffect(() => {
    if (isDyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [isDyslexiaMode]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0])
          .map((res: any) => res.transcript)
          .join('');
        setInputText(transcript);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Mic Error:", e);
      }
    }
  };

  const handleAnalyze = async (withPlagiarism: boolean = false) => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisType(withPlagiarism ? 'plagiarism' : 'grammar');
    setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    if (withPlagiarism) {
      setMascotMessage("Sedang menelusuri dahan internet untuk mengecek plagiarisme...");
    }
    
    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, withPlagiarism);
      setResult(data);
      setMascotMessage(data.summary);
      
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        originalText: inputText,
        result: data,
        options: { style: selectedStyle, context: selectedContext }
      };
      
      setHistory(prev => [newItem, ...prev].slice(0, 50));
      
      // Scroll to result on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      setMascotMessage("Dahanku berguncang! Ada kendala saat memproses.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisType(null);
    }
  };

  const exportToWord = () => {
    if (!result) return;
    const blob = new Blob([result.correctedText], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Teduh_Aksara_Kersen.doc';
    link.click();
  };

  const exportToGDocs = () => {
    window.open('https://docs.google.com/create', '_blank');
    navigator.clipboard.writeText(result?.correctedText || "");
    setMascotMessage("Naskah disalin! Rekatkan di Google Docs.");
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setInputText(item.originalText);
    setResult(item.result);
    setSelectedStyle(item.options.style);
    setSelectedContext(item.options.context);
    setMascotMessage("Naskah lama dipulihkan.");
    setIsHistoryModalOpen(false);
  };

  const playVoice = () => {
    if (result) generateSpeech(result.correctedText);
    else if (inputText) generateSpeech(inputText);
  };

  const openHistory = () => {
    setIsGuideModalOpen(false);
    setIsAuthOpen(false);
    setIsHistoryModalOpen(true);
  };

  const openGuide = () => {
    setIsHistoryModalOpen(false);
    setIsAuthOpen(false);
    setIsGuideModalOpen(true);
  };

  const closeModals = () => {
    setIsHistoryModalOpen(false);
    setIsGuideModalOpen(false);
    setIsAuthOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout 
      user={user} 
      activeModal={isHistoryModalOpen ? 'history' : (isGuideModalOpen ? 'guide' : null)}
      onAuthClick={() => { setIsHistoryModalOpen(false); setIsGuideModalOpen(false); setIsAuthOpen(true); }} 
      onLogout={() => setUser(null)}
      onHistoryClick={openHistory}
      onGuideClick={openGuide}
      onEditorClick={closeModals}
    >
      {/* Global Sticky Loading Bar for Mobile Visibility */}
      {isAnalyzing && (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-emerald-100 dark:bg-emerald-900 overflow-hidden">
          <div className="h-full bg-rose-500 animate-[shimmer_1.5s_infinite_linear]" style={{ width: '40%', backgroundSize: '200% 100%' }}></div>
        </div>
      )}

      {/* Floating Zen Focus Icon */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] group pointer-events-auto">
        <div className="fixed inset-0 bg-[#1a0f0e]/90 backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 -z-10" />
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-rose-600 dark:bg-rose-500 text-white rounded-full shadow-2xl flex items-center justify-center cursor-help transition-all duration-1000 ease-in-out 
            group-hover:fixed group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 
            group-hover:scale-[2.5] md:group-hover:scale-[3] group-hover:bg-transparent group-hover:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse md:w-8 md:h-8">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="absolute top-20 md:top-24 opacity-0 group-hover:opacity-100 group-hover:fixed group-hover:top-[60%] group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-1000 delay-300 text-center w-64 md:w-80 px-4">
            <p className="text-rose-100 text-lg md:text-xl font-medium italic mb-2">"{zenQuote}"</p>
            <p className="text-emerald-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">Teduh Batin</p>
          </div>
        </div>
      </div>

      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-40 scale-90 md:scale-100">
        <div className="relative group/tooltip">
          <button 
            onClick={() => setIsDyslexiaMode(!isDyslexiaMode)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white scale-110' : 'bg-white dark:bg-[#2d1e17] text-amber-600 hover:scale-105'}`}
          >
            <span className="font-bold text-lg md:text-xl">D</span>
          </button>
          <div className="absolute left-14 md:left-16 top-1/2 -translate-y-1/2 bg-[#2d1e17] text-amber-100 text-[8px] md:text-[10px] py-1 md:py-1.5 px-2 md:px-3 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold shadow-xl">
            {isDyslexiaMode ? "Font Normal" : "Font Disleksia"}
          </div>
        </div>

        <div className="relative group/tooltip">
          <button 
            onClick={playVoice}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#2d1e17] shadow-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>
          <div className="absolute left-14 md:left-16 top-1/2 -translate-y-1/2 bg-[#0a1a12] text-emerald-100 text-[8px] md:text-[10px] py-1 md:py-1.5 px-2 md:px-3 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold shadow-xl">
            Dengarkan Naskah
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Mascot message={mascotMessage} isLoading={isAnalyzing} />

          <div className="bg-[#fdfcfb] dark:bg-[#121a16] p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row gap-4 md:gap-6 items-stretch shadow-sm">
            <div className="flex flex-col gap-2 md:gap-3 flex-1">
              <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] ml-2 md:ml-4">Gaya Semai</label>
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 bg-[#f8f5f2] dark:bg-[#0a120e] p-1.5 md:p-2 rounded-[1.5rem] md:rounded-[2rem]">
                {(Object.keys(STYLE_LABELS) as WritingStyle[]).map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`py-2 md:py-3.5 rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all ${selectedStyle === style ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-md' : 'text-emerald-600 dark:text-emerald-300 hover:bg-white dark:hover:bg-emerald-900/40'}`}
                  >
                    {STYLE_LABELS[style]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-3 flex-1">
              <label className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.2em] ml-2 md:ml-4">Ranah Akar</label>
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 bg-[#f8f5f2] dark:bg-[#0a120e] p-1.5 md:p-2 rounded-[1.5rem] md:rounded-[2rem]">
                {(Object.keys(CONTEXT_LABELS) as WritingContext[]).map(ctx => (
                  <button
                    key={ctx}
                    onClick={() => setSelectedContext(ctx)}
                    className={`py-2 md:py-3.5 rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all ${selectedContext === ctx ? 'bg-rose-600 dark:bg-red-700 text-white shadow-md' : 'text-rose-700 dark:text-red-400 hover:bg-white dark:hover:bg-emerald-900/40'}`}
                  >
                    {CONTEXT_LABELS[ctx]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0d1410] rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl flex flex-col min-h-[400px] md:min-h-[500px] relative overflow-hidden">
            {isAnalyzing && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-[#05140d]/80 backdrop-blur-md animate-in fade-in duration-700">
                <div className="relative scale-75 md:scale-100">
                  <div className="w-16 h-16 md:w-20 md:h-20 border-6 md:border-8 border-emerald-100 dark:border-emerald-900/50 rounded-full"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 border-6 md:border-8 border-rose-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-6 md:mt-8 text-emerald-900 dark:text-emerald-50 text-lg md:text-xl font-bold italic animate-pulse px-4 text-center">{loadingMsg}</p>
              </div>
            )}

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan naskahmu di sini..."
              className="flex-1 w-full bg-transparent p-2 md:p-4 rounded-xl resize-none border-none outline-none text-emerald-950 dark:text-emerald-50 placeholder-emerald-800/20 dark:placeholder-emerald-200/10 text-xl md:text-2xl leading-relaxed font-medium"
            />

            <div className="absolute right-6 bottom-32 md:right-14 md:bottom-36">
              <button 
                onClick={toggleListening}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-110 animate-pulse' : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 hover:scale-110'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[30px] md:h-[30px]">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-5 mt-8 md:mt-10">
              <button
                onClick={() => handleAnalyze(false)}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-8 md:px-12 py-4 md:py-6 bg-emerald-700 dark:bg-emerald-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-bold text-lg md:text-xl flex items-center justify-center gap-3 shadow-xl disabled:opacity-30 relative overflow-hidden"
              >
                {isAnalyzing && analysisType === 'grammar' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Menata Ranting...</span>
                  </div>
                ) : (
                  <>🌱 Koreksi Naskah</>
                )}
              </button>
              <button
                onClick={() => handleAnalyze(true)}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-8 md:px-12 py-4 md:py-6 premium-shimmer text-white rounded-[1.5rem] md:rounded-[2rem] font-bold text-lg md:text-xl shadow-xl flex items-center justify-center disabled:opacity-30 relative overflow-hidden"
              >
                {isAnalyzing && analysisType === 'plagiarism' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Menelusuri Akar...</span>
                  </div>
                ) : (
                  <>🔍 Cek Plagiarisme</>
                )}
              </button>
            </div>
          </div>

          {result && !isAnalyzing && (
            <div id="result-section" className="flex flex-col gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-[#f0f9f4] dark:bg-[#08120c] p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] shadow-xl">
                  <div className="flex items-center justify-between mb-6 md:mb-10 flex-wrap gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[10px] font-bold text-emerald-800/40 dark:text-emerald-400/30 uppercase tracking-[0.3em]">Hasil Semai</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 md:gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-[8px] md:text-[10px] font-bold text-emerald-600/60 dark:text-emerald-400/40 uppercase tracking-widest whitespace-nowrap">Audit KBBI & EYD V</span>
                        </div>
                        <span className="hidden sm:block text-emerald-200">|</span>
                        <span className="text-[7px] md:text-[9px] text-emerald-800/30 dark:text-emerald-200/20 italic font-bold">Terverifikasi sesuai standar Kemdikbud</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                       <span className="text-xs md:text-sm font-bold text-rose-600 dark:text-red-400 bg-white dark:bg-[#1a1410] px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm">Kualitas: {result.styleScore}%</span>
                       <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#05140d] rounded-full shadow-inner">
                         <button onClick={exportToWord} className="p-2 md:p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors" title="Export to Word">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[22px] md:h-[22px]"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                         </button>
                         <button onClick={exportToGDocs} className="p-2 md:p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors" title="Copy for Google Docs">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[22px] md:h-[22px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                         </button>
                         <button onClick={() => navigator.clipboard.writeText(result.correctedText)} className="p-2 md:p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors" title="Copy to Clipboard">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[22px] md:h-[22px]"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                         </button>
                       </div>
                    </div>
                  </div>
                  <p className="text-xl md:text-3xl leading-relaxed text-[#0a2e1f] dark:text-emerald-50 whitespace-pre-wrap font-medium tracking-tight">{result.correctedText}</p>
               </div>

               {result.plagiarism && (
                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-sm">
                   <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h3 className="text-xs md:text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-widest">Plagiarisme</h3>
                      <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold ${result.plagiarism.score > 20 ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        {result.plagiarism.score}%
                      </span>
                   </div>
                   <p className="text-base md:text-lg text-emerald-900/70 dark:text-emerald-100/60 italic mb-4 md:mb-6">"{result.plagiarism.summary}"</p>
                   {result.plagiarism.sources.length > 0 && (
                     <div className="flex flex-wrap gap-2 md:gap-3">
                        {result.plagiarism.sources.map((source, idx) => (
                          <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-emerald-900/30 rounded-full text-[10px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 transition-colors shadow-sm">
                            🔗 {source.title}
                          </a>
                        ))}
                     </div>
                   )}
                </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-[#0a120e] p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-sm group">
                       <span className="px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mb-4 md:mb-6 inline-block">
                         {s.type}
                       </span>
                       <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-5">
                          <span className="line-through text-rose-300 dark:text-rose-900 text-lg md:text-xl">{s.original}</span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xl md:text-2xl">→ {s.replacement}</span>
                       </div>
                       <p className="text-base md:text-lg text-emerald-900/50 dark:text-emerald-100/40 italic leading-relaxed">{s.reason}</p>
                       {s.kbbiLink && (
                         <a href={s.kbbiLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[10px] font-bold text-emerald-600/60 hover:text-emerald-600 hover:underline tracking-widest uppercase">
                           Lihat di KBBI ↗
                         </a>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
          <div className="bg-white dark:bg-[#0a120e] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-lg flex flex-col gap-6 md:gap-8">
             <h3 className="text-[10px] font-bold text-emerald-800/30 dark:text-emerald-400/20 uppercase tracking-[0.3em]">Riwayat</h3>
             <div className="space-y-4 md:space-y-5">
                {history.length > 0 ? history.slice(0, 3).map(item => (
                  <HistoryCard key={item.id} item={item} onSelect={loadHistoryItem} />
                )) : (
                  <div className="py-10 md:py-16 text-center bg-emerald-50/20 dark:bg-[#05140d] rounded-[2rem]">
                     <p className="text-sm md:text-base text-emerald-800/30 dark:text-emerald-200/20 italic font-bold">Belum ada jejak.</p>
                  </div>
                )}
             </div>
             {history.length > 3 && (
               <button onClick={openHistory} className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest hover:underline text-center">Lihat Semua</button>
             )}
          </div>

          <div className="bg-[#fff9f0] dark:bg-[#1a1410] text-[#5c4033] dark:text-amber-100/90 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 shadow-xl">
             <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-200 dark:bg-amber-900/50 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-bounce">💡</div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Fakta Kersen</h3>
             </div>
             <p className="text-lg md:text-xl leading-relaxed font-bold italic opacity-90">"{randomFact}"</p>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={(n) => setUser({name: n})} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} history={history} onSelectItem={loadHistoryItem} />
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
    </Layout>
  );
};

export default App;
