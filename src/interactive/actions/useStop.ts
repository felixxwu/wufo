import { usePlayer1, usePlayer2, useStarted, useClock } from '../lib/store.ts'

export function useStop() {
  return () => {
    usePlayer1.ref().stop()
    usePlayer2.ref().stop()
    useStarted.set(false)

    useClock.ref()?.stop()
    useClock.ref()?.dispose()
  }
}
