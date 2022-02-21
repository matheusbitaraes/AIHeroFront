import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import Image from "../elements/Image";
import logo from "../../assets/images/load.gif";

import MidiPlayer from "react-midi-player";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const MelodyGenerator = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [harmonySpecs, setHarmonySpecs] = useState([
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "TENSION",
      chord: "F",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "F",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "TENSION",
      chord: "F",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "TENSION",
      chord: "G",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "TENSION",
      chord: "F",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RELAXATION",
      chord: "C",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "RETAKE",
      chord: "G",
      key: "C",
      tempo: 120,
    },
  ]);

  const [midiData, setMidiData] = useState(null);
  const [evoToggle, toggleEvolutionary] = useState(true);
  const [noteVariety, setNoteVariety] = useState(0);
  const [chaosValue, setChaosValue] = useState(0);

  const [isMelodyLoaded, setMelodyLoaded] = useState(false);

  const [evolutionarySpecs, setEvolutionarySpecs] = useState([
    {
      key: "notes_on_same_chord_key",
      name: "Notes on Same Chord",
      description: "notes_on_same_chord_key",
      transf_weights: [-0.4, -0.6],
      bounds: [0, 10],
      value: 0,
    },
    {
      key: "notes_on_beat_rate",
      name: "Notes on Beat",
      description: "notes_on_beat_rate",
      transf_weights: [-0.5, -0.5],
      bounds: [0, 10],
      value: 0,
    },
    {
      key: "note_on_density",
      name: "Note Density",
      description: "note_on_density",
      transf_weights: [0.1, 0.5],
      bounds: [-10, 10],
      value: 0,
    },
    {
      key: "note_variety_rate",
      name: "Note Variety",
      description: "note_variety_rate",
      transf_weights: [1, 0],
      bounds: [-10, 10],
      value: 0,
    },
    {
      key: "single_notes_rate",
      name: "Single Notes Rate",
      description: "single_notes_rate",
      transf_weights: [-0.1, -0.5],
      bounds: [-10, 10],
      value: 0,
    },
    {
      key: "notes_out_of_scale_rate",
      name: "Notes out of Scale",
      description: "notes_out_of_scale_rate",
      transf_weights: [0.5, 1],
      bounds: [-10, 10],
      value: 0,
    },
  ]);
  const [melodyId, setMelodyId] = useState(null);
  const [counter, setCounter] = useState(0); //gambiarrra

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  useEffect(function onChange() {
    if (melodyId != null && !isMelodyLoaded) {
      pollForMelody();
    }
  });

  function updateEvolutionaryFunctions(variety, chaos) {
    evolutionarySpecs.map((spec) => {
      let specs = evolutionarySpecs;
      let w1 = specs.filter((s) => s.key === spec.key)[0].transf_weights[0];
      let w2 = specs.filter((s) => s.key === spec.key)[0].transf_weights[1];
      let min = spec.bounds[0];
      let max = spec.bounds[1];
      let value = variety * w1 + chaos * w2;
      specs.filter((s) => s.key === spec.key)[0].value = Math.max(
        min,
        Math.min(max, value)
      );

      setEvolutionarySpecs([...specs]);
      return null
    });
  }

  // function handleEvolutionarySpecs(key, value) {
  //   let specs = evolutionarySpecs;
  //   specs.filter((s) => s.key === key)[0].value = value;
  //   setEvolutionarySpecs([...specs]);
  // }

  function handleMelodySpecChange(fieldName, idx, value) {
    let specs = harmonySpecs;
    specs[idx][fieldName] = value;
    specs[idx].key = "C";
    specs[idx].tempo = 120;
    setHarmonySpecs([...specs]);
  }

  function renderEvolutionarySpec(spec) {
    return (
      <div className="evo-fitness-functions">
        <h7>{`${spec.name}: ${spec.value.toFixed(1)}`}</h7>
        {/* <input
          disabled={!evoToggle}
          className="evo-spec-range"
          type="range"
          name={spec.name}
          value={spec.value}
          onChange={(e) => {
            handleEvolutionarySpecs(spec.key, e.target.value);
          }}
          min={-10}
          max={10}
        ></input> */}
      </div>
    );
  }

  function renderEvolutionaryBox() {
    const box_width = 220;
    const marker_radius = 15;
    const scale = 10;
    const box_height = box_width;
    const left = box_width / 2 - marker_radius / 2 + scale * noteVariety;
    const top = box_height / 2 - marker_radius / 2 - scale * chaosValue;
    return (
      <div className="evolutionary-box">
        <div className="evo-spec">
          <p>{"Note Variety"}:</p>
          <input
            disabled={!evoToggle}
            className="variety-range"
            type="range"
            value={noteVariety}
            onChange={(e) => {
              setNoteVariety(e.target.value);
              updateEvolutionaryFunctions(noteVariety, chaosValue);
            }}
            min={-10}
            max={10}
          ></input>
        </div>
        <div className="evo-spec">
          <p>{"Chaos"}:</p>
          <input
            disabled={!evoToggle}
            className="variety-range"
            type="range"
            value={chaosValue}
            onChange={(e) => {
              setChaosValue(e.target.value);
              updateEvolutionaryFunctions(noteVariety, chaosValue);
            }}
            min={-10}
            max={10}
          ></input>
        </div>
        <div className="spec-box">
          {renderFitnessFunctionSpecs()}
          <div id="widget">
            <div id="markerbounds">
              <div id="box">
                <div
                  id="marker"
                  style={{ left, top, position: "absolute" }}
                ></div>
              </div>
            </div>
            <div>
              <p id="coord"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderFitnessFunctionSpecs() {
    return (
      <div className="fitness-function-box">
        {/* <h6>Fitness Function Values</h6> */}
        {evolutionarySpecs.map((spec) => renderEvolutionarySpec(spec))}
      </div>
    );
  }

  function renderMelodySpec(spec, i) {
    return (
      <div className="melody-spec-box">
        <h6>Bar {i}</h6>
        <div className="evo-spec-melodic_part">
          Sensation: {"  "}
          <select
            className="evo-spec-selector"
            type="text"
            name="Melodic Part"
            value={spec.melodic_part}
            onChange={(e) => {
              handleMelodySpecChange("melodic_part", i, e.target.value);
            }}
          >
            <option name="RELAXATION"> RELAXATION</option>
            <option name="TENSION"> TENSION</option>
            <option name="RETAKE"> RETAKE</option>
          </select>
        </div>
        <div className="evo-spec-chord">
          Chord: {"  "}
          <select
            disabled={true}
            className="evo-spec-chord-selector"
            type="text"
            name="Chord"
            value={spec.chord}
            onChange={(e) => {
              handleMelodySpecChange("chord", i, e.target.value);
            }}
          >
            <option name="C"> C</option>
            <option name="C#"> C#</option>
            <option name="C"> Cm</option>
            <option name="C#"> C#m</option>
            <option name="D"> D</option>
            <option name="D"> D#</option>
            <option name="D"> Dm</option>
            <option name="D"> D#m</option>
            <option name="E"> E</option>
            <option name="E"> Em</option>
            <option name="F"> F</option>
            <option name="F"> Fm</option>
            <option name="F"> F#</option>
            <option name="F"> F#m</option>
            <option name="G"> G</option>
            <option name="G"> G#</option>
            <option name="G"> Gm</option>
            <option name="G"> G#m</option>
            <option name="A"> A</option>
            <option name="A"> A#</option>
            <option name="A"> Am</option>
            <option name="A"> A#m</option>
            <option name="B"> B</option>
            <option name="B"> Bm</option>
          </select>
        </div>
      </div>
    );
  }

  function renderMelodyPlayer() {
    if (!midiData) return;

    var objectURL = URL.createObjectURL(midiData);

    return (
      <div className="midi-player">
        <h4>Here is Your Melody!</h4>
        <MidiPlayer src={objectURL} />
        <Button
          class="btn"
          tag="a"
          color="dark"
          wideMobile
          href={objectURL}
          download="blabla.mid"
        >
          Download
        </Button>
      </div>
    );
  }

  function renderLoadingMelody() {
    return (
      <div className="player-loading">
        <h6>Working on your melody. It can take some minutes...</h6>
        <Image src={logo} alt="loading..." width="15%" />
      </div>
    );
  }

  function renderMelodyBox() {
    return isMelodyLoaded ? renderMelodyPlayer() : renderLoadingMelody();
  }

  function requestMelody() {
    setMelodyLoaded(false);
    setMelodyId(null);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        harmony_specs: harmonySpecs,
        evolutionary_specs: evolutionarySpecs,
      }),
    };

    const source = evoToggle ? "evo" : "gan";
    fetch(`http://localhost:8083/melody?source=${source}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setMelodyId(data["melody_id"]))
      .catch((err) => console.log(err));
  }

  async function pollForMelody() {
    if (isMelodyLoaded) return;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    };

    function wait(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, milliseconds);
      });
    }

    const url = `http://localhost:8083/melody/${melodyId}`;

    await wait(5000);

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.blob();
      })
      .then((data) => {
        setMelodyLoaded(true);
        console.log(`MIDI data acquired for melody ${melodyId}`);
        setMidiData(data);
      })
      .catch((err) => {
        setCounter(counter + 1);
        console.log(
          `still waiting melody. tried ${counter} times for melody ${melodyId}`
        );
      });
  }

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Generate a Melody
            </h1>
            <div className="melody-input">
              <div className="evolutionary-specs reveal-from-left">
                <h4>
                  <label class="switch">
                    <input
                      type="checkbox"
                      alt="Enable evolutionary optimization"
                      id="evo-toggle"
                      checked={evoToggle}
                      onChange={() => toggleEvolutionary(!evoToggle)}
                    />
                    <span class="slider round"></span>
                  </label>
                  Genetic Algorithm Specs
                </h4>
                <div className="inputs">{renderEvolutionaryBox()}</div>
              </div>
              <div className="melody-specs reveal-from-right">
                <h4>Melody Specs</h4>
                <div className="melody-specs-list">
                  {harmonySpecs.map((spec, i) => renderMelodySpec(spec, i))}
                </div>
              </div>
            </div>
            <Button
              tag="a"
              color="primary"
              wideMobile
              onClick={() => requestMelody()}
            >
              Request Melody
            </Button>
            {melodyId != null && renderMelodyBox()}
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          ></div>
        </div>
      </div>
    </section>
  );
};

MelodyGenerator.propTypes = propTypes;
MelodyGenerator.defaultProps = defaultProps;

export default MelodyGenerator;
