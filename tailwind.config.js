/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./*{js,ts,jsx,tsx,mdx}", // السطر ده بيخليه يشوف أي ملف في الـ root
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}