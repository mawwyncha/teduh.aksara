// src/components/AppContent.tsx
import React from 'react';
import { Mascot } from './Mascot';
import { HistoryCard } from './HistoryCard';
import { NusantaraMapSection } from './nusantara/NusantaraMapSection';
import { usePreloadAllFolklore } from '../hooks/usePreloadAllFolklore';
import { getAllFolkloreData } from '../utils/folkloreDataCollector';
import { FolklorePreloadIndicator } from './FolklorePreloadIndicator';
import { TreeHugger } from './TreeHugger';
import { GardenPromoBox } from './GardenPromoBox';
import { useAppLogic } from '../hooks/useAppLogic';

// Constants moved from App.tsx
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

export const LANG_OPTIONS = [
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

interface AppContentProps {
  isHelpActive: boolean;
  onHelpToggle: () => void;
  isBusy: boolean;
  onAskInfo: () => void;
}

export const AppContent: React.FC<AppContentProps> = ({ isHelpActive, onHelpToggle, isBusy, onAskInfo }) => {
  const app = useAppLogic();
  const folkloreData = getAllFolkloreData();
  const progress = usePreloadAllFolklore(folkloreData);

  const currentLangLabel = LANG_OPTIONS.find(opt => opt.value === app.targetLang)?.label || app.targetLang;

  const getSuggestionTypeColor = (type: string) => {
    switch (type) {
      case 'Ejaan':
        return app.currentTheme === 'flower'
          ? 'bg-pink-500/25 text-pink-100'
          : app.currentTheme === 'dark'
          ? 'bg-amber-900/50 text-amber-200'
          : 'bg-amber-50 text-amber-800 border border-amber-200';

      case 'Tata Bahasa':
        return app.currentTheme === 'flower'
          ? 'bg-emerald-500/25 text-emerald-100'
          : app.currentTheme === 'dark'
          ? 'bg-emerald-900/50 text-emerald-200'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200';

      case 'Tanda Baca':
        return app.currentTheme === 'flower'
          ? 'bg-blue-500/25 text-blue-100'
          : app.currentTheme === 'dark'
          ? 'bg-blue-900/50 text-blue-200'
          : 'bg-blue-50 text-blue-800 border border-blue-200';

      case 'Gaya Bahasa':
        return app.currentTheme === 'flower'
          ? 'bg-rose-500/25 text-rose-100'
          : app.currentTheme === 'dark'
          ? 'bg-rose-900/50 text-rose-200'
          : 'bg-rose-50 text-rose-800 border border-rose-200';

      default:
        return app.currentTheme === 'dark'
          ? 'bg-gray-800 text-gray-300'
          : 'bg-gray-100 text-gray-700';
    }
  };

  const inputBgClass = app.currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl text-petal-50' 
    : (app.currentTheme === 'dark' ? 'bg-emerald-950/20 border-emerald-800/30 shadow-none' : 'bg-white border-emerald-50 shadow-sm');

  const resultCardBg = app.currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl' 
    : (app.currentTheme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/40 shadow-none' : 'bg-emerald-50/40 border-emerald-100 shadow-sm');

  const translationCardBg = app.currentTheme === 'flower' 
    ? 'bg-petal-800 border-pink-500/20 shadow-2xl' 
    : (app.currentTheme === 'dark' ? 'bg-amber-950/10 border-amber-500/10' : 'bg-red-50/30 border-red-200/50 shadow-sm');

  const selectClass = `p-3.5 rounded-2xl font-bold outline-none border transition-all backdrop-blur-md font-sans focus:ring-2 focus:ring-opacity-50 ${
    app.currentTheme === 'flower' 
      ? 'bg-petal-900 text-pink-100 border-pink-500/20 focus:ring-pink-500' 
      : app.currentTheme === 'dark'
        ? 'bg-emerald-950/40 text-emerald-200 border-emerald-800/30 focus:ring-emerald-500'
        : 'bg-white/40 text-emerald-800 border-emerald-100/50 focus:ring-emerald-600 shadow-sm'
  }`;

  if (app.isBanned) {
    return (
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
  }

  return (
    <>
      <div className="space-y-8 w-full max-w-5xl mx-auto">
        <Mascot 
          message={app.mascotMessage} 
          isLoading={app.isBusy} 
          forcedExpression={app.isViolationDetected ? 'shocked' : (app.isRecording ? 'happy' : undefined)} 
          onAskInfo={onAskInfo} 
        />

        <div className={`p-5 rounded-[2rem] border shadow-sm ${inputBgClass}`}>
           <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                 <span className={`w-1.5 h-1.5 rounded-full ${app.currentTheme === 'flower' ? 'bg-pink-400' : 'bg-emerald-500'}`}></span>
                 <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-sans ${app.currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-700/50 dark:text-emerald-400/40'}`}>Kapasitas Harian</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors font-sans ${app.isQuotaLow ? 'bg-red-50 text-red-600 animate-quota-low' : (app.currentTheme === 'flower' ? 'bg-pink-500/20 text-pink-300' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400')}`}>
                 {app.MAX_DAILY_REQUESTS - app.usageCount} / {app.MAX_DAILY_REQUESTS} Tersisa
              </span>
           </div>
           <div className="quota-bar-container">
             <div className={`quota-bar-fill ${app.usageCount >= app.MAX_DAILY_REQUESTS ? 'bg-red-600' : app.isQuotaLow ? 'bg-red-500' : (app.currentTheme === 'flower' ? 'bg-pink-500' : 'bg-emerald-600')}`} 
                  style={{ width: `${app.quotaPercent}%` }}>
             </div>
           </div>
        </div>

        <NusantaraMapSection
          currentTheme={app.currentTheme}
          targetLang={app.targetLang}
          inputBgClass={inputBgClass}
          isResultReady={app.isResultReady}
          onSeeResult={app.handleSeeResult}
        />

        <section className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-[2.5rem] border ${inputBgClass}`}>
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-4 font-sans ${app.currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Gaya</label>
            <select disabled={app.isBusy} value={app.selectedStyle} onChange={(e) => app.setSelectedStyle(e.target.value as any)} className={selectClass}>
              {STYLE_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 flower:bg-petal-800 text-current">{o.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ml-4 font-sans ${app.currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Konteks</label>
            <select disabled={app.isBusy} value={app.selectedContext} onChange={(e) => app.setSelectedContext(e.target.value as any)} className={selectClass}>
              {CONTEXT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 flower:bg-petal-800 text-current">{o.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ml-4 font-sans ${app.currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-800/40 dark:text-emerald-400/30'}`}>Bahasa Target</label>
            <select disabled={app.isBusy} value={app.targetLang} onChange={(e) => app.setTargetLang(e.target.value as any)} className={selectClass}>
              {LANG_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-white dark:bg-forest-950 flower:bg-petal-800 text-current">{o.label}</option>)}
            </select>
          </div>
        </section>

        <section className={`rounded-[3.5rem] p-6 md:p-10 relative border transition-all duration-300 ${app.isViolationDetected ? 'border-red-600 shadow-red-600/10 animate-shake' : inputBgClass}`}>
          {app.inputText && !app.isBusy && (
            <button 
              onClick={() => { app.setInputText(''); app.setResult(null); }} 
              className={`absolute top-8 right-8 p-3 transition-all active:scale-90 z-10 ${app.currentTheme === 'flower' ? 'text-pink-100/20 hover:text-pink-500' : 'text-emerald-800/20 dark:text-emerald-400/20 hover:text-red-700'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>
            </button>
          )}

          {app.isBusy && !app.isRecording && (
            <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 sm:p-12 text-center animate-in fade-in ${app.currentTheme === 'flower' ? 'bg-petal-900/90' : 'bg-white/95 dark:bg-[#050a08]/95'}`}>
              <div className="max-w-md w-full space-y-8 flex flex-col items-center">
                  <div className={`w-16 h-16 border-4 rounded-full animate-spin ${app.currentTheme === 'flower' ? 'border-pink-500 border-t-transparent' : 'border-emerald-100 dark:border-emerald-900 border-t-emerald-600'}`}></div>
                  <div className="space-y-6">
                    <p className={`font-bold italic text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 ${app.currentTheme === 'flower' ? 'text-pink-100' : 'text-emerald-950 dark:text-emerald-50'}`} key={app.loadingMsg}>"{app.loadingMsg}"</p>
                    <div className={`p-6 rounded-[2.5rem] border relative animate-in zoom-in-95 duration-500 ${app.currentTheme === 'flower' ? 'bg-pink-900/50 border-pink-500/20' : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/20'}`} key={app.funFactMsg}>
                       <div className="flex items-center gap-2 mb-3 justify-center"><span className="text-sm">💡</span><span className={`text-[10px] font-bold uppercase tracking-widest font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-800/40'}`}>Tahukah Kamu?</span></div>
                       <p className={`text-sm font-medium leading-relaxed italic ${app.currentTheme === 'flower' ? 'text-pink-100' : 'text-emerald-800 dark:text-emerald-200'}`}>{app.funFactMsg}</p>
                    </div>
                  </div>
                  <button onClick={() => app.handleCancelProcess()} className={`px-8 py-3 border-2 rounded-full text-sm font-bold transition-all active:scale-95 mt-4 font-sans ${app.currentTheme === 'flower' ? 'bg-petal-800 border-pink-500/50 text-pink-300' : 'bg-white dark:bg-emerald-950 border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'}`}>Batalkan Proses</button>
              </div>
            </div>
          )}
          
          {app.isRecording && (
             <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 sm:p-12 text-center animate-in fade-in ${app.currentTheme === 'flower' ? 'bg-petal-900/90' : 'bg-red-50/80 dark:bg-red-950/80'}`}>
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-red-600/40">
                   <span className="text-white text-4xl font-bold">{app.recordingCountdown}</span>
                </div>
                <p className={`text-2xl font-bold mb-8 ${app.currentTheme === 'flower' ? 'text-pink-100' : 'text-red-900 dark:text-red-100'}`}>Tara sedang mendengar...</p>
                <button onClick={() => app.stopRecording()} className="px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg active:scale-95">Berhenti</button>
             </div>
          )}

          <div className="relative">
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="confirm_access_token">Don't fill this if you are human</label>
              <input type="text" id="confirm_access_token" name="confirm_access_token" tabIndex={-1} autoComplete="off" value={app.honeypot} onChange={e => app.setHoneypot(e.target.value)} />
            </div>
            <textarea 
              value={app.inputText} 
              disabled={app.isBusy} 
              onChange={app.handleInputChange} 
              maxLength={app.MAX_CHARACTERS} 
              placeholder="Tuliskan naskahmu di sini..." 
              className={`w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-xl leading-relaxed pr-12 transition-colors ${app.isViolationDetected ? 'text-red-700 dark:text-red-400' : (app.currentTheme === 'flower' ? 'text-pink-50 placeholder-pink-500/30' : 'text-emerald-950 dark:text-emerald-50 placeholder-red-700/30')}`} 
            />
            <div className={`absolute bottom-0 right-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 font-sans ${app.isViolationDetected ? 'text-red-600 animate-pulse' : app.isCharLimitNear ? 'text-red-600 scale-110' : app.charCount > app.MAX_CHARACTERS * 0.7 ? 'text-amber-500' : 'text-emerald-700/30 dark:text-emerald-400/20'}`}>
              {app.isViolationDetected ? '⚠️ POLA TERLARANG' : `${app.charCount} / ${app.MAX_CHARACTERS}`}
            </div>
          </div>  

          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={() => app.triggerAnalysis(false)} 
                disabled={!app.inputText.trim() || app.isBusy || app.usageCount >= app.MAX_DAILY_REQUESTS || app.isViolationDetected} 
                className={`flex-1 py-5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg font-sans disabled:opacity-30 ${app.usageCount >= app.MAX_DAILY_REQUESTS || app.isViolationDetected ? 'grayscale cursor-not-allowed' : ''} ${app.currentTheme === 'flower' ? 'bg-pink-500 text-white shadow-pink-500/20' : 'bg-emerald-700 text-white shadow-emerald-700/20'}`}
              >
                Koreksi & Terjemahkan
              </button>
              
              <button 
                onClick={() => app.setPermissionType('plagiarism')} 
                disabled={!app.inputText.trim() || app.isBusy || app.usageCount >= app.MAX_DAILY_REQUESTS || app.isViolationDetected} 
                className="flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg font-sans disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
              >
                Cek Plagiarisme
              </button>
            </div>
          </div>
        </section>

        {app.result && !app.isAnalyzing && (
          <div id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className={`p-10 rounded-[3rem] border ${resultCardBg}`}>
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/30'}`}>Hasil Perbaikan</h2>
                <p className={`text-xl whitespace-pre-wrap leading-relaxed ${app.currentTheme === 'flower' ? 'text-pink-50' : 'text-emerald-950 dark:text-emerald-50'}`}>{app.result.correctedText}</p>
                {app.result.readingGuideIndo && (
                  <div className={`mt-6 pt-6 border-t ${app.currentTheme === 'flower' ? 'border-pink-500/20' : 'border-emerald-100/50 dark:border-emerald-800/20'}`}>
                    <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 font-sans ${app.currentTheme === 'flower' ? 'text-pink-500/40' : 'text-emerald-700/30 dark:text-emerald-400/60'}`}>Panduan Baca (Suku Kata)</h3>
                    <p className={`text-sm font-medium italic ${app.currentTheme === 'flower' ? 'text-pink-100/60' : 'text-emerald-800/60 dark:text-emerald-400/60'}`}>{app.result.readingGuideIndo}</p>
                  </div>
                )}
             </div>

             {app.result.plagiarism && (
               <div className={`p-8 rounded-[3rem] border animate-in zoom-in-95 duration-500 ${
                  app.currentTheme === 'flower' 
                  ? 'bg-petal-900/90 border-pink-500/30 shadow-2xl' 
                  : (app.currentTheme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/20 shadow-none' : 'bg-white border-emerald-100 shadow-xl')}`}>
                  <div className="flex justify-between items-center mb-6">
                     <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : (app.currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')}`}>Keaslian Aksara</h2>
                     <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.result.plagiarism.score > 20 ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        Kemiripan: {app.result.plagiarism.score}%
                     </div>
                  </div>
                  <p className={`text-sm font-medium italic mb-8 leading-relaxed ${app.currentTheme === 'flower' ? 'text-pink-100/80' : (app.currentTheme === 'dark' ? 'text-emerald-100/70' : 'text-emerald-950/70')}`}>"{app.result.plagiarism.summary}"</p>
                  {app.result.plagiarism.sources.length > 0 && (
                    <div className="space-y-4">
                       <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] ${app.currentTheme === 'flower' ? 'text-pink-500' : (app.currentTheme === 'dark' ? 'text-emerald-500/60' : 'text-emerald-700/50')}`}>Dahan Rujukan di Web Terbuka:</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {app.result.plagiarism.sources.map((src, i) => (
                             <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className={`p-5 rounded-2xl border transition-all hover:translate-x-1 hover:shadow-md flex items-center justify-between group ${
                                app.currentTheme === 'flower' 
                                ? 'bg-petal-800 border-pink-500/10 hover:bg-pink-500/10' 
                                : (app.currentTheme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100/50')}`}>
                               <span className={`text-xs font-bold truncate max-w-[140px] sm:max-w-xs ${app.currentTheme === 'flower' ? 'text-pink-100' : (app.currentTheme === 'dark' ? 'text-emerald-100' : 'text-emerald-900')}`}>{src.title}</span>
                               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`opacity-30 group-hover:opacity-100 transition-all ${app.currentTheme === 'flower' ? 'text-pink-400' : (app.currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')}`}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                             </a>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
             )}

             {app.result.translation && (
               <div className={`p-10 rounded-[3rem] border relative group ${translationCardBg}`}>
                  <div className="flex justify-between items-center mb-4">
                     <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : (app.currentTheme === 'dark' ? 'text-amber-400' : 'text-red-700')}`}>Terjemahan Aksara ({app.result.translation.languageName})</h2>
                     <button onClick={app.handleCopyTranslation} className={`p-2 rounded-lg transition-all ${app.currentTheme === 'flower' ? 'text-pink-500/40 hover:text-pink-500 hover:bg-pink-500/10' : (app.currentTheme === 'dark' ? 'text-amber-500/40 hover:text-amber-400 hover:bg-amber-500/10' : 'text-red-700/40 hover:text-red-700 hover:bg-red-500/10')}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                     </button>
                  </div>
                  <p className={`text-xl whitespace-pre-wrap leading-relaxed italic ${app.currentTheme === 'flower' ? 'text-pink-100/80' : 'text-emerald-950 dark:text-emerald-50'}`}>{app.result.translation.translatedText}</p>
                  {app.result.translation.readingGuide && (
                    <div className={`mt-6 pt-6 border-t ${app.currentTheme === 'flower' ? 'border-pink-500/20' : (app.currentTheme === 'dark' ? 'border-amber-500/10' : 'border-red-500/10')}`}>
                      <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 font-sans ${app.currentTheme === 'flower' ? 'text-pink-400/40' : (app.currentTheme === 'dark' ? 'text-amber-400/40' : 'text-red-700/30')}`}>Panduan Baca Fonetik</h3>
                      <p className={`text-sm font-medium italic ${app.currentTheme === 'flower' ? 'text-pink-100/40' : (app.currentTheme === 'dark' ? 'text-amber-400/40' : 'text-emerald-800/40')}`}>{app.result.translation.readingGuide}</p>
                    </div>
                  )}
               </div>
             )}

             {app.result.suggestions && app.result.suggestions.length > 0 && (
               <div className="space-y-4">
                  <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ml-6 font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/30'}`}>Analisis Aksara ({app.result.suggestions.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {app.result.suggestions.map((s, idx) => (
                       <div key={idx} className={`p-6 rounded-[2rem] border shadow-sm hover:shadow-md transition-shadow ${app.currentTheme === 'flower' ? 'bg-petal-800 border-pink-500/20' : (app.currentTheme === 'dark' ? 'bg-emerald-950/20 border-emerald-800/20' : 'bg-white border-emerald-50')}`}>
                          <div className="flex justify-between items-start mb-4">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border-b-2 uppercase tracking-widest font-sans ${getSuggestionTypeColor(s.type)}`}>
                              {s.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mb-3 text-sm font-bold font-sans">
                            <span className="text-red-400 line-through decoration-2 opacity-50">{s.original}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={app.currentTheme === 'flower' ? 'text-pink-500/40' : 'text-emerald-400'}>
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                            <span className={app.currentTheme === 'flower' ? 'text-pink-300' : 'text-emerald-600 dark:text-emerald-400'}>{s.replacement}</span>
                          </div>
                          <p className={`text-xs font-medium leading-relaxed italic ${app.currentTheme === 'flower' ? 'text-pink-100/60' : 'text-emerald-900/60 dark:text-emerald-500'}`}>"{s.reason}"</p>
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className={`p-8 rounded-[2.5rem] border flex flex-col h-full ${inputBgClass}`}>
            <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-6 font-sans ${app.currentTheme === 'flower' ? 'text-pink-400' : 'text-emerald-700/30 dark:text-emerald-400/20'}`}>Jejak Lokal</h2>
            <div className="space-y-4 flex-1">
              {app.history.slice(0, 3).map(item => (
                <HistoryCard 
                  key={item.id} 
                  item={item} 
                  onSelect={(it) => { 
                    if(!app.isBusy) { 
                      app.setInputText(it.originalText); 
                      app.setResult(it.result); 
                      window.scrollTo({top:0, behavior:'smooth'}); 
                    } 
                  }} 
                />
              ))}
              {app.history.length === 0 && (
                <p className={`text-center py-10 italic font-sans ${app.currentTheme === 'flower' ? 'text-pink-100/20' : 'text-emerald-900/10 dark:text-emerald-400/10'}`}>
                  Kotak jejak masih kosong.
                </p>
              )}
            </div>
          </div>
          <TreeHugger />
          <GardenPromoBox isFlower={app.currentTheme === 'flower'} isDark={app.currentTheme === 'dark'} />
        </div>
      </div>
      
      <FolklorePreloadIndicator 
        progress={progress} 
        theme={app.currentTheme}
      />
    </>
  );
};