const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		main: [
            "@babel/polyfill", 
            "./index.ts"
        ],
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
        extensions: ['.ts', '.js', '.json'],
	},
	devServer: {
		port: 4200,
		hot: true
	},
	module: {
		rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:    /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
		],
	},
	plugins: [
		new HTMLWebpackPlugin({template: "./index.html"}),
		new CleanWebpackPlugin(),
	]
};