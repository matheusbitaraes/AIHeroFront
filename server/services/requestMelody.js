const axios = require('axios')
const config = require('../config')

const {dns, port} = config.aiherogenerator

const requestMelody = async (req, res) => {
    const { params } = req
    const { id } = params

    try {
        const response = await axios.get(`${dns}:${port}/melody/${id}`, {
        responseType: "arraybuffer",
      })
    
      return res.send(response.data)

    } catch (err) {
        console.error(err)
        return res.sendStatus(404)
    }
}

module.exports = requestMelody