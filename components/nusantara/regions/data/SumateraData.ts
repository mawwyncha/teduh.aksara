
import { ProvinceData } from '../../ProvinceInterfaces';

export const PROVINCE_DIALECTS: Record<string, ProvinceData> = {
  "Daerah Istimewa Aceh": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/aceh%20-%20mi%20aceh.png",
    headerDescription: "Mi Aceh",
    headerLongDescription: "Mi Aceh menghadirkan rasa gurih pedas yang kaya dari rempah-rempah khas Aceh yang kuat dan aromatik. Kuahnya kental dengan sentuhan kari yang hangat, berpadu sempurna dengan mi tebal dan isian daging atau seafood. Setiap suapan terasa bold, pedas menggigit, dan bikin ketagihan.",
    regionalSong: {
      title: "Bungong Jeumpa",
      description: "Pencipta lagu Bungong Jeumpa adalah Ibrahim Abduh. Arti Nama 'Bungong Jeumpa' berarti bunga cempaka, yang merupakan bunga kebanggaan sekaligus simbol keindahan bagi masyarakat Aceh.",
      audioUrl: "https://www.youtube.com/watch?v=JdVUvtY1eVk"
    },
    native: [
      { name: "Bahasa Aceh", endonim: "Bahsa Acèh", makna: "Merujuk pada identitas etnis 'Aceh'; secara linguistik berkerabat dengan bahasa Cham.", dialek: "Multidialek: Rayeuk, Pidie, Matang, Meulaboh, dan Daya. Variasi muncul karena luasnya cakupan wilayah (ref: Kemendikbud).", detail: "Pesisir Utara, Timur, dan Barat.", description: "Satu-satunya bahasa di Sumatera yang berkerabat dekat dengan bahasa Cham di Vietnam/Kamboja." },
      { name: "Bahasa Gayo", endonim: "Basa Gayo", makna: "'Gayo' berarti takut/melarikan diri, merujuk pada isolasi kelompok ke pegunungan.", dialek: "Multidialek: Lut, Deret, Lues, Serbejadi, dan Kalul. Perbedaan dialek dipicu oleh isolasi geografis pegunungan (ref: Kemendikbud).", detail: "Aceh Tengah, Bener Meriah, Gayo Lues.", description: "Memiliki tradisi Didong (seni vokal/sastra lisan) yang sangat kuat." },
      { name: "Bahasa Alas", endonim: "Cakap Alas", makna: "'Alas' berarti tikar/dasar, merujuk pada posisi mereka di lembah sungai.", dialek: "Homogen: Hanya memiliki variasi intonasi ringan (Hulu/Hilir) karena wilayah tuturnya mengumpul di satu lembah (ref: Kemendikbud).", detail: "Kabupaten Aceh Tenggara.", description: "Memiliki kekerabatan linguistik dengan rumpun Batak (Karo/Pakpak)." },
      { name: "Bahasa Singkil", endonim: "Cakap Singkil", makna: "Nama toponim (tempat) yang merujuk pada wilayah sungai dan pesisir selatan.", dialek: "Homogen: Tidak memiliki dialek yang terdiferensiasi karena mobilitas penduduk yang tinggi di jalur sungai (ref: Kemendikbud).", detail: "Aceh Singkil dan Kota Subulussalam.", description: "Merupakan bagian dari rumpun bahasa Boang." },
      { name: "Bahasa Devayan", endonim: "Bahsa Devayan", makna: "Nama etnis lokal yang menghuni bagian tengah dan selatan Pulau Simeulue.", dialek: "Homogen: Wilayah tutur sempit di kepulauan mencegah munculnya dialek yang berbeda (ref: Kantor Bahasa Aceh).", detail: "Simeulue Tengah, Timur, dan Selatan.", description: "Memiliki istilah Smong (tsunami) yang digunakan sejak 1907." },
      { name: "Bahasa Sigulai", endonim: "Bahsa Sigulai", makna: "Identitas linguistik kelompok masyarakat Simeulue bagian Utara.", dialek: "Homogen: Digunakan oleh komunitas yang terkonsentrasi di ujung pulau tanpa sekat geografis internal (ref: Kantor Bahasa Aceh).", detail: "Simeulue Utara dan Alafan.", description: "Sangat berbeda secara leksikostatistik dengan bahasa Devayan." },
      { name: "Bahasa Lekon", endonim: "Bahsa Lekon", makna: "Merujuk pada identitas spesifik masyarakat Desa Lekon.", dialek: "Sangat Homogen: Hanya dituturkan di dua desa; tidak ada ruang untuk variasi dialektal (ref: Kemendikbud).", detail: "Kecamatan Alafan (Simeulue).", description: "Hampir Punah. Penutur asli hanya tersisa ratusan orang." },
      { name: "Bahasa Haloban", endonim: "Bahsa Haloban", makna: "Nama toponim yang merujuk pada Pulau Haloban di gugusan Pulau Banyak.", dialek: "Sangat Homogen: Wilayah tuturnya hanya mencakup pulau-pulau kecil yang berdekatan (ref: Kemendikbud).", detail: "Pulau Banyak Barat (Aceh Singkil).", description: "Salah satu bahasa dengan penutur paling sedikit di Indonesia Barat." },                  
    ],
    community: [
      { name: "Bahasa Aneuk Jamee", endonim: "Bahaso Jamee", makna: "‘Anak Tamu’, merujuk pada pendatang Minangkabau yang menetap lama.", detail: "Aceh Selatan, Abdya, dan Aceh Barat.", description: "Hasil akulturasi budaya Minang-Aceh sejak abad ke-17." },
      { name: "Bahasa Melayu Tamiang", endonim: "Bahase Tamiang", makna: "‘Tamiang’ berarti perisai (daun tamiang) dalam legenda sejarah.", detail: "Kabupaten Aceh Tamiang.", description: "Fonetiknya memiliki kemiripan dengan dialek Kedah, Malaysia." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Identitas etnis asal pulau Jawa.", detail: "Nagan Raya, Bener Meriah, Langsa.", description: "Dibawa melalui program transmigrasi sejak era kolonial Belanda." },
      { name: "Bahasa Batak", endonim: "Hata Batak", makna: "Identitas kolektif kelompok etnis Batak.", detail: "Aceh Tenggara dan Singkil.", description: "Digunakan secara aktif di daerah perbatasan darat Sumatera Utara." },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Merujuk pada legenda ‘Kemenangan Kerbau’.", detail: "Kota-kota pelabuhan pesisir barat.", description: "Berbeda dengan Aneuk Jamee; ini adalah penutur migran ekonomi kontemporer." },
    ],
    foreign: [
      { name: "Bahasa Tionghoa (Hokkien)", endonim: "Lán-lâng-oè", makna: "Secara harfiah berarti ‘Bahasa kita orang’.", dialek: "Homogen: Dialek Hokkien yang disesuaikan dengan lingkungan Melayu-Aceh (ref: Kemendikbud).", detail: "Kawasan Pecinan di Banda Aceh dan Lhokseumawe.", description: "Digunakan secara eksklusif dalam lingkungan internal keluarga dan bisnis." },
      { name: "Bahasa Arab", endonim: "Lughah al-`Arabiyyah", makna: "‘Bahasa Bangsa Arab’.", dialek: "Homogen (Fungsional): Terbatas pada istilah keagamaan dan sapaan kekeluargaan (ref: Kemendikbud).", detail: "Komunitas Keturunan Arab di Banda Aceh.", description: "Berfungsi sebagai penanda identitas sosial dan bahasa ritual keagamaan." },
      { name: "Bahasa Tamil", endonim: "Tamil Moli", makna: "‘Bahasa Bangsa Tamil’.", dialek: "Sisa Linguistik: Tidak lagi membentuk dialek karena penuturnya hampir sepenuhnya berasimilasi (ref: Kemendikbud).", detail: "Gampong Jawa dan Punge (Banda Aceh).", description: "Kritis. Hanya tersisa pada sisa-sisa kosakata kuliner dan adat tertentu." },
    ]
  },
  "Sumatera Utara": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/sumut%20-%20bika%20ambon.png",
    headerDescription: "Bika Ambon",
    headerLongDescription: "Bika Ambon khas Sumatera Utara memiliki rasa manis legit dengan aroma pandan dan santan yang harum menggoda. Teksturnya kenyal berongga, lembut di mulut, dan terasa unik di setiap gigitan. Perpaduan rasa manis dan gurihnya meninggalkan sensasi lezat yang bikin ingin terus menyantapnya.",
    regionalSong: {
      title: "Alusi Au",
      description: "Lagu Alusi Au adalah lagu daerah dari Sumatera Utara yang diciptakan oleh komponis ternama Batak, Nahum Situmorang. Secara harfiah, judul lagu ini berarti 'Jawablah Aku' (alusi berarti jawab, au berarti aku). ",
      audioUrl: "https://www.youtube.com/watch?v=usv-Yr2d-dU"
    },
    native: [
      { name: "Bahasa Batak Toba", endonim: "Hata Batak Toba", makna: "", dialek: "Multidialek: Samosir, Silindung, Humbang, dan Toba. Variasi muncul karena isolasi geografis di sekitar kaldera (ref: Kemendikbud).", detail: "Toba, Samosir, Humbang Hasundutan, Tapanuli Utara.", description: "Memiliki aksara sendiri (Surat Batak). Status: Sangat mantap dan digunakan secara luas." },
      { name: "Bahasa Batak Mandailing", endonim: "Hata Mandailing", makna: "", dialek: "Multidialek: Mandailing Julu dan Mandailing Godang. Perbedaan pada intonasi dan beberapa leksikon (ref: Kemendikbud).", detail: "Mandailing Natal, Tapanuli Selatan, Padang Lawas.", description: "Dikenal dengan sastra lisan Puri-Puri dan instrumen Gordang Sambilan." },
      { name: "Bahasa Batak Karo", endonim: "Cakap Karo", makna: "", dialek: "Multidialek: Terbagi atas dialek Singalor Lau dan Gunung-Gunung (ref: Kemendikbud).", detail: "Kabupaten Karo, Langkat, Deli Serdang.", description: "Memiliki tradisi Pesta Mejuah-juah. Bahasa ini memiliki fonologi yang sangat khas dibanding rumpun Batak lainnya." },
      { name: "Bahasa Batak Pakpak", endonim: "Cakap Pakpak", makna: "", dialek: "Multidialek: Boang, Pegagan, Kelasen, Simsim, dan Keppas. Perbedaan dipicu pemisahan wilayah ulayat (ref: Kemendikbud).", detail: "Dairi dan Pakpak Bharat.", description: "Memiliki tradisi sastra lisan Odong-odong. Status: Terjaga di wilayah basis." },
      { name: "Bahasa Batak Simalungun", endonim: "Sahap Simalungun", makna: "", dialek: "Homogen: Variasi dialek sangat minim karena mobilitas antarwilayah yang cukup cair (ref: Kemendikbud).", detail: "Kabupaten Simalungun dan Pematangsiantar.", description: "Memiliki struktur tata krama bahasa yang sangat halus." },
      { name: "Bahasa Nias", endonim: "", makna: "Li Niha", dialek: "Multidialek: Nias Utara, Nias Selatan, dan Nias Tengah. Perbedaan sangat tajam secara leksikal (ref: Kemendikbud).", detail: "Pulau Nias dan kepulauan sekitarnya.", description: "Memiliki tradisi Fahombo (Lompat Batu). Merupakan bahasa yang secara genetis cukup unik di Sumatera." },
      { name: "Bahasa Melayu", endonim: "", makna: "Bahase Melayu", dialek: "Multidialek: Deli, Langkat, Serdang, dan Asahan. Perbedaan dipengaruhi oleh pengaruh kesultanan setempat (ref: Kemendikbud).", detail: "Sepanjang pesisir timur (Medan, Langkat, Asahan, Batu Bara).", description: "Merupakan bahasa prestise dalam sejarah kesultanan-kesultanan di Sumatera Utara." },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Identitas etnis asal Pulau Jawa.", dialek: "Dialek Perantau: Menggunakan dialek ‘Jawa Deli’ yang merupakan campuran Jawa Tengah/Timur dengan kosa kata lokal (ref: Kemendikbud).", detail: "Deli Serdang, Langkat, Serdang Bedagai (wilayah perkebunan).", description: "Dibawa oleh kuli kontrak perkebunan di masa kolonial. Muncul istilah ‘Pujakesuma’ (Putra Jawa Kelahiran Sumatera)." },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Merujuk pada legenda kemenangan kerbau.", dialek: "Homogen/Pesisir: Umumnya menggunakan dialek Minang Pesisir atau dialek standar perdagangan (ref: BPS Sumut).", detail: "Kota Medan, Sibolga, dan pesisir barat Sumatera Utara.", description: "Di Sibolga, terjadi asimilasi dengan bahasa lokal menjadi dialek ‘Pesisir’ yang unik." },
      { name: "Bahasa Aceh", endonim: "Bahsa Acèh", makna: "Merujuk pada identitas etnis asal Aceh.", dialek: "Homogen: Dialek perantau yang masih mempertahankan struktur asli namun menyerap kosa kata pasar (ref: Peta Bahasa).", detail: "Medan (Kawasan Aceh Sepakat) dan wilayah perbatasan Langkat.", description: "Digunakan secara aktif dalam komunitas dagang dan keagamaan di perkotaan." },
    ],
    foreign: [
      { name: "Bahasa Tionghoa (Hokkien)", endonim: "Lán-nâng-oè", makna: "Berarti ‘Bahasa orang kita’.", dialek: "Dialek Medan: Merupakan varian Hokkien yang sangat khas (Hokkien Medan), menyerap banyak kosa kata Melayu/Indonesia (ref: Kemendikbud).", detail: "Kota Medan, Binjai, Pematangsiantar.", description: "Hokkien Medan dianggap unik karena penggunaannya yang masif dan pengaruh serapannya yang timbal balik dengan bahasa Indonesia." },
      { name: "Bahasa Tamil", endonim: "Tamil moli", makna: "Berarti ‘Bahasa yang murni’ atau ‘Manis’.", dialek: "Homogen: Digunakan oleh keturunan India Selatan; variasi dialek tidak signifikan di perantauan (ref: BPS Sumut).", detail: "Kota Medan (Kampung Madras).", description: "Digunakan oleh komunitas India-Indonesia terutama dalam ritual keagamaan Hindu dan di lingkungan keluarga." },
    ]
  },
  "Sumatera Barat": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/sumbar%20-%20rendang.jpg",
    headerDescription: "Rendang Sapi",
    headerLongDescription: "Rendang sapi memiliki rasa gurih yang dalam dan kompleks, berpadu antara santan kental, rempah-rempah hangat, serta sentuhan pedas yang meresap hingga ke serat daging. Dagingnya empuk, kaya aroma serai, lengkuas, dan daun jeruk, dengan lapisan rasa yang semakin kuat di setiap kunyahan. Hidangan khas Minangkabau ini bukan sekadar makanan, melainkan pengalaman rasa yang memanjakan lidah dan meninggalkan kesan tak terlupakan.",
    regionalSong: {
      title: "Ayam Den Lapeh",
      description: "Ayam Den Lapeh adalah lagu ciptaan Nuskan Syarif. Judulnya berarti “ayam saya lepas” yang melambangkan kehilangan sesuatu yang sangat berharga. Lagu ini menceritakan kesedihan dan penyesalan akibat kehilangan orang yang dicintai atau kegagalan dalam cinta.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Merujuk pada identitas etnis ‘Minang’ (Menang) dan ‘Kabau’ (Kerbau); secara linguistik berkerabat dekat dengan bahasa Melayu.", dialek: "Multidialek: Agam, Tanah Datar, Lima Puluh Kota, Pesisir, dan lainnya. Variasi sangat tinggi karena faktor geografis ‘Luhak nan Tigo’ (ref: Kemendikbud).", detail: "Seluruh wilayah daratan Sumatera Barat.", description: "Memiliki sistem kekerabatan Matrilineal terbesar di dunia. Status: Stabil namun terancam oleh penggunaan Bahasa Indonesia di perkotaan (ref: Badan Bahasa)." },
      { name: "Bahasa Mentawai", endonim: "Galigi / Paeruk", makna: "Bermakna ‘Jiwa’ atau ‘Manusia’; mencerminkan hubungan spiritual masyarakat dengan alam.", dialek: "Multidialek: Siberut Selatan, Siberut Utara, Sipora, dan Pagai. Perbedaan dialek cukup tajam antar pulau (ref: Kemendikbud).", detail: "Kepulauan Mentawai (Siberut, Sipora, Pagai).", description: "Suku Mentawai memiliki tradisi tato tertua di dunia. Status: Aktif digunakan sebagai bahasa ibu di pedalaman." },
    ],
    community: [
      { name: "Bahasa Batak", endonim: "Hata Batak", makna: "Identitas kolektif kelompok etnis Batak; secara linguistik merujuk pada rumpun bahasa Sumatera Barat Laut.", dialek: "Multidialek: Dominan dialek Mandailing dan Toba. Terjadi interferensi bahasa Minang di wilayah perbatasan (ref: BPS Sumbar).", detail: "Pasaman, Pasaman Barat, dan wilayah perbatasan Sumut.", description: "Dialek Mandailing di Pasaman sering dianggap sebagai jembatan budaya antara Minang dan Batak." },
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Identitas etnis asal Pulau Jawa.", dialek: "Dialek Perantau: Menggunakan dialek Jawa Tengah atau Jawa Timur yang telah mengalami simplifikasi (ref: Kemendikbud).", detail: "Dharmasraya, Pasaman Barat, dan Solok Selatan.", description: "Dibawa melalui program transmigrasi. Muncul fenomena bilingualisme yang kuat pada generasi kedua." },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Berasal dari akar kata ‘Sund’ yang berarti cahaya atau bersih.", dialek: "Homogen: Menggunakan dialek standar (Priangan) yang digunakan terbatas dalam lingkup domestik (ref: Kantor Bahasa Sumbar).", detail: "Wilayah transmigrasi di Sitiung (Dharmasraya) dan Lunang Silaut.", description: "Dipergunakan untuk menjaga kohesi sosial sesama perantau asal Jawa Barat." },
    ],
    foreign: [
      { name: "Bahasa Tionghoa (Hokkien)", endonim: "Lán-nâng-oè", makna: "Berarti ‘Bahasa orang kita’; merujuk pada identitas kelompok imigran asal Fujian.", dialek: "Kreol/Homogen: Dikenal sebagai dialek ‘Hokkien Padang’ yang telah bercampur dengan kosakata Minang (ref: Kemendikbud).", detail: "Kawasan Pondok, Kota Padang.", description: "Memiliki intonasi unik yang sangat dipengaruhi dialek Minang pesisir. Status: Stabil di komunitas perdagangan." },
      { name: "Bahasa Tamil", endonim: "Tamil moli", makna: "Berarti ‘Bahasa yang murni’ atau ‘Suara yang manis’.", dialek: "Homogen: Digunakan oleh komunitas kecil tanpa variasi dialek yang signifikan di perantauan (ref: BPS Sumbar).", detail: "Kawasan Kampung Keling, Kota Padang.", description: "Dituturkan oleh komunitas keturunan India (Keling). Status: Terancam Punah (Moribund) karena hanya tersisa di generasi tua." },
    ]
  },
  "Riau": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/riau%20-%20gulai%20tepek%20ikan.png",
    headerDescription: "Gulai Tepek Ikan",
    headerLongDescription: "Gulai tepek ikan khas Provinsi Riau menghadirkan rasa gurih santan yang lembut dengan sentuhan rempah Melayu yang harum dan menenangkan. Tepek ikan berbahan ikan sungai terasa kenyal dan ringan, menyerap kuah gulai yang kaya rasa hingga setiap suapan begitu nikmat. Hidangan tradisional ini menggugah selera sebagai sajian hangat yang sederhana, autentik, dan penuh kelezatan khas Riau.",
    regionalSong: {
      title: "Soleram",
      description: "Soleram adalah lagu daerah dari Provinsi Riau yang berasal dari tradisi Melayu, dengan pencipta yang tidak diketahui karena diwariskan secara turun-temurun. Judul Soleram merupakan ungkapan lembut khas Melayu yang digunakan sebagai pengantar nasihat. Lagu ini menceritakan pesan moral tentang kasih sayang, sopan santun, dan budi pekerti yang diajarkan orang tua kepada anak.",
      audioUrl: ""
    },    
    native: [
      { name: "Bahasa Melayu", endonim: "Bahaso Melayu", makna: "Berasal dari kata ‘Layuh’ (rendah hati) atau sungai Melayu. (ref: Kemendikbud)", dialek: "Dialek Riau Pesisir, Riau Daratan, Kampar, Rokan, Lingga.", detail: "Seluruh Kabupaten/Kota di Riau.", description: "Menjadi dasar Bahasa Indonesia. Memiliki tradisi Sastra Lisan ‘Sijobang’ di wilayah Kampar. (ref: Kemendikbud)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "‘Minang’ (Menang) & ‘Kabau’ (Kerbau), merujuk pada legenda adu kerbau. (ref: Kemendikbud)", dialek: "Dialek Kampar (sering disebut Bahasa Ocu), Kuantan.", detail: "Kampar, Kuantan Singingi, Rokan Hulu.", description: "Dialek Ocu sering dianggap bahasa mandiri oleh penuturnya karena perbedaan intonasi yang signifikan dari Minang Padang. (ref: Disbud Riau)" },
      { name: "Bahasa Hokkien (Riau)", endonim: "Lán-lâng-oè", makna: "Secara harfiah berarti ‘Bahasa kita’. (ref: Kemendikbud)", dialek: "Dialek Bagansiapiapi, Dialek Selatpanjang.", detail: "Rokan Hilir, Kepulauan Meranti.", description: "Merupakan bahasa komunitas Tionghoa tertua di Riau yang bercampur dengan kosakata Melayu lokal (Bahasa Peranakan). (ref: Kemendikbud)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Basa Jawa", makna: "Berasal dari kata ‘Jawa’ yang merujuk pada pulau asal penuturnya. (ref: Kemendikbud)", dialek: "Dialek Jawa Ngoko, Jawa Timur.", detail: "Wilayah Transmigrasi (Siak, Pelalawan, Indragiri Hilir).", description: "Muncul akibat program transmigrasi nasional. Sering terjadi asimilasi bahasa menjadi ‘Jawa-Riau’. (ref: Kemendikbud)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada kata ‘La Mellong’ (To Ugi), nama raja pertama. (ref: Kemendikbud)", dialek: "Dialek Bone, Dialek Soppeng.", detail: "Indragiri Hilir (Tembilahan), Pesisir Indragiri Hulu.", description: "Penutur Bugis di Riau dikenal sebagai pelaut ulung yang membangun pemukiman di sepanjang sungai dan pesisir. (ref: Kemendikbud)" },
      { name: "Bahasa Batak", endonim: "Hata Batak", makna: "Secara etimologi merujuk pada identitas etnis di pegunungan Sumatra Utara. (ref: Kemendikbud)", dialek: "Dialek Toba, Dialek Mandailing.", detail: "Pekanbaru, Duri (Bengkalis), Rokan Hulu.", description: "Dialek Mandailing memiliki kemiripan kosa kata dengan Melayu, memudahkan asimilasi di wilayah perbatasan. (ref: Kemendikbud)" },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Dari kata ‘Sunda’ (Cahaya/Putih/Bersih). (ref: Kemendikbud)", dialek: "Dialek Priangan.", detail: "Kantong-kantong transmigrasi di Kampar dan Siak.", description: "Digunakan terbatas di lingkungan keluarga dalam komunitas transmigran asal Jawa Barat. (ref: Kemendikbud)" },
      { name: "Bahasa Banjar", endonim: "Bahasa Banjar", makna: "Berasal dari kata ‘Banjar’ (Kampung/Deretan rumah). (ref: Kemendikbud)", dialek: "Dialek Banjar Hulu, Banjar Kuala.", detail: "Indragiri Hilir, Tembilahan.", description: "Sangat dominan di Indragiri Hilir; sering terjadi code-switching dengan bahasa Melayu setempat. (ref: Kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Mandarin", endonim: "Pǔtōnghuà", makna: "‘Bahasa komunikasi umum’. (ref: Kemendikbud)", dialek: "Standar Mandarin.", detail: "Kawasan Perdagangan Pekanbaru, Dumai.", description: "Digunakan dalam pendidikan formal dan bisnis oleh komunitas Tionghoa modern di perkotaan. (ref: Disbud Riau)" },
      { name: "Bahasa Teochew", endonim: "Diê-jiu-uè", makna: "Merujuk pada wilayah administratif Chaozhou di Tiongkok. (ref: Kemendikbud)", dialek: "Dialek Teochew Pesisir.", detail: "Selatpanjang, Bengkalis.", description: "Digunakan berdampingan dengan Hokkien, terutama oleh generasi tua di wilayah pesisir timur Riau. (ref: Kemendikbud)" },
    ]
  },
  "Kepulauan Riau": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/kepri%20-%20gonggong.png",
    headerDescription: "Gonggong",
    headerLongDescription: "Gonggong khas Kepulauan Riau memiliki rasa gurih alami laut yang segar, dengan daging siput yang kenyal namun lembut saat dikunyah. Disajikan sederhana dengan cara direbus, cita rasa aslinya semakin menonjol ketika dicocol sambal pedas atau saus khas. Hidangan laut ikonik ini menggugah selera sebagai sajian autentik yang sederhana, segar, dan penuh kelezatan pesisir.",
    regionalSong: {
      title: "Gurindam Dua Belas",
      description: "Gurindam Dua Belas merupakan karya daerah yang paling terkenal dan dianggap mewakili Kepulauan Riau. Karya ini diciptakan oleh Raja Ali Haji, sastrawan besar Melayu dari Pulau Penyengat. Meskipun berbentuk sastra gurindam, karya ini sering dilagukan dan digunakan dalam acara adat serta pendidikan sebagai simbol nilai moral budaya Melayu Kepulauan Riau.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Melayu", endonim: "Bahaso Melayu", makna: "Merujuk pada kata ‘Layuh’ (Rendah hati) atau ‘Mula’ (asal). (ref: Kemendikbud)", dialek: "Dialek Penyengat, Lingga, Bintan, Karimun.", detail: "Seluruh wilayah Kepri (Batam, Bintan, Lingga).", description: "Dialek Penyengat merupakan standar bahasa Melayu Tinggi yang menjadi dasar Bahasa Indonesia. (ref: Kemendikbud)" },
      { name: "Bahasa Melayu Dialek Natuna", endonim: "Cakap Natune", makna: "Merujuk pada identitas geografis Pulau Natuna. (ref: Kemendikbud)", dialek: "Dialek Natuna, Dialek Serasan.", detail: "Kabupaten Natuna.", description: "Memiliki pengaruh intonasi yang sangat kuat dan berbeda dengan Melayu Kepulauan lainnya karena isolasi geografis. (ref: Kemendikbud)" },
      { name: "Bahasa Melayu Dialek Anambas", endonim: "Cakap Anambas", makna: "Merujuk pada wilayah kepulauan Anambas.", dialek: "Dialek Tarempa, Dialek Siantan.", detail: "Kabupaten Kepulauan Anambas.", description: "Memiliki kosakata unik yang dipengaruhi oleh kedekatan dengan jalur pelayaran internasional Laut Cina Selatan. (ref: Kemendikbud)" },
      { name: "Bahasa Laut (Suku Laut)", endonim: "Bahasau Orang Laut", makna: "Merujuk pada subyek penutur yang hidup di atas sampan (Sea Nomads). (ref: Kemendikbud)", dialek: "Dialek Kuala, Dialek Mantang.", detail: "Perairan Batam, Bintan, dan Lingga.", description: "Digunakan oleh Suku Laut yang secara turun temurun tinggal di perairan. Berstatus Terancam Punah karena asimilasi. (ref: Kemendikbud)" },
      { name: "Bahasa Hokkien (Kepri)", endonim: "Lán-lâng-oè", makna: "‘Bahasa Kita’ (menandakan bahasa kelompok). (ref: Kemendikbud)", dialek: "Dialek Tanjungpinang, Dialek Karimun.", detail: "Tanjungpinang, Tanjung Balai Karimun.", description: "Dianggap pribumi lokal (Tionghoa Peranakan) karena sudah digunakan berabad-abad di pusat kesultanan Melayu. (ref: Kemendikbud)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Basa Jowo", makna: "Merujuk pada etnis dan Pulau Jawa.", dialek: "Ngoko, Jawa Timuran.", detail: "Batam, Bintan (Wilayah Industri/Transmigrasi).", description: "Penutur Jawa di Batam merupakan populasi kedua terbesar setelah Melayu karena faktor industrialisasi. (ref: Kepriprov.go.id)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Berasal dari ‘To Ugi’ (Orang Bugis). (ref: Kemendikbud)", dialek: "Dialek Bone, Dialek Makassar.", detail: "Lingga, Karimun, Tanjungpinang.", description: "Sejarah mencatat peran penting Yang Dipertuan Muda Bugis dalam Kesultanan Riau-Lingga. (ref: Kemendikbud)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "‘Kemenangan Kerbau’.", dialek: "Dialek Padang, Dialek Pariaman.", detail: "Kota Batam, Kota Tanjungpinang.", description: "Digunakan luas di sektor perdagangan dan kuliner di pusat-pusat kota Kepri. (ref: Kemendikbud)" },
      { name: "Bahasa Batak", endonim: "Hata Batak", makna: "Identitas etnis dari Sumatra Utara.", dialek: "Toba, Karo, Mandailing.", detail: "Batam, Bintan.", description: "Terkonsentrasi di wilayah industri dan pemukiman perkotaan di Batam. (ref: Kemendikbud)" },
      { name: "Bahasa Banjar", endonim: "Bahasa Banjar", makna: "Merujuk pada perkampungan/banjar.", dialek: "Banjar Kuala.", detail: "Lingga, Tanjungpinang.", description: "Komunitas Banjar di Kepri secara historis datang sebagai petani kelapa dan pedagang. (ref: Kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Mandarin", endonim: "Pǔtōnghuà", makna: "‘Bahasa Komunikasi Umum’.", dialek: "Standar Modern.", detail: "Batam, Tanjungpinang.", description: "Digunakan dalam institusi pendidikan dan komunitas bisnis internasional di Batam sebagai Kawasan Ekonomi Khusus. (ref: Kepriprov.go.id)" },
      { name: "Bahasa Teochew", endonim: "Diê-jiu-uè", makna: "Merujuk pada wilayah Chaozhou di Tiongkok. (ref: Kemendikbud)", dialek: "Dialek Teochew.", detail: "Tanjungpinang, Selat Panjang (batas Kepri).", description: "Sering digunakan oleh pedagang tua di pasar tradisional di pusat kota lama Tanjungpinang. (ref: Kemendikbud)" },
      { name: "Bahasa Inggris", endonim: "English", makna: "Merujuk pada asal usul (England).", dialek: "Dialek Singapura/Internasional.", detail: "Kota Batam (Batam Centre).", description: "Menjadi bahasa fungsional di Batam karena kedekatan geografis dan ekonomi dengan Singapura. (ref: Kepriprov.go.id)" },
    ]
  },
  "Kepulauan Bangka Belitung": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/bangka%20belitung%20-%20kericu%20-%20keripik%20cumi.png",
    headerDescription: "Kericu",
    headerLongDescription: "Kericu khas Kepulauan Bangka Belitung memiliki rasa gurih laut yang khas dari telur cumi, berpadu dengan aroma bumbu sederhana yang menggoda selera. Teksturnya renyah dan ringan saat digigit, menghadirkan sensasi kriuk yang memuaskan di setiap suapan. Camilan tradisional ini menggugah selera sebagai oleh-oleh favorit yang lezat, bergizi, dan sarat cita rasa pesisir.",
    regionalSong: {
      title: "Nyok Miak",
      description: "Lagu daerah yang paling terkenal dari Provinsi Kepulauan Bangka Belitung adalah “Nyok Miak” atau “Yok Miak”. Lagu ini menjadi simbol budaya dan tradisi masyarakat saat bekerja bersama di ladang. Sebagai lagu rakyat, penciptanya tidak diketahui dan diwariskan secara turun-temurun.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Melayu Bangka", endonim: "Cakap Bangke", makna: "Merujuk pada identitas pulau ‘Bangka’ (berasal dari kata 'Wangka' yang berarti timah). (ref: Kemendikbud)", dialek: "Dialek Mentok, Belinyu, Sungailiat, Toboali, Pangkalpinang.", detail: "Seluruh Pulau Bangka.", description: "Memiliki ciri khas penggunaan vokal ‘e’ pepet yang kental di akhir kata pada dialek tertentu. (ref: Kemendikbud)" },
      { name: "Bahasa Melayu Belitung", endonim: "Cakap Belitong", makna: "Merujuk pada identitas pulau ‘Belitung’. (ref: Kemendikbud)", dialek: "Dialek Tanjung Pandan, Manggar.", detail: "Seluruh Pulau Belitung.", description: "Secara fonologi berbeda signifikan dengan dialek Bangka, lebih dekat ke arah Melayu pesisir Kalimantan Barat. (ref: Kemendikbud)" },
      { name: "Bahasa Mapur", endonim: "Bahase Lom", makna: "‘Lom’ berarti ‘Belum’ (merujuk pada masyarakat yang belum memeluk agama mayoritas saat itu). (ref: Kemendikbud)", dialek: "Dialek Mapur.", detail: "Dusun Air jangkang & Pejem (Bangka Induk).", description: "Merupakan bahasa suku tertua di Bangka. Statusnya Terancam Punah karena jumlah penutur yang sangat sedikit. (ref: Kemendikbud)" },
      { name: "Bahasa Hokkien (Bangka)", endonim: "Lán-lâng-oè", makna: "‘Bahasa Kita’. (ref: Kemendikbud)", dialek: "Dialek Hakka-Hokkien (kontaminasi).", detail: "Pangkalpinang, Sungailiat.", description: "Telah mengalami asimilasi selama ratusan tahun sejak era pertambangan timah kolonial. (ref: babelprov.go.id)" },
    ],
    community: [
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Pengikut raja La Mellong (To Ugi). (ref: Kemendikbud)", dialek: "Dialek Bugis Pesisir.", detail: "Wilayah pesisir Belitung dan Bangka Selatan.", description: "Dibawa oleh pelaut Bugis yang membangun pemukiman nelayan di tepi pantai. (ref: Kemendikbud)" },
      { name: "Bahasa Jawa", endonim: "Basa Jowo", makna: "Merujuk pada Pulau Jawa.", dialek: "Ngoko.", detail: "Wilayah Transmigrasi di Bangka Barat dan Bangka Selatan.", description: "Digunakan oleh komunitas transmigran dan pekerja perkebunan sawit. (ref: Kemendikbud)" },
      { name: "Bahasa Palembang", endonim: "Baso Plembang", makna: "Merujuk pada Kota Palembang (asal sejarah Babel). (ref: Kemendikbud)", dialek: "Dialek Palembang Alus/Madya.", detail: "Mentok (Bangka Barat).", description: "Kota Mentok memiliki ikatan sejarah sangat kuat dengan Kesultanan Palembang, sehingga bahasa ini masih lestari di sana. (ref: Kemendikbud)" },
      { name: "Bahasa Madura", endonim: "Basa Madura", makna: "erujuk pada Pulau Madura.", dialek: "Dialek Madura.", detail: "Pangkalpinang, Tanjung Pandan.", description: "Digunakan oleh komunitas pedagang dan pekerja di sektor pelabuhan. (ref: Kemendikbud)" },      
    ],
    foreign: [
      { name: "Bahasa Hakka", endonim: "Hák-ka-fa", makna: "‘Bahasa Orang Tamu’. (ref: Kemendikbud)", dialek: "Dialek Meixian (Babel).", detail: "Pangkalpinang, Sungailiat, Belinyu.", description: "Populasi Hakka di Babel adalah salah satu yang terbesar di Indonesia. Bahasa ini sangat dominan dalam perdagangan lokal. (ref: babelprov.go.id)" },
      { name: "Bahasa Mandarin", endonim: "Hànyǔ", makna: "Bahasa etnis Han.", dialek: "Standar.", detail: "Pusat Kota (Pangkalpinang).", description: "Digunakan dalam lingkungan pendidikan formal Tionghoa dan urusan bisnis internasional. (ref: Kemendikbud)" },
    ]
  },
  "Jambi": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/jambi%20-%20gulai%20ikan%20patin.png",
    headerDescription: "Gulai Ikan Patin",
    headerLongDescription: "Gulai ikan patin khas Provinsi Jambi memiliki rasa gurih dan segar dengan kuah kuning kaya rempah yang berpadu asam lembut dari buah tempoyak atau asam kandis. Daging ikan patinnya lembut dan berlemak, menyerap bumbu hingga setiap suapan terasa nikmat dan menggoda selera. Hidangan khas ini menjadi kebanggaan kuliner Jambi yang menghadirkan kelezatan tradisional dan cita rasa Melayu yang khas.",
    regionalSong: {
      title: "Injit-Injit Semut",
      description: "Injit-Injit Semut adalah lagu daerah khas Provinsi Jambi; judulnya berarti “menginjak semut” yang menjadi simbol peringatan akan akibat dari perbuatan menyakiti orang lain. Makna lagu ini menyampaikan pesan moral tentang keadilan, sebab setiap perbuatan buruk akan mendapat balasan. Lagu ini merupakan lagu rakyat Melayu, sehingga penciptanya tidak diketahui dan diwariskan secara turun-temurun.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Melayu Jambi", endonim: "Baso Jambi", makna: "Merujuk pada identitas wilayah kesultanan Jambi.", dialek: "Dialek Kota Jambi, Batanghari, Sarolangun, dll.", detail: "Hampir seluruh Kabupaten/Kota di Jambi.", description: "Memiliki ciri khas akhiran 'o' (seperti bahasa Minang namun berbeda fonologi). Digunakan sebagai lingua franca antar etnis. (ref: kemendikbud)" },
      { name: "Bahasa Kerinci", endonim: "Baso Kincai", makna: "Berasal dari kata ‘Kirty’ (Sanskrit) yang berarti ‘mulia’ atau ‘terpuji’.", dialek: "Dialek Gunung Raya, Danau Kerinci, Pesisir Bukit, dll.", detail: "Kabupaten Kerinci dan Kota Sungai Penuh.", description: "Memiliki variasi dialek yang sangat ekstrem; penduduk antar desa yang berdekatan bisa memiliki perbedaan kosa kata yang signifikan. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Duano", endonim: "Baso Duano", makna: "Secara harfiah berarti ‘dua’ atau merujuk pada identitas suku laut (Orang Kuala).", dialek: "Tunggal (Satu dialek spesifik).", detail: "Tanjung Jabung Barat (Kuala Tungkal).", description: "Dituturkan oleh suku Duano yang memiliki tradisi 'Menungkah' (menangkap kerang di atas papan seluncur lumpur). (ref: jambi.go.id)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal-usul geografis (Pulau Jawa).", dialek: "Dialek Jawa Jambi (campuran kromo & ngoko).", detail: "Wilayah Transmigrasi (Muaro Jambi, Merangin, Bungo).", description: "Penutur bahasa Jawa di Jambi sering menggunakan ‘Bahasa Jawa Ngapak’ karena sejarah transmigrasi dari daerah Bagelen/Banyumas. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Berasal dari kata ‘Manang’ (Menang) dan ‘Kabau’ (Kerbau).", dialek: "Dialek Jambi (dipengaruhi Melayu lokal).", detail: "Wilayah perbatasan Jambi-Sumbar dan daerah pasar/perkotaan.", description: "Sering digunakan dalam aktivitas perdagangan. Di daerah Kerinci, bahasa ini berbaur erat dengan bahasa lokal. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada La Sattung Pugi (raja pertama Kerajaan Cina di Sulsel).", dialek: "Dialek Bugis Jambi.", detail: "Wilayah pesisir (Tanjung Jabung Timur & Barat).", description: "Dibawa oleh pelaut Bugis. Komunitas di Jambi Timur masih sangat kental mempertahankan adat istiadat Sulawesi di lingkungan pesisir. (ref: jambi.go.id)" },
      { name: "Bahasa Banjar", endonim: "Bahasa Banjar", makna: "Merujuk pada kata ‘Banjar’ yang berarti perkampungan atau barisan.", dialek: "Dialek Banjar Hulu/Kuala.", detail: "Tanjung Jabung Barat dan Muaro Jambi.", description: "Penutur bahasa Banjar di Jambi merupakan keturunan perantau Kalimantan Selatan yang sukses di bidang perkebunan kelapa. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Berasal dari akar kata ‘Sunda’ yang berarti murni, putih, atau cemerlang.", dialek: "Dialek Sunda Jambi.", detail: "Kantong-kantong transmigrasi di Merangin dan Tebo.", description: "Banyak digunakan di lingkungan agraris. Statusnya terjaga di lingkungan domestik keluarga transmigran. (ref: kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Mandarin/Tionghoa", endonim: "Hanyu / Huayu", makna: "Berasal dari etnis ‘Han’ (etnis mayoritas di Tiongkok).", dialek: "Dialek Hokkien dan Teochew.", detail: "Kota Jambi (Kawasan Pasar dan Jelutung).", description: "Komunitas Tionghoa di Jambi telah ada sejak masa kolonial; bahasa mereka kini banyak bercampur dengan kosa kata Melayu Jambi. (ref: kemendikbud)" },
    ]
  },
  "Sumatera Selatan": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/sumsel%20-%20pempek.png",
    headerDescription: "Pempek",
    headerLongDescription: "Pempek khas Provinsi Sumatera Selatan memiliki rasa gurih ikan yang kuat dengan tekstur kenyal dan lembut saat digigit. Kelezatannya semakin sempurna saat disiram cuko berwarna gelap yang bercita rasa asam, manis, dan pedas yang menyegarkan. Kuliner ikonik Palembang ini menggugah selera sebagai perpaduan harmonis antara olahan ikan tradisional dan saus khas yang menggoda lidah.",
    regionalSong: {
      title: "Gending Sriwijaya",
      description: "Gending Sriwijaya merupakan lagu daerah Sumatera Selatan dengan lirik karya Mahdi Yazid dan musik ciptaan Arraniry. Secara linguistik, gending berarti nyanyian atau iringan, sedangkan Sriwijaya merujuk pada kerajaan besar yang pernah berjaya di wilayah tersebut. Makna lagu ini menggambarkan kejayaan, kemegahan, dan kebesaran Kerajaan Sriwijaya sebagai simbol kebanggaan budaya Palembang.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa ", endonim: "Baso Plembang", makna: "Merujuk pada identitas pusat peradaban di Palembang.", dialek: "Dialek Palembang Alus & Palembang Sari-sari.", detail: "Kota Palembang, Kab. Banyuasin, Ogan Ilir.", description: "Memiliki strata bahasa ‘Alus’ untuk bangsawan (pengaruh Jawa) dan ‘Sari-sari’. Dituturkan hampir di seluruh wilayah Sumsel sebagai lingua franca. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa ", endonim: "Bahasa Kumoring", makna: "Merujuk pada nama sungai (Way Komering) di wilayah asal suku ini.", dialek: "Dialek Komering Ilir & Komering Ulu.", detail: "Kab. OKU Timur, OKU Selatan, OKI.", description: "Berkerabat dekat dengan bahasa Lampung (Kelompok Lampungik). Memiliki tradisi sastra lisan Warahan. (ref: kemdikbud.go.id)" },
      { name: "Bahasa ", endonim: "Baso Musi", makna: "Merujuk pada aliran Sungai Musi yang membelah wilayah tersebut.", dialek: "Dialek Sekayu, Jejawi, Belide, dll.", detail: "Kab. Musi Banyuasin, Musi Rawas, Banyuasin.", description: "Penuturnya sering disebut sebagai ‘Orang Musi’. Bahasa ini memiliki sebaran geografis terluas di Sumsel setelah Palembang. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa ", endonim: "Baso Kayu Agung", makna: "Merujuk pada pusat wilayah adat dan pemukiman ‘Kayu Agung’.", dialek: "Tunggal.", detail: "Kab. Ogan Komering Ilir (Kec. Kayu Agung).", description: "Secara linguistik unik karena memiliki fonologi yang berbeda dari Melayu sekitarnya, lebih dekat ke rumpun Lampungik/Komering. (ref: badanbahasa.kemdikbud)" },
      { name: "Bahasa ", endonim: "Baso Ogan", makna: "Merujuk pada identitas wilayah di sepanjang aliran Sungai Ogan.", dialek: "Dialek Ogan Ulu & Ogan Ilir.", detail: "Kab. Ogan Komering Ulu, Ogan Ilir.", description: "Dialeknya kental dengan akhiran ‘e’ pepet atau ‘a’, berbeda dengan dialek Palembang yang berakhiran ‘o’. (ref: kemendikbud)" },
      { name: "Bahasa ", endonim: "Baso Pedamar", makna: "Merujuk pada sejarah masyarakat pencari damar atau wilayah pemukiman.", dialek: "Tunggal", detail: "Kab. Ogan Komering Ilir (Kec. Pedamar).", description: "Sering dianggap sebagai bahasa isolat lokal karena perbedaan leksikal yang kontras dengan bahasa di sekitarnya. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa ", endonim: "Baso Lematang", makna: "Merujuk pada wilayah di sepanjang aliran Sungai Lematang.", dialek: "Dialek Lematang Ulu & Lematang Ilir.", detail: "Kab. Muara Enim, Penukal Abab Lematang Ilir (PALI).", description: "Memiliki tradisi ‘Melemang’ yang erat kaitannya dengan acara adat pengguna bahasa ini. (ref: kemdikbud.go.id)" },
      { name: "Bahasa ", endonim: "Baso Besemah", makna: "Merujuk pada dataran tinggi di kaki Gunung Dempo.", dialek: "Dialek Pagaralam, Jarai, Tanjung Sakti.", detail: "Kota Pagar Alam, Kab. Lahat, Empat Lawang.", description: "Masyarakatnya adalah pembuat megalitikum masa lampau. Bahasa ini memiliki intonasi yang tegas. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa ", endonim: "Baso Semende", makna: "Berasal dari kata ‘Seme’ (Sama) dan ‘Nde’ (Induk/Satu).", dialek: "Dialek Semende Darat Tengah/Ulu.", detail: "Kab. Muara Enim (Semende), OKU Selatan.", description: "Terkenal dengan tradisi ‘Tunggu Tubang’, yakni sistem warisan yang jatuh kepada anak perempuan tertua. (ref: ditsmp.kemdikbud)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada asal-usul etnis dari Pulau Jawa.", dialek: "Dialek Jawa Timuran & Jawa Tengah.", detail: "Wilayah Belitang (OKUT), Musi Rawas, Banyuasin.", description: "Hadir melalui program transmigrasi sejak zaman Kolonial Belanda. Bahasa Jawa di Sumsel sering mengalami asimilasi kosa kata lokal. (ref: kemendikbud)" },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Bermakna ‘murni’ atau ‘cemerlang’.", dialek: "Dialek Sunda Banten/Priangan.", detail: "Kantong transmigrasi di OKU Selatan dan Musi Rawas.", description: "Digunakan oleh komunitas petani di dataran tinggi yang bermigrasi untuk berkebun kopi dan lada. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada Raja La Sattung Pugi (identitas etnis).", dialek: "Dialek Bugis Pesisir.", detail: "Wilayah perairan/pesisir Kab. Banyuasin.", description: "Dibawa oleh pelaut Sulawesi Selatan. Komunitasnya sangat kuat menjaga adat pelayaran dan perkampungan di atas air. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Merujuk pada etnis dari Sumatera Barat.", dialek: "Dialek Padang.", detail: "Kawasan perkotaan (Palembang, Lubuklinggau).", description: "Digunakan secara luas dalam interaksi ekonomi dan perdagangan di pasar-pasar besar Sumsel. (ref: kemendikbud)" },
      { name: "Bahasa Bali", endonim: "Baso Bali", makna: "Merujuk pada pulau asal penuturnya.", dialek: "Dialek Bali Dataran.", detail: "Desa-desa transmigrasi di OKU Timur (Belitang).", description: "Penutur bahasa Bali di Sumsel sangat terjaga karena sistem pemukiman transmigrasi yang berkelompok berdasarkan asal daerah. (ref: kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Tionghoa (Hokkien)", endonim: "Lan-nang-oe", makna: "Secara harfiah berarti ‘bahasa orang kita’.", dialek: "Dialek Hokkien Palembang.", detail: "Kota Palembang (Kawasan 7 Ulu, Dempo).", description: "Banyak menyumbang kosa kata dalam bahasa Palembang sehari-hari (contoh: pekgo, cepe). (ref: badanbahasa.kemdikbud)" },
      { name: "Bahasa Arab", endonim: "Lughah al-'Arabiyyah", makna: "Merujuk pada bahasa bangsa Arab.", dialek: "Dialek Hadrami (Yaman).", detail: "Kampung Arab Al-Munawar, Palembang.", description: "Digunakan terbatas di kalangan komunitas keturunan Arab untuk upacara keagamaan dan percakapan internal keluarga. (ref: kemdikbud.go.id)" },
    ]
  },
  "Bengkulu": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/bengkulu%20-%20pendap.png",
    headerDescription: "Pendap",
    headerLongDescription: "Pendap adalah makanan khas Bengkulu yang terbuat dari ikan berbumbu rempah dan kelapa parut, dibungkus daun talas serta daun pisang lalu dimasak perlahan di atas bara api selama berjam-jam. Proses ini menghasilkan rasa gurih pedas yang kuat dengan tekstur ikan yang sangat lembut dan aroma khas yang menggugah selera. Pendap dikenal sebagai hidangan spesial dan oleh-oleh khas Bengkulu, bahkan menjadi makanan favorit Presiden Soekarno saat diasingkan di daerah tersebut.",
    regionalSong: {
      title: "Bumi Rafflesia",
      description: "Bumi Rafflesia adalah lagu daerah Bengkulu yang memiliki lirik dan kerap dinyanyikan dalam acara resmi sebagai simbol daerah. Secara linguistik, judul Bumi Rafflesia berarti “tanah tempat bunga rafflesia tumbuh”, merujuk pada Bengkulu yang dikenal sebagai habitat bunga Rafflesia arnoldii. Makna lagu ini menggambarkan keindahan alam, kekayaan budaya, serta rasa cinta dan kebanggaan masyarakat terhadap Provinsi Bengkulu.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Rejang", endonim: "Baso Hejang", makna: "Berasal dari kata ‘Rejang’ yang merujuk pada identitas etnis asli di pegunungan.", dialek: "Pesisir, Musi, Lebong, Kepahiang.", detail: "Kab. Rejang Lebong, Kepahiang, Lebong, Bengkulu Utara.", description: "Memiliki aksara sendiri bernama Kaganga. Statusnya merupakan bahasa dengan jumlah penutur asli terbesar di Bengkulu. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Melayu", endonim: "Baso Melayu Bengkulu", makna: "Merujuk pada identitas rumpun Melayu di pesisir barat Sumatra.", dialek: "Dialek Kota Bengkulu (akhiran 'o').", detail: "Kota Bengkulu, Bengkulu Tengah, Seluma.", description: "Sering disebut ‘Bahasa Bengkulu’. Unik karena penggunaan akhiran 'o' mirip dengan Melayu Jambi dan Palembang. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Enggano", endonim: "E linuwea Kakadoo", makna: "Secara harafiah berarti ‘bahasa kita’ atau ‘orang pulau’.", dialek: "Tunggal (Tidak ada perbedaan dialek yang signifikan).", detail: "Pulau Enggano (Kab. Bengkulu Utara).", description: "Salah satu bahasa paling unik di dunia karena struktur linguistiknya yang sangat berbeda dari bahasa Austronesia lainnya (Isolat). (ref: balabahasa.kemdikbud)" },
      { name: "Bahasa Serawai", endonim: "Baso Serawai", makna: "Diambil dari nama aliran sungai atau wilayah adat Serawai.", dialek: "Dialek Seluma, Dialek Manna.", detail: "Kab. Seluma, Bengkulu Selatan.", description: "Memiliki tradisi sastra lisan ‘Berejung’ yang berisi pantun nasehat dan percintaan. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Pekal", endonim: "Baso Pekal", makna: "Berasal dari kata ‘Mekal’ yang berarti pertemuan/campuran (antara Rejang dan Minang).", dialek: "Tunggal.", detail: "Kec. Ketahun, Putri Hijau (Bengkulu Utara) dan Muko-Muko.", description: "Secara linguistik merupakan bahasa transisi yang menjembatani struktur bahasa Rejang dan Minangkabau. (ref: kemendikbud)" },
      { name: "Bahasa Pasemah", endonim: "Baso Besemah", makna: "Merujuk pada wilayah asal di dataran tinggi Gunung Dempo.", dialek: "Dialek Ulu Manna, Dialek Padang Guci.", detail: "Kab. Bengkulu Selatan, Kab. Kaur.", description: "Memiliki kemiripan sangat dekat dengan bahasa Melayu Palembang namun dengan intonasi yang lebih tegas. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Lembak", endonim: "Baso Lembak", makna: "Bermakna ‘di lembah’ atau merujuk pada wilayah pemukiman.", dialek: "Dialek Lembak Bliti, Lembak Sindang.", detail: "Perbatasan Kota Bengkulu dan Kab. Rejang Lebong.", description: "Penutur bahasa ini sering disebut sebagai ‘Orang Sindang Merdeka’ karena sejarah wilayah otonom di masa lalu. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Kaur", endonim: "Baso Kaur", makna: "Merujuk pada identitas wilayah administratif dan adat Kaur.", dialek: "Dialek Kaur Pesisir.", detail: "Kab. Kaur (bagian selatan).", description: "Dekat dengan bahasa Lampung karena letak geografisnya yang berbatasan langsung dengan Provinsi Lampung. (ref: kemendikbud)" },
      { name: "Bahasa Mukomuko", endonim: "Baso Mukomuko", makna: "Merujuk pada nama wilayah di utara Bengkulu.", dialek: "Tunggal.", detail: "Kab. Mukomuko.", description: "Sangat dipengaruhi oleh bahasa Minangkabau namun diakui sebagai bahasa mandiri berdasarkan beda dialektometri. (ref: petabahasa.kemendikbud)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Basa Jowo", makna: "Merujuk pada identitas geografis Pulau Jawa.", dialek: "Dialek Jawa Timuran & Jawa Tengah.", detail: "Wilayah Transmigrasi (Bengkulu Utara, Seluma, Muko-Muko).", description: "Digunakan secara masif di daerah perkebunan. Terjadi fenomena ‘Jawa-Bengkulu’ (Jabel) di kalangan generasi muda. (ref: kemendikbud)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada identitas etnis pelaut dari Sulawesi Selatan.", dialek: "Dialek Bugis Pesisir.", detail: "Desa nelayan di pesisir Bengkulu Utara dan Mukomuko.", description: "Bahasa ini tetap terjaga di komunitas nelayan karena tradisi melaut yang kuat secara turun-temurun. (ref: jambi.go.id / kemdikbud)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Berasal dari ‘Manang Kabau’ (Menang Kerbau).", dialek: "Dialek Padang.", detail: "Kawasan komersial/pasar di hampir seluruh kota besar Bengkulu.", description: "Menjadi bahasa pengantar utama dalam dunia perdagangan di pasar-pasar tradisional Bengkulu. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Bermakna ‘murni’ atau ‘putih’.", dialek: "Dialek Priangan.", detail: "Kantong transmigrasi di Kab. Kepahiang dan Rejang Lebong.", description: "Digunakan oleh komunitas petani sayur di daerah pegunungan yang memiliki iklim mirip Jawa Barat. (ref: kemendikbud)" },
      { name: "Bahasa Madura", endonim: "Basa Madura", makna: "Merujuk pada pulau asal di utara Jawa Timur.", dialek: "Dialek Bangkalan/Sampang.", detail: "Pemukiman tertentu di wilayah pesisir dan transmigrasi.", description: "Biasanya digunakan dalam lingkungan keluarga terbatas di komunitas pekerja perkebunan. (ref: kemendikbud)" },
      { name: "Bahasa Bali", endonim: "Baso Bali", makna: "Merujuk pada identitas Pulau Bali.", dialek: "Dialek Bali Dataran.", detail: "Desa-desa khusus transmigran Bali di Bengkulu Utara.", description: "Unik karena di wilayah ini sering ditemukan pura berdampingan dengan masjid, menunjukkan integrasi bahasa dan budaya yang harmonis. (ref: kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Tionghoa/Mandarin", endonim: "Hanyu", makna: "Bermakna ‘bahasa bangsa Han’.", dialek: "Dialek Hokkien.", detail: "Kawasan Kampung Cina (Malabero), Kota Bengkulu.", description: "Saat ini mayoritas penutur sudah beralih ke bahasa Indonesia/Melayu Bengkulu, namun istilah-istilah Hokkien masih digunakan dalam perdagangan. (ref: kemdikbud.go.id)" },
    ]
  },
  "Lampung": {
    headerImage: "https://raw.githubusercontent.com/mawwyncha/teduh.aksara/refs/heads/main/contents/Iconic%20Foods/apa%20yang%20ikonik/lampung%20-%20umbu.png",
    headerDescription: "Umbu",
    headerLongDescription: "Umbu adalah sajian eksotis khas Lampung yang menawarkan sensasi rasa pahit-gurih nan elegan, berasal dari pucuk rotan muda yang direbus hingga empuk atau dibakar untuk mengeluarkan aroma khas hutan yang autentik. Teksturnya yang renyah sekaligus lembut seketika lumer di lidah, apalagi saat dipadukan dengan sambal terasi pedas atau diolah menjadi oseng bumbu santan yang kaya rempah. Hidangan langka ini bukan sekadar makanan, melainkan petualangan rasa unik yang memberikan efek segar dan membangkitkan selera makan bagi siapa pun yang menikmatinya.",
    regionalSong: {
      title: "Lipang Lipang Dang",
      description: "Lagu ini merupakan lagu hiburan yang menggunakan judul berupa onomatope keceriaan untuk menggambarkan suasana hati yang riang. Liriknya berisi nasihat jenaka yang dikemas dalam bentuk pantun untuk mengingatkan para pemuda agar lebih berhati-hati dalam urusan asmara. Secara keseluruhan, lagu ini berpesan agar seseorang tidak mudah terbuai oleh janji manis atau penampilan luar semata agar tidak mengalami kekecewaan di kemudian hari.",
      audioUrl: ""
    },
    native: [
      { name: "Bahasa Lampung Api", endonim: "Cawa Lampung Api", makna: "‘Api’ berarti ‘apa’ dalam dialek pesisir/peminggir.", dialek: "Dialek Pesisir, Pubian, Sungkai, Way Kanan.", detail: "Lampung Barat, Pesisir Barat, Tanggamus, Lampung Selatan.", description: "Memiliki tradisi sastra lisan Pisaan dan Ringget. Secara fonologi cenderung menggunakan vokal [a]. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Lampung Nyo", endonim: "Cawa Lampung Nyo", makna: "‘Nyo’ berarti ‘apa’ dalam dialek pedalaman/pepadun.", dialek: "Dialek Abung dan Menggala (Tulang Bawang).", detail: "Lampung Utara, Way Kanan, Tulang Bawang, Metro.", description: "Digunakan oleh masyarakat adat Pepadun. Ciri khasnya adalah penggunaan vokal [o] pada akhir kata. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Melayu", endonim: "Baso Melayu", makna: "Merujuk pada rumpun Melayik pesisir.", dialek: "Dialek Belalau (Lampung Barat).", detail: "Wilayah pesisir perbatasan dengan Bengkulu dan Sumatra Selatan.", description: "Sering beririsan dengan bahasa Lampung Api namun memiliki perbedaan leksikal yang signifikan pada kata-kata dasar. (ref: badanbahasa.kemdikbud)" },
    ],
    community: [
      { name: "Bahasa Jawa", endonim: "Boso Jowo", makna: "Merujuk pada identitas etnis Pulau Jawa.", dialek: "Dialek Jawa Tengah (Solo-Yogya) dan Jawa Timuran.", detail: "Lampung Tengah, Pringsewu, Lampung Timur.", description: "Penutur bahasa Jawa di Lampung merupakan mayoritas populasi provinsi. Muncul dialek unik yang disebut ‘Jawa Serat’ (Sering Rapat Transmigrasi). (ref: kemendikbud)" },
      { name: "Bahasa Sunda", endonim: "Basa Sunda", makna: "Bermakna ‘murni’, ‘bagus’, atau ‘putih’.", dialek: "Dialek Banten dan Priangan.", detail: "Lampung Barat, Lampung Selatan, Pesawaran.", description: "Banyak digunakan di wilayah perkebunan kopi dan pegunungan. Desa-desa penutur Sunda sering dinamai sesuai daerah asal di Jawa Barat. (ref: petabahasa.kemendikbud)" },
      { name: "Bahasa Bali", endonim: "Baso Bali", makna: "Merujuk pada pulau asal penuturnya.", dialek: "Dialek Bali Dataran.", detail: "Lampung Tengah (Seputih Raman), Lampung Timur.", description: "Lampung memiliki populasi penutur bahasa Bali terbesar di luar Pulau Bali. Tradisi dan bahasa tetap terjaga melalui sistem Banjar. (ref: kemdikbud.go.id)" },
      { name: "Bahasa Bugis", endonim: "Basa Ugi", makna: "Merujuk pada leluhur etnis (La Sattung Pugi).", dialek: "Dialek Bugis Pesisir.", detail: "Wilayah Pesisir Lampung Timur dan Lampung Selatan.", description: "Dibawa oleh perantau laut. Digunakan secara aktif di lingkungan nelayan dan perdagangan hasil laut. (ref: badanbahasa.kemdikbud)" },
      { name: "Bahasa Minangkabau", endonim: "Baso Minang", makna: "Berasal dari kata ‘Manang Kabau’.", dialek: "Dialek Padang.", detail: "Wilayah perkotaan (Bandar Lampung, Metro).", description: "Menjadi bahasa dominan di sektor kuliner dan perdagangan tekstil di pasar-pasar besar Lampung. (ref: kemendikbud)" },
      { name: "Bahasa Madura", endonim: "Basa Madura", makna: "Merujuk pada identitas geografis Pulau Madura.", dialek: "Dialek Bangkalan.", detail: "Kantong pemukiman di Lampung Selatan dan Lampung Timur.", description: "Biasanya dituturkan dalam komunitas terbatas yang bekerja di sektor agraris dan peternakan. (ref: petabahasa.kemendikbud)" },
    ],
    foreign: [
      { name: "Bahasa Tionghoa (Hokkien)", endonim: "Lan-nang-oe", makna: "‘Bahasa orang kita’.", dialek: "Dialek Hokkien.", detail: "Kota Bandar Lampung (Kawasan Teluk Betung).", description: "Teluk Betung merupakan kawasan pecinaan tertua di Lampung; bahasa Hokkien di sini banyak menyerap kosa kata Lampung dan Melayu. (ref: badanbahasa.kemdikbud)" },
      { name: "Bahasa Arab", endonim: "Lughah al-'Arabiyyah", makna: "Merujuk pada bangsa Arab.", dialek: "Dialek Hadrami.", detail: "Kawasan pemukiman Arab di Bandar Lampung.", description: "Digunakan secara terbatas dalam konteks keagamaan dan silsilah keluarga dalam komunitas keturunan Hadramaut. (ref: kemdikbud.go.id)" },
    ]
  }
};