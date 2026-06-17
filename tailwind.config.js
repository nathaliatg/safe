/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FAF5FD',
          100: '#F2E8F8',
          200: '#E3CBEC',
          300: '#CFA8DC',
          400: '#B882C8',
          500: '#9B5CB0',
          600: '#7C3E91',
          900: '#1A1025',
        },
        sage: {
          100: '#EDF5F0',
          300: '#A8D4BB',
          500: '#5BAA7E',
        },
        action: {
          DEFAULT: '#AFC8B1',
          hover:   '#8DB395',
          text:    '#1F4229',
          light:   '#E8F3EA',
          border:  '#7A9E81',
        },
        safe: {
          bg:     '#EDFAF3',
          border: '#4CAF82',
          text:   '#1E7A4F',
        },
        moderate: {
          bg:     '#FFF8EC',
          border: '#F5A623',
          text:   '#9C6600',
        },
        high: {
          bg:     '#FFF0F3',
          border: '#E85D75',
          text:   '#A8002B',
        },
        neutral: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          400: '#9CA3AF',
          600: '#4B5563',
          900: '#111827',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '20px',
        '3xl': '32px',
      },
      boxShadow: {
        'sm':    '0 1px 3px rgba(0,0,0,0.08)',
        'md':    '0 4px 12px rgba(0,0,0,0.10)',
        'lg':    '0 8px 24px rgba(155,92,176,0.15)',
        'xl':    '0 16px 48px rgba(155,92,176,0.20)',
        'focus': '0 0 0 3px rgba(227,203,236,0.8)',
      },
    },
  },
  plugins: [],
}
