/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core dark palette
        dark: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252530',
          500: '#2e2e3a',
        },
        // Gold/Saffron for spiritual prints
        saffron: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        gold: {
          50: '#fdf6e3',
          100: '#f5e6c8',
          200: '#e8d5a3',
          300: '#d4bc7c',
          400: '#c5a55a',
          500: '#b8943f',
          600: '#a07d35',
          700: '#86662b',
          800: '#6d5023',
          900: '#5a411d',
        },
        // Neon accents for stickers
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff00e5',
          green: '#39ff14',
          pink: '#ff1493',
          purple: '#b026ff',
          orange: '#ff6600',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        spiritual: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #ffa000, #ffc107, #ffd54f, #ffc107, #ffa000)',
        'neon-glow': 'linear-gradient(135deg, #00f5ff, #ff00e5, #39ff14)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 193, 7, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'neon-flicker': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(255, 193, 7, 0.15)',
        'gold-lg': '0 0 60px rgba(255, 193, 7, 0.25)',
        'neon': '0 0 30px rgba(0, 245, 255, 0.15)',
        'neon-lg': '0 0 60px rgba(0, 245, 255, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
}
