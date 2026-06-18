/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: '#eefbf4',
          100: '#d8f6e4',
          200: '#b0eac8',
          300: '#7fd8a7',
          400: '#47bd7b',
          500: '#249960',
          600: '#1d784c',
          700: '#195f3d',
          800: '#174c32',
          900: '#123d28'
        }
      }
    }
  },
  plugins: [],
};
