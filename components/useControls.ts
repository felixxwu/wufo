import { Dispatch, SetStateAction } from 'react'
import { LastPlayed, PlayState } from './initialStateValues'
import { content } from '../lib/content'

export function useControls(
    playState: PlayState,
    setPlayState: Dispatch<SetStateAction<PlayState>>,
    lastPlayed: LastPlayed,
    setLastPlayed: Dispatch<SetStateAction<LastPlayed>>
) {
    function currentlyPlaying() {
        return playState.some(release => release.songs.some(song => song.playing))
    }

    function nextSongPlayable() {
        const { releaseIndex, songIndex } = lastPlayed
        const nextSong = playState[releaseIndex].songs[songIndex + 1]
        if (nextSong) return true
        const nextRelease = content.releases[releaseIndex + 1]
        return nextRelease && !nextRelease?.releaseDate
    }

    function playNext() {
        const { releaseIndex, songIndex } = lastPlayed
        const nextSong = playState[releaseIndex].songs[songIndex + 1]
        if (nextSong) {
            play({ releaseIndex, songIndex: songIndex + 1 })
        } else {
            if (!nextSongPlayable()) return

            const nextRelease = playState[releaseIndex + 1]
            if (nextRelease) {
                play({ releaseIndex: releaseIndex + 1, songIndex: 0 })
            }
        }
    }

    function prevSongPlayable() {
        const { releaseIndex, songIndex } = lastPlayed
        const prevSong = playState[releaseIndex].songs[songIndex - 1]
        if (prevSong) return true
        const prevRelease = content.releases[releaseIndex - 1]
        return prevRelease && !prevRelease?.releaseDate
    }

    function playPrev() {
        const { releaseIndex, songIndex } = lastPlayed
        const prevSong = playState[releaseIndex].songs[songIndex - 1]

        if (prevSong) {
            play({ releaseIndex, songIndex: songIndex - 1 })
        } else {
            if (!prevSongPlayable()) return

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
        nextSongPlayable,
        playNext,
        prevSongPlayable,
        playPrev,
        playPause,
        play,
        pause,
        currentlyPlaying,
    }
}
