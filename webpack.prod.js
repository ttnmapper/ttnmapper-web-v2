const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      {from:'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css'},
      {from:'node_modules/open-iconic/font/css/open-iconic.css', to: 'css'},
      {from:'node_modules/leaflet/dist/leaflet.css', to: 'css'},
      {from: 'node_modules/leaflet/dist/leaflet/images', to: 'css' },
      {from:'static/.', to: ''}
    ])
  ],
});
