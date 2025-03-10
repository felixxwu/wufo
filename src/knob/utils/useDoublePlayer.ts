import { useRef } from 'react'
import * as Tone from 'tone'

const LEAD_IN = 8

export function useDoublePlayer(src: string, bpm: number) {
  const usePlayer1 = useRef(true)
  const player1 = useRef(new Tone.Player(src).toDestination())
  const player2 = useRef(new Tone.Player(src).toDestination())

  const beatLength = 60 / bpm
  const leadInLength = beatLength * LEAD_IN

  return {
    play: (when: number) => {
      if (usePlayer1.current) {
        player1.current.start(when, 0)
        usePlayer1.current = false
      } else {
        player2.current.start(when, 0)
        usePlayer1.current = true
      }
    },
    leadInLength,
    stop: () => {
      player1.current.stop()
      player2.current.stop()
    },
  }
}
