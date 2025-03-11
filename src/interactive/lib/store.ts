import { singletonState } from 'singleton-state-hook'
import * as Tone from 'tone'

export const useLoopNum = singletonState(1)
export const useSongNum = singletonState(0)
export const useSongLoaded = singletonState(false)
export const useCurrentLoopPlaying = singletonState(1)
export const useTimeUntilNextLoopStart = singletonState(0)
export const useStarted = singletonState(false)
export const useClock = singletonState<Tone.Clock | null>(null)

export const usePlayer1 = singletonState(new Tone.Player().toDestination())
export const usePlayer2 = singletonState(new Tone.Player().toDestination())
export const useNextPlayerToUse = singletonState<1 | 2>(1)
