/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        opencode: {
          bg: '#201d1d',       // Warm near-black canvas
          surface: '#302c2c',  // Elevation shift for inputs
          text: '#fdfcfc',     // Warm off-white
          dim: '#9a9898',      // Dimmed text
          border: '#3d3838',   // Flat border ring
          red: '#ff3b30',
          yellow: '#ff9f0a',
          green: '#30d158',
          blue: '#007aff',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
