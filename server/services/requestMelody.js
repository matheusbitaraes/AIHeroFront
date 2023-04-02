const axios = require('axios')

const requestMelody = async (req, res) => {
    const { params } = req
    const { id } = params

    const endpoint = 'http://localhost:8083' // 'http://ai-hero-service:8083'

    const url = `${endpoint}/melody/${id}`

    try {
        const response = await axios.get(url, {
        responseType: "arraybuffer",
      })
    
      return res.send(response.data)

    } catch (err) {
        console.error(err)
        return res.sendStatus(404)
    }
}

module.exports = requestMelody