var Promise = require('es6-promise').Promise;
var express = require('express');
var app;
var server;

module.exports = {

    start: function(port, dir) {

        if (app) throw 'Server is already running!';

        if (!port) port = 8613;
        if (!dir) dir = 'build/';

        app = express();
        app.use(express.static(dir));
        return new Promise(function(resolve) {
            server = app.listen(port, function() {
                console.log('Express application is listening on port ' + port);
                resolve();
            });
        });
    },

    stop: function() {
        if (!server) return;
        return Promise.resolve()
            .then(server.close.bind(server));
    }
};
