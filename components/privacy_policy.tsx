import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#050a08] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#0a1a12] rounded-[3rem] p-8 md:p-12 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-emerald-100 dark:border-emerald-900/30">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-emerald-50 mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            Teduh Aksara - Platform Penyelarasan Bahasa AI
          </p>
          <p className="text-sm text-emerald-500/50 mt-2">
            Terakhir diperbarui: 7 Januari 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-emerald-900 dark:text-emerald-100">
          
          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed">
              Selamat datang di <strong>Teduh Aksara</strong>. Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda sesuai dengan <strong>Undang-Undang Perlindungan Data Pribadi (UU PDP)</strong> Republik Indonesia dan <strong>UU ITE (Informasi dan Transaksi Elektronik)</strong>.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">📝</span>
              1. Data yang Kami Kumpulkan
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">1.1 Data yang Anda Berikan:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Teks Naskah</strong>: Teks yang Anda ketik untuk dikoreksi</li>
                  <li><strong>Nama Panggilan</strong>: Opsional, hanya untuk personalisasi pengalaman (disimpan lokal)</li>
                  <li><strong>Rekaman Suara</strong>: Jika Anda menggunakan fitur transkripsi (diproses langsung, tidak disimpan)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">1.2 Data yang Dikumpulkan Otomatis:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Riwayat Koreksi</strong>: Disimpan secara lokal di perangkat Anda menggunakan IndexedDB</li>
                  <li><strong>Preferensi Tema</strong>: Mode gelap/terang (disimpan lokal)</li>
                  <li><strong>Data Teknis</strong>: Informasi perangkat dan browser untuk optimasi kinerja</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              2. Penggunaan Kecerdasan Buatan (AI)
            </h2>
            <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl p-6 space-y-4 border-l-4 border-amber-500">
              <p className="font-medium">
                Teduh Aksara menggunakan <strong>Google Generative AI (Gemini)</strong> untuk memproses dan menyempurnakan naskah Anda.
              </p>
              
              <div>
                <h3 className="font-bold mb-2">Yang Perlu Anda Ketahui:</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Teks Anda dikirim ke server Google AI untuk diproses</li>
                  <li>Google memproses data sesuai <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Kebijakan Privasi Google AI</a></li>
                  <li>Kami TIDAK menyimpan teks Anda di server kami</li>
                  <li>Hasil koreksi AI bersifat otomatis dan mungkin tidak sempurna</li>
                  <li>Anda tetap bertanggung jawab penuh atas konten akhir yang Anda publikasikan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              3. Fitur Deteksi Plagiarisme
            </h2>
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-6 space-y-3">
              <p>Jika Anda menggunakan fitur deteksi plagiarisme:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Naskah Anda akan dibandingkan dengan sumber web publik</li>
                <li>Proses dilakukan secara anonim</li>
                <li>Naskah Anda TIDAK disimpan atau diindeks oleh mesin pencari</li>
                <li>Hanya digunakan untuk verifikasi keaslian</li>
              </ul>
              <p className="font-bold text-blue-800 dark:text-blue-300 mt-4">
                ⚠️ Anda harus memberikan izin eksplisit sebelum fitur ini diaktifkan
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">💾</span>
              4. Penyimpanan Data
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">4.1 Penyimpanan Lokal:</h3>
                <p className="mb-2">Semua data berikut disimpan HANYA di perangkat Anda:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Riwayat koreksi naskah</li>
                  <li>Pengaturan preferensi</li>
                  <li>Nama panggilan (jika diisi)</li>
                </ul>
                <p className="mt-3 text-sm italic">
                  💡 Data ini dapat Anda hapus kapan saja melalui menu "Jejak Semai" atau dengan menghapus data browser.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">4.2 Tidak Ada Server Kami:</h3>
                <p>
                  Kami <strong>TIDAK</strong> memiliki database pusat yang menyimpan naskah Anda. Semua pemrosesan dilakukan secara real-time.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🎤</span>
              5. Izin Mikrofon (Transkripsi Suara)
            </h2>
            <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl p-6 space-y-3">
              <p>Jika Anda menggunakan fitur transkripsi suara:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Kami memerlukan izin akses mikrofon dari browser Anda</li>
                <li>Rekaman diproses secara <strong>real-time</strong> untuk diubah menjadi teks</li>
                <li>Rekaman suara <strong>TIDAK PERNAH</strong> disimpan di perangkat atau server manapun</li>
                <li>Anda dapat mencabut izin ini kapan saja melalui pengaturan browser</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              6. Hak Anda (UU PDP)
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-6 space-y-3">
              <p className="font-medium mb-4">Sesuai UU Perlindungan Data Pribadi Indonesia, Anda memiliki hak untuk:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-emerald-950/30 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Akses Data</h4>
                  <p className="text-sm">Melihat data yang tersimpan di perangkat Anda</p>
                </div>
                <div className="bg-white dark:bg-emerald-950/30 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Hapus Data</h4>
                  <p className="text-sm">Menghapus riwayat dan data lokal kapan saja</p>
                </div>
                <div className="bg-white dark:bg-emerald-950/30 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Tolak Pemrosesan</h4>
                  <p className="text-sm">Tidak menggunakan fitur AI jika tidak nyaman</p>
                </div>
                <div className="bg-white dark:bg-emerald-950/30 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Portabilitas</h4>
                  <p className="text-sm">Ekspor data Anda dalam format yang dapat dibaca</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">👶</span>
              7. Pengguna di Bawah Umur
            </h2>
            <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl p-6 border-l-4 border-amber-500">
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
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔒</span>
              8. Keamanan Data
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-6 space-y-3">
              <p>Kami menerapkan langkah-langkah keamanan berikut:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Enkripsi HTTPS</strong>: Semua komunikasi dienkripsi</li>
                <li><strong>Tidak Ada Autentikasi Eksternal</strong>: Tidak ada login dengan akun pihak ketiga</li>
                <li><strong>Pemrosesan Client-Side</strong>: Sebagian besar pemrosesan dilakukan di perangkat Anda</li>
                <li><strong>No Cookies Tracking</strong>: Kami tidak menggunakan cookies pelacakan</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔄</span>
              9. Perubahan Kebijakan
            </h2>
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-6">
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
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-3">
              <span className="text-3xl">📧</span>
              10. Hubungi Kami
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl p-6 space-y-3">
              <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, silakan hubungi kami:</p>
              <div className="bg-white dark:bg-emerald-950/30 p-5 rounded-xl space-y-2">
                <p><strong>Email:</strong> privacy@teduhaksara.com</p>
                <p><strong>Platform:</strong> Teduh Aksara</p>
                <p><strong>Lokasi:</strong> Indonesia</p>
              </div>
              <p className="text-sm italic mt-4">
                💌 Kami akan merespons dalam waktu 7 hari kerja.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <section className="border-t-2 border-emerald-100 dark:border-emerald-900/30 pt-8 mt-12">
            <div className="bg-emerald-900 dark:bg-emerald-950 text-white rounded-2xl p-6 text-center">
              <p className="font-bold text-lg mb-2">🌿 Komitmen Tara</p>
              <p className="text-emerald-200">
                "Seperti pohon kersen yang melindungi, kami menjaga privasi Anda dengan sepenuh hati. Tulisan Anda adalah milik Anda, selamanya."
              </p>
            </div>
          </section>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-emerald-100 dark:border-emerald-900/30 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold transition-all"
          >
            📄 Cetak / Simpan PDF
          </button>
          <button 
            onClick={() => window.history.back()}
            className="flex-1 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-2xl font-bold hover:bg-emerald-100 dark:hover:bg-emerald-800/30 transition-all"
          >
            ← Kembali ke Teduh Aksara
          </button>
        </div>

      </div>
    </div>
  );
}