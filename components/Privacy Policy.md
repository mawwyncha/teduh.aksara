import React, { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [isFlower, setIsFlower] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsFlower(document.documentElement.classList.contains('flower'));
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const bgColor = isFlower ? 'bg-petal-900' : 'bg-[#faf9f6] dark:bg-[#050a08]';
  const cardBg = isFlower ? 'bg-petal-800' : 'bg-white dark:bg-[#0a1a12]';
  const titleColor = isFlower ? 'text-pink-50' : 'text-emerald-900 dark:text-emerald-50';
  const subtitleColor = isFlower ? 'text-pink-300' : 'text-emerald-600 dark:text-emerald-400';
  const textColor = isFlower ? 'text-pink-100' : 'text-emerald-900 dark:text-emerald-100';
  const sectionBg = isFlower ? 'bg-petal-900/60' : 'bg-emerald-50/50 dark:bg-emerald-900/10';
  const borderColor = isFlower ? 'border-pink-500/20' : 'border-emerald-100 dark:border-emerald-900/30';
  const accentBg = isFlower ? 'bg-pink-900/40 border-pink-500/30' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-500';
  const buttonPrimary = isFlower ? 'bg-pink-600 hover:bg-pink-700' : 'bg-emerald-700 hover:bg-emerald-800';
  const buttonSecondary = isFlower ? 'bg-petal-900/50 hover:bg-petal-900 text-pink-100' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/30';

  return (
    <div className={`min-h-screen ${bgColor} py-12 px-4`}>
      <div className={`max-w-4xl mx-auto ${cardBg} rounded-[3rem] p-8 md:p-12 shadow-xl border ${isFlower ? 'border-pink-500/20' : 'border-transparent'}`}>
        
        {/* Header */}
        <div className={`text-center mb-12 pb-8 border-b-2 ${borderColor}`}>
          <h1 className={`text-4xl md:text-5xl font-bold ${titleColor} mb-4`}>
            Kebijakan Privasi
          </h1>
          <p className={`${subtitleColor} font-medium`}>
            Teduh Aksara - Platform Penyelarasan Bahasa AI
          </p>
          <p className={`text-sm mt-2 ${isFlower ? 'text-pink-300/50' : 'text-emerald-500/50'}`}>
            Terakhir diperbarui: 7 Januari 2026
          </p>
        </div>

        {/* Content */}
        <div className={`space-y-10 ${textColor}`}>
          
          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed">
              Selamat datang di <strong>Teduh Aksara (Tara)</strong>. Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda sesuai dengan <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</strong> dan <strong>UU ITE (Informasi dan Transaksi Elektronik)</strong> Republik Indonesia.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">📋</span>
              1. Data yang Kami Kumpulkan
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-4 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <div>
                <h3 className="font-bold text-lg mb-2">1.1 Data yang Anda Berikan:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Teks Naskah</strong>: Teks yang Anda ketik untuk dianalisis</li>
                  <li><strong>Rekaman Suara</strong>: Audio yang direkam saat menggunakan fitur mikrofon (diproses langsung, tidak disimpan)</li>
                  <li><strong>Preferensi</strong>: Pilihan gaya bahasa, konteks, dan bahasa target</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">1.2 Data yang Kami Hasilkan:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Hasil Analisis</strong>: Koreksi grammar, saran perbaikan, terjemahan</li>
                  <li><strong>Riwayat Penggunaan</strong>: Jumlah permintaan harian (untuk rate limiting)</li>
                  <li><strong>Preferensi Tema</strong>: Mode gelap/terang/flower (disimpan lokal)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🤖</span>
              2. Penggunaan Kecerdasan Buatan (AI)
            </h2>
            <div className={`${accentBg} rounded-2xl p-6 space-y-4 border-l-4`}>
              <p className="font-medium">
                Teduh Aksara menggunakan <strong>Google Generative AI (Gemini)</strong> untuk memproses dan menyempurnakan naskah Anda.
              </p>
              
              <div>
                <h3 className="font-bold mb-2">Yang Perlu Anda Ketahui:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Teks dan audio Anda dikirim ke Google Gemini API untuk diproses</li>
                  <li>Google memproses data sesuai <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className={`underline ${isFlower ? 'text-pink-300' : 'text-blue-600'}`}>Kebijakan Privasi Google AI</a></li>
                  <li>Kami TIDAK menyimpan teks Anda di server kami</li>
                  <li>Hasil koreksi AI bersifat otomatis dan mungkin tidak 100% akurat</li>
                  <li>Anda tetap bertanggung jawab penuh atas konten akhir yang Anda publikasikan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">💾</span>
              3. Penyimpanan Data
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-4 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  ✅ Lokal di Perangkat Anda:
                </h3>
                <p className="mb-2">Semua data berikut disimpan HANYA di perangkat Anda menggunakan IndexedDB:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Riwayat koreksi naskah</li>
                  <li>Pengaturan preferensi</li>
                  <li>Tema yang dipilih</li>
                </ul>
                <p className="mt-3 text-sm italic">
                  💡 Data ini dapat Anda hapus kapan saja melalui menu "Jejak Semai" atau dengan menghapus data browser.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  ✅ Tidak di Server Kami:
                </h3>
                <p>
                  Kami <strong>TIDAK</strong> memiliki database pusat yang menyimpan naskah Anda. Semua pemrosesan dilakukan secara real-time.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  ⚠️ Google Gemini API:
                </h3>
                <p>
                  Data dikirim ke Google untuk pemrosesan. Lihat <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={`underline ${isFlower ? 'text-pink-300' : 'text-blue-600'}`}>Kebijakan Privasi Google</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🎤</span>
              4. Data Audio (Fitur Mikrofon)
            </h2>
            <div className={`rounded-2xl p-6 space-y-3 ${isFlower ? 'bg-rose-900/30 border border-rose-500/20' : 'bg-rose-50/50 dark:bg-rose-900/10'}`}>
              <p>Jika Anda menggunakan fitur transkripsi suara:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Kami memerlukan izin akses mikrofon dari browser Anda</li>
                <li>Rekaman audio <strong>langsung ditranskripsi</strong> menjadi teks</li>
                <li>Audio <strong>TIDAK disimpan permanen</strong> setelah transkripsi selesai</li>
                <li>Durasi rekaman maksimal: 5 detik</li>
                <li>Anda dapat mencabut izin ini kapan saja melalui pengaturan browser</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🔗</span>
              5. Berbagi Data dengan Pihak Ketiga
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-4 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <div>
                <h3 className="font-bold text-lg mb-2">Google Gemini API:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Tujuan</strong>: Pemrosesan AI (analisis grammar, terjemahan)</li>
                  <li><strong>Data yang Dibagikan</strong>: Teks, audio (temporary)</li>
                  <li><strong>Kebijakan Mereka</strong>: <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className={`underline ${isFlower ? 'text-pink-300' : 'text-blue-600'}`}>Google AI Terms of Service</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Kami TIDAK:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>❌ Menjual data Anda</li>
                  <li>❌ Membagikan data ke pihak lain untuk iklan</li>
                  <li>❌ Menyimpan data Anda di server kami</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🛡️</span>
              6. Hak Anda (UU PDP)
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-3 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <p className="font-medium mb-4">Sesuai UU Perlindungan Data Pribadi Indonesia, Anda memiliki hak untuk:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${isFlower ? 'bg-petal-900/80' : 'bg-white dark:bg-emerald-950/30'}`}>
                  <h4 className="font-bold mb-2">✅ Mengakses Data</h4>
                  <p className="text-sm">Melihat data yang tersimpan di tab "Jejak Lokal"</p>
                </div>
                <div className={`p-4 rounded-xl ${isFlower ? 'bg-petal-900/80' : 'bg-white dark:bg-emerald-950/30'}`}>
                  <h4 className="font-bold mb-2">✅ Menghapus Data</h4>
                  <p className="text-sm">Gunakan tombol "Hapus Semua" di riwayat</p>
                </div>
                <div className={`p-4 rounded-xl ${isFlower ? 'bg-petal-900/80' : 'bg-white dark:bg-emerald-950/30'}`}>
                  <h4 className="font-bold mb-2">✅ Meminta Salinan</h4>
                  <p className="text-sm">Ekspor data Anda dalam format JSON</p>
                </div>
                <div className={`p-4 rounded-xl ${isFlower ? 'bg-petal-900/80' : 'bg-white dark:bg-emerald-950/30'}`}>
                  <h4 className="font-bold mb-2">✅ Menarik Persetujuan</h4>
                  <p className="text-sm">Hapus data dan berhenti menggunakan kapan saja</p>
                </div>
              </div>
              <p className="text-sm mt-4">
                ✅ Anda juga berhak <strong>mengajukan keluhan</strong> ke Lembaga Pelindung Data Pribadi Indonesia
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">👶</span>
              7. Pengguna di Bawah Umur
            </h2>
            <div className={`rounded-2xl p-6 border-l-4 ${isFlower ? 'bg-pink-900/30 border-pink-500' : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-500'}`}>
              <p className="font-medium mb-2">
                Teduh Aksara dapat digunakan oleh pelajar segala usia untuk tujuan pendidikan.
              </p>
              <p className="text-sm">
                ⚠️ Jika Anda berusia di bawah 18 tahun, mohon gunakan platform ini dengan pengawasan orang tua atau guru. Kami menyarankan orang tua untuk mendampingi penggunaan fitur AI oleh anak-anak.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🔒</span>
              8. Keamanan Data
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-3 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <p>Kami menerapkan langkah-langkah keamanan berikut:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>🔒 <strong>Enkripsi HTTPS</strong>: Semua komunikasi dienkripsi</li>
                <li>🔒 <strong>Penyimpanan Lokal</strong>: Data tersimpan di browser Anda (tidak di cloud)</li>
                <li>🔒 <strong>Tidak Ada Akses</strong>: Kami tidak memiliki akses ke data lokal Anda</li>
                <li>🔒 <strong>No Cookies Tracking</strong>: Kami tidak menggunakan cookies pelacakan</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">🔄</span>
              9. Perubahan Kebijakan
            </h2>
            <div className={`rounded-2xl p-6 ${isFlower ? 'bg-blue-900/20' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan kami umumkan melalui pemberitahuan di platform dan akan berlaku setelah 30 hari sejak diumumkan.
              </p>
              <p className="mt-3 font-medium">
                Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui kebijakan yang diperbarui.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isFlower ? 'text-pink-200' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <span className="text-3xl">📧</span>
              10. Hubungi Kami
            </h2>
            <div className={`${sectionBg} rounded-2xl p-6 space-y-3 border ${isFlower ? 'border-pink-500/10' : 'border-transparent'}`}>
              <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, silakan hubungi kami:</p>
              <div className={`p-5 rounded-xl space-y-2 ${isFlower ? 'bg-petal-900/80' : 'bg-white dark:bg-emerald-950/30'}`}>
                <p><strong>Email:</strong> tara-teduhaksara@proton.me</p>
                <p><strong>Platform:</strong> Teduh Aksara</p>
                <p><strong>Lokasi:</strong> Indonesia</p>
              </div>
              <p className="text-sm italic mt-4">
                💌 Kami akan merespons dalam waktu 7 hari kerja.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <section className={`border-t-2 ${borderColor} pt-8 mt-12`}>
            <div className={`rounded-2xl p-6 text-center ${isFlower ? 'bg-pink-900 text-pink-50' : 'bg-emerald-900 dark:bg-emerald-950 text-white'}`}>
              <p className="font-bold text-lg mb-2">🌿 Komitmen Tara</p>
              <p className={isFlower ? 'text-pink-200' : 'text-emerald-200'}>
                "Seperti pohon kersen yang melindungi, kami menjaga privasi Anda dengan sepenuh hati. Tulisan Anda adalah milik Anda, selamanya."
              </p>
            </div>
          </section>

          {/* Compliance Statement */}
          <section className="text-center text-sm italic opacity-60">
            <p>
              <strong>Pernyataan Kepatuhan:</strong> Kebijakan ini dibuat untuk memenuhi UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi Republik Indonesia.
            </p>
          </section>

        </div>

        {/* Action Buttons */}
        <div className={`mt-12 pt-8 border-t ${borderColor} flex flex-col sm:flex-row gap-4`}>
          <button 
            onClick={() => window.print()}
            className={`flex-1 py-4 ${buttonPrimary} text-white rounded-2xl font-bold transition-all`}
          >
            📄 Cetak / Simpan PDF
          </button>
          <button 
            onClick={() => window.history.back()}
            className={`flex-1 py-4 ${buttonSecondary} rounded-2xl font-bold transition-all`}
          >
            ← Kembali ke Teduh Aksara
          </button>
        </div>

      </div>
    </div>
  );
}