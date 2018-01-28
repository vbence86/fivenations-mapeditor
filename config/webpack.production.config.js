const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('./webpack.default.config.js');
const bundleName = 'bundle.js';
const paths = require('./paths.js');

const plugins = defaultConfig.plugins;
plugins.push(
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
    drop_console: true,
    minimize: true,
    output: {
        comments: false
    }
  })
);

module.exports = Object.assign(defaultConfig, {
    output: {
        path: paths.appBuild + '/js',
        publicPath: '/js/',
        filename: bundleName
    },
    plugins: plugins
});
