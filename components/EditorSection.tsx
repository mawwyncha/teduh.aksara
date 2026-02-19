import React, { useState, useRef, useEffect } from 'react';
import { WritingStyle, WritingContext, TargetLanguage } from '../types';

interface EditorSectionProps {
  inputText: string;
  setInputText: (val: string) => void;
  isBusy: boolean;
  isRecording: boolean;
  recordingCountdown: number;
  loadingMsg: string;
  isViolationDetected: boolean;
  currentTheme: string;
  selectedStyle: WritingStyle;
  setSelectedStyle: (val: WritingStyle) => void;
  selectedContext: WritingContext;
  setSelectedContext: (val: WritingContext) => void;
  targetLang: TargetLanguage;
  setTargetLang: (val: TargetLanguage) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  triggerAnalysis: (plagiarism: boolean) => void;
  triggerFactCheck: () => void;
  handleCancelProcess: () => void;
  stopRecording: () => void;
  resetResult: () => void;
  usageCount: number;
  maxRequests: number;
}

const LANG_OPTIONS = [
  { value: 'id', label: 'Bahasa Indonesia 🇮🇩' },
  { value: 'en_us', label: 'Inggris (AS) 🇺🇸' },
  { value: 'en_uk', label: 'Inggris (UK) 🇬🇧' },
  { value: 'en_au', label: 'Inggris (AU) 🇦🇺' },
  { value: 'jv_central', label: 'Jawa Tengah 🇮🇩' },
  { value: 'jv_yogyakarta', label: 'Jawa Yogyakarta 🇮🇩' },
  { value: 'jv_central_coastal', label: 'Jawa (Pantura) 🇮🇩' },
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
  { value: 'lp', label: 'Lampung 🇮🇩' },
  { value: 'sas', label: 'Sasak 🇮🇩' },
  { value: 'pap', label: 'Papua (Melayu) 🇮🇩' },
  { value: 'amb', label: 'Ambon (Melayu) 🇮🇩' },
  { value: 'go', label: 'Gorontalo 🇮🇩' },
  { value: 'ni', label: 'Nias 🇮🇩' },
  { value: 'tet', label: 'Tetum 🇹🇱' },
  { value: 'pt_tl', label: 'Portugis 🇹🇱' },
  { value: 'zh_hokkien_medan', label: 'Hokkien Medan 🇮🇩' },
  { value: 'zh_hokkien_jakarta', label: 'Hokkien Jakarta 🇮🇩' },
  { value: 'zh_hakka_singkawang', label: 'Hakka Singkawang 🇮🇩' },
  { value: 'zh_hakka_bangka', label: 'Hakka Bangka 🇮🇩' },
  { value: 'zh_teochew_pontianak', label: 'Teochew Pontianak 🇮🇩' },
  { value: 'zh_cantonese_id', label: 'Kanton 🇮🇩' }
];

const STYLE_OPTIONS = [
  { value: 'formal', label: 'Baku' },
  { value: 'casual', label: 'Luwes' },
  { value: 'academic', label: 'Ilmiah' },
  { value: 'creative', label: 'Kreatif' }
];

const CONTEXT_OPTIONS = [
  { value: 'general', label: 'Umum' },
  { value: 'business', label: 'Bisnis' },
  { value: 'education', label: 'Edukasi' },
  { value: 'social_media', label: 'Sosial Media' }
];

export const EditorSection: React.FC<EditorSectionProps> = (props) => {
  const [openDropdown, setOpenDropdown] = useState<'style' | 'context' | 'lang' | null>(null);
  const isFlower = props.currentTheme === 'flower';
  const isDark = props.currentTheme === 'dark';
  const MAX_CHARACTERS = 1000;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Logic to prevent background scroll and handle focus when dropdown is open
  useEffect(() => {
    if (openDropdown) {
      document.body.style.overflow = 'hidden';
      // Focus the list container so arrow keys work immediately
      requestAnimationFrame(() => {
        listRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const labelTitleClass = `block text-[10px] font-bold uppercase tracking-[0.3em] mb-2 ml-4 transition-colors duration-500 ${
    isFlower 
      ? 'text-pink-400/70' 
      : isDark 
        ? 'text-emerald-400/40' 
        : 'text-emerald-700/40'
  }`;

  const inputBgClass = isFlower 
    ? 'bg-petal-800 border-pink-500/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]' 
    : (isDark ? 'bg-emerald-950/20 border-emerald-800/30' : 'bg-white border-emerald-50');

  const triggerClass = `w-full p-4 rounded-2xl font-bold border transition-all flex items-center justify-between gap-2 ${
    isFlower 
      ? 'bg-petal-900/60 text-pink-100 border-pink-500/20 hover:bg-petal-900/80' 
      : isDark 
        ? 'bg-emerald-950/40 text-emerald-100 border-emerald-800/30 hover:bg-emerald-950/60' 
        : 'bg-white/60 text-emerald-800 border-emerald-100/50 hover:bg-white/80'
  }`;

  // Added outline-none and tabIndex to handle keyboard scroll focus correctly
  const listContainerClass = `absolute top-full left-0 right-0 mt-2 z-[60] max-h-64 overflow-y-auto overscroll-contain outline-none scroll-smooth rounded-2xl border backdrop-blur-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${
    isFlower 
      ? 'bg-petal-900/95 border-pink-500/30' 
      : isDark 
        ? 'bg-emerald-950/95 border-emerald-800/40' 
        : 'bg-white/95 border-emerald-100'
  }`;

  const optionClass = `w-full text-left p-4 text-sm font-bold transition-all first:rounded-t-2xl last:rounded-b-2xl ${
    isFlower 
      ? 'text-pink-100 hover:bg-pink-500/30' 
      : isDark 
        ? 'text-emerald-50 hover:bg-emerald-800/40' 
        : 'text-emerald-900 hover:bg-emerald-50'
  }`;

  const activeOptionClass = isFlower ? 'bg-pink-500/40' : isDark ? 'bg-emerald-700/40' : 'bg-emerald-100/50';

  const renderDropdown = (type: 'style' | 'context' | 'lang', title: string, currentLabel: string, options: {value: string, label: string}[], setter: (val: any) => void) => (
    <div className="relative w-full">
      <label className={labelTitleClass}>{title}</label>
      <button 
        disabled={props.isBusy}
        onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
        className={triggerClass}
      >
        <span className="truncate">{currentLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openDropdown === type ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {openDropdown === type && (
        <div 
          ref={listRef}
          tabIndex={-1}
          className={listContainerClass}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setter(opt.value); setOpenDropdown(null); }}
              className={`${optionClass} ${ (type === 'style' ? props.selectedStyle : type === 'context' ? props.selectedContext : props.targetLang) === opt.value ? activeOptionClass : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const textareaTextColor = props.isViolationDetected 
    ? 'text-red-700' 
    : isFlower 
      ? 'text-pink-50' 
      : (isDark ? 'text-emerald-50' : 'text-emerald-950');

  const placeholderClass = isFlower 
    ? 'placeholder:text-pink-300/40' 
    : (isDark ? 'placeholder:text-emerald-800' : 'placeholder:text-emerald-200');

  const selaraskanBtnClass = isFlower 
    ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-500/20' 
    : isDark
      ? 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-700/20'
      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20';

  const factCheckBtnClass = isFlower 
    ? 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-fuchsia-500/30' 
    : isDark 
      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30' 
      : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/30';

  return (
    <div className="space-y-8" ref={containerRef}>
      <section className={`grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-[2.5rem] border ${inputBgClass}`}>
        {renderDropdown('style', 'Gaya Naskah', STYLE_OPTIONS.find(o => o.value === props.selectedStyle)?.label || 'Gaya', STYLE_OPTIONS, props.setSelectedStyle)}
        {renderDropdown('context', 'Konteks', CONTEXT_OPTIONS.find(o => o.value === props.selectedContext)?.label || 'Konteks', CONTEXT_OPTIONS, props.setSelectedContext)}
        {renderDropdown('lang', 'Bahasa Target', LANG_OPTIONS.find(o => o.value === props.targetLang)?.label || 'Bahasa', LANG_OPTIONS, props.setTargetLang)}
      </section>

      <section className={`rounded-[3.5rem] p-6 md:p-10 relative border transition-all duration-300 ${props.isViolationDetected ? 'border-red-600 animate-shake' : inputBgClass}`}>
        {props.inputText && !props.isBusy && (
          <button 
            onClick={() => { props.setInputText(''); props.resetResult(); }} 
            className={`absolute top-8 right-12 p-3 z-10 transition-colors ${isFlower ? 'text-pink-400 hover:text-pink-200' : 'text-red-400 hover:text-red-700'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
            </svg>
          </button>
        )}
        
        {props.isBusy && !props.isRecording && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 text-center bg-white/95 dark:bg-[#050a08]/95">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin mb-8 ${isFlower ? 'border-pink-100 border-t-pink-600' : 'border-emerald-100 dark:border-emerald-900 border-t-emerald-600'}`}></div>
            <p className="font-bold italic text-xl">"{props.loadingMsg}"</p>
            <button onClick={props.handleCancelProcess} className={`px-8 py-3 border-2 rounded-full text-sm font-bold mt-8 ${isFlower ? 'border-pink-500 text-pink-600' : 'border-emerald-700 text-emerald-700'}`}>Batal</button>
          </div>
        )}

        {props.isRecording && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md rounded-[3.5rem] p-8 bg-red-50/80 dark:bg-red-950/80">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl">
              <span className="text-white text-4xl font-bold">{props.recordingCountdown}</span>
            </div>
            <p className="text-2xl font-bold mb-8">Tara sedang mendengar...</p>
            <button onClick={props.stopRecording} className="px-8 py-3 bg-white text-red-600 rounded-full font-bold">Berhenti</button>
          </div>
        )}

        <textarea 
          value={props.inputText} 
          disabled={props.isBusy} 
          onChange={props.handleInputChange} 
          maxLength={MAX_CHARACTERS} 
          placeholder="Tuliskan naskahmu..." 
          className={`w-full min-h-[350px] bg-transparent resize-none border-none outline-none text-xl leading-relaxed transition-colors ${textareaTextColor} ${placeholderClass} custom-scrollbar pt-12 pr-16`} 
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
          <button onClick={() => props.triggerAnalysis(false)} disabled={!props.inputText.trim() || props.isBusy || props.usageCount >= props.maxRequests || props.isViolationDetected} className={`flex-1 py-5 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${selaraskanBtnClass}`}>Selaraskan</button>
          <button onClick={props.triggerFactCheck} disabled={!props.inputText.trim() || props.isBusy || props.usageCount >= props.maxRequests || props.isViolationDetected} className={`flex-1 py-5 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${factCheckBtnClass}`}>Cek Fakta</button>
          <button onClick={() => props.triggerAnalysis(true)} disabled={!props.inputText.trim() || props.isBusy || props.usageCount >= props.maxRequests || props.isViolationDetected} className="flex-1 py-5 premium-shimmer text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">Cek Plagiarisme</button>
        </div>
      </section>
    </div>
  );
};