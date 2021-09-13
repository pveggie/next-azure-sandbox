const baseConfig = require('../prettier.config')
const tailwind = require('prettier-plugin-tailwind')

module.exports = {
  ...baseConfig,
  plugins: [tailwind],
}
