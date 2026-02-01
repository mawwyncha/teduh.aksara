// Path: components/nusantara/regions/data/lagu/babel-yok_miak.ts

export const yokMiak = {
  id: "kepbabel-yok-miak",
  judul: "Yok Miak",
  daerah: "Bangka Belitung",
  bpm: 140, // Tempo Cepat
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1: "Yok miak kite gi..." ---
    // ==========================================

    // Bar 1: | 6 . 7 1 7 1 | (Yok miak...)
    { time: "0:0:0", note: "A4", duration: "4n." }, // Yok
    { time: "0:1:2", note: "B4", duration: "8n" },  // mi-
    { time: "0:2:0", note: "C5", duration: "8n" },  // ak
    { time: "0:2:2", note: "B4", duration: "8n" },  // ki-
    { time: "0:3:0", note: "C5", duration: "8n" },  // te
    // (Note: Total durasi bar ini syncopated)

    // Bar 2: | 6 . 7 1 7 1 2 | (...gi ke kebun ke hume)
    { time: "1:0:0", note: "A4", duration: "4n." }, // gi
    { time: "1:1:2", note: "B4", duration: "8n" },  // ke
    { time: "1:2:0", note: "C5", duration: "8n" },  // ke-
    { time: "1:2:2", note: "B4", duration: "8n" },  // bun
    { time: "1:3:0", note: "C5", duration: "8n" },  // ke
    { time: "1:3:2", note: "D5", duration: "8n" },  // hu-

    // Bar 3: | 3 . . 0 | (...me)
    { time: "2:0:0", note: "E5", duration: "2n." }, // me...
    // Istirahat di beat 4 (Gap)

    // Bar 4: | 6 . 5 4 3 | (Mawak suyak...)
    { time: "3:0:0", note: "A4", duration: "4n." }, // Ma-
    { time: "3:1:2", note: "G4", duration: "8n" },  // wak
    { time: "3:2:0", note: "F4", duration: "4n" },  // su-
    { time: "3:3:0", note: "E4", duration: "4n" },  // yak

    // Bar 5: | 2 . 1 2 3 | (Mawak suyak...)
    { time: "4:0:0", note: "D4", duration: "4n." }, // Ma-
    { time: "4:1:2", note: "C4", duration: "8n" },  // wak
    { time: "4:2:0", note: "D4", duration: "4n" },  // su-
    { time: "4:3:0", note: "E4", duration: "4n" },  // yak

    // Bar 6: | 4 6 5/ 6 5/ | (...mikol pacul) -> Perhatikan 5/ (Sol#)
    { time: "5:0:0", note: "F4", duration: "4n" },  // mi-
    { time: "5:1:0", note: "A4", duration: "4n" },  // kol
    // Triplet (5/ 6 5/)
    { time: "5:2:0", note: "G#4", duration: "8t" }, // pa-
    { time: "5:2:1", note: "A4", duration: "8t" },  // (ornamen)
    { time: "5:2:2", note: "G#4", duration: "8t" }, // cul
    // Beat 4 Gap/Hold

    // Bar 7: | 4 3 . 0 | (lanjutan pacul)
    { time: "6:0:0", note: "F4", duration: "4n" },  // (pa)
    { time: "6:1:0", note: "E4", duration: "2n" },  // cul...
    // Istirahat

    // Bar 8: | 4 . 3 2 1 2 | (Kite begawe...)
    { time: "7:0:0", note: "F4", duration: "4n." }, // Ki-
    { time: "7:1:2", note: "E4", duration: "8n" },  // te
    { time: "7:2:0", note: "D4", duration: "4n" },  // be-
    { time: "7:3:0", note: "C4", duration: "8n" },  // ga-
    { time: "7:3:2", note: "D4", duration: "8n" },  // we

    // Bar 9: | 7 . 7 1 2 | (...same same) -> 7 titik bawah (B3)
    { time: "8:0:0", note: "B3", duration: "4n." }, // sa-
    { time: "8:1:2", note: "B3", duration: "8n" },  // me
    { time: "8:2:0", note: "C4", duration: "4n" },  // sa-
    { time: "8:3:0", note: "D4", duration: "4n" },  // me

    // Bar 10: | 3 2 1 7 1 |
    { time: "9:0:0", note: "E4", duration: "8n" },
    { time: "9:0:2", note: "D4", duration: "8n" },
    { time: "9:1:0", note: "C4", duration: "4n" },
    { time: "9:2:0", note: "B3", duration: "8n" },
    { time: "9:2:2", note: "C4", duration: "8n" },

    // Bar 11: | 6 . . 0 | -> 6 titik bawah (A3)
    { time: "10:0:0", note: "A3", duration: "2n." },
    // Jeda antar bait

    // ==========================================
    // --- BAIT 2: "Kite nebas lalang..." ---
    // (Melodi Diulang)
    // ==========================================

    // Bar 12 (Sama dgn Bar 1)
    { time: "11:0:0", note: "A4", duration: "4n." },
    { time: "11:1:2", note: "B4", duration: "8n" },
    { time: "11:2:0", note: "C5", duration: "8n" },
    { time: "11:2:2", note: "B4", duration: "8n" },
    { time: "11:3:0", note: "C5", duration: "8n" },

    // Bar 13 (Sama dgn Bar 2)
    { time: "12:0:0", note: "A4", duration: "4n." },
    { time: "12:1:2", note: "B4", duration: "8n" },
    { time: "12:2:0", note: "C5", duration: "8n" },
    { time: "12:2:2", note: "B4", duration: "8n" },
    { time: "12:3:0", note: "C5", duration: "8n" },
    { time: "12:3:2", note: "D5", duration: "8n" },

    // Bar 14 (Sama dgn Bar 3)
    { time: "13:0:0", note: "E5", duration: "2n." },

    // Bar 15 (Sama dgn Bar 4)
    { time: "14:0:0", note: "A4", duration: "4n." },
    { time: "14:1:2", note: "G4", duration: "8n" },
    { time: "14:2:0", note: "F4", duration: "4n" },
    { time: "14:3:0", note: "E4", duration: "4n" },

    // Bar 16 (Sama dgn Bar 5)
    { time: "15:0:0", note: "D4", duration: "4n." },
    { time: "15:1:2", note: "C4", duration: "8n" },
    { time: "15:2:0", note: "D4", duration: "4n" },
    { time: "15:3:0", note: "E4", duration: "4n" },

    // Bar 17 (Sama dgn Bar 6)
    { time: "16:0:0", note: "F4", duration: "4n" },
    { time: "16:1:0", note: "A4", duration: "4n" },
    { time: "16:2:0", note: "G#4", duration: "8t" },
    { time: "16:2:1", note: "A4", duration: "8t" },
    { time: "16:2:2", note: "G#4", duration: "8t" },

    // Bar 18 (Sama dgn Bar 7)
    { time: "17:0:0", note: "F4", duration: "4n" },
    { time: "17:1:0", note: "E4", duration: "2n" },

    // Bar 19 (Sama dgn Bar 8)
    { time: "18:0:0", note: "F4", duration: "4n." },
    { time: "18:1:2", note: "E4", duration: "8n" },
    { time: "18:2:0", note: "D4", duration: "4n" },
    { time: "18:3:0", note: "C4", duration: "8n" },
    { time: "18:3:2", note: "D4", duration: "8n" },

    // Bar 20 (Sama dgn Bar 9)
    { time: "19:0:0", note: "B3", duration: "4n." },
    { time: "19:1:2", note: "B3", duration: "8n" },
    { time: "19:2:0", note: "C4", duration: "4n" },
    { time: "19:3:0", note: "D4", duration: "4n" },

    // Bar 21 (Sama dgn Bar 10)
    { time: "20:0:0", note: "E4", duration: "8n" },
    { time: "20:0:2", note: "D4", duration: "8n" },
    { time: "20:1:0", note: "C4", duration: "4n" },
    { time: "20:2:0", note: "B3", duration: "8n" },
    { time: "20:2:2", note: "C4", duration: "8n" },

    // Bar 22 (Sama dgn Bar 11)
    { time: "21:0:0", note: "A3", duration: "2n." },

    // ==========================================
    // --- BAIT 3: "Ambik belacan..." ---
    // (Melodi Diulang Lagi)
    // ==========================================

    { time: "22:0:0", note: "A4", duration: "4n." },
    { time: "22:1:2", note: "B4", duration: "8n" },
    { time: "22:2:0", note: "C5", duration: "8n" },
    { time: "22:2:2", note: "B4", duration: "8n" },
    { time: "22:3:0", note: "C5", duration: "8n" },

    { time: "23:0:0", note: "A4", duration: "4n." },
    { time: "23:1:2", note: "B4", duration: "8n" },
    { time: "23:2:0", note: "C5", duration: "8n" },
    { time: "23:2:2", note: "B4", duration: "8n" },
    { time: "23:3:0", note: "C5", duration: "8n" },
    { time: "23:3:2", note: "D5", duration: "8n" },

    { time: "24:0:0", note: "E5", duration: "2n." },

    { time: "25:0:0", note: "A4", duration: "4n." },
    { time: "25:1:2", note: "G4", duration: "8n" },
    { time: "25:2:0", note: "F4", duration: "4n" },
    { time: "25:3:0", note: "E4", duration: "4n" },

    { time: "26:0:0", note: "D4", duration: "4n." },
    { time: "26:1:2", note: "C4", duration: "8n" },
    { time: "26:2:0", note: "D4", duration: "4n" },
    { time: "26:3:0", note: "E4", duration: "4n" },

    { time: "27:0:0", note: "F4", duration: "4n" },
    { time: "27:1:0", note: "A4", duration: "4n" },
    { time: "27:2:0", note: "G#4", duration: "8t" },
    { time: "27:2:1", note: "A4", duration: "8t" },
    { time: "27:2:2", note: "G#4", duration: "8t" },

    { time: "28:0:0", note: "F4", duration: "4n" },
    { time: "28:1:0", note: "E4", duration: "2n" },

    { time: "29:0:0", note: "F4", duration: "4n." },
    { time: "29:1:2", note: "E4", duration: "8n" },
    { time: "29:2:0", note: "D4", duration: "4n" },
    { time: "29:3:0", note: "C4", duration: "8n" },
    { time: "29:3:2", note: "D4", duration: "8n" },

    { time: "30:0:0", note: "B3", duration: "4n." },
    { time: "30:1:2", note: "B3", duration: "8n" },
    { time: "30:2:0", note: "C4", duration: "4n" },
    { time: "30:3:0", note: "D4", duration: "4n" },

    { time: "31:0:0", note: "E4", duration: "8n" },
    { time: "31:0:2", note: "D4", duration: "8n" },
    { time: "31:1:0", note: "C4", duration: "4n" },
    { time: "31:2:0", note: "B3", duration: "8n" },
    { time: "31:2:2", note: "C4", duration: "8n" },

    { time: "32:0:0", note: "A3", duration: "2n." },

    // ==========================================
    // --- BAIT 4: "Kite ngelem pah..." ---
    // (Melodi Diulang Terakhir Kali)
    // ==========================================

    { time: "33:0:0", note: "A4", duration: "4n." },
    { time: "33:1:2", note: "B4", duration: "8n" },
    { time: "33:2:0", note: "C5", duration: "8n" },
    { time: "33:2:2", note: "B4", duration: "8n" },
    { time: "33:3:0", note: "C5", duration: "8n" },

    { time: "34:0:0", note: "A4", duration: "4n." },
    { time: "34:1:2", note: "B4", duration: "8n" },
    { time: "34:2:0", note: "C5", duration: "8n" },
    { time: "34:2:2", note: "B4", duration: "8n" },
    { time: "34:3:0", note: "C5", duration: "8n" },
    { time: "34:3:2", note: "D5", duration: "8n" },

    { time: "35:0:0", note: "E5", duration: "2n." },

    { time: "36:0:0", note: "A4", duration: "4n." },
    { time: "36:1:2", note: "G4", duration: "8n" },
    { time: "36:2:0", note: "F4", duration: "4n" },
    { time: "36:3:0", note: "E4", duration: "4n" },

    { time: "37:0:0", note: "D4", duration: "4n." },
    { time: "37:1:2", note: "C4", duration: "8n" },
    { time: "37:2:0", note: "D4", duration: "4n" },
    { time: "37:3:0", note: "E4", duration: "4n" },

    { time: "38:0:0", note: "F4", duration: "4n" },
    { time: "38:1:0", note: "A4", duration: "4n" },
    { time: "38:2:0", note: "G#4", duration: "8t" },
    { time: "38:2:1", note: "A4", duration: "8t" },
    { time: "38:2:2", note: "G#4", duration: "8t" },

    { time: "39:0:0", note: "F4", duration: "4n" },
    { time: "39:1:0", note: "E4", duration: "2n" },

    { time: "40:0:0", note: "F4", duration: "4n." },
    { time: "40:1:2", note: "E4", duration: "8n" },
    { time: "40:2:0", note: "D4", duration: "4n" },
    { time: "40:3:0", note: "C4", duration: "8n" },
    { time: "40:3:2", note: "D4", duration: "8n" },

    { time: "41:0:0", note: "B3", duration: "4n." },
    { time: "41:1:2", note: "B3", duration: "8n" },
    { time: "41:2:0", note: "C4", duration: "4n" },
    { time: "41:3:0", note: "D4", duration: "4n" },

    { time: "42:0:0", note: "E4", duration: "8n" },
    { time: "42:0:2", note: "D4", duration: "8n" },
    { time: "42:1:0", note: "C4", duration: "4n" },
    { time: "42:2:0", note: "B3", duration: "8n" },
    { time: "42:2:2", note: "C4", duration: "8n" },

    // Final Note (Hold)
    { time: "43:0:0", note: "A3", duration: "1n" }
  ]
};