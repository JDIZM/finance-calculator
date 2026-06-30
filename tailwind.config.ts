import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: ['./pages/**/*.{vue,ts}', './src/**/*.{vue,ts,js,tsx,jsx}', './.storybook/**/*.{ts,js}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#064E3B',
          700: '#0E7C5B',
          500: '#10B981',
        },
        ink: {
          950: '#0f172a',
          900: '#1B1F1D',
        },
        accent: {
          indigo: '#3730A3',
        },
        surface: {
          cream: '#F5F1E8',
          'off-white': '#F9FAFB',
          rule: '#E2DED1',
        },
      },
      borderRadius: {
        slab: '14px',
        pill: '9999px',
      },
      boxShadow: {
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
        soft: '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'soft-lg': '0 4px 25px -5px rgba(0,0,0,0.1), 0 15px 30px -5px rgba(0,0,0,0.05)',
      },
      fontFamily: {
        display: ['"Montserrat Variable"', 'Montserrat', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        widest: '0.14em',
      },
      lineHeight: {
        heading: '0.95',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [forms],
} satisfies Config
