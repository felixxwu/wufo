import { IRelease, ISong } from './types'
import { content } from './content'
import { singletonState } from 'singleton-state-hook'

export const useScreenHeight = singletonState(window.innerHeight)
export const useScreenWidth = singletonState(window.innerWidth)
export const useScrollTop = singletonState(0)
export const useSongPlaying = singletonState<ISong>(content.releases[0].songs[0])
export const usePlaying = singletonState(false)
export const useAutoPlay = singletonState(false)
export const useRealPlaybackProgress = singletonState(0)
export const useSongLength = singletonState(0)
export const useLoadedProgress = singletonState(0)
export const useShowControls = singletonState(false)
export const useProgressOverride = singletonState(0)
export const useAppElement = singletonState(document.getElementById('app')!)
export const useExpandedReleases = singletonState<IRelease[]>([content.releases[0]])
