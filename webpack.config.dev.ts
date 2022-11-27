import webpack from 'webpack'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import baseConfig from './webpack.config.base'
import packageJson from './package.json'
import apikey from './apikey-release.json'

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      TWITTER_API_KEY: JSON.stringify(apikey.consumer_key),
      TWITTER_API_SECRET: JSON.stringify(apikey.consumer_secret),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      filename: 'manifest.json',
      template: './src/template/manifest.json.ejs',
      inject: false,
      appname: 'Omnitweety - Dev',
      shortcut: 'twd',
      appversion: packageJson.version,
    }),
  ],
})

export default config
