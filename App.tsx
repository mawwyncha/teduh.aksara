
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { AuthModal } from './components/AuthModal';
import { HistoryModal } from './components/HistoryModal';
import { GuideModal } from './components/GuideModal';
import { analyzeGrammar, generateSpeech, askTaraAboutPlatform, translateText } from './services/geminiService';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext, TargetLanguage, TranslationResult } from './types';

const INITIAL_MASCOT_MESSAGE = "Selamat datang di Teduh Aksara. Aku Tara si Pohon Kersen, siap membantumu menyelaraskan naskah agar tumbuh indah.";

const LOADING_MESSAGES = [
  "Tara si Pohon Kersen sedang menyisir diksi...",
  "Menata dahan bahasa, merapikan aksara...",
  "Mencari embun di sela kalimat bersama Tara...",
  "Tara si Pohon Kersen sedang meneliti naskahmu..."
];

const TRANSLATE_LOADING_MESSAGES = [
  "Tara sedang menerbangkan maknamu ke dahan bahasa lain...",
  "Menyulam kata dalam bahasa baru...",
  "Mencari padanan rasa yang selaras...",
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

const LANG_LABELS: Record<TargetLanguage, string> = {
  en: 'English 🇺🇸',
  ja: 'Jepang 🇯🇵',
  ar: 'Arab Sandi 🇸🇦',
  ko: 'Korea 🇰🇷'
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<'grammar' | 'plagiarism' | 'translate' | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mascotMessage, setMascotMessage] = useState(INITIAL_MASCOT_MESSAGE);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const handleClear = () => {
    if (inputText.length > 100) {
      if (!confirm("Naskahmu cukup panjang. Apakah kamu yakin ingin menghapus semuanya?")) {
        return;
      }
    }
    setInputText('');
    setResult(null);
    setMascotMessage(INITIAL_MASCOT_MESSAGE);
  };

  const handleAskInfo = async () => {
    setIsAnalyzing(true);
    setLoadingMsg("Tara si Pohon Kersen sedang menyiapkan penjelasan...");
    try {
      const info = await askTaraAboutPlatform();
      setMascotMessage(info);
    } catch (err) {
      setMascotMessage("Teduh Aksara adalah tempatmu merawat bahasa bersama Tara si Pohon Kersen.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisType('translate');
    setLoadingMsg(TRANSLATE_LOADING_MESSAGES[Math.floor(Math.random() * TRANSLATE_LOADING_MESSAGES.length)]);
    
    try {
      const textToTranslate = result?.correctedText || inputText;
      const translation = await translateText(textToTranslate, targetLang);
      
      setMascotMessage(`Naskahmu kini telah bersemi dalam ${translation.languageName}.`);
      
      if (result) {
        setResult({ ...result, translation });
      } else {
        setResult({
          correctedText: inputText,
          suggestions: [],
          summary: "Terjemahan selesai.",
          styleScore: 100,
          translation
        });
      }
      
      setTimeout(() => {
        document.getElementById('translation-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      setMascotMessage("Aduh! Sayap bahasa Tara terhambat badai. Coba lagi ya.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisType(null);
    }
  };

  const handleAnalyze = async (withPlagiarism: boolean = false) => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisType(withPlagiarism ? 'plagiarism' : 'grammar');
    setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    
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
      
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error: any) {
      if (error.message === "API_KEY_MISSING") {
        setMascotMessage("Aduh! Kunci API belum terpasang. Tara si Pohon Kersen tidak bisa memproses tanpa kunci ajaib.");
      } else {
        setMascotMessage("Dahanku berguncang! Sepertinya ada badai koneksi. Coba lagi sebentar ya.");
      }
    } finally {
      setIsAnalyzing(false);
      setAnalysisType(null);
    }
  };

  const playVoice = (text?: string, lang: string = 'id') => {
    const speechText = text || result?.correctedText || inputText;
    generateSpeech(speechText, lang);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setInputText(item.originalText);
    setResult(item.result);
    setSelectedStyle(item.options.style);
    setSelectedContext(item.options.context);
    setMascotMessage("Naskah lama telah dipulihkan oleh Tara.");
    setIsHistoryModalOpen(false);
  };

  return (
    <Layout 
      user={user} 
      activeModal={isHistoryModalOpen ? 'history' : (isGuideModalOpen ? 'guide' : null)}
      onAuthClick={() => setIsAuthOpen(true)} 
      onLogout={() => setUser(null)}
      onHistoryClick={() => setIsHistoryModalOpen(true)}
      onGuideClick={() => setIsGuideModalOpen(true)}
      onEditorClick={() => {
        setIsHistoryModalOpen(false);
        setIsGuideModalOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button 
          onClick={() => {
            setIsDyslexiaMode(!isDyslexiaMode);
            document.body.classList.toggle('dyslexia-mode');
          }}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${isDyslexiaMode ? 'bg-amber-600 text-white' : 'bg-white dark:bg-[#2d1e17] text-amber-600 hover:scale-110 active:scale-90'}`}
          title="Mode Disleksia"
        >
          <span className="font-bold text-xl">D</span>
        </button>
        <button 
          onClick={() => playVoice()}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#2d1e17] shadow-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:scale-110 active:scale-90 transition-all"
          title="Putar Suara"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <Mascot message={mascotMessage} isLoading={isAnalyzing} onAskInfo={handleAskInfo} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-[#121a16] p-4 md:p-6 rounded-[2.5rem] shadow-xl border border-emerald-50/50 dark:border-emerald-900/30">
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-emerald-800/40 uppercase tracking-widest ml-4">Gaya</label>
              <select 
                value={selectedStyle} 
                onChange={(e) => setSelectedStyle(e.target.value as WritingStyle)}
                className="bg-[#f8faf9] dark:bg-[#0a120e] p-3 rounded-2xl text-base font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-emerald-50 dark:border-emerald-900/30 hover:shadow-md transition-shadow"
              >
                {Object.entries(STYLE_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-rose-800/40 uppercase tracking-widest ml-4">Konteks</label>
              <select 
                value={selectedContext} 
                onChange={(e) => setSelectedContext(e.target.value as WritingContext)}
                className="bg-[#f8faf9] dark:bg-[#0a120e] p-3 rounded-2xl text-base font-bold text-rose-800 dark:text-rose-300 outline-none border border-rose-50 dark:border-rose-900/30 hover:shadow-md transition-shadow"
              >
                {Object.entries(CONTEXT_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-amber-800/40 uppercase tracking-widest ml-4">Alih Bahasa</label>
              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value as TargetLanguage)}
                className="bg-[#f8faf9] dark:bg-[#0a120e] p-3 rounded-2xl text-base font-bold text-amber-800 dark:text-amber-300 outline-none border border-amber-50 dark:border-emerald-900/30 hover:shadow-md transition-shadow"
              >
                {Object.entries(LANG_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0d1410] rounded-[3.5rem] p-6 md:p-12 shadow-[0_35px_60px_-15px_rgba(26,46,31,0.15)] flex flex-col min-h-[500px] relative overflow-hidden border border-emerald-50/50 dark:border-emerald-900/20">
            {isAnalyzing && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-[#05140d]/95 backdrop-blur-md">
                <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="mt-8 text-emerald-900 dark:text-emerald-50 text-2xl font-bold italic animate-pulse">{loadingMsg}</p>
              </div>
            )}

            {inputText && !isAnalyzing && (
              <button 
                onClick={handleClear}
                className="absolute top-6 right-6 md:top-12 md:right-12 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl hover:bg-rose-600 hover:text-white dark:hover:bg-rose-700 transition-all z-20 shadow-lg flex items-center gap-2 group border border-rose-100 dark:border-rose-900/30 animate-in fade-in zoom-in duration-300"
                title="Hapus Naskah"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                <span className="text-base font-bold uppercase tracking-[0.2em] max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-1 transition-all duration-500 whitespace-nowrap">Bersihkan</span>
              </button>
            )}

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan naskahmu di sini..."
              className={`flex-1 w-full bg-transparent resize-none border-none outline-none text-emerald-950 dark:text-emerald-50 text-xl md:text-2xl leading-relaxed placeholder-emerald-800/15 ${isDyslexiaMode ? 'font-dyslexic' : 'font-medium'}`}
            />

            <div className="flex flex-col sm:flex-row gap-5 mt-10">
              <button
                onClick={() => handleAnalyze(false)}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-8 py-5 bg-emerald-700 dark:bg-emerald-600 text-white rounded-3xl font-bold text-lg shadow-2xl hover:bg-emerald-800 hover:shadow-emerald-200/50 active:scale-95 disabled:opacity-30 transition-all"
              >
                Koreksi Naskah
              </button>
              <button
                onClick={handleTranslate}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-8 py-5 bg-[#8d6e63] dark:bg-[#5d4037] text-white rounded-3xl font-bold text-lg shadow-2xl hover:bg-[#6d4c41] hover:shadow-amber-200/50 active:scale-95 disabled:opacity-30 transition-all"
              >
                Alih Bahasa
              </button>
              <button
                onClick={() => handleAnalyze(true)}
                disabled={isAnalyzing || !inputText.trim()}
                className="flex-1 px-8 py-5 premium-shimmer text-white rounded-3xl font-bold text-lg shadow-2xl hover:shadow-orange-200/50 active:scale-95 disabled:opacity-30 transition-all"
              >
                Cek Plagiarisme
              </button>
            </div>
          </div>

          {result && !isAnalyzing && (
            <div id="result-section" className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-10">
               <div className="bg-[#f0f9f4] dark:bg-[#08120c] p-8 md:p-14 rounded-[3.5rem] shadow-[0_30px_60px_-12px_rgba(16,42,26,0.15)] border border-emerald-100/50 dark:border-emerald-900/30">
                  <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                    <div>
                      <h3 className="text-base font-bold text-emerald-800/40 uppercase tracking-widest">Hasil Semai</h3>
                      <p className="text-base font-bold text-emerald-600">Audit KBBI & EYD V</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-base font-bold text-rose-600 bg-white dark:bg-[#1a1410] px-6 py-3 rounded-full shadow-lg border border-rose-50/50">Kualitas: {result.styleScore}%</span>
                       <button 
                        onClick={() => navigator.clipboard.writeText(result.correctedText)}
                        className="p-4 bg-white dark:bg-emerald-900 rounded-full shadow-lg hover:scale-115 transition-all text-emerald-600 hover:bg-emerald-50"
                        title="Salin Naskah"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                       </button>
                    </div>
                  </div>
                  <p className="text-xl md:text-3xl leading-relaxed text-[#0a2e1f] dark:text-emerald-50 whitespace-pre-wrap font-medium">{result.correctedText}</p>
               </div>

               {result.translation && (
                 <div id="translation-section" className="bg-[#fcf8f0] dark:bg-[#15120a] p-8 md:p-14 rounded-[3.5rem] shadow-[0_30px_60px_-12px_rgba(61,46,16,0.1)] border border-amber-100/50 dark:border-amber-900/30">
                    <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                      <div>
                        <h3 className="text-base font-bold text-amber-800/40 uppercase tracking-widest">Alih Bahasa</h3>
                        <p className="text-base font-bold text-amber-600">{result.translation.languageName}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => playVoice(result.translation?.translatedText, targetLang)}
                          className="p-4 bg-white dark:bg-amber-900 rounded-full shadow-lg hover:scale-115 transition-all text-amber-600 hover:bg-amber-50"
                          title="Putar Suara Terjemahan"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        </button>
                        <button 
                          onClick={() => navigator.clipboard.writeText(result.translation?.translatedText || '')}
                          className="p-4 bg-white dark:bg-amber-900 rounded-full shadow-lg hover:scale-115 transition-all text-amber-600 hover:bg-amber-50"
                          title="Salin Terjemahan"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-xl md:text-3xl leading-relaxed text-[#3e2723] dark:text-amber-50 whitespace-pre-wrap font-medium">{result.translation.translatedText}</p>
                    {result.translation.note && (
                      <p className="mt-8 text-base italic text-amber-800/60 dark:text-amber-200/40 border-t border-amber-100/50 pt-4">Catatan: {result.translation.note}</p>
                    )}
                 </div>
               )}

               {result.plagiarism && (
                <div className="bg-amber-50/40 dark:bg-amber-900/10 p-10 rounded-[3rem] border border-amber-100 dark:border-amber-900/20 shadow-xl">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-base font-bold text-amber-800 uppercase tracking-widest">Plagiarisme</h3>
                      <span className={`px-5 py-2 rounded-full text-base font-bold text-white shadow-md ${result.plagiarism.score > 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                        {result.plagiarism.score}% Kemiripan
                      </span>
                   </div>
                   <p className="text-lg text-emerald-900/70 dark:text-emerald-100/60 italic mb-8">"{result.plagiarism.summary}"</p>
                   {result.plagiarism.sources.length > 0 && (
                     <div className="flex flex-wrap gap-4">
                        {result.plagiarism.sources.map((source, idx) => (
                          <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white dark:bg-emerald-900/50 rounded-full text-base font-bold text-emerald-700 dark:text-emerald-300 hover:text-rose-600 hover:shadow-md transition-all border border-emerald-50 dark:border-emerald-800">
                            🔗 {source.title}
                          </a>
                        ))}
                     </div>
                   )}
                </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-[#0a120e] p-8 rounded-[2.5rem] shadow-lg border border-emerald-50/50 dark:border-emerald-900/30 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                       <span className="px-4 py-1.5 rounded-full text-base font-bold uppercase bg-emerald-50 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 mb-6 inline-block shadow-sm">
                         {s.type}
                       </span>
                       <div className="flex flex-wrap items-center gap-4 mb-5">
                          <span className="line-through text-rose-300 text-lg">{s.original}</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-2xl">→ {s.replacement}</span>
                       </div>
                       <p className="text-base text-emerald-900/50 dark:text-emerald-100/40 italic leading-relaxed">{s.reason}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white dark:bg-[#0a120e] p-8 rounded-[3rem] shadow-2xl border border-emerald-50/50 dark:border-emerald-900/30 sticky top-8">
             <h3 className="text-base font-bold text-emerald-800/30 uppercase tracking-widest mb-8 ml-2">Riwayat Jejak</h3>
             <div className="space-y-6">
                {history.length > 0 ? history.slice(0, 4).map(item => (
                  <HistoryCard key={item.id} item={item} onSelect={loadHistoryItem} />
                )) : (
                  <div className="py-16 text-center bg-emerald-50/20 dark:bg-emerald-900/10 rounded-3xl border border-dashed border-emerald-100/50">
                     <p className="text-base text-emerald-800/30 italic font-bold">Belum ada naskah yang terawat.</p>
                  </div>
                )}
             </div>
             {history.length > 4 && (
               <button 
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full mt-6 py-4 text-base font-bold text-emerald-600/60 uppercase tracking-widest hover:text-emerald-600 transition-colors"
               >
                 Lihat Semua Jejak →
               </button>
             )}
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
