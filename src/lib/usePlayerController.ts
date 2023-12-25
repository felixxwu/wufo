import { useEffect, useState } from 'preact/hooks'
import { Color, ISong } from './types'
import { content } from './content'

const flatSongs = content.releases.reduce((acc, release) => {
  return [...acc, ...release.songs]
}, [] as ISong[])

export function usePlayerController(setColor: (colors: Color) => void) {
  const [songPlaying, setSongPlaying] = useState<ISong>(content.releases[0].songs[0])
  const [autoplay, setAutoplay] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [realPlaybackProgress, setRealPlaybackProgress] = useState<number>(0)
  const [songLength, setSongLength] = useState<number>(0)
  const [loadedProgress, setLoadedProgress] = useState<number>(0)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    if (playing) {
      document.title = `▶ WUFO - ${songPlaying.title}`
    } else {
      document.title = 'WUFO - Official Website'
    }
  }, [songPlaying, playing])

  const onSongClick = (song: ISong) => {
    setShowControls(true)
    const release = content.releases.find(release => release.songs.includes(song))
    if (release) {
      setColor(release.color)
    }

    if (songPlaying.fileName === song.fileName) {
      setPlaying(!playing)
      return
    }

    setSongPlaying(song)
    setAutoplay(true)

    setPlaying(true)
  }

  const play = () => {
    if (!showControls) {
      onSongClick(content.releases[0].songs[0])
    } else {
      setPlaying(true)
    }
  }

  const pause = () => {
    setPlaying(false)
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
    songPlaying,
    songLength,
    setSongLength,
    playing,
    play,
    pause,
    next,
    prev,
    autoplay,
    showControls,
    loadedProgress: Math.min(loadedProgress, 1),
    setLoadedProgress,
    realPlaybackProgress,
    setRealPlaybackProgress,
    onSongClick,
    nextSongPlayable,
    prevSongPlayable,
    onTrackEnd,
  }
}
