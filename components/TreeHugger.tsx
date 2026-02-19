
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
    const newParticles = Array.from({ length: isTop ? 20 : 12 }).map((_, i) => ({
      id: Date.now() + i,
      type,
      left: Math.random() * 100,
      duration: (1 + Math.random() * 1.5) + 's',
      drift: (Math.random() * 120 - 60) + 'px',
      rotation: (Math.random() * 360) + 'deg'
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 3000);
  };
  
  return (
    <div className={`p-6 rounded-[2.5rem] border transition-all relative overflow-hidden h-full flex flex-col ${isFlower ? 'bg-petal-800 border-pink-500/20 shadow-xl' : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/10 shadow-sm'}`}>
      <div className="absolute inset-0 pointer-events-none z-50">
        {particles.map(p => (
          <div key={p.id} className="animate-particle" style={{ left: `${p.left}%`, top: '-20px', '--duration': p.duration, '--drift': p.drift } as React.CSSProperties}>
             {p.type === 'cherry' ? <div className="flex flex-col items-center"><div className={`w-0.5 h-2 rounded-full mb-[-1px] ${isDark ? 'bg-amber-800' : 'bg-green-800'}`} /><div className="w-3 h-3 rounded-full bg-red-600 shadow-md" /></div>
             : p.type === 'flower' ? <div className="w-3.5 h-3.5 bg-pink-300 rounded-full shadow-md border border-pink-100" />
             : <svg width="14" height="14" viewBox="0 0 24 24" fill={isFlower ? "#f472b6" : "#10b981"} style={{ transform: `rotate(${p.rotation})` }}><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.17,20C14.31,20 22,14 22,10C22,10 21,8 17,8Z" /></svg>}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isFlower ? 'text-pink-400' : 'opacity-30'}`}>Tree Hugger</h2>
      </div>
      <div className="space-y-4 flex-1">
        {DONORS.sort((a, b) => b.amount - a.amount).slice(0, 4).map((donor, idx) => (
          <div key={idx} onClick={() => handleDonorClick(donor.amount === maxDonation)} className={`flex items-center justify-between p-2 rounded-2xl cursor-pointer transition-all ${donor.amount === maxDonation ? 'bg-emerald-50/50 dark:bg-white/5 border border-emerald-200/20' : 'hover:bg-black/5'}`}>
            <span className="text-[11px] font-bold">{donor.name}</span>
            <span className="text-[11px] font-bold opacity-60">Rp{donor.amount / 1000}rb</span>
          </div>
        ))}
      </div>
    </div>
  );
};
