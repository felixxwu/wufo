import { refs } from '../lib/refs.ts'

const LEAD_IN = 8

export function useCreatePlayers(path: string, files: string[], bpm: number) {
  return {
    play: async (loopNum: number, when: number) => {
      if (refs.usePlayer1) {
        await refs.player1.load(`${path}/${files[loopNum]}`)
        refs.player1.start(when, 0)
        refs.usePlayer1 = false
      } else {
        await refs.player2.load(`${path}/${files[loopNum]}`)
        refs.player2.start(when, 0)
        refs.usePlayer1 = true
      }
    },
    stop: () => {
      refs.player1.stop()
      refs.player2.stop()
    },
    leadInLength: (60 / bpm) * LEAD_IN,
    numLoops: files.length,
    preLoadAll: async () => {
      for (const file of files) {
        await refs.player1.load(`${path}/${file}`)
      }
    },
  }
}
