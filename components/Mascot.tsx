import React, { useState, useCallback, useEffect } from 'react';

interface MascotProps {
  message: string;
  isLoading?: boolean;
  onAskInfo?: () => void;
  forcedExpression?: Expression;
}

interface Particle {
  id: number;
  type: 'cherry' | 'leaf';
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

  useEffect(() => {
    if (forcedExpression) {
      setExpression(forcedExpression);
    } else {
      setExpression('normal');
    }
  }, [forcedExpression]);

  const expressions: { type: Expression; text: string }[] = [
    { type: 'embarrassed', text: "Aduh! Buah kersen dan daunku berjatuhan! 🍒🌿" },
    { type: 'happy', text: "Geli tahu! Rasanya seperti disiram pupuk organik pilihan! ✨" },
    { type: 'shocked', text: "Hah?! Kupikir ada ulat bulu yang lewat! Terkejut aku! 🐛" },
    { type: 'dizzy', text: "Aduh pusing... duniaku berputar seperti gasing kayu! 😵‍💫" },
    { type: 'cool', text: "Tenang, Sahabat. Daun yang jatuh adalah bagian dari estetika. 😎" }
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
    
    // Pilih ekspresi acak (kecuali normal)
    const randomExp = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExp.type);
    setReaction(randomExp.text);
    
    const newParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      type: Math.random() > 0.4 ? 'cherry' : 'leaf',
      left: 10 + Math.random() * 80,
      duration: (1.2 + Math.random() * 2) + 's',
      drift: (Math.random() * 100 - 50) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => setIsShaking(false), 600);
    
    setTimeout(() => {
      if (!forcedExpression) setExpression('normal');
      setReaction(null);
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 3500);
  };

  const renderEyes = () => {
    switch (expression) {
      case 'embarrassed':
        return (
          <g>
            <path d="M32 50 L40 55 L32 60" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M68 50 L60 55 L68 60" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'happy':
        return (
          <g>
            <path d="M30 55 Q40 45 50 55" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" transform="translate(-8, 0)" />
            <path d="M50 55 Q60 45 70 55" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" transform="translate(8, 0)" />
          </g>
        );
      case 'shocked':
        return (
          <g>
            <circle cx="35" cy="52" r="7" fill="white" stroke="#212121" strokeWidth="1" />
            <circle cx="65" cy="52" r="7" fill="white" stroke="#212121" strokeWidth="1" />
            <circle cx="35" cy="52" r="3" fill="#212121" />
            <circle cx="65" cy="52" r="3" fill="#212121" />
          </g>
        );
      case 'dizzy':
        return (
          <g>
            <path d="M30 48 Q35 43 40 48 Q35 53 30 48" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
            <path d="M60 48 Q65 43 70 48 Q65 53 60 48" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 52 L38 58 M38 52 L32 58" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
            <path d="M62 52 L68 58 M68 52 L62 58" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'cool':
        return (
          <g>
            <rect x="28" y="48" width="18" height="4" rx="2" fill="#212121" />
            <rect x="54" y="48" width="18" height="4" rx="2" fill="#212121" />
            <path d="M46 50 L54 50" stroke="#212121" strokeWidth="1" />
          </g>
        );
      default: // Normal
        return (
          <g className="animate-tree-blink">
            <circle cx="40" cy="52" r="6" fill="white" />
            <circle cx="60" cy="52" r="6" fill="white" />
            <circle cx="40" cy="52" r="3.5" fill="#212121" />
            <circle cx="60" cy="52" r="3.5" fill="#212121" />
          </g>
        );
    }
  };

  const renderMouth = () => {
    switch (expression) {
      case 'embarrassed':
        return <circle cx="50" cy="68" r="4" fill="none" stroke="#212121" strokeWidth="2.5" />;
      case 'happy':
        return <path d="M40 64 Q50 72 60 64" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" />;
      case 'shocked':
        return <circle cx="50" cy="70" r="5" fill="#212121" />;
      case 'dizzy':
        return <path d="M45 68 Q47 64 50 68 Q53 72 55 68" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />;
      case 'cool':
        return <path d="M48 68 Q55 68 58 64" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />;
      default:
        return <path d="M44 64 Q50 68 56 64" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />;
    }
  };

  return (
    <div className="bg-white/70 dark:bg-emerald-900/10 backdrop-blur-xl p-8 rounded-[3rem] border border-emerald-50 dark:border-emerald-800/20 shadow-xl flex flex-col sm:flex-row items-center gap-10 transition-all relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-50">
        {particles.map(p => (
          <div 
            key={p.id}
            className="animate-particle"
            style={{ 
              left: `${p.left}%`, 
              top: '-20px',
              '--duration': p.duration,
              '--drift': p.drift 
            } as React.CSSProperties}
          >
            {p.type === 'cherry' ? (
              <div className="flex flex-col items-center">
                <div className="w-1 h-3 bg-green-800 rounded-full mb-[-2px]" />
                <div className="w-4 h-4 bg-red-600 rounded-full shadow-md" />
              </div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#15803d" style={{ transform: `rotate(${p.rotation})` }}>
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
              <circle cx="50" cy="35" r="32" fill="#1b5e20" />
              <circle cx="35" cy="45" r="25" fill="#2e7d32" />
              <circle cx="65" cy="45" r="25" fill="#2e7d32" />
              <circle cx="50" cy="50" r="28" fill="#388e3c" />
            </g>

            {(expression !== 'normal' || forcedExpression) && (
              <g className="transition-opacity duration-300">
                <circle cx="35" cy="62" r="6" fill="#f87171" opacity={expression === 'embarrassed' ? "0.6" : "0.3"} />
                <circle cx="65" cy="62" r="6" fill="#f87171" opacity={expression === 'embarrassed' ? "0.6" : "0.3"} />
              </g>
            )}

            {renderEyes()}
            {renderMouth()}
            
            <circle cx="30" cy="35" r="3" fill="#d32f2f" />
            <circle cx="70" cy="40" r="3" fill="#d32f2f" />
            <circle cx="50" cy="25" r="3" fill="#d32f2f" />
          </svg>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left z-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75"></span>
          </div>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm uppercase tracking-[0.3em]">Tara si Pohon Kersen</h4>
          {onAskInfo && !isLoading && (
            <button onClick={onAskInfo} className="ml-auto text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:text-rose-600 transition-colors">Identitas ↗</button>
          )}
        </div>
        <p className="text-emerald-950 dark:text-emerald-50 italic text-xl md:text-2xl leading-relaxed font-medium">
          {isLoading ? "Sabar ya, aku sedang menyisir dahan bahasamu..." : (reaction || message)}
        </p>
      </div>
    </div>
  );
};