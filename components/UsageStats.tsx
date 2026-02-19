
import React from 'react';

interface UsageStatsProps {
  usageCount: number;
  maxRequests: number;
  currentTheme: string;
}

export const UsageStats: React.FC<UsageStatsProps> = ({ usageCount, maxRequests, currentTheme }) => {
  const quotaPercent = (usageCount / maxRequests) * 100;
  const isQuotaLow = maxRequests - usageCount <= 5;
  const isFlower = currentTheme === 'flower';
  const isDark = currentTheme === 'dark';

  const containerClass = isFlower 
    ? 'bg-petal-800 border-pink-500/20 text-petal-50' 
    : 'bg-white dark:bg-emerald-950/20 border-emerald-50 dark:border-emerald-800/30';

  // Penentuan warna bar berdasarkan tema dan status kuota
  const getFillColor = () => {
    if (usageCount >= maxRequests) return 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]';
    if (isQuotaLow) return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
    if (isFlower) return 'bg-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.6)]'; // Pink cerah dengan glow kuat untuk mode flower
    if (isDark) return 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]'; 
    return 'bg-emerald-600 shadow-sm';
  };

  return (
    <div className={`p-5 rounded-[2rem] border shadow-sm transition-colors duration-500 ${containerClass}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isFlower ? 'bg-pink-300 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.8)]' : (isDark ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500')}`}></span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-sans ${isFlower ? 'text-pink-300' : 'text-emerald-700/50 dark:text-emerald-400/60'}`}>Kapasitas Harian</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all duration-300 font-sans ${isQuotaLow ? 'bg-red-50 text-red-600 animate-quota-low' : (isFlower ? 'bg-pink-500/30 text-pink-200 border border-pink-500/20' : 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400')}`}>
          {maxRequests - usageCount} / {maxRequests} Tersisa
        </span>
      </div>
      <div className="quota-bar-container">
        <div 
          className={`quota-bar-fill transition-all duration-1000 ${getFillColor()}`} 
          style={{ width: `${quotaPercent}%` }}
        ></div>
      </div>
    </div>
  );
};
