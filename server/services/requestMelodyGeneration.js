const axios = require('axios');

const requestMelodyGeneration = async (req, res) => {
    const { params, body } = req
    const { source } = params

    const endpoint = 'http://localhost:8083' // 'http://ai-hero-service:8083'

    const url = `${endpoint}/melody?source=${source}`

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