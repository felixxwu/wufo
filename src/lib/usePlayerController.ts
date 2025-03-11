import { useEffect } from 'react'
import { ISong } from './types'
import { content } from './content'
import { singleSongMode } from './singleSongMode'
import { useAutoPlay, usePlaying, useShowControls, useSongPlaying } from './signals'

const flatSongs = content.releases.reduce((acc, release) => {
  return [...acc, ...release.songs]
}, [] as ISong[])

export function usePlayerController() {
  const playing = usePlaying.useState()
  const songPlaying = useSongPlaying.useState()
  const showControls = useShowControls.useState()

  useEffect(() => {
    if (playing) {
      document.title = `▶ WUFO - ${songPlaying.title}`
    } else {
      if (singleSongMode()) {
        document.title = `WUFO - ${content.releases[0].title}`
      } else {
        document.title = 'WUFO - Official Website'
      }
    }
  }, [songPlaying, playing])

  const onSongClick = (song: ISong) => {
    useShowControls.set(true)

    if (songPlaying.fileName === song.fileName) {
      usePlaying.set(!playing)
      return
    }

    useSongPlaying.set(song)
    useAutoPlay.set(true)

    usePlaying.set(true)
  }

  const play = () => {
    if (!showControls) {
      onSongClick(content.releases[0].songs[0])
    } else {
      usePlaying.set(true)
    }
  }

  const pause = () => {
    usePlaying.set(false)
  }

  const next = () => {
    const songIndex = flatSongs.findIndex(song => song.fileName === songPlaying.fileName)
    const nextSong = flatSongs[songIndex + 1]
    if (nextSong) {
      onSongClick(nextSong)
    }
  }

  const prev = () => {
    const songIndex = flatSongs.findIndex(song => song.fileName === songPlaying.fileName)
    const prevSong = flatSongs[songIndex - 1]
    if (prevSong) {
      onSongClick(prevSong)
    }
  }

  const onTrackEnd = () => {
    if (nextSongPlayable) {
      next()
    } else {
      pause()
    }
  }

  const nextSongPlayable =
    !!flatSongs[flatSongs.findIndex(song => song.fileName === songPlaying.fileName) + 1]
  const prevSongPlayable =
    !!flatSongs[flatSongs.findIndex(song => song.fileName === songPlaying.fileName) - 1]

  return {
    play,
    pause,
    next,
    prev,
    onSongClick,
    nextSongPlayable,
    prevSongPlayable,
    onTrackEnd,
  }
}
