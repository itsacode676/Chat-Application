/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-hot-toast/dist/index.js'],
    // Add other necessary configurations
  },
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

