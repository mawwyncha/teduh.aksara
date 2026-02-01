// Path: components/nusantara/regions/data/lagu/lampung-pang_lipang_dang.ts

export const pangLipangDang = {
  id: "lampung-pang-lipang-dang",
  judul: "Pang Lipang Dang",
  daerah: "Lampung",
  bpm: 120,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 ---
    // "Pang lipang... li pang dang"
    // ==========================================

    // Bar 1: | 3 3 4 . 3 2 |
    { time: "0:0:0", note: "E4", duration: "4n" },   // Pang
    { time: "0:1:0", note: "E4", duration: "8n" },   // li
    { time: "0:1:2", note: "F4", duration: "4n." },  // pang...
    { time: "0:3:0", note: "E4", duration: "8n" },   // li
    { time: "0:3:2", note: "D4", duration: "8n" },   // pang

    // Bar 2: | 1 . . 3 4 |
    { time: "1:0:0", note: "C4", duration: "2n." },  // dang...
    { time: "1:3:0", note: "E4", duration: "8n" },   // pang
    { time: "1:3:2", note: "F4", duration: "8n" },   // li

    // Bar 3: | 5 5 6 5 |
    { time: "2:0:0", note: "G4", duration: "4n" },   // pang
    { time: "2:1:0", note: "G4", duration: "8n" },   // dang
    { time: "2:1:2", note: "A4", duration: "8n" },   // ki
    { time: "2:2:0", note: "G4", duration: "2n" },   // li...

    // Bar 4: | 3 . . 0 |
    { time: "3:0:0", note: "E4", duration: "2n." },  // dang...
    // (Jeda 1 ketuk dilewati)

    // ==========================================
    // --- BAIT 2 ---
    // "Pang lipang... li pang dang" (Variasi)
    // ==========================================

    // Bar 5: | 5 5 5 . 4 3 2 |
    { time: "4:0:0", note: "G4", duration: "4n" },   // Pang
    { time: "4:1:0", note: "G4", duration: "8n" },   // li
    { time: "4:1:2", note: "G4", duration: "4n." },  // pang...
    { time: "4:3:0", note: "F4", duration: "8n" },   // li
    { time: "4:3:2", note: "E4", duration: "8n" },   // pang

    // Bar 6: | 2 . . 1 2 |
    { time: "5:0:0", note: "D4", duration: "2n." },  // dang...
    { time: "5:3:0", note: "C4", duration: "8n" },   // sa
    { time: "5:3:2", note: "D4", duration: "8n" },   // kik

    // Bar 7: | 3 1 2 7< 1 | (7< is B3)
    { time: "6:0:0", note: "E4", duration: "4n" },   // li
    { time: "6:1:0", note: "C4", duration: "8n" },   // pang
    { time: "6:1:2", note: "D4", duration: "8n" },   // jak
    { time: "6:2:0", note: "B3", duration: "4n" },   // kun
    { time: "6:3:0", note: "C4", duration: "4n" },   // dang

    // Bar 8: | 1 . . 0 |
    { time: "7:0:0", note: "C4", duration: "2n." },  // (hold)
    // (Jeda dilewati)

    // ==========================================
    // --- BAIT 3 ---
    // "Yu... yu pa yu..."
    // ==========================================

    // Bar 9: | 3 . 3 2 1 |
    { time: "8:0:0", note: "E4", duration: "2n" },   // Yu...
    { time: "8:2:0", note: "E4", duration: "4n" },   // yu
    { time: "8:3:0", note: "D4", duration: "8n" },   // pa
    { time: "8:3:2", note: "C4", duration: "8n" },   // yu

    // Bar 10: | 1 . . 3 4 |
    { time: "9:0:0", note: "C4", duration: "2n." },  // (hold)
    { time: "9:3:0", note: "E4", duration: "8n" },   // yu
    { time: "9:3:2", note: "F4", duration: "8n" },   // pa

    // Bar 11: | 5 5 6 5 |
    { time: "10:0:0", note: "G4", duration: "4n" },  // yu
    { time: "10:1:0", note: "G4", duration: "8n" },  // ku
    { time: "10:1:2", note: "A4", duration: "8n" },  // te
    { time: "10:2:0", note: "G4", duration: "2n" },  // khi...

    // Bar 12: | 3 . . 0 |
    { time: "11:0:0", note: "E4", duration: "2n." }, // ma...
    // (Jeda dilewati)

    // Bar 13: | 5 . 4 3 2 |
    { time: "12:0:0", note: "G4", duration: "2n" },  // Yu...
    { time: "12:2:0", note: "F4", duration: "4n" },  // yu
    { time: "12:3:0", note: "E4", duration: "8n" },  // pa
    { time: "12:3:2", note: "D4", duration: "8n" },  // yu

    // Bar 14: | 2 . . 1 2 |
    { time: "13:0:0", note: "D4", duration: "2n." }, // (hold)
    { time: "13:3:0", note: "C4", duration: "8n" },  // yu
    { time: "13:3:2", note: "D4", duration: "8n" },  // pa

    // Bar 15: | 3 1 2 7< |
    { time: "14:0:0", note: "E4", duration: "4n" },  // yu
    { time: "14:1:0", note: "C4", duration: "8n" },  // ka
    { time: "14:1:2", note: "D4", duration: "8n" },  // ya
    { time: "14:2:0", note: "B3", duration: "2n" },  // di...

    // Bar 16: | 1 . . 0 |
    { time: "15:0:0", note: "C4", duration: "2n." }, // a...
    // (Jeda dilewati)

    // ==========================================
    // --- CHORUS / BAGIAN TINGGI ---
    // "A pi... peng ga li la was"
    // ==========================================

    // Bar 17: (2 ketuk hening) A pi
    { time: "16:2:0", note: "G4", duration: "8n" },  // A
    { time: "16:2:2", note: "G4", duration: "8n" },  // pi

    // Bar 18: | i 7 6 7 i |
    { time: "16:3:0", note: "C5", duration: "4n" },  // peng
    { time: "17:0:0", note: "B4", duration: "4n" },  // ga
    { time: "17:1:0", note: "A4", duration: "8n" },  // li
    { time: "17:1:2", note: "B4", duration: "8n" },  // la
    { time: "17:2:0", note: "C5", duration: "4n" },  // was

    // Bar 19: | . 2> 1> | (Pa kai)
    { time: "17:3:0", note: "C5", duration: "4n" },  // (tie)
    { time: "18:0:0", note: "D5", duration: "4n" },  // pa
    { time: "18:1:0", note: "C5", duration: "2n" },  // kai...

    // Bar 20: | 7 6 7 6 5 | (tem bi lang be si)
    { time: "18:3:0", note: "B4", duration: "4n" },  // tem
    { time: "19:0:0", note: "A4", duration: "8n" },  // bi
    { time: "19:0:2", note: "B4", duration: "8n" },  // lang
    { time: "19:1:0", note: "A4", duration: "4n" },  // be
    { time: "19:2:0", note: "G4", duration: "4n" },  // si

    // Bar 21: (2 ketuk hening) A pi
    { time: "20:1:0", note: "G4", duration: "8n" },  // A
    { time: "20:1:2", note: "G4", duration: "8n" },  // pi

    // Bar 22: | i 7 6 7 i |
    { time: "20:2:0", note: "C5", duration: "4n" },  // peng
    { time: "20:3:0", note: "B4", duration: "4n" },  // ga
    { time: "21:0:0", note: "A4", duration: "8n" },  // li
    { time: "21:0:2", note: "B4", duration: "8n" },  // la
    { time: "21:1:0", note: "C5", duration: "4n" },  // was

    // Bar 23: | . 2> 1> | (Pa kai)
    { time: "21:2:0", note: "C5", duration: "4n" },  // (tie)
    { time: "21:3:0", note: "D5", duration: "4n" },  // pa
    { time: "22:0:0", note: "C5", duration: "2n" },  // kai...

    // Bar 24: | 7 6 7 6 5 |
    { time: "22:2:0", note: "B4", duration: "4n" },  // tem
    { time: "22:3:0", note: "A4", duration: "8n" },  // bi
    { time: "22:3:2", note: "B4", duration: "8n" },  // lang
    { time: "23:0:0", note: "A4", duration: "4n" },  // be
    { time: "23:1:0", note: "G4", duration: "4n" },  // si

    // ==========================================
    // --- ENDING ---
    // "Me kha nai a was a was"
    // ==========================================

    // Bar 25: (2 ketuk hening) Me kha
    { time: "24:0:0", note: "G4", duration: "4n" },  // Me
    { time: "24:1:0", note: "G4", duration: "4n" },  // kha

    // Bar 26: | 5 5 2 3 4 |
    { time: "24:2:0", note: "G4", duration: "4n" },  // nai
    { time: "24:3:0", note: "G4", duration: "4n" },  // a
    { time: "25:0:0", note: "D4", duration: "4n" },  // was
    { time: "25:1:0", note: "E4", duration: "8n" },  // a
    { time: "25:1:2", note: "F4", duration: "8n" },  // was

    // Bar 27: | 4 4 4 4 4 3 5 |
    { time: "25:2:0", note: "F4", duration: "2n" },  // was... (me kha)
    { time: "26:0:0", note: "F4", duration: "4n" },  // nai
    { time: "26:1:0", note: "F4", duration: "8n" },  // a
    { time: "26:1:2", note: "F4", duration: "8n" },  // was
    { time: "26:2:0", note: "E4", duration: "4n" },  // a
    { time: "26:3:0", note: "G4", duration: "4n" },  // was

    // Bar 28: (2 ketuk hening) Na yah
    { time: "27:2:0", note: "E4", duration: "4n" },  // Na
    { time: "27:3:0", note: "E4", duration: "4n" },  // yah

    // Bar 29: | 2 4 3 2 1 | (Mu li mem bu di)
    { time: "28:0:0", note: "D4", duration: "4n" },  // mu
    { time: "28:1:0", note: "F4", duration: "4n" },  // li
    { time: "28:2:0", note: "E4", duration: "4n" },  // mem
    { time: "28:3:0", note: "D4", duration: "4n" },  // bu

    // Bar 30: | 1 . . 0 |
    { time: "29:0:0", note: "C4", duration: "1n" }   // di (Finish)
  ]
};