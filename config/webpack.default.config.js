const path = require('path');
const webpack = require('webpack');
const paths = require('./paths.js');
const version = require('../package.json').version;

module.exports = {
  entry: {
    app: [paths.appIndexJs],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_URL: JSON.stringify(paths.publicUrl),
        VERSION: JSON.stringify(version),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
