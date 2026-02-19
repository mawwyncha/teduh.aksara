
import React, { useState, useEffect } from 'react';
// Import HistoryItem from the central types file to maintain consistency
import { HistoryItem } from '../types';

interface HistoryCardProps {
  item: HistoryItem;
  onSelect: (item: HistoryItem) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onSelect }) => {
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

  const isFlower = theme === 'flower';
  const isDark = theme === 'dark';

  const date = new Date(item.timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Dynamic Styles
  const cardBg = isFlower 
    ? 'bg-petal-900/40 hover:bg-petal-900/60 border-pink-500/10' 
    : isDark 
      ? 'bg-emerald-900/20 hover:bg-emerald-900/40 border-emerald-800/20' 
      : 'bg-emerald-50/20 hover:bg-white border-emerald-50/50';

  const dateColor = isFlower ? 'text-pink-300' : 'text-emerald-700/60 dark:text-emerald-400';
  const textColor = isFlower ? 'text-pink-50' : 'text-emerald-950 dark:text-emerald-100';
  const dotColor = isFlower ? 'bg-pink-400 shadow-pink-400' : 'bg-emerald-400 shadow-emerald-400';

  return (
    <button 
      onClick={() => onSelect(item)}
      className={`w-full text-left p-6 rounded-[2rem] transition-all duration-300 flex flex-col gap-3 group shadow-md hover:shadow-xl hover:-translate-x-1 border ${cardBg}`}
    >
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${dotColor}`}></span>
        <span className={`text-base font-bold uppercase tracking-[0.2em] ${dateColor}`}>{date}</span>
      </div>
      <p className={`text-base line-clamp-2 italic leading-relaxed opacity-80 group-hover:opacity-100 ${textColor}`}>
        "{item.originalText}"
      </p>
    </button>
  );
};
