import { content } from '../lib/content'

const playState = content.releases.map(release => ({
    songs: release.songs.map(() => ({ playing: false })),
}))
const lastPlayed = {
    releaseIndex: content.releases.findIndex(release => !release.releaseDate),
    songIndex: 0,
}

export const initialStateValues = { playState, lastPlayed }
export type PlayState = typeof playState
export type LastPlayed = typeof lastPlayed
