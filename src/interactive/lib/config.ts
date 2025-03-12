import { SongConfig } from './types.ts'

export const config: SongConfig[] = [
  {
    songName: 'Look in Here Eye',
    path: '/interactive/lookinhereye',
    stemOrder: ['Drums', 'Piano', 'Bass', 'Chords', 'Vocal 1', 'Vocal 2', 'Vocal 3'],
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: ['Piano'] },
      { name: 'piano-voc2.mp3', stems: ['Piano', 'Vocal 1', 'Vocal 2'] },
      { name: 'drums-piano.mp3', stems: ['Drums', 'Piano'] },
      {
        name: 'drums-piano-sax-chords-bells-voc.mp3',
        stems: ['Drums', 'Piano', 'Chords', 'Vocal 1'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells.mp3',
        stems: ['Drums', 'Piano', 'Bass', 'Chords'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc.mp3',
        stems: ['Drums', 'Piano', 'Bass', 'Chords', 'Vocal 1'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc2.mp3',
        stems: ['Drums', 'Piano', 'Bass', 'Chords', 'Vocal 1', 'Vocal 3'],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
  },
  {
    songName: 'Second song',
    path: '/interactive/lookinhereye',
    stemOrder: ['Drums', 'Piano', 'Bass', 'Chords'],
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: ['Piano'] },
      { name: 'drums-piano.mp3', stems: ['Drums', 'Piano'] },
      {
        name: 'drums-piano-bass-sax-chords-bells.mp3',
        stems: ['Drums', 'Piano', 'Bass', 'Chords'],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
  },
]
