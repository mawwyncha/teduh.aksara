// tailwind.config.cjs - FULL dengan semua tema/fitur kamu
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          900: '#05140d',
          950: '#020a06'
        },
        petal: {
          50: '#fdf6f0',
          100: '#ffffff',
          200: '#ffe4e6',
          400: '#f472b6',
          500: '#ec4899',
          800: '#3d2b1f',
          900: '#2a1a12'
        },
        red: {
          50: 'oklch(97.1% 0.013 17.38)',
          500: 'oklch(63.7% 0.237 25.331)',
          600: 'oklch(57.7% 0.245 27.325)',
        },
        blue: {
          50: 'oklch(97% 0.014 254.604)',
          500: 'oklch(62.3% 0.214 259.815)',
          600: 'oklch(54.6% 0.245 262.881)',
        },
        green: {
          50: 'oklch(98.2% 0.018 155.826)',
          500: 'oklch(72.3% 0.219 149.579)',
          600: 'oklch(62.7% 0.194 149.214)',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      }
    }
  },
  plugins: [],
}