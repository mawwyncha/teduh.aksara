import React, { useState, useCallback, useEffect } from 'react';

interface MascotProps {
  message: string;
  isLoading?: boolean;
  onAskInfo?: () => void;
  forcedExpression?: Expression;
}

interface Particle {
  id: number;
  type: 'cherry' | 'leaf' | 'flower';
  left: number;
  duration: string;
  drift: string;
  rotation: string;
}

type Expression = 'normal' | 'embarrassed' | 'happy' | 'shocked' | 'dizzy' | 'cool';

export const Mascot: React.FC<MascotProps> = ({ message, isLoading, onAskInfo, forcedExpression }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [expression, setExpression] = useState<Expression>('normal');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reaction, setReaction] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'flower'>('light');

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

  useEffect(() => {
    if (forcedExpression) {
      setExpression(forcedExpression);
    } else {
      setExpression('normal');
    }
  }, [forcedExpression]);

  const expressions: { type: Expression; text: string }[] = [
    { type: 'embarrassed', text: theme === 'flower' ? "Aduh! Bunga-bunga pinkku berjatuhan! 🌸🌿" : "Aduh! Buah kersen dan daunku berjatuhan! 🍒🌿" },
    { type: 'happy', text: "Geli tahu! Rasanya seperti disiram pupuk organik pilihan! ✨" },
    { type: 'shocked', text: "Hah?! Kupikir ada ulat bulu yang lewat! Terkejut aku! 🐛" },
    { type: 'dizzy', text: "Aduh pusing... duniaku berputar seperti gasing kayu! 😵‍💫" },
    { type: 'cool', text: theme === 'flower' ? "Tenang, Sahabat. Gugurnya kelopak pink ini sungguh puitis. 😎" : "Tenang, Sahabat. Daun yang jatuh adalah bagian dari estetika. 😎" }
  ];

  const playTaraSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [440, 493, 523, 587, 659, 783, 880];
      const frequency = notes[Math.floor(Math.random() * notes.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
      setTimeout(() => ctx.close(), 600);
    } catch (e) {
      console.warn("Audio Context tidak didukung");
    }
  }, []);

  const handleClick = () => {
    if (isShaking || forcedExpression) return;
    
    playTaraSound();
    setIsShaking(true);
    
    const randomExp = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExp.type);
    setReaction(randomExp.text);
    
    const count = 18;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      type: theme === 'flower' ? (Math.random() > 0.4 ? 'flower' : 'leaf') : (Math.random() > 0.4 ? 'cherry' : 'leaf'),
      left: Math.random() * 100,
      duration: (1.5 + Math.random() * 2) + 's',
      drift: (Math.random() * 200 - 100) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setIsShaking(false), 600);
    setTimeout(() => {
      if (!forcedExpression) setExpression('normal');
      setReaction(null);
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 4000);
  };

  const expressionColor = theme === 'flower' ? "#3d2b1f" : (theme === 'dark' ? "#e0f2f1" : "#212121");

  const renderEyes = () => {
    switch (expression) {
      case 'embarrassed':
        return (
          <g>
            <path d="M32 50 L40 55 L32 60" fill="none" stroke={expressionColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 50 L60 55 L68 60" fill="none" stroke={expressionColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'happy':
        return (
          <g>
            <path d="M30 55 Q40 45 50 55" fill="none" stroke={expressionColor} strokeWidth="3" strokeLinecap="round" transform="translate(-8, 0)" />
            <path d="M50 55 Q60 45 70 55" fill="none" stroke={expressionColor} strokeWidth="3" strokeLinecap="round" transform="translate(8, 0)" />
          </g>
        );
      case 'shocked':
        return (
          <g>
            <circle cx="35" cy="52" r="7" fill="white" stroke={expressionColor} strokeWidth="1" />
            <circle cx="65" cy="52" r="7" fill="white" stroke={expressionColor} strokeWidth="1" />
            <circle cx="35" cy="52" r="3" fill={expressionColor} />
            <circle cx="65" cy="52" r="3" fill={expressionColor} />
          </g>
        );
      case 'dizzy':
        return (
          <g>
            <path d="M32 52 L38 58 M38 52 L32 58" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M62 52 L68 58 M68 52 L62 58" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'cool':
        return (
          <g>
            <rect x="28" y="48" width="18" height="4" rx="2" fill={expressionColor} />
            <rect x="54" y="48" width="18" height="4" rx="2" fill={expressionColor} />
          </g>
        );
      default: // Normal
        return (
          <g className="animate-tree-blink">
            <circle cx="40" cy="52" r="6" fill="white" />
            <circle cx="60" cy="52" r="6" fill="white" />
            <circle cx="40" cy="52" r="3.5" fill={theme === 'dark' ? "#050a08" : "#212121"} />
            <circle cx="60" cy="52" r="3.5" fill={theme === 'dark' ? "#050a08" : "#212121"} />
          </g>
        );
    }
  };

  const renderMouth = () => {
    switch (expression) {
      case 'embarrassed':
        return <circle cx="50" cy="68" r="4" fill="none" stroke={expressionColor} strokeWidth="2.5" />;
      case 'happy':
        return <path d="M40 64 Q50 72 60 64" fill="none" stroke={expressionColor} strokeWidth="3" strokeLinecap="round" />;
      case 'shocked':
        return <circle cx="50" cy="70" r="5" fill={expressionColor} />;
      case 'dizzy':
        return <path d="M45 68 Q47 64 50 68 Q53 72 55 68" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />;
      case 'cool':
        return <path d="M48 68 Q55 68 58 64" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />;
      default:
        return <path d="M44 64 Q50 68 56 64" fill={expressionColor} stroke="none" />;
    }
  };

  return (
    <div className={`backdrop-blur-xl p-8 rounded-[3rem] border shadow-2xl flex flex-col sm:flex-row items-center gap-10 transition-all relative overflow-hidden group ${theme === 'flower' ? 'bg-petal-800 border-pink-500/30' : 'bg-white/70 dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10'}`}>
      <div className="absolute inset-0 pointer-events-none z-[100]">
        {particles.map(p => (
          <div 
            key={p.id}
            className="animate-particle"
            style={{ 
              left: `${p.left}%`, 
              top: '-40px',
              '--duration': p.duration,
              '--drift': p.drift 
            } as React.CSSProperties}
          >
            {p.type === 'cherry' ? (
              <div className="flex flex-col items-center">
                <div className={`w-1 h-3 rounded-full mb-[-1px] ${theme === 'dark' ? 'bg-amber-800' : 'bg-green-800'}`} />
                <div className={`w-4 h-4 rounded-full shadow-md ${theme === 'dark' ? 'bg-[#fbbf24] shadow-amber-500/50' : 'bg-red-600'}`} />
              </div>
            ) : p.type === 'flower' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-md">
                <circle cx="12" cy="12" r="2" fill="#fcd34d" />
                <circle cx="12" cy="7" r="4" fill="#f472b6" />
                <circle cx="12" cy="17" r="4" fill="#f472b6" />
                <circle cx="7" cy="12" r="4" fill="#f472b6" />
                <circle cx="17" cy="12" r="4" fill="#f472b6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill={theme === 'flower' ? "#f472b6" : "#15803d"} style={{ transform: `rotate(${p.rotation})` }}>
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.31,20 22,14 22,10C22,10 21,8 17,8Z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div 
        className={`relative shrink-0 cursor-pointer select-none transition-all duration-300 ${isShaking ? 'animate-tree-shake' : 'hover:scale-105 active:scale-95'}`} 
        onClick={handleClick}
      >
        <div className={`w-40 h-40 flex items-center justify-center ${isLoading ? 'animate-tree-breath' : ''}`}>
          <svg viewBox="0 0 100 100" className="w-36 h-36 overflow-visible">
            <path d="M42 98 L45 65 L55 65 L58 98" fill="#5d4037" />
            <g>
              <circle cx="50" cy="35" r="32" fill={theme === 'flower' ? "#ece0d1" : (theme === 'dark' ? "#064e3b" : "#1b5e20")} />
              <circle cx="35" cy="45" r="25" fill={theme === 'flower' ? "#dbc1ac" : (theme === 'dark' ? "#065f46" : "#2e7d32")} />
              <circle cx="65" cy="45" r="25" fill={theme === 'flower' ? "#dbc1ac" : (theme === 'dark' ? "#065f46" : "#2e7d32")} />
              <circle cx="50" cy="50" r="28" fill={theme === 'flower' ? "#f2e8cf" : (theme === 'dark' ? "#047857" : "#388e3c")} />
            </g>

            {(expression !== 'normal' || forcedExpression) && (
              <g className="transition-opacity duration-300">
                <circle cx="35" cy="62" r="6" fill="#f87171" opacity={expression === 'embarrassed' ? "0.6" : "0.3"} />
                <circle cx="65" cy="62" r="6" fill="#f87171" opacity={expression === 'embarrassed' ? "0.6" : "0.3"} />
              </g>
            )}

            {renderEyes()}
            {renderMouth()}
            
            {theme === 'flower' ? (
              <>
                <circle cx="30" cy="35" r="4" fill="#f472b6" />
                <circle cx="70" cy="40" r="4" fill="#f472b6" />
                <circle cx="50" cy="25" r="4" fill="#f472b6" />
              </>
            ) : theme === 'dark' ? (
              <>
                <circle cx="30" cy="35" r="4" fill="#fbbf24" className="animate-pulse" />
                <circle cx="70" cy="40" r="4" fill="#fbbf24" className="animate-pulse" />
                <circle cx="50" cy="25" r="4" fill="#fbbf24" className="animate-pulse" />
              </>
            ) : (
              <>
                <circle cx="30" cy="35" r="3" fill="#d32f2f" />
                <circle cx="70" cy="40" r="3" fill="#d32f2f" />
                <circle cx="50" cy="25" r="3" fill="#d32f2f" />
              </>
            )}
          </svg>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left z-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1">
            <span className={`w-2 h-2 rounded-full animate-pulse ${theme === 'flower' ? 'bg-pink-400' : (theme === 'dark' ? 'bg-[#fbbf24]' : 'bg-red-500')}`}></span>
            <span className={`w-2 h-2 rounded-full animate-pulse delay-75 ${theme === 'flower' ? 'bg-pink-200' : 'bg-emerald-500'}`}></span>
          </div>
          <h4 className={`font-bold text-sm uppercase tracking-[0.3em] ${theme === 'flower' ? 'text-petal-100' : 'text-emerald-800 dark:text-emerald-400'}`}>Tara si Pohon Kersen</h4>
          {onAskInfo && !isLoading && (
            <button onClick={onAskInfo} className={`ml-auto text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'flower' ? 'text-pink-400 hover:text-pink-100' : 'text-emerald-600 dark:text-emerald-400 hover:text-rose-600'}`}>Identitas ↗</button>
          )}
        </div>
        <p className={`italic text-xl md:text-2xl leading-relaxed font-medium ${theme === 'flower' ? 'text-petal-50' : 'text-emerald-950 dark:text-emerald-50'}`}>
          {isLoading ? "Sabar ya, aku sedang menyisir dahan bahasamu..." : (reaction || message)}
        </p>
      </div>
    </div>
  );
};