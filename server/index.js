const express = require('express');
const cors = require('cors');
const path = require('path');
const requestMelodyGeneration = require('./services/requestMelodyGeneration')
const requestMelody = require('./services/requestMelody')
const bodyParser = require('body-parser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Parse JSON request body
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

// API endpoint
app.get('/api/healthy', (req, res) => {
  res.send({ message: 'ok' });
});

// melody endpoints
app.post('/api/melody/:source', requestMelodyGeneration)
app.get('/api/melody/:id', requestMelody)

// Serve the React app on all other requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.maxHeadersCount = 100; // Set the maximum number of headers
server.maxHeaderSize = 81900; // Set the maximum size of headers in bytes