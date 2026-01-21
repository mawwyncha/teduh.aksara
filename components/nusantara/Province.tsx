
import { ProvinceData } from './ProvinceInterfaces';
import { PROVINCE_DIALECTS as JAVA_DIALECTS } from './regions/data/JavaData';
import { PROVINCE_DIALECTS as SUMATERA_DIALECTS } from './regions/data/SumateraData';
import { PROVINCE_DIALECTS as KALIMANTAN_DIALECTS } from './regions/data/KalimantanData';
import { PROVINCE_DIALECTS as NUSA_TENGGARA_DIALECTS } from './regions/data/NusaTenggaraData';
import { PROVINCE_DIALECTS as SULAWESI_DIALECTS } from './regions/data/SulawesiData';
import { PROVINCE_DIALECTS as PAPUA_DIALECTS } from './regions/data/PapuaData';

export const PROVINCE_DIALECTS: Record<string, ProvinceData> = {
  ...SUMATERA_DIALECTS,
  ...JAVA_DIALECTS,
  ...KALIMANTAN_DIALECTS,
  ...NUSA_TENGGARA_DIALECTS,
  ...SULAWESI_DIALECTS,
  ...PAPUA_DIALECTS,
};

export type { DialectInfo, ProvinceData, RegionalSong } from './ProvinceInterfaces';
