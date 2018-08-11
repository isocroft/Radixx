var path = require('path');
var webpack = require('webpack');
var env = require('yargs').argv.env; // use --env with webpack 2
var pkg = require('./package.json');

// var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var libraryName = pkg.name, plugins = [], outputFile, mode;

if (env === 'build') {
  	// plugins.push(new UglifyJsPlugin({ minimize: true }));
  	outputFile = libraryName + '.es2015.min.js';
  	mode = 'production';
} else {
  	outputFile = libraryName + '.es2015.js';
	mode = 'development';
}

module.exports = {
	mode: mode,
	entry:path.resolve(__dirname, '/src/es/index.js'),
	output:{
	    	path: path.resolve(__dirname, './dist'),
	    	filename:outputFile/*,
	    	library: libraryName,
	    	libraryTarget: 'umd',
	    	umdNamedDefine: true*/
	},
	module:{
		rules: [
		      {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		      }/*,
		      {
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		      }*/
		]
	},
  	resolve: {
	    	modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js']
  	},
	performance: {
	  	hints: false
	},
	devtool: 'source-map'/*,
  	plugins: plugins */
};
