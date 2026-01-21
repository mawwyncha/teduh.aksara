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
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Split node_modules menjadi chunks terpisah
              if (id.includes('node_modules')) {
                // Lodash ke chunk terpisah (karena besar)
                if (id.includes('lodash')) {
                  return 'lodash-vendor';
                }
                
                // React & React-DOM ke chunk terpisah
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'react-vendor';
                }
                
                // Lucide icons jika ada
                if (id.includes('lucide-react')) {
                  return 'icons-vendor';
                }
                
                // Semua vendor lainnya
                return 'vendor';
              }
            },
          },
        },
        // Optional: naikkan limit warning
        chunkSizeWarningLimit: 600,
      }
    };
});