/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        turmeric: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#EAA122',
          600: '#D98A10',
        },
        chilli: {
          500: '#C23B22',
          600: '#A72D17',
        },
        forest: {
          800: '#1B3B2B',
          900: '#11271C',
        },
        paper: '#FAF7F2',
        charcoal: '#121413',
      },
    },
  },
  plugins: [],
};
