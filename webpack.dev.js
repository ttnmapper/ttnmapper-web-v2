const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    publicPath: "",
    historyApiFallback: true,
    staticOptions: {
      redirect: false
    }
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      {from:'node_modules/jquery/dist/jquery.min.js', to: 'js'},
      {from:'node_modules/jquery/dist/jquery.min.map', to: 'js'},
      {from:'node_modules/bootstrap/dist/js/bootstrap.min.js', to: 'js'},
      {from:'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css'},
      {from:'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'css'},
      {from:'static/index.html', to: ''}
    ])
  ],
});
