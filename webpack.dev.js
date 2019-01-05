const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var bodyParser = require('body-parser');
var request = require('sync-request');

module.exports = merge(common, {
  devServer: {
    inline: true,
    port: 8010,
    contentBase: path.join(__dirname, 'static'),
    publicPath: "",
    historyApiFallback: true,
    staticOptions: {
      redirect: false
    },
    proxy: {
      '/old_api': {
        target: 'https://ttnmapper.org',
        pathRewrite: {'^/old_api' : ''},
        changeOrigin: true,
        secure: false,
      },
      '/api/v1' : {
        target: 'http://localhost:8011',
        changeOrigin: true,
        secure: false,
      }
    },
    setup: function(app) {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
          extended: true
      }));

      app.post('/old_api/gwbbox.php', function(req, res) {
        let newUrl = req.originalUrl.replace('/old_api','')
        console.log("POST REQ made to "+newUrl)
          var serviceCallResponse = request('POST', 'https://ttnmapper.org' + newUrl, {
              json:req.body
          });
          res.send(serviceCallResponse.getBody('utf8'));
      });
  },
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'css' },
      { from: 'node_modules/open-iconic/font/css/open-iconic.css', to: 'css' },
      { from: 'node_modules/leaflet/dist/leaflet.css', to: 'css' },
      { from: 'node_modules/leaflet/dist/images', to: 'css' },
      { from: 'static/index.html', to: '' },
    ])
  ]
});

      // { from: 'node_modules/open-iconic/font/fonts/open-iconic.otf', to: 'fonts' },
      // { from: 'node_modules/open-iconic/font/fonts/open-iconic.ttf', to: 'fonts' },
      // { from: 'node_modules/open-iconic/font/fonts/open-iconic.svg', to: 'fonts' },
      // { from: 'node_modules/open-iconic/font/fonts/open-iconic.woff', to: 'fonts' },