import { useSongConfig } from './useSongConfig.ts'

export function useLeadInLength() {
  const { bpm, leadInLengthBeats } = useSongConfig()
  return (60 / bpm) * leadInLengthBeats
}
