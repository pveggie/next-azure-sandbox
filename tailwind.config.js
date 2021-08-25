const tailwindForms = require('@tailwindcss/forms')
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio')

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
    extend: {
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      padding: ['first', 'last'],
    },
  },
  plugins: [tailwindForms, tailwindAspectRatio],
}
