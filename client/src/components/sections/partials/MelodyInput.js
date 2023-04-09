import React, { useRef, useState } from "react";
import { SectionProps } from "../../../utils/SectionProps";

const defaultProps = {
  ...SectionProps.defaults,
};

const MelodyInput = ({
  harmonySpecs,
  evolutionarySpecs,
  melodyFrom,
  onHarmonySpecsChange,
  onEvolutionarySpecsChange,
  onMelodyFromChange,
}) => {

  const [noteVariety, setNoteVariety] = useState(0);
  const [chaosValue, setChaosValue] = useState(0);

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

      onEvolutionarySpecsChange([...specs]);

      //clean inputs of textbox
      const inputs = specInput.current.querySelectorAll(".evo-spec-input");
      inputs.forEach((input) => (input.value = ""));
      return null;
    });
  }

  function handleEvolutionarySpecs(key, value) {
    let specs = evolutionarySpecs;
    specs.filter((s) => s.key === key)[0].weight = parseFloat(value);
    onEvolutionarySpecsChange([...specs]);
  }

  function handleMelodySpecChange(fieldName, idx, value) {
    let specs = harmonySpecs;
    specs[idx][fieldName] = value;
    specs[idx].key = "C";
    specs[idx].tempo = 120;
    onHarmonySpecsChange([...specs]);
  }

  function renderEvolutionarySpec(spec) {
    return (
      <div className="evo-fitness-functions">
        <div>{`${spec.name}: `}</div>
        <input
          className="evo-spec-input"
          key={spec.name}
          type="text"
          name={spec.name}
          placeholder={spec.weight.toFixed(1)}
          onChange={(e) => {
            handleEvolutionarySpecs(spec.key, e.target.value);
          }}
        />
      </div>
    );
  }

  return (
    <div className="melody-input">
      <div className="evolutionary-specs reveal-from-left">
        <h4>Get Melodies From</h4>
        <div
          className="radio-inputs"
          onChange={(event) => onMelodyFromChange(event.target.value)}
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
  );
};

MelodyInput.defaultProps = defaultProps;

export default MelodyInput;
