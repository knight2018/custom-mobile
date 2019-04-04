const vuxLoader = require('vux-loader')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/cust/'
  : ''


module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui', 'duplicate-style']
    })
  },
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://192.168.1.194:7001/custom' // 本地
  }
}
