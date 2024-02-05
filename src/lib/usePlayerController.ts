import { useEffect, useState } from 'preact/hooks'
import { ISong } from './types'
import { content } from './content'
import { singleSongMode } from './singleSongMode'
import { autoPlay, playing, songPlaying } from './signals'

const flatSongs = content.releases.reduce((acc, release) => {
  return [...acc, ...release.songs]
}, [] as ISong[])

export function usePlayerController() {
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    if (playing.value) {
      document.title = `▶ WUFO - ${songPlaying.value.title}`
    } else {
      if (singleSongMode()) {
        document.title = `WUFO - ${content.releases[0].title}`
      } else {
        document.title = 'WUFO - Official Website'
      }
    }
  }, [songPlaying.value, playing.value])

  const onSongClick = (song: ISong) => {
    setShowControls(true)

    if (songPlaying.value.fileName === song.fileName) {
      playing.value = !playing.value
      return
    }

    songPlaying.value = song
    autoPlay.value = true

    playing.value = true
  }

  const play = () => {
    if (!showControls) {
      onSongClick(content.releases[0].songs[0])
    } else {
      playing.value = true
    }
  }

  const pause = () => {
    playing.value = false
  }

  const next = () => {
    const songIndex = flatSongs.findIndex(song => song.fileName === songPlaying.value.fileName)
    const nextSong = flatSongs[songIndex + 1]
    if (nextSong) {
      onSongClick(nextSong)
    }
  }

  const prev = () => {
    const songIndex = flatSongs.findIndex(song => song.fileName === songPlaying.value.fileName)
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
    !!flatSongs[flatSongs.findIndex(song => song.fileName === songPlaying.value.fileName) + 1]
  const prevSongPlayable =
    !!flatSongs[flatSongs.findIndex(song => song.fileName === songPlaying.value.fileName) - 1]

  return {
    play,
    pause,
    next,
    prev,
    showControls,
    onSongClick,
    nextSongPlayable,
    prevSongPlayable,
    onTrackEnd,
  }
}
