const env = process.env.ENV || 'local';
const aiherogenerator = require('./env/aiherogenerator.json')[env]
const config = {
    env,
    aiherogenerator,
}

module.exports = config