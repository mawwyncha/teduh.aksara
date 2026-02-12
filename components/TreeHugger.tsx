// src/components/TreeHugger.tsx
import React, { useState, useEffect } from 'react';

const DONORS = [
  { name: "Sahabat Budi", amount: 250000, date: "15 Jan 2026" },
  { name: "Rina Aksara", amount: 750000, date: "18 Jan 2026" },
  { name: "Wira Teduh", amount: 150000, date: "20 Jan 2026" },
  { name: "Laras Hati", amount: 300000, date: "22 Jan 2026" },
  { name: "Dewangga", amount: 500000, date: "24 Jan 2026" }
];

export const TreeHugger: React.FC = () => {
  const maxDonation = Math.max(...DONORS.map(d => d.amount));
  const [particles, setParticles] = useState<any[]>([]);
  const [isFlower, setIsFlower] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsFlower(document.documentElement.classList.contains('flower'));
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const handleDonorClick = (isTop: boolean) => {
    const type = isFlower ? (isTop ? 'flower' : 'leaf') : (isTop ? 'cherry' : 'leaf');
    const count = isTop ? 20 : 12;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      type,
      left: Math.random() * 100,
      duration: (1 + Math.random() * 1.5) + 's',
      drift: (Math.random() * 120 - 60) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 3000);
  };
  
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden h-full flex flex-col ${isFlower ? 'bg-petal-800 border-pink-500/20 shadow-xl' : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10 shadow-sm'}`}>
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
                    <div className={`w-0.5 h-2 rounded-full mb-[-1px] ${isDark ? 'bg-amber-800' : 'bg-green-800'}`} />
                    <div className={`w-3 h-3 rounded-full shadow-md transition-all ${isDark ? 'bg-[#fbbf24] shadow-amber-500/80 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-red-600 shadow-rose-500/20'}`} />
                </div>
             ) : p.type === 'flower' ? (
                <div className="w-3.5 h-3.5 bg-pink-300 rounded-full shadow-md border border-pink-100" />
             ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill={isFlower ? "#f472b6" : "#10b981"} style={{ transform: `rotate(${p.rotation})` }}>
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.31,20 22,14 22,10C22,10 21,8 17,8Z" />
                </svg>
             )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans ${isFlower ? 'text-pink-400' : 'text-emerald-700/40 dark:text-emerald-400/20'}`}>Tree Hugger</h2>
        <span className={`text-[9px] font-bold uppercase tracking-widest font-sans ${isFlower ? 'text-pink-500' : 'text-rose-500/40 dark:text-amber-500/40'}`}>Apresiasi</span>
      </div>
      
      <div className="space-y-4 flex-1">
        {DONORS.sort((a, b) => b.amount - a.amount).slice(0, 4).map((donor, idx) => {
          const isTop = donor.amount === maxDonation;
          const topClass = isFlower ? 'bg-pink-900/40 border border-pink-500/40 shadow-md' : (isDark ? 'bg-amber-900/5 border border-amber-400/20 shadow-lg shadow-amber-500/5' : 'bg-emerald-50/50 border border-emerald-200');
          
          return (
            <div 
              key={idx} 
              onClick={() => handleDonorClick(isTop)}
              className={`flex items-center justify-between group cursor-pointer p-2 rounded-2xl transition-all duration-500 ${isTop ? topClass : 'hover:bg-black/20 border border-transparent'}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs bg-transparent">
                  {isTop ? (isDark ? "🌟" : "⭐") : isFlower ? "🌸" : "🌿"}
                </div>
                <div className="truncate max-w-[80px] sm:max-w-none">
                  <p className={`text-[11px] font-bold truncate transition-colors font-sans ${isTop ? (isFlower ? 'text-pink-300' : (isDark ? 'text-amber-200' : 'text-red-700')) : (isFlower ? 'text-pink-100/60' : 'text-emerald-950 dark:text-emerald-50')}`}>
                    {donor.name}
                  </p>
                </div>
              </div>
              <p className={`text-[11px] font-bold transition-colors font-sans whitespace-nowrap ${isTop ? (isFlower ? 'text-pink-300' : (isDark ? 'text-amber-400' : 'text-red-700')) : (isFlower ? 'text-pink-100/60' : 'text-emerald-800 dark:text-emerald-400')}`}>
                Rp{donor.amount / 1000}rb
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};