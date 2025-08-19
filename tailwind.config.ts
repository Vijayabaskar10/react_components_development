import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87'
        },
        indigoX: {
          100: '#e6e6ff',
          200: '#c8c8ff',
          300: '#a9a9ff',
          400: '#8b8bff',
          500: '#6d6dff',
          600: '#4f4fff',
          700: '#3a3ae6'
        },
        amberX: {
          100: '#fff2cc',
          200: '#ffe199',
          300: '#ffd166',
          400: '#ffbf33',
          500: '#ffad00',
          600: '#cc8a00',
          700: '#996700'
        }
      },
      boxShadow: {
        soft: '0 6px 25px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    }
  },
  plugins: []
} satisfies Config
