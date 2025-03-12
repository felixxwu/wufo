export type SongConfig = {
  songName: string
  path: string
  stemOrder: string[]
  files: { name: string | null; stems: string[] }[]
  bpm: number
  leadInLengthBeats: number
}
