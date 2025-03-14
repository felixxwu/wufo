import { Stem } from './stemNames.ts'

export type SongConfig = {
  songName: string
  path: string
  stemCategories: string[]
  files: { name: string | null; stems: Stem[] }[]
  bpm: number
  leadInLengthBeats: number
  cover: string
}
