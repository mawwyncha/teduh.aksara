// Path: components/nusantara/regions/data/lagu/jambi-injit_injit_semut.ts

export const injitInjitSemut = {
  id: "jambi-injit-injit-semut",
  judul: "Injit Injit Semut",
  daerah: "Jambi",
  bpm: 130, // Allegro (Cepat & Riang)
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- VERSE (BAIT 1) ---
    // "Jalan jalan ke tanah Deli..."
    // (Nada Tinggi: D5, C#5, B4, A4)
    // ==========================================

    // Bar 1: | 0 1 1 1 | (Jalan jalan) - 1 titik atas = D5
    // Beat 1 kosong (0), masuk di Beat 2
    { time: "0:1:0", note: "D5", duration: "8n" },
    { time: "0:1:2", note: "D5", duration: "8n" },
    { time: "0:2:0", note: "D5", duration: "8n" },
    { time: "0:2:2", note: "D5", duration: "8n" }, // (ke) - interpretasi ritme lirik
    { time: "0:3:0", note: "D5", duration: "4n" }, // (Masuk bar 2)

    // Bar 2: | 1 7 1 . 7 6 5 | (tanah Deli... Sung)
    { time: "1:0:0", note: "D5", duration: "8n" },
    { time: "1:0:2", note: "C#5", duration: "8n" },
    { time: "1:1:0", note: "D5", duration: "4n" },
    { time: "1:2:0", note: "C#5", duration: "8n" },
    { time: "1:2:2", note: "B4", duration: "8n" },
    { time: "1:3:0", note: "A4", duration: "4n" },

    // Bar 3: | 5 . 0 6 6 6 | (Sungguh indah...)
    // A4 (Hold dari bar 2)
    // Masuk di 0 6 6 6
    { time: "2:1:2", note: "B4", duration: "8n" },
    { time: "2:2:0", note: "B4", duration: "8n" },
    { time: "2:2:2", note: "B4", duration: "8n" },
    { time: "2:3:0", note: "B4", duration: "4n" }, // (tempat)

    // Bar 4: | 6 6 6 . 5 4 5 | (tempat tamasya... Ka)
    { time: "3:0:0", note: "B4", duration: "8n" },
    { time: "3:0:2", note: "B4", duration: "8n" },
    { time: "3:1:0", note: "B4", duration: "4n" },
    { time: "3:2:0", note: "A4", duration: "8n" },
    { time: "3:2:2", note: "G4", duration: "8n" },
    { time: "3:3:0", note: "A4", duration: "4n" },

    // Bar 5: | 5 . 0 1 1 1 | (Kawan jangan...) - 1 titik atas
    { time: "4:1:2", note: "D5", duration: "8n" },
    { time: "4:2:0", note: "D5", duration: "8n" },
    { time: "4:2:2", note: "D5", duration: "8n" },
    { time: "4:3:0", note: "D5", duration: "4n" }, // (ber)

    // Bar 6: | 2 2 2 . 2 2 3 | (bersedih... Mari) - Note: Di sini 2 & 3 adalah E5 & F#5 (Oktaf tinggi)
    // Sesuai gambar, nada tetap tinggi di verse.
    { time: "5:0:0", note: "E5", duration: "8n" },
    { time: "5:0:2", note: "E5", duration: "8n" },
    { time: "5:1:0", note: "E5", duration: "4n" },
    { time: "5:2:0", note: "E5", duration: "8n" },
    { time: "5:2:2", note: "E5", duration: "8n" },
    { time: "5:3:0", note: "F#5", duration: "4n" }, // (nya)

    // Bar 7: | 4 . 0 7 7 7 | (nyanyi... bersama) - 7 = C#5
    { time: "6:1:2", note: "C#5", duration: "8n" },
    { time: "6:2:0", note: "C#5", duration: "8n" },
    { time: "6:2:2", note: "C#5", duration: "8n" },
    { time: "6:3:0", note: "C#5", duration: "4n" }, // (sa)

    // Bar 8: | 7 7 1 . 7 6 5 | (sama... Kalau per)
    { time: "7:0:0", note: "C#5", duration: "8n" },
    { time: "7:0:2", note: "C#5", duration: "8n" },
    { time: "7:1:0", note: "D5", duration: "4n" },
    { time: "7:2:0", note: "C#5", duration: "8n" },
    { time: "7:2:2", note: "B4", duration: "8n" },
    { time: "7:3:0", note: "A4", duration: "4n" }, // (gi)

    // ==========================================
    // --- VERSE LANJUTAN (Bar 9 - 16) ---
    // "Ke Surabaya..."
    // ==========================================

    // Bar 9: | 5 . 0 1 1 1 | (...gi ke Sura)
    { time: "8:1:2", note: "D5", duration: "8n" },
    { time: "8:2:0", note: "D5", duration: "8n" },
    { time: "8:2:2", note: "D5", duration: "8n" },
    { time: "8:3:0", note: "D5", duration: "4n" }, // (ba)

    // Bar 10: | 1 7 1 . 7 6 5 | (baya... naik pra)
    { time: "9:0:0", note: "D5", duration: "8n" },
    { time: "9:0:2", note: "C#5", duration: "8n" },
    { time: "9:1:0", note: "D5", duration: "4n" },
    { time: "9:2:0", note: "C#5", duration: "8n" },
    { time: "9:2:2", note: "B4", duration: "8n" },
    { time: "9:3:0", note: "A4", duration: "4n" }, // (hu)

    // Bar 11: | 5 . 0 6 6 6 | (hu... dayung sen)
    { time: "10:1:2", note: "B4", duration: "8n" },
    { time: "10:2:0", note: "B4", duration: "8n" },
    { time: "10:2:2", note: "B4", duration: "8n" },
    { time: "10:3:0", note: "B4", duration: "4n" }, // (di)

    // Bar 12: | 6 6 6 . 5 4 5 | (diri... Kalau)
    { time: "11:0:0", note: "B4", duration: "8n" },
    { time: "11:0:2", note: "B4", duration: "8n" },
    { time: "11:1:0", note: "B4", duration: "4n" },
    { time: "11:2:0", note: "A4", duration: "8n" },
    { time: "11:2:2", note: "G4", duration: "8n" },
    { time: "11:3:0", note: "A4", duration: "4n" }, // (la)

    // Bar 13: | 5 . 0 5 | (Kalau...) - Pindah ke E5
    { time: "12:3:0", note: "A4", duration: "4n" }, // (ha) - Lirik 'Hati'

    // Bar 14: | 2 2 2 . 2 2 3 | (hatimu sedih) -> E5, F#5
    { time: "13:0:0", note: "E5", duration: "8n" },
    { time: "13:0:2", note: "E5", duration: "8n" },
    { time: "13:1:0", note: "E5", duration: "4n" },
    { time: "13:2:0", note: "E5", duration: "8n" },
    { time: "13:2:2", note: "E5", duration: "8n" },
    { time: "13:3:0", note: "F#5", duration: "4n" }, // (dih)

    // Bar 15: | 4 . 0 5 5 5 | (... Yang rugi) -> G5, A5
    // Note: Gambar menunjukkan turun ke oktaf 4 di sini (4 tanpa titik = G4)
    { time: "14:1:2", note: "A4", duration: "8n" },
    { time: "14:2:0", note: "A4", duration: "8n" },
    { time: "14:2:2", note: "A4", duration: "8n" },
    { time: "14:3:0", note: "A4", duration: "4n" },

    // Bar 16: | 5 4 4 . 3 2 1 | (diri sendiri)
    { time: "15:0:0", note: "A4", duration: "8n" },
    { time: "15:0:2", note: "G4", duration: "8n" },
    { time: "15:1:0", note: "G4", duration: "4n" },
    { time: "15:2:0", note: "F#4", duration: "8n" },
    { time: "15:2:2", note: "E4", duration: "8n" },
    { time: "15:3:0", note: "D4", duration: "4n" },

    // Bar 17 Transisi: | 1 . 0 5 | (In-)
    { time: "16:3:0", note: "A4", duration: "4n" }, // In- (nada rendah untuk reff)

    // ==========================================
    // --- CHORUS / REFF (PASS 1) ---
    // "Injit injit semut..."
    // (Nada Sedang: F#4, E4, D4)
    // ==========================================

    // Bar 18: | 3 . 3 3 2 | (jit injit se) - 3 = F#4
    { time: "17:0:0", note: "F#4", duration: "4n." }, // jit...
    { time: "17:1:2", note: "F#4", duration: "8n" },  // in
    { time: "17:2:0", note: "F#4", duration: "8n" },  // jit
    { time: "17:2:2", note: "E4", duration: "8n" },    // se
    { time: "17:3:0", note: "D4", duration: "4n" },    // mut

    // Bar 19: | 1 . 3 3 3 | (mut... siapa)
    { time: "18:1:2", note: "F#4", duration: "8n" },  // sia
    { time: "18:2:0", note: "F#4", duration: "8n" },  // pa
    { time: "18:2:2", note: "F#4", duration: "8n" },  // sa
    { time: "18:3:0", note: "F#4", duration: "4n" },  // kit

    // Bar 20: | 2 1 1 . 7 1 2 | (sakit naik dia)
    { time: "19:0:0", note: "E4", duration: "8n" },
    { time: "19:0:2", note: "D4", duration: "8n" },
    { time: "19:1:0", note: "D4", duration: "4n" },
    { time: "19:2:0", note: "C#4", duration: "8n" },
    { time: "19:2:2", note: "D4", duration: "8n" },
    { time: "19:3:0", note: "E4", duration: "4n" },   // tas

    // Bar 21: | 2 . 0 4 | (tas... In)
    { time: "20:3:0", note: "G4", duration: "4n" },    // In

    // Bar 22: | 4 . 6 6 6 | (jit injit se)
    { time: "21:0:0", note: "G4", duration: "4n." },
    { time: "21:1:2", note: "B4", duration: "8n" },
    { time: "21:2:0", note: "B4", duration: "8n" },
    { time: "21:2:2", note: "B4", duration: "8n" },
    { time: "21:3:0", note: "A4", duration: "4n" },    // mut

    // Bar 23: | 5 . 5 5 6 | (mut... walau)
    { time: "22:1:2", note: "A4", duration: "8n" },
    { time: "22:2:0", note: "A4", duration: "8n" },
    { time: "22:2:2", note: "B4", duration: "8n" },
    { time: "22:3:0", note: "A4", duration: "4n" },    // lau

    // Bar 24: | 5 4 4 . 3 4 5 | (sakit jangan dile)
    { time: "23:0:0", note: "A4", duration: "8n" },
    { time: "23:0:2", note: "G4", duration: "8n" },
    { time: "23:1:0", note: "G4", duration: "4n" },
    { time: "23:2:0", note: "F#4", duration: "8n" },
    { time: "23:2:2", note: "G4", duration: "8n" },
    { time: "23:3:0", note: "A4", duration: "4n" },    // pas

    // Bar 25: | 5 . 0 5 | (pas... In)
    { time: "24:3:0", note: "A4", duration: "4n" },    // In

    // ==========================================
    // --- CHORUS / REFF (PASS 2 - ULANG) ---
    // "Injit injit semut..."
    // ==========================================

    // Bar 26: | 3 . 3 3 2 |
    { time: "25:0:0", note: "F#4", duration: "4n." },
    { time: "25:1:2", note: "F#4", duration: "8n" },
    { time: "25:2:0", note: "F#4", duration: "8n" },
    { time: "25:2:2", note: "E4", duration: "8n" },
    { time: "25:3:0", note: "D4", duration: "4n" },

    // Bar 27: | 1 . 3 3 3 |
    { time: "26:1:2", note: "F#4", duration: "8n" },
    { time: "26:2:0", note: "F#4", duration: "8n" },
    { time: "26:2:2", note: "F#4", duration: "8n" },
    { time: "26:3:0", note: "F#4", duration: "4n" },

    // Bar 28: | 2 1 1 . 7 1 2 |
    { time: "27:0:0", note: "E4", duration: "8n" },
    { time: "27:0:2", note: "D4", duration: "8n" },
    { time: "27:1:0", note: "D4", duration: "4n" },
    { time: "27:2:0", note: "C#4", duration: "8n" },
    { time: "27:2:2", note: "D4", duration: "8n" },
    { time: "27:3:0", note: "E4", duration: "4n" },

    // Bar 29: | 2 . 0 4 |
    { time: "28:3:0", note: "G4", duration: "4n" },

    // Bar 30: | 4 . 6 6 6 |
    { time: "29:0:0", note: "G4", duration: "4n." },
    { time: "29:1:2", note: "B4", duration: "8n" },
    { time: "29:2:0", note: "B4", duration: "8n" },
    { time: "29:2:2", note: "B4", duration: "8n" },
    { time: "29:3:0", note: "A4", duration: "4n" },

    // Bar 31: | 5 . 5 5 6 |
    { time: "30:1:2", note: "A4", duration: "8n" },
    { time: "30:2:0", note: "A4", duration: "8n" },
    { time: "30:2:2", note: "B4", duration: "8n" },
    { time: "30:3:0", note: "A4", duration: "4n" },

    // Bar 32: | 5 4 4 . 3 2 | (jangan dile)
    { time: "31:0:0", note: "A4", duration: "8n" },
    { time: "31:0:2", note: "G4", duration: "8n" },
    { time: "31:1:0", note: "G4", duration: "4n" },
    { time: "31:2:0", note: "F#4", duration: "8n" },
    { time: "31:2:2", note: "E4", duration: "8n" },

    // Bar 33: | 1 . . . | (pas)
    { time: "32:0:0", note: "D4", duration: "1n" }
  ]
};