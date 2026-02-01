// Path: components/nusantara/regions/data/lagu/jawa-yen_ing_tawang.ts

export const yenIngTawangAnaLintang = {
  id: "jawa-yen-ing-tawang",
  judul: "Yen Ing Tawang Ono Lintang",
  daerah: "Jawa Tengah / Yogyakarta",
  bpm: 90, // Andante (Tempo Keroncong Santai)
  timeSignature: "4/4",
  melody: [
    // ===================================
    // --- BAIT 1 ---
    // "Yen ing tawang ono lintang..."
    // ===================================

    // Bar 1: (Rest 1 ketuk) | 3 4 5 6 7< 5 | (Nada angka F Major: 3=A? Tidak, baca not balok)
    // Not Balok di F Major:
    // Garis 1 (E), Spasi 1 (F), Garis 2 (G), Spasi 2 (A), Garis 3 (B/Bb), Spasi 3 (C), Garis 4 (D)
    
    // Bar 1: (Rest 1 ketuk) E F G A Bb G
    { time: "0:1:0", note: "E4", duration: "8n" },   // Yen
    { time: "0:1:2", note: "F4", duration: "8n" },   // ing
    { time: "0:2:0", note: "G4", duration: "8n" },   // Ta
    { time: "0:2:2", note: "A4", duration: "8n" },   // wang
    { time: "0:3:0", note: "Bb4", duration: "8n" },  // o
    { time: "0:3:2", note: "G4", duration: "8n" },   // no

    // Bar 2: F . A (G F) E . .
    { time: "1:0:0", note: "F4", duration: "4n" },   // Lin
    { time: "1:1:0", note: "A4", duration: "8n" },   // tang
    // Slur cepat (cah ayu)
    { time: "1:1:2", note: "G4", duration: "16n" },  // (cah)
    { time: "1:1:3", note: "F4", duration: "16n" },  // (ayu)
    { time: "1:2:0", note: "E4", duration: "2n" },   // ...

    // Bar 3: (Rest 1/2) E G F E F G A
    { time: "2:0:2", note: "E4", duration: "8n" },   // A
    { time: "2:1:0", note: "G4", duration: "8n" },   // ku
    { time: "2:1:2", note: "F4", duration: "8n" },   // ngen
    { time: "2:2:0", note: "E4", duration: "8n" },   // te
    { time: "2:2:2", note: "F4", duration: "8n" },   // ni
    { time: "2:3:0", note: "G4", duration: "8n" },   // te
    { time: "2:3:2", note: "A4", duration: "8n" },   // ka

    // Bar 4: G . . .
    { time: "3:0:0", note: "G4", duration: "1n" },   // mu...

    // ===================================
    // --- BAIT 2 ---
    // "Marang mego ing angkoso..."
    // ===================================

    // Bar 5: (Rest 1 ketuk) C C F F A Bb
    { time: "4:1:0", note: "C4", duration: "8n" },   // Ma
    { time: "4:1:2", note: "C4", duration: "8n" },   // rang
    { time: "4:2:0", note: "F4", duration: "8n" },   // me
    { time: "4:2:2", note: "F4", duration: "8n" },   // go
    { time: "4:3:0", note: "A4", duration: "8n" },   // ing
    { time: "4:3:2", note: "Bb4", duration: "8n" },  // ang

    // Bar 6: G F E . .
    { time: "5:0:0", note: "G4", duration: "4n" },   // ko
    { time: "5:1:0", note: "F4", duration: "4n" },   // so
    { time: "5:2:0", note: "E4", duration: "2n" },   // (ni mas)

    // Bar 7: (Rest 1/2) G Bb A G A Bb C5
    { time: "6:0:2", note: "G4", duration: "8n" },   // Ing
    { time: "6:1:0", note: "Bb4", duration: "8n" },  // sun
    { time: "6:1:2", note: "A4", duration: "8n" },   // ta
    { time: "6:2:0", note: "G4", duration: "8n" },   // kok
    { time: "6:2:2", note: "A4", duration: "8n" },   // ke
    { time: "6:3:0", note: "Bb4", duration: "8n" },  // pa
    { time: "6:3:2", note: "C5", duration: "8n" },   // wa

    // Bar 8: A . . .
    { time: "7:0:0", note: "A4", duration: "1n" },   // ramu...

    // ===================================
    // --- BAIT 3 ---
    // "Janji janji aku eling..."
    // ===================================

    // Bar 9: (Rest 1 ketuk) F G A Bb C5
    { time: "8:1:0", note: "F4", duration: "8n" },   // Jan
    { time: "8:1:2", note: "G4", duration: "8n" },   // ji
    { time: "8:2:0", note: "A4", duration: "8n" },   // jan
    { time: "8:2:2", note: "Bb4", duration: "8n" },  // ji
    { time: "8:3:0", note: "C5", duration: "4n" },   // a

    // Bar 10: D5 (C5 Bb) A . .
    { time: "9:0:0", note: "D5", duration: "8n" },   // ku
    { time: "9:0:2", note: "C5", duration: "16n" },  // e
    { time: "9:0:3", note: "Bb4", duration: "16n" }, // ling
    { time: "9:1:0", note: "A4", duration: "2n." },  // (cah ayu)

    // Bar 11: (Rest 1/2) G Bb A G F G A
    { time: "10:0:2", note: "G4", duration: "8n" },  // Su
    { time: "10:1:0", note: "Bb4", duration: "8n" }, // me
    { time: "10:1:2", note: "A4", duration: "8n" },  // dhot
    { time: "10:2:0", note: "G4", duration: "8n" },  // ta
    { time: "10:2:2", note: "F4", duration: "8n" },  // ngis
    { time: "10:3:0", note: "G4", duration: "8n" },  // ing
    { time: "10:3:2", note: "A4", duration: "8n" },  // a

    // Bar 12: F . . .
    { time: "11:0:0", note: "F4", duration: "1n" },  // ti...

    // ===================================
    // --- BAIT 4 ---
    // "Lintang lintang ngiwi iwi..."
    // ===================================

    // Bar 13: (Rest 1 ketuk) F G A Bb C5 C5
    { time: "12:1:0", note: "F4", duration: "8n" },  // Lin
    { time: "12:1:2", note: "G4", duration: "8n" },  // tang
    { time: "12:2:0", note: "A4", duration: "8n" },  // lin
    { time: "12:2:2", note: "Bb4", duration: "8n" }, // tang
    { time: "12:3:0", note: "C5", duration: "8n" },  // ngi
    { time: "12:3:2", note: "C5", duration: "8n" },  // wi

    // Bar 14: D5 (C5 Bb) A . .
    { time: "13:0:0", note: "D5", duration: "8n" },  // i
    { time: "13:0:2", note: "C5", duration: "16n" }, // wi
    { time: "13:0:3", note: "Bb4", duration: "16n" }, // (nimas)
    { time: "13:1:0", note: "A4", duration: "2n." }, // ...

    // Bar 15: (Rest 1/2) G Bb A G F G A
    { time: "14:0:2", note: "G4", duration: "8n" },  // Tres
    { time: "14:1:0", note: "Bb4", duration: "8n" }, // na
    { time: "14:1:2", note: "A4", duration: "8n" },  // ku
    { time: "14:2:0", note: "G4", duration: "8n" },  // sun
    { time: "14:2:2", note: "F4", duration: "8n" },  // dhul
    { time: "14:3:0", note: "G4", duration: "8n" },  // wi
    { time: "14:3:2", note: "A4", duration: "8n" },  // ya

    // Bar 16: F . . .
    { time: "15:0:0", note: "F4", duration: "1n" },  // ti...

    // ===================================
    // --- REFRAIN / BRIDGE ---
    // "Dek semana... janji ku disekseni"
    // ===================================

    // Bar 17: (Rest 1 ketuk) D5 C5
    { time: "16:1:0", note: "D5", duration: "4n" },  // Dek
    { time: "16:2:0", note: "C5", duration: "4n" },  // se

    // Bar 18: Bb A . .
    { time: "17:0:0", note: "Bb4", duration: "2n" }, // ma
    { time: "17:2:0", note: "A4", duration: "2n" },  // na

    // Bar 19: G A Bb A G F
    { time: "18:0:0", note: "G4", duration: "8n" },  // jan
    { time: "18:0:2", note: "A4", duration: "8n" },  // ji
    { time: "18:1:0", note: "Bb4", duration: "4n" }, // ku
    { time: "18:2:0", note: "A4", duration: "8n" },  // di
    { time: "18:2:2", note: "G4", duration: "8n" },  // sek
    { time: "18:3:0", note: "F4", duration: "4n" },  // se

    // Bar 20: E . . .
    { time: "19:0:0", note: "E4", duration: "1n" },  // ni...

    // Bar 21: (Rest 1 ketuk) C E G F E
    { time: "20:1:0", note: "C4", duration: "8n" },  // Me
    { time: "20:1:2", note: "E4", duration: "8n" },  // go
    { time: "20:2:0", note: "G4", duration: "8n" },  // kar
    { time: "20:2:2", note: "F4", duration: "8n" },  // ti
    { time: "20:3:0", note: "E4", duration: "4n" },  // ka

    // Bar 22: F . A .
    { time: "21:0:0", note: "F4", duration: "2n" },  // ka
    { time: "21:2:0", note: "A4", duration: "2n" },  // i

    // Bar 23: G F E D E
    { time: "22:0:0", note: "G4", duration: "2n" },  // ring
    { time: "22:2:0", note: "F4", duration: "8n" },  // ra
    { time: "22:2:2", note: "E4", duration: "8n" },  // sa
    { time: "22:3:0", note: "D4", duration: "8n" },  // tres
    { time: "22:3:2", note: "E4", duration: "8n" },  // no

    // Bar 24: F E D . .
    { time: "23:0:0", note: "F4", duration: "8n" },  // a
    { time: "23:0:2", note: "E4", duration: "8n" },  // sih
    { time: "23:1:0", note: "D4", duration: "2n." }, // ...

    // ===================================
    // --- BAIT 5 (REPRISE) ---
    // "Yen ing tawang... (Rungokno tangis ing ati)"
    // ===================================

    // Bar 25: (Rest 1 ketuk) E F G A Bb G
    { time: "24:1:0", note: "E4", duration: "8n" },  // Yen
    { time: "24:1:2", note: "F4", duration: "8n" },  // Ing
    { time: "24:2:0", note: "G4", duration: "8n" },  // Ta
    { time: "24:2:2", note: "A4", duration: "8n" },  // wang
    { time: "24:3:0", note: "Bb4", duration: "8n" }, // O
    { time: "24:3:2", note: "G4", duration: "8n" },  // no

    // Bar 26: F . A (G F) E . .
    { time: "25:0:0", note: "F4", duration: "4n" },  // Lin
    { time: "25:1:0", note: "A4", duration: "8n" },  // tang
    { time: "25:1:2", note: "G4", duration: "16n" }, // (cah)
    { time: "25:1:3", note: "F4", duration: "16n" }, // (ayu)
    { time: "25:2:0", note: "E4", duration: "2n" },  // ...

    // Bar 27: (Rest 1/2) E G F E F G A
    { time: "26:0:2", note: "E4", duration: "8n" },  // Ru
    { time: "26:1:0", note: "G4", duration: "8n" },  // ngok
    { time: "26:1:2", note: "F4", duration: "8n" },  // no
    { time: "26:2:0", note: "E4", duration: "8n" },  // tang
    { time: "26:2:2", note: "F4", duration: "8n" },  // is
    { time: "26:3:0", note: "G4", duration: "8n" },  // ing
    { time: "26:3:2", note: "A4", duration: "8n" },  // a

    // Bar 28: G . . .
    { time: "27:0:0", note: "G4", duration: "1n" },  // ti...

    // ===================================
    // --- BAIT 6 (ENDING) ---
    // "Binarung swaraning ati..."
    // ===================================

    // Bar 29: (Rest 1 ketuk) C C F F A Bb
    { time: "28:1:0", note: "C4", duration: "8n" },  // Bi
    { time: "28:1:2", note: "C4", duration: "8n" },  // na
    { time: "28:2:0", note: "F4", duration: "8n" },  // rung
    { time: "28:2:2", note: "F4", duration: "8n" },  // swa
    { time: "28:3:0", note: "A4", duration: "8n" },  // ra
    { time: "28:3:2", note: "Bb4", duration: "8n" }, // ning

    // Bar 30: G F E . .
    { time: "29:0:0", note: "G4", duration: "4n" },  // a
    { time: "29:1:0", note: "F4", duration: "4n" },  // ti
    { time: "29:2:0", note: "E4", duration: "2n" },  // (ni mas)

    // Bar 31: (Rest 1/2) G Bb A G A Bb C5
    { time: "30:0:2", note: "G4", duration: "8n" },  // Ngen
    { time: "30:1:0", note: "Bb4", duration: "8n" }, // te
    { time: "30:1:2", note: "A4", duration: "8n" },  // ni
    { time: "30:2:0", note: "G4", duration: "8n" },  // mbu
    { time: "30:2:2", note: "A4", duration: "8n" },  // lan
    { time: "30:3:0", note: "Bb4", duration: "8n" }, // nda
    { time: "30:3:2", note: "C5", duration: "8n" },  // da

    // Bar 32: F (Final Note)
    { time: "31:0:0", note: "F4", duration: "1n" }   // ri
  ]
};