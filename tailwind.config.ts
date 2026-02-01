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
        },
        petal: {
          50: '#fdf6f0',
          100: '#ffffff',
          200: '#ffe4e6',
          400: '#f472b6',
          500: '#ec4899',
          800: '#3d2b1f',
          900: '#2a1a12'
        }
      }
    }
  },
  plugins: [],
} satisfies Config