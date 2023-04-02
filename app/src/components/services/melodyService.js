
const HOST = 'localhost'
const PORT = '5000'
const url =  `http://${HOST}:${PORT}`


const requestMelodyService = async ({harmonySpecs, evolutionarySpecs, melodyFrom}) => {

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", //todo: improve
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        harmony_specs: harmonySpecs,
        evolutionary_specs: evolutionarySpecs,
      }),
    };

    const response = await fetch(`${url}/api/melody/${melodyFrom}`, requestOptions)

    const body = await response.json();

    const { melodyId, melodyUrl} = body.data

    if (!melodyId) {
        throw new Error('Missing melodyId');
      }

    return {melodyId, melodyUrl}
  } catch (err) {
    console.log(err)
    throw err
  }
}

const pollForMelodyService = async ({melodyId}) => {

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

module.exports = {
    requestMelodyService,
    pollForMelodyService
}