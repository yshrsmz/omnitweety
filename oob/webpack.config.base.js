const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'js/background': './src/ts/background',
        'js/oauth': './src/ts/oauth',
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

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
