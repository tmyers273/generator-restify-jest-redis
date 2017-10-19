async function ping(req, res, next) {
    res.send('PONG');
    next();
}

module.exports = {
    register: (server) => {
        server.get('/ping', ping);
    }
};