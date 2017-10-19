var { config, setConfig } = require('node-laravel-style-config');
var redis = require('./redis');
var server = require('./server');

setConfig({

    redis,
    server,

});

module.exports = config;