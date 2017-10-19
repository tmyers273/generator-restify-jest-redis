var { env } = require('node-laravel-style-config');

module.exports = {

    host: env('REDIS_HOST', '127.0.0.1'),
    password: env('REDIS_PASSWORD', null),

};