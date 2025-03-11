export type SongConfig = {
  songName: string
  path: string
  files: { name: string | null; stems: string[] }[]
  bpm: number
  leadInLengthBeats: number
}
