import { useLeadInLength } from './useLeadInLength.ts'
import { useSongConfig } from './useSongConfig.ts'
import * as Tone from 'tone'

export function useTimeUntilNextLoop() {
  const { bpm } = useSongConfig()
  const leadInLength = useLeadInLength()
  const loopLength = (60 / bpm) * 32
  const offset = loopLength - leadInLength - 0.5

  return () => {
    const time = Tone.now()
    return loopLength - ((time + offset) % loopLength)
  }
}
