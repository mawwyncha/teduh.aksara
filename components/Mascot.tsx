
import React, { useState } from 'react';

interface MascotProps {
  message: string;
  isLoading?: boolean;
  onAskInfo?: () => void;
}

interface Particle {
  id: number;
  type: 'cherry' | 'leaf';
  left: number;
  duration: string;
  drift: string;
  rotation: string;
}

export const Mascot: React.FC<MascotProps> = ({ message, isLoading, onAskInfo }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isEmbarrassed, setIsEmbarrassed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reaction, setReaction] = useState<string | null>(null);

  const handleClick = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setIsEmbarrassed(true);
    setReaction("Aduh! Buah kersen dan daunku berjatuhan! 🍒🌿");
    
    // Generate partikel kersen dan daun
    const newParticles: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      type: Math.random() > 0.4 ? 'cherry' : 'leaf',
      left: 10 + Math.random() * 80,
      duration: (1.2 + Math.random() * 2) + 's',
      drift: (Math.random() * 100 - 50) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Reset getaran
    setTimeout(() => setIsShaking(false), 600);
    
    // Reset ekspresi merona dan bersihkan reaksi setelah beberapa detik
    setTimeout(() => {
      setIsEmbarrassed(false);
      setReaction(null);
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 3500);
  };

  return (
    <div className="bg-white/70 dark:bg-emerald-900/10 backdrop-blur-xl p-8 rounded-[3rem] border border-emerald-50 dark:border-emerald-800/20 shadow-xl flex flex-col sm:flex-row items-center gap-10 transition-all relative overflow-hidden">
      {/* Layer Partikel Jatuh */}
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
            {/* Batang Utama */}
            <path d="M42 98 L45 65 L55 65 L58 98" fill="#5d4037" />
            
            {/* Rimbun Daun (Tara) */}
            <g>
              <circle cx="50" cy="35" r="32" fill="#1b5e20" />
              <circle cx="35" cy="45" r="25" fill="#2e7d32" />
              <circle cx="65" cy="45" r="25" fill="#2e7d32" />
              <circle cx="50" cy="50" r="28" fill="#388e3c" />
            </g>

            {/* Efek Blush (Pipi Merah) */}
            {isEmbarrassed && (
              <g className="transition-opacity duration-300">
                <circle cx="35" cy="62" r="6" fill="#f87171" opacity="0.6" />
                <circle cx="65" cy="62" r="6" fill="#f87171" opacity="0.6" />
              </g>
            )}

            {/* Wajah Tara: Kondisional Normal vs Terkejut (> <) */}
            {isEmbarrassed ? (
              <g className="transition-all duration-300">
                {/* Mata Kiri > */}
                <path d="M35 50 L43 55 L35 60" fill="none" stroke="#212121" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Mata Kanan < */}
                <path d="M65 50 L57 55 L65 60" fill="none" stroke="#212121" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Mulut O */}
                <circle cx="50" cy="68" r="4" fill="none" stroke="#212121" strokeWidth="2.5" />
              </g>
            ) : (
              <g className="animate-tree-blink transition-all duration-300">
                <circle cx="40" cy="52" r="6" fill="white" />
                <circle cx="60" cy="52" r="6" fill="white" />
                <circle cx="40" cy="52" r="3.5" fill="#212121" />
                <circle cx="60" cy="52" r="3.5" fill="#212121" />
                <path d="M44 64 Q50 68 56 64" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
            
            {/* Buah Kersen di Pohon */}
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
