
import React, { useState, useMemo, useEffect } from 'react';
// Import HistoryItem from the central types file to maintain consistency
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearAll: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, history, onSelectItem, onClearAll }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlower, setIsFlower] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsFlower(document.documentElement.classList.contains('flower'));
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter(item => 
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.result.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  if (!isOpen) return null;

  const modalBg = isFlower ? 'bg-petal-800' : 'bg-white dark:bg-[#0a1a12]';
  const headerBg = isFlower ? 'bg-petal-900/50' : 'bg-emerald-50/30 dark:bg-emerald-900/20';
  const textColor = isFlower ? 'text-pink-50' : 'text-emerald-900 dark:text-emerald-50';
  const subTextColor = isFlower ? 'text-pink-400/40' : 'text-emerald-600/60 dark:text-emerald-400/40';
  const inputBg = isFlower ? 'bg-petal-900/50' : 'bg-emerald-50/30 dark:bg-emerald-900/10';
  const itemBg = isFlower ? 'bg-petal-900/30 border-pink-500/20 hover:bg-pink-900/50' : 'bg-emerald-50/20 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-800/40 border-emerald-50 dark:border-emerald-900/30';
  const closeButtonColor = isFlower ? 'text-pink-300 hover:text-pink-500' : 'text-emerald-300 dark:text-emerald-700 hover:text-red-700';
  const clearButtonStyle = isFlower ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white';

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className={`${modalBg} w-full max-w-xl h-[80vh] sm:max-h-[75vh] rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden transition-colors cursor-default border ${isFlower ? 'border-pink-500/20' : 'border-transparent'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup (X) */}
        <button 
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 transition-colors z-30 ${closeButtonColor}`}
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" cy="6" x2="6" y2="18"></line><line x1="6" cy="6" x2="18" y2="18"></line></svg>
        </button>

        <div className={`p-6 sm:p-8 pb-4 sm:pb-5 flex items-center justify-between ${headerBg} pr-16`}>
          <div className="flex flex-col gap-1">
            <h2 className={`text-xl sm:text-2xl font-bold ${textColor}`}>Jejak Semai</h2>
            <p className={`text-xs font-bold italic uppercase tracking-widest ${subTextColor}`}>
              Tersimpan secara lokal
            </p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={onClearAll}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${clearButtonStyle}`}
            >
              Hapus Semua
            </button>
          )}
        </div>

        <div className={`px-6 sm:px-8 py-4 border-b ${isFlower ? 'border-pink-500/10' : 'border-emerald-50 dark:border-emerald-900/30'}`}>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari naskah dalam memori..."
            className={`w-full pl-6 pr-6 py-3 sm:py-4 rounded-2xl outline-none text-base sm:text-lg shadow-inner font-medium transition-all border ${inputBg} ${isFlower ? 'text-pink-50 placeholder-pink-500/30 border-pink-500/20' : 'text-emerald-900 dark:text-emerald-50 placeholder-emerald-200 dark:placeholder-emerald-800 border-transparent'}`}
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar modal-content-scroll px-6 sm:px-8 pb-8 space-y-4 mt-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => { onSelectItem(item); onClose(); }}
                className={`w-full text-left p-5 sm:p-7 rounded-2xl transition-all shadow-sm group border ${itemBg}`}
              >
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                   <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isFlower ? 'text-pink-400' : 'text-emerald-700/50 dark:text-emerald-400/40'}`}>
                    {new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-tighter ${isFlower ? 'bg-pink-500/20 text-pink-300' : 'bg-white/50 dark:bg-white/5 text-emerald-800/40 dark:text-emerald-400/40'}`}>{item.options.style}</span>
                </div>
                <p className={`text-base sm:text-lg font-medium line-clamp-3 leading-relaxed italic ${isFlower ? 'text-pink-50 group-hover:text-pink-300' : 'text-emerald-900 dark:text-emerald-10'}`}>
                  "{item.originalText}"
                </p>
              </button>
            ))
          ) : (
            <div className={`py-20 text-center text-lg italic font-bold ${isFlower ? 'text-pink-100/10' : 'text-emerald-900/30 dark:text-emerald-100/30'}`}>
              {searchQuery ? "Tidak ditemukan kecocokan..." : "Kotak jejak masih kosong..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
