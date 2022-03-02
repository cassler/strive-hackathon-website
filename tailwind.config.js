const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

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
      fontFamily: {
        sans: ["Gotham SSm A", "Gotham SSm B", ...defaultTheme.fontFamily.sans],
        serif: ["Archer SSm A", "Archer SSm B", ...defaultTheme.fontFamily.serif]
      },
      colors: ({theme}) => ({
        'brand-orange': '#D7832A',
        'brand-orange-light': '#F7A700',
        'brand-blue': '#4497CB',
        'brand-blue-light': '#71CFEB',
        'brand-green': '#6CA438',
        'brand-green-light': '#A3D55D',
      }),
      scale: {
        '25': '0.25',
        '5': '0.05',
        '50': '0.5'
      },
      duration: {
        '2000': '2sec'
      },
      rotate: {
        '30': '30deg',
        '20': '20deg',
      },
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
