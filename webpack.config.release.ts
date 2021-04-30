import webpack from 'webpack'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import baseConfig from './webpack.config.base'
import packageJson from './package.json'
import apikey from './apikey-release.json'

const config = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
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
      minimize: true,
    }),
  ],
})

export default config
