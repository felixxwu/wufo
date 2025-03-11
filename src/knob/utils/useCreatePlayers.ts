import { refs } from '../lib/refs.ts'

export function useCreatePlayers(
  path: string,
  files: { name: string; instruments: string[] }[],
  bpm: number
) {
  return {
    play: async (loopNum: number, when: number) => {
      if (refs.usePlayer1) {
        await refs.player1.load(`${path}/${files[loopNum].name}`)
        refs.player1.start(when, 0)
        refs.usePlayer1 = false
      } else {
        await refs.player2.load(`${path}/${files[loopNum].name}`)
        refs.player2.start(when, 0)
        refs.usePlayer1 = true
      }
    },
    stop: () => {
      refs.player1.stop()
      refs.player2.stop()
    },
    leadInLength: (60 / bpm) * 8,
    loopLength: (60 / bpm) * 32,
    numLoops: files.length,
    preLoadAll: async () => {
      for (const file of files) {
        await refs.player1.load(`${path}/${file.name}`)
      }
    },
    getInstruments: (loopNum: number) => files[loopNum].instruments,
  }
}
