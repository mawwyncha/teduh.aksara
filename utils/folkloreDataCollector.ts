/**
 * Utility untuk mengumpulkan semua data folklore dari semua region
 * File ini akan import semua regional data dan extract folklore-nya
 */

// Import semua data regional
// Path sudah disesuaikan dengan struktur: components/nusantara/regions/data/
import { PROVINCE_DIALECTS as JAVA_DATA } from '../components/nusantara/regions/data/JavaData';
import { PROVINCE_DIALECTS as SUMATERA_DATA } from '../components/nusantara/regions/data/SumateraData';
import { PROVINCE_DIALECTS as KALIMANTAN_DATA } from '../components/nusantara/regions/data/KalimantanData';
import { PROVINCE_DIALECTS as NUSA_TENGGARA_DATA } from '../components/nusantara/regions/data/NusaTenggaraData';
import { PROVINCE_DIALECTS as SULAWESI_DATA } from '../components/nusantara/regions/data/SulawesiData';
import { PROVINCE_DIALECTS as PAPUA_DATA } from '../components/nusantara/regions/data/PapuaData';

interface FolkloreItem {
  provinceName: string;
  languageName: string;
  story: string;
  title: string;
}

/**
 * Mengumpulkan semua folklore dari semua regional data
 */
export const getAllFolkloreData = (): FolkloreItem[] => {
  const allData = [
    JAVA_DATA,
    SUMATERA_DATA,
    KALIMANTAN_DATA,
    NUSA_TENGGARA_DATA,
    SULAWESI_DATA,
    PAPUA_DATA
  ];

  const folklores: FolkloreItem[] = [];

  allData.forEach((regionalData) => {
    Object.entries(regionalData).forEach(([provinceName, provinceData]) => {
      // Check jika ada folklore data
      if (provinceData.folklore?.story) {
        // Gunakan bahasa pertama dari native languages sebagai default
        const languageName = provinceData.native?.[0]?.name || 'Bahasa Indonesia';

        folklores.push({
          provinceName,
          languageName,
          story: provinceData.folklore.story,
          title: provinceData.folklore.title
        });
      }
    });
  });

  console.log(`📚 Collected ${folklores.length} folklores from all regions`);
  return folklores;
};

/**
 * Menghitung total size estimasi (untuk info user)
 */
export const estimateDownloadSize = (): string => {
  const folklores = getAllFolkloreData();
  // Estimasi: ~50KB per story audio (compressed)
  const estimatedBytes = folklores.length * 50 * 1024;
  const estimatedMB = (estimatedBytes / (1024 * 1024)).toFixed(1);
  return `~${estimatedMB} MB`;
};