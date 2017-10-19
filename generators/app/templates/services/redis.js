var ioredis = require('ioredis');
var config = require('./../config/config');

var redis;

const make = () => {
    redis = new ioredis({
        host: config('redis.host'),
        password: config('redis.password')
    });

    return redis;
};

const get = () => {
    if (! redis) {
        return make();
    }

    return redis;
};

module.exports = {
    make,
    get
};