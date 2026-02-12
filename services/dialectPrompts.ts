// src/services/dialectPrompts.ts

/**
 * Mapping untuk prompt TTS berdasarkan dialek
 * Agar logat lebih akurat dan natural
 */

export interface DialectPromptConfig {
  promptTemplate: string;
  languageCode?: string; // Untuk fallback Web Speech API
  speakingStyle?: string;
  voiceName?: string;
}

// Mapping khusus untuk setiap dialek
export const DIALECT_PROMPTS: Record<string, DialectPromptConfig> = {
  // ==================== JAWA ====================
  'Bahasa Jawa Dialek Jawa Tengah (Solo/Semarang)': {
    promptTemplate: 'Ucapkan dengan logat Jawa Tengah (Solo/Semarang) yang halus, sopan, dan lembut: "{text}"',
    languageCode: 'jv-ID',
    speakingStyle: 'halus dan sopan',
    voiceName: 'Puck'
  },
  
  'Bahasa Jawa Dialek Yogyakarta (Ngayogyakarta)': {
    promptTemplate: 'Ucapkan dengan logat Yogyakarta (Mataraman) yang berwibawa, halus, dan elegan: "{text}"',
    languageCode: 'jv-ID',
    speakingStyle: 'berwibawa dan elegan',
    voiceName: 'Puck'
  },
  
  'Bahasa Jawa Dialek Jawa Timur (Suroboyoan)': {
    promptTemplate: 'Ucapkan dengan logat Jawa Timur (Suroboyoan) yang tegas, bersemangat, dan ekspresif: "{text}"',
    languageCode: 'jv-ID',
    speakingStyle: 'tegas dan bersemangat',
    voiceName: 'Puck'
  },
  
  'Bahasa Jawa Dialek Pantura (Pesisir Jawa Tengah)': {
    promptTemplate: 'Ucapkan dengan logat Pantura (Jawa Pesisir) yang khas, ekspresif, dan merakyat: "{text}"',
    languageCode: 'jv-ID',
    speakingStyle: 'ekspresif dan merakyat',
    voiceName: 'Puck'
  },

  // ==================== SUNDA ====================
  'Bahasa Sunda (Priangan/Jawa Barat)': {
    promptTemplate: 'Ucapkan dengan logat Sunda Priangan yang lembut, merdu, dan penuh kehangatan: "{text}"',
    languageCode: 'su-ID',
    speakingStyle: 'lembut dan merdu',
    voiceName: 'Puck'
  },

  // ==================== BALI ====================
  'Bahasa Bali (Dataran/Bali Tengah)': {
    promptTemplate: 'Ucapkan dengan logat Bali yang khas, berirama, dan penuh ekspresi budaya: "{text}"',
    languageCode: 'ban-ID',
    speakingStyle: 'berirama dan ekspresif',
    voiceName: 'Puck'
  },

  // ==================== MADURA ====================
  'Bahasa Madura (Jawa Timur)': {
    promptTemplate: 'Ucapkan dengan logat Madura yang kuat, bersemangat, dan penuh karakter: "{text}"',
    languageCode: 'mad-ID',
    speakingStyle: 'kuat dan berkarakter',
    voiceName: 'Puck'
  },

  // ==================== BATAK ====================
  'Bahasa Batak Toba (Sumatera Utara)': {
    promptTemplate: 'Ucapkan dengan logat Batak Toba yang keras, berkarakter kuat, dan tegas: "{text}"',
    languageCode: 'btb-ID',
    speakingStyle: 'keras dan tegas',
    voiceName: 'Puck'
  },
  
  'Bahasa Batak Karo (Sumatera Utara)': {
    promptTemplate: 'Ucapkan dengan logat Batak Karo yang khas dan berkarakter: "{text}"',
    languageCode: 'btx-ID',
    speakingStyle: 'khas dan berkarakter',
    voiceName: 'Puck'
  },

  // ==================== BUGIS ====================
  'Bahasa Bugis (Sulawesi Selatan)': {
    promptTemplate: 'Ucapkan dengan logat Bugis yang khas dan berwibawa: "{text}"',
    languageCode: 'bug-ID',
    speakingStyle: 'khas dan berwibawa',
    voiceName: 'Puck'
  },

  // ==================== MAKASSAR ====================
  'Bahasa Makassar (Sulawesi Selatan)': {
    promptTemplate: 'Ucapkan dengan logat Makassar yang khas dan penuh semangat: "{text}"',
    languageCode: 'mak-ID',
    speakingStyle: 'khas dan bersemangat',
    voiceName: 'Puck'
  },

  // ==================== MINANGKABAU ====================
  'Bahasa Minangkabau (Sumatera Barat)': {
    promptTemplate: 'Ucapkan dengan logat Minang yang berirama dan penuh gaya: "{text}"',
    languageCode: 'min-ID',
    speakingStyle: 'berirama dan bergaya',
    voiceName: 'Puck'
  },

  // ==================== ACEH ====================
  'Bahasa Aceh (Serambi Mekkah)': {
    promptTemplate: 'Ucapkan dengan logat Aceh yang khas dan kuat: "{text}"',
    languageCode: 'ace-ID',
    speakingStyle: 'khas dan kuat',
    voiceName: 'Puck'
  },

  // ==================== BANJAR ====================
  'Bahasa Banjar (Kalimantan Selatan)': {
    promptTemplate: 'Ucapkan dengan logat Banjar yang khas dan merdu: "{text}"',
    languageCode: 'bjn-ID',
    speakingStyle: 'khas dan merdu',
    voiceName: 'Puck'
  },

  // ==================== CHINESE DIALECTS ====================
  'Bahasa Hokkien Dialek Medan': {
    promptTemplate: 'Ucapkan dengan logat Hokkien Medan yang khas dan otentik: "{text}"',
    languageCode: 'zh-TW',
    speakingStyle: 'otentik dan khas',
    voiceName: 'Puck'
  },
  
  'Bahasa Hokkien Dialek Jakarta': {
    promptTemplate: 'Ucapkan dengan logat Hokkien Jakarta yang khas dan percaya diri: "{text}"',
    languageCode: 'zh-TW',
    speakingStyle: 'percaya diri dan khas',
    voiceName: 'Puck'
  },
  
  'Bahasa Hakka Dialek Singkawang': {
    promptTemplate: 'Ucapkan dengan logat Hakka Singkawang yang otentik: "{text}"',
    languageCode: 'zh-Hakka',
    speakingStyle: 'otentik',
    voiceName: 'Puck'
  },
  
  'Bahasa Kanton (Kantonis Indonesia)': {
    promptTemplate: 'Ucapkan dengan logat Kanton Indonesia yang khas: "{text}"',
    languageCode: 'zh-yue',
    speakingStyle: 'khas',
    voiceName: 'Puck'
  },

  // ==================== LANGUAGES ====================
  'Bahasa Indonesia': {
    promptTemplate: 'Ucapkan dengan pelafalan Indonesia yang jelas dan natural: "{text}"',
    languageCode: 'id-ID',
    speakingStyle: 'jelas dan natural',
    voiceName: 'Puck'
  },
  
  'English (US)': {
    promptTemplate: 'Speak with authentic American English accent, clear and natural: "{text}"',
    languageCode: 'en-US',
    speakingStyle: 'clear and natural',
    voiceName: 'Puck'
  },
  
  'English (UK)': {
    promptTemplate: 'Speak with authentic British English accent, proper and elegant: "{text}"',
    languageCode: 'en-GB',
    speakingStyle: 'proper and elegant',
    voiceName: 'Puck'
  },
  
  'English (Australia)': {
    promptTemplate: 'Speak with authentic Australian English accent, relaxed and friendly: "{text}"',
    languageCode: 'en-AU',
    speakingStyle: 'relaxed and friendly',
    voiceName: 'Puck'
  },
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get prompt template for specific dialect
 */
export function getDialectPrompt(
  dialectName: string, 
  text: string, 
  context: 'greeting' | 'story' | 'pronunciation' = 'greeting'
): string {
  const config = DIALECT_PROMPTS[dialectName] || DIALECT_PROMPTS['Bahasa Indonesia'];
  let prompt = config.promptTemplate.replace('{text}', text);
  
  // Tambah konteks spesifik
  switch (context) {
    case 'greeting':
      prompt += ' Gunakan nada ramah dan hangat seperti menyapa tamu.';
      break;
    case 'story':
      prompt += ' Bacakan dengan penjiwaan dan ekspresi yang hidup seperti mendongeng.';
      break;
    case 'pronunciation':
      prompt += ' Ucapkan dengan pelafalan yang sangat jelas untuk latihan pengucapan.';
      break;
  }
  
  return prompt;
}

/**
 * Get language code for Web Speech API fallback
 */
export function getLanguageCode(dialectName: string): string {
  const config = DIALECT_PROMPTS[dialectName] || DIALECT_PROMPTS['Bahasa Indonesia'];
  return config.languageCode || 'id-ID';
}

/**
 * Get voice name for TTS
 */
export function getVoiceName(dialectName: string): string {
  const config = DIALECT_PROMPTS[dialectName] || DIALECT_PROMPTS['Bahasa Indonesia'];
  return config.voiceName || 'Puck';
}

/**
 * Get speaking style description
 */
export function getSpeakingStyle(dialectName: string): string {
  const config = DIALECT_PROMPTS[dialectName] || DIALECT_PROMPTS['Bahasa Indonesia'];
  return config.speakingStyle || 'natural';
}

/**
 * Check if dialect has special configuration
 */
export function hasDialectConfig(dialectName: string): boolean {
  return dialectName in DIALECT_PROMPTS;
}

/**
 * Get all available dialect names
 */
export function getAvailableDialects(): string[] {
  return Object.keys(DIALECT_PROMPTS);
}