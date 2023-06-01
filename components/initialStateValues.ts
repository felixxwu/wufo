import { useContent } from '../lib/content'

export function useInitialValues() {
    const content = useContent()

    return {
        playState: content.releases.map(release => ({
            songs: release.songs.map(() => ({ playing: false })),
        })),
        lastPlayed: {
            releaseIndex: content.releases.findIndex(release => !release.releaseDate),
            songIndex: 0,
        },
    }
}

export type PlayState = ReturnType<typeof useInitialValues>['playState']
export type LastPlayed = ReturnType<typeof useInitialValues>['lastPlayed']
