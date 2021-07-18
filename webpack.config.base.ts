import path from 'path'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
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

const module: webpack.ModuleOptions = {
  rules,
}

const plugins: webpack.WebpackPluginInstance[] = [
  new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer'],
  }),
  new VueLoaderPlugin(),
  new VuetifyLoaderPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      './assets/*.png',
      {
        from: './node_modules/vuetify/dist/vuetify.min.css',
        to: './css/[name][ext]',
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
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
    },
  },
  optimization: {
    splitChunks: {
      filename: 'js/[name].js',
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
