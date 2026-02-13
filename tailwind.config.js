/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Sesuaikan dengan ekstensi file Anda
    "./*.html", // Untuk file HTML di root
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}