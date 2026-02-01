// Path: components/nusantara/regions/data/lagu/jateng-gundul_pacul.ts

export const gundulGundulPacul = {
  id: "jateng-gundul-pacul",
  judul: "Gundul Pacul",
  daerah: "Jawa Tengah",
  bpm: 105, // Gembira/Moderato
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 (Bar 1-4) ---
    // "Gundul gundul pacul cul..."
    // ==========================================

    // Bar 1: | 1 3 0 1 3 4 | (Gun-dul gun-dul pa-cul)
    // Beat 1: 1 (4n)
    { time: "0:0:0", note: "C4", duration: "4n" },   // Gun
    // Beat 2: 3 (4n)
    { time: "0:1:0", note: "E4", duration: "4n" },   // dul
    // Beat 3: 0 (8n Rest - dilewati) 1 (8n)
    { time: "0:2:2", note: "C4", duration: "8n" },   // gun
    // Beat 4: 3 (8n) 4 (8n)
    { time: "0:3:0", note: "E4", duration: "8n" },   // dul
    { time: "0:3:2", note: "F4", duration: "8n" },   // pa

    // Bar 2: | 5 5 . 7 | (cul gem-be-le)
    // Beat 1: 5 (4n)
    { time: "1:0:0", note: "G4", duration: "4n" },   // cul
    // Beat 2: 5 (4n)
    { time: "1:1:0", note: "G4", duration: "4n" },   // gem
    // Beat 3: . (Rest/Hold - dilewati)
    // Beat 4: 7 (4n)
    { time: "1:3:0", note: "B4", duration: "4n" },   // be

    // Bar 3: | 1> 7 1> 7 | (le-ngan)
    // 1> adalah Do tinggi (C5)
    { time: "2:0:0", note: "C5", duration: "4n" },   // le
    { time: "2:1:0", note: "B4", duration: "4n" },   // ngan
    { time: "2:2:0", note: "C5", duration: "4n" },   // (instrumen)
    { time: "2:3:0", note: "B4", duration: "4n" },   // (instrumen)

    // Bar 4: | 5 . 0 1 | (Nyung-)
    // Beat 1-2: 5 (2n)
    { time: "3:0:0", note: "G4", duration: "2n" },   // ...
    // Beat 3: Rest (dilewati)
    // Beat 4: 1 (4n) - Pickup
    { time: "3:3:0", note: "C4", duration: "4n" },   // Nyung

    // ==========================================
    // --- BAIT 2 (Bar 5-8) ---
    // "Nyunggi nyunggi wakul kul..."
    // (Melodi sama dengan Bait 1)
    // ==========================================

    // Bar 5: | 3 0 1 3 4 | (gi nyung-gi wa-kul)
    // Beat 1: 3 (4n)
    { time: "4:0:0", note: "E4", duration: "4n" },   // gi
    // Beat 2: 0 (Rest) 1 (8n)
    { time: "4:1:2", note: "C4", duration: "8n" },   // nyung
    // Beat 3: 3 (8n) 4 (8n) -> Di sini variasi ritme mengikuti lirik
    // Sesuai gambar: 3 di beat 3, 4 di beat 4? Tidak, polanya mirip bar 1
    // Kita samakan ritmenya dengan Bar 1:
    { time: "4:2:0", note: "E4", duration: "8n" },   // gi
    { time: "4:2:2", note: "F4", duration: "8n" },   // wa

    // Bar 6: | 5 5 . 7 | (kul gem-be-le)
    { time: "5:0:0", note: "G4", duration: "4n" },   // kul
    { time: "5:1:0", note: "G4", duration: "4n" },   // gem
    // Beat 3 Rest
    { time: "5:3:0", note: "B4", duration: "4n" },   // be

    // Bar 7: | 1> 7 1> 7 | (le-ngan)
    { time: "6:0:0", note: "C5", duration: "4n" },   // le
    { time: "6:1:0", note: "B4", duration: "4n" },   // ngan
    { time: "6:2:0", note: "C5", duration: "4n" },   
    { time: "6:3:0", note: "B4", duration: "4n" },   

    // Bar 8: | 5 . 0 1 | (Wa-)
    { time: "7:0:0", note: "G4", duration: "2n" },   
    // Beat 3 Rest
    { time: "7:3:0", note: "C4", duration: "4n" },   // Wa

    // ==========================================
    // --- BAIT 3 (Bar 9-12) ---
    // "Wakul ngglimpang segane..."
    // ==========================================

    // Bar 9: | 3 . 5 . | (kul ngglim-)
    // Nada panjang (2 ketuk)
    { time: "8:0:0", note: "E4", duration: "2n" },   // kul
    { time: "8:2:0", note: "G4", duration: "2n" },   // ngglim

    // Bar 10: | 4 4 5 4 | (pang se-ga-ne)
    { time: "9:0:0", note: "F4", duration: "4n" },   // pang
    { time: "9:1:0", note: "F4", duration: "4n" },   // se
    { time: "9:2:0", note: "G4", duration: "4n" },   // ga
    { time: "9:3:0", note: "F4", duration: "4n" },   // ne

    // Bar 11: | 3 1 4 3 | (da-di sak-la)
    { time: "10:0:0", note: "E4", duration: "4n" },  // da
    { time: "10:1:0", note: "C4", duration: "4n" },  // di
    { time: "10:2:0", note: "F4", duration: "4n" },  // sak
    { time: "10:3:0", note: "E4", duration: "4n" },  // la

    // Bar 12: | 1 . 0 1 | (tar... Wa)
    { time: "11:0:0", note: "C4", duration: "2n" },  // tar...
    // Rest
    { time: "11:3:0", note: "C4", duration: "4n" },  // Wa

    // ==========================================
    // --- BAIT 4 (Bar 13-16) ---
    // "Wakul ngglimpang..." (Pengulangan)
    // ==========================================

    // Bar 13: | 3 . 5 . | (kul ngglim-)
    { time: "12:0:0", note: "E4", duration: "2n" },  // kul
    { time: "12:2:0", note: "G4", duration: "2n" },  // ngglim

    // Bar 14: | 4 4 5 4 | (pang se-ga-ne)
    { time: "13:0:0", note: "F4", duration: "4n" },  // pang
    { time: "13:1:0", note: "F4", duration: "4n" },  // se
    { time: "13:2:0", note: "G4", duration: "4n" },  // ga
    { time: "13:3:0", note: "F4", duration: "4n" },  // ne

    // Bar 15: | 3 1 4 3 | (da-di sak-la)
    { time: "14:0:0", note: "E4", duration: "4n" },  // da
    { time: "14:1:0", note: "C4", duration: "4n" },  // di
    { time: "14:2:0", note: "F4", duration: "4n" },  // sak
    { time: "14:3:0", note: "E4", duration: "4n" },  // la

    // Bar 16: | 1 . . 0 | (tar...)
    { time: "15:0:0", note: "C4", duration: "2n." } // tar...
  ]
};