import {
  usePlayer1,
  usePlayer2,
  useCurrentLoopPlaying,
  useLoopNum,
  useNextPlayerToUse,
} from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function useStartLoop() {
  const { path, files } = useSongConfig()

  return async (when: number) => {
    const loopNum = useLoopNum.ref()

    if (files[loopNum].name === null) return

    if (useNextPlayerToUse.ref() === 2) {
      await usePlayer1.ref().load(`${path}/${files[loopNum].name}`)
      usePlayer1.ref().start(when, 0)
      useNextPlayerToUse.set(1)
    } else {
      await usePlayer2.ref().load(`${path}/${files[loopNum].name}`)
      usePlayer2.ref().start(when, 0)
      useNextPlayerToUse.set(2)
    }

    useCurrentLoopPlaying.set(loopNum)
  }
}
