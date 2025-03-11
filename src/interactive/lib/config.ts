import { SongConfig } from './types.ts'

export const config: SongConfig[] = [
  {
    songName: 'Look in Here Eye',
    path: '/interactive/lookinhereye',
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: ['piano'] },
      { name: 'piano-voc2.mp3', stems: ['piano', 'vocal'] },
      { name: 'drums-piano.mp3', stems: ['drums', 'piano'] },
      {
        name: 'drums-piano-sax-chords-bells-voc.mp3',
        stems: ['drums', 'piano', 'sax', 'chords', 'vocal'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells.mp3',
        stems: ['drums', 'piano', 'bass', 'sax', 'chords'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc.mp3',
        stems: ['drums', 'piano', 'bass', 'sax', 'chords', 'vocal'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc2.mp3',
        stems: ['drums', 'piano', 'bass', 'sax', 'chords', 'vocal (alt.)'],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
  },
  {
    songName: 'Second song',
    path: '/interactive/lookinhereye',
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: ['piano'] },
      { name: 'drums-piano.mp3', stems: ['drums', 'piano'] },
      {
        name: 'drums-piano-bass-sax-chords-bells.mp3',
        stems: ['drums', 'piano', 'bass', 'sax', 'chords'],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
  },
]
