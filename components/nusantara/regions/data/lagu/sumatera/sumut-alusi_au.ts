// Path: components/nusantara/regions/data/lagu/sumut-alusi_au.ts

export const alusiAu = {
  id: "sumut-alusi-au",
  judul: "Alusi Au",
  daerah: "Sumatera Utara",
  bpm: 90, // Tempo santai (Rubato)
  timeSignature: "4/4",
  melody: [
    // ===================================
    // --- INTRO (Bar 1 - 6) ---
    // ===================================
    
    // Bar 1: A... lusi (Mulai di beat ke-2, beat 1 kosong)
    { time: "0:1:0", note: "G4", duration: "4n." }, 
    { time: "0:2:2", note: "A4", duration: "16n" }, 
    { time: "0:2:3", note: "G4", duration: "16n" }, 
    { time: "0:3:0", note: "F4", duration: "8n" },  
    { time: "0:3:2", note: "G4", duration: "8n" },  

    // Bar 2: Au... si
    { time: "1:0:0", note: "D5", duration: "2n." }, 
    { time: "1:3:0", note: "C5", duration: "4n" },  

    // Bar 3: Au...
    { time: "2:0:0", note: "E5", duration: "1n" },  

    // Bar 4: A... lu
    { time: "3:0:0", note: "E5", duration: "2n." }, 
    { time: "3:3:0", note: "F5", duration: "16n" }, 
    { time: "3:3:1", note: "E5", duration: "16n" }, 
    
    // Bar 5: Au... si
    { time: "4:0:0", note: "D5", duration: "2n." }, 
    { time: "4:3:0", note: "B4", duration: "4n" },  

    // Bar 6: Au...
    { time: "5:0:0", note: "D5", duration: "4n" },  
    { time: "5:1:0", note: "C5", duration: "2n." }, 

    // ===================================
    // --- BAIT 1 (Bar 7 - 10) ---
    // "Marragam ragam do anggo sita sita"
    // ===================================

    // Bar 7: (Beat 1-3 kosong/hening, masuk di beat 4)
    { time: "6:3:0", note: "G4", duration: "8t" },  
    { time: "6:3:1", note: "G4", duration: "8t" },  
    { time: "6:3:2", note: "G4", duration: "8t" },  

    // Bar 8: ragam do anggo sita
    { time: "7:0:0", note: "E4", duration: "4n" },  
    { time: "7:1:0", note: "G4", duration: "8n" },  
    { time: "7:1:2", note: "G4", duration: "8n" },  
    { time: "7:2:0", note: "G4", duration: "8n" },  
    { time: "7:2:2", note: "G4", duration: "8n" },  
    { time: "7:3:0", note: "G4", duration: "8n" },  
    { time: "7:3:2", note: "G4", duration: "8n" },  

    // Bar 9: sita di hita manis
    { time: "8:0:0", note: "G4", duration: "4n" },  
    { time: "8:1:0", note: "G4", duration: "4n" },  
    { time: "8:2:0", note: "G4", duration: "8n" },  
    { time: "8:2:2", note: "G4", duration: "8n" },  
    { time: "8:3:0", note: "G4", duration: "8n" },  
    { time: "8:3:2", note: "G4", duration: "8n" },  

    // Bar 10: ni si a...
    { time: "9:0:0", note: "F4", duration: "4n" },  
    { time: "9:1:0", note: "A4", duration: "4n." }, 
    { time: "9:2:2", note: "G4", duration: "8n" },  

    // ===================================
    // --- BAIT 2 (Bar 11 - 14) ---
    // "Marasing asing do anggo pangidoan"
    // ===================================

    // Bar 11: (Beat 2 hening)
    { time: "10:0:0", note: "G4", duration: "4n" }, 
    { time: "10:3:0", note: "B4", duration: "8t" }, 
    { time: "10:3:1", note: "B4", duration: "8t" }, 
    { time: "10:3:2", note: "B4", duration: "8t" }, 

    // Bar 12
    { time: "11:0:0", note: "B4", duration: "4n" }, 
    { time: "11:1:0", note: "B4", duration: "8n" }, 
    { time: "11:1:2", note: "B4", duration: "8n" }, 
    { time: "11:2:0", note: "B4", duration: "8n" }, 
    { time: "11:2:2", note: "B4", duration: "8n" }, 
    { time: "11:3:0", note: "B4", duration: "8n" }, 
    { time: "11:3:2", note: "B4", duration: "8n" }, 

    // Bar 13: doan... diganup ganup
    { time: "12:0:0", note: "C5", duration: "4n" }, 
    { time: "12:1:0", note: "G4", duration: "4n" }, 
    { time: "12:2:0", note: "G4", duration: "8n" }, 
    { time: "12:2:2", note: "G4", duration: "8n" }, 
    { time: "12:3:0", note: "A4", duration: "8n" }, 
    { time: "12:3:2", note: "G4", duration: "16n" },
    { time: "12:3:3", note: "F4", duration: "16n" },

    // Bar 14: jol ma
    { time: "13:0:0", note: "E4", duration: "4n" }, 
    { time: "13:1:0", note: "A4", duration: "4n." },
    { time: "13:2:2", note: "G4", duration: "8n" }, 

    // ===================================
    // --- BAIT 3 (Bar 15 - 18) ---
    // "Hamoraon hagabeon hasangapon"
    // ===================================

    // Bar 15
    { time: "14:0:0", note: "G4", duration: "4n" }, 
    { time: "14:2:0", note: "E4", duration: "4n." },
    { time: "14:3:2", note: "G4", duration: "8n" }, 

    // Bar 16
    { time: "15:0:0", note: "C5", duration: "8n" }, 
    { time: "15:0:2", note: "C5", duration: "8n" }, 
    { time: "15:1:0", note: "C5", duration: "8n" }, 
    { time: "15:1:2", note: "C5", duration: "8n" }, 
    { time: "15:2:0", note: "C5", duration: "8n" }, 
    { time: "15:2:2", note: "C5", duration: "8n" }, 
    { time: "15:3:0", note: "C5", duration: "8n" }, 
    { time: "15:3:2", note: "C5", duration: "8n" }, 

    // Bar 17
    { time: "16:0:0", note: "C5", duration: "8n" }, 
    { time: "16:0:2", note: "G4", duration: "8n" }, 
    { time: "16:1:0", note: "G4", duration: "8n" }, 
    { time: "16:1:2", note: "G4", duration: "8n" }, 
    { time: "16:2:0", note: "G4", duration: "8n" }, 
    { time: "16:2:2", note: "G4", duration: "8n" }, 
    { time: "16:3:0", note: "F4", duration: "8n" }, 
    { time: "16:3:2", note: "E4", duration: "8n" }, 

    // Bar 18: na deba...
    { time: "17:0:0", note: "F4", duration: "4n" }, 
    { time: "17:1:0", note: "A4", duration: "2n." },

    // ===================================
    // --- BAIT 4 (Bar 19 - 22) ---
    // "Di na deba asal ma tarbarita"
    // ===================================

    // Bar 19
    { time: "18:0:0", note: "A4", duration: "4n" }, 
    { time: "18:2:0", note: "B4", duration: "4n." },
    { time: "18:3:2", note: "A4", duration: "8n" }, 

    // Bar 20
    { time: "19:0:0", note: "G4", duration: "4n" }, 
    { time: "19:1:0", note: "G4", duration: "4n" }, 
    { time: "19:2:0", note: "G4", duration: "8n" }, 
    { time: "19:2:2", note: "G4", duration: "8n" }, 
    { time: "19:3:0", note: "G4", duration: "8n" }, 
    { time: "19:3:2", note: "G4", duration: "8n" }, 

    // Bar 21
    { time: "20:0:0", note: "G4", duration: "4n" }, 
    { time: "20:1:0", note: "G4", duration: "4n" }, 
    { time: "20:2:0", note: "G4", duration: "8n" }, 
    { time: "20:2:2", note: "A4", duration: "8n" }, 
    { time: "20:3:0", note: "G4", duration: "8n" }, 
    { time: "20:3:2", note: "F4", duration: "8n" }, 

    // Bar 22: tahe...
    { time: "21:0:0", note: "E4", duration: "1n" }, 

    // ===================================
    // --- BAIT 5 (Bar 23 - dst) ---
    // "Anggo di ahu tung asing..."
    // ===================================

    // Bar 23
    { time: "22:3:0", note: "G4", duration: "8t" }, 
    { time: "22:3:1", note: "G4", duration: "8t" }, 
    { time: "22:3:2", note: "G4", duration: "8t" }, 

    // Bar 24
    { time: "23:0:0", note: "E4", duration: "4n" }, 
    { time: "23:1:0", note: "G4", duration: "8n" }, 
    { time: "23:1:2", note: "G4", duration: "8n" }, 
    { time: "23:2:0", note: "G4", duration: "8n" }, 
    { time: "23:2:2", note: "G4", duration: "8n" }, 
    { time: "23:3:0", note: "G4", duration: "8n" }, 
    { time: "23:3:2", note: "G4", duration: "8n" }, 

    // Bar 25
    { time: "24:0:0", note: "G4", duration: "4n" }, 
    { time: "24:1:0", note: "G4", duration: "4n" }, 
    { time: "24:2:0", note: "G4", duration: "8n" }, 
    { time: "24:2:2", note: "G4", duration: "8n" }, 
    { time: "24:3:0", note: "G4", duration: "8n" }, 
    { time: "24:3:2", note: "G4", duration: "8n" }, 

    // Bar 26: gido a ku...
    { time: "25:0:0", note: "F4", duration: "4n" }, 
    { time: "25:1:0", note: "A4", duration: "4n." },
    { time: "25:2:2", note: "G4", duration: "8n" }
  ]
};