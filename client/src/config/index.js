const env = process.env.ENV || 'local';
const server = require('./server.json')
const config = {
    env,
    server
}

module.exports = config