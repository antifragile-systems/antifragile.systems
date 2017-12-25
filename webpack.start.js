/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.config')

const { resolve } = require('path')

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name].[hash:8].js', // TODO: https://github.com/webpack/webpack/issues/2393
    path: resolve(__dirname, 'tmp')
  },
  module: {
    rules: [
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  devServer: {
    port: process.env.WEBPACK_DEV_PORT || 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: 'minimal'
  }
})
