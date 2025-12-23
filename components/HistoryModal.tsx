
import React, { useState, useMemo } from 'react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = useMemo(() => {
    return history.filter(item => 
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.result.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-4 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#0a1a12] w-full max-w-xl h-[80vh] sm:max-h-[75vh] rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden transition-colors cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 pb-4 sm:pb-5 flex items-center justify-between bg-emerald-50/30 dark:bg-emerald-900/20">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-50">Jejak Semai</h2>
            <p className="text-[10px] sm:text-xs text-emerald-600/60 dark:text-emerald-400/40 font-bold italic">
              Klik dan gulir untuk melihat seluruh riwayat naskahmu.
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-4">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari naskah..."
            className="w-full pl-6 pr-6 py-3 sm:py-4 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-2xl outline-none text-lg sm:text-xl text-emerald-900 dark:text-emerald-50 shadow-inner"
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 sm:px-8 pb-8 space-y-4 mt-2">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => { onSelectItem(item); onClose(); }}
                className="w-full text-left bg-emerald-50/20 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-800/40 p-5 sm:p-7 rounded-2xl transition-all shadow-sm group"
              >
                <span className="text-[10px] font-bold text-emerald-700/50 dark:text-emerald-400/40 uppercase tracking-widest block mb-2 sm:mb-3">
                  {new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
                <p className="text-lg sm:text-xl text-emerald-900 dark:text-emerald-100 font-medium line-clamp-3 leading-relaxed italic">
                  "{item.originalText}"
                </p>
              </button>
            ))
          ) : (
            <div className="py-20 text-center text-lg text-emerald-900/30 dark:text-emerald-100/30 italic font-bold">
              Kotak jejak masih kosong...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
