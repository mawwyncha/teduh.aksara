
export type WritingStyle = 'formal' | 'casual' | 'academic' | 'creative';
export type WritingContext = 'business' | 'education' | 'social_media' | 'general';
export type TargetLanguage = 'en' | 'ja' | 'ar' | 'ko';

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
