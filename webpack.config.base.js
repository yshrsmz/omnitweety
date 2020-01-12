const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    'js/background': './src/ts/background',
    'js/options': './src/ts/options',
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'js/vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ],
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new CopyWebpackPlugin([
      './assets/*.png',
      { from: './node_modules/vuetify/dist/vuetify.min.css', to: './css', flatten: true }
    ]),
    new HtmlWebpackPlugin({
      title: 'Omnitweety - Background',
      filename: 'background.html',
      chunks: ['js/background', 'js/vendor'],
    }),
    new HtmlWebpackPlugin({
      title: 'Omnitweety - Options',
      filename: 'options.html',
      template: './src/template/options.html.ejs',
      chunks: ['js/options', 'js/vendor'],
    }),
  ]
};
