
import React from 'react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      title: "✍️ Ejaan",
      desc: "Salah ketik & KBBI",
      color: "bg-amber-50/60 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200"
    },
    {
      title: "🌿 Tata Bahasa",
      desc: "Struktur PUEBI",
      color: "bg-emerald-50/60 dark:bg-emerald-900/10 text-emerald-800 dark:text-emerald-200"
    },
    {
      title: "📍 Tanda Baca",
      desc: "Titik, koma, & seru",
      color: "bg-blue-50/60 dark:bg-blue-900/10 text-blue-800 dark:text-blue-200"
    },
    {
      title: "✨ Gaya Bahasa",
      desc: "Pilihan kata luwes",
      color: "bg-rose-50/60 dark:bg-rose-900/10 text-rose-800 dark:text-rose-200"
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#0a1a12] w-full max-w-xl max-h-[85vh] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col transition-all cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">Panduan Tara si Pohon Kersen</h2>
            <p className="text-base text-emerald-600/50 dark:text-emerald-400/40 font-bold uppercase tracking-widest mt-1">Cara merawat naskahmu</p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-base bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-bold animate-pulse">
              ↕️ GULIR KE BAWAH
            </span>
          </div>
        </div>

        {/* Interaction hint for mobile */}
        <div className="sm:hidden mb-4 py-2 px-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
          <p className="text-base text-amber-800/60 dark:text-amber-200/40 font-bold italic text-center">
            Klik dan gulir untuk melihat seluruh informasi panduan.
          </p>
        </div>

        <div className="overflow-y-auto no-scrollbar pr-1 space-y-8 flex-1">
          {/* Steps */}
          <section className="bg-emerald-50/30 dark:bg-emerald-900/5 rounded-[2rem] p-7 space-y-5">
            {[
              "Ketikan naskah di area menulis utama.",
              "Pilih gaya (baku/luwes) sesuai kebutuhan.",
              "Klik Koreksi Naskah untuk hasil instan."
            ].map((step, i) => (
              <div key={i} className="flex gap-5 items-center">
                <span className="w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0">
                  {i+1}
                </span>
                <p className="text-lg text-emerald-800/70 dark:text-emerald-200/60 leading-relaxed font-medium">{step}</p>
              </div>
            ))}
          </section>

          {/* Core Categories Grid */}
          <section>
            <h3 className="text-base font-bold text-emerald-700/40 dark:text-emerald-400/20 uppercase tracking-[0.2em] mb-4 ml-2">Apa yang Tara periksa?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className={`p-6 rounded-3xl ${f.color} transition-all hover:scale-[1.02] shadow-sm`}>
                  <h4 className="font-bold text-xl mb-2">{f.title}</h4>
                  <p className="text-base opacity-80 italic font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Note */}
          <div className="bg-[#fff9f0] dark:bg-[#1a1410] p-6 rounded-3xl flex items-start gap-4">
            <span className="text-3xl">🌳</span>
            <p className="text-lg text-[#5c4033] dark:text-amber-100/60 leading-relaxed italic font-bold">
              Tara si Pohon Kersen membantu naskahmu agar lebih jernih tanpa mengubah niat asli tulisanmu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
