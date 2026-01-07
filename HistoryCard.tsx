
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryCardProps {
  item: HistoryItem;
  onSelect: (item: HistoryItem) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item, onSelect }) => {
  const date = new Date(item.timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <button 
      onClick={() => onSelect(item)}
      className="w-full text-left bg-[#fcfdfc] dark:bg-emerald-900/30 hover:bg-white dark:hover:bg-emerald-800/50 p-6 rounded-[2rem] transition-all duration-300 flex flex-col gap-3 group shadow-md hover:shadow-xl hover:-translate-x-1 border border-emerald-50/30"
    >
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
        <span className="text-base font-bold text-emerald-700/60 dark:text-emerald-400 uppercase tracking-[0.2em]">{date}</span>
      </div>
      <p className="text-base text-emerald-950 dark:text-emerald-100 line-clamp-2 italic leading-relaxed opacity-80 group-hover:opacity-100">
        "{item.originalText}"
      </p>
    </button>
  );
};
