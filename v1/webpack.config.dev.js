var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var baseConfig = require("./webpack.config.base.js");
var packageJson = require("./package.json");
var apikey = require("./apikey-dev.json");

const config = merge(baseConfig, {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            TWITTER_API_KEY: JSON.stringify(apikey.consumer_key),
            TWITTER_API_SECRET: JSON.stringify(apikey.consumer_secret),
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        new HtmlWebpackPlugin({
            filename: "manifest.json",
            template: "./src/manifest.json.ejs",
            inject: false,
            appname: "Omnitweety - Dev",
            shortcut: "twd",
            appversion: packageJson.version,
        }),
    ]
});

module.exports = config;
