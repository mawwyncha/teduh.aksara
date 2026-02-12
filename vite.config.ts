import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgFixPlugin from "./vite-svg-fix-plugin.js";

export default defineConfig({
  plugins: [
    svgFixPlugin(),
    react(),
  ],
  server: {
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "lucide-react"],
          utils: ["lodash-es", "tone"],
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["css-procedural"], // Exclude problematic lib if needed
  }
});
