import { signal } from '@preact/signals'
import { ISong } from './types'
import { content } from './content'

export const background = signal('/artwork/echochamber.jpg')
export const scrollTop = signal(0)
export const songPlaying = signal<ISong>(content.releases[0].songs[0])
export const playing = signal(false)
export const autoPlay = signal(false)
