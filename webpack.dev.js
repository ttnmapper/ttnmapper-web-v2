const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    publicPath: "",
    historyApiFallback: true,
    staticOptions: {
      redirect: false
    }
  },
  devtool: 'source-map'
});
