import { SongConfig } from './types.ts'
import { stemNames } from './stemNames.ts'

const { drums, drums2, instr, bass, vocal, vocal2, vocal3, vocal4, piano } = stemNames

export const config: SongConfig[] = [
  {
    songName: 'Look in Her Eye',
    path: '/interactive/lookinhereye',
    stemOrder: [drums, drums2, bass, piano, instr, vocal, vocal2, vocal3, vocal4],
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: [piano] },
      { name: 'piano-voc-voc2.mp3', stems: [piano, vocal, vocal2] },
      {
        name: 'piano-bass-instruments-voc.mp3',
        stems: [bass, piano, instr, vocal],
      },
      { name: 'drums2-piano-voc4.mp3', stems: [drums2, piano, vocal4] },
      { name: 'drums-piano.mp3', stems: [drums, piano] },
      {
        name: 'drums-piano-instruments-voc.mp3',
        stems: [drums, piano, instr, vocal],
      },
      {
        name: 'drums-bass.mp3',
        stems: [drums, bass],
      },
      {
        name: 'drums-piano-bass-instruments.mp3',
        stems: [drums, piano, bass, instr],
      },
      {
        name: 'drums-piano-bass-instruments-voc.mp3',
        stems: [drums, piano, bass, instr, vocal],
      },
      {
        name: 'drums-piano-bass-instruments-voc-voc3.mp3',
        stems: [drums, piano, bass, instr, vocal, 'Vocal 3'],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
    cover: 'https://i1.sndcdn.com/artworks-P4bUXXZRQnka-0-t500x500.jpg',
  },
  {
    songName: 'Second song',
    path: '/interactive/lookinhereye',
    stemOrder: [drums, piano, bass, instr],
    files: [
      { name: null, stems: [] },
      { name: 'piano.mp3', stems: [piano] },
      { name: 'drums-piano.mp3', stems: [drums, piano] },
      {
        name: 'drums-piano-bass-instruments.mp3',
        stems: [drums, piano, bass, instr],
      },
    ],
    bpm: 172,
    leadInLengthBeats: 4,
    cover: 'https://i1.sndcdn.com/artworks-zt5FpguaYdKA-0-t500x500.jpg',
  },
]
