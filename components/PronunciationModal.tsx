import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PronunciationResult, TranslationResult } from '../types';
import { generateSpeech, analyzePronunciation } from '../services/index';

interface PronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  translation?: TranslationResult;
  currentTargetLangLabel?: string;
  onSuccess: () => void;
}

const CALMING_WAIT_MESSAGES = [
  "Tara sedang merangkai nada ceria untukmu, sabar ya Sahabat...",
  "Dahan suaraku sedang bersiap untuk mekar sempurna...",
  "Menanti embun suara membasahi naskahmu, tetaplah tenang...",
  "Aksara butuh ketelatenan untuk menjadi suara yang merdu...",
  "Sabar ya, angin sedang membawa suaraku padamu..."
];

export const PronunciationModal: React.FC<PronunciationModalProps> = ({ 
  isOpen, 
  onClose, 
  originalText, 
  translation, 
  currentTargetLangLabel,
  onSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'translation'>('original');
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [showCalmingMessage, setShowCalmingMessage] = useState(false);
  const [calmingMessage, setCalmingMessage] = useState("");
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');
  const [showMicPermission, setShowMicPermission] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const ttsTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const checkTheme = () => {
      if (document.documentElement.classList.contains('flower')) setTheme('flower');
      else if (document.documentElement.classList.contains('dark')) setTheme('dark');
      else setTheme('light');
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const sentences = useMemo(() => {
    const fullText = activeTab === 'original' ? originalText : translation?.translatedText || "";
    if (!fullText) return [];
    return fullText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  }, [activeTab, originalText, translation]);

  const currentTargetText = sentences[selectedSentenceIdx] || "";
  const currentLangName = activeTab === 'original' ? "Bahasa Indonesia" : translation?.languageName || currentTargetLangLabel || "Bahasa Asing";
  const currentPhoneticGuide = activeTab === 'original' ? undefined : translation?.readingGuide;

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setSelectedSentenceIdx(0);
      stopRecording(true);
      setIsTtsLoading(false);
      setShowCalmingMessage(false);
      setShowMicPermission(false);
      if (ttsTimerRef.current) window.clearTimeout(ttsTimerRef.current);
    } else {
      if (!originalText.trim() && translation?.translatedText) {
        setActiveTab('translation');
      } else {
        setActiveTab('original');
      }
    }
  }, [isOpen, originalText, translation]);

  const handleListenExample = async () => {
    if (!currentTargetText.trim() || isAnalyzing || isRecording || isTtsLoading) return;
    
    setIsTtsLoading(true);
    setShowCalmingMessage(false);

    ttsTimerRef.current = window.setTimeout(() => {
      setCalmingMessage(CALMING_WAIT_MESSAGES[Math.floor(Math.random() * CALMING_WAIT_MESSAGES.length)]);
      setShowCalmingMessage(true);
    }, 2000);

    try {
      await generateSpeech(currentTargetText, currentLangName, currentPhoneticGuide);
    } catch (e) {
      alert("Maaf, Tara gagal membacakan contoh.");
    } finally {
      setIsTtsLoading(false);
      setShowCalmingMessage(false);
      if (ttsTimerRef.current) window.clearTimeout(ttsTimerRef.current);
    }
  };

  const startRecording = async () => {
    if (isAnalyzing || isTtsLoading) return;
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(true);
      mediaRecorder.start();
    } catch (err) { alert("Izin mikrofon diperlukan."); }
  };

  const stopRecording = (cancel = false) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      if (cancel) mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const processAudio = async (blob: Blob) => {
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      try {
        const data = await analyzePronunciation(base64Audio, mediaRecorderRef.current?.mimeType || 'audio/webm', currentTargetText, currentLangName);
        setResult(data);
        onSuccess();
      } catch (e) { alert("Tara gagal menganalisis."); }
      finally { setIsAnalyzing(false); }
    };
  };

  if (!isOpen) return null;

  const isFlower = theme === 'flower';
  const isDark = theme === 'dark';

  const modalBg = isFlower ? 'bg-petal-800' : 'bg-white dark:bg-[#0a1a12]';
  const labelColor = isFlower ? 'text-pink-400' : 'text-emerald-600/40 dark:text-emerald-400/30';
  const textColor = isFlower ? 'text-pink-50' : 'text-emerald-900 dark:text-emerald-50';
  const tabBg = isFlower ? 'bg-petal-900/50' : 'bg-emerald-50/50 dark:bg-emerald-900/20';
  const activeTabClass = isFlower ? 'bg-pink-500 text-white shadow-sm' : 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-emerald-100 shadow-sm';
  const boxBg = isFlower ? 'bg-petal-900/30 border-pink-500/20' : 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-800/20';
  const accentColorClass = isFlower ? 'text-pink-500 border-pink-500' : isDark ? 'text-amber-500 border-amber-500' : 'text-sky-600 border-sky-600';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`${modalBg} w-full max-w-3xl rounded-[3rem] p-8 md:p-12 shadow-2xl relative border overflow-hidden flex flex-col transition-colors max-h-[90vh] border-white/5`}>
        
        {showMicPermission && (
          <div className="absolute inset-0 z-[210] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`${modalBg} w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center border border-white/10`}>
              <div className="w-20 h-20 mx-auto mb-6 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center text-rose-600">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" cy="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </div>
              <h3 className={`text-xl font-bold ${textColor} mb-4`}>Izinkan Tara Mendengar?</h3>
              <p className={`text-xs italic leading-relaxed mb-8 ${isFlower ? 'text-pink-100/60' : 'text-emerald-950/60 dark:text-emerald-200/40'}`}>
                Tara perlu meminjam pendengaranmu untuk mengubah suara menjadi aksara. Rekaman suaramu hanya diproses seketika untuk transkripsi.
              </p>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setShowMicPermission(false); startRecording(); }} 
                  className={`py-3 rounded-xl font-bold bg-emerald-700 text-white active:scale-95 transition-all shadow-lg`}
                >
                  Ya, Saya Setuju
                </button>
                <button 
                  onClick={() => setShowMicPermission(false)} 
                  className={`py-3 rounded-xl font-bold ${isFlower ? 'text-pink-400' : 'text-emerald-600/40 dark:text-emerald-400/40'}`}
                >
                  Tidak, Lain Kali Saja
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={onClose} className={`absolute top-8 right-8 p-2 transition-colors ${isFlower ? 'text-pink-300 hover:text-pink-500' : 'text-emerald-300 dark:text-emerald-700 hover:text-red-700'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="mb-6">
          <span className={`text-[10px] font-bold uppercase tracking-[0.3em] block mb-2 ${labelColor}`}>Latihan Pelafalan</span>
          <h2 className={`text-3xl font-bold ${textColor}`}>Latihan Tutur</h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`flex p-1.5 ${tabBg} rounded-2xl`}>
            <button 
              onClick={() => { if(!isRecording && !isAnalyzing && !isTtsLoading) { setActiveTab('original'); setSelectedSentenceIdx(0); setResult(null); }}}
              disabled={isRecording || isAnalyzing || isTtsLoading}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${activeTab === 'original' ? activeTabClass : 'text-emerald-400 dark:text-emerald-600 hover:text-emerald-500'}`}
            >
              Bahasa Indonesia
            </button>
            <button 
              onClick={() => { if(!isRecording && !isAnalyzing && !isTtsLoading) { setActiveTab('translation'); setSelectedSentenceIdx(0); setResult(null); }}}
              disabled={isRecording || isAnalyzing || isTtsLoading || (!translation && !currentTargetLangLabel)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${activeTab === 'translation' ? activeTabClass : 'text-emerald-400 dark:text-emerald-600 hover:text-emerald-500'}`}
            >
              {translation?.languageName || currentTargetLangLabel || "Bahasa Target"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar modal-content-scroll space-y-6 pr-2">
          {sentences.length > 1 && (
            <div className="space-y-3">
              <h4 className={`text-[10px] font-bold uppercase tracking-widest ${labelColor}`}>Dahan Kalimat ({sentences.length})</h4>
              <div className="flex flex-col gap-2">
                {sentences.map((sentence, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { if(!isRecording && !isAnalyzing && !isTtsLoading) { setSelectedSentenceIdx(idx); setResult(null); }}}
                    className={`text-left p-4 rounded-2xl border text-sm transition-all ${selectedSentenceIdx === idx 
                      ? (isFlower ? 'bg-pink-500/20 border-pink-500 text-pink-100' : isDark ? 'bg-amber-500/20 border-amber-500 text-amber-100' : 'bg-sky-500/20 border-sky-600 text-sky-900') 
                      : (isFlower ? 'bg-petal-900/10 border-pink-500/10 text-pink-100/40 hover:bg-petal-900/20' : 'bg-black/5 border-transparent text-emerald-900/40 dark:text-emerald-100/40 hover:bg-black/10')
                    }`}
                  >
                    <span className="font-bold mr-3 opacity-40">{idx + 1}.</span>
                    <span className="line-clamp-1 italic">"{sentence}"</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`${boxBg} p-8 rounded-[2.5rem] border relative transition-all duration-500 ${sentences.length > 1 ? 'border-2 ' + accentColorClass.split(' ')[1] : ''}`}>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${labelColor}`}>
              Fokus Tutur {sentences.length > 1 ? `(Kalimat ${selectedSentenceIdx + 1})` : ''}
            </h3>
            <p className={`text-2xl font-medium leading-relaxed italic ${textColor}`}>
              "{currentTargetText || "Pilih atau tulis naskah di editor terlebih dahulu."}"
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                disabled={isRecording || isAnalyzing || isTtsLoading || !currentTargetText.trim()}
                onClick={handleListenExample}
                className={`flex-1 py-5 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 ${isFlower ? 'bg-pink-100/10 text-pink-100' : 'bg-emerald-100/50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'}`}
              >
                {isTtsLoading ? (
                  <div className={`w-5 h-5 border-2 rounded-full animate-spin ${isFlower ? 'border-pink-300 border-t-transparent' : 'border-emerald-700 dark:border-emerald-300 border-t-transparent'}`}></div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                )}
                {isTtsLoading ? 'Tara Membacakan...' : 'Dengar Contoh'}
              </button>
              <button 
                disabled={isAnalyzing || isTtsLoading || !currentTargetText.trim()}
                onClick={isRecording ? () => stopRecording() : () => setShowMicPermission(true)}
                className={`flex-1 py-5 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-30 ${isRecording ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/20' : (isFlower ? 'bg-pink-500 text-white shadow-pink-500/20' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400')}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                {isRecording ? 'Selesai Bertutur' : 'Mulai Berlatih'}
              </button>
            </div>
            {showCalmingMessage && isTtsLoading && (
              <p className={`text-center text-sm italic animate-in fade-in slide-in-from-top-2 duration-700 ${isFlower ? 'text-pink-100/40' : 'text-emerald-600/60'}`}>
                "{calmingMessage}"
              </p>
            )}
          </div>

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
               <div className={`w-12 h-12 border-4 rounded-full animate-spin ${isFlower ? 'border-pink-300 border-t-pink-600' : 'border-emerald-300 border-t-emerald-700'}`}></div>
               <p className={`text-xs font-bold uppercase tracking-widest ${isFlower ? 'text-pink-400' : 'text-emerald-700/60'}`}>Tara sedang menyisir suaramu...</p>
            </div>
          )}

          {result && !isAnalyzing && !isRecording && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-4">
              <div className={`flex items-center justify-between p-6 rounded-3xl border ${isFlower ? 'bg-pink-900/40 border-pink-500/20' : 'bg-white dark:bg-emerald-950 border-emerald-50 dark:border-emerald-900/20'}`}>
                <div>
                  <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${labelColor}`}>Skor Kelancaran</h4>
                  <p className={`text-4xl font-bold ${isFlower ? 'text-pink-300' : 'text-emerald-600'}`}>{result.score}%</p>
                </div>
              </div>
              <div className={`${boxBg} p-6 rounded-3xl border`}>
                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${labelColor}`}>Ulasan Tutur</h4>
                <p className={`font-medium leading-relaxed italic ${textColor}`}>"{result.feedback}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};