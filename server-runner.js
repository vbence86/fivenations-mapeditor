var argv = require('minimist')(process.argv.slice(2));
var server = require('./server.js');

var port = argv.p || 8613;
var dir = argv.d || 'build/';

server.start(port, dir);
