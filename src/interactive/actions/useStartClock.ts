import { useClock, useSongLoaded, useStarted, useTimeUntilNextLoopStart } from '../lib/store.ts'
import * as Tone from 'tone'
import { useStartLoop } from './useStartLoop.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { useTimeUntilNextLoop } from '../computed/useTimeUntilNextLoop.ts'

export function useStartClock() {
  const clockFreqHz = 2

  const songLoaded = useSongLoaded.useState()
  const { bpm, leadInLengthBeats } = useSongConfig()
  const leadInLength = (60 / bpm) * leadInLengthBeats
  const startLoop = useStartLoop()
  const timeLeftUntilNextLoop = useTimeUntilNextLoop()

  return async () => {
    if (!songLoaded) return

    useStarted.set(true)
    useClock.set(
      new Tone.Clock(() => {
        useTimeUntilNextLoopStart.set({ time: timeLeftUntilNextLoop(), when: Date.now() })

        const timeUntilLoopStartDisabled = timeLeftUntilNextLoop() - leadInLength
        if (timeUntilLoopStartDisabled <= 1 / clockFreqHz && timeUntilLoopStartDisabled > 0) {
          startLoop()
        }
      }, clockFreqHz).start()
    )
  }
}
