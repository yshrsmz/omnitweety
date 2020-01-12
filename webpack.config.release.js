const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');
const packageJson = require('./package.json');
const apikey = require('./apikey-release.json');

const config = merge(baseConfig, {
  optimization: {
    minimize: true
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      TWITTER_API_KEY: JSON.stringify(apikey.consumer_key),
      TWITTER_API_SECRET: JSON.stringify(apikey.consumer_secret),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manifest.json',
      template: './src/template/manifest.json.ejs',
      inject: false,
      appname: 'Omnitweety',
      shortcut: 'tw',
      appversion: packageJson.version,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});

module.exports = config;
