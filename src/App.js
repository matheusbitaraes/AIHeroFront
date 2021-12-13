import './App.css';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AI_HERO_URL = "http://localhost:5000"
const TRAIN_PATH = "train/melodies"
const GAN_PATH = "gan/melodies"
const MELODY_PATH = "melodies"


function App() {
  const [input, setInput] = useState(JSON.stringify([
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "TENSION",
      "chord": "F",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "F",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "TENSION",
      "chord": "F",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "TENSION",
      "chord": "G",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "TENSION",
      "chord": "F",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RELAXATION",
      "chord": "C",
      "key": "C",
      "tempo": 120
    },
    {
      "melodic_part": "RETAKE",
      "chord": "G",
      "key": "C",
      "tempo": 120
    }
  ]
  ));
  const [postResult, setPostResult] = useState(null);

  async function getMelody(type) {
    let path = "/"
    switch (type) {
      case "train":
        path = TRAIN_PATH
        break;
      case "gan":
        path = GAN_PATH
        break;
      default:
        path = MELODY_PATH
        break;
    }

    try {
      const res = await fetch(`${AI_HERO_URL}/${path}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: input,
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setPostResult(result);
    } catch (err) {
      setPostResult(err.message);
    }

    console.log(postResult)
  }

return (
  <div className="App">
    <header className="App-header">
    </header>
    <body>
      <div className="input-container">
        <TextField id="outlined-basic"
          multiline
          rows={20}
          // onChange={(v,a)=>setInput(JSON.parse(a))}
          value={input}
          label="Melody Specs (JSON)" variant="outlined" />
      </div>
      <div className="button-container">
        <Button className="input-button" id="from-train" variant="contained" color="primary" onClick={() => getMelody("train")}>Generate from train data</Button>
        <Button className="input-button" id="from-gan" variant="contained" color="primary" onClick={() => getMelody("gan")}>Generate from GAN data</Button>
        <Button className="input-button" id="from-all" variant="contained" color="primary" onClick={() => getMelody()}>Generate melody</Button>
      </div>
    </body>


  </div>
);
}

export default App;
