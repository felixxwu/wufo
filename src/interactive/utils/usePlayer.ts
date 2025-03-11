import { useEffect } from 'react'
import {
  player1,
  player2,
  useCurrentLoopPlaying,
  usePlayer1,
  useSongConfig,
  useSongLoaded,
  useStarted,
} from '../lib/store.ts'

export function usePlayer() {
  const { path, files, bpm, songName, leadInLengthBeats } = useSongConfig()

  useEffect(() => {
    ;(async () => {
      useSongLoaded.set(false)
      for (const file of files) {
        if (file.name === null) continue
        await player1.localValue().load(`${path}/${file.name}`)
      }
      useSongLoaded.set(true)
    })()
  }, [files])

  return {
    play: async (loopNum: number, when: number) => {
      if (files[loopNum].name === null) return

      if (usePlayer1.localValue()) {
        await player1.localValue().load(`${path}/${files[loopNum].name}`)
        player1.localValue().start(when, 0)
        usePlayer1.set(false)
      } else {
        await player2.localValue().load(`${path}/${files[loopNum].name}`)
        player2.localValue().start(when, 0)
        usePlayer1.set(true)
      }

      useCurrentLoopPlaying.set(loopNum)
    },
    stop: () => {
      player1.localValue().stop()
      player2.localValue().stop()
      useStarted.set(false)
    },
    leadInLength: (60 / bpm) * leadInLengthBeats,
    loopLength: (60 / bpm) * 32,
    numLoops: files.length,
    getInstruments: (loopNum: number) => files[loopNum].stems,
    songName,
  }
}
