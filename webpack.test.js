/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.config')

const nodeExternals = require('webpack-node-externals')

module.exports = webpackMerge(commonConfig, {
  externals: [
    nodeExternals()
  ]
})
