import { content } from './content'
import { ISong } from './types'

export function findReleaseFromSong(song: ISong) {
  return content.releases.find(release => release.songs.find(s => s.title === song.title))
}
