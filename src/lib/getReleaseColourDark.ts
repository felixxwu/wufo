import { DARKEN } from './consts'
import { IRelease } from './types'

export function getReleaseColourDarkTransparent(release?: IRelease) {
  return `rgba(${release?.color.map(c => c * DARKEN).join(', ')}, 1)`
}

export function getReleaseColourDark(release?: IRelease) {
  return `rgb(${release?.color.map(c => c * DARKEN).join(', ')})`
}
