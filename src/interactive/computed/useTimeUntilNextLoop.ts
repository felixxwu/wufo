import { useLeadInLength } from './useLeadInLength.ts'
import * as Tone from 'tone'
import { useClockStartTime, useSongNum } from '../lib/store.ts'
import { config } from '../lib/config.ts'

export function useTimeUntilNextLoop() {
  const leadInLength = useLeadInLength()

  return () => {
    const { bpm } = config[useSongNum.ref()]
    const loopLength = (60 / bpm) * 32
    const offset = loopLength - leadInLength - 0.1 - (useClockStartTime.ref() ?? 0)
    const time = Tone.now()
    return loopLength - ((time + offset) % loopLength)
  }
}
