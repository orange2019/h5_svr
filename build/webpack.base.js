/**
 * webpack基本配置
 */
const path = require('path')
const webpack = require('webpack')

// html处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

// 文件处理, css|less
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new ExtractTextPlugin('css/[name].[hash].css')
const extractLESS = new ExtractTextPlugin('css/[name].[hash].css')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: path.join(__dirname, './../src/index.js')
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, './../dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract(['css-loader', 'less-loader'])
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    extractCSS,
    extractLESS,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "src/index.html",
      chunks: ['commons', 'app']
    }),
    new webpack.ProvidePlugin({
      // $: 'jquery' // 需要用到jquery去掉注释
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  resolve: {
    // 特别注意，要使用<template>，在js中import vue时要引入编译好的vue.js
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}

module.exports = config