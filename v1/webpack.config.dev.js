var webpack = require("webpack");

module.exports = {
    entry: {
        "./app/js/background": "./src/ts/background",
        "./app/js/oauth": "./src/ts/oauth",
        "./app/js/options": "./src/ts/options",
    },
    output: {
        path: __dirname,
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
            name: "./app/js/vendor",
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    ]
};
