import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: Define __dirname for ESM as it is not available by default
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // OPTIMIZED: Disable sourcemap in production for smaller bundle
        sourcemap: mode === 'development',
        
        // OPTIMIZED: Use terser for better minification
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,  // Remove console.log in production
            drop_debugger: true, // Remove debugger statements
            pure_funcs: ['console.log', 'console.info'], // Remove specific functions
          },
        },
        
        rollupOptions: {
          output: {
            // OPTIMIZED: Smart chunking strategy for better caching
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                // React ecosystem - most stable, cache longer
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'react-vendor';
                }
                
                // Heavy audio library - separate chunk
                if (id.includes('tone')) {
                  return 'tone-vendor';
                }
                
                // AI library - separate for async loading
                if (id.includes('@google/genai')) {
                  return 'ai-vendor';
                }
                
                // Icons - separate for tree-shaking
                if (id.includes('lucide-react')) {
                  return 'icons-vendor';
                }
                
                // Lodash utilities
                if (id.includes('lodash')) {
                  return 'lodash-vendor';
                }
                
                // Everything else
                return 'vendor';
              }
               if (id.includes('/components/') && id.includes('Modal')) {
                return 'modals';
              }
            },
            
            // OPTIMIZED: Better file naming for caching
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
          },
        },
        
        // OPTIMIZED: Increase chunk size warning limit
        chunkSizeWarningLimit: 600,
        
        // OPTIMIZED: Enable CSS code splitting
        cssCodeSplit: true,
      },
      
      // OPTIMIZED: Pre-bundle dependencies for faster dev
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'lucide-react',
        ],
      },
    };
});