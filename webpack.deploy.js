/*
 * Copyright (c) 2017, Hugo Freire <hugo@antifragile.systems>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const commonConfig = require('./webpack.config')

const extractSassPlugin = new ExtractTextPlugin({ filename: 'assets/styles/[name].[contenthash:8].css' })

module.exports = webpackMerge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSassPlugin.extract({
          use: [ 'css-loader', 'sass-loader' ],
          fallback: 'style-loader',
          publicPath: '/'
        })
      },
    ]
  },
  plugins: [
    extractSassPlugin,
    new FaviconsWebpackPlugin({
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
    new S3Plugin({
      s3Options: {
        region: process.env.AWS_REGION
      },
      s3UploadOptions: {
        Bucket: process.env.AWS_S3_BUCKET || 'antifragile.systems'
      },
      cloudfrontInvalidateOptions: {
        DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
        Items: [ '/*' ]
      }
    })
  ],
})
