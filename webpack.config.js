/* eslint-disable */
const path = require('path');

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'App.jsx')
	],
	output: {
		path: path.join(__dirname, '_build', 'js'),
		publicPath: "js",
		filename: 'bundle.js',
		sourceMapFilename: '[file].map'
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			include: __dirname,
			query: {
				presets: ['es2015', 'react', 'stage-1']
			}
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
	},
	devServer: {
		contentBase: path.join(__dirname, 'static'),
		publicPath: "",
		historyApiFallback: true,
		staticOptions: {
			redirect: false
		}
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
	devtool: 'source-map'
}
