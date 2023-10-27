import { useState } from 'preact/hooks'
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
  const [loadedProgress, setLoadedProgress] = useState<number>(0)
  const [showControls, setShowControls] = useState(false)

  const onSongClick = (song: ISong) => {
    setShowControls(true)
    const release = content.releases.find(release => release.songs.includes(song))
    if (release) {
      setColor(release.color)
    }

    if (songPlaying.link === song.link) {
      setPlaying(!playing)
      return
    }

    setSongPlaying(song)
    setPlaying(true)
    setAutoplay(true)
    setRealPlaybackProgress(0)
    setLoadedProgress(0)
  }

  const play = () => {
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
  }

  const next = () => {
    const songIndex = flatSongs.findIndex(song => song.link === songPlaying.link)
    const nextSong = flatSongs[songIndex + 1]
    if (nextSong) {
      onSongClick(nextSong)
    }
  }

  const prev = () => {
    const songIndex = flatSongs.findIndex(song => song.link === songPlaying.link)
    const prevSong = flatSongs[songIndex - 1]
    if (prevSong) {
      onSongClick(prevSong)
    }
  }

  return {
    songPlaying,
    playing,
    play,
    pause,
    next,
    prev,
    autoplay,
    showControls,
    loadedProgress,
    setLoadedProgress,
    realPlaybackProgress,
    setRealPlaybackProgress,
    onSongClick,
  }
}
