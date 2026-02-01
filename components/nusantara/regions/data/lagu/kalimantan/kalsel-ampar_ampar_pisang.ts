// Path: components/nusantara/regions/data/lagu/kalsel-ampar_ampar_pisang.ts

export const amparAmparPisang = {
  id: "kalsel-ampar-ampar-pisang",
  judul: "Ampar Ampar Pisang",
  daerah: "Kalimantan Selatan",
  bpm: 110, // Moderato
  timeSignature: "2/4", // Perhatikan: Birama 2/4
  melody: [
    // ==========================================
    // --- BAIT 1 ---
    // "Ampar ampar pisang..."
    // ==========================================

    // Bar 0 (Pickup): | 0 0 5. | (Am-) -> 5. = G3
    // Masuk di ketukan ke-2 setengah (Beat 1.5)
    { time: "0:1:2", note: "G3", duration: "8n" },   // Am

    // Bar 1: | 1 1 7. 1 | (par am-par pi)
    { time: "1:0:0", note: "C4", duration: "8n" },   // par
    { time: "1:0:2", note: "C4", duration: "8n" },   // am
    { time: "1:1:0", note: "B3", duration: "8n" },   // par
    { time: "1:1:2", note: "C4", duration: "8n" },   // pi

    // Bar 2: | 2 5. 5. | (sang, pi-sang)
    { time: "2:0:0", note: "D4", duration: "4n" },   // sang
    { time: "2:1:0", note: "G3", duration: "8n" },   // pi
    { time: "2:1:2", note: "G3", duration: "8n" },   // sang

    // Bar 3: | 2 2 1 2 | (ku ba-lum ma)
    { time: "3:0:0", note: "D4", duration: "8n" },   // ku
    { time: "3:0:2", note: "D4", duration: "8n" },   // ba
    { time: "3:1:0", note: "C4", duration: "8n" },   // lum
    { time: "3:1:2", note: "D4", duration: "8n" },   // ma

    // Bar 4: | 3 . | (sak...)
    { time: "4:0:0", note: "E4", duration: "2n" },   // sak...

    // ==========================================
    // --- BAIT 2 ---
    // "Masak sabigi dihurung bari-bari"
    // ==========================================

    // Bar 5: | 4 4 2 2 | (Ma-sak sa-bi)
    { time: "5:0:0", note: "F4", duration: "8n" },   // Ma
    { time: "5:0:2", note: "F4", duration: "8n" },   // sak
    { time: "5:1:0", note: "D4", duration: "8n" },   // sa
    { time: "5:1:2", note: "D4", duration: "8n" },   // bi

    // Bar 6: | 3 1 1 | (gi di hu-rung)
    { time: "6:0:0", note: "E4", duration: "4n" },   // gi
    { time: "6:1:0", note: "C4", duration: "8n" },   // di
    { time: "6:1:2", note: "C4", duration: "8n" },   // hu

    // Bar 7: | 2 2 1 7. | (ba-ri ba-ri)
    { time: "7:0:0", note: "D4", duration: "8n" },   // rung
    { time: "7:0:2", note: "D4", duration: "8n" },   // ba
    { time: "7:1:0", note: "C4", duration: "8n" },   // ri
    { time: "7:1:2", note: "B3", duration: "8n" },   // ba

    // Bar 8: | 1 . | (ri...)
    { time: "8:0:0", note: "C4", duration: "2n" },   // ri...

    // ==========================================
    // --- BAIT 2 PENGULANGAN ---
    // "Masak sabigi dihurung bari-bari"
    // ==========================================

    // Bar 9: | 4 4 2 2 |
    { time: "9:0:0", note: "F4", duration: "8n" },
    { time: "9:0:2", note: "F4", duration: "8n" },
    { time: "9:1:0", note: "D4", duration: "8n" },
    { time: "9:1:2", note: "D4", duration: "8n" },

    // Bar 10: | 3 1 1 |
    { time: "10:0:0", note: "E4", duration: "4n" },
    { time: "10:1:0", note: "C4", duration: "8n" },
    { time: "10:1:2", note: "C4", duration: "8n" },

    // Bar 11: | 2 2 1 7. |
    { time: "11:0:0", note: "D4", duration: "8n" },
    { time: "11:0:2", note: "D4", duration: "8n" },
    { time: "11:1:0", note: "C4", duration: "8n" },
    { time: "11:1:2", note: "B3", duration: "8n" },

    // ==========================================
    // --- BRIDGE / TRANSISI ---
    // "Manggalepak manggalepok"
    // ==========================================

    // Bar 12: | 1 5. 5. 5. | (ri Mang-ga le)
    // 1 (ri) menyambung dari bar sebelumnya, lalu masuk lirik baru
    { time: "12:0:0", note: "C4", duration: "8n" },  // ri
    { time: "12:0:2", note: "G3", duration: "8n" },  // Mang
    { time: "12:1:0", note: "G3", duration: "8n" },  // ga
    { time: "12:1:2", note: "G3", duration: "8n" },  // le

    // Bar 13: | 1 1 7. 1 | (pak mang-ga le)
    { time: "13:0:0", note: "C4", duration: "8n" },  // pak
    { time: "13:0:2", note: "C4", duration: "8n" },  // mang
    { time: "13:1:0", note: "B3", duration: "8n" },  // ga
    { time: "13:1:2", note: "C4", duration: "8n" },  // le

    // Bar 14: | 2 . 5. | (pok... pa)
    { time: "14:0:0", note: "D4", duration: "4n." }, // pok
    { time: "14:1:2", note: "G3", duration: "8n" },  // pa

    // ==========================================
    // --- BAIT 3 ---
    // "Patah kayu bengkok..."
    // ==========================================

    // Bar 15: | 2 2 1 2 | (tah ka-yu beng)
    { time: "15:0:0", note: "D4", duration: "8n" },  // tah
    { time: "15:0:2", note: "D4", duration: "8n" },  // ka
    { time: "15:1:0", note: "C4", duration: "8n" },  // yu
    { time: "15:1:2", note: "D4", duration: "8n" },  // beng

    // Bar 16: | 3 3 3 | (kok Beng-kok)
    { time: "16:0:0", note: "E4", duration: "4n" },  // kok
    { time: "16:1:0", note: "E4", duration: "8n" },  // Beng
    { time: "16:1:2", note: "E4", duration: "8n" },  // kok

    // Bar 17: | 4 4 2 2 | (di-ma-kan a)
    { time: "17:0:0", note: "F4", duration: "8n" },  // di
    { time: "17:0:2", note: "F4", duration: "8n" },  // ma
    { time: "17:1:0", note: "D4", duration: "8n" },  // kan
    { time: "17:1:2", note: "D4", duration: "8n" },  // a

    // Bar 18: | 3 1 1 | (pi, a-pi)
    { time: "18:0:0", note: "E4", duration: "4n" },  // pi
    { time: "18:1:0", note: "C4", duration: "8n" },  // a
    { time: "18:1:2", note: "C4", duration: "8n" },  // pi

    // Bar 19: | 2 2 1 7. | (nya ka-cu-ru)
    { time: "19:0:0", note: "D4", duration: "8n" },  // nya
    { time: "19:0:2", note: "D4", duration: "8n" },  // ka
    { time: "19:1:0", note: "C4", duration: "8n" },  // cu
    { time: "19:1:2", note: "B3", duration: "8n" },  // ru

    // Bar 20: | 1 3 3 | (pan... Beng-kok)
    { time: "20:0:0", note: "C4", duration: "4n" },  // pan
    { time: "20:1:0", note: "E4", duration: "8n" },  // Beng
    { time: "20:1:2", note: "E4", duration: "8n" },  // kok

    // ==========================================
    // --- BAIT 3 ULANG (Bengkok dimakan api...) ---
    // ==========================================

    // Bar 21: | 4 4 2 2 | (di-ma-kan a)
    { time: "21:0:0", note: "F4", duration: "8n" },
    { time: "21:0:2", note: "F4", duration: "8n" },
    { time: "21:1:0", note: "D4", duration: "8n" },
    { time: "21:1:2", note: "D4", duration: "8n" },

    // Bar 22: | 3 1 1 | (pi, a-pi)
    { time: "22:0:0", note: "E4", duration: "4n" },
    { time: "22:1:0", note: "C4", duration: "8n" },
    { time: "22:1:2", note: "C4", duration: "8n" },

    // Bar 23: | 2 2 1 7. | (nya ka-cu-ru)
    { time: "23:0:0", note: "D4", duration: "8n" },
    { time: "23:0:2", note: "D4", duration: "8n" },
    { time: "23:1:0", note: "C4", duration: "8n" },
    { time: "23:1:2", note: "B3", duration: "8n" },

    // Bar 24: | 1 . 3 | (pan... Nang)
    { time: "24:0:0", note: "C4", duration: "4n." }, // pan...
    { time: "24:1:2", note: "E4", duration: "8n" },  // Nang (Pickup Chorus)

    // ==========================================
    // --- CHORUS ---
    // "Nang mana batis kutung..."
    // ==========================================

    // Bar 25: | 5 5 4 3 | (ma-na ba-tis)
    { time: "25:0:0", note: "G4", duration: "8n" },  // ma
    { time: "25:0:2", note: "G4", duration: "8n" },  // na
    { time: "25:1:0", note: "F4", duration: "8n" },  // ba
    { time: "25:1:2", note: "E4", duration: "8n" },  // tis

    // Bar 26: | 5 2 . 2 | (ku-tung... di)
    { time: "26:0:0", note: "G4", duration: "8n" },  // ku
    { time: "26:0:2", note: "D4", duration: "4n" },  // tung...
    { time: "26:1:2", note: "D4", duration: "8n" },  // di

    // Bar 27: | 4 4 3 2 | (ki-ti bi-da)
    { time: "27:0:0", note: "F4", duration: "8n" },  // ki
    { time: "27:0:2", note: "F4", duration: "8n" },  // ti
    { time: "27:1:0", note: "E4", duration: "8n" },  // bi
    { time: "27:1:2", note: "D4", duration: "8n" },  // da

    // Bar 28: | 1 . 3 | (wang... Nang)
    { time: "28:0:0", note: "C4", duration: "4n." }, // wang...
    { time: "28:1:2", note: "E4", duration: "8n" },  // Nang

    // ==========================================
    // --- CHORUS ULANG ---
    // ==========================================

    // Bar 29
    { time: "29:0:0", note: "G4", duration: "8n" },
    { time: "29:0:2", note: "G4", duration: "8n" },
    { time: "29:1:0", note: "F4", duration: "8n" },
    { time: "29:1:2", note: "E4", duration: "8n" },

    // Bar 30
    { time: "30:0:0", note: "G4", duration: "8n" },
    { time: "30:0:2", note: "D4", duration: "4n" },
    { time: "30:1:2", note: "D4", duration: "8n" },

    // Bar 31
    { time: "31:0:0", note: "F4", duration: "8n" },
    { time: "31:0:2", note: "F4", duration: "8n" },
    { time: "31:1:0", note: "E4", duration: "8n" },
    { time: "31:1:2", note: "D4", duration: "8n" },

    // Bar 32 (Final Note)
    { time: "32:0:0", note: "C4", duration: "1n" }   // wang
  ]
};