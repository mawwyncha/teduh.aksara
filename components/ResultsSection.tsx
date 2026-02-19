
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsSectionProps {
  result: AnalysisResult;
  currentTheme: string;
  openPronunciation: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result, currentTheme, openPronunciation }) => {
  const isFlower = currentTheme === 'flower';
  const isDark = currentTheme === 'dark';
  
  // Section container background logic
  const sectionBg = isFlower 
    ? 'bg-petal-800 border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.05)]' 
    : isDark 
      ? 'bg-emerald-950/40 border-emerald-800/30' 
      : 'bg-emerald-50/40 border-emerald-100';
  
  // Base text color for main corrected paragraphs
  const mainTextColor = isFlower 
    ? 'text-pink-50' 
    : isDark 
      ? 'text-emerald-50' 
      : 'text-emerald-950';

  // Theme-aware colors for titles and secondary info
  const titleColor = isFlower 
    ? 'text-pink-300' 
    : 'text-emerald-700/50 dark:text-emerald-400/50';

  // Theme-aware colors for Fact Check
  const factBorderColor = isFlower 
    ? 'border-fuchsia-600' 
    : isDark 
      ? 'border-amber-500' 
      : 'border-sky-600';

  const factItemBg = isFlower 
    ? 'bg-petal-900/40 border-pink-500/10' 
    : isDark 
      ? 'bg-emerald-900/20 border-emerald-800/20' 
      : 'bg-white/60 border-emerald-50';

  const factButtonBg = isFlower 
    ? 'bg-fuchsia-600 hover:bg-fuchsia-700' 
    : isDark 
      ? 'bg-amber-600 hover:bg-amber-700' 
      : 'bg-sky-600 hover:bg-sky-700';

  const factHeadingColor = isFlower 
    ? 'text-pink-400' 
    : isDark 
      ? 'text-amber-500' 
      : 'text-sky-600';

  const factTextColor = isFlower 
    ? 'text-pink-100/80' 
    : isDark 
      ? 'text-emerald-100/70' 
      : 'text-emerald-900/80';

  // Helper to get label styles based on category and theme
  const getLabelStyles = (type: string) => {
    const base = "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg mb-4 inline-block border transition-colors duration-500";
    
    switch (type) {
      case 'Ejaan':
        return isFlower 
          ? `${base} bg-petal-900 text-amber-300 border-amber-500/20`
          : `${base} bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20`;
      case 'Tata Bahasa':
        return isFlower 
          ? `${base} bg-petal-900 text-emerald-300 border-emerald-500/20`
          : `${base} bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20`;
      case 'Tanda Baca':
        return isFlower 
          ? `${base} bg-petal-900 text-blue-300 border-blue-500/20`
          : `${base} bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20`;
      case 'Gaya Bahasa':
        return isFlower 
          ? `${base} bg-petal-900 text-pink-300 border-pink-500/20`
          : `${base} bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-500/20`;
      default:
        return isFlower 
          ? `${base} bg-petal-900 text-pink-300 border-pink-500/20`
          : `${base} bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-500/20`;
    }
  };

  return (
    <div id="result-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Hasil Koreksi Tata Bahasa */}
      {!result.isFactCheckMode && (
        <div className={`p-10 rounded-[3rem] border relative ${sectionBg} shadow-sm transition-colors duration-500`}>
          <button 
            onClick={openPronunciation}
            className={`absolute top-8 right-8 p-3 rounded-2xl shadow-sm hover:scale-110 transition-transform ${isFlower ? 'bg-pink-500 text-white' : 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100'}`}
            title="Latih Tutur"
          >
            🗣️
          </button>
          <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${titleColor}`}>Hasil Perbaikan</h2>
          <p className={`text-xl whitespace-pre-wrap leading-relaxed ${mainTextColor}`}>{result.correctedText}</p>
        </div>
      )}

      {/* 2. Hasil Cek Fakta */}
      {result.isFactCheckMode && result.factClaims && (
        <div className={`p-10 rounded-[3rem] border-l-8 ${factBorderColor} ${sectionBg} shadow-2xl transition-all duration-500`}>
          <h2 className={`text-[10px] font-bold uppercase tracking-[0.5em] mb-8 ${factHeadingColor}`}>Tinjauan Fakta Naskah</h2>
          <div className="space-y-8">
            {result.factClaims.map((f, i) => (
              <div key={i} className={`p-8 rounded-[2.5rem] border transition-colors duration-500 ${factItemBg}`}>
                <h4 className={`text-xl font-bold italic mb-4 ${isFlower ? 'text-pink-50' : isDark ? 'text-emerald-50' : 'text-emerald-950'}`}>"{f.claim}"</h4>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 inline-block ${f.status === 'Akurat' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-red-500 text-red-600'}`}>{f.status}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-6 font-medium ${factTextColor}`}>{f.explanation}</p>
                {f.sourceUrl && (
                  <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest text-white inline-block transition-all active:scale-95 ${factButtonBg}`}>
                    🔗 {f.sourceTitle || 'Telusuri Sumber'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Hasil Plagiarisme */}
      {result.plagiarism && (
        <div className={`p-8 rounded-[3rem] border transition-colors duration-500 ${isFlower ? 'bg-petal-900/90 border-pink-500/30' : isDark ? 'bg-emerald-950/60 border-emerald-800/30' : 'bg-white border-emerald-100 shadow-xl'}`}>
           <div className="flex justify-between items-center mb-6">
              <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isFlower ? 'text-pink-400' : isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Keaslian Aksara</h2>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${result.plagiarism.score > 20 ? 'bg-rose-500' : 'bg-emerald-500'} text-white`}>
                 Kemiripan: {result.plagiarism.score}%
              </div>
           </div>
           <p className={`text-sm font-medium italic mb-8 ${isFlower ? 'text-pink-100/70' : ''}`}>"{result.plagiarism.summary}"</p>
           {result.plagiarism.sources.length > 0 && (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.plagiarism.sources.map((src, i) => (
                  <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-xl border transition-colors flex justify-between items-center group ${isFlower ? 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20' : isDark ? 'bg-black/20 border-white/5 hover:bg-black/40' : 'bg-black/5 border-transparent hover:bg-black/10'}`}>
                    <span className={`text-xs font-bold truncate ${isFlower ? 'text-pink-200' : ''}`}>{src.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`opacity-30 group-hover:opacity-100 ${isFlower ? 'text-pink-400' : ''}`}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                ))}
             </div>
           )}
        </div>
      )}

      {/* 4. Hasil Terjemahan */}
      {result.translation && !result.isFactCheckMode && (
        <div className={`p-10 rounded-[3rem] border relative transition-colors duration-500 ${isFlower ? 'bg-petal-800 border-pink-500/20' : isDark ? 'bg-emerald-950/20 border-emerald-800/10' : 'bg-red-50/30 border-red-200/50'} shadow-sm`}>
          <button 
            onClick={openPronunciation}
            className={`absolute top-8 right-8 p-3 rounded-2xl shadow-sm hover:scale-110 transition-transform ${isFlower ? 'bg-pink-500 text-white' : 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100'}`}
            title="Latih Tutur"
          >
            🗣️
          </button>
          <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${titleColor}`}>Terjemahan ({result.translation.languageName})</h2>
          <p className={`text-xl whitespace-pre-wrap leading-relaxed italic ${mainTextColor}`}>"{result.translation.translatedText}"</p>
        </div>
      )}

      {/* 5. Saran Perbaikan Detail */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ml-6 ${isFlower ? 'text-pink-400/50' : 'opacity-40'}`}>Analisis Mendalam ({result.suggestions.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.suggestions.map((s, idx) => (
              <div key={idx} className={`p-6 rounded-[2rem] border transition-colors duration-500 shadow-sm hover:shadow-md ${isFlower ? 'bg-petal-800 border-pink-500/10' : 'bg-white dark:bg-black/10 border-transparent'}`}>
                <span className={getLabelStyles(s.type)}>{s.type}</span>
                <div className="flex items-center gap-3 mb-2 font-bold">
                  <span className="text-red-400 line-through opacity-50">{s.original}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`${isFlower ? 'text-pink-400' : 'text-emerald-500'}`}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  <span className={`${isFlower ? 'text-pink-200' : 'text-emerald-600'}`}>{s.replacement}</span>
                </div>
                <p className={`text-xs italic ${isFlower ? 'text-pink-100/40' : 'opacity-60'}`}>"{s.reason}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
