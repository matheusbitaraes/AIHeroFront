import React, { useEffect, useState } from "react";
import { SectionProps } from "../../utils/SectionProps";
import MelodyOutput from "./partials/MelodyOutput";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import loadMidiDataFromFile from "../services/loadMidiDataListFromFiles";

const defaultProps = {
  ...SectionProps.defaults,
};

const MelodyCarousel = ({ midiFiles, evoSpecs, headerText }) => {
  const [midiData, setMidiData] = useState(null);

  useEffect(() => {
    const fetchMidi = async () => {
      let loadedMidis = [];
      for (const file of midiFiles) {
        const data = await loadMidiDataFromFile(file);
        loadedMidis.push(data);
      }
      setMidiData(loadedMidis);
    };
    fetchMidi();
  }, [midiFiles]);

  function renderEvoSpecs(i) {
    const spec = evoSpecs[i];

    return (
      <>
        <label>
          <b>Evolutionary function weights:</b>
        </label>
        <div className="evolutionary-specs-label-group">
          {spec.map((s) => (
            <label key={s.name + s.weight}>
              {s.name}: <b>{s.weight}</b>
            </label>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="melody-carousel">
      <p>{headerText}</p>
      {midiData && (
        <Swiper navigation={true} modules={[Navigation]}>
          {midiData.map((midi, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="melody-slide-box">
                  {evoSpecs && renderEvoSpecs(i)}
                  <MelodyOutput scrollIntoView={false} midiData={midi} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

MelodyCarousel.defaultProps = defaultProps;

export default MelodyCarousel;
