
export type WritingStyle = 'formal' | 'casual' | 'academic' | 'creative';
export type WritingContext = 'business' | 'education' | 'social_media' | 'general';
export type TargetLanguage = 
  | 'en_us' | 'en_uk' | 'en_au' 
  | 'jv_central' | 'jv_yogyakarta' | 'jv_east' | 'jv_central_coastal' | 'su' | 'min' | 'ban' | 'bug' | 'mad' | 'ace' | 'bjn' | 'mk' | 'bt' 
  | 'lp' | 'sas' | 'pap' | 'amb' | 'go' | 'ni' | 'tet' | 'pt_tl';

export interface GrammarSuggestion {
  original: string;
  replacement: string;
  reason: string;
  type: 'Ejaan' | 'Tata Bahasa' | 'Gaya Bahasa' | 'Tanda Baca' | 'Budaya';
  kbbiLink?: string;
}

export interface PlagiarismResult {
  score: number;
  sources: { uri: string; title: string }[];
  summary: string;
}

export interface TranslationResult {
  translatedText: string;
  languageName: string;
  readingGuide?: string; // Cara membaca dalam fonetik Indonesia
  note?: string;
}

export interface AnalysisResult {
  correctedText: string;
  suggestions: GrammarSuggestion[];
  summary: string;
  styleScore: number;
  culturalNote?: string;
  plagiarism?: PlagiarismResult;
  translation?: TranslationResult;
  readingGuideIndo?: string; // Cara baca teks Indonesia (pemenggalan suku kata)
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  originalText: string;
  result: AnalysisResult;
  options: {
    style: WritingStyle;
    context: WritingContext;
  };
}
