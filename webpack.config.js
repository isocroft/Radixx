var path = require('path');
var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'radixx';
var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.es2015.min.js';
} else {
  outputFile = libraryName + '.es2015.js';
}

module.exports = {
	mode: process.env.NODE_ENV,
	entry:path.resolve(__dirname, '/src/index.js'),
	output:{
		    path: path.resolve(__dirname, './dist'),
	    	filename:"radixx.es2015.js",
		    /*library: 'radixx',
	    	libraryTarget: 'umd',
	    	umdNamedDefine: true*/
	},
	module:{
		loaders: [
			{
			    test: /\.js$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader'
			}
		,
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
	performance: {
	  	hints: false
	},
	devtool: 'source-map',
  plugins: plugins
};
