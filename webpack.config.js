/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const ENVIRONMENT = process.env.ENVIRONMENT || 'production'

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin')

const { resolve } = require('path')

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },
  output: {                                  
    filename: '[name].[chunkhash:8].js',
    path: resolve(__dirname, 'tmp')
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: [ '@angularclass/hmr-loader', 'awesome-typescript-loader', 'angular2-template-loader' ] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.html$/, use: 'raw-loader' },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: { loader: 'file-loader', options: { name: '[name].[hash:8].[ext]', outputPath: 'assets/images/' } }
      },
      { test: /\.(eot|woff2?|ttf|ico)([?]?.*)$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({ name: 'polyfills', chunks: [ 'polyfills' ] }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: (a, b) => { // TODO: https://github.com/AngularClass/angular-starter/issues/353
        const order = [ 'polyfills', 'main' ]
        return order.indexOf(a.names[ 0 ]) - order.indexOf(b.names[ 0 ])
      }
    }),
    new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)esm5/, resolve(__dirname, 'src'), {}),
    new NamedModulesPlugin(),
    new EnvironmentPlugin({ ENVIRONMENT })
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
