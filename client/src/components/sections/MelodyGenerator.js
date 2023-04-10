import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import Image from "../elements/Image";
import logo from "../../assets/images/load.gif";
import requestMelodyService from "../services/requestMelodyService";
import pollForMelodyService from "../services/pollForMelodyService";
import MelodyInput from "./partials/MelodyInput";
import MelodyOutput from "./partials/MelodyOutput";
import {
  DEFAULT_EVOLUTIONARY_SPECS,
  DEFAULT_HARMONY_SPECS,
} from "../../constants";

const defaultProps = {
  ...SectionProps.defaults,
};

const MELODY_REQUEST_ENABLED = false;

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
  const [harmonySpecs, setHarmonySpecs] = useState(DEFAULT_HARMONY_SPECS);
  const [evolutionarySpecs, setEvolutionarySpecs] = useState(
    DEFAULT_EVOLUTIONARY_SPECS
  );
  const [melodyFrom, setMelodyFrom] = useState("gan");

  const [isMelodyLoaded, setMelodyLoaded] = useState(false);
  const [melodyId, setMelodyId] = useState(null);
  const [counter, setCounter] = useState(0); //gambiarrra

  const [midiData, setMidiData] = useState(null);

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

  function renderLoadingMelody() {
    return (
      <div className="player-loading">
        <h6>Working on your melody. It can take some minutes...</h6>
        <Image className="loading-image" src={logo} alt="loading..." />
      </div>
    );
  }

  function renderMelodyBox() {
    return isMelodyLoaded && midiData ? <MelodyOutput midiData={midiData}/> : renderLoadingMelody();
  }

  function renderMelodyButton() {
    return MELODY_REQUEST_ENABLED ? (
      <Button
        tag="a"
        color="primary"
        wideMobile
        onClick={() => requestMelody()}
      >
        Request Melody
      </Button>
    ) : (
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
        <p style={{ "margin-top": "15px" }}>
          Live demo is not enabled for cost saving purposes
        </p>
      </div>
    );
  }

  async function requestMelody() {
    setMelodyLoaded(false);
    setMelodyId(null);
    const { melodyId } = await requestMelodyService({
      harmonySpecs,
      evolutionarySpecs,
      melodyFrom,
    });
    setMelodyId(melodyId);
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

    const data = await pollForMelodyService({ melodyId });

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
            <MelodyInput
              harmonySpecs={harmonySpecs}
              evolutionarySpecs={evolutionarySpecs}
              melodyFrom={melodyFrom}
              onHarmonySpecsChange={(specs) => setHarmonySpecs(specs)}
              onEvolutionarySpecsChange={(specs) => setEvolutionarySpecs(specs)}
              onMelodyFromChange={(from)=>setMelodyFrom(from)}
            />
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
