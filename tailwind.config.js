/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tailwindForms = require('@tailwindcss/forms')

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './styles/**/*.css',
    ],
    safelist: ['h-20', 'top-20'],
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      padding: ['first', 'last'],
    },
  },
  plugins: [tailwindForms],
}
