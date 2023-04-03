const config = require('../../config')

const {host, port} = config.server

const url =  `${host}:${port}`


export default async function pollForMelodyService ({melodyId}) {

    const requestOptions = {
        method: "GET",
        responseType: 'blob'
      };

      const response = await fetch(`${url}/api/melody/${melodyId}`, requestOptions)
      
      if (response.ok) {
        return response.blob()
      }

      return null
}
