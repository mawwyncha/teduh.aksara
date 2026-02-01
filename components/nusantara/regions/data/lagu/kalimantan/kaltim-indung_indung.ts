// Path: components/nusantara/regions/data/lagu/kaltim-indung_indung.ts

export const indungIndung = {
  id: "kaltim-indung-indung",
  judul: "Indung-Indung",
  daerah: "Kalimantan Timur",
  bpm: 100,
  timeSignature: "4/4",
  melody: [
    // ==========================================
    // --- BAIT 1 ---
    // "Indung indung... kepala lindung"
    // ==========================================

    // Bar 1: | 5 . 3 3 | (In-dung in-dung)
    { time: "0:0:0", note: "G4", duration: "2n" },   // In
    { time: "0:2:0", note: "E4", duration: "4n" },   // dung
    { time: "0:3:0", note: "E4", duration: "4n" },   // in

    // Bar 2: | 4 3 2 1 | (ke-pa-la lin-dung)
    { time: "1:0:0", note: "F4", duration: "4n" },   // dung
    { time: "1:1:0", note: "E4", duration: "4n" },   // ke
    { time: "1:2:0", note: "D4", duration: "4n" },   // pa
    { time: "1:3:0", note: "C4", duration: "4n" },   // la

    // Bar 3: | 2 . 4 4 | (Hu-jan di u-)
    { time: "2:0:0", note: "D4", duration: "2n" },   // lin
    { time: "2:2:0", note: "F4", duration: "4n" },   // dung...
    { time: "2:3:0", note: "F4", duration: "4n" },   // Hu

    // Bar 4: | 3 2 1 7< | (dik di si-ni men-dung) - 7< = B3
    { time: "3:0:0", note: "E4", duration: "4n" },   // jan
    { time: "3:1:0", note: "D4", duration: "4n" },   // di
    { time: "3:2:0", note: "C4", duration: "4n" },   // u
    { time: "3:3:0", note: "B3", duration: "4n" },   // dik

    // ==========================================
    // --- BAIT 2 ---
    // "Anak siapa... pakai kerudung"
    // ==========================================

    // Bar 5: | 7< . 2 2 | (A-nak si-a)
    { time: "4:0:0", note: "B3", duration: "2n" },   // men
    { time: "4:2:0", note: "D4", duration: "4n" },   // dung...
    { time: "4:3:0", note: "D4", duration: "4n" },   // A

    // Bar 6: | 1 7< 6< 5< | (pa pa-kai ke-ru-dung) - 6<=A3, 5<=G3
    { time: "5:0:0", note: "C4", duration: "4n" },   // nak
    { time: "5:1:0", note: "B3", duration: "4n" },   // si
    { time: "5:2:0", note: "A3", duration: "4n" },   // a
    { time: "5:3:0", note: "G3", duration: "4n" },   // pa

    // Bar 7: | 1 . 3 3 | (Ma-ta me-li)
    { time: "6:0:0", note: "C4", duration: "2n" },   // pa
    { time: "6:2:0", note: "E4", duration: "4n" },   // kai...
    { time: "6:3:0", note: "E4", duration: "4n" },   // Ma

    // Bar 8: | 2 1 7< 1 | (rik ka-ki ke-san-dung)
    { time: "7:0:0", note: "D4", duration: "4n" },   // ta
    { time: "7:1:0", note: "C4", duration: "4n" },   // me
    { time: "7:2:0", note: "B3", duration: "4n" },   // li
    { time: "7:3:0", note: "C4", duration: "4n" },   // rik

    // ==========================================
    // --- REFF / PENGULANGAN (Variasi Lirik Lain) ---
    // "Duduk goyang... di kursi goyang"
    // ==========================================

    // Bar 9 (Ulang Bar 1)
    { time: "8:0:0", note: "G4", duration: "2n" },   // san
    { time: "8:2:0", note: "E4", duration: "4n" },   // dung...
    { time: "8:3:0", note: "E4", duration: "4n" },   // Du

    // Bar 10 (Ulang Bar 2)
    { time: "9:0:0", note: "F4", duration: "4n" },   // duk
    { time: "9:1:0", note: "E4", duration: "4n" },   // go
    { time: "9:2:0", note: "D4", duration: "4n" },   // yang...
    { time: "9:3:0", note: "C4", duration: "4n" },   // di

    // Bar 11 (Ulang Bar 3)
    { time: "10:0:0", note: "D4", duration: "2n" },  // kur
    { time: "10:2:0", note: "F4", duration: "4n" },  // si
    { time: "10:3:0", note: "F4", duration: "4n" },  // go

    // Bar 12 (Ulang Bar 4)
    { time: "11:0:0", note: "E4", duration: "4n" },  // yang...
    { time: "11:1:0", note: "D4", duration: "4n" },  // be
    { time: "11:2:0", note: "C4", duration: "4n" },  // dah
    { time: "11:3:0", note: "B3", duration: "4n" },  // do

    // Bar 13 (Ulang Bar 5)
    { time: "12:0:0", note: "B3", duration: "2n" },  // a
    { time: "12:2:0", note: "D4", duration: "4n" },  // su
    { time: "12:3:0", note: "D4", duration: "4n" },  // pa

    // Bar 14 (Ulang Bar 6)
    { time: "13:0:0", note: "C4", duration: "4n" },  // ya
    { time: "13:1:0", note: "B3", duration: "4n" },  // ja
    { time: "13:2:0", note: "A3", duration: "4n" },  // di
    { time: "13:3:0", note: "G3", duration: "4n" },  // a

    // Bar 15 (Ulang Bar 7)
    { time: "14:0:0", note: "C4", duration: "2n" },  // nak
    { time: "14:2:0", note: "E4", duration: "4n" },  // pem
    { time: "14:3:0", note: "E4", duration: "4n" },  // ba

    // Bar 16 (Ulang Bar 8 - Ending)
    { time: "15:0:0", note: "D4", duration: "4n" },  // hyang...
    { time: "15:1:0", note: "C4", duration: "4n" },  // (filler)
    { time: "15:2:0", note: "B3", duration: "4n" },  // (filler)
    { time: "15:3:0", note: "C4", duration: "4n" },  // (end)

    // Final Note (Hold)
    { time: "16:0:0", note: "C4", duration: "1n" }
  ]
};