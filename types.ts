
export type WritingStyle = 'formal' | 'casual' | 'academic' | 'creative';
export type WritingContext = 'business' | 'education' | 'social_media' | 'general';

export interface GrammarSuggestion {
  original: string;
  replacement: string;
  reason: string;
  type: 'spelling' | 'grammar' | 'style' | 'punctuation' | 'cultural';
  kbbiLink?: string;
}

export interface PlagiarismResult {
  score: number;
  sources: { uri: string; title: string }[];
  summary: string;
}

export interface CollabComment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: number;
}

export interface AnalysisResult {
  correctedText: string;
  suggestions: GrammarSuggestion[];
  summary: string;
  styleScore: number;
  culturalNote?: string;
  plagiarism?: PlagiarismResult;
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
