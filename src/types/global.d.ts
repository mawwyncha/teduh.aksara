// src/types/global.d.ts atau types/global.d.ts
declare global {
  interface Window {
    grecaptcha: any;
    onSubmitCaptcha?: (token: string) => Promise<void>;
  }
  
  // Untuk AI stats
  interface AIProviderStats {
    isHealthy: boolean;
    errorRate: number;
    avgResponseTime: number;
    lastError?: string;
    successCount: number;
    errorCount: number;
  }
}

export {};