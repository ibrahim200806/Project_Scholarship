/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        tn: {
          saffron: '#ff6b35',
          orange: '#f97316',
          red: '#dc2626',
          green: '#15803d',
          maroon: '#7f1d1d',
        }
      },
      fontFamily: {
        'tamil': ['Noto Sans Tamil', 'sans-serif'],
        'sans': ['Inter', 'Noto Sans Tamil', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #dc2626 50%, #b91c1c 75%, #7f1d1d 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
      },
      boxShadow: {
        'tn': '0 10px 25px -3px rgba(249, 115, 22, 0.1), 0 4px 6px -2px rgba(249, 115, 22, 0.05)',
        'tn-lg': '0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}