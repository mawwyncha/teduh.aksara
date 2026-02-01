// Path: components/nusantara/regions/data/lagu/kaltara-bebilin.ts

export const bebilin = {
  id: "kaltara-bebilin",
  judul: "Bebilin",
  daerah: "Kalimantan Utara",
  bpm: 120,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- INTRO / BAIT 1 (VERSE 1) ---
    // "Inindang... inindang..."
    // ==========================================

    // Bar 1: | 0 0 0 5. 6. | (I-nin) -> 5. = G3
    // Masuk di beat ke-4
    { time: "0:3:0", note: "G3", duration: "8n" },   // I
    { time: "0:3:2", note: "A3", duration: "8n" },   // nin

    // Bar 2: | 5 . 1 2 | (dang... i nin dang)
    { time: "1:0:0", note: "G4", duration: "2n" },   // dang...
    { time: "1:2:0", note: "C4", duration: "4n" },   // i
    { time: "1:3:0", note: "D4", duration: "4n" },   // nin

    // Bar 3: | 3 . 0 1 3 | (dang... i nin)
    { time: "2:0:0", note: "E4", duration: "2n" },   // dang...
    // (Jeda 1 ketuk dilewati)
    { time: "2:3:0", note: "C4", duration: "8n" },   // i
    { time: "2:3:2", note: "E4", duration: "8n" },   // nin

    // Bar 4: | 2 . 1 6. | (dang... i nin)
    { time: "3:0:0", note: "D4", duration: "2n" },   // dang...
    { time: "3:2:0", note: "C4", duration: "4n" },   // i
    { time: "3:3:0", note: "A3", duration: "4n" },   // nin

    // Bar 5: | 5. . 0 5. 6. | (dang... i nin)
    { time: "4:0:0", note: "G3", duration: "2n" },   // dang...
    // (Jeda 1 ketuk)
    { time: "4:3:0", note: "G3", duration: "8n" },   // i
    { time: "4:3:2", note: "A3", duration: "8n" },   // nin

    // Bar 6: | 5 . 5 5 3 | (dang... i nin dang)
    // Note: Interpretasi ritme '5 5 3' sesuai kelompok
    { time: "5:0:0", note: "G4", duration: "2n" },   // dang...
    { time: "5:2:0", note: "G4", duration: "8n" },   // i
    { time: "5:2:2", note: "G4", duration: "8n" },   // nin
    { time: "5:3:0", note: "E4", duration: "4n" },   // dang

    // Bar 7: | 2 5 3 2 3 2 1 | (i nin dang i nin dang)
    { time: "6:0:0", note: "D4", duration: "4n" },   // i
    { time: "6:1:0", note: "G4", duration: "8n" },   // nin
    { time: "6:1:2", note: "E4", duration: "8n" },   // dang
    { time: "6:2:0", note: "D4", duration: "4n" },   // i
    { time: "6:3:0", note: "E4", duration: "8n" },   // nin
    { time: "6:3:2", note: "D4", duration: "8n" },   // dang

    // Bar 8: | 1 . . 0 |
    { time: "7:0:0", note: "C4", duration: "2n." },  // (hold)

    // ==========================================
    // --- BAIT 2 (VERSE 2) ---
    // "Bebilin ya du ya ki..."
    // (Melodi sama persis dengan Bait 1)
    // ==========================================

    // Bar 9: | 0 0 0 5. 6. |
    { time: "8:3:0", note: "G3", duration: "8n" },
    { time: "8:3:2", note: "A3", duration: "8n" },

    // Bar 10: | 5 . 1 2 |
    { time: "9:0:0", note: "G4", duration: "2n" },
    { time: "9:2:0", note: "C4", duration: "4n" },
    { time: "9:3:0", note: "D4", duration: "4n" },

    // Bar 11: | 3 . 0 1 3 |
    { time: "10:0:0", note: "E4", duration: "2n" },
    { time: "10:3:0", note: "C4", duration: "8n" },
    { time: "10:3:2", note: "E4", duration: "8n" },

    // Bar 12: | 2 . 1 6. |
    { time: "11:0:0", note: "D4", duration: "2n" },
    { time: "11:2:0", note: "C4", duration: "4n" },
    { time: "11:3:0", note: "A3", duration: "4n" },

    // Bar 13: | 5. . 0 5. 6. |
    { time: "12:0:0", note: "G3", duration: "2n" },
    { time: "12:3:0", note: "G3", duration: "8n" },
    { time: "12:3:2", note: "A3", duration: "8n" },

    // Bar 14: | 5 . 5 5 3 |
    { time: "13:0:0", note: "G4", duration: "2n" },
    { time: "13:2:0", note: "G4", duration: "8n" },
    { time: "13:2:2", note: "G4", duration: "8n" },
    { time: "13:3:0", note: "E4", duration: "4n" },

    // Bar 15: | 2 5 3 2 3 2 1 |
    { time: "14:0:0", note: "D4", duration: "4n" },
    { time: "14:1:0", note: "G4", duration: "8n" },
    { time: "14:1:2", note: "E4", duration: "8n" },
    { time: "14:2:0", note: "D4", duration: "4n" },
    { time: "14:3:0", note: "E4", duration: "8n" },
    { time: "14:3:2", note: "D4", duration: "8n" },

    // Bar 16: | 1 . . 0 |
    { time: "15:0:0", note: "C4", duration: "2n." },

    // ==========================================
    // --- REFF / CHORUS 1 ---
    // "Suboi no la... bu be di lit"
    // ==========================================

    // Bar 17: | 0 6 1 6 | (Su-boi no la)
    // Masuk beat 2
    { time: "16:1:0", note: "A4", duration: "4n" },   // Su (Interpretasi: 0 adalah 1 ketuk)
    { time: "16:2:0", note: "C5", duration: "8n" },   // boi
    { time: "16:2:2", note: "A4", duration: "8n" },   // no
    { time: "16:3:0", note: "A4", duration: "4n" },   // la... (nada 6 hold?)
    // Di partitur: | 0 6 1 6 | 5 . 5 5 3 |
    // Mari ikuti visual: 0 (4n) 6 1 (8n) 6 (4n) -> total 3 beat. Kurang 1 beat.
    // Asumsi: 0 (4n), 6 (4n), 1 6 (8n) ?
    // Kita pakai pola standar lagu ini:
    { time: "16:1:0", note: "A4", duration: "4n" },
    { time: "16:2:0", note: "C5", duration: "8n" },
    { time: "16:2:2", note: "A4", duration: "8n" },
    { time: "16:3:0", note: "A4", duration: "4n" }, // la (Hold to next bar)

    // Bar 18: | 5 . 5 5 3 | (bu be di lit)
    { time: "17:0:0", note: "G4", duration: "2n" },   // bu...
    { time: "17:2:0", note: "G4", duration: "8n" },   // be
    { time: "17:2:2", note: "G4", duration: "8n" },   // di
    { time: "17:3:0", note: "E4", duration: "4n" },   // lit

    // Bar 19: | 2 5 5 3 2 1 | (su boi no la...)
    { time: "18:0:0", note: "D4", duration: "4n" },   // su
    { time: "18:1:0", note: "G4", duration: "4n" },   // boi
    { time: "18:2:0", note: "G4", duration: "8n" },   // no
    { time: "18:2:2", note: "E4", duration: "8n" },   // la
    { time: "18:3:0", note: "D4", duration: "8n" },   // bu
    { time: "18:3:2", note: "C4", duration: "8n" },   // be

    // Bar 20: | 3 2 1 . . 0 | (di lit...)
    { time: "19:0:0", note: "E4", duration: "8n" },   // di
    { time: "19:0:2", note: "D4", duration: "8n" },   // lit
    { time: "19:1:0", note: "C4", duration: "2n." },  // ...

    // ==========================================
    // --- REFF / CHORUS 2 ---
    // "Penemba yuk... de no fi kir"
    // ==========================================

    // Bar 21: | 0 5 5 6 | (Pe-nem-ba yuk)
    { time: "20:1:0", note: "G4", duration: "4n" },
    { time: "20:2:0", note: "G4", duration: "8n" },
    { time: "20:2:2", note: "A4", duration: "8n" },
    { time: "20:3:0", note: "G4", duration: "4n" },

    // Bar 22: | 5 . 5 1 2 | (de no fi kir)
    { time: "21:0:0", note: "G4", duration: "2n" },
    { time: "21:2:0", note: "G4", duration: "8n" },
    { time: "21:2:2", note: "C4", duration: "8n" },
    { time: "21:3:0", note: "D4", duration: "4n" },

    // Bar 23: | 3 . 0 1 1 3 | (pe-nem-ba yuk)
    { time: "22:0:0", note: "E4", duration: "2n" },
    { time: "22:2:0", note: "C4", duration: "8n" },
    { time: "22:2:2", note: "C4", duration: "8n" },
    { time: "22:3:0", note: "E4", duration: "4n" },

    // Bar 24: | 2 . 3 1 6. | (de no fi)
    { time: "23:0:0", note: "D4", duration: "2n" },
    { time: "23:2:0", note: "E4", duration: "8n" },
    { time: "23:2:2", note: "C4", duration: "8n" },
    { time: "23:3:0", note: "A3", duration: "4n" },

    // ==========================================
    // --- REFF / CHORUS 3 ---
    // "Impeng de lu... nas in su ai"
    // ==========================================

    // Bar 25: | 0 6 1 6 | (Im-peng de lu)
    { time: "24:1:0", note: "A4", duration: "4n" },
    { time: "24:2:0", note: "C5", duration: "8n" },
    { time: "24:2:2", note: "A4", duration: "8n" },
    { time: "24:3:0", note: "A4", duration: "4n" },

    // Bar 26: | 5 . 5 5 3 | (nas in su ai)
    { time: "25:0:0", note: "G4", duration: "2n" },
    { time: "25:2:0", note: "G4", duration: "8n" },
    { time: "25:2:2", note: "G4", duration: "8n" },
    { time: "25:3:0", note: "E4", duration: "4n" },

    // Bar 27: | 2 5 5 3 2 1 |
    { time: "26:0:0", note: "D4", duration: "4n" },
    { time: "26:1:0", note: "G4", duration: "4n" },
    { time: "26:2:0", note: "G4", duration: "8n" },
    { time: "26:2:2", note: "E4", duration: "8n" },
    { time: "26:3:0", note: "D4", duration: "8n" },
    { time: "26:3:2", note: "C4", duration: "8n" },

    // Bar 28: | 3 2 1 . . 0 |
    { time: "27:0:0", note: "E4", duration: "8n" },
    { time: "27:0:2", note: "D4", duration: "8n" },
    { time: "27:1:0", note: "C4", duration: "2n." },

    // ==========================================
    // --- ENDING ---
    // "I ya du ya ki..."
    // ==========================================

    // Bar 29: | 0 0 0 5 3 | (I ya)
    { time: "28:3:0", note: "G4", duration: "8n" },
    { time: "28:3:2", note: "E4", duration: "8n" },

    // Bar 30: | 5 3 1 3 3 | (du ya ki be bi)
    { time: "29:0:0", note: "G4", duration: "4n" },
    { time: "29:1:0", note: "E4", duration: "4n" },
    { time: "29:2:0", note: "C4", duration: "4n" },
    { time: "29:3:0", note: "E4", duration: "8n" },
    { time: "29:3:2", note: "E4", duration: "8n" },

    // Bar 31: | 2 1 3 2 1 5 3 | (lin ya du ya ki i)
    { time: "30:0:0", note: "D4", duration: "4n" },
    { time: "30:1:0", note: "C4", duration: "4n" },
    { time: "30:2:0", note: "E4", duration: "8n" },
    { time: "30:2:2", note: "D4", duration: "8n" },
    { time: "30:3:0", note: "C4", duration: "8n" },
    { time: "30:3:2", note: "G4", duration: "8n" }, // G4 dari partitur (i)

    // Bar 32: | 5 3 1 3 3 | (ya du ya ki be bi)
    { time: "31:0:0", note: "G4", duration: "4n" }, // ya
    { time: "31:1:0", note: "E4", duration: "4n" }, // du
    { time: "31:2:0", note: "C4", duration: "4n" }, // ya
    { time: "31:3:0", note: "E4", duration: "8n" }, // ki
    { time: "31:3:2", note: "E4", duration: "8n" }, // be

    // Bar 33: | 2 1 3 2 1 . || (lin ya du ya ki...)
    { time: "32:0:0", note: "D4", duration: "4n" },
    { time: "32:1:0", note: "C4", duration: "4n" },
    { time: "32:2:0", note: "E4", duration: "8n" },
    { time: "32:2:2", note: "D4", duration: "8n" },
    { time: "32:3:0", note: "C4", duration: "4n" }
  ]
};