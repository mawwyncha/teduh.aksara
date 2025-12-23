
import React, { useState, useEffect } from 'react';

interface MascotProps {
  message: string;
  isLoading?: boolean;
  onAskInfo?: () => void;
}

interface Particle {
  id: number;
  type: 'leaf' | 'cherry';
  left: string;
  tx: string;
  duration: string;
  delay: string;
}

export const Mascot: React.FC<MascotProps> = ({ message, isLoading, onAskInfo }) => {
  const [isFlustered, setIsFlustered] = useState(false);
  const [reactionMessage, setReactionMessage] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleMascotClick = () => {
    if (isFlustered) return;

    setIsFlustered(true);
    setReactionMessage("Aduh! Buah kersenku berjatuhan! 🍒💨");
    
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: Date.now() + i,
        type: Math.random() > 0.4 ? 'cherry' : 'leaf',
        left: `${Math.random() * 80 + 10}%`,
        tx: `${(Math.random() - 0.5) * 200}px`,
        duration: `${2 + Math.random() * 2}s`,
        delay: `${Math.random() * 0.5}s`
      });
    }
    setParticles(newParticles);

    // Reset after animation
    setTimeout(() => {
      setIsFlustered(false);
      setReactionMessage(null);
      setParticles([]);
    }, 3000);
  };

  return (
    <div className="bg-white/60 dark:bg-emerald-900/20 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-emerald-50 dark:border-emerald-800 soft-shadow flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-4 transition-all duration-500 relative overflow-hidden">
      {/* Particles layer */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 pointer-events-none z-50 animate-particle text-2xl"
          style={{
            left: p.left,
            '--tx': p.tx,
            '--duration': p.duration,
            animationDelay: p.delay,
          } as any}
        >
          {p.type === 'cherry' ? '🍒' : '🍃'}
        </div>
      ))}

      <div 
        className="relative shrink-0 cursor-pointer select-none group flex justify-center w-full sm:w-auto"
        onClick={handleMascotClick}
        title="Guncang Tara si Pohon Kersen!"
      >
        <div className={`w-44 h-44 md:w-36 md:h-36 flex items-center justify-center transition-all duration-700 
          ${isFlustered ? 'animate-tree-flinch' : (isLoading ? 'animate-tree-breath' : 'animate-tree-breath')}`}>
          <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-32 md:h-32 overflow-visible">
            <ellipse cx="50" cy="95" rx="35" ry="7" fill="#e0eee0" opacity="0.4" />
            
            <g className="drop-shadow-sm">
              <circle cx="50" cy="35" r="32" fill="#2e7d32" />
              <circle cx="28" cy="45" r="22" fill="#2e7d32" />
              <circle cx="72" cy="45" r="22" fill="#2e7d32" />
              <circle cx="50" cy="38" r="28" fill="#43a047" />
              <circle cx="22" cy="48" r="20" fill="#43a047" />
              <circle cx="78" cy="48" r="20" fill="#43a047" />
              <circle cx="50" cy="15" r="18" fill="#66bb6a" />

              <g fill="#ef4444">
                <circle cx="35" cy="25" r="2.5" className={isLoading || isFlustered ? "animate-pulse" : ""} />
                <circle cx="65" cy="20" r="2" />
                <circle cx="85" cy="45" r="2.5" className={isLoading || isFlustered ? "animate-pulse" : ""} />
              </g>

              <g fill="white">
                <circle cx="42" cy="12" r="1.2" />
                <circle cx="58" cy="18" r="1" />
              </g>
            </g>
            
            <g>
              <path d="M32 95 L38 55 Q50 45 62 55 L68 95" fill="#8d6e63" stroke="#5d4037" strokeWidth="2" />
              <g className={isFlustered ? "animate-arm-wave-left" : "animate-arm-left"}>
                <path d="M40 75 Q25 70 18 82" fill="none" stroke="#8d6e63" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="18" cy="82" r="2.5" fill="#43a047" />
              </g>
              <g className={isFlustered ? "animate-arm-wave-right" : "animate-arm-right"}>
                <path d="M60 75 Q75 70 82 82" fill="none" stroke="#8d6e63" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="82" cy="82" r="2.5" fill="#43a047" />
              </g>
              <g transform="translate(0, 10)">
                {isFlustered ? (
                  <g>
                    <path d="M38 55 L46 58 L38 61" fill="none" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M62 55 L54 58 L62 61" fill="none" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="38" cy="65" r="4" fill="#fca5a5" opacity="0.6" />
                    <circle cx="62" cy="65" r="4" fill="#fca5a5" opacity="0.6" />
                    <circle cx="50" cy="68" r="3" fill="#3e2723" />
                  </g>
                ) : (
                  <g>
                    <g className="animate-tree-blink">
                      <circle cx="43" cy="58" r="6" fill="white" />
                      <circle cx="57" cy="58" r="6" fill="white" />
                      <circle cx="43" cy="58" r="4.5" fill="#3e2723" />
                      <circle cx="57" cy="58" r="4.5" fill="#3e2723" />
                    </g>
                    <path d="M46 68 Q50 71 54 68" fill="none" stroke="#3e2723" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                )}
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="flex-1 relative z-10 text-center sm:text-left w-full">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 md:mb-3">
          <span className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)] ${isFlustered ? 'bg-orange-500' : 'bg-red-500'}`}></span>
          <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-base md:text-lg uppercase tracking-wider">Tara si Pohon Kersen:</h4>
          
          {onAskInfo && !isLoading && !isFlustered && (
            <button 
              onClick={(e) => { e.stopPropagation(); onAskInfo(); }}
              className="ml-auto sm:ml-2 p-2 bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-base font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-sm group/btn"
              title="Apa itu Teduh Aksara?"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:rotate-12"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Apa ini?
            </button>
          )}
        </div>
        <p className={`text-emerald-900/80 dark:text-emerald-100/70 leading-relaxed italic text-base md:text-xl select-none transition-all duration-300 ${isFlustered ? 'text-orange-600 dark:text-orange-300 font-bold scale-105' : ''}`}>
          {isLoading ? "Aku sedang meneliti naskahmu..." : (reactionMessage || message)}
        </p>
      </div>
    </div>
  );
};
