/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey-900': '#1a1a1a',
        'grey-500': '#888888',
        'grey-300': '#cccccc',
        'grey-200': '#d9d9d9',
        'mint': '#b3ffb3',
      },
      spacing: {
        '62.5': '250px',
      },
    },
  },
  plugins: [],
}
