const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'app', 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

const environment = process.env.NODE_ENV || 'production'

const paths = {
  ENTRY: path.join(__dirname, 'app', 'main.js'),
  OUTPUT_FILENAME: 'bundle.js',
  OUTPUT: path.join(__dirname, 'build', 'static'),
  APP: path.join(__dirname, 'app')
}

const config = {
  entry: [
    paths.ENTRY
  ],
  resolve: {
    alias: {
      'marionette': 'backbone.marionette',
      'underscore': 'lodash'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: paths.APP,
        exclude: [/node_modules/, path.join(__dirname, 'build'), paths.OUTPUT],
        use: ['babel-loader', 'standard-loader']
      },
      { test: /\.html/, include: path.join(paths.APP, 'templates'), loader: 'underscore-template-loader' },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: path.join(paths.APP, 'public')
        })
      }
    ]
  },
  output: {
    filename: paths.OUTPUT_FILENAME,
    path: paths.OUTPUT,
    chunkFilename: '[id].js'
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        babel: {
          babelrc: true
        }
      }
    })
  ]
}

if (environment === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  )
}

module.exports = config
