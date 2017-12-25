/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const { resolve, basename } = require('path')

const isDevServer = basename(require.main.filename) === 'webpack-dev-server.js'
const extractSass = new ExtractTextPlugin({
  filename: 'assets/styles/[name].[contenthash:8].css',
  disable: isDevServer
})

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },
  output: {
    filename: `[name].${isDevServer ? '[hash:8]' : '[chunkhash:8]'}.js`, // TODO: https://github.com/webpack/webpack/issues/2393
    path: resolve(__dirname, 'tmp')
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: [ '@angularclass/hmr-loader', 'awesome-typescript-loader', 'angular2-template-loader' ] },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.scss$/,
        use: extractSass.extract({ use: [ 'css-loader', 'sass-loader' ], fallback: 'style-loader', publicPath: '/' })
      },
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
    isDevServer ? { apply: () => {} } : new FaviconsWebpackPlugin({
      title: 'Antifragile Systems',
      logo: './src/assets/images/logo.svg',
      prefix: 'assets/icons/logo.[hash:8].svg/',
      persistentCache: true,
      icons: {
        opengraph: true,
        twitter: true,
        windows: true
      }
    }),
    new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)esm5/, resolve(__dirname, 'src'), {}),
    new NamedModulesPlugin(),
    extractSass,
    isDevServer ? { apply: () => {} } : new S3Plugin({
      s3Options: {
        region: 'eu-west-1'
      },
      s3UploadOptions: {
        Bucket: 'antifragile.systems'
      },
      cloudfrontInvalidateOptions: {
        DistributionId: 'EXZHGHK65UYXC',
        Items: [ '/*' ]
      }
    })
  ],
  devServer: {
    port: process.env.WEBPACK_DEV_PORT || 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: 'minimal'
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
