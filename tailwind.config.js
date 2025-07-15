/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Unified palette: Figma Swash + Rolex + supporting neutrals
        background: '#F5F9F7', // Pearl White (Light)
        'background-dark': '#0B1A17', // Dark Mode Background
        'card-dark': '#112722', // Dark Mode Card
        primary: '#054C3F', // Emerald Green (Swash)
        'primary-hover': '#033127', // Emerald Green (Hover)
        secondary: '#B0A160', // Muted Gold
        text: '#202020', // Main Text (Light)
        'text-dark': '#E2E8E4', // Main Text (Dark)
        accent: '#CBB26A', // Accent (Dark Mode)
        // Rolex palette
        rolex: {
          green: '#00391A', // Deep emerald
          gold: '#B89B36', // Darker, more subtle gold
          champagne: '#F8F2DC', // Champagne
          ivory: '#FAFAF5', // Soft ivory
          charcoal: '#1C1C1C', // Charcoal for text
          darkGreen: '#0D1A12', // Very dark green
          emeraldGray: '#162A1E', // Muted green-gray
          softWhite: '#EAEAEA', // Soft white for cards
          mutedChampagne: '#C8C6AC', // Muted accent
          brassHover: '#B8860B', // Button hover
        },
        // Supporting neutrals
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};