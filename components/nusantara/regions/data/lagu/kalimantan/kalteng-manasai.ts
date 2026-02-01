// Path: components/nusantara/regions/data/lagu/kalteng-manasai.ts

export const manasai = {
  id: "kalteng-manasai",
  judul: "Manasai",
  daerah: "Kalimantan Tengah",
  bpm: 120,
  timeSignature: "4/4",
  melody: [
    // ===================================
    // --- INTRO / AWAL ---
    // "Pukul gantang..."
    // ===================================

    // Bar 1: | 0 0 0 5< | (Pukul/Bakas) - 5< = G3
    // Masuk di beat ke-4
    { time: "0:3:0", note: "G3", duration: "4n" },   // Pu

    // Bar 2: | 1 1 2 . | (gan-tang / tun-tang)
    { time: "1:0:0", note: "C4", duration: "4n" },   // gan
    { time: "1:1:0", note: "C4", duration: "4n" },   // tang
    { time: "1:2:0", note: "D4", duration: "2n" },   // ga...

    // Bar 3: | . 1 7< 1 | (ga-ran-tung / ta-be-la)
    // (Beat 1 hold dari D4 sebelumnya)
    { time: "2:1:0", note: "C4", duration: "4n" },   // ran
    { time: "2:2:0", note: "B3", duration: "4n" },   // tung
    { time: "2:3:0", note: "C4", duration: "4n" },   // Ha

    // Bar 4: | . 0 5< | (Ha / Ke)
    // (Beat 1 hold C4)
    // Beat 2 Rest
    { time: "3:3:0", note: "G3", duration: "4n" },   // Ha

    // ===================================
    // --- BAIT 1 ---
    // "Hayak dengan..."
    // ===================================

    // Bar 5: | 3 3 4 . | (yak de-ngan / leh i-tah)
    { time: "4:0:0", note: "E4", duration: "4n" },   // yak
    { time: "4:1:0", note: "E4", duration: "4n" },   // de
    { time: "4:2:0", note: "F4", duration: "2n" },   // ngan...

    // Bar 6: | . 3 2 3 | (kang ka-nung / ma-ha-ga)
    { time: "5:1:0", note: "E4", duration: "4n" },   // kang
    { time: "5:2:0", note: "D4", duration: "4n" },   // ka
    { time: "5:3:0", note: "E4", duration: "4n" },   // nung

    // Bar 7: | . 0 5 | (Sam-bil / Ke-se)
    // (Beat 1 hold)
    // Beat 2 Rest
    { time: "6:2:0", note: "G4", duration: "2n" },   // Sam

    // Bar 8: | 2 2 2 . | (bil gan-dang / ni-an-da)
    { time: "7:0:0", note: "D4", duration: "4n" },   // bil
    { time: "7:1:0", note: "D4", duration: "4n" },   // gan
    { time: "7:2:0", note: "D4", duration: "2n" },   // dang...

    // Bar 9: | . 2 3 . | (gan-tau / da-e)
    { time: "8:1:0", note: "D4", duration: "4n" },   // gan
    { time: "8:2:0", note: "E4", duration: "2n" },   // tau...

    // Bar 10: | 4 . 0 5 | (u-rah / Mi-ar)
    { time: "9:0:0", note: "F4", duration: "2n" },   // u
    // Rest
    { time: "9:3:0", note: "G4", duration: "4n" },   // rah (Mi)

    // Bar 11: | 2 2 2 . | (Mi-ar mun / A-yun ta)
    { time: "10:0:0", note: "D4", duration: "4n" },  // Mi
    { time: "10:1:0", note: "D4", duration: "4n" },  // ar
    { time: "10:2:0", note: "D4", duration: "2n" },  // mun...

    // Bar 12: | . 1 2 . | (dur dan / tu hiang)
    { time: "11:1:0", note: "C4", duration: "4n" },  // dur
    { time: "11:2:0", note: "D4", duration: "2n" },  // dan...

    // Bar 13: | 3 . 0 5< | (ma-ju / i-ta ... Ba)
    { time: "12:0:0", note: "E4", duration: "2n" },  // ma
    // Rest
    { time: "12:3:0", note: "G3", duration: "4n" },  // ju (Ba)

    // ===================================
    // --- BAIT 2 / CHORUS START ---
    // "Baha lai dan..."
    // ===================================

    // Bar 14: | 1 1 2 . | (ha-lai dan / kul gan-dang)
    { time: "13:0:0", note: "C4", duration: "4n" },  // ha
    { time: "13:1:0", note: "C4", duration: "4n" },  // lai
    { time: "13:2:0", note: "D4", duration: "2n" },  // dan...

    // Bar 15: | . 1 7< 1 | (sa len-dang / ga-ran-tung)
    { time: "14:1:0", note: "C4", duration: "4n" },  // sa
    { time: "14:2:0", note: "B3", duration: "4n" },  // len
    { time: "14:3:0", note: "C4", duration: "4n" },  // dang

    // Bar 16: | . 0 5< | (U / Ha)
    // Beat 1 Hold
    // Beat 2 Rest
    { time: "15:3:0", note: "G3", duration: "4n" },  // U

    // Bar 17: | 3 3 4 . | (me-neng in / yak de-ngan)
    { time: "16:0:0", note: "E4", duration: "4n" },  // me
    { time: "16:1:0", note: "E4", duration: "4n" },  // neng
    { time: "16:2:0", note: "F4", duration: "2n" },  // in...

    // Bar 18: | . 3 2 . | (tu-ka / kang-ka)
    { time: "17:1:0", note: "E4", duration: "4n" },  // tu
    { time: "17:2:0", note: "D4", duration: "2n" },  // ka...

    // Bar 19: | 3 . 0 5 | (hang / nung ... Nga)
    { time: "18:0:0", note: "E4", duration: "2n" },  // hang
    // Rest
    { time: "18:3:0", note: "G4", duration: "4n" },  // Nga

    // Bar 20: | 2 2 2 . | (li ling sang / ngat i tah)
    { time: "19:0:0", note: "D4", duration: "4n" },  // li
    { time: "19:1:0", note: "D4", duration: "4n" },  // ling
    { time: "19:2:0", note: "D4", duration: "2n" },  // sang...

    // Bar 21: | . 2 3 . | (kai lu / tau mi)
    { time: "20:1:0", note: "D4", duration: "4n" },  // kai
    { time: "20:2:0", note: "E4", duration: "2n" },  // lu...

    // Bar 22: | 4 . 0 5 | (nuk... Je)
    { time: "21:0:0", note: "F4", duration: "2n" },  // nuk
    // Rest
    { time: "21:3:0", note: "G4", duration: "4n" },  // Je

    // Bar 23: | 2 2 2 . | (im pen deng / tus i tah)
    { time: "22:0:0", note: "D4", duration: "4n" },  // im
    { time: "22:1:0", note: "D4", duration: "4n" },  // pen
    { time: "22:2:0", note: "D4", duration: "2n" },  // deng...

    // Bar 24: | . 1 7< 1 | (hong ben-tuk / je gau-hat)
    { time: "23:1:0", note: "C4", duration: "4n" },  // hong
    { time: "23:2:0", note: "B3", duration: "4n" },  // ben
    { time: "23:3:0", note: "C4", duration: "4n" },  // tuk

    // ===================================
    // --- REFRAIN / ENDING ---
    // "Ayu manari manari..."
    // ===================================

    // Bar 25: | . 0 3 | (A)
    // Beat 1 Hold
    // Beat 2 Rest
    { time: "24:3:0", note: "E4", duration: "4n" },  // A

    // Bar 26: | 4 4 4 . | (yu ma-na)
    { time: "25:0:0", note: "F4", duration: "4n" },  // yu
    { time: "25:1:0", note: "F4", duration: "4n" },  // ma
    { time: "25:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 27: | 4 4 4 . | (ri ma-na)
    { time: "26:0:0", note: "F4", duration: "4n" },  // ri
    { time: "26:1:0", note: "F4", duration: "4n" },  // ma
    { time: "26:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 28: | 3 3 3 . | (sai ma-na)
    { time: "27:0:0", note: "E4", duration: "4n" },  // sai
    { time: "27:1:0", note: "E4", duration: "4n" },  // ma
    { time: "27:2:0", note: "E4", duration: "2n" },  // na...

    // Bar 29: | 3 3 4 . | (ri ma-na)
    { time: "28:0:0", note: "E4", duration: "4n" },  // ri
    { time: "28:1:0", note: "E4", duration: "4n" },  // ma
    { time: "28:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 30: | 2 1 2 3 | (sai e la-a)
    { time: "29:0:0", note: "D4", duration: "4n" },  // sai
    { time: "29:1:0", note: "C4", duration: "4n" },  // e
    { time: "29:2:0", note: "D4", duration: "4n" },  // la
    { time: "29:3:0", note: "E4", duration: "4n" },  // a

    // Bar 31: | 4 2 7< 1 | (tu je me-lai)
    { time: "30:0:0", note: "F4", duration: "4n" },  // tu
    { time: "30:1:0", note: "D4", duration: "4n" },  // je
    { time: "30:2:0", note: "B3", duration: "4n" },  // me
    { time: "30:3:0", note: "C4", duration: "4n" },  // lai

    // Bar 32: | (1) 2 3 0 3 | (A)
    // Note 1 dari bar 31 di-tie ke awal bar 32 (dilewati)
    { time: "31:1:0", note: "D4", duration: "4n" },  // (transition)
    { time: "31:2:0", note: "E4", duration: "4n" },  // (transition)
    // Rest
    { time: "31:3:0", note: "E4", duration: "4n" },  // A

    // Bar 33: | 4 4 4 . | (yu ma-na)
    { time: "32:0:0", note: "F4", duration: "4n" },  // yu
    { time: "32:1:0", note: "F4", duration: "4n" },  // ma
    { time: "32:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 34: | 4 4 4 . | (ri ma-na)
    { time: "33:0:0", note: "F4", duration: "4n" },  // ri
    { time: "33:1:0", note: "F4", duration: "4n" },  // ma
    { time: "33:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 35: | 3 3 3 . | (sai ma-na)
    { time: "34:0:0", note: "E4", duration: "4n" },  // sai
    { time: "34:1:0", note: "E4", duration: "4n" },  // ma
    { time: "34:2:0", note: "E4", duration: "2n" },  // na...

    // Bar 36: | 3 3 4 . | (ri ma-na)
    { time: "35:0:0", note: "E4", duration: "4n" },  // ri
    { time: "35:1:0", note: "E4", duration: "4n" },  // ma
    { time: "35:2:0", note: "F4", duration: "2n" },  // na...

    // Bar 37: | 2 1 2 3 | (sai e la-a)
    { time: "36:0:0", note: "D4", duration: "4n" },  // sai
    { time: "36:1:0", note: "C4", duration: "4n" },  // e
    { time: "36:2:0", note: "D4", duration: "4n" },  // la
    { time: "36:3:0", note: "E4", duration: "4n" },  // a

    // Bar 38: | 4 2 7< 1 | (tu je me-lai)
    { time: "37:0:0", note: "F4", duration: "4n" },  // tu
    { time: "37:1:0", note: "D4", duration: "4n" },  // je
    { time: "37:2:0", note: "B3", duration: "4n" },  // me
    { time: "37:3:0", note: "C4", duration: "4n" },  // lai

    // Bar 39: | 1 . . 0 | (lai...)
    { time: "38:0:0", note: "C4", duration: "2n." }  // lai (Finish)
  ]
};