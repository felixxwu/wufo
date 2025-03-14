import { SongConfig } from '../lib/types.ts'
import { stemNames } from '../lib/stemNames.ts'

const { drums1, bass, vocal1, vocal2, vocal3, vocal4, arp, chords, drums2 } = stemNames

export const understated: SongConfig = {
  songName: 'Understated',
  path: '/interactive/understated',
  stemCategories: ['Drums', 'Bass', 'Arp', 'Chords', 'Vocal'],
  files: [
    { name: null, stems: [] },
    {
      name: 'instr-vocal.mp3',
      stems: [vocal1, arp, chords],
    },
    {
      name: 'instr2-drums2-vocal.mp3',
      stems: [drums2, vocal1, arp, chords],
    },
    {
      name: 'drum2-chords-vocal.mp3',
      stems: [drums2, vocal2, chords],
    },
    {
      name: 'drum2-chords-vocal2.mp3',
      stems: [drums2, vocal2, chords],
    },
    { name: 'bass2-drums3-vocal2.mp3', stems: [drums2, vocal3] },
    { name: 'bass2-drums3-vocal-vocal2.mp3', stems: [drums2, vocal3] },
    {
      name: 'drums-whisper.mp3',
      stems: [drums1, vocal4],
    },
    { name: 'drums-bass.mp3', stems: [drums1, bass, arp] },
    { name: 'drums-bass-vocal2-instr.mp3', stems: [drums1, bass, vocal2, chords] },
    { name: 'drums-bass-vocal2-instr2.mp3', stems: [drums1, bass, vocal2, chords] },
    {
      name: 'drums-bass-chords-arp-vocal.mp3',
      stems: [drums1, bass, vocal3, chords],
    },
  ],
  bpm: 160,
  leadInLengthBeats: 2,
  cover: 'https://i1.sndcdn.com/artworks-zt5FpguaYdKA-0-t500x500.jpg',
}
