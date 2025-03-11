import { config } from '../lib/config.ts'
import { useLoopNum, useSongNum } from '../lib/store.ts'
import { useStop } from './useStop.ts'

export function useSetSong() {
  const stop = useStop()

  return (songNum: number) => {
    if (songNum < 0 || songNum >= config.length) return

    useLoopNum.set(1)
    useSongNum.set(songNum)
    stop()
  }
}
