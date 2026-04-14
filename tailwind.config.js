/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#d34027',
        container: '#ea580c',
        50: '#fef5f3',
        100: '#fde8e3',
        200: '#fbd6cc',
        300: '#f7bfb0',
        400: '#f1a38f',
        500: '#d34027',
        600: '#b91c1c',
        700: '#9b1515',
        800: '#7d1111',
        900: '#650d0d',
      },
      secondary: '#4a5568',
      surface: '#fdfbf7',
      'brand-on-surface': '#1a202c',
      white: '#ffffff',
      transparent: 'transparent',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
      },
      red: {
        50: '#fef2f2',
        600: '#dc2626',
      },
    },
    extend: {
      fontFamily: {
        manrope: '"Manrope", sans-serif',
      },
      spacing: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        ambient: '0 4px 6px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  plugins: [],
}
