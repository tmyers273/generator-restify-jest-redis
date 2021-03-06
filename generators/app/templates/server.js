var restify = require('restify');
var routes = require('./routes');
var plugins = require('restify-plugins');
var config = require('./../config/config');

var server = restify.createServer();

server.use(plugins.queryParser({
    mapParams: true,
}));

routes.register(server);

server.listen(config('server.port'), function() {
    console.log('%s listening at %s', server.name, server.url);
});