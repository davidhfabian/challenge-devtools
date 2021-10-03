/* craco.config.js */
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      components: path.resolve(__dirname, 'src/common/components'),
      hooks: path.resolve(__dirname, 'src/common/hooks'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  }
}
