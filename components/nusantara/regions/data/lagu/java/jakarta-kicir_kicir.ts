// Path: components/nusantara/regions/data/lagu/jakarta-kicir_kicir.ts

export const kicirKicir = {
  id: "jakarta-kicir-kicir",
  judul: "Kicir Kicir",
  daerah: "Jakarta",
  bpm: 100,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 ---
    // "Kicir kicir... ini lagunya"
    // ==========================================

    // Bar 1: | 0 0 0 3 3 5 | (Ki-cir ki-cir)
    // 3 ketuk pertama hening (Gap)
    { time: "0:2:0", note: "E4", duration: "8n" },   // Ki
    { time: "0:2:2", note: "E4", duration: "8n" },   // cir
    { time: "0:3:0", note: "G4", duration: "4n" },   // ki
    // (cir ada di bar 2)

    // Bar 2: | 3 . 2 2 2 4 3 | (cir... i-ni la-gu)
    { time: "1:0:0", note: "E4", duration: "4n." },  // cir...
    { time: "1:1:2", note: "D4", duration: "8n" },   // i
    { time: "1:2:0", note: "D4", duration: "8n" },   // ni
    { time: "1:2:2", note: "D4", duration: "8n" },   // la
    { time: "1:3:0", note: "F4", duration: "8n" },   // gu
    { time: "1:3:2", note: "E4", duration: "8n" },   // (slur)

    // Bar 3: | 2 . 0 3 3 3 5 | (nya... la-gu la)
    { time: "2:0:0", note: "D4", duration: "2n" },   // nya...
    // (Jeda 1 ketuk dilewati)
    { time: "2:3:0", note: "E4", duration: "8n" },   // la
    { time: "2:3:2", note: "E4", duration: "8n" },   // gu
    // (la ada di bar 4)

    // Bar 4: | 3 . 2 1 1 . | (ma... ya tu-an)
    { time: "3:0:0", note: "E4", duration: "4n." },  // la/ma...
    { time: "3:1:2", note: "D4", duration: "8n" },   // ya
    { time: "3:2:0", note: "C4", duration: "4n" },   // tu
    { time: "3:3:0", note: "C4", duration: "4n" },   // an

    // ==========================================
    // --- BAIT 2 ---
    // "Dari Jakarta... Saya menyanyi..."
    // ==========================================

    // Bar 5: | . 1 1 2 6 | (da-ri Ja-kar-ta) - 6 disini A3 (Rendah)
    // (Jeda 1 ketuk dilewati)
    { time: "4:1:0", note: "C4", duration: "8n" },   // da
    { time: "4:1:2", note: "C4", duration: "8n" },   // ri
    { time: "4:2:0", note: "D4", duration: "4n" },   // Ja
    { time: "4:3:0", note: "A3", duration: "4n" },   // kar (ta di bar 6)

    // Bar 6: | 1 . 0 6 6 1 2 | (ta... Sa-ya me-nya)
    { time: "5:0:0", note: "C4", duration: "4n." },  // ta...
    // (Jeda 1/2 ketuk)
    { time: "5:2:0", note: "A3", duration: "8n" },   // Sa
    { time: "5:2:2", note: "A3", duration: "8n" },   // ya
    { time: "5:3:0", note: "C4", duration: "8n" },   // me
    { time: "5:3:2", note: "D4", duration: "8n" },   // nya

    // Bar 7: | 3 . 2 1 1 | (nyi... ya tu-an)
    { time: "6:0:0", note: "E4", duration: "4n." },  // nyi...
    { time: "6:1:2", note: "D4", duration: "8n" },   // ya
    { time: "6:2:0", note: "C4", duration: "4n" },   // tu
    { time: "6:3:0", note: "C4", duration: "4n" },   // an

    // Bar 8: | . 6 6 1 7 6 | (sung-guh se-nga-ja) - 7< (B3)
    // (Jeda 1 ketuk)
    { time: "7:1:0", note: "A3", duration: "8n" },   // sung
    { time: "7:1:2", note: "A3", duration: "8n" },   // guh
    { time: "7:2:0", note: "C4", duration: "8n" },   // se
    { time: "7:2:2", note: "B3", duration: "8n" },   // nga
    { time: "7:3:0", note: "A3", duration: "4n" },   // ja

    // ==========================================
    // --- BAIT 3 ---
    // "Untuk menghibur... hati nan duka"
    // ==========================================

    // Bar 9: | 3 . 1 6 6 | (Un-tuk meng-hi)
    { time: "8:0:0", note: "E4", duration: "4n." },  // Un
    { time: "8:1:2", note: "C4", duration: "8n" },   // tuk
    { time: "8:2:0", note: "A3", duration: "4n" },   // meng
    { time: "8:3:0", note: "A3", duration: "4n" },   // hi

    // Bar 10: | . 6 6 1 7 6 | (bur... ba-dan-lah se)
    // (Jeda 1 ketuk)
    { time: "9:1:0", note: "A3", duration: "8n" },   // ba
    { time: "9:1:2", note: "A3", duration: "8n" },   // dan
    { time: "9:2:0", note: "C4", duration: "8n" },   // lah
    { time: "9:2:2", note: "B3", duration: "8n" },   // se
    { time: "9:3:0", note: "A3", duration: "4n" },   // hat

    // Bar 11: | 3 . 1 1 1 | (hat... pas-ti meng-ja)
    { time: "10:0:0", note: "E4", duration: "4n." }, // hat...
    { time: "10:1:2", note: "C4", duration: "8n" },  // pas
    { time: "10:2:0", note: "C4", duration: "4n" },  // ti
    { time: "10:3:0", note: "C4", duration: "4n" },  // meng

    // Bar 12: | 5 5 4/ 6 5 | (ja-di ber-gu-na) - 4/ adalah F# (Fis)
    { time: "11:0:0", note: "G4", duration: "4n" },  // ja
    { time: "11:1:0", note: "G4", duration: "4n" },  // di
    { time: "11:2:0", note: "F#4", duration: "4n" }, // ber
    { time: "11:3:0", note: "A4", duration: "8n" },  // gu
    { time: "11:3:2", note: "G4", duration: "8n" },  // na

    // Bar 13: | 5 . . 0 |
    { time: "12:0:0", note: "G4", duration: "2n." }  // ...
  ]
};