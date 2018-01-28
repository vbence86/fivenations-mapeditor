const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const defaultConfig = require('./webpack.default.config.js');
const plugins = defaultConfig.plugins;
const paths = require('./paths.js');

plugins.push(
    new BrowserSyncPlugin({
        host: process.env.IP || 'localhost',
        port: process.env.PORT || 9000,
        server: {
            baseDir: ['./', paths.appBuild]
        }
    })
);

plugins.push(
    new DashboardPlugin()
);

module.exports = Object.assign(defaultConfig, {
    output: {
        path: paths.appBuild + '/js/',
        publicPath: '/js/',
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    watch: true,
    plugins: plugins
});
