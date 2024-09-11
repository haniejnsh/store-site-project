/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bl1:"#eff6ff",
        bl2:"#dbeafe"
      }
    },
  },
  plugins: [],
}