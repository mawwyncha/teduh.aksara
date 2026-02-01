// Path: components/nusantara/regions/data/lagu/kalbar-aek_kapuas.ts

export const aekKapuas = {
  id: "kalbar-aek-kapuas",
  judul: "Aek Kapuas",
  daerah: "Kalimantan Barat",
  bpm: 110,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 (Verse 1) ---
    // "Hei sampan laju..."
    // ==========================================

    // Bar 1: | 5 . 0 3 4 6 | (Hei... sam-pan la)
    { time: "0:0:0", note: "G4", duration: "2n" },   // Hei
    // (Jeda 1/2 ketuk dilewati)
    { time: "0:2:2", note: "E4", duration: "8n" },   // sam
    { time: "0:3:0", note: "F4", duration: "8n" },   // pan
    { time: "0:3:2", note: "A4", duration: "8n" },   // la

    // Bar 2: | 5 . 0 3 4 6 | (ju... sam-pan la)
    { time: "1:0:0", note: "G4", duration: "2n" },   // ju...
    // (Jeda 1/2 ketuk dilewati)
    { time: "1:2:2", note: "E4", duration: "8n" },   // sam
    { time: "1:3:0", note: "F4", duration: "8n" },   // pan
    { time: "1:3:2", note: "A4", duration: "8n" },   // la

    // Bar 3: | 5 3 3 3 4 3 2 1 | (ju da-ri hi-le sam-pai ke hu)
    { time: "2:0:0", note: "G4", duration: "8n" },   // ju
    { time: "2:0:2", note: "E4", duration: "8n" },   // da
    { time: "2:1:0", note: "E4", duration: "8n" },   // ri
    { time: "2:1:2", note: "E4", duration: "8n" },   // hi
    { time: "2:2:0", note: "F4", duration: "8n" },   // le
    { time: "2:2:2", note: "E4", duration: "8n" },   // sam
    { time: "2:3:0", note: "D4", duration: "8n" },   // pai
    { time: "2:3:2", note: "C4", duration: "8n" },   // ke

    // Bar 4: | 7< . 2 2 . 0 | (hu-lu...) - 7< = B3
    { time: "3:0:0", note: "B3", duration: "4n." },  // hu
    { time: "3:1:2", note: "D4", duration: "8n" },   // (slur)
    { time: "3:2:0", note: "D4", duration: "4n" },   // lu...
    // (Rest 1 ketuk dilewati)

    // ==========================================
    // --- BAIT 1 Lanjutan ---
    // "Sungai Kapuas..."
    // ==========================================

    // Bar 5: | 4 . . 4 2 3 5 | (Su-ngai Ka-pu)
    { time: "4:0:0", note: "F4", duration: "4n." },  // Su...
    { time: "4:1:2", note: "F4", duration: "8n" },   // ngai
    { time: "4:2:0", note: "D4", duration: "8n" },   // Ka
    { time: "4:2:2", note: "E4", duration: "8n" },   // pu
    { time: "4:3:0", note: "G4", duration: "4n" },   // as... (Note: di partitur 5 adalah 1/4 ketuk di akhir bar)

    // Bar 6: | 4 . 0 5 5 5 | (... sung-goh pan-jang)
    { time: "5:0:0", note: "F4", duration: "2n" },   // (hold as)
    // (Jeda 1/2 ketuk)
    { time: "5:2:2", note: "G4", duration: "8n" },   // sung
    { time: "5:3:0", note: "G4", duration: "8n" },   // goh
    { time: "5:3:2", note: "G4", duration: "8n" },   // pan

    // Bar 7: | 5 5 5 5 5 2 3 4 | (jang da-ri do-lo mem-be-lah ko)
    { time: "6:0:0", note: "G4", duration: "8n" },   // jang
    { time: "6:0:2", note: "G4", duration: "8n" },   // da
    { time: "6:1:0", note: "G4", duration: "8n" },   // ri
    { time: "6:1:2", note: "G4", duration: "8n" },   // do
    { time: "6:2:0", note: "G4", duration: "8n" },   // lo
    { time: "6:2:2", note: "D4", duration: "8n" },   // mem
    { time: "6:3:0", note: "E4", duration: "8n" },   // be
    { time: "6:3:2", note: "F4", duration: "8n" },   // lah

    // Bar 8: | 4 . 3 3 . 0 | (ko-ta...)
    { time: "7:0:0", note: "F4", duration: "4n." },  // ko
    { time: "7:1:2", note: "E4", duration: "8n" },   // (slur)
    { time: "7:2:0", note: "E4", duration: "4n" },   // ta
    // (Rest dilewati)

    // ==========================================
    // --- BAIT 2 ---
    // "Hei tak disangke..."
    // (Melodi sama dengan Bait 1 Bar 1-4)
    // ==========================================

    // Bar 9
    { time: "8:0:0", note: "G4", duration: "2n" },
    { time: "8:2:2", note: "E4", duration: "8n" },
    { time: "8:3:0", note: "F4", duration: "8n" },
    { time: "8:3:2", note: "A4", duration: "8n" },

    // Bar 10
    { time: "9:0:0", note: "G4", duration: "2n" },
    { time: "9:2:2", note: "E4", duration: "8n" },
    { time: "9:3:0", note: "F4", duration: "8n" },
    { time: "9:3:2", note: "A4", duration: "8n" },

    // Bar 11
    { time: "10:0:0", note: "G4", duration: "8n" },
    { time: "10:0:2", note: "E4", duration: "8n" },
    { time: "10:1:0", note: "E4", duration: "8n" },
    { time: "10:1:2", note: "E4", duration: "8n" },
    { time: "10:2:0", note: "F4", duration: "8n" },
    { time: "10:2:2", note: "E4", duration: "8n" },
    { time: "10:3:0", note: "D4", duration: "8n" },
    { time: "10:3:2", note: "C4", duration: "8n" },

    // Bar 12
    { time: "11:0:0", note: "B3", duration: "4n." },
    { time: "11:1:2", note: "D4", duration: "8n" },
    { time: "11:2:0", note: "D4", duration: "4n" },

    // ==========================================
    // --- BAIT 2 Lanjutan ---
    // "Ramai pendudoknye... Pontianak..."
    // ==========================================

    // Bar 13: | 4 . . 4 2 3 4 | (Ra-mai pen-du-dok)
    { time: "12:0:0", note: "F4", duration: "4n." },  // Ra
    { time: "12:1:2", note: "F4", duration: "8n" },   // mai
    { time: "12:2:0", note: "D4", duration: "8n" },   // pen
    { time: "12:2:2", note: "E4", duration: "8n" },   // du
    { time: "12:3:0", note: "F4", duration: "4n" },   // dok

    // Bar 14: | 5 4 . 0 5 5 5 | (nye... Pon-ti-a)
    { time: "13:0:0", note: "G4", duration: "4n" },   // nye
    { time: "13:1:0", note: "F4", duration: "4n" },   // (slur)
    { time: "13:2:2", note: "G4", duration: "8n" },   // Pon
    { time: "13:3:0", note: "G4", duration: "8n" },   // ti
    { time: "13:3:2", note: "G4", duration: "8n" },   // a

    // Bar 15: | 5 5 . 4 3 2 . 1 | (nak na-me ko-te)
    // Interpretasi ritme agar pas lirik
    { time: "14:0:0", note: "G4", duration: "4n" },   // nak
    { time: "14:1:0", note: "G4", duration: "4n." },  // na
    { time: "14:2:2", note: "F4", duration: "8n" },   // me
    { time: "14:3:0", note: "E4", duration: "8n" },   // ko
    { time: "14:3:2", note: "D4", duration: "8n" },   // te

    // Bar 16: | 1 1 1 . 0 | (nye...)
    { time: "15:0:0", note: "C4", duration: "4n" },   // nye
    { time: "15:1:0", note: "C4", duration: "4n" },   // (ext)
    { time: "15:2:0", note: "C4", duration: "4n" },   // (ext)

    // ==========================================
    // --- CHORUS (REFF) ---
    // "Sungai Kapuas... punye cerite"
    // ==========================================

    // Bar 17: | 6 4 . 5 6 6 . 7 | (Su-ngai Ka-pu-as)
    { time: "16:0:0", note: "A4", duration: "4n" },   // Su
    { time: "16:1:0", note: "F4", duration: "4n." },  // ngai
    { time: "16:2:2", note: "G4", duration: "8n" },   // Ka
    { time: "16:3:0", note: "A4", duration: "4n" },   // pu
    { time: "17:0:0", note: "A4", duration: "8n" },   // as
    { time: "17:0:2", note: "B4", duration: "8n" },   // (slur)

    // Bar 18: | 1> 3 . 4 5 0 | (pu-nye ce-ri-te)
    { time: "17:1:0", note: "C5", duration: "4n" },   // pu
    { time: "17:2:0", note: "E4", duration: "4n." },  // nye
    { time: "17:3:2", note: "F4", duration: "8n" },   // ce
    { time: "18:0:0", note: "G4", duration: "4n" },   // ri
    { time: "18:1:0", note: "R", duration: "4n" },    // te (Gap) - wait, lyric 'te' is usually note 5

    // Bar 19: | 3 2 . 3 4 4 . 5 | (Bi-le ki-te mi-nom)
    { time: "18:2:0", note: "E4", duration: "4n" },   // Bi
    { time: "18:3:0", note: "D4", duration: "4n." },  // le
    { time: "19:0:2", note: "E4", duration: "8n" },   // ki
    { time: "19:1:0", note: "F4", duration: "4n" },   // te
    { time: "19:2:0", note: "F4", duration: "8n" },   // mi
    { time: "19:2:2", note: "G4", duration: "8n" },   // nom

    // Bar 20: | 3 4 . 5 5 0 | (a-ek nye...)
    { time: "19:3:0", note: "E4", duration: "4n" },   // a
    { time: "20:0:0", note: "F4", duration: "4n." },  // ek
    { time: "20:1:2", note: "G4", duration: "8n" },   // nye
    { time: "20:2:0", note: "G4", duration: "4n" },   // (hold)

    // ==========================================
    // --- CHORUS LANJUTAN ---
    // "Biar pon pergi..."
    // ==========================================

    // Bar 21 (Sama dengan Bar 17)
    { time: "21:0:0", note: "A4", duration: "4n" },   // Bi
    { time: "21:1:0", note: "F4", duration: "4n." },  // ar
    { time: "21:2:2", note: "G4", duration: "8n" },   // pon
    { time: "21:3:0", note: "A4", duration: "4n" },   // per
    { time: "22:0:0", note: "A4", duration: "8n" },   // gi
    { time: "22:0:2", note: "B4", duration: "8n" },   // (slur)

    // Bar 22 (Sama dengan Bar 18)
    { time: "22:1:0", note: "C5", duration: "4n" },   // ja
    { time: "22:2:0", note: "E4", duration: "4n." },  // oh
    { time: "22:3:2", note: "F4", duration: "8n" },   // ke
    { time: "23:0:0", note: "G4", duration: "4n" },   // ma
    // ne...

    // Bar 23: | 4 2 . 3 4 5 . 2 | (Sung-goh su-sah nak nge-lu)
    { time: "23:2:0", note: "F4", duration: "4n" },   // Sung
    { time: "23:3:0", note: "D4", duration: "4n." },  // goh
    { time: "24:0:2", note: "E4", duration: "8n" },   // su
    { time: "24:1:0", note: "F4", duration: "4n" },   // sah
    { time: "24:2:0", note: "G4", duration: "8n" },   // nak
    { time: "24:2:2", note: "D4", duration: "8n" },   // nge

    // Bar 24: | 3 3 . 2 1 . | (pa kan nye...)
    { time: "24:3:0", note: "E4", duration: "4n" },   // lu
    { time: "25:0:0", note: "E4", duration: "4n." },  // pa
    { time: "25:1:2", note: "D4", duration: "8n" },   // kan
    { time: "25:2:0", note: "C4", duration: "2n" },   // nye

    // ==========================================
    // --- ENDING ---
    // "Hei... Kapuas..."
    // ==========================================

    // Bar 25: | 5 . . . | (Hei...)
    { time: "26:0:0", note: "G4", duration: "1n" },

    // Bar 26: | 5 0 6 7 | (Ka pu)
    { time: "27:0:0", note: "G4", duration: "2n" },
    { time: "27:2:0", note: "A4", duration: "4n" },   // Ka
    { time: "27:3:0", note: "B4", duration: "4n" },   // pu

    // Bar 27: | 5 . . . | (as...)
    { time: "28:0:0", note: "G4", duration: "1n" },

    // Bar 29: | 4 . . . | (Hei...)
    { time: "30:0:0", note: "F4", duration: "1n" },

    // Bar 30: | 4 0 3 2 | (Ka pu)
    { time: "31:0:0", note: "F4", duration: "2n" },
    { time: "31:2:0", note: "E4", duration: "4n" },   // Ka
    { time: "31:3:0", note: "D4", duration: "4n" },   // pu

    // Bar 31: | 1 . . . | (as...)
    { time: "32:0:0", note: "C4", duration: "1n" },

    // Final Note
    { time: "33:0:0", note: "C4", duration: "1n" }
  ]
};