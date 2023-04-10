const gan_1 = require('../resources/midi/gan_1.mid')
const gan_2 = require('../resources/midi/gan_2.mid')
const gan_3 = require('../resources/midi/gan_3.mid')
const gan_4 = require('../resources/midi/gan_4.mid')
const gan_5 = require('../resources/midi/gan_5.mid')
const real_1 = require('../resources/midi/real_1.mid')
const real_2 = require('../resources/midi/real_2.mid')
const real_3 = require('../resources/midi/real_3.mid')
const real_4 = require('../resources/midi/real_4.mid')
const real_5 = require('../resources/midi/real_5.mid')
const evo_1 = require('../resources/midi/evo_1.mid')
const evo_2 = require('../resources/midi/evo_2.mid')
const evo_3 = require('../resources/midi/evo_3.mid')
const evo_4 = require('../resources/midi/evo_4.mid')
const evo_5 = require('../resources/midi/evo_5.mid')

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

const EVOLUTIONARY_SPECS_A = DEFAULT_EVOLUTIONARY_SPECS

const EVOLUTIONARY_SPECS_B = [
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
    weight: 0.3,
  },
  {
    key: "note_on_density",
    name: "Note Density",
    description: "note_on_density",
    transf_weights: [0.1, 0.5],
    bounds: [0, 1],
    weight: 0.5,
  },
  {
    key: "note_variety_rate",
    name: "Note Variety",
    description: "note_variety_rate",
    transf_weights: [0.2, 0],
    bounds: [-1, 1],
    weight: 0.5,
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

const EVOLUTIONARY_SPECS_C = [
  {
    key: "notes_on_same_chord_key",
    name: "Notes on Same Chord",
    description: "notes_on_same_chord_key",
    transf_weights: [0, -0.2],
    bounds: [0, 1],
    weight: .6,
  },
  {
    key: "notes_on_beat_rate",
    name: "Notes on Beat",
    description: "notes_on_beat_rate",
    transf_weights: [0, -0.1],
    bounds: [0, 1],
    weight: 0.0,
  },
  {
    key: "note_on_density",
    name: "Note Density",
    description: "note_on_density",
    transf_weights: [0.1, 0.5],
    bounds: [0, 1],
    weight: 0.5,
  },
  {
    key: "note_variety_rate",
    name: "Note Variety",
    description: "note_variety_rate",
    transf_weights: [0.2, 0],
    bounds: [-1, 1],
    weight: 0.5,
  },
  {
    key: "single_notes_rate",
    name: "Single Notes Rate",
    description: "single_notes_rate",
    transf_weights: [0, -0.5],
    bounds: [-1, 1],
    weight: -0.1,
  },
  {
    key: "notes_out_of_scale_rate",
    name: "Notes out of Scale",
    description: "notes_out_of_scale_rate",
    transf_weights: [0, 0.1],
    bounds: [-1, 1],
    weight: -1,
  },
]

const GANS_MIDI_FILES = [
    gan_1,
    gan_2,
    gan_3,
    gan_4,
    gan_5
]

const REAL_MIDI_FILES = [
  real_1, 
  real_2,
  real_3,
  real_4,
  real_5
]

const EVO_MIDI_FILES = [
  evo_1,
  evo_2,
  evo_3,
  evo_4,
  evo_5
]

const EVO_SPECS = [
  EVOLUTIONARY_SPECS_B,
  EVOLUTIONARY_SPECS_B,
  EVOLUTIONARY_SPECS_C,
  EVOLUTIONARY_SPECS_C,
  EVOLUTIONARY_SPECS_A,
]

module.exports = {
  DEFAULT_HARMONY_SPECS,
  DEFAULT_EVOLUTIONARY_SPECS,
  GANS_MIDI_FILES,
  REAL_MIDI_FILES,
  EVO_MIDI_FILES,
  EVO_SPECS,
};
