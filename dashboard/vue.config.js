// vue.config.js
module.exports = {
    // options...
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/ui/analytics-spin-1.0/'
    : '/'
  }