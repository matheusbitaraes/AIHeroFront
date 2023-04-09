
export default async function loadMidiDataFromFile (filename) {
  const response = await fetch(filename);
  return response.blob()
}