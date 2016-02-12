"use strict";

let path = require("path"),
	webpack = require("webpack"),
	isomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin")

// webpack-isomorphic-tools settings reside in a separate .js file
// (because they will be used in the web server code too).
// also enter development mode (.development()) to disable asset caching
// and enable hot reloading
let webpack_isomorphic_tools = new isomorphicToolsPlugin(require("./webpack-isomorphic-tools-config")).development();

module.exports = {
	entry: [
		"webpack-hot-middleware/client",
		"./client"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/static/"
	},
	resolve: {
		root: path.resolve(__dirname, "common")
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				loader: "babel", 
				exclude: /node_modules/,
				include: __dirname
			},
			{ test: /\.css$/, loader: "style!css" },
			{
				test: webpack_isomorphic_tools.regular_expression("images"),
				loader: "file-loader?limit=10240" // any image below or equal to 10K will be converted to inline base64 instead
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		webpack_isomorphic_tools
	]
}
