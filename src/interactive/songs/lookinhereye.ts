import { SongConfig } from '../lib/types.ts'
import { stemNames } from '../lib/stemNames.ts'

const { drums, bass, vocal, piano, sax, chords, lightdrums } = stemNames

export const lookinhereye: SongConfig = {
  songName: 'Look in Her Eye',
  path: '/interactive/lookinhereye',
  stemOrder: [drums, lightdrums, bass, piano, sax, chords, vocal],
  files: [
    { name: null, stems: [] },
    { name: 'piano.mp3', stems: [piano] },
    { name: 'piano-voc-voc2.mp3', stems: [piano, vocal, vocal] },
    { name: 'drums2-piano-voc4.mp3', stems: [lightdrums, piano, vocal] },
    {
      name: 'piano-bass-instruments-voc.mp3',
      stems: [bass, piano, sax, chords, vocal],
    },
    { name: 'drums-piano.mp3', stems: [drums, piano] },
    {
      name: 'drums-piano-instruments-voc.mp3',
      stems: [drums, piano, sax, chords, vocal],
    },
    {
      name: 'drums-bass.mp3',
      stems: [drums, bass],
    },
    {
      name: 'drums-bass-instruments.mp3',
      stems: [drums, bass, chords],
    },
    {
      name: 'drums-piano-bass-voc3.mp3',
      stems: [drums, piano, bass, vocal],
    },
    {
      name: 'drums-piano-bass-instruments-voc2.mp3',
      stems: [drums, piano, bass, sax, vocal],
    },
    {
      name: 'drums-piano-bass-instruments-voc.mp3',
      stems: [drums, piano, bass, sax, chords, vocal],
    },
  ],
  bpm: 172,
  leadInLengthBeats: 4,
  cover: 'https://i1.sndcdn.com/artworks-P4bUXXZRQnka-0-t500x500.jpg',
}
