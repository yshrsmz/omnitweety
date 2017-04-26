var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var apikey = require("./apikey-dev.json");

module.exports = {
    entry: {
        "js/background": "./src/ts/background",
        "js/oauth": "./src/ts/oauth",
        "js/options": "./src/ts/options",
    },
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {loader: "ts-loader"}
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "js/vendor",
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.DefinePlugin({
            TWITTER_API_KEY: JSON.stringify(apikey.consumer_key),
            TWITTER_API_SECRET: JSON.stringify(apikey.consumer_secret),
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        new HtmlWebpackPlugin({
            title: "Omnitweety - Background",
            filename: "background.html",
            chunks: ["js/background", "js/vendor"],
        }),
        new HtmlWebpackPlugin({
            title: "Omnitweety - Options",
            filename: "options.html",
            chunks: ["js/options", "js/vendor"],
        }),
        new HtmlWebpackPlugin({
            title: "Omnitweety - Auth",
            filename: "oauth.html",
            chunks: ["js/oauth", "js/vendor"]
        }),
        new HtmlWebpackPlugin({
            filename: "manifest.json",
            template: "./src/manifest.json.ejs",
            inject: false,
            appname: "Omnitweety - Dev",
            shortcut: "twd",
            appversion: "0.9.1"
        }),
    ]
};
