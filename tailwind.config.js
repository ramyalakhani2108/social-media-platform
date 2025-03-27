/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd4ff',
          300: '#8eb8ff',
          400: '#5b91ff',
          500: '#3366ff',
          600: '#1940ff',
          700: '#1133ff',
          800: '#1429db',
          900: '#1724a8',
          950: '#121b59',
        },
      },
    },
  },
  plugins: [],
};