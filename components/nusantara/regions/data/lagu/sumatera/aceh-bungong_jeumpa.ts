// Path: components/nusantara/regions/data/lagu/aceh-bungong_jeumpa.ts

export const bungongJeumpa = {
  id: "aceh-bungong-jeumpa",
  judul: "Bungong Jeumpa",
  daerah: "Aceh",
  bpm: 100,
  timeSignature: "4/4",
  melody: [
    // --- BAIT 1: Bungong Jeumpa, Bungong Jeumpa ---
    // Not: | 6 . 6 7  6 5/ | 6 . 6 7  6 5/ |
    { time: "0:0:0", note: "A4", duration: "4n" },   // Bu
    { time: "0:1:0", note: "A4", duration: "8n" },   // ngong (1)
    { time: "0:1:2", note: "B4", duration: "8n" },   // ngong (2)
    { time: "0:2:0", note: "A4", duration: "4n" },   // jeum
    { time: "0:3:0", note: "G#4", duration: "4n" },  // pa (Sol#)

    { time: "1:0:0", note: "A4", duration: "4n" },   // Bu
    { time: "1:1:0", note: "A4", duration: "8n" },   // ngong
    { time: "1:1:2", note: "B4", duration: "8n" },   // jeum
    { time: "1:2:0", note: "A4", duration: "4n" },   // pa
    { time: "1:3:0", note: "G#4", duration: "4n" },  // pa

    // --- BAIT 1: Meugah di Aceh ---
    // Not: | 6 7 1 7 | 1 . . 0 |
    { time: "2:0:0", note: "A4", duration: "4n" },   // Meu
    { time: "2:1:0", note: "B4", duration: "4n" },   // gah
    { time: "2:2:0", note: "C5", duration: "4n" },   // di
    { time: "2:3:0", note: "B4", duration: "4n" },   // A
    { time: "3:0:0", note: "C5", duration: "2n." },  // ceh...

    // --- BAIT 2: Bungong teuleubeh, teuleubeh ---
    // Not: | 1 . 2 1 7 | 1 . 2 1 7 |
    { time: "4:0:0", note: "C5", duration: "4n" },   // bu
    { time: "4:1:2", note: "D5", duration: "8n" },   // ngong
    { time: "4:2:0", note: "C5", duration: "4n" },   // teu
    { time: "4:3:0", note: "B4", duration: "4n" },   // leu

    { time: "5:0:0", note: "C5", duration: "4n" },   // beh
    { time: "5:1:2", note: "D5", duration: "8n" },   // teu
    { time: "5:2:0", note: "C5", duration: "4n" },   // leu
    { time: "5:3:0", note: "B4", duration: "4n" },   // beh

    // --- BAIT 2: Indah lagoina ---
    // Not: | 1 7 6 5/ | 6 . . 0 |
    { time: "6:0:0", note: "C5", duration: "4n" },   // in
    { time: "6:1:0", note: "B4", duration: "4n" },   // dah
    { time: "6:2:0", note: "A4", duration: "4n" },   // la
    { time: "6:3:0", note: "G#4", duration: "4n" },  // goi (Sol#)
    { time: "7:0:0", note: "A4", duration: "2n." },  // na...

    // --- REFF: Puteh kuneng ---
    // Not: | 3 3 2 1 | 7 . . . |
    { time: "8:0:0", note: "E5", duration: "4n" },   // Pu
    { time: "8:1:0", note: "E5", duration: "4n" },   // teh
    { time: "8:2:0", note: "D5", duration: "4n" },   // ku
    { time: "8:3:0", note: "C5", duration: "4n" },   // neng
    { time: "9:0:0", note: "B4", duration: "1m" },   // (hold 1 bar)

    // --- REFF: Meujampu mirah ---
    // Not: | 2 3 1 7 | 6 . . 0 |
    { time: "10:0:0", note: "D5", duration: "4n" },  // me
    { time: "10:1:0", note: "E5", duration: "4n" },  // jam
    { time: "10:2:0", note: "C5", duration: "4n" },  // pu
    { time: "10:3:0", note: "B4", duration: "4n" },  // mi
    { time: "11:0:0", note: "A4", duration: "2n." }, // rah...

    // --- ENDING: Keumang siulah ---
    // Not: | 1 . 1 7 6 | 5/ . 6 7 |
    { time: "12:0:0", note: "C5", duration: "4n" },  // Keu
    { time: "12:1:2", note: "C5", duration: "8n" },  // mang
    { time: "12:2:0", note: "B4", duration: "4n" },  // si
    { time: "12:3:0", note: "A4", duration: "4n" },  // u
    { time: "13:0:0", note: "G#4", duration: "2n" }, // lah... (Sol#)
    { time: "13:2:0", note: "A4", duration: "4n" },  // (filler)
    { time: "13:3:0", note: "B4", duration: "4n" },  // (filler)

    // --- ENDING: Cidah that rupa ---
    // Not: | 1 7 6 5/ | 6 . . 0 |
    { time: "14:0:0", note: "C5", duration: "4n" },  // ci
    { time: "14:1:0", note: "B4", duration: "4n" },  // dah
    { time: "14:2:0", note: "A4", duration: "4n" },  // that
    { time: "14:3:0", note: "G#4", duration: "4n" }, // ru
    { time: "15:0:0", note: "A4", duration: "2n." }  // pa...
  ]
};