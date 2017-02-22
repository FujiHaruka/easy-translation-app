const webpack = require('webpack')
const { resolve } = require('path')
const values = require('postcss-modules-values')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const util = require('util')

module.exports = {
  entry: resolve('./src/index'),
  output: {
    path: resolve('./public/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        postcss: [
          values,
          autoprefixer
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: [ 'es2015', 'react' ]
        },
        include: __dirname,
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  }
}
