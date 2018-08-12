const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      {from:'node_modules/jquery/dist/jquery.min.js', to: 'js'},
      {from:'node_modules/bootstrap/dist/js/bootstrap.min.js', to: 'js'},
      {from:'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css'},
      {from:'node_modules/bootstrap/dist/fonts', to: 'fonts'},
      {from:'static/index.html', to: ''}
    ])
  ],
});
