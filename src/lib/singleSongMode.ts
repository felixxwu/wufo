import { content } from './content'

export function singleSongMode() {
  return content.releases.length === 1
}
