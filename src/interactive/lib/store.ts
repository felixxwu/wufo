import { singletonState } from 'singleton-state-hook'
import * as Tone from 'tone'
import { config } from './config.ts'

export const useLoopNum = singletonState(1)
export const useSongNum = singletonState(0)
export const useSongLoaded = singletonState(false)
export const useCurrentLoopPlaying = singletonState(1)
export const useTimeUntilNextLoopStart = singletonState(0)
export const useStarted = singletonState(false)
export const useClock = singletonState<Tone.Clock | null>(null)

export const player1 = singletonState(new Tone.Player().toDestination())
export const player2 = singletonState(new Tone.Player().toDestination())
export const usePlayer1 = singletonState(true)

export function useSongConfig() {
  return config[useSongNum.value()]
}
