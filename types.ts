
export type WritingStyle = 'formal' | 'casual' | 'academic' | 'creative';
export type WritingContext = 'business' | 'education' | 'social_media' | 'general';
export type TargetLanguage = 
  | 'en_us' | 'en_uk' | 'en_au' 
  | 'jv_central' | 'jv_yogyakarta' | 'jv_east' | 'jv_central_coastal' | 'su' | 'min' | 'ban' | 'bug' | 'mad' | 'ace' | 'bjn' | 'mk' | 'bt_toba' | 'bt_karo'
  | 'lp' | 'sas' | 'pap' | 'amb' | 'go' | 'ni' | 'tet' | 'pt_tl' 
  | 'zh_hokkien_medan' | 'zh_hokkien_jakarta' | 'zh_hakka_singkawang' | 'zh_hakka_bangka' | 'zh_teochew_pontianak' | 'zh_cantonese_id';

export type SuggestionType = "Ejaan" | "Tata Bahasa" | "Gaya Bahasa" | "Tanda Baca" | "Budaya";
export interface GrammarSuggestion {
  original: string;
  replacement: string;
  reason: string;
  type: SuggestionType;  // ← BUKAN string
}

export interface PlagiarismResult {
  score: number;
  sources: { uri: string; title: string }[];
  summary: string;
}

export interface TranslationResult {
  translatedText: string;
  languageName: string;
  readingGuide?: string;
}

export interface PronunciationResult {
  score: number;
  feedback: string;
  encouragement: string;
  transcription: string;
}

export interface AnalysisResult {
  correctedText: string;
  suggestions: GrammarSuggestion[];
  summary: string;
  styleScore: number;
  plagiarism?: PlagiarismResult;
  translation?: TranslationResult;
  readingGuideIndo?: string;
  isViolation?: boolean;
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

  metadata?: {  // ← TAMBAHKAN INI
    aiProvider?: string;
    latency?: number;
    cached?: boolean;
    fallbackUsed?: boolean;
    parsedFromText?: boolean;
    originalTextLength?: number;
    [key: string]: any;
  };
}