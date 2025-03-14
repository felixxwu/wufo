import { SongConfig } from '../lib/types.ts'
import { stemNames } from '../lib/stemNames.ts'

const { drums1, bass, vocal1, vocal1and2, vocal2, vocal3, vocal4, piano, sax, chords, drums2 } =
  stemNames

export const lookinhereye: SongConfig = {
  songName: 'Look in Her Eye',
  path: '/interactive/lookinhereye',
  stemCategories: ['Drums', 'Bass', 'Piano', 'Sax', 'Chords', 'Vocal'],
  files: [
    { name: null, stems: [] },
    { name: 'piano.mp3', stems: [piano] },
    { name: 'piano-voc-voc2.mp3', stems: [piano, vocal1and2] },
    { name: 'drums2-piano-voc4.mp3', stems: [drums2, piano, vocal4] },
    {
      name: 'piano-bass-instruments-voc.mp3',
      stems: [bass, piano, sax, chords, vocal1],
    },
    { name: 'drums-piano.mp3', stems: [drums1, piano] },
    {
      name: 'drums-piano-instruments-voc.mp3',
      stems: [drums1, piano, sax, chords, vocal1],
    },
    {
      name: 'drums-bass-instruments.mp3',
      stems: [drums1, bass, chords],
    },
    {
      name: 'drums-piano-bass-instruments-voc.mp3',
      stems: [drums1, piano, bass, sax, chords, vocal1],
    },
    {
      name: 'drums-piano-bass-instruments-voc2.mp3',
      stems: [drums1, piano, bass, sax, vocal2],
    },
    {
      name: 'drums-piano-bass-voc3.mp3',
      stems: [drums1, piano, bass, vocal3],
    },
  ],
  bpm: 172,
  leadInLengthBeats: 4,
  cover: 'https://i1.sndcdn.com/artworks-P4bUXXZRQnka-0-t500x500.jpg',
}
