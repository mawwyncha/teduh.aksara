/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Support untuk class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      // Custom Colors untuk tema Nusantara
      colors: {
        // Forest/Emerald theme (Dark Mode)
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#0a1f12',
        },
        // Petal theme (Flower Mode)
        petal: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9f1239',
          900: '#831843',
          950: '#500724',
        },
      },
      // Custom Animations
      animation: {
        // Floating animation untuk elemen yang melayang
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        
        // Pulse animations
        'pulse-soft': 'pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        
        // Shimmer effect
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmer 3s linear infinite',
        
        // Bounce variations
        'bounce-soft': 'bounce-soft 2s infinite',
        'bounce-delayed': 'bounce 2s infinite 0.5s',
        
        // Spin variations
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 3s linear infinite',
        
        // Slide animations
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-left': 'slide-left 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out',
        
        // Fade animations
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        
        // Scale animations
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out',
        
        // Wave effect
        'wave': 'wave 2s ease-in-out infinite',
        
        // Wiggle effect
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wiggle-slow': 'wiggle 2s ease-in-out infinite',
        
        // Gradient animation
        'gradient': 'gradient 8s ease infinite',
        
        // Heartbeat
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        
        // Jello effect
        'jello': 'jello 1s ease-in-out',
        
        // Swing
        'swing': 'swing 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
          },
          '50%': { 
            opacity: '0.9',
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bounce-soft': {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateY(-15%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'fade-in-up': {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          from: { 
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          from: { transform: 'scale(0)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '56%': { transform: 'scale(1)' },
        },
        jello: {
          '0%, 100%': { transform: 'skewX(0deg) skewY(0deg)' },
          '30%': { transform: 'skewX(25deg) skewY(25deg)' },
          '40%': { transform: 'skewX(-15deg) skewY(-15deg)' },
          '50%': { transform: 'skewX(15deg) skewY(15deg)' },
          '65%': { transform: 'skewX(-5deg) skewY(-5deg)' },
          '75%': { transform: 'skewX(5deg) skewY(5deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
        },
      },
      // Custom Box Shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 12px 25px -5px rgba(0, 0, 0, 0.05)',
        'hard': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow-emerald': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.5)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      // Custom Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },
      // Custom Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      // Custom Transitions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '2000': '2000ms',
      },
      // Custom Z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Custom Typography
      fontSize: {
        'xxs': '0.625rem',
      },
      // Custom Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      // Background Images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      // Background Size
      backgroundSize: {
        '200%': '200% auto',
      },
    },
  },
  plugins: [],
}
