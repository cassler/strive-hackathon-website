const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/styles/**/*"
  ],
  darkMode: 'class',
  theme: {
    colors: ({ theme }) => ({
      brand: colors.blue,
      brand2: colors.green,
      brand3: colors.orange,
      ...colors
    }),
    extend: {
      animation: {
        fadeIn: 'fadeIn 200ms ease-in-out',
        fadeOut: 'fadeOut 200ms ease-in-out',
      },
      colors: ({theme}) => ({
        'brand-orange': '#D7832A',
        'brand-orange-light': '#F7A700',
        'brand-blue': '#4497CB',
        'brand-blue-light': '#71CFEB',
        'brand-green': '#6CA438',
        'brand-green-light': '#A3D55D',
      }),
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      }),
    },
  },
  plugins: [],
}
