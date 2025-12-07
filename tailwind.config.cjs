/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Syne', 'system-ui', 'sans-serif'],
        'body': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pure dark palette
        dark: {
          950: '#050505',
          900: '#0A0A0A',
          800: '#111111',
          700: '#181818',
          600: '#222222',
        },
        // Electric lime accent
        lime: {
          400: '#BFFF00',
          500: '#A8E000',
          600: '#8BC700',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-lime': '0 0 30px rgba(191, 255, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
