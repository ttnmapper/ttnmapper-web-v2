/* eslint-disable */
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'App.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: "",
    filename: 'js/bundle.js',
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
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(ttf|eot|woff|woff2|svg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      }
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ],
    }
  ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
