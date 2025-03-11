import { useEffect, useRef, useState } from 'react'
import {
  useAutoPlay,
  usePlaying,
  useProgressOverride,
  useRealPlaybackProgress,
  useSongLength,
  useSongPlaying,
} from '../lib/signals'
import { styled } from 'goober'

export function AudioPlayer({
  onPlayChange,
  onTrackEnd,
  onLoadProgress,
}: {
  onPlayChange?: (playing: boolean) => void
  onTrackEnd?: () => void
  onLoadProgress?: (progress: number) => void
}) {
  const songPlaying = useSongPlaying.useState()
  const autoPlay = useAutoPlay.useState()
  const progressOverride = useProgressOverride.useState()
  const playing = usePlaying.useState()

  const audio = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [buffered, setBuffered] = useState<number>(0)

  useEffect(() => {
    if (playing) {
      audio.current?.play()
    } else {
      audio.current?.pause()
    }
  }, [playing])

  useEffect(() => {
    const newPlaybackProgress = time / duration
    const newLength = duration * 1000
    useRealPlaybackProgress.set(newPlaybackProgress)
    useSongLength.set(newLength)
  }, [duration, time])

  useEffect(() => {
    if (!audio.current) return
    audio.current!.currentTime = progressOverride! * duration
  }, [progressOverride])

  useEffect(() => {
    onLoadProgress?.(buffered / duration)
  }, [buffered])

  return (
    <Container>
      <audio
        src={songPlaying.fileName}
        autoPlay={autoPlay}
        ref={audio}
        onLoadedMetadata={() => setDuration(audio.current!.duration)}
        onTimeUpdate={() => setTime(audio.current!.currentTime)}
        onProgress={() => {
          if (!audio.current) return
          if (audio.current.buffered.length === 0) return
          setBuffered(Math.floor(audio.current.buffered.end(audio.current.buffered.length - 1)))
        }}
        onEnded={onTrackEnd}
        onPlay={() => onPlayChange?.(true)}
        onPause={() => onPlayChange?.(false)}
      ></audio>
    </Container>
  )
}

const Container = styled('div')`
  pointer-events: none;
  opacity: 0;
  display: none;
`
