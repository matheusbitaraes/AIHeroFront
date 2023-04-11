import React, { useRef, useEffect } from "react";
import { SectionProps } from "../../../utils/SectionProps";
import Button from "../../elements/Button";

const defaultProps = {
  ...SectionProps.defaults,
};

const MelodyOutput = ({
  midiData,
  headerText,
  scrollIntoView=true
}) => {

  const midiVisualizer = useRef(null);

  useEffect(() => {
    if (midiVisualizer.current && scrollIntoView) {
      midiVisualizer.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [midiData, scrollIntoView]);

  const midiObjectURL = URL.createObjectURL(midiData);

  return (
    <div className="midi-player" key={Math.random()}>
      <h4>{headerText || 'Here is Your Melody!'}</h4>
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
        download="ai-hero-melody.mid"
      >
        Download
      </Button>
    </div>
  )
};

MelodyOutput.defaultProps = defaultProps;

export default MelodyOutput;
