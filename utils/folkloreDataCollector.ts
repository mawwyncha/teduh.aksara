import { PROVINCE_DIALECTS } from '../components/nusantara/Province';

export interface FolkloreItem {
  provinceName: string;
  languageName: string;
  story: string;
  title: string;
}

/**
 * Mengumpulkan semua data cerita rakyat dari koleksi dialek provinsi
 * untuk keperluan pramuat audio TTS.
 */
export const getAllFolkloreData = (): FolkloreItem[] => {
  const allFolklores: FolkloreItem[] = [];
  
  Object.entries(PROVINCE_DIALECTS).forEach(([provinceName, data]) => {
    if (data.folklore) {
      allFolklores.push({
        provinceName,
        title: data.folklore.title,
        story: data.folklore.story,
        languageName: "Bahasa Indonesia" // Cerita rakyat secara standar menggunakan Bahasa Indonesia
      });
    }
  });
  
  return allFolklores;
};
