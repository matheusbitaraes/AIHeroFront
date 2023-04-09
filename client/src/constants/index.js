const gan_1 = require('../resources/midi/gan_1.mid')
const gan_2 = require('../resources/midi/gan_2.mid')
const gan_3 = require('../resources/midi/gan_3.mid')
const gan_4 = require('../resources/midi/gan_4.mid')
const gan_5 = require('../resources/midi/gan_5.mid')

const DEFAULT_HARMONY_SPECS = [
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
];

const DEFAULT_EVOLUTIONARY_SPECS = [
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
  ]

const GANS_MIDI_FILES = [
    gan_1,
    gan_2,
    gan_3,
    gan_4,
    gan_5
]

module.exports = {
  DEFAULT_HARMONY_SPECS,
  DEFAULT_EVOLUTIONARY_SPECS,
  GANS_MIDI_FILES
};
