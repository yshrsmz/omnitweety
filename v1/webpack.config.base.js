var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");


const config = {
    entry: {
        "js/background": "./src/ts/background",
        "js/oauth": "./src/ts/oauth",
        "js/options": "./src/ts/options",
    },
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "[name].js"
    },
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
    ]
};

module.exports = config;
