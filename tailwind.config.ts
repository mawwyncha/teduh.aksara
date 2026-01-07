import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          900: '#05140d',
          950: '#020a06',
        }
      }
    }
  },
  plugins: [],
} satisfies Config