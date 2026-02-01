// Path: components/nusantara/regions/data/lagu/banten-dayung_sampan.ts

export const dayungSampan = {
  id: "banten-dayung-sampan",
  judul: "Dayung Sampan",
  daerah: "Banten",
  bpm: 110, // Tempo sedang, mengalun
  timeSignature: "4/4",
  melody: [
    // ===================================
    // --- BAIT 1 ---
    // "Dayung sampan... dayung, dayung sampan"
    // ===================================

    // Bar 1: | 3 . 5 . | (Da-yung)
    { time: "0:0:0", note: "E4", duration: "2n" },   // Da
    { time: "0:2:0", note: "G4", duration: "2n" },   // yung

    // Bar 2: | 6 . 5 4 | (sam-pan)
    { time: "1:0:0", note: "A4", duration: "4n." },  // sam
    { time: "1:1:2", note: "G4", duration: "8n" },   // (slur)
    { time: "1:2:0", note: "F4", duration: "2n" },   // pan

    // Bar 3: | 3 2 3 5 | (da-yung, da-yung sam-)
    { time: "2:0:0", note: "E4", duration: "4n" },   // da
    { time: "2:1:0", note: "D4", duration: "4n" },   // yung
    { time: "2:2:0", note: "E4", duration: "4n" },   // da
    { time: "2:3:0", note: "G4", duration: "4n" },   // yung

    // Bar 4: | 2 . . . | (pan...)
    { time: "3:0:0", note: "D4", duration: "1n" },   // pan...

    // ===================================
    // --- BAIT 2 ---
    // "Datang di tepi... datang di tepi"
    // ===================================

    // Bar 5: | 3 . 5 . | (Da-tang)
    { time: "4:0:0", note: "E4", duration: "2n" },   // Da
    { time: "4:2:0", note: "G4", duration: "2n" },   // tang

    // Bar 6: | 6 . 5 4 | (di te-pi)
    { time: "5:0:0", note: "A4", duration: "4n." },  // di
    { time: "5:1:2", note: "G4", duration: "8n" },   // te
    { time: "5:2:0", note: "F4", duration: "2n" },   // pi

    // Bar 7: | 3 2 3 5 | (da-tang di te-)
    { time: "6:0:0", note: "E4", duration: "4n" },   // da
    { time: "6:1:0", note: "D4", duration: "4n" },   // tang
    { time: "6:2:0", note: "E4", duration: "4n" },   // di
    { time: "6:3:0", note: "G4", duration: "4n" },   // te

    // Bar 8: | 1 . . . | (pi...)
    { time: "7:0:0", note: "C4", duration: "1n" },   // pi...

    // ===================================
    // --- BAIT 3 ---
    // "Dengan si dia... (Aduhai sayang)"
    // ===================================

    // Bar 9: | 2 3 2 . | (De-ngan si)
    { time: "8:0:0", note: "D4", duration: "4n" },   // De
    { time: "8:1:0", note: "E4", duration: "4n" },   // ngan
    { time: "8:2:0", note: "D4", duration: "2n" },   // si

    // Bar 10: | 1 6< 1 . | (di-a...) -> 6< adalah A3 (Oktaf bawah)
    { time: "9:0:0", note: "C4", duration: "4n" },   // di
    { time: "9:1:0", note: "A3", duration: "4n" },   // a
    { time: "9:2:0", note: "C4", duration: "2n" },   // ...

    // Bar 11: | 2 3 2 . | (A-du-hai)
    { time: "10:0:0", note: "D4", duration: "4n" },  // A
    { time: "10:1:0", note: "E4", duration: "4n" },  // du
    { time: "10:2:0", note: "D4", duration: "2n" },  // hai

    // Bar 12: | 1 6< 1 . | (sa-yang...)
    { time: "11:0:0", note: "C4", duration: "4n." }, // sa
    { time: "11:1:2", note: "A3", duration: "8n" },  // yang
    { time: "11:2:0", note: "C4", duration: "2n" },  // ...

    // ===================================
    // --- BAIT 4 (Pengulangan / Ending) ---
    // "Lihatlah... lihatlah di sana"
    // ===================================

    // Bar 13: | 3 . 5 . | (Li-hat)
    { time: "12:0:0", note: "E4", duration: "2n" },  // Li
    { time: "12:2:0", note: "G4", duration: "2n" },  // hat

    // Bar 14: | 6 . 5 4 | (lah... di)
    { time: "13:0:0", note: "A4", duration: "4n." }, // lah
    { time: "13:1:2", note: "G4", duration: "8n" },  // di
    { time: "13:2:0", note: "F4", duration: "2n" },  // sa

    // Bar 15: | 3 2 3 5 | (sa-na... li-hat)
    { time: "14:0:0", note: "E4", duration: "4n" },  // na
    { time: "14:1:0", note: "D4", duration: "4n" },  // li
    { time: "14:2:0", note: "E4", duration: "4n" },  // hat
    { time: "14:3:0", note: "G4", duration: "4n" },  // lah

    // Bar 16: | 1 . . . | (ya...)
    { time: "15:0:0", note: "C4", duration: "1n" }   // ya (Finish)
  ]
};