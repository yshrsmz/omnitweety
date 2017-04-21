module.exports = {
    entry: {
        "./app/js/background": "./src/ts/background",
        "./app/js/oauth": "./src/ts/oauth",
        "./app/js/options": "./src/ts/options"
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
    }
};
