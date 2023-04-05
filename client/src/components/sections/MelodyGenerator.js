import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import Image from "../elements/Image";
import logo from "../../assets/images/load.gif";
import requestMelodyService from '../services/requestMelodyService';
import pollForMelodyService from '../services/pollForMelodyService';

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const MELODY_REQUEST_ENABLED = false

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
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "F:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "F:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "F:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "G:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "F:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "C:7maj",
      key: "C",
      tempo: 120,
    },
    {
      melodic_part: "",
      chord: "G:7maj",
      key: "C",
      tempo: 120,
    },
  ]);

  const [midiData, setMidiData] = useState(null);
  const [melodyFrom, setMelodyFrom] = useState("gan");
  const [noteVariety, setNoteVariety] = useState(0);
  const [chaosValue, setChaosValue] = useState(0);

  const [isMelodyLoaded, setMelodyLoaded] = useState(false);

  const [evolutionarySpecs, setEvolutionarySpecs] = useState([
    {
      key: "notes_on_same_chord_key",
      name: "Notes on Same Chord",
      description: "notes_on_same_chord_key",
      transf_weights: [0, -0.2],
      bounds: [0, 1],
      weight: 0,
    },
    {
      key: "notes_on_beat_rate",
      name: "Notes on Beat",
      description: "notes_on_beat_rate",
      transf_weights: [0, -0.1],
      bounds: [0, 1],
      weight: 0,
    },
    {
      key: "note_on_density",
      name: "Note Density",
      description: "note_on_density",
      transf_weights: [0.1, 0.5],
      bounds: [0, 1],
      weight: 1,
    },
    {
      key: "note_variety_rate",
      name: "Note Variety",
      description: "note_variety_rate",
      transf_weights: [0.2, 0],
      bounds: [-1, 1],
      weight: 0,
    },
    {
      key: "single_notes_rate",
      name: "Single Notes Rate",
      description: "single_notes_rate",
      transf_weights: [0, -0.5],
      bounds: [-1, 1],
      weight: 1,
    },
    {
      key: "notes_out_of_scale_rate",
      name: "Notes out of Scale",
      description: "notes_out_of_scale_rate",
      transf_weights: [0, 0.1],
      bounds: [-1, 1],
      weight: 0,
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

  const specInput = useRef(null);

  function updateEvolutionaryFunctions(variety, chaos) {
    evolutionarySpecs.map((spec) => {
      let specs = evolutionarySpecs;
      let w1 = specs.filter((s) => s.key === spec.key)[0].transf_weights[0];
      let w2 = specs.filter((s) => s.key === spec.key)[0].transf_weights[1];
      let min = spec.bounds[0];
      let max = spec.bounds[1];
      let weight = variety * w1 + chaos * w2;
      specs.filter((s) => s.key === spec.key)[0].weight = Math.max(
        min,
        Math.min(max, weight)
      );

      setEvolutionarySpecs([...specs]);

      //clean inputs of textbox
      const inputs = specInput.current.querySelectorAll('.evo-spec-input')
      inputs.forEach(input => input.value = "")
      return null;
    });
  }

  function handleEvolutionarySpecs(key, value) {
    let specs = evolutionarySpecs;
    specs.filter((s) => s.key === key)[0].weight = parseFloat(value);
    setEvolutionarySpecs([...specs]);
  }

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
        <div>{`${spec.name}: `}
        </div>
        <input
            className="evo-spec-input"
            key={spec.name}
            type="text"
            name={spec.name}
            placeholder={spec.weight.toFixed(1)}
            onChange={(e) => {
              handleEvolutionarySpecs(spec.key, e.target.value)
            }}
        />
      </div>
    );
  }

  function renderEvolutionaryBox() {
    const box_width = 220;
    const marker_radius = 15;
    const scale = 10;
    const box_height = box_width;
    const left = box_width / 2 - marker_radius / 2 + scale * chaosValue;
    const top = box_height / 2 - marker_radius / 2 - scale * noteVariety;
    return (
      <div className="evolutionary-box">
        <div className="evo-spec">
          <p>{"Note Variety"}:</p>
          <input
            disabled={melodyFrom !== "evo"}
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
            disabled={melodyFrom !== "evo"}
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
      <div className="fitness-function-box" ref={specInput}>
        {/* <h6>Fitness Function Values</h6> */}
        {evolutionarySpecs.map((spec) => renderEvolutionarySpec(spec))}
      </div>
    );
  }

  function renderMelodySpec(spec, i) {
    return (
      <div key={i} id={i} className="melody-spec-box">
        <h6>Bar {i + 1}</h6>
        <div className="evo-spec-chord">
          Chord: {"  "}
          <select
            disabled={false}
            className="evo-spec-chord-selector"
            type="text"
            name="Chord"
            value={spec.chord}
            onChange={(e) => {
              handleMelodySpecChange("chord", i, e.target.value);
            }}
          >
            <option name={"A#:7maj"}> A#:7maj </option>
            <option name={"A:7maj"}> A:7maj </option>
            <option name={"A#:7min"}> A#:7min </option>
            <option name={"A:7min"}> A:7min </option>
            <option name={"A#:maj"}> A#:maj </option>
            <option name={"A:maj"}> A:maj </option>
            <option name={"A#:min"}> A#:min </option>
            <option name={"A:min"}> A:min </option>
            <option name={"B:7maj"}> B:7maj </option>
            <option name={"B:7min"}> B:7min </option>
            <option name={"B:maj"}> B:maj </option>
            <option name={"B:min"}> B:min </option>
            <option name={"C#:7maj"}> C#:7maj </option>
            <option name={"C:7maj"}> C:7maj </option>
            <option name={"C#:7min"}> C#:7min </option>
            <option name={"C:7min"}> C:7min </option>
            <option name={"C#:maj"}> C#:maj </option>
            <option name={"C:maj"}> C:maj </option>
            <option name={"C#:min"}> C#:min </option>
            <option name={"C:min"}> C:min </option>
            <option name={"D#:7maj"}> D#:7maj </option>
            <option name={"D:7maj"}> D:7maj </option>
            <option name={"D#:7min"}> D#:7min </option>
            <option name={"D:7min"}> D:7min </option>
            <option name={"D#:maj"}> D#:maj </option>
            <option name={"D:maj"}> D:maj </option>
            <option name={"D#:min"}> D#:min </option>
            <option name={"D:min"}> D:min </option>
            <option name={"E:7maj"}> E:7maj </option>
            <option name={"E:7min"}> E:7min </option>
            <option name={"E:maj"}> E:maj </option>
            <option name={"E:min"}> E:min </option>
            <option name={"F#:7maj"}> F#:7maj </option>
            <option name={"F:7maj"}> F:7maj </option>
            <option name={"F#:7min"}> F#:7min </option>
            <option name={"F:7min"}> F:7min </option>
            <option name={"F#:maj"}> F#:maj </option>
            <option name={"F:maj"}> F:maj </option>
            <option name={"F#:min"}> F#:min </option>
            <option name={"F:min"}> F:min </option>
            <option name={"G#:7maj"}> G#:7maj </option>
            <option name={"G:7maj"}> G:7maj </option>
            <option name={"G#:7min"}> G#:7min </option>
            <option name={"G:7min"}> G:7min </option>
            <option name={"G#:maj"}> G#:maj </option>
            <option name={"G:maj"}> G:maj </option>
            <option name={"G#:min"}> G#:min </option>
            <option name={"G:min"}> G:min </option>
          </select>
        </div>
      </div>
    );
  }



  const midiVisualizer = useRef(null);

  useEffect(() => {
    if (midiVisualizer.current) {
      midiVisualizer.current.scrollIntoView({ behavior: "smooth", block: "start"});
    }
  }, [midiData]);

  function renderMelodyPlayer() {
    if (!midiData) return;

    const midiObjectURL = URL.createObjectURL(midiData);

    return (
      <div className="midi-player">
        <h4>Here is Your Melody!</h4>
        <midi-player
          src={midiObjectURL}
          sound-font="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
          visualizer="#myPianoRollVisualizer"
        ></midi-player>
        <midi-visualizer
          id="myPianoRollVisualizer"
          type="piano-roll"
          src={midiObjectURL}
          ref={midiVisualizer}
        ></midi-visualizer>
        <Button
          className="btn"
          tag="a"
          color="dark"
          wideMobile
          href={midiObjectURL}
          download="a-robot-did-this.mid"
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
        <Image className="loading-image" src={logo} alt="loading..." />
      </div>
    );
  }

  function renderMelodyBox() {
    return isMelodyLoaded ? renderMelodyPlayer() : renderLoadingMelody();
  }

  function renderMelodyButton(){
    return MELODY_REQUEST_ENABLED ? <Button
              tag="a"
              color="primary"
              wideMobile
              onClick={() => requestMelody()}
            >
              Request Melody
            </Button>
            : 
            <div>
            <Button
            tag="a"
            color="primary"
            wideMobile
            onClick={() => requestMelody()}
            disabled={true}
          >
            Request Melody
          </Button>
          <p style={{'margin-top': '15px'}}>Melody generator is not enabled for cost saving purposes</p>
          </div>
  }


  async function requestMelody() {
    setMelodyLoaded(false);
    setMelodyId(null);
    const {melodyId} = await requestMelodyService({harmonySpecs, evolutionarySpecs, melodyFrom})
    setMelodyId(melodyId)
  }

  async function pollForMelody() {
    if (isMelodyLoaded) return;

    function wait(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, milliseconds);
      });
    }

    await wait(3000);


    const data = await pollForMelodyService({melodyId})

    if (data) {
      setMelodyLoaded(true);
      setMidiData(data);
      console.log(`MIDI data acquired for melody ${melodyId}`);
    } else {
      setCounter(counter + 1);
      console.log(
        `still waiting melody. tried ${counter} times for melody ${melodyId}`
      );
    }
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
                <h4>Get Melodies From</h4>
                <div
                  className="radio-inputs"
                  onChange={(event) => setMelodyFrom(event.target.value)}
                >
                  <h6 className="radio-input">
                    <input
                      type="radio"
                      value="train"
                      name="melody-from"
                      onChange={() => {}}
                      checked={melodyFrom === "train"}
                    />{" "}
                    Real Data
                  </h6>
                  <h6 className="radio-input">
                    <input
                      type="radio"
                      value="gan"
                      name="melody-from"
                      onChange={() => {}}
                      checked={melodyFrom === "gan"}
                    />{" "}
                    Gan Generated
                  </h6>
                  <h6 className="radio-input">
                    <input
                      type="radio"
                      value="evo"
                      name="melody-from"
                      onChange={() => {}}
                      checked={melodyFrom === "evo"}
                    />{" "}
                    Gan + Evo Generated
                  </h6>
                </div>
                <div className="inputs">{renderEvolutionaryBox()}</div>
              </div>
              <div className="melody-specs reveal-from-right">
                <h4>Melody Specs</h4>
                <div className="melody-specs-list">
                  {harmonySpecs.map((spec, i) => renderMelodySpec(spec, i))}
                </div>
              </div>
            </div>
            {renderMelodyButton()}
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

MelodyGenerator.defaultProps = defaultProps;

export default MelodyGenerator;
