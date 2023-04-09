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

const MelodyCarousel = ({ midiFiles, headerText }) => {
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
  },[]);

  useEffect(() => {
    console.log(midiData);
  }, [midiData]);

  return (
    <div className="melody-carousel">
      <p>{headerText}</p>
      {midiData && (
        <Swiper navigation={true} modules={[Navigation]}>
          {midiData.map((midi, i) => {
            return (
              <SwiperSlide key={midi}>
                <div className="melody-slide-box">
                  <MelodyOutput
                    key={midi}
                    scrollIntoView={false}
                    midiData={midi}
                  />
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
