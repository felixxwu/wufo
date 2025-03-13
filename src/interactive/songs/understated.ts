import { SongConfig } from '../lib/types.ts'
import { stemNames } from '../lib/stemNames.ts'

const { drums, bass, vocal, arp, chords, lightdrums } = stemNames

export const understated: SongConfig = {
  songName: 'Understated',
  path: '/interactive/understated',
  stemOrder: [drums, lightdrums, bass, arp, chords, vocal],
  files: [
    { name: null, stems: [] },
    {
      name: 'instr-vocal.mp3',
      stems: [vocal, arp, chords],
    },
    {
      name: 'instr2-drums2-vocal.mp3',
      stems: [lightdrums, vocal, arp, chords],
    },
    {
      name: 'drum2-chords-vocal.mp3',
      stems: [lightdrums, vocal, chords],
    },
    {
      name: 'drum2-chords-vocal2.mp3',
      stems: [lightdrums, vocal, chords],
    },
    { name: 'bass2-drums3-vocal2.mp3', stems: [lightdrums, vocal] },
    { name: 'bass2-drums3-vocal-vocal2.mp3', stems: [lightdrums, vocal, vocal] },
    {
      name: 'drums-whisper.mp3',
      stems: [drums, vocal],
    },
    { name: 'drums-bass.mp3', stems: [drums, bass, arp] },
    { name: 'drums-bass-vocal2-instr.mp3', stems: [drums, bass, vocal, chords] },
    { name: 'drums-bass-vocal2-instr2.mp3', stems: [drums, bass, vocal, chords] },
    {
      name: 'drums-bass-chords-arp-vocal.mp3',
      stems: [drums, bass, vocal, chords],
    },
  ],
  bpm: 160,
  leadInLengthBeats: 2,
  cover: 'https://i1.sndcdn.com/artworks-zt5FpguaYdKA-0-t500x500.jpg',
}
