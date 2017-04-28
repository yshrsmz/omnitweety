var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var baseConfig = require("./webpack.config.base.js");
var apikey = require("./apikey-release.json");

const config = merge(baseConfig, {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            TWITTER_API_KEY: JSON.stringify(apikey.consumer_key),
            TWITTER_API_SECRET: JSON.stringify(apikey.consumer_secret),
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        new HtmlWebpackPlugin({
            filename: "manifest.json",
            template: "./src/manifest.json.ejs",
            inject: false,
            appname: "Omnitweety",
            shortcut: "tw",
            appversion: "0.9.1" // TODO: get from package.json
        }),
    ]
});

console.log(config);

module.exports = config;
