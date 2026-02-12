// services/secure-ai-client.ts
// Simplified client untuk frontend dengan error handling yang baik

import { aiOrchestrator } from './ai-orchestrator';
import type { AIResponse } from './ai-orchestrator';

export class SecureAIClient {
  private userId: string;
  
  constructor(userId?: string) {
    this.userId = userId || this.generateAnonymousId();
  }
  
  // MARK: Grammar Analysis
  async analyzeGrammar(
    text: string,
    style: string = 'formal',
    context: string = 'general',
    targetLang: string = 'Bahasa Indonesia',
    withPlagiarism: boolean = false
  ): Promise<AIResponse> {
    const result = await aiOrchestrator.analyzeGrammar(
      text,
      style,
      context,
      targetLang,
      this.userId
    );
    
    // Jika hybrid AI gagal, throw error yang jelas
    if (!result.success) {
      throw new Error(
        result.error || 
        'Gagal menganalisis tata bahasa. Coba lagi atau gunakan teks yang lebih pendek.'
      );
    }
    
    return result;
  }
  
  // MARK: Text-to-Speech
  async generateTTS(
    text: string,
    languageName: string = 'Bahasa Indonesia',
    context: 'greeting' | 'story' | 'pronunciation' = 'greeting'
  ): Promise<AIResponse> {
    const result = await aiOrchestrator.generateTTS(
      text,
      languageName,
      context,
      this.userId
    );
    
    if (!result.success) {
      throw new Error(
        result.error ||
        'Gagal menghasilkan suara. Coba teks yang lebih pendek atau gunakan fitur lain.'
      );
    }
    
    return result;
  }
  
  // MARK: Translation
  async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage: string = 'Bahasa Indonesia'
  ): Promise<AIResponse> {
    const result = await aiOrchestrator.execute({
      task: 'translation',
      input: text,
      options: {
        language: targetLanguage,
        sourceLanguage,
        userId: this.userId
      } as any
    });
    
    if (!result.success) {
      throw new Error(
        result.error ||
        'Gagal menerjemahkan teks. Coba bahasa lain atau teks yang lebih pendek.'
      );
    }
    
    return result;
  }
  
  // MARK: Speech-to-Text
  async transcribeAudio(
    audioBase64: string,
    mimeType: string = 'audio/webm'
  ): Promise<AIResponse> {
    const result = await aiOrchestrator.execute({
      task: 'stt',
      input: audioBase64,
      options: {
        mimeType,
        userId: this.userId
      } as any
    });
    
    if (!result.success) {
      throw new Error(
        result.error ||
        'Gagal mentranskripsi audio. Pastikan audio jelas dan tidak terlalu panjang.'
      );
    }
    
    return result;
  }
  
  // MARK: Helper Methods
  private generateAnonymousId(): string {
    return 'user_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
  // Check if any AI provider is available
  async checkAIAvailability(): Promise<{
    available: boolean;
    primaryHealthy: boolean;
    fallbackCount: number;
  }> {
    // Simple test dengan request kecil
    try {
      const testResult = await aiOrchestrator.execute({
        task: 'analysis',
        input: 'Test',
        options: { userId: this.userId }
      });
      
      return {
        available: testResult.success,
        primaryHealthy: !testResult.fallbackUsed,
        fallbackCount: testResult.fallbackUsed ? 1 : 0
      };
    } catch {
      return {
        available: false,
        primaryHealthy: false,
        fallbackCount: 0
      };
    }
  }
  
  // Get current user ID
  getUserId(): string {
    return this.userId;
  }
  
  // Update user ID (jika user login)
  setUserId(newUserId: string): void {
    this.userId = newUserId;
  }
}

// Export singleton instance
export const secureAIClient = new SecureAIClient();