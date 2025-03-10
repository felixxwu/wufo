import { useDoublePlayer } from './useDoublePlayer.ts'

export function useCreateDoublePlayers(path: string, files: string[], bpm: number) {
  return files.map(file => useDoublePlayer(`${path}/${file}`, bpm))
}
