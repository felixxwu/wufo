import { Dispatch, SetStateAction } from 'react'
import { LastPlayed, PlayState } from './initialStateValues'

export function useControls(
    playState: PlayState,
    setPlayState: Dispatch<SetStateAction<PlayState>>,
    lastPlayed: LastPlayed,
    setLastPlayed: Dispatch<SetStateAction<LastPlayed>>
) {
    function currentlyPlaying() {
        return playState.some(release => release.songs.some(song => song.playing))
    }

    function playNext() {
        const { releaseIndex, songIndex } = lastPlayed
        const nextSong = playState[releaseIndex].songs[songIndex + 1]
        if (nextSong) {
            play({ releaseIndex, songIndex: songIndex + 1 })
        } else {
            const nextRelease = playState[releaseIndex + 1]
            if (nextRelease) {
                play({ releaseIndex: releaseIndex + 1, songIndex: 0 })
            }
        }
    }

    function playPrev() {
        const { releaseIndex, songIndex } = lastPlayed
        const prevSong = playState[releaseIndex].songs[songIndex - 1]
        if (prevSong) {
            play({ releaseIndex, songIndex: songIndex - 1 })
        } else {
            const prevRelease = playState[releaseIndex - 1]
            if (prevRelease) {
                play({ releaseIndex: releaseIndex - 1, songIndex: prevRelease.songs.length - 1 })
            }
        }
    }

    function playPause() {
        if (currentlyPlaying()) {
            pause()
        } else {
            play()
        }
    }

    function pause() {
        const newPlayState = [...playState]
        for (const release of newPlayState) {
            for (const song of release.songs) {
                song.playing = false
            }
        }
        setPlayState(newPlayState)
    }

    function play(song?: { releaseIndex: number; songIndex: number }) {
        const newPlayState = [...playState]
        const { releaseIndex, songIndex } = song || lastPlayed
        for (const release of newPlayState) {
            for (const song of release.songs) {
                song.playing = false
            }
        }
        newPlayState[releaseIndex].songs[songIndex].playing = true
        song && setLastPlayed({ releaseIndex, songIndex })
        setPlayState(newPlayState)
    }

    return {
        playNext,
        playPrev,
        playPause,
        play,
        pause,
        currentlyPlaying,
    }
}
