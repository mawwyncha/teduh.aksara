import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Mascot } from './components/Mascot';
import { HistoryCard } from './components/HistoryCard';
import { NusantaraMapSection } from './components/nusantara/NusantaraMapSection';
import { ActionSidebar } from './components/ActionSidebar';
import { UsageStats } from './components/UsageStats';
import { EditorSection } from './components/EditorSection';
import { ResultsSection } from './components/ResultsSection';
import { BannedView } from './components/BannedView';
import { TreeHugger } from './components/TreeHugger';
import { GardenPromoBox } from './components/GardenPromoBox';
import { AnalysisResult, HistoryItem, WritingStyle, WritingContext, TargetLanguage } from './types';

// ─── Service Imports ──────────────────────────────────────────────────────────
// Semua fungsi dari services/index.ts — tidak ada lagi ./services/geminiService
import {
  analyzeGrammar,
  transcribeAudio,
  askTaraAboutPlatform,
  generateSpeech,
  preloadWebSpeechVoices,
  saveData,
  getData,
  callGeminiAPI,
  sanitizeInput,
} from './services/index';
import { aiOrchestrator } from './services/ai-orchestrator';

// ─── Lazy-loaded Modals ───────────────────────────────────────────────────────
const HistoryModal      = lazy(() => import('./components/HistoryModal').then(m => ({ default: m.HistoryModal })));
const GuideModal        = lazy(() => import('./components/GuideModal').then(m => ({ default: m.GuideModal })));
const DeveloperModal    = lazy(() => import('./components/DeveloperModal').then(m => ({ default: m.DeveloperModal })));
const FanGalleryModal   = lazy(() => import('./components/FanGalleryModal').then(m => ({ default: m.FanGalleryModal })));
const CatalogModal      = lazy(() => import('./components/CatalogModal').then(m => ({ default: m.CatalogModal })));
const PermissionModal   = lazy(() => import('./components/PermissionModal').then(m => ({ default: m.PermissionModal })));
const LimitModal        = lazy(() => import('./components/LimitModal').then(m => ({ default: m.LimitModal })));
import { ConsentModal } from './components/ConsentModal';
const PronunciationModal = lazy(() => import('./components/PronunciationModal').then(m => ({ default: m.PronunciationModal })));

// ─── analyzeFacts — fact-check lokal via callGeminiAPI ───────────────────────
// Fungsi ini tidak ada di services lama, dibuat lokal agar tidak mengubah services
const analyzeFacts = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await callGeminiAPI('generateContent', {
      model: 'gemini-1.5-flash',
      contents: [{
        parts: [{ text: `Verifikasi fakta dalam teks berikut:\n"${sanitizeInput(text)}"\n\nBerikan analisis singkat tentang klaim-klaim yang bisa diverifikasi.` }]
      }],
      config: {
        systemInstruction:
          'Kamu adalah Tara, pemeriksa fakta yang bijak dan teliti. ' +
          'Berikan ringkasan singkat dalam bahasa Indonesia tentang klaim yang ada. ' +
          'Respon harus singkat, puitis, dan tidak menghakimi.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            correctedText:   { type: 'string' },
            summary:         { type: 'string' },
            styleScore:      { type: 'number' },
            readingGuideIndo: { type: 'string' },
            isViolation:     { type: 'boolean' },
            suggestions:     { type: 'array', items: { type: 'object' } },
            translation: {
              type: 'object',
              properties: {
                translatedText: { type: 'string' },
                languageName:   { type: 'string' },
                readingGuide:   { type: 'string' },
              },
            },
          },
          required: ['correctedText', 'summary', 'styleScore', 'suggestions',
                     'translation', 'readingGuideIndo', 'isViolation'],
        },
      },
    });
    return JSON.parse(response.text || '{}') as AnalysisResult;
  } catch (e) {
    console.error('analyzeFacts gagal:', e);
    return {
      correctedText: text,
      summary: 'Tara tidak berhasil menelusuri dahan kebenaran kali ini.',
      styleScore: 0,
      readingGuideIndo: '',
      isViolation: false,
      suggestions: [],
      translation: { translatedText: text, languageName: 'Bahasa Indonesia', readingGuide: '' },
    } as AnalysisResult;
  }
};

// ─── Konstanta ────────────────────────────────────────────────────────────────
const STORE_HISTORY    = 'history';
const STORE_SETTINGS   = 'settings';

const KEY_HISTORY_LIST     = 'history_list';
const KEY_PREF_STYLE       = 'pref_style';
const KEY_PREF_CONTEXT     = 'pref_context';
const KEY_VIOLATION_COUNT  = 'violation_count';
const KEY_PREF_LANG        = 'pref_lang';
const KEY_DYSLEXIA         = 'dyslexia_mode';
const KEY_USAGE_COUNT      = 'daily_usage_count';
const KEY_USAGE_DATE       = 'daily_usage_date';
const KEY_CONSENT_ACCEPTED = 'consent_accepted_v1';

const MAX_DAILY_REQUESTS = 25;
const MAX_VIOLATIONS     = 2;
const RECAPTCHA_SITE_KEY = "6LdTFlUsAAAAALH-MlZGFD7tFEo_1x1FJBWIYNAK";

const FORBIDDEN_PATTERN = new RegExp(
  '(anjing|babi|bangsat|kontol|memek|jembut|ngentot|peler|asu|bajingan|tempik|tolol|goblok|idiot|perek|lonte|pantek|jablay|pecun|ngewe|itil|ngocok|brengsek|setan|iblis|pelacur|bencong|homo|lesbi|bejat|keparat|biadab|titit|vagina|penis|porn|bokep|lendir|sange|coly|coli|script|javascript:|eval\\(|union\\s+select|drop\\s+table|insert\\s+into|delete\\s+from|--|<[^>]*>|onerror|onload)',
  'gi'
);

const CALMING_MESSAGES = [
  "Tarik napas sejenak, biarkan Tara merapikan dahan bahasamu...",
  "Sabar ya, aksara terbaik butuh waktu untuk tumbuh sempurna...",
  "Tara sedang menyisir setiap kata dengan penuh kasih sayang...",
  "Menanti sejenak selagi embun aksara membasahi naskahmu...",
  "Nikmati ketenangan ini, Tara tidak akan membiarkan diksimu layu...",
  "Memilah diksi, merajut arti, semua demi naskah yang terpuji...",
  "Tara sedang berbisik pada dahan-dahanan web untukmu...",
];

// ─── Opsi Bahasa ──────────────────────────────────────────────────────────────
export const LANG_OPTIONS = [
  { value: 'id',  label: 'Bahasa Indonesia' },
  { value: 'en',  label: 'English' },
  { value: 'jv',  label: 'Basa Jawa' },
  { value: 'su',  label: 'Basa Sunda' },
  { value: 'ms',  label: 'Bahasa Melayu' },
  { value: 'ar',  label: 'العربية' },
  { value: 'zh',  label: '中文' },
  { value: 'ja',  label: '日本語' },
  { value: 'ko',  label: '한국어' },
  { value: 'fr',  label: 'Français' },
  { value: 'de',  label: 'Deutsch' },
  { value: 'es',  label: 'Español' },
];

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export const App: React.FC = () => {
  // State utama
  const [inputText, setInputText]             = useState('');
  const [isViolationDetected, setIsViolationDetected] = useState(false);
  const [selectedStyle, setSelectedStyle]     = useState<WritingStyle>('formal');
  const [selectedContext, setSelectedContext] = useState<WritingContext>('general');
  const [targetLang, setTargetLang]           = useState<TargetLanguage>('id');
  const [isDyslexiaMode, setIsDyslexiaMode]   = useState(false);
  const [history, setHistory]                 = useState<HistoryItem[]>([]);
  const [usageCount, setUsageCount]           = useState(0);
  const [violationCount, setViolationCount]   = useState(0);
  const [isHelpActive, setIsHelpActive]       = useState(false);
  const [hasAcceptedConsent, setHasAcceptedConsent] = useState<boolean | null>(null);
  const [currentTheme, setCurrentTheme]       = useState<'light' | 'dark' | 'flower'>('light');
  const [result, setResult]                   = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing]         = useState(false);
  const [isResultReady, setIsResultReady]     = useState(false);
  const [isSpeaking, setIsSpeaking]           = useState(false);
  const [isRecording, setIsRecording]         = useState(false);
  const [isTranscribing, setIsTranscribing]   = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(5);
  const [mascotMessage, setMascotMessage]     = useState('');
  const [loadingMsg, setLoadingMsg]           = useState('');
  const [permissionType, setPermissionType]   = useState<'mic' | 'plagiarism' | 'factcheck' | null>(null);
  const [isLimitReached, setIsLimitReached]   = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen]               = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen]           = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen]               = useState(false);
  const [isDevModalOpen, setIsDevModalOpen]                   = useState(false);
  const [isFanGalleryModalOpen, setIsFanGalleryModalOpen]     = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen]           = useState(false);
  const [isPronunciationModalOpen, setIsPronunciationModalOpen] = useState(false);
  const [isLoaded, setIsLoaded]               = useState(false);

  // Refs
  const mediaRecorderRef     = useRef<MediaRecorder | null>(null);
  const audioChunksRef       = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const processActiveRef     = useRef(false);
  const isCanceledRef        = useRef(false);
  const prevViolationRef     = useRef(false);

  // Derived state
  const isBusy   = isAnalyzing || isSpeaking || isRecording || isTranscribing;
  const isBanned = violationCount >= MAX_VIOLATIONS;

  // ─── Effects ──────────────────────────────────────────────────────────────

  // Deteksi tema aktif via MutationObserver
  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      const theme = root.classList.contains('flower') ? 'flower'
        : root.classList.contains('dark') ? 'dark' : 'light';
      setCurrentTheme(theme);
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  // Scroll lock saat modal terbuka
  useEffect(() => {
    const anyModalOpen =
      isHistoryModalOpen || isGuideModalOpen || isDevModalOpen ||
      isFanGalleryModalOpen || isCatalogModalOpen || isPronunciationModalOpen ||
      isLimitModalOpen || hasAcceptedConsent === false || !!permissionType;
    document.body.classList.toggle('modal-open', anyModalOpen);
  }, [
    isHistoryModalOpen, isGuideModalOpen, isDevModalOpen,
    isFanGalleryModalOpen, isCatalogModalOpen, isPronunciationModalOpen,
    isLimitModalOpen, hasAcceptedConsent, permissionType,
  ]);

  // Dyslexia mode
  useEffect(() => {
    document.documentElement.classList.toggle('dyslexia-mode', isDyslexiaMode);
    if (isLoaded) saveData(STORE_SETTINGS, KEY_DYSLEXIA, isDyslexiaMode);
  }, [isDyslexiaMode, isLoaded]);

  // Hydrate data dari IndexedDB
  useEffect(() => {
    (async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [h, s, c, l, dy, savedUsageDate, savedUsageCount, savedViolations, savedConsent] =
          await Promise.all([
            getData(STORE_HISTORY, KEY_HISTORY_LIST),
            getData(STORE_SETTINGS, KEY_PREF_STYLE),
            getData(STORE_SETTINGS, KEY_PREF_CONTEXT),
            getData(STORE_SETTINGS, KEY_PREF_LANG),
            getData(STORE_SETTINGS, KEY_DYSLEXIA),
            getData(STORE_SETTINGS, KEY_USAGE_DATE),
            getData(STORE_SETTINGS, KEY_USAGE_COUNT),
            getData(STORE_SETTINGS, KEY_VIOLATION_COUNT),
            getData(STORE_SETTINGS, KEY_CONSENT_ACCEPTED),
          ]);

        if (h)  setHistory(h);
        if (s)  setSelectedStyle(s);
        if (c)  setSelectedContext(c);
        if (l)  setTargetLang(l);
        if (dy !== undefined) setIsDyslexiaMode(dy);
        if (savedViolations !== undefined) setViolationCount(savedViolations);

        setHasAcceptedConsent(savedConsent === true);

        if (savedUsageDate !== today) {
          setUsageCount(0);
          saveData(STORE_SETTINGS, KEY_USAGE_DATE, today);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, 0);
        } else {
          setUsageCount(savedUsageCount || 0);
          setIsLimitReached((savedUsageCount || 0) >= MAX_DAILY_REQUESTS);
        }

        setMascotMessage('Selamat datang kembali, Sahabat Aksara. Aku Tara, mari merawat naskahmu.');
      } catch (err) {
        console.warn('Hydration error:', err);
        setHasAcceptedConsent(false);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  // Preload Web Speech voices
  useEffect(() => { preloadWebSpeechVoices(); }, []);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleAcceptConsent = async () => {
    setHasAcceptedConsent(true);
    await saveData(STORE_SETTINGS, KEY_CONSENT_ACCEPTED, true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    setIsResultReady(false);
    const forbidden = FORBIDDEN_PATTERN.test(val);
    FORBIDDEN_PATTERN.lastIndex = 0;
    if (forbidden && !prevViolationRef.current) {
      setMascotMessage('Dahanku berguncang... mohon gunakan bahasa yang santun, Sahabat.');
    }
    setIsViolationDetected(forbidden);
    prevViolationRef.current = forbidden;
  };

  const handleCancelProcess = useCallback(() => {
    isCanceledRef.current = true;
    processActiveRef.current = false;
    setIsAnalyzing(false);
    setIsSpeaking(false);
    setIsTranscribing(false);
    setIsResultReady(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setMascotMessage('Proses dibatalkan, Sahabat.');
  }, []);

  const handleAskInfo = async () => {
    if (isBusy) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitReached(true); setIsLimitModalOpen(true); return; }
    const info = await askTaraAboutPlatform();
    setMascotMessage(info);
    const nc = usageCount + 1;
    setUsageCount(nc);
    saveData(STORE_SETTINGS, KEY_USAGE_COUNT, nc);
  };

  // ─── Analisis ─────────────────────────────────────────────────────────────

  const startAnalysis = useCallback(async (plagiarism: boolean) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setIsResultReady(false);
    setLoadingMsg(CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)]);
    setMascotMessage(
      plagiarism ? 'Tara sedang menelusuri dahan web...' : 'Tara sedang menyisir dahan bahasamu...'
    );

    try {
      const data = await analyzeGrammar(inputText, selectedStyle, selectedContext, targetLang, plagiarism);
      if (!processActiveRef.current || isCanceledRef.current) return;

      if (data.isViolation) {
        const nv = violationCount + 1;
        setViolationCount(nv);
        await saveData(STORE_SETTINGS, KEY_VIOLATION_COUNT, nv);
        setMascotMessage(nv >= MAX_VIOLATIONS ? 'Akses ditutup.' : 'Hati-hati, naskahmu melanggar etika.');
        setIsViolationDetected(true);
        setIsAnalyzing(false);
        return;
      }

      setResult(data);
      setIsResultReady(true);
      setMascotMessage(data.summary);

      const newCount = usageCount + 1;
      setUsageCount(newCount);
      saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);

      const newHist: HistoryItem = {
        id: Date.now().toString(36),
        timestamp: Date.now(),
        originalText: inputText,
        result: data,
        options: { style: selectedStyle, context: selectedContext },
      };
      const updatedHistory = [newHist, ...history].slice(0, 30);
      setHistory(updatedHistory);
      saveData(STORE_HISTORY, KEY_HISTORY_LIST, updatedHistory);

    } catch (error) {
      setMascotMessage('Dahanku berguncang, coba lagi ya.');
    } finally {
      setIsAnalyzing(false);
      processActiveRef.current = false;
    }
  }, [inputText, selectedStyle, selectedContext, targetLang, violationCount, usageCount, history]);

  const triggerAnalysis = useCallback((plagiarism: boolean) => {
    if (isViolationDetected || isBusy || !inputText.trim()) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitModalOpen(true); return; }
    startAnalysis(plagiarism);
  }, [isViolationDetected, isBusy, inputText, usageCount, startAnalysis]);

  const triggerFactCheck = async () => {
    if (isViolationDetected || isBusy || !inputText.trim()) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitModalOpen(true); return; }
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsAnalyzing(true);
    setIsResultReady(false);
    setLoadingMsg('Tara sedang memverifikasi naskahmu...');
    setMascotMessage('Menyisir dahan kebenaran...');
    try {
      const data = await analyzeFacts(inputText);
      if (!processActiveRef.current || isCanceledRef.current) return;
      setResult(data);
      setIsResultReady(true);
      setMascotMessage(data.summary);
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      saveData(STORE_SETTINGS, KEY_USAGE_COUNT, newCount);
    } catch (e) {
      setMascotMessage('Gagal mencari fakta.');
    } finally {
      setIsAnalyzing(false);
      processActiveRef.current = false;
    }
  };

  // ─── Audio / Recording ────────────────────────────────────────────────────

  const stopRecording = (cancel = false) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      if (cancel) mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const processAudioTranscription = async (blob: Blob) => {
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsTranscribing(true);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const b64 = (reader.result as string).split(',')[1];
      try {
        const text = await transcribeAudio(b64, mediaRecorderRef.current?.mimeType || 'audio/webm');
        if (!processActiveRef.current || isCanceledRef.current) return;
        if (text) {
          setInputText(p => (p ? p + ' ' + text : text));
          setMascotMessage('Suaramu telah aku tuliskan.');
          const nc = usageCount + 1;
          setUsageCount(nc);
          saveData(STORE_SETTINGS, KEY_USAGE_COUNT, nc);
        }
      } catch (e) {
        // silent
      } finally {
        setIsTranscribing(false);
        processActiveRef.current = false;
      }
    };
  };

  const startRecording = async () => {
    if (isBusy || usageCount >= MAX_DAILY_REQUESTS) return;
    setResult(null);
    setIsResultReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        processAudioTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      setIsRecording(true);
      setRecordingCountdown(5);
      mediaRecorder.start();
      setMascotMessage('Aku mendengarkan...');
      countdownIntervalRef.current = window.setInterval(() => {
        setRecordingCountdown(p => {
          if (p <= 1) { stopRecording(); return 0; }
          return p - 1;
        });
      }, 1000);
    } catch (err) {
      setMascotMessage('Izin mikrofon diperlukan.');
    }
  };

  const handleSpeech = async () => {
    if (isBusy || (!inputText.trim() && !result)) return;
    if (usageCount >= MAX_DAILY_REQUESTS) { setIsLimitModalOpen(true); return; }
    isCanceledRef.current = false;
    processActiveRef.current = true;
    setIsSpeaking(true);
    setMascotMessage('Tara sedang merangkai suara...');
    try {
      if (result) {
        await generateSpeech(
          `Hasil perbaikannya ${result.correctedText}`,
          'Bahasa Indonesia',
          result.readingGuideIndo
        );
        if (!isCanceledRef.current && result.translation) {
          await new Promise(r => setTimeout(r, 600));
          if (!isCanceledRef.current) {
            await generateSpeech(
              `Terjemahannya ${result.translation.translatedText}`,
              result.translation.languageName,
              result.translation.readingGuide
            );
          }
        }
      } else {
        await generateSpeech(inputText, 'Bahasa Indonesia');
      }
      setMascotMessage('Begitulah alunan aksaramu.');
    } catch (e) {
      // silent
    } finally {
      setIsSpeaking(false);
      processActiveRef.current = false;
    }
  };

  // ─── Guard render ─────────────────────────────────────────────────────────

  if (!isLoaded) return null;
  if (isBanned) return <BannedView />;

  // ─── Theme helpers ────────────────────────────────────────────────────────
  const isFlower = currentTheme === 'flower';
  const isDark   = currentTheme === 'dark';

  const sidebarCardClass = isFlower
    ? 'bg-petal-800 border-pink-500/20 shadow-xl'
    : isDark
    ? 'bg-emerald-950/20 border-emerald-800/30'
    : 'bg-white border-emerald-50 shadow-sm';

  const jejahHeaderClass = isFlower ? 'text-pink-400' : 'opacity-30';

  // ─── JSX ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Layout
        activeModal={
          isHistoryModalOpen ? 'history'
          : isGuideModalOpen ? 'guide'
          : isDevModalOpen ? 'dev'
          : isFanGalleryModalOpen ? 'gallery'
          : isCatalogModalOpen ? 'catalog'
          : null
        }
        onHistoryClick={() => !isBusy && setIsHistoryModalOpen(true)}
        onGuideClick={() => !isBusy && setIsGuideModalOpen(true)}
        onDevClick={() => !isBusy && setIsDevModalOpen(true)}
        onGalleryClick={() => !isBusy && setIsFanGalleryModalOpen(true)}
        onCatalogClick={() => !isBusy && setIsCatalogModalOpen(true)}
        onEditorClick={() => {
          if (!isBusy) {
            setIsHistoryModalOpen(false);
            setIsGuideModalOpen(false);
            setIsDevModalOpen(false);
            setIsFanGalleryModalOpen(false);
            setIsCatalogModalOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        isHelpActive={isHelpActive}
        onHelpToggle={() => !isBusy && setIsHelpActive(p => !p)}
        isBusy={isBusy}
      >
        <div className="flex flex-col gap-8 max-w-7xl w-full mx-auto pb-32">
          <ActionSidebar
            isBusy={isBusy}
            isDyslexiaMode={isDyslexiaMode}
            toggleDyslexia={() => setIsDyslexiaMode(p => !p)}
            openMicPermission={() => setPermissionType('mic')}
            handleSpeech={handleSpeech}
            openPronunciation={() => setIsPronunciationModalOpen(true)}
            currentTheme={currentTheme}
          />

          <div className="space-y-8 w-full max-w-5xl mx-auto">
            <Mascot
              message={mascotMessage}
              isLoading={isBusy}
              forcedExpression={isViolationDetected ? 'shocked' : isRecording ? 'happy' : undefined}
              onAskInfo={handleAskInfo}
            />

            <UsageStats
              usageCount={usageCount}
              maxRequests={MAX_DAILY_REQUESTS}
              currentTheme={currentTheme}
            />

            <NusantaraMapSection
              currentTheme={currentTheme}
              targetLang={targetLang}
              inputBgClass=""
              isResultReady={isResultReady}
              onSeeResult={() =>
                document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' })
              }
            />

            <EditorSection
              inputText={inputText}
              setInputText={setInputText}
              isBusy={isBusy}
              isRecording={isRecording}
              recordingCountdown={recordingCountdown}
              loadingMsg={loadingMsg}
              isViolationDetected={isViolationDetected}
              currentTheme={currentTheme}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              selectedContext={selectedContext}
              setSelectedContext={setSelectedContext}
              targetLang={targetLang}
              setTargetLang={setTargetLang}
              handleInputChange={handleInputChange}
              triggerAnalysis={triggerAnalysis}
              triggerFactCheck={triggerFactCheck}
              handleCancelProcess={handleCancelProcess}
              stopRecording={stopRecording}
              resetResult={() => setResult(null)}
              usageCount={usageCount}
              maxRequests={MAX_DAILY_REQUESTS}
            />

            {result && !isAnalyzing && (
              <ResultsSection
                result={result}
                currentTheme={currentTheme}
                openPronunciation={() => setIsPronunciationModalOpen(true)}
              />
            )}

            {/* Grid bawah: Jejak Lokal + TreeHugger + GardenPromoBox */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className={`p-8 rounded-[2.5rem] border flex flex-col h-full transition-colors duration-500 ${sidebarCardClass}`}>
                <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-6 ${jejahHeaderClass}`}>
                  Jejak Lokal
                </h2>
                <div className="space-y-4 flex-1">
                  {history.slice(0, 3).map(item => (
                    <HistoryCard
                      key={item.id}
                      item={item}
                      onSelect={(it) => {
                        if (!isBusy) {
                          setInputText(it.originalText);
                          setResult(it.result);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <TreeHugger />

              <GardenPromoBox
                isFlower={currentTheme === 'flower'}
                isDark={currentTheme === 'dark'}
              />
            </div>
          </div>
        </div>

        {/* Modal */}
        <Suspense fallback={null}>
          {hasAcceptedConsent === false && (
            <ConsentModal
              isOpen={true}
              onAccept={handleAcceptConsent}
              onReject={() => { window.location.href = 'https://google.com'; }}
              recaptchaSiteKey={RECAPTCHA_SITE_KEY}
            />
          )}

          {permissionType && (
            <PermissionModal
              type={permissionType}
              onAccept={() => {
                if (permissionType === 'mic') startRecording();
                else if (permissionType === 'plagiarism') triggerAnalysis(true);
                else triggerFactCheck();
                setPermissionType(null);
              }}
              onDeny={() => setPermissionType(null)}
            />
          )}

          <LimitModal
            isOpen={isLimitReached && isLimitModalOpen}
            onClose={() => setIsLimitModalOpen(false)}
          />

          <HistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            history={history}
            onSelectItem={(it) => {
              setInputText(it.originalText);
              setResult(it.result);
            }}
            onClearAll={() => {
              if (confirm('Hapus semua?')) setHistory([]);
            }}
          />

          <GuideModal
            isOpen={isGuideModalOpen}
            onClose={() => setIsGuideModalOpen(false)}
          />

          <DeveloperModal
            isOpen={isDevModalOpen}
            onClose={() => setIsDevModalOpen(false)}
          />

          <FanGalleryModal
            isOpen={isFanGalleryModalOpen}
            onClose={() => setIsFanGalleryModalOpen(false)}
          />

          <CatalogModal
            isOpen={isCatalogModalOpen}
            onClose={() => setIsCatalogModalOpen(false)}
          />

          <PronunciationModal
            isOpen={isPronunciationModalOpen}
            onClose={() => setIsPronunciationModalOpen(false)}
            originalText={result?.correctedText || inputText}
            translation={result?.translation}
            currentTargetLangLabel={
              LANG_OPTIONS.find(opt => opt.value === targetLang)?.label || targetLang
            }
            onSuccess={() => {}}
          />
        </Suspense>
      </Layout>
    </>
  );
};

export default App;