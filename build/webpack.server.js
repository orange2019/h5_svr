/**
 * webpack express开发环境配置
 */
// process.env.NODE_ENV = 'dev'

const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.base')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
let entry = config.entry

for (const key in entry) {
  entry[key] = [entry[key], hotMiddlewareScript]
}

config.entry = entry

module.exports = merge(config, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})