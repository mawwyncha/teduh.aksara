
export interface DialectInfo {
  name: string;
  detail: string;
  description?: string;
  endonim?: string;
  makna?: string;
  dialek?: string;
}

export interface RegionalSong {
  title: string;
  description: string;
  audioUrl: string;
}

export interface Folklore {
  title: string;
  story: string;
  backgroundImage?: string; // URL gambar transparan/PNG
  videoUrl?: string; // Properti baru untuk selipan video
  videoPosterUrl?: string; // Properti baru untuk sampul video
}

export interface ProvinceData {
  headerImage: string;
  headerDescription?: string;
  headerLongDescription?: string;
  native: DialectInfo[];
  community: DialectInfo[];
  foreign?: DialectInfo[];
  regionalSong?: RegionalSong;
  folklore?: Folklore;
}
