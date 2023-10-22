/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#010101',
      }, 
      screens: {
        '-sm': { max: '640px' },
        '-lg': { max: '800px'}
      }
    },
  },
  plugins: [],
}