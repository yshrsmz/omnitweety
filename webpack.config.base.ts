import path from 'path'
import webpack from 'webpack'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  {
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/],
    },
  },
  {
    test: /\.s(c|a)ss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        // Requires sass-loader@^8.0.0
        options: {
          implementation: require('sass'),
          sassOptions: {
            fiber: require('fibers'),
            indentedSyntax: true, // optional
          },
        },
      },
    ],
  },
]

const module: webpack.Module = {
  rules,
}

const plugins: webpack.Plugin[] = [
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      './assets/*.png',
      {
        from: './node_modules/vuetify/dist/vuetify.min.css',
        to: './css',
        flatten: true,
      },
    ],
  }),
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

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    'js/background': './src/ts/background',
    'js/options': './src/ts/options',
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'js/vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  devtool: '#eval-source-map',
  module,
  plugins,
}

export default config
