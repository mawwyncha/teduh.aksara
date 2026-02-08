import { ProvinceData } from '../../ProvinceInterfaces';

export const PROVINCE_DIALECTS: Record<string, ProvinceData> = {
  "Maluku Utara": {
    capital: "Sofifi",
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/maluku%20utara%20-%20kue%20bagea.png",
    headerDescription: "Kue Bagea",
    headerLongDescription: "Kue bangea khas Provinsi Maluku Utara memiliki rasa manis legit dengan aroma rempah yang hangat dari jahe dan kacang. Teksturnya padat namun lembut di dalam, memberikan sensasi nikmat di setiap gigitan. Kue tradisional ini menggugah selera sebagai sajian khas Maluku Utara yang sederhana, mengenyangkan, dan sarat cita rasa lokal.",
    regionalSong: {
      title: "Sayang Kene",
      description: "Lagu yang merupakan warisan tradisional masyarakat Maluku Utara yang secara linguistik bermakna 'sayang di sini' sebagai bentuk ungkapan kasih sayang terhadap lingkungan sosial setempat. Liriknya menceritakan kehangatan hubungan antarmanusia dan kedekatan emosional warga yang terjalin dengan tulus dalam suasana kekeluargaan yang erat. Melalui komposisi yang komunikatif ini, terabadikan semangat inklusivitas serta memori manis akan kampung halaman yang selalu dirindukan oleh setiap anak negeri.",
      melodyNotes: [
      // --- Bait 1: Sayang kene rasa sayang kene (C - F) ---
      { time: "0:0:0", note: "C4", duration: "4n" },   // Sa-yang
      { time: "0:1:0", note: "E4", duration: "4n" },   // ke-ne
      { time: "0:2:0", note: "F4", duration: "4n" },   // ra-sa
      { time: "0:3:0", note: "A4", duration: "4n" },   // sa-yang
      { time: "1:0:0", note: "G4", duration: "2n" },   // ke-ne

      // --- Bait 1: Lihat dari jauh rasa sayang kene (G7 - C) ---
      { time: "2:0:0", note: "G4", duration: "8n" },   // Li-hat
      { time: "2:0:2", note: "B4", duration: "8n" },   // da-ri
      { time: "2:1:0", note: "D5", duration: "4n" },   // ja-uh
      { time: "2:2:0", note: "C5", duration: "8n" },   // ra-sa
      { time: "2:2:2", note: "G4", duration: "8n" },   // sa-yang
      { time: "2:3:0", note: "E4", duration: "4n" },   // ke-ne
      { time: "3:0:0", note: "C4", duration: "2n" },   // (Sustain)

      // --- Reff: Ole sioh sioh sayange (C - G7) ---
      { time: "4:0:0", note: "E4", duration: "4n" },   // O-le
      { time: "4:1:0", note: "G4", duration: "4n" },   // si-oh
      { time: "4:2:0", note: "F4", duration: "4n" },   // si-oh
      { time: "4:3:0", note: "D4", duration: "4n" },   // sa-yange
      { time: "5:0:0", note: "G4", duration: "2n" },   // (Sustain)
    ]
    },
    folklore: {
      title: "Legenda Empat Telur",
      story: "Dahulu kala, di wilayah Maluku Utara, hiduplah sepasang suami istri yang sangat baik hati bernama Bikunzigara dan istrinya. Mereka hidup tenang di tepi pantai yang sunyi. Suatu hari, saat sedang berjalan menyisir pantai, Bikunzigara menemukan empat butir telur raksasa yang tampak aneh namun sangat indah. Karena penasaran, ia membawa telur-telur itu pulang dan menyimpannya dengan hati-hati. Keajaiban terjadi di tengah malam yang sunyi; telur-telur itu mulai retak satu per satu. Namun, yang keluar bukanlah seekor hewan, melainkan empat orang bayi laki-laki yang sehat dan tampan. Bikunzigara dan istrinya merawat mereka dengan penuh kasih sayang. Setelah dewasa, keempat pemuda ini menjadi pemimpin yang sangat bijaksana. Berdasarkan petunjuk gaib, mereka kemudian berpisah untuk memimpin wilayah yang berbeda. Keempat pemuda tersebut akhirnya menjadi raja-raja pertama yang mendirikan empat kerajaan besar di Maluku Utara. Putra pertama menjadi Raja di Ternate, putra kedua menjadi Raja di Tidore, putra ketiga menjadi Raja di Jailolo, dan putra keempat menjadi Raja di Bacan. Keempat kerajaan ini dikenal sebagai Moloku Kie Raha, yang artinya persaudaraan empat gunung atau empat pemimpin yang selalu hidup berdampingan dalam perdamaian. Pesan Moral: Persaudaraan dan persatuan adalah kunci kekuatan. Meskipun berbeda wilayah atau kekuasaan, jika kita mengingat asal-usul yang sama, maka kedamaian akan selalu terjaga. Pengarang: Anonim (Sastra Lisan/Tradisi Tutur Masyarakat Maluku Utara). Kisah ini sangat sakral bagi masyarakat Ternate dan Tidore sebagai bagian dari sejarah leluhur mereka.",
      videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/Folklore/Malut%20-%20Legenda%20Empat%20Telur.mp4",
      videoPosterUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Folklore/Malut%20-%20Legenda%20Empat%20Telur.jpg"
    },
    native: [
      { name: "Bahasa Ternate", endonim: "Bahasa Ternate", makna: "Merujuk pada identitas etnis dan pulau Ternate; etimologis berasal dari 'Terada' (yang telah sampai).", dialek: "Dialek Ternate, Dialek Hiri.", detail: "Pulau Ternate, Pesisir Halmahera Barat.", description: "Termasuk Rumpun Papua Barat; pernah menjadi bahasa pengantar (lingua franca) di wilayah Pasifik Barat." },
      { name: "Bahasa Tidore", endonim: "Bahasa Tidore", makna: "Merujuk pada identitas etnis dan pulau Tidore; berasal dari kata 'To ado re' (saya sudah sampai).", dialek: "Dialek Tidore, Dialek Mare.", detail: "Pulau Tidore, Pesisir Halmahera Tengah.", description: "Digunakan secara luas dalam liturgi adat Kesultanan Tidore; memiliki kedekatan leksikal yang tinggi dengan bahasa Ternate." },
      { name: "Bahasa Galela", endonim: "Bahasa Galela", makna: "Merujuk pada wilayah Galela; secara linguistik bermakna 'bahasa orang utara'.", dialek: "Kadulu, Morotai, Toweka.", detail: "Halmahera Utara, Pulau Morotai.", description: "Salah satu bahasa Papua Barat dengan jumlah penutur terbanyak dan masih sangat dominan digunakan dalam komunikasi harian." },
      { name: "Bahasa Tobelo", endonim: "Bahasa Tobelo", makna: "Merujuk pada identitas etnis Tobelo di Halmahera Utara.", dialek: "Heleworuru, Boeng, Dodinga.", detail: "Halmahera Utara, Pulau Morotai.", description: "Dikenal luas karena pengaruh budayanya; bahasa ini memiliki struktur tata bahasa yang kompleks dengan sistem arah mata angin." },
      { name: "Bahasa Sahu", endonim: "Bahasa Sahu", makna: "Sahu' merujuk pada identitas masyarakat agraris di pedalaman Halmahera Barat.", dialek: "Pa'disua, Tala'i.", detail: "Kabupaten Halmahera Barat.", description: "Berstatus Rentan; berkaitan erat dengan upacara adat 'Horom' (pesta panen) yang menggunakan bahasa puitis kuno." },
      { name: "Bahasa Sawai", endonim: "Bahasa Sawai", makna: "Sawai' kemungkinan merujuk pada nama wilayah atau klan asal di Halmahera Tengah.", dialek: "Sawai Tengah, Sawai Utara.", detail: "Kabupaten Halmahera Tengah (Weda).", description: "Rumpun Austronesia; bahasa ini menunjukkan transisi linguistik antara Maluku Utara dan Papua bagian barat." },
      { name: "Bahasa Gane", endonim: "Bahasa Gane", makna: "Gane' adalah nama wilayah di semenanjung selatan Halmahera.", dialek: "Gane Luar, Gane Dalam.", detail: "Halmahera Selatan (Gane).", description: "Berada dalam rumpun Austronesia; penuturnya memiliki tradisi bahari yang kuat namun bahasanya mulai terdesak bahasa Melayu." },
      { name: "Bahasa Sula", endonim: "Bahasa Sula", makna: "Merujuk pada identitas masyarakat di Kepulauan Sula dan Taliabu.", dialek: "Fagudu, Falabisahaya, Mangon.", detail: "Kepulauan Sula dan Pulau Taliabu.", description: "Memiliki kemiripan dengan bahasa di Maluku Tengah; merupakan bahasa Austronesia yang sangat aktif digunakan di wilayah barat provinsi." },
      { name: "Bahasa Bacan", endonim: "Bahasa Bacan", makna: "Merujuk pada identitas Kesultanan Bacan di Halmahera Selatan.", dialek: "Bacan Pesisir.", detail: "Pulau Bacan.", description: "Bahasa ini unik karena merupakan bahasa Melayu yang mengalami evolusi lokal menjadi bahasa daerah mandiri sejak berabad-abad lalu." },
      { name: "Bahasa Ibu", endonim: "Bahasa Ibu", makna: "Merujuk pada wilayah Sungai Ibu di Halmahera Barat.", dialek: "Dialek tunggal.", detail: "Kecamatan Ibu (Halmahera Barat).", description: "Berstatus Punah/Kritis; hanya tersisa sedikit penutur aktif karena asimilasi dengan bahasa Galela dan Tobelo." },
    ],
    community: [
      { name: "Bahasa Melayu Ternate", endonim: "Bahasa Melayu Ternate", makna: "Kreol Melayu yang berkembang sebagai lingua franca di wilayah Kesultanan Ternate.", dialek: "Melayu Maluku Utara.", detail: "Seluruh wilayah perkotaan (Ternate, Sofifi, Tobelo).", description: "Menjadi bahasa pemersatu lintas suku; strukturnya adalah Melayu namun kosa katanya banyak meminjam dari bahasa Ternate." },
      { name: "Bahasa Bajo", endonim: "Bahasa Sama", makna: "Sama' bermakna 'sama' atau 'manusia'; sebutan kolektif masyarakat pelaut.", dialek: "Sama-Bajau Maluku.", detail: "Pesisir Halmahera Selatan dan Kepulauan Sula.", description: "Komunitas ini tinggal di perkampungan atas laut dan menggunakan bahasa ini sebagai simbol identitas 'Gipsi Laut'." },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada pengikut 'La Sattumpugi' dari Sulawesi Selatan.", dialek: "Bugis Pesisir.", detail: "Halmahera Selatan, Sanana, dan Ternate.", description: "Tiba di Maluku Utara melalui jalur perdagangan rempah-rempah sejak era kolonial dan membentuk pemukiman tetap." },
      { name: "Bahasa Buton", endonim: "Bahasa Wolio", makna: "Merujuk pada pusat Kesultanan Buton (Wolio) di Sulawesi Tenggara.", dialek: "Dialek Buton Maluku.", detail: "Halmahera Selatan, Taliabu, dan Kepulauan Sula.", description: "Migrasi besar-besaran sejak masa lampau membuat bahasa ini menjadi salah satu bahasa minoritas yang paling mapan di NTT." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal pulau dan tanaman 'Yava' (jelai).", dialek: "Jawa Transmigrasi.", detail: "Wilayah transmigrasi di Halmahera Utara dan Tengah.", description: "Digunakan oleh komunitas transmigran; tetap terjaga dalam interaksi domestik dan acara kesenian seperti wayang atau kuda lumping." },
      { name: "Bahasa Makassar", endonim: "Basa Mangkasara'", makna: "Mangkasara' berarti 'mereka yang berjiwa mulia/terbuka'.", dialek: "Makassar Pesisir.", detail: "Kota Ternate dan Labuha.", description: "Digunakan oleh keturunan pedagang dan pelaut Makassar yang telah menetap selama beberapa generasi di kota pelabuhan." },
    ],
    foreign: [
      { name: "Bahasa Mandarin (Peranakan)", endonim: "Huayu", makna: "Hua' (Tionghoa) dan 'Yu' (bahasa); identitas etnis Tionghoa.", dialek: "Hokkien (dominan).", detail: "Pecinan Ternate dan Labuha.", description: "Komunitas Tionghoa di Ternate memiliki sejarah panjang sejak era perdagangan rempah dan telah berasimilasi dalam dialek Melayu Ternate." },
      { name: "Bahasa Arab (Peranakan)", endonim: "Lughah al-Arabiyyah", makna: "Arab' merujuk pada entitas geografis semenanjung Arab.", dialek: "Arab Hadrami.", detail: "Kampung Arab (Ternate).", description: "Digunakan oleh keturunan Yaman yang memiliki hubungan erat dengan penyebaran Islam dan struktur keagamaan kesultanan." },
    ]
  },
  "Maluku": {
    capital: "Ambon",
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/maluku%20-%20bubur%20ne.png",
    headerDescription: "Bubur Ne",
    headerLongDescription: "Bubur Ne khas Maluku hadir dengan tekstur lembut serta rasa manis alami dari pisang dan santan yang harum menggoda. Setiap suapan menghadirkan kehangatan tradisi dan cita rasa khas timur Indonesia yang bikin rindu. Perpaduan pisang matang, santan kental, dan sentuhan rempah menciptakan rasa manis-gurih yang creamy, hangat, dan menenangkan di mulut.",
    regionalSong: {
      title: "Huhate",
      description: "Nama lagu ini diambil dari alat pancing tradisional khas Maluku dan Maluku Utara yang disebut huhate atau pole and line. Alat ini berupa joran bambu yang digunakan secara aktif oleh para nelayan untuk memburu ikan cakalang di laut lepas.",
      melodyNotes: [
      // --- Bait 1: Orang muda huhate baik baik (G - Am) ---
      { time: "0:0:0", note: "B4", duration: "8n" },   // O-
      { time: "0:0:2", note: "B4", duration: "8n" },   // rang
      { time: "0:1:0", note: "B4", duration: "4n" },   // mu-da
      { time: "0:2:0", note: "A4", duration: "8n" },   // hu-
      { time: "0:2:2", note: "G4", duration: "8n" },   // ha-
      { time: "0:3:0", note: "A4", duration: "4n" },   // te
      { time: "1:0:0", note: "B4", duration: "2n" },   // baik baik

      // --- Jangan sampai dapat kulit durian (Am - D7 - G) ---
      { time: "2:0:0", note: "A4", duration: "8n" },   // Ja-
      { time: "2:0:2", note: "A4", duration: "8n" },   // ngan
      { time: "2:1:0", note: "A4", duration: "4n" },   // sam-pai
      { time: "2:2:0", note: "G4", duration: "8n" },   // da-
      { time: "2:2:2", note: "F#4", duration: "8n" },  // pat
      { time: "2:3:0", note: "G4", duration: "8n" },   // ku-
      { time: "2:3:2", note: "A4", duration: "8n" },   // lit
      { time: "3:0:0", note: "G4", duration: "2n" },   // du-rian

      // --- Reff: Huhate huhate baik baik (G - D7) ---
      { time: "4:0:0", note: "D5", duration: "4n" },   // Hu-
      { time: "4:1:0", note: "B4", duration: "4n" },   // ha-
      { time: "4:2:0", note: "D5", duration: "4n" },   // te
      { time: "4:3:0", note: "B4", duration: "4n" },   // hu-ha-te
      { time: "5:0:0", note: "A4", duration: "2n" },   // baik baik

      // --- Sioh jangan jangan paripi (G - Am7) ---
      { time: "6:0:0", note: "G4", duration: "4n" },   // Si-
      { time: "6:1:0", note: "G4", duration: "4n" },   // oh
      { time: "6:2:0", note: "B4", duration: "4n" },   // ja-
      { time: "6:3:0", note: "A4", duration: "4n" },   // ngan
      { time: "7:0:0", note: "G4", duration: "4n" },   // ja-
      { time: "7:1:0", note: "E4", duration: "4n" },   // ngan
      { time: "7:2:0", note: "D4", duration: "2n" },   // pa-ri-pi
    ]
    },
    folklore: {
      title: "Legenda Buaya Tembaga",
      story: "Dahulu kala, di sebuah desa di Maluku, hiduplah seorang pemuda yatim piatu yang sangat baik hati. Suatu hari, saat sedang mencari ikan di sungai, ia menemukan seekor bayi buaya yang terluka dan warnanya mengkilap seperti tembaga. Bukannya takut, pemuda itu justru merasa iba. Ia membawa bayi buaya itu pulang, mengobatinya, dan memberinya makan dengan tulus. Seiring berjalannya waktu, buaya itu tumbuh besar dan kulitnya semakin bercahaya keemasan. Karena ukurannya yang besar, pemuda itu membawanya kembali ke sungai. Namun, ikatan batin di antara mereka tidak terputus. Setiap kali sang pemuda berada dalam kesulitan atau ingin menyeberangi lautan menuju pulau lain, ia cukup memanggil sahabatnya itu. Suatu malam, sang pemuda ingin pergi merantau untuk mencari kehidupan yang lebih baik. Buaya Tembaga itu muncul dan berkata, 'Naiklah ke punggungku, kawan. Aku akan mengantarmu melewati ombak samudera yang paling besar sekalipun.' Dengan tenang, buaya itu berenang membelah lautan Maluku yang jernih di bawah sinar rembulan. Selama perjalanan, buaya itu menjaga sang pemuda agar tidak terkena percikan air sedikit pun. Sejak saat itu, masyarakat Maluku percaya bahwa Buaya Tembaga adalah penjaga laut yang akan menolong orang-orang berhati tulus. Hingga kini, buaya dianggap sebagai sosok 'saudara tua' bagi beberapa klan di Maluku. Pesan Moral: Kebaikan yang kita tanam kepada makhluk lain, sekecil apa pun itu, suatu saat akan kembali kepada kita dalam bentuk pertolongan yang luar biasa. Persahabatan sejati tidak mengenal perbedaan wujud. Pengarang: Anonim (Sastra Lisan/Tradisi Tutur Masyarakat Maluku).",
      videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/Folklore/Maluku%20-%20Legenda%20Buaya%20Tembaga.mp4",
      videoPosterUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Folklore/Maluku%20-%20Legenda%20Buaya%20Tembaga.jpg"
    },
    native: [
      { name: "Bahasa Melayu Ambon", endonim: "Basa Ambon", makna: "Merujuk pada identitas Pulau Ambon; secara linguistik merupakan bahasa kreol Melayu.", dialek: "Ambon Kota, Saparua, Haruku, Nusalaut.", detail: "Ambon, Kepulauan Lease, Seram Barat.", description: "Menjadi Lingua Franca utama di Maluku; telah menjadi bahasa ibu (mother tongue) bagi mayoritas penduduk perkotaan." },
      { name: "Bahasa Kei", endonim: "Veveu Evav", makna: "Veveu' (suara/bahasa) dan 'Evav' (nama asli Kepulauan Kei).", dialek: "Kei Kecil, Kei Besar, Tayando.", detail: "Kepulauan Kei (Maluku Tenggara).", description: "Memiliki tradisi hukum adat 'Larvul Ngabal' yang sangat kuat; bahasa ini masih sangat lestari dalam komunikasi harian." },
      { name: "Bahasa Buru", endonim: "Li Bupolo", makna: "Li' (bahasa) dan 'Bupolo' (nama asli Pulau Buru).", dialek: "Masarete, Wae Sama, Rana.", detail: "Pulau Buru.", description: "Digunakan secara luas oleh masyarakat pedalaman; memiliki sastra lisan yang kaya akan mitologi asal-usul manusia." },
      { name: "Bahasa Yamdena", endonim: "Liem Yamdena", makna: "Liem' (bahasa) dan 'Yamdena' (identitas pulau terbesar di Tanimbar).", dialek: "Yamdena Utara, Yamdena Selatan.", detail: "Kepulauan Tanimbar.", description: "Merupakan bahasa utama di Tanimbar; memiliki sistem vokal yang khas dan berbeda dengan bahasa-bahasa di Maluku Tengah." },
      { name: "Bahasa Alune", endonim: "Sapalewa", makna: "Sapalewa' merujuk pada lembah sungai Sapalewa, tempat asal-usul suku ini.", dialek: "Alune Tengah, Alune Barat.", detail: "Seram Bagian Barat.", description: "Suku Alune dikenal sebagai 'Manusia Tanah'; bahasa ini menyimpan sejarah migrasi kuno masyarakat Seram ke pulau-pulau sekitarnya." },
      { name: "Bahasa Wemale", endonim: "Wemale", makna: "Merujuk pada identitas klan atau kelompok etnis di pedalaman Seram.", dialek: "Wemale Timur, Wemale Barat.", detail: "Seram Bagian Barat dan Tengah.", description: "Berdekatan secara geografis dengan Alune, namun memiliki struktur bahasa yang berbeda; berstatus Rentan karena desakan Melayu Ambon." },
      { name: "Bahasa Fordata", endonim: "Vaaf Fordata", makna: "Vaaf' (bahasa) dan 'Fordata' (nama pulau di bagian utara Tanimbar).", dialek: "Fordata Utara, Fordata Selatan.", detail: "Kepulauan Tanimbar (Yaru, Larat).", description: "Menjadi bahasa pergaulan di wilayah Tanimbar Utara; memiliki kedekatan leksikal dengan bahasa-bahasa di Kepulauan Kei." },
      { name: "Bahasa Dobel", endonim: "Dobel", makna: "Merujuk pada wilayah dan klan Dobel di Kepulauan Aru.", dialek: "Dialek pesisir dan pedalaman.", detail: "Kepulauan Aru (Aru Tengah).", description: "Memiliki pengaruh fonologi yang unik; penuturnya sangat bergantung pada sumber daya laut dan hutan mangrove." },
      { name: "Bahasa Li Banda", endonim: "Li Banda", makna: "Merujuk pada identitas Pulau Banda, tempat asal penuturnya.", dialek: "Banda Eli, Banda Elat.", detail: "Pulau Kei Besar (Desa Banda Eli & Elat).", description: "Bahasa asli Banda ini 'mengungsi' ke Kei Besar setelah peristiwa genosida oleh VOC pada 1621; di Pulau Banda sendiri bahasa ini sudah punah." },
      { name: "Bahasa Geser-Gorom", endonim: "Basa Geser", makna: "Merujuk pada wilayah administratif dan etnis di Seram bagian Timur.", dialek: "Geser, Gorom, Seram Laut.", detail: "Seram Bagian Timur.", description: "Merupakan bahasa perdagangan kuno di wilayah Maluku Tengah; sangat dipengaruhi oleh istilah-istilah maritim." },
    ],
    community: [
      { name: "Bahasa Buton", endonim: "Bahasa Wolio", makna: "Wolio' merujuk pada pusat Kesultanan Buton di Sulawesi Tenggara.", dialek: "Dialek Buton Ambon.", detail: "Buru, Seram, dan Ambon.", description: "Penuturnya sangat masif di Maluku (terutama Pulau Buru); bahasa ini sering digunakan dalam aktivitas perdagangan dan pertanian." },
      { name: "Bahasa Bajo", endonim: "Bahasa Sama", makna: "Sama' bermakna 'sesama' atau 'manusia'; istilah kolektif masyarakat laut.", dialek: "Sama-Bajau Maluku.", detail: "Pesisir Seram dan Kepulauan Aru.", description: "Komunitas Bajo di Maluku tetap mempertahankan gaya hidup maritim dan menggunakan bahasa ini di pemukiman panggung mereka." },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada leluhur 'La Sattumpugi' dari Sulawesi Selatan.", dialek: "Bugis Pesisir.", detail: "Pusat perdagangan di Ambon, Kei, dan Aru.", description: "Tiba melalui jalur niaga hasil laut (teripang dan mutiara); komunitas ini telah terintegrasi dengan struktur ekonomi Maluku." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal pulau dan tanaman 'Yava' (jelai).", dialek: "Jawa Transmigrasi.", detail: "Unit Pemukiman Transmigrasi (UPT) di Pulau Buru dan Seram.", description: "Bahasa ini tetap hidup di kantong-kantong transmigrasi; sering berinteraksi dengan leksikon Melayu Ambon dalam kehidupan sosial." },
      { name: "Bahasa Makassar", endonim: "Basa Mangkasara'", makna: "Mangkasara' berarti 'mereka yang berjiwa terbuka'.", dialek: "Makassar Pesisir.", detail: "Kota Ambon dan Tual.", description: "Digunakan oleh keturunan pelaut Makassar yang memiliki sejarah panjang dalam pengangkutan rempah di wilayah Maluku." },
    ],
    foreign: [
      { name: "Bahasa Mandarin (Peranakan)", endonim: "Huayu / Hokkien", makna: "Hua' (Tionghoa) dan 'Yu' (bahasa); identitas etnis Tionghoa.", dialek: "Hokkien (dominan).", detail: "Kawasan Pecinan di Ambon dan Tual.", description: "Komunitas ini telah berasimilasi total secara linguistik; banyak yang menggunakan Melayu Ambon sebagai bahasa utama, namun tetap menjaga dialek asal." },
      { name: "Bahasa Arab (Peranakan)", endonim: "Lughah al-Arabiyyah", makna: "Arab' merujuk pada entitas geografis semenanjung Arab.", dialek: "Arab Hadrami.", detail: "Batumerah (Ambon) dan wilayah Seram Timur.", description: "Digunakan oleh keturunan Sayyid/Syarifah; bahasa ini sangat kuat pengaruhnya pada istilah keagamaan dan adat di Maluku Tengah." },
    ]
  },
  "Papua Barat": {
    capital: "Manokwari",
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/papua%20barat%20-%20martabak%20sagu.png",
    headerDescription: "Martabak Sagu",
    headerLongDescription: "Martabak sagu khas Provinsi Papua Barat memiliki rasa gurih dan sedikit manis dengan aroma khas sagu yang lembut. Teksturnya kenyal di dalam dan garing di luar saat dipanggang, menghadirkan sensasi unik di setiap gigitan. Kuliner tradisional ini menggugah selera sebagai sajian khas Papua Barat yang sederhana, mengenyangkan, dan kaya cita rasa lokal.",
    regionalSong: {
      title: "Diru Diru Nina",
      description: "Lagu yang lahir dari tradisi lisan suku Arfak yang secara linguistik merupakan senandung onomatope yang menggambarkan kelembutan kasih sayang antara sosok ibu dan anak. Liriknya memuat doa serta harapan mendalam bagi keselamatan anggota keluarga, mencerminkan ikatan batin yang sangat kuat dalam tatanan masyarakat pegunungan di Manokwari. Melalui komposisi anonim ini, melahirkan nilai ketulusan dan perlindungan emosional yang menjadi fondasi karakter bagi generasi muda di Papua Barat.",
      melodyNotes: [
      // --- Bait 1: Di ru di ru ni na o wa (Bar 0-2) ---
      { time: "0:0:0", note: "G4", duration: "8n" },   // 5
      { time: "0:0:2", note: "G4", duration: "8n" },   // 5
      { time: "0:1:0", note: "G4", duration: "8n" },   // 5
      { time: "0:1:2", note: "G4", duration: "8n" },   // 5
      { time: "0:2:0", note: "E4", duration: "8n" },   // 3
      { time: "0:2:2", note: "D4", duration: "8n" },   // 2
      { time: "1:0:0", note: "E4", duration: "2n" },   // 3 (Sustain)
      { time: "1:2:0", note: "D4", duration: "8n" },   // 2
      { time: "1:2:2", note: "E4", duration: "8n" },   // 3
      { time: "1:3:0", note: "D4", duration: "8n" },   // 2
      { time: "2:0:0", note: "C4", duration: "1n" },   // 1 (o wa)

      // --- Bait 2: Sa wa pe di ru ni na ni na o (Bar 3-6) ---
      { time: "3:0:0", note: "E4", duration: "8n" },   // 3
      { time: "3:0:2", note: "E4", duration: "8n" },   // 3
      { time: "3:1:0", note: "E4", duration: "8n" },   // 3
      { time: "3:1:2", note: "D4", duration: "8n" },   // 2
      { time: "3:2:0", note: "E4", duration: "8n" },   // 3
      { time: "3:2:2", note: "D4", duration: "8n" },   // 2
      { time: "4:0:0", note: "C4", duration: "2n" },   // 1
      { time: "4:2:0", note: "D4", duration: "8n" },   // 2
      { time: "4:2:2", note: "D4", duration: "8n" },   // 2
      { time: "5:0:0", note: "C4", duration: "1n" },   // 1
      { time: "6:0:0", note: "C4", duration: "4n" },   // 1 (End of phrase)

      // --- Bridge: A ma i ye nu si ru ma pe si re pe a (Bar 7-10) ---
      { time: "7:0:0", note: "G4", duration: "8n" },   // 5
      { time: "7:0:2", note: "G4", duration: "8n" },   // 5
      { time: "7:1:0", note: "G4", duration: "8n" },   // 5
      { time: "7:1:2", note: "A4", duration: "8n" },   // 6
      { time: "7:2:0", note: "A4", duration: "8n" },   // 6
      { time: "7:2:2", note: "A4", duration: "8n" },   // 6
      { time: "8:0:0", note: "G4", duration: "8n" },   // 5
      { time: "8:0:2", note: "A4", duration: "8n" },   // 6
      { time: "8:1:0", note: "G4", duration: "8n" },   // 5
      { time: "8:2:0", note: "E4", duration: "4n" },   // 3
      { time: "8:3:0", note: "G4", duration: "4n" },   // 5
      { time: "9:0:0", note: "A4", duration: "1n" },   // 6
      { time: "10:0:0", note: "A4", duration: "4n" },  // 6

      // --- Penutup: Sa wa pe di ru ni na ni na o (Bar 11-14) ---
      { time: "11:0:0", note: "G4", duration: "8n" },  // 5
      { time: "11:0:2", note: "G4", duration: "8n" },  // 5
      { time: "11:1:0", note: "G4", duration: "8n" },  // 5
      { time: "11:1:2", note: "D4", duration: "8n" },  // 2
      { time: "11:2:0", note: "E4", duration: "8n" },  // 3
      { time: "11:2:2", note: "D4", duration: "8n" },  // 2
      { time: "12:0:0", note: "C4", duration: "2n" },  // 1
      { time: "12:2:0", note: "D4", duration: "8n" },  // 2
      { time: "12:2:2", note: "D4", duration: "8n" },  // 2
      { time: "13:0:0", note: "C4", duration: "1n" },  // 1
      { time: "14:0:0", note: "C4", duration: "4n" },  // 1
    ]
    },
    folklore: {
      title: "Legenda Kweiya",
      story: "Dahulu kala, di daerah pegunungan Papua Barat, hiduplah seorang anak laki-laki bernama Kweiya. Ia tinggal bersama ibu dan adik-adik tirinya. Sayangnya, adik-adik tirinya sering bersikap tidak baik dan iri kepadanya. Karena tidak tahan, Kweiya memutuskan untuk menyendiri di hutan sambil memintal benang dari serat kayu. Suatu hari, saat ia sedang asyik bekerja, ibunya datang mencarinya ke dalam hutan. Sang ibu terkejut melihat Kweiya sudah hampir selesai menutupi tubuhnya dengan anyaman serat kayu yang halus menyerupai sayap. Kweiya kemudian berkata, 'Ibu, aku akan pergi ke tempat yang lebih tinggi di mana tidak ada lagi rasa iri hati. Aku akan berubah menjadi burung yang indah agar Ibu bisa melihatku dari jauh.' Perlahan, tubuh Kweiya berubah. Serat-serat kayu itu menjadi bulu-bulu yang sangat indah berwarna kuning keemasan dan cokelat tua. Kweiya lalu melompat ke dahan pohon yang tinggi dan terbang ke langit. Ibunya yang sedih kemudian ikut mengambil sisa serat kayu dan berubah menjadi burung betina agar bisa mendampingi anaknya. Itulah asal-usul Burung Cendrawasih. Mereka dikenal sebagai burung yang paling indah karena mereka adalah simbol dari ketulusan hati yang bertransformasi menjadi keindahan abadi di atas pepohonan Papua. Pesan Moral: Ketulusan dan kebaikan hati mungkin terkadang mendapat ujian, namun pada akhirnya ia akan membuahkan keindahan dan kemuliaan. Jagalah hubungan kasih sayang antara ibu dan anak karena itulah kekuatan yang paling besar. Pengarang: Anonim (Sastra Lisan/Tradisi Tutur Masyarakat Papua).",
      videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/Folklore/Papua%20Barat%20-%20Legenda%20Kweiya.mp4",
      videoPosterUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Folklore/Papua%20Barat%20-%20Legenda%20Kweiya.jpg"
    },
    native: [
      { name: "Bahasa Hatam", endonim: "Hatam", makna: "Merujuk pada identitas masyarakat asli pegunungan Arfak; 'Hatam' secara lokal berarti 'orang di sini'.", dialek: "Tinam, Miriei, Adihup.", detail: "Pegunungan Arfak, Manokwari.", description: "Berada dalam Filum Papua (Isolat); merupakan bahasa utama dalam pembangunan rumah adat 'Kaki Seribu'." },
      { name: "Bahasa Meyah", endonim: "Meax", makna: "Mey' (orang) dan 'Ah' (tempat/asli); bermakna 'orang yang berasal dari tanah ini'.", dialek: "Meyah Tengah, Meyah Pesisir.", detail: "Manokwari Utara dan Pegunungan Arfak.", description: "Memiliki sistem nada yang unik; masyarakatnya dikenal sangat ketat menjaga adat dan bahasa dalam struktur klan." },
      { name: "Bahasa Sougb", endonim: "Sougb", makna: "Merujuk pada kelompok etnis Sougb; secara linguistik berarti 'suara kami'.", dialek: "Sougb Tengah, Sougb Timur.", detail: "Kabupaten Manokwari Selatan dan Teluk Bintuni.", description: "Merupakan bahasa Filum Papua yang penuturnya tersebar luas di lereng gunung hingga wilayah pesisir selatan Arfak." },
      { name: "Bahasa Wamesa", endonim: "Wamesa", makna: "Berasal dari kata 'Wa' (perahu/jalan) dan 'Mesa' (satu); bermakna 'satu tujuan/perjalanan'.", dialek: "Windesi, Gura, Yaur.", detail: "Kabupaten Teluk Wondama dan Teluk Bintuni.", description: "Termasuk Rumpun Austronesia; bahasa ini memiliki pengaruh besar dalam lagu-lagu pujian gerejawi di wilayah Teluk Wondama." },
      { name: "Bahasa Biak", endonim: "Vurei Biak", makna: "Biak' berarti muncul atau terlihat; merujuk pada tanah yang tampak dari kejauhan di laut.", dialek: "Wardo, Numfor, Bosnik.", detail: "Manokwari Pesisir, Pulau Numfor, Pulau Rumberpon.", description: "Memiliki pengaruh maritim yang sangat kuat di seluruh pesisir Papua; dikenal dengan tradisi 'Wor' (nyanyian dan tarian ritual)." },
      { name: "Bahasa Mbaham", endonim: "Mbaham", makna: "Merujuk pada identitas etnis asli di wilayah semenanjung Bomberai.", dialek: "Mbaham Iba, Mbaham Tengah.", detail: "Kabupaten Fakfak.", description: "Penutur bahasa ini memiliki tradisi unik 'Satu Tungku Tiga Batu' yang mencerminkan harmoni lintas agama." },
      { name: "Bahasa Irarutu", endonim: "Irarutu", makna: "Ira' (suara/bahasa) dan 'Rutu' (orang/tempat); bermakna 'suara dari masyarakat setempat'.", dialek: "Irarutu Pesisir, Kuri.", detail: "Kabupaten Kaimana dan Teluk Bintuni.", description: "Merupakan bahasa Filum Papua; sangat kaya akan istilah-istilah yang berhubungan dengan navigasi sungai dan hutan mangrove." },
      { name: "Bahasa Kuri", endonim: "Nggahi Kuri", makna: "Nggahi' (bicara/bahasa) dan 'Kuri' merujuk pada wilayah hulu sungai Kuri.", dialek: "Dialek tunggal.", detail: "Kabupaten Teluk Bintuni.", description: "Berstatus Vulnerable (Waspada) karena jumlah penutur muda yang terus berkurang akibat pengaruh bahasa Melayu Papua." },
    ],
    community: [
      { name: "Bahasa Melayu Papua", endonim: "Bahasa Papua", makna: "Kreol Melayu yang mengalami lokalisasi fonologi dan leksikon Papua.", dialek: "Dialek Manokwari, Dialek Fakfak.", detail: "Seluruh pusat perkotaan dan pesisir.", description: "Menjadi Lingua Franca utama; dialek Fakfak sangat unik karena banyak menyerap kosa kata dari bahasa Mbaham dan Onin." },
      { name: "Bahasa Bugis / Buton", endonim: "Basa Ugi / Wolio", makna: "Merujuk pada asal usul etnis di Sulawesi; 'Ugi' (pengikut La Sattumpugi).", dialek: "Bugis Pesisir, Buton Fakfak.", detail: "Fakfak, Kaimana, dan Manokwari.", description: "Komunitas ini telah menetap di Fakfak sejak era perdagangan pala; mereka berkontribusi pada sejarah Islam di Papua Barat." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal pulau Jawa dan tanaman 'Yava' (jelai).", dialek: "Jawa Ngoko (Transmigrasi).", detail: "Distrik Prafi (Manokwari), Oransbari, dan wilayah Bintuni.", description: "Dibawa melalui program transmigrasi; bahasa ini tetap hidup berdampingan dengan bahasa lokal melalui asimilasi budaya pertanian." },
      { name: "Bahasa Toraja", endonim: "Basa Toraya", makna: "To' (orang) dan 'Riaja' (negeri di atas/utara).", dialek: "Dialek Sa'dan.", detail: "Manokwari dan Teluk Bintuni.", description: "Digunakan oleh komunitas perantau Sulawesi Selatan yang dominan bekerja di sektor jasa, konstruksi, dan pemerintahan." },
    ],
    foreign: [
      { name: "Bahasa Mandarin (Peranakan)", endonim: "Huayu", makna: "Hua' (Tionghoa) dan 'Yu' (bahasa); identitas etnis Tionghoa.", dialek: "Hokkien (pengaruh dominan).", detail: "Kawasan Pecinan Manokwari dan Fakfak.", description: "Komunitas Tionghoa (Toko) di Manokwari memiliki peran sejarah dalam distribusi logistik sejak masa administrasi Belanda." },
      { name: "Bahasa Arab (Peranakan)", endonim: "Lughah al-Arabiyyah", makna: "Arab' merujuk pada entitas geografis semenanjung Arab.", dialek: "Arab Hadrami.", detail: "Fakfak dan Kaimana.", description: "Digunakan oleh keturunan pedagang Yaman yang sangat berpengaruh dalam dakwah Islam dan adat di wilayah Bomberai." },
    ]
  },
  "Papua": {
    capital: "Jayapura",
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/papua%20-%20papeda.png",
    headerDescription: "Papeda",
    headerLongDescription: "Papeda khas Provinsi Papua memiliki rasa netral dan lembut yang menonjolkan keaslian sagu sebagai bahan utamanya. Teksturnya kenyal dan lengket, semakin nikmat saat disantap bersama kuah ikan kuning yang gurih dan segar. Hidangan tradisional ini menggugah selera sebagai makanan pokok Papua yang sederhana, sehat, dan sarat makna budaya.",
    regionalSong: {
      title: "Sajojo",
      description: "Lagu yang lahir dari tradisi lisan masyarakat Papua yang secara linguistik merujuk pada julukan bagi gadis cantik desa yang menjadi simbol pesona dan pusat perhatian dalam interaksi sosial. Liriknya menceritakan kekaguman kolektif para pemuda yang diwujudkan melalui tarian massal penuh kegembiraan sebagai bentuk perayaan atas keharmonisan warga di tengah pesta rakyat. Melalui ritme yang mengajak setiap orang untuk ikut menari, terkemas nilai persahabatan dan keramahtamahan menjadi sebuah identitas budaya yang sangat populer hingga ke kancah internasional.",
      melodyNotes: [
      // --- Bait 1: Sajojo, sajojo (E) ---
      { time: "0:0:0", note: "G#4", duration: "8n" },  // Sa-
      { time: "0:0:2", note: "G#4", duration: "8n" },  // jo-
      { time: "0:1:0", note: "B4", duration: "4n" },   // jo
      { time: "0:2:0", note: "G#4", duration: "8n" },  // sa-
      { time: "0:2:2", note: "G#4", duration: "8n" },  // jo-
      { time: "0:3:0", note: "B4", duration: "4n" },   // jo

      // --- Bait 1: Yumanampo miso papa na (A) ---
      { time: "1:0:0", note: "A4", duration: "8n" },   // Yu-
      { time: "1:0:2", note: "A4", duration: "8n" },   // ma-
      { time: "1:1:0", note: "A4", duration: "8n" },   // nam-
      { time: "1:1:2", note: "A4", duration: "8n" },   // po
      { time: "1:2:0", note: "B4", duration: "8n" },   // mi-
      { time: "1:2:2", note: "A4", duration: "8n" },   // so
      { time: "1:3:0", note: "G#4", duration: "8n" },  // pa-
      { time: "1:3:2", note: "F#4", duration: "8n" },  // pa na

      // --- Bait 1: Samuna muna muna keke (E - B7) ---
      { time: "2:0:0", note: "G#4", duration: "8n" },  // Sa-
      { time: "2:0:2", note: "G#4", duration: "8n" },  // mu-
      { time: "2:1:0", note: "G#4", duration: "8n" },  // na
      { time: "2:1:2", note: "G#4", duration: "8n" },  // mu-
      { time: "2:2:0", note: "F#4", duration: "8n" },  // na
      { time: "2:2:2", note: "F#4", duration: "8n" },  // mu-
      { time: "2:3:0", note: "F#4", duration: "8n" },  // na
      { time: "3:0:0", note: "E4", duration: "2n" },   // ke-ke

      // --- Bagian Kuserai: Kuserai, kusase rai rai (A - E) ---
      { time: "4:0:0", note: "A4", duration: "4n" },   // Ku-
      { time: "4:1:0", note: "A4", duration: "4n" },   // se-
      { time: "4:2:0", note: "A4", duration: "8n" },   // rai
      { time: "4:2:2", note: "B4", duration: "8n" },   // ku-
      { time: "4:3:0", note: "C#5", duration: "4n" },  // sa-se
      { time: "5:0:0", note: "B4", duration: "2n" },   // rai rai...
    ]
    },
    folklore: {
      title: "Legenda Naga dan Danau Sentani",
      story: "Dahulu kala, di sebuah wilayah yang dikelilingi perbukitan hijau di Papua, hiduplah seekor naga yang sangat besar dan sakti. Naga ini bukanlah naga yang jahat, melainkan penjaga alam yang sangat dihormati. Konon, naga tersebut memiliki sisik yang berkilauan seperti zamrud dan mata sebiru langit. Suatu hari, naga tersebut merasakan bumi sedang sangat panas dan kering. Rakyat dan hewan-hewan di sekitarnya mulai kehausan. Melihat hal itu, sang naga memutuskan untuk memberikan sesuatu yang berharga dari dirinya. Ia melingkarkan tubuhnya yang raksasa di antara perbukitan dan mulai mengeluarkan air yang jernih dari balik sisik-sisiknya. Air tersebut mengalir dengan tenang, perlahan memenuhi lembah-lembah di antara bukit hingga membentuk sebuah danau yang sangat besar dan tenang. Naga itu kemudian tertidur dengan damai di dasar danau, dan tubuhnya yang melengkung membentuk pulau-pulau kecil yang kini menghiasi Danau Sentani. Masyarakat percaya bahwa ketenangan air danau tersebut adalah cerminan dari tidurnya sang naga. Hingga kini, Danau Sentani menjadi sumber kehidupan yang memberikan kedamaian bagi penduduk Papua di sekitarnya. Pesan Moral: Pengorbanan yang tulus untuk kepentingan orang banyak akan selalu diingat dan membawa keberkahan abadi. Alam adalah pemberi kehidupan yang harus kita jaga dan hormati sebagaimana ia menjaga kita. Pengarang: Anonim (Sastra Lisan/Tradisi Tutur Masyarakat Suku Sentani di Papua).",
      videoUrl: "https://github.com/mawwyncha/teduh.aksara/raw/refs/heads/main/contents/Folklore/Papua%20-%20Legenda%20Naga%20dan%20Danau%20Sentani.mp4",
      videoPosterUrl: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Folklore/Papua%20-%20Legenda%20Naga%20dan%20Danau%20Sentani.jpg"
    },
    native: [
      { name: "Bahasa Sentani", endonim: "Buyaka", makna: "Buy' (gunung/tanah) dan 'Aka' (asli/nyata); bermakna 'bahasa asli dari tanah ini'.", dialek: "Sentani Timur, Tengah, Barat.", detail: "Sekitar Danau Sentani, Kabupaten Jayapura.", description: "Termasuk Filum Papua; memiliki tradisi seni lukis kulit kayu 'Khombouw' yang narasinya sering tertuang dalam dialek lokal." },
      { name: "Bahasa Biak", endonim: "Vurei Biak", makna: "Biak' berarti muncul atau tampak; merujuk pada tanah yang muncul dari permukaan laut.", dialek: "Bosnik, Wardo, Numfor, Betaf.", detail: "Pulau Biak, Supiori, dan pesisir utara Papua.", description: "Rumpun Austronesia; penuturnya dikenal sebagai navigator handal yang menyebarkan pengaruh bahasanya hingga ke Kepulauan Raja Ampat." },
      { name: "Bahasa Tobati (Yotafa)", endonim: "Yotafa", makna: "Yo' (kampung) dan 'Tafa' (area/lokasi); merujuk pada masyarakat yang tinggal di teluk.", dialek: "Dialek tunggal.", detail: "Teluk Youtefa, Kota Jayapura.", description: "Berstatus Terancam Punah; bahasa ini memiliki hubungan erat dengan ekosistem hutan mangrove dan kearifan lokal pengelolaan laut di Jayapura." },
      { name: "Bahasa Bauzi", endonim: "Bauzi", makna: "Merujuk pada identitas klan atau kelompok etnis yang mendiami belantara Mamberamo.", dialek: "Dialek hulu dan hilir sungai.", detail: "Kabupaten Mamberamo Raya.", description: "Filum Papua; suku penuturnya dikenal sebagai 'Master of Survival' di hutan hujan tropis dan masih sangat menjaga bahasa ibu mereka." },
      { name: "Bahasa Waropen", endonim: "Wapo", makna: "Wapo' secara linguistik merujuk pada masyarakat pesisir yang mendiami wilayah rawa.", dialek: "Waropen Ambaidiru, Waropen Kai.", detail: "Kabupaten Waropen dan Kepulauan Yapen", description: "Rumpun Austronesia; bahasa ini memiliki keterkaitan leksikal dengan bahasa-bahasa di Maluku Utara karena sejarah perdagangan maritim." },
      { name: "Bahasa Sko", endonim: "Tumawo", makna: "Merujuk pada identitas masyarakat perbatasan di pesisir utara dekat Papua Nugini.", dialek: "Dialek pesisir.", detail: "Distrik Muara Tami, Kota Jayapura.", description: "Merupakan bagian dari Filum Sko yang memiliki sistem nada (tonal); fenomena ini sangat jarang ditemukan dalam bahasa-bahasa di Indonesia." },
      { name: "Bahasa Ambai", endonim: "Ambai", makna: "Merujuk pada nama pulau Ambai yang terletak di Teluk Cendrawasih.", dialek: "Dialek Ambai, Randawaya.", detail: "Kepulauan Yapen.", description: "Rumpun Austronesia; penuturnya sangat aktif menggunakan bahasa ini dalam lagu-lagu tradisional dan upacara gerejawi lokal." },
    ],
    community: [
      { name: "Bahasa Melayu Papua", endonim: "Bahasa Papua", makna: "Kreol Melayu yang mengalami adaptasi fonologi dan penyerapan kata lokal Papua.", dialek: "Dialek Jayapura, Dialek Serui.", detail: "Seluruh pusat perkotaan dan area publik.", description: "Menjadi Lingua Franca utama; digunakan sebagai bahasa pemersatu antar ratusan suku asli Papua yang memiliki bahasa berbeda." },
      { name: "Bahasa Bugis / Makassar", endonim: "Basa Ugi / Mangkasara'", makna: "Merujuk pada identitas etnis pelaut dan pedagang asal Sulawesi Selatan.", dialek: "Bugis Pesisir.", detail: "Jayapura, Biak, dan pelabuhan-pelabuhan kecil.", description: "Tiba sejak masa prakolonial hingga modern; bahasa ini sangat dominan digunakan dalam interaksi pasar tradisional dan sektor logistik." },
      { name: "Bahasa Buton", endonim: "Bahasa Wolio", makna: "Wolio' merujuk pada pusat Kesultanan Buton sebagai asal muasal identitas.", dialek: "Dialek Buton Papua.", detail: "Area pemukiman pesisir di Jayapura dan Sarmi.", description: "Komunitas Buton memiliki sejarah panjang sebagai penyedia komoditas hasil tani dan laut di wilayah perkotaan Papua." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal pulau Jawa; 'Jowo' (tanah yang subur).", dialek: "Jawa Ngoko (Transmigrasi).", detail: "Wilayah Koya (Jayapura), Nimbokrang, dan Sarmi.", description: "Berkembang melalui transmigrasi; bahasa ini tetap lestari di kantong-kantong pertanian dan sering bercampur dengan kosa kata Melayu Papua." },
      { name: "Bahasa Toraja", endonim: "Basa Toraya", makna: "To' (orang) dan 'Riaja' (negeri di atas atau bagian utara).", dialek: "Dialek Sa'dan.", detail: "Kota Jayapura dan Kabupaten Jayapura.", description: "Digunakan secara aktif dalam persekutuan keluarga dan gereja; komunitas Toraja memiliki kontribusi besar dalam sektor jasa dan profesional." },
    ],
    foreign: [
      { name: "Bahasa Mandarin (Peranakan)", endonim: "Huayu / Hokkien", makna: "Hua' (Tionghoa) dan 'Yu' (bahasa); identitas etnis Tionghoa perantauan.", dialek: "Hokkien (pengaruh kuat) dan Mandarin.", detail: "Kawasan perdagangan Kota Jayapura.", description: "Komunitas Tionghoa di Jayapura memiliki sejarah akulturasi yang kuat, di mana bahasa Mandarin sering bercampur dengan Melayu Papua (Papindo)." },
      { name: "Bahasa Arab (Peranakan)", endonim: "Lughah al-Arabiyyah", makna: "Arab' merujuk pada identitas etnis dan geografis semenanjung Arab.", dialek: "Arab Hadrami.", detail: "Kampung Arab (Jayapura).", description: "Digunakan oleh keturunan Yaman yang berperan dalam sejarah syiar Islam dan perdagangan hasil bumi di pesisir utara Papua." },
    ]
  }
};