// hooks/useAIHealth.ts
// React hook untuk monitoring AI system health

import { useEffect, useState, useCallback } from 'react';
import { aiOrchestrator } from '../services/ai-orchestrator';

export interface ProviderHealth {
  name: string;
  isHealthy: boolean;
  successRate: number;
  avgLatency: number;
  lastUsed: string | null;
}

export interface AIHealthStatus {
  overall: 'healthy' | 'degraded' | 'critical';
  providers: Record<string, ProviderHealth>;
  lastUpdate: string;
  totalRequests: number;
  successfulRequests: number;
}

export const useAIHealth = (updateInterval: number = 30000) => {
  const [health, setHealth] = useState<AIHealthStatus>({
    overall: 'healthy',
    providers: {},
    lastUpdate: new Date().toISOString(),
    totalRequests: 0,
    successfulRequests: 0
  });
  
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  const getProviderName = useCallback((id: string): string => {
    const names: Record<string, string> = {
      gemini: 'Google Gemini',
      deepseek: 'DeepSeek',
      groq: 'Groq',
      huggingface: 'Hugging Face',
      webspeech: 'Web Speech'
    };
    return names[id] || id;
  }, []);

  const updateHealth = useCallback(() => {
    if (!isMonitoring) return;
    
    try {
      const stats = aiOrchestrator.getSystemStats();
      
      const providers: Record<string, ProviderHealth> = {};
      let healthyCount = 0;
      let totalCount = 0;
      let totalRequests = 0;
      let successfulRequests = 0;
      
      Object.entries(stats).forEach(([id, stat]: [string, any]) => {
        const isHealthy = (stat as any).isHealthy && (stat as any).errorRate < 50;
        const successRate = Math.max(0, 100 - (stat as any).errorRate);
        
        providers[id] = {
          name: getProviderName(id),
          isHealthy,
          successRate,
          avgLatency: stat.avgResponseTime || 0,
          lastUsed: stat.lastError ? 'Recently errored' : 'Available'
        };
        
        if (isHealthy) healthyCount++;
        totalCount++;
        totalRequests += stat.successCount + stat.errorCount;
        successfulRequests += stat.successCount;
      });
      
      // Determine overall status
      let overall: 'healthy' | 'degraded' | 'critical' = 'healthy';
      if (healthyCount === 0) {
        overall = 'critical';
      } else if (healthyCount < totalCount) {
        overall = 'degraded';
      }
      
      setHealth({
        overall,
        providers,
        lastUpdate: new Date().toISOString(),
        totalRequests,
        successfulRequests
      });
      
    } catch (error) {
      console.error('Failed to update AI health:', error);
    }
  }, [isMonitoring, getProviderName]);
  
  // Start/stop monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
  }, []);
  
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);
  
  // Initial update
  useEffect(() => {
    updateHealth();
  }, [updateHealth]);
  
  // Periodic updates
  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(updateHealth, updateInterval);
    return () => clearInterval(interval);
  }, [isMonitoring, updateInterval, updateHealth]);
  
  // Check if specific task is likely to work
  const canPerformTask = useCallback((task: string): boolean => {
    const taskProviders: Record<string, string[]> = {
      grammar: ['gemini', 'deepseek', 'groq', 'huggingface'],
      tts: ['gemini', 'webspeech'],
      translation: ['gemini', 'deepseek', 'huggingface'],
      stt: ['gemini', 'webspeech']
    };
    
    const providers = taskProviders[task] || [];
    return providers.some(providerId => {
      const provider = health.providers[providerId];
      return provider?.isHealthy;
    });
  }, [health.providers]);
  
  return {
    health,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    canPerformTask,
    refresh: updateHealth
  };
};