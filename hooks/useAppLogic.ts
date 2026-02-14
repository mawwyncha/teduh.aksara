// src/hooks/useAppLogic.ts
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext, TargetLanguage } from '../types';
import { analyzeGrammar, generateSpeech, askTaraAboutPlatform, transcribeAudio, preloadWebSpeechVoices } from '../services';
import { saveData, getData } from '../services/dbService';

const STORE_DRAFT = 'draft';
const STORE_HISTORY = 'history';
const STORE_SETTINGS = 'settings';

const KEY_CURRENT_DRAFT = 'current_draft';
const KEY_HISTORY_LIST = 'history_list';
const KEY_PREF_STYLE = 'pref_style';
const KEY_PREF_CONTEXT = 'pref_context';
const KEY_VIOLATION_COUNT = 'violation_count';
const KEY_PREF_LANG = 'pref_lang';
const KEY_DYSLEXIA = 'dyslexia_mode';
const KEY_USAGE_COUNT = 'daily_usage_count';
const KEY_USAGE_DATE = 'daily_usage_date';

const MAX_DAILY_REQUESTS = 25;
const MAX_VIOLATIONS = 2;
const MAX_CHARACTERS = 1000;

const FORBIDDEN_PATTERN = /(anjing|babi|bangsat|kontol|memek|jembut|ngentot|peler|asu|bajingan|tempik|tolol|goblok|idiot|perek|lonte|pantek|jablay|pecun|ngewe|itil|ngocok|brengsek|setan|iblis|pelacur|bencong|homo|lesbi|bejat|keparat|biadab|titit|vagina|penis|porn|bokep|lendir|sange|coly|coli|script|javascript:|eval\(|union\s+select|drop\s+table|insert\s+into|delete\s+from|--|<[^>]*>|onerror|onload)/gi;

const CALMING_MESSAGES = [
  "Tarik napas sejenak, biarkan Tara merapikan dahan bahasamu...",
  "Sabar ya, aksara terbaik butuh waktu untuk tumbuh sempurna...",
  "Tara sedang menyisir setiap kata dengan penuh kasih sayang...",
  "Menanti sejenak selagi embun aksara membasahi naskahmu...",
  "Nikmati ketenangan ini, Tara tidak akan membiarkan diksimu layu...",
  "Memilah diksi, merajut arti, semua demi naskah yang terpuji...",
  "Seperti kersen yang matang perlahan, naskahmu pun butuh ketelatenan...",
  "Menenangkan pikiran, menjernihkan tulisan...",
  "Tara sedang berbisik pada dahan-dahanan web untukmu..."
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

export const useAppLogic = () => {
  const [inputText, setInputText] = useState('');
  const [honeypot, setHoneypot] = useState(''); 
  const [isViolationDetected, setIsViolationDetected] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang] = useState<TargetLanguage>('en_us');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usageCount, setUsageCount] = useState(0);
  const [violationCount, setViolationCount] = useState(0); 
  const [hasAcceptedConsent, setHasAcceptedConsent] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'flower'>('light');
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [funFactMsg, setFunFactMsg] = useState("");
  
  const [permissionType, setPermissionType] = useState<'mic' | 'plagiarism' | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [isFanGalleryModalOpen, setIsFanGalleryModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isPronunciationModalOpen, setIsPronunciationModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef = useRef(false);
  const loadingTimerRef = useRef<number | null>(null);
  const isCanceledRef = useRef(false);
  const prevViolationRef = useRef(false);
  const pendingPlagiarismRef = useRef(false);

  const isBusy = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isBanned = violationCount >= MAX_VIOLATIONS;

  const playWarningChime = useCallback(() => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate([100, 30, 100, 30, 150]); 
      }

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
      
      setTimeout(() => {
        ctx.close().catch(err => console.warn("Failed to close AudioContext:", err));
      }, 500);
    } catch (e) {
      console.warn("Audio chime failed", e);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    setIsResultReady(false);
    const forbidden = FORBIDDEN_PATTERN.test(val);
    FORBIDDEN_PATTERN.lastIndex = 0;

    if (forbidden && !prevViolationRef.current) {
      playWarningChime();
      setMascotMessage("Dahanku berguncang... mohon gunakan bahasa yang santun, Sahabat.");
    } else if (!forbidden && prevViolationRef.current) {
      setMascotMessage("Terima kasih telah merapikan naskahmu kembali.");
    }
    setIsViolationDetected(forbidden);
    prevViolationRef.current = forbidden;
  }, [playWarningChime]);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.classList.contains('flower') ? 'flower' : (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      setCurrentTheme(theme);
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDyslexiaMode) {
      document.documentElement.classList.add('dyslexia-mode');
    } else {
      document.documentElement.classList.remove('dyslexia-mode');
    }
    
    if (isLoaded) {
      saveData(STORE_SETTINGS, KEY_DYSLEXIA, isDyslexiaMode);
    }
  }, [isDyslexiaMode, isLoaded]);

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
        if (dy !== undefined) {
           setIsDyslexiaMode(dy);
           document.documentElement.classList.toggle('dyslexia-mode', dy);
        }
        if (savedViolations !== undefined) setViolationCount(savedViolations);

        if (savedUsageDate !== today) {
          setUsageCount(0);
          saveData(STORE_SETTINGS, KEY_USAGE_DATE, today);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, 0);
        } else {
          const count = savedUsageCount || 0;
          setUsageCount(count);
          setIsLimitReached(count >= MAX_DAILY_REQUESTS);
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
    preloadWebSpeechVoices();
  }, []);

  const startAnalysis = useCallback(async (plagiarism: boolean) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setIsResultReady(false);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    
    if (plagiarism) {
       setMascotMessage("Tara sedang menelusuri dahan-dahanan web untuk naskahmu...");
    } else {
       setMascotMessage("Tara sedang menyisir dahan bahasamu...");
    }

    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current || isCanceledRef.current) return;

      if (data.isViolation) {
        const newViolations = violationCount + 1;
        setViolationCount(newViolations);
        await saveData(STORE_SETTINGS, KEY_VIOLATION_COUNT, newViolations);
        
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
        
        playWarningChime();
        setMascotMessage(newViolations >= MAX_VIOLATIONS ? "Dahanku berguncang... Etika Beraksara dilanggar." : "Hati-hati, Sahabat. Naskahmu melanggar Etika Beraksara. Ini peringatan pertama.");
        setIsViolationDetected(true);
        prevViolationRef.current = true;
        setIsAnalyzing(false);
        processActiveRef.current = false;
        return;
      }

      setResult(data);
      setIsResultReady(true);
      setMascotMessage(data.summary);
      
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      setIsLimitReached(newCount >= MAX_DAILY_REQUESTS);
      await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);

      const newHistoryItem: HistoryItem = { 
        id: Date.now().toString(36), 
        timestamp: Date.now(), 
        originalText: inputText, 
        result: data, 
        options: { style: selectedStyle, context: selectedContext } 
      };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 30);
      setHistory(updatedHistory);
      saveData(STORE_HISTORY, KEY_HISTORY_LIST, updatedHistory);
      
    } catch (error) { 
      if (processActiveRef.current) setMascotMessage("Dahanku berguncang, coba lagi ya."); 
    } finally { 
      setIsAnalyzing(false); 
      processActiveRef.current = false; 
    }
  }, [inputText, selectedStyle, selectedContext, targetLang, violationCount, usageCount, history, playWarningChime]);

  const triggerAnalysis = useCallback(async (plagiarism: boolean) => {
    if (isViolationDetected || isBusy) return;
    if (honeypot) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { 
      setIsLimitModalOpen(true); 
      return; 
    }
    
    pendingPlagiarismRef.current = plagiarism;
    await startAnalysis(plagiarism);
  }, [isViolationDetected, isBusy, honeypot, usageCount, startAnalysis]);

  const startRecording = useCallback(async () => {
    if (isBusy || usageCount >= MAX_DAILY_REQUESTS) return;
    setResult(null);
    setIsResultReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        processAudioTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(true);
      setRecordingCountdown(5);
      mediaRecorder.start();
      setMascotMessage("Aku mendengarkan... silakan bicara, Sahabat.");
      countdownIntervalRef.current = window.setInterval(() => {
        setRecordingCountdown(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) { 
      setMascotMessage("Aduh, aku tidak bisa mendengar. Pastikan izin mikrofon aktif.");
    }
  }, [isBusy, usageCount]);

  const stopRecording = useCallback((cancel = false) => {
    if (countdownIntervalRef.current) { 
      clearInterval(countdownIntervalRef.current); 
      countdownIntervalRef.current = null; 
    }
    
    if (mediaRecorderRef.current) {
      if (cancel) mediaRecorderRef.current.onstop = null;
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setIsRecording(false);
  }, []);

  const processAudioTranscription = useCallback(async (blob: Blob) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsTranscribing(true);
    setLoadingMsg("Tara sedang merangkai suaramu menjadi aksara...");
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    setMascotMessage("Mencoba menangkap setiap dahan suaraku...");
    
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      try {
        const text = await transcribeAudio(base64Audio, mediaRecorderRef.current?.mimeType || 'audio/webm');
        if (!processActiveRef.current || isCanceledRef.current) return;

        if (text && text.trim()) {
          setInputText(prev => prev ? prev + " " + text : text);
          setMascotMessage("Suaramu telah aku tanam di lembaran editor.");
          const newCount = usageCount + 1;
          setUsageCount(newCount);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
        } else {
          setMascotMessage("Maaf, suaraku tidak terdengar jelas oleh dahan-dahanku.");
        }
      } catch (e) { 
        if (processActiveRef.current) setMascotMessage("Dahanku berguncang saat mencoba mendengar."); 
      } finally { 
        setIsTranscribing(false); 
        processActiveRef.current = false;
      }
    };
  }, [usageCount]);

  const handleSpeech = useCallback(async () => {
    if (isBusy || (!inputText.trim() && !result)) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitModalOpen(true); return; }

    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsSpeaking(true);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setFunFactMsg(TARA_FUN_FACTS[Math.floor(Math.random() * TARA_FUN_FACTS.length)]);
    setMascotMessage("Tara sedang merangkai suara untuk naskahmu...");

    try {
      if (result) {
        await generateSpeech(`Hasil perbaikannya ${result.correctedText}`, "Bahasa Indonesia");
        if (!isCanceledRef.current && result.translation) {
          await new Promise(r => setTimeout(r, 600));
          if (!isCanceledRef.current) {
            await generateSpeech(
              `Terjemahan aksaranya ${result.translation.translatedText}`, 
              result.translation.languageName
            );
          }
        }
      } else {
        await generateSpeech(inputText, "Bahasa Indonesia");
      }
      if (!isCanceledRef.current) setMascotMessage("Begitulah alunan aksaramu, Sahabat.");
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      setIsLimitReached(newCount >= MAX_DAILY_REQUESTS);
      await saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
    } catch (error) { 
      if (!isCanceledRef.current) setMascotMessage("Aduh, suaraku tersangkut."); 
    } finally { 
      setIsSpeaking(false); 
      processActiveRef.current = false; 
    }
  }, [isBusy, inputText, result, usageCount]);

  const handleCopyTranslation = useCallback(() => {
    if (result?.translation?.translatedText) {
      navigator.clipboard.writeText(result.translation.translatedText);
      setMascotMessage("Terjemahan sudah aku salin ke papan klip, Sahabat.");
    }
  }, [result]);

  const handleSeeResult = useCallback(() => {
    setIsResultReady(false);
    const el = document.getElementById('result-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCancelProcess = useCallback((silent = false) => {
    isCanceledRef.current = true;
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    setIsResultReady(false);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.warn("Failed to stop media recorder:", err);
      }
    }
    
    setIsRecording(false);
    
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    
    if (!silent) setMascotMessage("Proses dibatalkan, Sahabat.");
  }, []);

  return {
    // State
    inputText, setInputText,
    honeypot, setHoneypot,
    isViolationDetected,
    selectedStyle, setSelectedStyle,
    selectedContext, setSelectedContext,
    targetLang, setTargetLang,
    isDyslexiaMode, setIsDyslexiaMode,
    history, setHistory,
    usageCount,
    violationCount,
    hasAcceptedConsent, setHasAcceptedConsent,
    currentTheme,
    result, setResult,
    isAnalyzing,
    isResultReady,
    isSpeaking,
    isRecording,
    isTranscribing,
    recordingCountdown,
    mascotMessage, setMascotMessage,
    loadingMsg,
    funFactMsg,
    permissionType, setPermissionType,
    // Added setIsLimitReached to fix error in App.tsx
    isLimitReached, setIsLimitReached,
    isLimitModalOpen, setIsLimitModalOpen,
    isHistoryModalOpen, setIsHistoryModalOpen,
    isGuideModalOpen, setIsGuideModalOpen,
    isDevModalOpen, setIsDevModalOpen,
    isFanGalleryModalOpen, setIsFanGalleryModalOpen,
    isCatalogModalOpen, setIsCatalogModalOpen,
    isPronunciationModalOpen, setIsPronunciationModalOpen,
    isLoaded,
    
    // Handlers
    handleInputChange,
    triggerAnalysis,
    startRecording,
    stopRecording,
    handleSpeech,
    handleCopyTranslation,
    handleSeeResult,
    handleCancelProcess,
    
    // Derived values
    isBusy,
    isBanned,
    
    // Constants
    MAX_DAILY_REQUESTS,
    MAX_CHARACTERS,
    charCount: inputText.length,
    quotaPercent: (usageCount / MAX_DAILY_REQUESTS) * 100,
    isQuotaLow: MAX_DAILY_REQUESTS - usageCount <= 5,
    isCharLimitNear: inputText.length >= MAX_CHARACTERS * 0.9,
  };
};