// Path: components/nusantara/regions/data/lagu/jabar-manuk_dadali.ts

export const manukDadali = {
  id: "jabar-manuk-dadali",
  judul: "Manuk Dadali",
  daerah: "Jawa Barat",
  bpm: 110, // Con Moto (Semangat)
  timeSignature: "2/4", // Perhatikan: Birama 2/4
  melody: [
    // ==========================================
    // --- VERSE 1 ---
    // "Mesat ngapung luhur..."
    // ==========================================

    // Bar 0 (Pickup): | 0 5 | (0 = Rest, 5 = Sol Rendah)
    // Mulai di ketukan ke-2
    { time: "0:1:0", note: "G3", duration: "4n" },   // (Pickup)

    // Bar 1: | 3 4 5 7 | (Me-sat nga-pung)
    { time: "1:0:0", note: "E4", duration: "8n" },   // Me
    { time: "1:0:2", note: "F4", duration: "8n" },   // sat
    { time: "1:1:0", note: "G4", duration: "8n" },   // nga
    { time: "1:1:2", note: "B4", duration: "8n" },   // pung

    // Bar 2: | 1 . 7 1 | (lu-hur...)
    { time: "2:0:0", note: "C5", duration: "4n" },   // lu
    { time: "2:1:0", note: "B4", duration: "8n" },   // hur
    { time: "2:1:2", note: "C5", duration: "8n" },   // (sambung)

    // Bar 3: | 3 4 5 5 | (ja-uh di a)
    { time: "3:0:0", note: "E4", duration: "8n" },   // ja
    { time: "3:0:2", note: "F4", duration: "8n" },   // uh
    { time: "3:1:0", note: "G4", duration: "8n" },   // di
    { time: "3:1:2", note: "G4", duration: "8n" },   // a

    // Bar 4: | 5 0 5 | (wang-a-wang) -> 0 dilewati (Gap)
    { time: "4:0:0", note: "G4", duration: "4n" },   // wang
    // (Jeda 8n di 4:1:0)
    { time: "4:1:2", note: "G3", duration: "8n" },   // wang (pickup bait 2)

    // Bar 5: | 3 4 5 7 | (Me-ber-keun jan)
    { time: "5:0:0", note: "E4", duration: "8n" },
    { time: "5:0:2", note: "F4", duration: "8n" },
    { time: "5:1:0", note: "G4", duration: "8n" },
    { time: "5:1:2", note: "B4", duration: "8n" },

    // Bar 6: | 1 7 1 | (jang-na ba)
    { time: "6:0:0", note: "C5", duration: "4n" },
    { time: "6:1:0", note: "B4", duration: "8n" },
    { time: "6:1:2", note: "C5", duration: "8n" },

    // Bar 7: | 3 4 5 4 | (ngun ta-ya ka)
    { time: "7:0:0", note: "E4", duration: "8n" },
    { time: "7:0:2", note: "F4", duration: "8n" },
    { time: "7:1:0", note: "G4", duration: "8n" },
    { time: "7:1:2", note: "F4", duration: "8n" },

    // Bar 8: | 4 0 5 | (ring-rang... Ku)
    { time: "8:0:0", note: "F4", duration: "4n" },   // ring
    // (Jeda)
    { time: "8:1:2", note: "G3", duration: "8n" },   // rang (Ku)

    // ==========================================
    // --- VERSE 2 ---
    // "Ku na rangga..."
    // ==========================================

    // Bar 9: | 4 3 1 7< | (Ku-na rang-ga) - 7< adalah B3
    { time: "9:0:0", note: "F4", duration: "8n" },
    { time: "9:0:2", note: "E4", duration: "8n" },
    { time: "9:1:0", note: "C4", duration: "8n" },
    { time: "9:1:2", note: "B3", duration: "8n" },

    // Bar 10: | 1 3 4 5 | (os reu-jeung pa)
    { time: "10:0:0", note: "C4", duration: "8n" },
    { time: "10:0:2", note: "E4", duration: "8n" },
    { time: "10:1:0", note: "F4", duration: "8n" },
    { time: "10:1:2", note: "G4", duration: "8n" }, // pa... (di partitur 5, lirik pamatuk)

    // Bar 11: | 1 3 4 4 | (ma-tuk-na nge)
    { time: "11:0:0", note: "C4", duration: "8n" },
    { time: "11:0:2", note: "E4", duration: "8n" },
    { time: "11:1:0", note: "F4", duration: "8n" },
    { time: "11:1:2", note: "F4", duration: "8n" },

    // Bar 12: | 4 0 5 | (luk... Nga)
    { time: "12:0:0", note: "F4", duration: "4n" },
    // (Jeda)
    { time: "12:1:2", note: "G3", duration: "8n" },

    // Bar 13: | 4 3 1 7< | (pak me-ga ba)
    { time: "13:0:0", note: "F4", duration: "8n" },
    { time: "13:0:2", note: "E4", duration: "8n" },
    { time: "13:1:0", note: "C4", duration: "8n" },
    { time: "13:1:2", note: "B3", duration: "8n" },

    // Bar 14: | 1 3 4 5 | (ri hi-ber-na)
    { time: "14:0:0", note: "C4", duration: "8n" },
    { time: "14:0:2", note: "E4", duration: "8n" },
    { time: "14:1:0", note: "F4", duration: "8n" },
    { time: "14:1:2", note: "G4", duration: "8n" },

    // Bar 15: | 1 3 1 1 | (ta-rik nyu-ru)
    { time: "15:0:0", note: "C4", duration: "8n" },
    { time: "15:0:2", note: "E4", duration: "8n" },
    { time: "15:1:0", note: "C4", duration: "8n" },
    { time: "15:1:2", note: "C4", duration: "8n" },

    // Bar 16: | 1 0 5 | (wuk... Sa)
    { time: "16:0:0", note: "C4", duration: "4n" },
    // (Jeda)
    { time: "16:1:2", note: "G3", duration: "8n" }, // Pickup repeat Verse 2 (Saha...)

    // ==========================================
    // --- VERSE 3 (Saha anu bisa...) ---
    // Melodi sama persis Bar 1-8
    // ==========================================

    // Bar 17
    { time: "17:0:0", note: "E4", duration: "8n" },
    { time: "17:0:2", note: "F4", duration: "8n" },
    { time: "17:1:0", note: "G4", duration: "8n" },
    { time: "17:1:2", note: "B4", duration: "8n" },

    // Bar 18
    { time: "18:0:0", note: "C5", duration: "4n" },
    { time: "18:1:0", note: "B4", duration: "8n" },
    { time: "18:1:2", note: "C5", duration: "8n" },

    // Bar 19
    { time: "19:0:0", note: "E4", duration: "8n" },
    { time: "19:0:2", note: "F4", duration: "8n" },
    { time: "19:1:0", note: "G4", duration: "8n" },
    { time: "19:1:2", note: "G4", duration: "8n" },

    // Bar 20
    { time: "20:0:0", note: "G4", duration: "4n" },
    { time: "20:1:2", note: "G3", duration: "8n" },

    // Bar 21
    { time: "21:0:0", note: "E4", duration: "8n" },
    { time: "21:0:2", note: "F4", duration: "8n" },
    { time: "21:1:0", note: "G4", duration: "8n" },
    { time: "21:1:2", note: "B4", duration: "8n" },

    // Bar 22
    { time: "22:0:0", note: "C5", duration: "4n" },
    { time: "22:1:0", note: "B4", duration: "8n" },
    { time: "22:1:2", note: "C5", duration: "8n" },

    // Bar 23
    { time: "23:0:0", note: "E4", duration: "8n" },
    { time: "23:0:2", note: "F4", duration: "8n" },
    { time: "23:1:0", note: "G4", duration: "8n" },
    { time: "23:1:2", note: "F4", duration: "8n" },

    // Bar 24
    { time: "24:0:0", note: "F4", duration: "4n" },
    { time: "24:1:2", note: "G3", duration: "8n" },

    // ==========================================
    // --- VERSE 4 (Gandang jeung...) ---
    // Melodi sama persis Bar 9-16
    // ==========================================

    // Bar 25
    { time: "25:0:0", note: "F4", duration: "8n" },
    { time: "25:0:2", note: "E4", duration: "8n" },
    { time: "25:1:0", note: "C4", duration: "8n" },
    { time: "25:1:2", note: "B3", duration: "8n" },

    // Bar 26
    { time: "26:0:0", note: "C4", duration: "8n" },
    { time: "26:0:2", note: "E4", duration: "8n" },
    { time: "26:1:0", note: "F4", duration: "8n" },
    { time: "26:1:2", note: "G4", duration: "8n" },

    // Bar 27
    { time: "27:0:0", note: "C4", duration: "8n" },
    { time: "27:0:2", note: "E4", duration: "8n" },
    { time: "27:1:0", note: "F4", duration: "8n" },
    { time: "27:1:2", note: "F4", duration: "8n" },

    // Bar 28
    { time: "28:0:0", note: "F4", duration: "4n" },
    { time: "28:1:2", note: "G3", duration: "8n" },

    // Bar 29
    { time: "29:0:0", note: "F4", duration: "8n" },
    { time: "29:0:2", note: "E4", duration: "8n" },
    { time: "29:1:0", note: "C4", duration: "8n" },
    { time: "29:1:2", note: "B3", duration: "8n" },

    // Bar 30
    { time: "30:0:0", note: "C4", duration: "8n" },
    { time: "30:0:2", note: "E4", duration: "8n" },
    { time: "30:1:0", note: "F4", duration: "8n" },
    { time: "30:1:2", note: "G4", duration: "8n" },

    // Bar 31
    { time: "31:0:0", note: "C4", duration: "8n" },
    { time: "31:0:2", note: "E4", duration: "8n" },
    { time: "31:1:0", note: "C4", duration: "8n" },
    { time: "31:1:2", note: "C4", duration: "8n" },

    // Bar 32: | 1 . | (na...)
    { time: "32:0:0", note: "C4", duration: "2n" },

    // ==========================================
    // --- CHORUS (REFF) ---
    // "Manuk Dadali..."
    // ==========================================

    // Bar 33: | 0 1 4 5 | (Ma-nuk Da-da)
    // 0 dilewati
    { time: "33:0:2", note: "C4", duration: "8n" },
    { time: "33:1:0", note: "F4", duration: "8n" },
    { time: "33:1:2", note: "G4", duration: "8n" },

    // Bar 34: | 6 . 4 5 | (li... Ma-nuk)
    { time: "34:0:0", note: "A4", duration: "4n" },
    { time: "34:1:0", note: "F4", duration: "8n" },
    { time: "34:1:2", note: "G4", duration: "8n" },

    // Bar 35: | 0 6 4 5 | (Pang-ga-gah)
    // 0 dilewati
    { time: "35:0:2", note: "A4", duration: "8n" },
    { time: "35:1:0", note: "F4", duration: "8n" },
    { time: "35:1:2", note: "G4", duration: "8n" },

    // Bar 36: | 6 6 6 . | (na...)
    { time: "36:0:0", note: "A4", duration: "8n" },
    { time: "36:0:2", note: "A4", duration: "8n" },
    { time: "36:1:0", note: "A4", duration: "4n" },

    // Bar 37: | 0 2< 1 6< | (Per-lam-bang sak) - 6< = A3, 2< = D4
    // 0 dilewati
    { time: "37:0:2", note: "D4", duration: "8n" },
    { time: "37:1:0", note: "C4", duration: "8n" },
    { time: "37:1:2", note: "A3", duration: "8n" },

    // Bar 38: | 5 . 3 5 | (ti... In-do)
    { time: "38:0:0", note: "G3", duration: "4n" }, // G3 (Sol bawah)
    { time: "38:1:0", note: "E4", duration: "8n" },
    { time: "38:1:2", note: "G4", duration: "8n" },

    // Bar 39: | 0 6 3 6 | (ne-sia ja)
    // 0 dilewati
    { time: "39:0:2", note: "A4", duration: "8n" },
    { time: "39:1:0", note: "E4", duration: "8n" },
    { time: "39:1:2", note: "A4", duration: "8n" },

    // Bar 40: | 5 5 5 . | (ya...)
    { time: "40:0:0", note: "G4", duration: "8n" },
    { time: "40:0:2", note: "G4", duration: "8n" },
    { time: "40:1:0", note: "G4", duration: "4n" },

    // ==========================================
    // --- CHORUS LANJUTAN ---
    // "Manuk Dadali... Pangkakoncarana"
    // ==========================================

    // Bar 41: | 0 1 4 5 |
    { time: "41:0:2", note: "C4", duration: "8n" },
    { time: "41:1:0", note: "F4", duration: "8n" },
    { time: "41:1:2", note: "G4", duration: "8n" },

    // Bar 42: | 6 . 4 5 |
    { time: "42:0:0", note: "A4", duration: "4n" },
    { time: "42:1:0", note: "F4", duration: "8n" },
    { time: "42:1:2", note: "G4", duration: "8n" },

    // Bar 43: | 0 6 4 5 |
    { time: "43:0:2", note: "A4", duration: "8n" },
    { time: "43:1:0", note: "F4", duration: "8n" },
    { time: "43:1:2", note: "G4", duration: "8n" },

    // Bar 44: | 6 6 6 . |
    { time: "44:0:0", note: "A4", duration: "8n" },
    { time: "44:0:2", note: "A4", duration: "8n" },
    { time: "44:1:0", note: "A4", duration: "4n" },

    // Bar 45: | 0 6 7 i | (Re-sep nga-hi)
    { time: "45:0:2", note: "A4", duration: "8n" },
    { time: "45:1:0", note: "B4", duration: "8n" },
    { time: "45:1:2", note: "C5", duration: "8n" },

    // Bar 46: | 2 . 7 5 | (ji... Ru-kun)
    { time: "46:0:0", note: "D5", duration: "4n" },
    { time: "46:1:0", note: "B4", duration: "8n" },
    { time: "46:1:2", note: "G4", duration: "8n" },

    // Bar 47: | 0 6 7 2 | (sa-ka-beh)
    { time: "47:0:2", note: "A4", duration: "8n" },
    { time: "47:1:0", note: "B4", duration: "8n" },
    { time: "47:1:2", note: "D5", duration: "8n" },

    // Bar 48: | 1 1 1 5 | (na hi... Rup)
    { time: "48:0:0", note: "C5", duration: "8n" },
    { time: "48:0:2", note: "C5", duration: "8n" },
    { time: "48:1:0", note: "C5", duration: "4n" },
    // Pickup Ending (Rup...)
    { time: "48:1:2", note: "G3", duration: "8n" },

    // ==========================================
    // --- ENDING (Melodi Ulang Verse 1) ---
    // "Rup sauyunan..."
    // ==========================================

    // Bar 49
    { time: "49:0:0", note: "E4", duration: "8n" },
    { time: "49:0:2", note: "F4", duration: "8n" },
    { time: "49:1:0", note: "G4", duration: "8n" },
    { time: "49:1:2", note: "B4", duration: "8n" },

    // Bar 50
    { time: "50:0:0", note: "C5", duration: "4n" },
    { time: "50:1:0", note: "B4", duration: "8n" },
    { time: "50:1:2", note: "C5", duration: "8n" },

    // Bar 51
    { time: "51:0:0", note: "E4", duration: "8n" },
    { time: "51:0:2", note: "F4", duration: "8n" },
    { time: "51:1:0", note: "G4", duration: "8n" },
    { time: "51:1:2", note: "G4", duration: "8n" },

    // Bar 52
    { time: "52:0:0", note: "G4", duration: "4n" },
    { time: "52:1:2", note: "G3", duration: "8n" },

    // Bar 53
    { time: "53:0:0", note: "E4", duration: "8n" },
    { time: "53:0:2", note: "F4", duration: "8n" },
    { time: "53:1:0", note: "G4", duration: "8n" },
    { time: "53:1:2", note: "B4", duration: "8n" },

    // Bar 54
    { time: "54:0:0", note: "C5", duration: "4n" },
    { time: "54:1:0", note: "B4", duration: "8n" },
    { time: "54:1:2", note: "C5", duration: "8n" },

    // Bar 55
    { time: "55:0:0", note: "E4", duration: "8n" },
    { time: "55:0:2", note: "F4", duration: "8n" },
    { time: "55:1:0", note: "G4", duration: "8n" },
    { time: "55:1:2", note: "F4", duration: "8n" },

    // Bar 56
    { time: "56:0:0", note: "F4", duration: "4n" },
    { time: "56:1:2", note: "G3", duration: "8n" },

    // Bar 57
    { time: "57:0:0", note: "F4", duration: "8n" },
    { time: "57:0:2", note: "E4", duration: "8n" },
    { time: "57:1:0", note: "C4", duration: "8n" },
    { time: "57:1:2", note: "B3", duration: "8n" },

    // Bar 58
    { time: "58:0:0", note: "C4", duration: "8n" },
    { time: "58:0:2", note: "E4", duration: "8n" },
    { time: "58:1:0", note: "F4", duration: "8n" },
    { time: "58:1:2", note: "G4", duration: "8n" },

    // Bar 59
    { time: "59:0:0", note: "C4", duration: "8n" },
    { time: "59:0:2", note: "E4", duration: "8n" },
    { time: "59:1:0", note: "F4", duration: "8n" },
    { time: "59:1:2", note: "F4", duration: "8n" },

    // Bar 60
    { time: "60:0:0", note: "F4", duration: "4n" },
    { time: "60:1:2", note: "G3", duration: "8n" },

    // Bar 61
    { time: "61:0:0", note: "F4", duration: "8n" },
    { time: "61:0:2", note: "E4", duration: "8n" },
    { time: "61:1:0", note: "C4", duration: "8n" },
    { time: "61:1:2", note: "B3", duration: "8n" },

    // Bar 62
    { time: "62:0:0", note: "C4", duration: "8n" },
    { time: "62:0:2", note: "E4", duration: "8n" },
    { time: "62:1:0", note: "F4", duration: "8n" },
    { time: "62:1:2", note: "G4", duration: "8n" },

    // Bar 63
    { time: "63:0:0", note: "C4", duration: "8n" },
    { time: "63:0:2", note: "E4", duration: "8n" },
    { time: "63:1:0", note: "C4", duration: "8n" },
    { time: "63:1:2", note: "C4", duration: "8n" },

    // Bar 64 (Final Note)
    { time: "64:0:0", note: "C4", duration: "1n" }
  ]
};