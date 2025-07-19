/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     fontFamily: {
  headline: ['Outfit', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
      colors: {
        primary: {
          DEFAULT: '#FFD700',
          50: '#FFFBE6',
          100: '#FFF7CC',
          200: '#FFF099',
          300: '#FFE866',
          400: '#FFE033',
          500: '#FFD700',
          600: '#CCA000',
          700: '#997800',
          800: '#665000',
          900: '#332800',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          50: '#333333',
          100: '#2C2C2C',
          200: '#252525',
          300: '#1F1F1F',
          400: '#1A1A1A',
          500: '#141414',
          600: '#0F0F0F',
          700: '#0A0A0A',
          800: '#050505',
          900: '#000000',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 5s linear infinite',
      },
    },
  },
  plugins: [],
}