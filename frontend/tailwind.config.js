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
        // Novoplast core green
        novo: {
          50: '#f4fbf0',
          100: '#e6f7de',
          200: '#cceebb',
          300: '#a3de8a',
          400: '#7ac959',
          500: '#8bcc63', // logo core lime green
          600: '#69b342',
          700: '#4d8a2f',
          800: '#3c6b25',
          900: '#325721',
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
        'novo-shimmer': 'linear-gradient(135deg, #69b342, #8bcc63, #a3de8a, #8bcc63, #69b342)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 204, 99, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 204, 99, 0.6)' },
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
        'shimmer': {
          '100%': { transform: 'translateX(200%)' },
        },
      },
      boxShadow: {
        'novo': '0 0 30px rgba(139, 204, 99, 0.15)',
        'novo-lg': '0 0 60px rgba(139, 204, 99, 0.25)',
        'neon': '0 0 30px rgba(0, 245, 255, 0.15)',
        'neon-lg': '0 0 60px rgba(0, 245, 255, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
}
