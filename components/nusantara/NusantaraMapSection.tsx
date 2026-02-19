import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROVINCE_DIALECTS, DialectInfo, MelodyNote } from './Province';
import { TargetLanguage } from '../../types';
import { JavaMap } from './regions/maps/JavaMap';
import { SumateraMap } from './regions/maps/SumateraMap';
import { KalimantanMap } from './regions/maps/KalimantanMap';
import { NusaTenggaraMap } from './regions/maps/NusaTenggaraMap';
import { SulawesiMap } from './regions/maps/SulawesiMap';
import { PapuaMap } from './regions/maps/PapuaMap';
import { fetchTTSAudio, generateSpeech, getAudioContext } from '../../services';
import { useFolkloreTTS } from '../../hooks/useFolkloreTTS';
import { GreetingModal } from './GreetingModal';
import * as Tone from 'tone';

interface NusantaraMapSectionProps {
  currentTheme: 'light' | 'dark' | 'flower';
  targetLang: TargetLanguage;
  inputBgClass: string;
  isResultReady: boolean;
  onSeeResult: () => void;
}

interface PianoKey {
  note: string;
  label: string;
  name: string;
  isBlack: boolean;
}

const PIANO_KEYS: PianoKey[] = [
  { note: 'G3', label: '5̣', name: 'Sol', isBlack: false },
  { note: 'G#3', label: '5̣#', name: 'Sel', isBlack: true },
  { note: 'A3', label: '6̣', name: 'La', isBlack: false },
  { note: 'A#3', label: '6̣#', name: 'Li', isBlack: true },
  { note: 'B3', label: '7̣', name: 'Si', isBlack: false },
  { note: 'C4', label: '1', name: 'Do', isBlack: false },
  { note: 'C#4', label: '1#', name: 'Di', isBlack: true },
  { note: 'D4', label: '2', name: 'Re', isBlack: false },
  { note: 'D#4', label: '2#', name: 'Ri', isBlack: true },
  { note: 'E4', label: '3', name: 'Mi', isBlack: false },
  { note: 'F4', label: '4', name: 'Fa', isBlack: false },
  { note: 'F#4', label: '4#', name: 'Fi', isBlack: true },
  { note: 'G4', label: '5', name: 'Sol', isBlack: false },
  { note: 'G#4', label: '5#', name: 'Sel', isBlack: true },
  { note: 'A4', label: '6', name: 'La', isBlack: false },
  { note: 'A#4', label: '6#', name: 'Li', isBlack: true },
  { note: 'B4', label: '7', name: 'Si', isBlack: false },
  { note: 'C5', label: '1̇', name: 'Do', isBlack: false },
  { note: 'C#5', label: '1̇#', name: 'Di', isBlack: true },
  { note: 'D5', label: '2̇', name: 'Re', isBlack: false },
  { note: 'D#5', label: '2̇#', name: 'Ri', isBlack: true },
  { note: 'E5', label: '3̇', name: 'Mi', isBlack: false },
  { note: 'F5', label: '4̇', name: 'Fa', isBlack: false },
  { note: 'F#5', label: '4̇#', name: 'Fi', isBlack: true },
  { note: 'G5', label: '5̇', name: 'Sol', isBlack: false },
  { note: 'G#5', label: '5̇#', name: 'Sel', isBlack: true },
  { note: 'A5', label: '6̇', name: 'La', isBlack: false },
  { note: 'A#5', label: '6̇#', name: 'Li', isBlack: true },
  { note: 'B5', label: '7̇', name: 'Si', isBlack: false },
  { note: 'C6', label: '1̇̇', name: 'Do', isBlack: false },
];

export const NusantaraMapSection: React.FC<NusantaraMapSectionProps> = ({ 
  currentTheme,
  targetLang,
  inputBgClass, 
  isResultReady,
  onSeeResult
}) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredCapital, setHoveredCapital] = useState<string | null>(null);
  const [showLongDesc, setShowLongDesc] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [showCredits, setShowCredits] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    native: true,
    community: false,
    foreign: false
  });

  const [hoveredDialect, setHoveredDialect] = useState<string | null>(null);
  const [selectedGreetingDialect, setSelectedGreetingDialect] = useState<DialectInfo | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isFolkloreLoading, setIsFolkloreLoading] = useState(false);
  const [folklorePlaying, setFolklorePlaying] = useState(false);
  const [showFolklore, setShowFolklore] = useState(false);
  const [isFolkloreVideoActive, setIsFolkloreVideoActive] = useState(false);
  const [isMelodyPlaying, setIsMelodyPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isWebSpeechMode, setIsWebSpeechMode] = useState(false);
  const [isPlayPending, setIsPlayPending] = useState(false);
  
  const folkloreAudioRef = useRef<HTMLAudioElement>(null);
  const synthRef = useRef<Tone.PolySynth | null>(null);

  const isFlower = currentTheme === 'flower';
  const isDark = currentTheme === 'dark';
  
  // Perbaikan warna latar belakang berdasarkan tema - mengikuti kode referensi
  const bgClass = isFlower 
    ? 'bg-petal-800 border-pink-500/20 text-petal-50' 
    : isDark 
      ? 'bg-emerald-950/20 border-emerald-800/30' 
      : 'bg-white border-emerald-50';

  const textColor = isFlower ? 'text-pink-100' : 'text-emerald-950 dark:text-emerald-50';
  const dotColor = isFlower ? '#FDFFF6' : (isDark ? '#FFD700' : '#D2042D');
  const accentColor = isFlower ? '#f472b6' : (isDark ? '#fbbf24' : '#059669');

  const chestTheme = isFlower ? {
    border: "#831843",
    woodTop: "#9d174d",
    woodBottom: "#be185d",
    woodPlankTop: "#ec4899",
    woodPlankBottom: "#f472b6",
    goldMain: "#fdf2f8",
    goldDark: "#fbcfe8",
    goldBright: "#ffffff",
    lockCore: "#3d2b1f"
  } : isDark ? {
    border: "#064e3b",
    woodTop: "#065f46",
    woodBottom: "#047857",
    woodPlankTop: "#059669",
    woodPlankBottom: "#10b981",
    goldMain: "#fbbf24",
    goldDark: "#b45309",
    goldBright: "#fef3c7",
    lockCore: "#1a110c"
  } : {
    border: "#4D061C",
    woodTop: "#801316",
    woodBottom: "#801316",
    woodPlankTop: "#D2042D",
    woodPlankBottom: "#D2042D",
    goldMain: "#fbbf24",
    goldDark: "#b45309",
    goldBright: "#fef3c7",
    lockCore: "#1a110c"
  };
  
  const folklore = PROVINCE_DIALECTS[selectedRegion]?.folklore;
  const languageName = "Bahasa Indonesia";
  
  // ========== HOOK TTS ==========
  const { 
    isPlaying, 
    isLoading, 
    progress, 
    duration, 
    currentTime, 
    play, 
    stop, 
    seek, 
    stopAllAudio 
  } = useFolkloreTTS();

  // ========== HANDLER ==========
  const handlePlayFolklore = async () => {
    if (isPlayPending) return;
    setIsPlayPending(true);
    setIsWebSpeechMode(process.env.NODE_ENV === 'development');
    await play(PROVINCE_DIALECTS[selectedRegion]?.folklore?.story || '', languageName);
    setTimeout(() => setIsPlayPending(false), 1000);
  };

  const handleCloseModal = () => {
    stopAllAudio();
    setSelectedRegion(null);
  };

  // SCROLL LOCK logic for region detail pop-up
  useEffect(() => {
    if (selectedRegion) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedRegion]);

  useEffect(() => {
    return () => {
      stopMelody();
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
    };
  }, []);

  useEffect(() => {
    if (!selectedRegion) {
      setShowLongDesc(false);
      setSongProgress(0);
      setHoveredDialect(null);
      setIsFolkloreVideoActive(false);
      setShowFolklore(false);
      stopMelody();
    }
  }, [selectedRegion]);

  const toggleUnfold = () => {
    playSoftChime();
    setIsUnfolded(!isUnfolded);
    setShowCredits(false);
  };

  const handleRegionClick = (name?: string) => {
    playSoftChime();
    if (name) setSelectedRegion(name);
    else setSelectedRegion(null);
  };

  const handleMouseEnter = (name: string) => {
    setHoveredRegion(name);
    const capital = PROVINCE_DIALECTS[name]?.capital || "-";
    setHoveredCapital(capital);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    setHoveredCapital(null);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const playSoftChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
      setTimeout(() => ctx.close(), 500);
    } catch (e) {}
  }, []);

  const stopMelody = useCallback(() => {
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    if (synthRef.current) {
      synthRef.current.releaseAll();
      synthRef.current.dispose();
      synthRef.current = null;
    }
    setIsMelodyPlaying(false);
    setActiveNote(null);
  }, []);

  const playSingleNote = async (note: string) => {
    try {
      await Tone.start();
      if (!synthRef.current) {
        synthRef.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.2, release: 1.2 }
        }).toDestination();
      }
      synthRef.current.triggerAttackRelease(note, "8n");
      setActiveNote(note);
      setTimeout(() => setActiveNote(null), 200);
    } catch (e) {}
  };

  const playMelody = useCallback(async (melodyNotes: MelodyNote[]) => {
    if (isMelodyPlaying) {
      stopMelody();
      return;
    }

    try {
      await Tone.start();
      setIsMelodyPlaying(true);
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
      Tone.getTransport().bpm.value = 110; 

      if (!synthRef.current) {
        synthRef.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.2, release: 1.2 }
        }).toDestination();
      }
      
      const synth = synthRef.current;

      melodyNotes.forEach((noteData) => {
        Tone.getTransport().schedule((time) => {
          Tone.Draw.schedule(() => {
            if (synthRef.current) setActiveNote(noteData.note);
          }, time);
          if (synthRef.current) synth.triggerAttackRelease(noteData.note, noteData.duration, time);
        }, noteData.time);
      });

      const lastNote = melodyNotes[melodyNotes.length - 1];
      const totalDurationSeconds = Tone.Time(lastNote.time).toSeconds() + Tone.Time(lastNote.duration).toSeconds();

      Tone.getTransport().schedule((t) => {
        Tone.Draw.schedule(() => {
          if (synthRef.current) stopMelody();
        }, t);
      }, totalDurationSeconds + 0.5);

      Tone.getTransport().start();
    } catch (e) {
      console.error("Melody playback failed", e);
      stopMelody();
    }
  }, [isMelodyPlaying, stopMelody]);

  const stopFolklore = useCallback(() => {
    if (folkloreAudioRef.current) {
      if (folkloreAudioRef.current.src.startsWith('blob:')) {
        URL.revokeObjectURL(folkloreAudioRef.current.src);
      }
      folkloreAudioRef.current.pause();
      folkloreAudioRef.current.src = "";
    }
    setFolklorePlaying(false);
  }, []);

  const generateLocalGreeting = async (dialectName: string, description: string) => {
    try {
      const greetingText = `Halo dari ${dialectName}! ${description}`;
      await generateSpeech(greetingText, "Bahasa Indonesia");
    } catch (error) {
      console.error("Gagal generate greeting:", error);
    }
  };

  const handlePlayDialectGreeting = async (e: React.MouseEvent, dialect: DialectInfo) => {
    e.stopPropagation();  
    setSelectedGreetingDialect(dialect);
  };

  const renderDialectList = (dialects: DialectInfo[], categoryLabel: string, sectionKey: string) => {
    if (!dialects || dialects.length === 0) return null;
    const isExpanded = expandedSections[sectionKey];

    return (
      <div className="mb-6 last:mb-0">
        <button 
          onClick={() => toggleSection(sectionKey)}
          className={`w-full flex items-center justify-between p-5 mb-2 rounded-2xl transition-all border ${isFlower 
              ? 'bg-petal-900/40 border-pink-500/20 hover:bg-petal-900/60' 
              : 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-100/50 dark:border-emerald-800/30 hover:bg-emerald-100/50'
          }`}
        >
          <h4 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {categoryLabel} ({dialects.length})
          </h4>
          <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${isFlower ? 'text-pink-50' : 'text-emerald-500'}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isExpanded && (
          <div className="space-y-4 mt-4 px-1 animate-in fade-in slide-in-from-top-2 duration-300">
            {dialects.map((dialect, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => { 
                    playSoftChime(); 
                    setHoveredDialect(hoveredDialect === dialect.name ? null : dialect.name); 
                  }}
                  className={`flex-1 flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                    hoveredDialect === dialect.name 
                      ? (isFlower 
                          ? 'bg-pink-500 border-pink-400 text-white shadow-lg' 
                          : 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                        )
                      : (isFlower 
                          ? 'bg-petal-900/20 border-pink-500/10 text-pink-100 hover:translate-x-1' 
                          : 'bg-white dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 text-emerald-950 dark:text-emerald-100 hover:translate-x-1'
                        )
                  }`}
                >
                    <span className="text-lg">{isFlower ? '✨' : '🌱'}</span>
                    <span className="text-sm font-bold tracking-tight">{dialect.name}</span>
                  </div>
                  <button 
                    onClick={(e) => handlePlayDialectGreeting(e, dialect)}
                    className={`p-3 rounded-2xl transition-all active:scale-90 relative shrink-0 ${
                      isFlower 
                        ? 'bg-pink-100/10 text-pink-400 hover:bg-pink-500/20' 
                        : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                    title={`Dengar Sapaan ${dialect.name}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  </button>
                </div>

                {hoveredDialect === dialect.name && (
                  <div className={`p-6 rounded-2xl border animate-in fade-in slide-in-from-top-1 duration-300 ${isFlower ? 'bg-petal-900/60 border-pink-500/10' : 'bg-emerald-50/40 dark:bg-black/40 border-emerald-100 dark:border-emerald-800/20'}`}>
                    {dialect.endonim && (
                      <div className="mb-4">
                        <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isFlower ? 'text-pink-300' : 'text-emerald-500/80 dark:text-emerald-400/80'}`}>Endonim:</h4>
                        <p className={`text-xs leading-relaxed italic ${isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-200'}`}>{dialect.endonim}</p>
                      </div>
                    )}
                    {dialect.makna && (
                      <div className="mb-4">
                        <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isFlower ? 'text-pink-300' : 'text-emerald-500/80 dark:text-emerald-400/80'}`}>Asal-Usul Nama:</h4>
                        <p className={`text-xs leading-relaxed italic ${isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-200'}`}>{dialect.makna}</p>
                      </div>
                    )}
                    {dialect.description && (
                      <div>
                        <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isFlower ? 'text-pink-300' : 'text-emerald-500/80 dark:text-emerald-400/80'}`}>Informasi:</h4>
                        <p className={`text-xs leading-relaxed italic ${isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-200'}`}>{dialect.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const mapProps = {
    isFlower,
    isDark,
    accentColor,
    hoveredRegion,
    hoveredCapital,
    handleRegionClick,
    handleMouseEnter,
    handleMouseLeave,
  };

  const whiteKeysList = PIANO_KEYS.filter(k => !k.isBlack);
  const whiteKeyWidthPercent = 100 / whiteKeysList.length;

  const getBlackKeyLeft = (note: string) => {
    const baseNote = note.replace('#', '');
    const whiteIdx = whiteKeysList.findIndex(k => k.note === baseNote);
    if (whiteIdx === -1) return 0;
    return (whiteIdx + 1) * whiteKeyWidthPercent;
  };

  return (
    <div className={`w-full p-4 md:p-8 rounded-[2.5rem] border transition-all relative overflow-hidden flex flex-col items-center justify-center ${bgClass} min-h-[220px]`}>
      {!isUnfolded ? (
        <div onClick={toggleUnfold} className="flex flex-col items-center justify-center cursor-pointer group transition-all duration-500 hover:scale-110 active:scale-95">
          <div className="relative">
            <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-full ${isFlower ? 'bg-pink-400' : 'bg-amber-400'}`}></div>
            <svg width="100" height="90" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" className="relative z-10 drop-shadow-xl transition-all duration-700">
              <rect x="1" y="2" width="14" height="10" fill={chestTheme.border} />
              <rect x="2" y="3" width="12" height="3" fill={chestTheme.woodTop} /> 
              <rect x="2" y="7" width="12" height="4" fill={chestTheme.woodBottom} /> 
              <rect x="2" y="4" width="12" height="1" fill={chestTheme.woodPlankTop} />
              <rect x="2" y="9" width="12" height="1" fill={chestTheme.woodPlankBottom} />
              <rect x="1" y="2" width="14" height="1" fill={chestTheme.goldMain} />
              <rect x="1" y="6" width="14" height="1" fill={chestTheme.goldMain} />
              <rect x="1" y="11" width="14" height="1" fill={chestTheme.goldMain} />
              <rect x="1" y="2" width="1" height="10" fill={chestTheme.goldDark} />
              <rect x="14" y="2" width="1" height="10" fill={chestTheme.goldDark} />
              <rect x="4" y="2" width="1" height="4" fill={chestTheme.goldMain} />
              <rect x="11" y="2" width="1" height="4" fill={chestTheme.goldMain} />
              <rect x="4" y="7" width="1" height="4" fill={chestTheme.goldMain} />
              <rect x="11" y="7" width="1" height="4" fill={chestTheme.goldMain} />
              <rect x="6" y="5" width="4" height="4" fill={chestTheme.goldDark} />
              <rect x="7" y="5" width="2" height="3" fill={chestTheme.goldBright} />
              <rect x="7" y="6" width="2" height="1" fill={chestTheme.lockCore} />
            </svg>
          </div>
          <p className={`mt-6 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse transition-colors duration-700 ${isFlower ? 'text-pink-400' : 'text-emerald-700 dark:text-amber-400'}`}>
            Buka Peti Budaya
          </p>
        </div>
      ) : (
        <div className="w-full animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
          <div className={`w-full max-w-3xl h-4 rounded-t-full shadow-lg z-20 border-b ${isFlower ? 'bg-petal-900 border-pink-500/20' : 'bg-emerald-50 dark:bg-[#1a110c] border-emerald-100 dark:border-emerald-800/30'}`}></div>
          <div className={`w-full relative py-12 px-4 sm:px-10 border-x transition-all duration-1000 ${isFlower ? 'bg-petal-900/40 border-pink-500/10' : 'bg-white/40 dark:bg-[#0a1a12]/40 border-emerald-50 dark:border-emerald-800/20'}`}>
            
            <div className="absolute top-4 left-4 z-40 flex items-center gap-2 group/credit">
              <button 
                onClick={() => setShowCredits(!showCredits)}
                className={`p-1.5 rounded-full transition-all active:scale-90 flex items-center justify-center border ${isFlower ? 'bg-petal-800 text-pink-400 border-pink-500/20' : 'bg-white/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30'}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </button>
              {showCredits && (
                <div className={`px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-left-2 duration-300 ${isFlower ? 'bg-petal-900/90 border-pink-500/30 text-pink-200' : 'bg-white/90 dark:bg-emerald-950/90 border-emerald-100 dark:border-emerald-800/30 text-emerald-800 dark:text-emerald-200'}`}>
                  <p className="text-[10px] font-bold whitespace-nowrap">Peta ini dibuat menggunakan data dari Simplemaps di bawah lisensi Creative Commons.</p>
                </div>
              )}
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <h2 className={`text-[11px] font-bold uppercase tracking-[0.6em] font-sans opacity-40 transition-colors duration-700 ${isFlower ? 'text-pink-400' : 'text-emerald-700 dark:text-emerald-400'}`}>Peta Nusantara</h2>
            </div>
            
            <button onClick={toggleUnfold} className={`absolute top-4 right-4 p-2 rounded-full transition-all active:scale-90 z-30 ${isFlower ? 'text-pink-300 hover:text-pink-100' : 'text-emerald-400 hover:text-red-500'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="relative w-full flex flex-col items-center">
              <svg 
                baseProfile="tiny" fill={isFlower ? "#d8b4a6" : (isDark ? "#143a28" : "#6f9c76")} 
                stroke={isDark ? "#064e3b" : "#ffffff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth=".6" 
                viewBox="0 0 1000 368" width="100%" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet" className="w-full h-auto drop-shadow-sm transition-all duration-1000"
                style={{ touchAction: 'manipulation' }}
              >
                <g transform="translate(5, 5) scale(0.98)">
                  <g className="transition-opacity duration-300" style={{ pointerEvents: 'auto' }}>
                  <g className="pointer-events-none" id="label_points" stroke="none">
                    <circle cx="467.7" cy="70" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="560.4" cy="306" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="357" cy="139.9" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="919.8" cy="213.1" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="384.3" cy="284.9" r="3" fill={dotColor} className="opacity-20 animate-pulse" /> 
                    <circle cx="728.9" cy="194.2" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="487.1" cy="307.5" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="538.9" cy="205.5" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="338.4" cy="279.8" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="294.6" cy="270.4" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="279.6" cy="257" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="265" cy="262" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="350.1" cy="290.6" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="572.9" cy="203.6" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="792.6" cy="160.1" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="571.3" cy="161" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="693.2" cy="106" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="306.5" cy="55.3" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="176.1" cy="125.2" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="586.7" cy="118.9" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="624.1" cy="120" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="524.1" cy="190.8" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="199.1" cy="167.3" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="223" cy="204.1" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="243.9" cy="229.4" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="193.8" cy="204.9" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="160.4" cy="151.3" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="126.7" cy="83.9" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="82.9" cy="45.8" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="410.5" cy="168.6" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="448.7" cy="193.7" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="445.2" cy="299.8" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="262.9" cy="178" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                    <circle cx="469.2" cy="125.4" r="3" fill={dotColor} className="opacity-20 animate-pulse" />
                  </g>
                  <SumateraMap {...mapProps} />
                  <JavaMap {...mapProps} />
                  <KalimantanMap {...mapProps} />
                  <NusaTenggaraMap {...mapProps} />
                  <SulawesiMap {...mapProps} />
                  <PapuaMap {...mapProps} />
                  </g>
                </g>
              </svg>
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 px-5 py-2 rounded-2xl border backdrop-blur-xl transition-all duration-500 shadow-xl z-20 whitespace-nowrap ${hoveredRegion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isFlower ? 'bg-petal-900/90 border-pink-500/30' : 'bg-white/90 dark:bg-emerald-950/90 border-emerald-100 dark:border-emerald-800/30'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  Provinsi: <span className={textColor}>{hoveredRegion || '-'}</span>
                </p>
              </div>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-5 py-2 rounded-2xl border backdrop-blur-xl transition-all duration-500 shadow-xl z-20 whitespace-nowrap ${hoveredCapital ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isFlower ? 'bg-petal-900/90 border-pink-500/30' : 'bg-white/90 dark:bg-emerald-950/90 border-emerald-100 dark:border-emerald-800/30'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  Ibukota: <span className={textColor}>{hoveredCapital || '-'}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={`w-full max-w-3xl h-4 rounded-b-full shadow-inner border-t ${isFlower ? 'bg-petal-900 border-pink-500/20' : 'bg-emerald-50 dark:bg-[#1a110c] border-emerald-100 dark:border-emerald-800/30'}`}></div>
          <button onClick={toggleUnfold} className={`mt-6 px-8 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-black/5 ${isFlower ? 'text-pink-400' : 'text-emerald-700 dark:text-emerald-400'}`}>Tutup Peta</button>
        </div>
      )}

      {selectedRegion && (
        <div 
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
          onClick={handleCloseModal}
        >
          <div className={`w-full max-w-4xl rounded-[3rem] shadow-2xl relative border overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[85vh] ${isFlower ? 'bg-petal-800 border-pink-500/20' : 'bg-white dark:bg-[#0a1a12] border-emerald-50 dark:border-emerald-800/20'}`} onClick={(e) => e.stopPropagation()}>
            <audio ref={folkloreAudioRef} preload="metadata" />

            <div className={`sticky top-0 z-[260] p-8 md:p-10 pb-4 border-b shrink-0 ${isFlower ? 'bg-petal-800 border-pink-500/10' : 'bg-white dark:bg-[#0a1a12] border-emerald-100 dark:border-emerald-800/20'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.3em] block mb-2 ${isFlower ? 'text-pink-400' : 'text-emerald-600/60 dark:text-emerald-400/40'}`}>Eksplorasi Aksara</span>
                  <h3 className={`text-2xl font-bold ${textColor}`}>{selectedRegion}</h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className={`p-2 rounded-full transition-all active:scale-90 ${isFlower ? 'bg-pink-100/10 text-pink-300 hover:text-pink-100' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-400 hover:text-red-500'}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="18" cy="6" x2="6" y2="18"></line>
                    <line x1="6" cy="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar px-8 md:px-10 pb-8 pt-6">
              <div className="space-y-6">
                {PROVINCE_DIALECTS[selectedRegion] ? (
                  <>
                    <div className={`w-full aspect-[16/10] rounded-3xl overflow-hidden mb-4 border-2 relative group/img transition-all duration-700 hover:scale-[1.01] ${isFlower ? 'border-pink-500/20 shadow-xl' : 'border-emerald-500/10 shadow-lg'}`}>
                      <img src={PROVINCE_DIALECTS[selectedRegion].headerImage} alt={`Landskap ${selectedRegion}`} className="w-full h-full object-cover transition-all duration-1000" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"; }} />
                      {PROVINCE_DIALECTS[selectedRegion].headerDescription && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md border-t border-white/10 translate-y-full group-hover/img:translate-y-0 transition-transform duration-500">
                          <p className="text-[11px] text-white font-bold tracking-widest uppercase text-center">{PROVINCE_DIALECTS[selectedRegion].headerDescription}</p>
                        </div>
                      )}
                    </div>

                    {PROVINCE_DIALECTS[selectedRegion].headerLongDescription && (
                      <div className="mb-8">
                        <button onClick={() => { playSoftChime(); setShowLongDesc(!showLongDesc); }} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isFlower ? 'bg-pink-500/10 border-pink-500/20 text-pink-200' : 'bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/20 text-emerald-800 dark:text-emerald-300'}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-lg">🌿</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Apa Yang Ikonik?</span>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 ${showLongDesc ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                        <div className={`grid transition-all duration-500 ease-in-out ${showLongDesc ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                          <div className="overflow-hidden">
                            <div className={`p-5 rounded-2xl border italic text-sm leading-relaxed ${isFlower ? 'bg-petal-900/40 border-pink-500/10 text-pink-100/70' : 'bg-emerald-50/10 dark:bg-black/20 border-emerald-50 dark:border-emerald-800/10 text-emerald-900/80 dark:text-emerald-200/60'}`}>
                              {PROVINCE_DIALECTS[selectedRegion].headerLongDescription}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {PROVINCE_DIALECTS[selectedRegion].regionalSong && (
                      <div className={`p-6 rounded-[2rem] border transition-all mb-8 relative ${isFlower ? 'bg-pink-900/40 border-pink-500/20' : 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800/30'}`}>
                        <div className="flex items-center gap-5 relative z-10">
                          <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all shadow-md ${isFlower ? 'bg-pink-900/50 text-pink-300 border border-pink-500/10' : 'bg-white dark:bg-emerald-900/30 text-emerald-600'}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] block mb-1 opacity-60 ${isFlower ? 'text-pink-300' : 'text-emerald-700 dark:text-emerald-400'}`}>Lagu Daerah</span>
                            <h4 className={`text-lg font-bold wrap ${textColor}`}>{PROVINCE_DIALECTS[selectedRegion].regionalSong?.title}</h4>
                            <p className={`text-[11px] italic opacity-60 wrap ${textColor}`}>{PROVINCE_DIALECTS[selectedRegion].regionalSong?.description}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <button onClick={() => playMelody(PROVINCE_DIALECTS[selectedRegion].regionalSong?.melodyNotes || [])} className={`w-full py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isMelodyPlaying ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20' : (isFlower ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20')}`}>
                        {isMelodyPlaying ? <><span className="text-sm">⏸️</span>Berhenti Memutar: {activeNote}</> : <><span className="text-sm">▶️</span>Dengar Melodi Instrumen</>}
                      </button>

                      <div className={`p-4 rounded-[2.5rem] border transition-all ${isFlower ? 'bg-pink-900/20 border-pink-500/10' : 'bg-black/5 dark:bg-white/5 border-emerald-100 dark:border-emerald-800/10'}`}>
                        <div className="flex justify-center items-center mb-4">
                           <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>Papan Piano Latihan</p>
                        </div>
                        
                        <div className="relative w-full h-40 sm:h-52 mt-4 px-4 overflow-hidden">
                          <div className="absolute inset-0 flex px-4">
                            {whiteKeysList.map((key, i) => (
                              <button
                                key={`white-${i}`}
                                onMouseDown={() => playSingleNote(key.note)}
                                className={`relative flex flex-col items-center justify-end pb-3 h-full rounded-b-lg border-x border-b-4 transition-all duration-75 active:translate-y-1 active:border-b-0 touch-none shadow-sm ${activeNote === key.note ? (isFlower ? 'bg-pink-200 border-pink-400' : 'bg-amber-100 border-amber-300') : 'bg-white hover:bg-gray-50 border-gray-200'}`}
                                style={{ width: `${whiteKeyWidthPercent}%`, flexShrink: 0 }}
                              >
                                <span className="text-[9px] font-bold text-gray-400 select-none pointer-events-none">{key.label}</span>
                              </button>
                            ))}

                            {PIANO_KEYS.filter(k => k.isBlack).map((key, i) => (
                              <button
                                key={`black-${i}`}
                                onMouseDown={() => playSingleNote(key.note)}
                                className={`absolute top-0 h-[60%] z-20 rounded-b-md border-b-4 transition-all active:h-[58%] active:border-b-0 touch-none shadow-md ${activeNote === key.note ? (isFlower ? 'bg-pink-400 border-pink-600' : 'bg-amber-400 border-amber-600') : (isFlower ? 'bg-[#3d2b1f] border-black' : 'bg-[#1a110c] hover:bg-[#333] border-black')}`}
                                style={{ 
                                  left: `${getBlackKeyLeft(key.note)}%`, 
                                  width: `${whiteKeyWidthPercent * 0.5}%`,
                                  transform: 'translateX(-50%)'
                                }}
                              >
                                <div className="flex items-end justify-center h-full pb-2 pointer-events-none">
                                  <span className="text-[7px] font-bold text-white/40 select-none">{key.label}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className={`text-[9px] text-center italic opacity-40 font-bold uppercase tracking-widest mt-4 ${textColor}`}>Ketuk tuts untuk mencoba tangga nada khas daerah</p>
                      </div>
                    </div>

                    {PROVINCE_DIALECTS[selectedRegion].folklore && (
                      <div className="mb-10">
                        <button 
                          onClick={() => { playSoftChime(); setShowFolklore(!showFolklore); }} 
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isFlower ? 'bg-pink-500/10 border-pink-500/20 text-pink-200' : 'bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/20 text-emerald-800 dark:text-emerald-300'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">✨</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Cerita Rakyat</span>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 ${showFolklore ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>

                        <div className={`grid transition-all duration-500 ease-in-out ${showFolklore ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                          <div className="overflow-hidden">
                            <div className={`p-8 rounded-[2.5rem] border transition-all relative overflow-hidden group/folk ${isFlower ? 'bg-petal-900/60 border-pink-500/30' : 'bg-emerald-950/20 border-emerald-100 dark:border-emerald-800/30'}`}>
                              <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                  <div>
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.4em] block mb-1 opacity-60 ${isFlower ? 'text-pink-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                      Dongeng Nusantara
                                    </span>
                                    <h4 className={`text-xl font-bold ${textColor}`}>
                                      {PROVINCE_DIALECTS[selectedRegion]?.folklore?.title}
                                    </h4>
                                  </div>
                                  
                                  <button 
                                    onClick={() => isPlaying ? stop() : handlePlayFolklore()}
                                    disabled={isLoading || isPlayPending} 
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${
                                      isPlaying 
                                        ? 'bg-red-500 text-white animate-pulse' 
                                        : (isFlower ? 'bg-pink-500 text-white' : 'bg-emerald-600 text-white')
                                    }`}
                                  >
                                    {isLoading || isPlayPending ? (
                                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : isPlaying ? (
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" />
                                        <rect x="14" y="4" width="4" height="16" />
                                      </svg>
                                    ) : (
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    )}
                                  </button>
                                </div>

                                {!isPlaying && !isLoading && progress === 0 && (
                                  <div className={`mb-4 px-4 py-2 rounded-xl border flex items-center gap-2 ${
                                    isFlower 
                                      ? 'bg-pink-900/30 border-pink-500/20 text-pink-200' 
                                      : 'bg-emerald-900/30 border-emerald-500/20 text-emerald-200'
                                  }`}>
                                    <span className="text-lg">✨</span>
                                    <span className="text-xs font-semibold">Audio siap diputar</span>
                                  </div>
                                )}

                                {PROVINCE_DIALECTS[selectedRegion].folklore?.videoUrl && (
                                  <div 
                                    className="w-full aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-inner bg-black/20 group/vid relative cursor-pointer"
                                    onClick={async () => {
                                      if (!isFolkloreVideoActive) {
                                        setIsVideoLoading(true);
                                        await new Promise(resolve => setTimeout(resolve, 800));
                                        setIsFolkloreVideoActive(true);
                                        setIsVideoLoading(false);
                                      }
                                    }}
                                  >
                                    {!isFolkloreVideoActive ? (
                                      <>
                                        <img 
                                          src={PROVINCE_DIALECTS[selectedRegion].folklore?.videoPosterUrl || PROVINCE_DIALECTS[selectedRegion].headerImage} 
                                          alt="Sampul Dongeng" 
                                          className="w-full h-full object-cover transition-all duration-700 md:group-hover/vid:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/vid:bg-black/50 transition-all duration-500">
                                          <div className={`w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 md:group-hover/vid:scale-110 ${isFlower ? 'bg-pink-500/20 border-pink-500/40 text-white' : 'bg-white/20 border-white/40 text-white'}`}>
                                            {isVideoLoading ? (
                                              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                                <path d="M8 5v14l11-7z" />
                                              </svg>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <video 
                                        src={PROVINCE_DIALECTS[selectedRegion].folklore?.videoUrl} 
                                        autoPlay controls 
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                )}
                                
                                <div className={`p-5 rounded-3xl border mb-6 backdrop-blur-sm transition-all ${isFlower ? 'bg-pink-900/30 border-pink-500/10' : 'bg-white/5 border-white/10'}`}>
                                  <p className={`text-sm leading-relaxed italic font-medium ${isFlower ? 'text-pink-100/80' : 'text-emerald-950/80 dark:text-emerald-100/80'}`}>
                                    "{PROVINCE_DIALECTS[selectedRegion].folklore?.story}"
                                  </p>
                                </div>
                                
                                {/* ========== PROGRESS BAR - SELALU BISA DIGESER! ========== */}
                                <div className={`p-4 rounded-2xl border flex flex-col gap-3 transition-all opacity-100 translate-y-0 ${isFlower ? 'bg-pink-900/40 border-pink-500/20' : 'bg-black/20 border-white/5'}`}>
                                  
                                  <div className="flex justify-between items-center">
                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${isFlower ? 'text-pink-300' : 'text-emerald-50'}`}>
                                      {isPlaying ? 'Sedang Mendongeng...' : progress > 0 ? 'Lanjutkan Mendongeng' : 'Mulai Mendongeng'}
                                    </span>
                                    <span className={`text-[8px] font-mono ${isFlower ? 'text-pink-300/60' : 'text-white/40'}`}>
                                      {Math.floor(progress)}%
                                    </span>
                                  </div>
                                  
                                  <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    step="0.1" 
                                    value={progress} 
                                    onChange={async (e) => {
                                      const newProgress = parseFloat(e.target.value);
                                      await seek(newProgress, PROVINCE_DIALECTS[selectedRegion]?.folklore?.story || '', languageName);
                                    }}
                                    className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-current ${
                                      isFlower 
                                        ? 'text-pink-500 bg-pink-100/10 [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/50 [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-150 transition-all' 
                                        : 'text-emerald-500 bg-white/10 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/50 [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-150 transition-all'
                                    }`} 
                                  />
                                  
                                  {process.env.NODE_ENV === 'development' && isPlaying && isWebSpeechMode && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <span className="text-[8px] text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="inline">
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        Mode Web Speech
                                      </span>
                                    </div>
                                  )}
                                  
                                  {duration > 0 && !(process.env.NODE_ENV === 'development' && isPlaying && isWebSpeechMode) && (
                                    <div className="flex justify-between items-center mt-1">
                                      <span className={`text-[8px] font-mono ${isFlower ? 'text-pink-300/50' : 'text-white/30'}`}>
                                        {new Date(currentTime * 1000).toISOString().substr(14, 5)}
                                      </span>
                                      <span className={`text-[8px] font-mono ${isFlower ? 'text-pink-300/50' : 'text-white/30'}`}>
                                        {new Date(duration * 1000).toISOString().substr(14, 5)}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {progress === 100 && !isPlaying && (
                                    <div className="flex justify-center mt-2">
                                      <button
                                        onClick={handlePlayFolklore}
                                        className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all active:scale-95 ${
                                          isFlower 
                                            ? 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30' 
                                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                                        }`}
                                      >
                                        🔄 Putar Ulang
                                      </button>
                                    </div>
                                  )}
                                  
                                </div>
                                {/* ========== END PROGRESS BAR ========== */}
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className={`text-[11px] mb-6 italic opacity-70 leading-relaxed ${textColor}`}>Klik untuk melihat dahan bahasa di {selectedRegion}:</p>
                    {renderDialectList(PROVINCE_DIALECTS[selectedRegion].native, "Bahasa Pribumi", "native")}
                    {renderDialectList(PROVINCE_DIALECTS[selectedRegion].community, "Bahasa Peranakan Nusantara", "community")}
                    {renderDialectList(PROVINCE_DIALECTS[selectedRegion].foreign || [], "Bahasa Peranakan Asing", "foreign")}
                  </>
                ) : <div className="py-20 text-center"><p className={`text-sm italic opacity-50 ${textColor}`}>Informasi sedang dikumpulkan...</p></div>}
              </div>
            </div>
          </div>
          {isResultReady && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[300] w-full max-w-sm px-4 animate-in slide-in-from-bottom-10 duration-500 animate-bounce">
              <div className={`p-4 rounded-[2rem] border shadow-2xl flex items-center justify-between gap-4 backdrop-blur-2xl ${isFlower ? 'bg-pink-600/95 border-pink-400 text-white' : 'bg-emerald-800/95 border-emerald-500 text-white'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-bounce">✨</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest leading-none mb-1">Kabar dari Tara</p>
                    <p className="text-[10px] opacity-90 italic">Naskahmu selesai dirapikan!</p>
                  </div>
                </div>
                <button 
                  onClick={() => { 
                    stopAllAudio();
                    setSelectedRegion(null);
                    onSeeResult();
                  }}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg ${isFlower ? 'bg-white text-pink-600 hover:bg-pink-50' : 'bg-white text-emerald-800 hover:bg-emerald-50'}`}
                >
                  Lihat Hasil
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <GreetingModal 
        isOpen={!!selectedGreetingDialect}
        onClose={() => setSelectedGreetingDialect(null)}
        dialect={selectedGreetingDialect}
        regionImage={selectedRegion ? PROVINCE_DIALECTS[selectedRegion]?.headerImage : ''}
        theme={currentTheme}
      />
    </div>
  );
};