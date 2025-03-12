import {
  usePlayer1,
  usePlayer2,
  useCurrentLoopPlaying,
  useLoopRequested,
  useNextPlayerToUse,
} from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function useStartLoop() {
  const { path, files } = useSongConfig()

  return async (when: number) => {
    if (files[useLoopRequested.ref()].name === null) {
      useCurrentLoopPlaying.set(useLoopRequested.ref())
      return
    }

    if (useNextPlayerToUse.ref() === 2) {
      await usePlayer1.ref().load(`${path}/${files[useLoopRequested.ref()].name}`)
      usePlayer1.ref().start(when, 0)
      useNextPlayerToUse.set(1)
    } else {
      await usePlayer2.ref().load(`${path}/${files[useLoopRequested.ref()].name}`)
      usePlayer2.ref().start(when, 0)
      useNextPlayerToUse.set(2)
    }

    useCurrentLoopPlaying.set(useLoopRequested.ref())
  }
}
