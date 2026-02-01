// Path: components/nusantara/regions/data/lagu/jatim-rek_ayo_rek.ts

export const rekAyoRek = {
  id: "jatim-rek-ayo-rek",
  judul: "Rek Ayo Rek",
  daerah: "Jawa Timur",
  bpm: 120,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 ---
    // "Rek ayo rek... mlaku mlaku nang Tunjungan"
    // ==========================================

    // Bar 1: | 3 . 2 1 3 | (Rek a-yo rek)
    { time: "0:0:0", note: "E4", duration: "4n." },   // Rek...
    { time: "0:1:2", note: "D4", duration: "8n" },    // a
    { time: "0:2:0", note: "C4", duration: "4n" },    // yo
    // Note E4 terakhir di-tie ke bar berikutnya (Total 1 ketuk + 1 ketuk bar 2)
    { time: "0:3:0", note: "E4", duration: "2n" },    // rek... (Tie)

    // Bar 2: | (3) 5 5 5 | (mla-ku mla-ku)
    // Beat 1 dilewati karena Tie dari bar 1
    { time: "1:1:0", note: "G4", duration: "4n" },    // mla
    { time: "1:2:0", note: "G4", duration: "4n" },    // ku
    { time: "1:3:0", note: "G4", duration: "4n" },    // mla

    // Bar 3: | 6 1> 3 1> | (ku nang Tun-ju-)
    { time: "2:0:0", note: "A4", duration: "4n" },    // ku
    { time: "2:1:0", note: "C5", duration: "4n" },    // nang
    { time: "2:2:0", note: "E4", duration: "4n" },    // Tun
    { time: "2:3:0", note: "C5", duration: "4n" },    // ju

    // Bar 4: | 2 . . 0 | (-ngan...)
    { time: "3:0:0", note: "D4", duration: "2n." },   // ngan
    // Beat 4 Rest

    // ==========================================
    // --- BAIT 2 ---
    // "Rek ayo rek... rame rame bebarengan"
    // ==========================================

    // Bar 5: | 2 . 1 7< 2 | (Rek a-yo rek)
    { time: "4:0:0", note: "D4", duration: "4n." },   // Rek...
    { time: "4:1:2", note: "C4", duration: "8n" },    // a
    { time: "4:2:0", note: "B3", duration: "4n" },    // yo
    // Note D4 terakhir di-tie ke bar berikutnya
    { time: "4:3:0", note: "D4", duration: "2n" },    // rek... (Tie)

    // Bar 6: | (2) 5 5 5 | (ra-me ra-me)
    // Beat 1 dilewati (Tie)
    { time: "5:1:0", note: "G4", duration: "4n" },    // ra
    { time: "5:2:0", note: "G4", duration: "4n" },    // me
    { time: "5:3:0", note: "G4", duration: "4n" },    // ra

    // Bar 7: | 6 1> 2> 6 | (me be-ba-reng-)
    { time: "6:0:0", note: "A4", duration: "4n" },    // me
    { time: "6:1:0", note: "C5", duration: "4n" },    // be
    { time: "6:2:0", note: "D5", duration: "4n" },    // ba
    { time: "6:3:0", note: "A4", duration: "4n" },    // reng

    // Bar 8: | 1> . . 0 | (-an...)
    { time: "7:0:0", note: "C5", duration: "2n." },   // an
    // Beat 4 Rest

    // ==========================================
    // --- BAIT 3 ---
    // "Cak ayo cak... sopo gelem melu aku"
    // ==========================================

    // Bar 9: | 3 . 5 6 3 | (Cak a-yo cak)
    { time: "8:0:0", note: "E4", duration: "4n." },   // Cak...
    { time: "8:1:2", note: "G4", duration: "8n" },    // a
    { time: "8:2:0", note: "A4", duration: "4n" },    // yo
    // Note E4 terakhir di-tie ke bar berikutnya
    { time: "8:3:0", note: "E4", duration: "2n" },    // cak... (Tie)

    // Bar 10: | (3) 1> 1> 5 | (so-po ge-lem)
    // Beat 1 dilewati (Tie)
    { time: "9:1:0", note: "C5", duration: "4n" },    // so
    { time: "9:2:0", note: "C5", duration: "4n" },    // po
    { time: "9:3:0", note: "G4", duration: "4n" },    // ge

    // Bar 11: | 6 1> 3 1> | (lem me-lu a-)
    { time: "10:0:0", note: "A4", duration: "4n" },   // lem
    { time: "10:1:0", note: "C5", duration: "4n" },   // me
    { time: "10:2:0", note: "E4", duration: "4n" },   // lu
    { time: "10:3:0", note: "C5", duration: "4n" },   // a

    // Bar 12: | 2 . . 0 | (-ku...)
    { time: "11:0:0", note: "D4", duration: "2n." },  // ku
    // Beat 4 Rest

    // ==========================================
    // --- BAIT 4 ---
    // "Cak ayo cak... delek kenal ancah ayu"
    // ==========================================

    // Bar 13: | 2 . 1 7< 2 | (Cak a-yo cak)
    { time: "12:0:0", note: "D4", duration: "4n." },  // Cak...
    { time: "12:1:2", note: "C4", duration: "8n" },   // a
    { time: "12:2:0", note: "B3", duration: "4n" },   // yo
    // Note D4 terakhir di-tie ke bar berikutnya
    { time: "12:3:0", note: "D4", duration: "2n" },   // cak... (Tie)

    // Bar 14: | (2) 5 5 5 | (de-lek ke-nal)
    // Beat 1 dilewati (Tie)
    { time: "13:1:0", note: "G4", duration: "4n" },   // de
    { time: "13:2:0", note: "G4", duration: "4n" },   // lek
    { time: "13:3:0", note: "G4", duration: "4n" },   // ke

    // Bar 15: | 6 1> 2> 6 | (nal an-cah a-)
    { time: "14:0:0", note: "A4", duration: "4n" },   // nal
    { time: "14:1:0", note: "C5", duration: "4n" },   // an
    { time: "14:2:0", note: "D5", duration: "4n" },   // cah
    { time: "14:3:0", note: "A4", duration: "4n" },   // a

    // Bar 16: | 1> . . 0 | (-yu...)
    { time: "15:0:0", note: "C5", duration: "2n." },  // yu
    // Beat 4 Rest

    // ==========================================
    // --- CHORUS (REFF) BAGIAN 1 ---
    // "Ngalor ngidul... liwat toko..."
    // ==========================================

    // Bar 17: | 0 1> 3 5 | (Nga-lor ngi-dul)
    { time: "16:1:0", note: "C5", duration: "4n" },   // Nga
    { time: "16:2:0", note: "E4", duration: "4n" },   // lor
    { time: "16:3:0", note: "G4", duration: "4n" },   // ngi

    // Bar 18: | 6 . 6 6 6 | (dul... li-wat to-)
    { time: "17:0:0", note: "A4", duration: "4n." },  // dul...
    { time: "17:1:2", note: "A4", duration: "8n" },   // li
    { time: "17:2:0", note: "A4", duration: "4n" },   // wat
    { time: "17:3:0", note: "A4", duration: "4n" },   // to

    // Bar 19: | 6 5 6 3 | (ko ngum-bah mo-)
    { time: "18:0:0", note: "A4", duration: "4n" },   // ko
    { time: "18:1:0", note: "G4", duration: "4n" },   // ngum
    { time: "18:2:0", note: "A4", duration: "4n" },   // bah
    { time: "18:3:0", note: "E4", duration: "4n" },   // mo

    // Bar 20: | 5 . . 0 | (to...)
    { time: "19:0:0", note: "G4", duration: "2n." },  // to
    // Beat 4 Rest

    // ==========================================
    // --- CHORUS (REFF) BAGIAN 2 ---
    // "Masi o mung... nyenggal nyenggol..."
    // ==========================================

    // Bar 21: | 0 1> 3 5 | (Ma-si o mung)
    { time: "20:1:0", note: "C5", duration: "4n" },   // Ma
    { time: "20:2:0", note: "E4", duration: "4n" },   // si
    { time: "20:3:0", note: "G4", duration: "4n" },   // o (mung)

    // Bar 22: | 6 . 6 6 6 | (mung... nyeng-gal nyeng-)
    { time: "21:0:0", note: "A4", duration: "4n." },  // mung...
    { time: "21:1:2", note: "A4", duration: "8n" },   // nyeng
    { time: "21:2:0", note: "A4", duration: "4n" },   // gal
    { time: "21:3:0", note: "A4", duration: "4n" },   // nyeng

    // Bar 23: | 6 6 3 5 | (gol a-ti le-)
    { time: "22:0:0", note: "A4", duration: "4n" },   // gol
    { time: "22:1:0", note: "A4", duration: "4n" },   // a
    { time: "22:2:0", note: "E4", duration: "4n" },   // ti
    { time: "22:3:0", note: "G4", duration: "4n" },   // le

    // Bar 24: | 2 . . 0 | (go...)
    { time: "23:0:0", note: "D4", duration: "2n." },  // go
    // Beat 4 Rest

    // ==========================================
    // --- CHORUS (REFF) BAGIAN 3 ---
    // "Sopo ngerti... nasib awak..."
    // ==========================================

    // Bar 25: | 0 2 1 2 | (So-po nger-ti)
    { time: "24:1:0", note: "D4", duration: "4n" },   // So
    { time: "24:2:0", note: "C4", duration: "4n" },   // po
    { time: "24:3:0", note: "D4", duration: "4n" },   // nger

    // Bar 26: | 3 . 3 3 3 | (ti... na-sib a-)
    { time: "25:0:0", note: "E4", duration: "4n." },  // ti...
    { time: "25:1:2", note: "E4", duration: "8n" },   // na
    { time: "25:2:0", note: "E4", duration: "4n" },   // sib
    { time: "25:3:0", note: "E4", duration: "4n" },   // a

    // Bar 27: | 3 2 1 2 | (wak la-gi mu-)
    { time: "26:0:0", note: "E4", duration: "4n" },   // wak
    { time: "26:1:0", note: "D4", duration: "4n" },   // la
    { time: "26:2:0", note: "C4", duration: "4n" },   // gi
    { time: "26:3:0", note: "D4", duration: "4n" },   // mu

    // Bar 28: | 6< . . 0 | (jur...) -> 6< = A3
    { time: "27:0:0", note: "A3", duration: "2n." },  // jur
    // Beat 4 Rest

    // ==========================================
    // --- CHORUS (REFF) BAGIAN 4 (ENDING) ---
    // "Kenal anak... e sing dodol..."
    // ==========================================

    // Bar 29: | 0 6< 1 2 | (Ke-nal a-nak)
    { time: "28:1:0", note: "A3", duration: "4n" },   // Ke
    { time: "28:2:0", note: "C4", duration: "4n" },   // nal
    { time: "28:3:0", note: "D4", duration: "4n" },   // a

    // Bar 30: | 3 . 3 3 3 | (nak... e sing do-)
    { time: "29:0:0", note: "E4", duration: "4n." },  // nak...
    { time: "29:1:2", note: "E4", duration: "8n" },   // e
    { time: "29:2:0", note: "E4", duration: "4n" },   // sing
    { time: "29:3:0", note: "E4", duration: "4n" },   // do

    // Bar 31: | 2 1 3 2 | (dol ru-jak ci-)
    { time: "30:0:0", note: "D4", duration: "4n" },   // dol
    { time: "30:1:0", note: "C4", duration: "4n" },   // ru
    { time: "30:2:0", note: "E4", duration: "4n" },   // jak
    { time: "30:3:0", note: "D4", duration: "4n" },   // ci

    // Bar 32: | 1 . . 0 | (ngur...)
    { time: "31:0:0", note: "C4", duration: "1n" }    // ngur (Selesai)
  ]
};