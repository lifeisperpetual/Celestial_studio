/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f2ff',
          200: '#b3e5ff',
          300: '#85d2ff',
          400: '#52b9ff',
          500: '#2a9eff',
          600: '#1a7ae6',
          700: '#165fba',
          800: '#144f96',
          900: '#133f74'
        }
      }
    }
  },
  plugins: []
};
