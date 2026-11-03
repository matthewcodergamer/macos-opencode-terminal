/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['SF Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        mac: {
          red: '#FF5F56',
          yellow: '#FFBD2E',
          green: '#27C93F',
          dark: '#1e1e1e',
          light: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}