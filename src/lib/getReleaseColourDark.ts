import { DARKEN } from './consts'
import { IRelease } from './types'

export function getReleaseColourDark(release?: IRelease) {
  return `rgba(${release?.color.map(c => c * DARKEN).join(', ')}, 0.75)`
}
