import React from 'react';

interface PreloadProgress {
  total: number;
  completed: number;
  current: string;
  isLoading: boolean;
  isComplete: boolean;
  errors: string[];
}

interface FolklorePreloadIndicatorProps {
  progress: PreloadProgress;
  theme: 'light' | 'dark' | 'flower';
  onDismiss?: () => void;
}

/**
 * Component untuk menampilkan progress preload folklore TTS
 * Menggunakan Class Component untuk menghindari React compiler error
 */
export class FolklorePreloadIndicator extends React.Component<FolklorePreloadIndicatorProps> {
  private timer: NodeJS.Timeout | null = null;

  componentDidUpdate(prevProps: FolklorePreloadIndicatorProps) {
    if (this.props.progress.isComplete && 
        this.props.onDismiss && 
        !prevProps.progress.isComplete) {
      this.timer = setTimeout(() => {
        this.props.onDismiss!();
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  render() {
    const { progress, theme, onDismiss } = this.props;

    if (!progress.isLoading && !progress.isComplete) return null;

    const percentage = progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

    const isFlower = theme === 'flower';
    const isDark = theme === 'dark';

    return (
      <div className="fixed bottom-4 right-4 z-[9999] max-w-sm animate-in slide-in-from-bottom-5 duration-300">
        <div className={`
          rounded-2xl border shadow-2xl backdrop-blur-xl p-4
          ${isFlower ? 'bg-pink-900/90 border-pink-500/30 text-pink-50' 
            : isDark ? 'bg-emerald-900/90 border-emerald-500/30 text-emerald-50' 
            : 'bg-white/90 border-emerald-500/30 text-emerald-900'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {progress.isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
              ) : (
                <span className="text-2xl">✓</span>
              )}
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider opacity-60 ${
                  isFlower ? 'text-[rgb(252,231,243)]' 
                    : isDark ? 'text-[rgb(251,191,36)]' 
                    : 'text-[rgb(5,150,105)]'
                }`}>
                  {progress.isLoading ? 'Menyiapkan Dongeng' : 'Dongeng Siap!'}
                </p>
                <p className={`text-sm font-bold ${
                  isFlower ? 'text-[rgb(252,231,243)]' 
                    : isDark ? 'text-[rgb(251,191,36)]' 
                    : 'text-[rgb(5,150,105)]'
                }`}>
                  {progress.completed} / {progress.total}
                </p>
              </div>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                  isFlower ? 'bg-pink-800/50 hover:bg-pink-700 text-[rgb(252,231,243)]' 
                    : isDark ? 'bg-emerald-800/50 hover:bg-emerald-700 text-[rgb(251,191,36)]' 
                    : 'bg-emerald-100/50 hover:bg-emerald-200 text-[rgb(5,150,105)]'
                }`}
                aria-label="Tutup"
                title="Tutup notifikasi"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className={`
              w-full h-2 rounded-full overflow-hidden
              ${isFlower ? 'bg-pink-950/50' 
                : isDark ? 'bg-emerald-950/50' 
                : 'bg-emerald-100'}
            `}>
              <div
                className={`
                h-full transition-all duration-300 rounded-full
                ${isFlower ? 'bg-pink-400' 
                  : isDark ? 'bg-emerald-400' 
                  : 'bg-emerald-600'}
              `}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Current Item */}
          {progress.current && progress.isLoading && (
            <p className={`text-xs opacity-60 truncate mb-2 ${
              isFlower ? 'text-[rgb(252,231,243)]' 
                : isDark ? 'text-[rgb(251,191,36)]' 
                : 'text-[rgb(5,150,105)]'
            }`}>
              📖 {progress.current}
            </p>
          )}

          {/* Complete Message */}
          {progress.isComplete && (
            <p className={`text-xs italic opacity-80 ${
              isFlower ? 'text-[rgb(252,231,243)]' 
                : isDark ? 'text-[rgb(251,191,36)]' 
                : 'text-[rgb(5,150,105)]'
            }`}>
              Semua dongeng kini siap diputar instan! 🎉
            </p>
          )}

          {/* Errors */}
          {progress.errors.length > 0 && (
            <details className="mt-2">
              <summary className={`text-xs cursor-pointer opacity-60 hover:opacity-100 ${
                isFlower ? 'text-[rgb(252,231,243)]' 
                  : isDark ? 'text-[rgb(251,191,36)]' 
                  : 'text-[rgb(5,150,105)]'
              }`}>
                ⚠ {progress.errors.length} error(s)
              </summary>
              <div className={`mt-1 text-[10px] opacity-50 max-h-20 overflow-y-auto ${
                isFlower ? 'text-[rgb(252,231,243)]' 
                  : isDark ? 'text-[rgb(251,191,36)]' 
                  : 'text-[rgb(5,150,105)]'
              }`}>
                {progress.errors.map((err, i) => (
                  <div key={i} className="mb-1">• {err}</div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }
}