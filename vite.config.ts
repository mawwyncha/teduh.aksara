import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        visualizer({ 
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
        })
      ],
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
            manualChunks(id) {
              // Split node_modules into separate chunks
              if (id.includes('node_modules')) {
                // Core React libraries
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'react-vendor';
                }
                // Router
                if (id.includes('react-router')) {
                  return 'router';
                }
                // UI libraries (adjust based on what you're using)
                if (id.includes('lucide-react') || id.includes('@radix-ui')) {
                  return 'ui-vendor';
                }
                // Other node_modules
                return 'vendor';
              }
            }
          }
        },
        chunkSizeWarningLimit: 600,
        sourcemap: false, // Disable sourcemaps in production to reduce size
      }
    };
});