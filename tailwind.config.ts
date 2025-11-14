import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          pink: '#FFB6C1',
          lilac: '#E6E6FA',
          blue: '#87CEEB',
          mint: '#98FB98',
          gold: '#FFD700',
        },
        pastel: {
          pink: '#FCE4EC',
          lilac: '#F3E5F5',
          blue: '#E1F5FE',
          mint: '#E8F5E9',
        }
      },
      fontFamily: {
        'magical': ['Dancing Script', 'cursive'],
        'elegant': ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'butterfly': 'butterfly 15s ease-in-out infinite',
        'bloom': 'bloom 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        butterfly: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(100px, -50px) rotate(10deg)' },
          '50%': { transform: 'translate(200px, 0) rotate(-10deg)' },
          '75%': { transform: 'translate(100px, 50px) rotate(10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        bloom: {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(-90deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

export default config