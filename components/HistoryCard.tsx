
import React, { useState, useEffect } from 'react';
// Import HistoryItem from the central types file to maintain consistency
import { HistoryItem } from '../types';

interface HistoryCardProps {
  item: HistoryItem;
  onSelect: (item: HistoryItem) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onSelect }) => {
  const [isFlower, setIsFlower] = useState(false);
  
  useEffect(() => {
    const checkTheme = () => setIsFlower(document.documentElement.classList.contains('flower'));
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const date = new Date(item.timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <button 
      onClick={() => onSelect(item)}
      className={`w-full text-left p-6 rounded-[2rem] transition-all duration-300 flex flex-col gap-3 group shadow-md hover:shadow-xl hover:-translate-x-1 border ${isFlower ? 'bg-petal-900/50 hover:bg-pink-900/80 border-pink-500/20' : 'bg-[#fcfdfc] dark:bg-emerald-900/30 hover:bg-white dark:hover:bg-emerald-800/50 border-emerald-50/30'}`}
    >
      <div className="flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${isFlower ? 'bg-pink-400 shadow-pink-400' : 'bg-emerald-400 shadow-emerald-400'}`}></span>
        <span className={`text-base font-bold uppercase tracking-[0.2em] ${isFlower ? 'text-pink-300' : 'text-emerald-700/60 dark:text-emerald-400'}`}>{date}</span>
      </div>
      <p className={`text-base line-clamp-2 italic leading-relaxed opacity-80 group-hover:opacity-100 ${isFlower ? 'text-pink-50' : 'text-emerald-950 dark:text-emerald-100'}`}>
        "{item.originalText}"
      </p>
    </button>
  );
};
