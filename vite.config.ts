import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: {
              // Split Google GenAI ke chunk terpisah
              'google-genai': ['@google/genai'],
              // Split React
              'react-vendor': ['react', 'react-dom'],
            },
          },
        },
        chunkSizeWarningLimit: 600,
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});