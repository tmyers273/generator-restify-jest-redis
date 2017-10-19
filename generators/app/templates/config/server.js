var { env } = require('node-laravel-style-config');

module.exports = {

    port: env('SERVER_PORT', 8080),

};