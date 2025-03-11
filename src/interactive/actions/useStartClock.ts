import { useClock, useSongLoaded, useStarted, useTimeUntilNextLoopStart } from '../lib/store.ts'
import * as Tone from 'tone'
import { useStartLoop } from './useStartLoop.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function useStartClock() {
  const clockFreqHz = 1

  const songLoaded = useSongLoaded.useState()
  const { bpm, leadInLengthBeats } = useSongConfig()
  const loopLength = (60 / bpm) * 32
  const leadInLength = (60 / bpm) * leadInLengthBeats
  const startLoop = useStartLoop()

  return async () => {
    if (!songLoaded) return

    useStarted.set(true)
    useClock.set(
      new Tone.Clock(time => {
        const offset = loopLength - leadInLength - 0.2
        const timeLeftUntilNextLoop = loopLength - ((time + offset) % loopLength)
        useTimeUntilNextLoopStart.set({ time: timeLeftUntilNextLoop, when: Date.now() })

        const timeUntilLoopStartDisabled = timeLeftUntilNextLoop - leadInLength
        if (timeUntilLoopStartDisabled <= 1 / clockFreqHz && timeUntilLoopStartDisabled > 0) {
          startLoop(time + timeLeftUntilNextLoop - leadInLength)
        }
      }, clockFreqHz).start()
    )
  }
}
