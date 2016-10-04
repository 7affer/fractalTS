var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'./src/scripts/main.ts',
			'./src/styles/styles.scss'
		],
		worker: [
			'./src/scripts/fractals/worker.fractal.ts'
		]
	},
	output: {
		path: './dist/',
		filename: 'scripts/[name].bundle.js'
	},
	externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery",
		"lodash": "_"
	},
	devtool: 'source-map',
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("styles/styles.css"),
		new CopyWebpackPlugin([
			{
				from: 'node_modules/jquery/dist',
				to: 'assets/jquery'
			},
			{
				from: 'src/resources/jquery-ui-1.12.1',
				to: 'assets/jquery-ui'
			},
			{
				from: 'node_modules/bootstrap/dist',
				to: 'assets/bootstrap'
			},
			{
				from: 'node_modules/lodash/lodash.min.js',
				to: 'assets/lodash/lodash.min.js'
			},
			{
				from: 'node_modules/jquery-minicolors',
				to: 'assets/jquery-minicolors'
			},
			{
				from: 'src/index.html'
			}
		],
			{
				copyUnmodified: true
			}
		)
	],
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			}
		]
	}
}