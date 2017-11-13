const path = require("path");

module.exports = {
	devtool: "source-map",
	entry: path.resolve(__dirname, "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "observe-thing.umd.js",
		library: "observe-thing",
		libraryTarget: "umd"
	},
	externals: [],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader" 
			}
		]
	}
}
