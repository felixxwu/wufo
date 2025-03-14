import {
  usePlayer1,
  usePlayer2,
  useCurrentLoopPlaying,
  useLoopRequested,
  useNextPlayerToUse,
  useBase64Audio,
} from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'
import * as Tone from 'tone'
import { useLeadInLength } from '../computed/useLeadInLength.ts'
import { useTimeUntilNextLoop } from '../computed/useTimeUntilNextLoop.ts'
import { useStop } from './useStop.ts'

export function useStartLoop() {
  const { files } = useSongConfig()
  const leadInLength = useLeadInLength()
  const timeLeftUntilNextLoop = useTimeUntilNextLoop()
  const stop = useStop()

  return async () => {
    if (files[useLoopRequested.ref()].name === null) {
      useCurrentLoopPlaying.set(useLoopRequested.ref())
      stop(false)
      return
    }

    const shouldUsePlayer1 = useNextPlayerToUse.ref() === 1
    const usePlayer = shouldUsePlayer1 ? usePlayer1 : usePlayer2

    await usePlayer.ref().load(useBase64Audio.ref()[useLoopRequested.ref()])

    const when = Tone.now() + timeLeftUntilNextLoop() - leadInLength
    const late = when < Tone.now()
    const lateBy = Math.max(0, Tone.now() - when)

    if (late) console.log('Loop late by', lateBy)

    const bufferForLatePlay = 0.1
    const whenToStart = late ? when + lateBy + bufferForLatePlay : when
    const sampleStart = late ? lateBy + bufferForLatePlay : 0
    usePlayer.ref().start(whenToStart, sampleStart)

    useNextPlayerToUse.set(shouldUsePlayer1 ? 2 : 1)
    useCurrentLoopPlaying.set(useLoopRequested.ref())
  }
}
