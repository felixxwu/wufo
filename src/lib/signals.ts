import { signal } from '@preact/signals'
import { IRelease, ISong } from './types'
import { content } from './content'

export const screenHeight = signal(window.innerHeight)
export const screenWidth = signal(window.innerWidth)
export const scrollTop = signal(0)
export const songPlaying = signal<ISong>(content.releases[0].songs[0])
export const playing = signal(false)
export const autoPlay = signal(false)
export const realPlaybackProgress = signal(0)
export const songLength = signal(0)
export const loadedProgress = signal(0)
export const showControls = signal(false)
export const progressOverride = signal(0)
export const appElement = signal(document.getElementById('app')!)
export const expandedReleases = signal<IRelease[]>([content.releases[0]])
