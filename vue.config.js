module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.REPOSITORY_NAME + '/'
    : '/',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
