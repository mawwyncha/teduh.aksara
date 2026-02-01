// Path: components/nusantara/regions/data/lagu/kepri-segantang_lada.ts

export const segantangLada = {
  id: "kepri-segantang-lada",
  judul: "Segantang Lada",
  daerah: "Kepulauan Riau",
  bpm: 90, // Tempo Moderato (Sedang)
  timeSignature: "4/4",
  melody: [
    // ===================================
    // --- INTRO (Baris 1) ---
    // ===================================

    // Pickup Bar (Ketukan ke-4): E4
    { time: "0:3:0", note: "E4", duration: "4n" },

    // Bar 1: Triplet(La-Si-Do) -> Re... Do Si
    { time: "1:0:0", note: "A4", duration: "8t" },
    { time: "1:0:1", note: "B4", duration: "8t" },
    { time: "1:0:2", note: "C5", duration: "8t" },
    { time: "1:1:0", note: "D5", duration: "4n." }, // Dotted
    { time: "1:2:2", note: "C5", duration: "8n" },
    { time: "1:3:0", note: "B4", duration: "4n" },

    // Bar 2: Mi... Fa# Sol# La
    // (Perhatikan F# dan G# sesuai gambar)
    { time: "2:0:0", note: "E5", duration: "2n" },
    { time: "2:2:0", note: "F#5", duration: "4n" },
    { time: "2:3:0", note: "G#5", duration: "8n" },
    { time: "2:3:2", note: "A5", duration: "8n" },

    // Bar 3: Si... (Turun cepat) Si La Sol# Fa#
    { time: "3:0:0", note: "B5", duration: "2n" },
    { time: "3:2:0", note: "B5", duration: "8n" },
    { time: "3:2:2", note: "A5", duration: "8n" },
    { time: "3:3:0", note: "G#5", duration: "8n" },
    { time: "3:3:2", note: "F#5", duration: "8n" },

    // Bar 4: Mi... (Whole Note)
    { time: "4:0:0", note: "E5", duration: "1n" },

    // ===================================
    // --- LAGU UTAMA (PASS 1) ---
    // (Sesuai tanda ulang di Baris 2)
    // ===================================

    // Bar 5: Mi Fa Mi Re
    { time: "5:0:0", note: "E5", duration: "4n" },
    { time: "5:1:0", note: "F5", duration: "4n" }, // F Natural di sini
    { time: "5:2:0", note: "E5", duration: "4n" },
    { time: "5:3:0", note: "D5", duration: "4n" },

    // Bar 6: Do... Si La Si
    { time: "6:0:0", note: "C5", duration: "4n." },
    { time: "6:1:2", note: "B4", duration: "8n" },
    { time: "6:2:0", note: "A4", duration: "8n" },
    // Ada slur kecil ke B
    { time: "6:2:2", note: "B4", duration: "4n" }, // Syncopated

    // Bar 7: Do... Triplet(Fa-Mi-Re) Do
    { time: "7:0:0", note: "C5", duration: "2n" },
    { time: "7:2:0", note: "F5", duration: "8t" },
    { time: "7:2:1", note: "E5", duration: "8t" },
    { time: "7:2:2", note: "D5", duration: "8t" },
    { time: "7:3:0", note: "C5", duration: "4n" },

    // Bar 8: Si La Sol#...
    { time: "8:0:0", note: "B4", duration: "4n" },
    { time: "8:1:0", note: "A4", duration: "4n" },
    { time: "8:2:0", note: "G#4", duration: "2n" },

    // Bar 9: La... (Menuju pengulangan)
    { time: "9:0:0", note: "A4", duration: "1n" },

    // ===================================
    // --- LAGU UTAMA (PASS 2 - PENGULANGAN) ---
    // (Mengulang Baris 2)
    // ===================================

    // Bar 10 (Sama dengan Bar 5)
    { time: "10:0:0", note: "E5", duration: "4n" },
    { time: "10:1:0", note: "F5", duration: "4n" },
    { time: "10:2:0", note: "E5", duration: "4n" },
    { time: "10:3:0", note: "D5", duration: "4n" },

    // Bar 11 (Sama dengan Bar 6)
    { time: "11:0:0", note: "C5", duration: "4n." },
    { time: "11:1:2", note: "B4", duration: "8n" },
    { time: "11:2:0", note: "A4", duration: "8n" },
    { time: "11:2:2", note: "B4", duration: "4n" },

    // Bar 12 (Sama dengan Bar 7)
    { time: "12:0:0", note: "C5", duration: "2n" },
    { time: "12:2:0", note: "F5", duration: "8t" },
    { time: "12:2:1", note: "E5", duration: "8t" },
    { time: "12:2:2", note: "D5", duration: "8t" },
    { time: "12:3:0", note: "C5", duration: "4n" },

    // Bar 13 (Sama dengan Bar 8)
    { time: "13:0:0", note: "B4", duration: "4n" },
    { time: "13:1:0", note: "A4", duration: "4n" },
    { time: "13:2:0", note: "G#4", duration: "2n" },

    // Bar 14: La...
    { time: "14:0:0", note: "A4", duration: "1n" },

    // ===================================
    // --- VARIASI / ENDING (Baris 3) ---
    // (Banyak Triplet)
    // ===================================

    // Bar 15: (Istirahat 1.5 ketuk) -> Mi Triplet(Re-Do-Si)
    // Mulai di ketuk ke-2 setengah
    { time: "15:1:2", note: "E5", duration: "8n" },
    { time: "15:2:0", note: "D5", duration: "8t" },
    { time: "15:2:1", note: "C5", duration: "8t" },
    { time: "15:2:2", note: "B4", duration: "8t" },
    { time: "15:3:0", note: "C5", duration: "4n" }, // Tie not in logic

    // Bar 16: Triplet(Do-Si-La#) Si Triplet(Si-La-Sol#)
    // (Gambar menunjukkan aksidental tajam/sharp pada not turun)
    { time: "16:0:0", note: "C5", duration: "8t" },
    { time: "16:0:1", note: "B4", duration: "8t" },
    { time: "16:0:2", note: "A#4", duration: "8t" }, // A Sharp (La#)
    
    { time: "16:1:0", note: "B4", duration: "4n." }, // Dotted

    { time: "16:2:2", note: "B4", duration: "8t" },
    { time: "16:2:3", note: "A4", duration: "8t" }, // Natural A
    { time: "16:2:4", note: "G#4", duration: "8t" }, // G Sharp

    // Bar 17: La...
    { time: "17:0:0", note: "A4", duration: "2n." },
    
    // Bar 18: La (Final)
    { time: "17:3:0", note: "A4", duration: "4n" }
  ]
};