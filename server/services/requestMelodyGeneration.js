const axios = require('axios');
const config = require('../config')

const {dns, port} = config.aiherogenerator


const requestMelodyGeneration = async (req, res) => {
    const { params, body } = req
    const { source } = params

    const url = `${dns}:${port}/melody?source=${source}`

    const response = await axios.post(url, body)

    const {melody_id: melodyId, melody_url: melodyUrl} = response.data
    
    return res.json({
        message: 'Success',
        data: {
            melodyId,
            melodyUrl
        },
        });
}

module.exports = requestMelodyGeneration