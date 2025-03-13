import {
  useClock,
  useClockStartTime,
  useSongLoaded,
  useStarted,
  useTimeUntilNextLoopStart,
} from '../lib/store.ts'
import * as Tone from 'tone'
import { useStartLoop } from './useStartLoop.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { useTimeUntilNextLoop } from '../computed/useTimeUntilNextLoop.ts'

export function useStartClock() {
  const clockFreqHz = 2

  const { bpm, leadInLengthBeats } = useSongConfig()
  const leadInLength = (60 / bpm) * leadInLengthBeats
  const startLoop = useStartLoop()
  const timeLeftUntilNextLoop = useTimeUntilNextLoop()

  return async () => {
    if (!useSongLoaded.ref()) return

    const audio = document.getElementById('silence') as HTMLAudioElement
    audio?.play()
    await Tone.start()

    useStarted.set(true)
    useClock.set(
      new Tone.Clock(time => {
        if (useClockStartTime.ref() === null) {
          useClockStartTime.set(time)
        }
        useTimeUntilNextLoopStart.set({ time: timeLeftUntilNextLoop(), when: Date.now() })

        const timeUntilLoopStartDisabled = timeLeftUntilNextLoop() - leadInLength
        if (timeUntilLoopStartDisabled <= 1 / clockFreqHz && timeUntilLoopStartDisabled > 0) {
          startLoop()
        }
      }, clockFreqHz).start()
    )
  }
}
