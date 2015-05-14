var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
	output: {
		filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: [/node_modules/, /app\/lib/] },
			{ test: /\.html$/, loader: 'raw' },
			{ test: /\.styl/, loader: 'style!css!stylus' },
			{ test: /\.css$/, loader: 'style!css' }
		]
	}
};