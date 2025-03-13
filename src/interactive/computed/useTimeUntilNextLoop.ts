import { useLeadInLength } from './useLeadInLength.ts'
import { useSongConfig } from './useSongConfig.ts'
import * as Tone from 'tone'
import { useClockStartTime } from '../lib/store.ts'

export function useTimeUntilNextLoop() {
  const { bpm } = useSongConfig()
  const leadInLength = useLeadInLength()

  return () => {
    const loopLength = (60 / bpm) * 32
    const offset = loopLength - leadInLength - 0.1 - (useClockStartTime.ref() ?? 0)
    const time = Tone.now()
    return loopLength - ((time + offset) % loopLength)
  }
}
