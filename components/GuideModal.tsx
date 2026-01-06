
import React from 'react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    { title: "✍️ Ejaan", desc: "Mendeteksi salah ketik secara instan", color: "bg-amber-50/60 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200" },
    { title: "🌿 Tata Bahasa", desc: "Menyempurnakan struktur kalimat", color: "bg-emerald-50/60 dark:bg-emerald-900/10 text-emerald-800 dark:text-emerald-200" },
    { title: "📍 Tanda Baca", desc: "Mengatur ritme bacaan dengan tepat", color: "bg-blue-50/60 dark:bg-blue-900/10 text-blue-800 dark:text-blue-200" },
    { title: "✨ Gaya Bahasa", desc: "Diksi yang lebih luwes & variatif", color: "bg-rose-50/60 dark:bg-rose-900/10 text-rose-800 dark:text-rose-200" }
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer" onClick={onClose}>
      <div className="bg-white dark:bg-[#0a1a12] w-full max-w-xl max-h-[85vh] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col transition-all cursor-default" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">Panduan Tara</h2>
            <p className="text-base text-emerald-600/50 dark:text-emerald-400/40 font-bold uppercase tracking-widest mt-1">Cara Merawat Naskahmu Bersama AI</p>
          </div>
        </div>

        <div className="overflow-y-auto no-scrollbar space-y-8 flex-1">
          <section className="bg-emerald-50/30 dark:bg-emerald-900/5 rounded-[2rem] p-7 space-y-5">
            {[ "Ketikan naskah di area menulis utama.", "Pilih gaya naskah sesuai kebutuhanmu.", "Klik tombol koreksi untuk penyelarasan instan."].map((step, i) => (
              <div key={i} className="flex gap-5 items-center">
                <span className="w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0">{i+1}</span>
                <p className="text-lg text-emerald-800/70 dark:text-emerald-200/60 font-medium">{step}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-xs font-bold text-emerald-700/40 dark:text-emerald-400/20 uppercase tracking-[0.2em] mb-4 ml-2">Apa yang Tara Periksa?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className={`p-6 rounded-3xl ${f.color} shadow-sm`}>
                  <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                  <p className="text-sm opacity-80 italic font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#fff9f0] dark:bg-[#1a1410] p-8 rounded-[2rem] border border-amber-100/50">
            <h3 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-4">Fitur Premium</h3>
            <p className="text-amber-900/70 dark:text-amber-200/50 leading-relaxed font-medium italic">
              Tara juga mampu menerjemahkan naskah ke berbagai bahasa daerah di Nusantara secara otentik, serta membacakannya dengan intonasi yang tenang.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
