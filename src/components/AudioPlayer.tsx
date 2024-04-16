import { useEffect, useRef, useState } from 'preact/hooks'
import {
  autoPlay,
  playing,
  progressOverride,
  realPlaybackProgress,
  songLength,
  songPlaying,
} from '../lib/signals'
import styled from 'styled-components'

export function AudioPlayer({
  onPlayChange,
  onTrackEnd,
  onLoadProgress,
}: {
  onPlayChange?: (playing: boolean) => void
  onTrackEnd?: () => void
  onLoadProgress?: (progress: number) => void
}) {
  const audio = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [buffered, setBuffered] = useState<number>(0)

  useEffect(() => {
    if (playing.value) {
      audio.current?.play()
    } else {
      audio.current?.pause()
    }
  }, [playing.value])

  useEffect(() => {
    const newPlaybackProgress = time / duration
    const newLength = duration * 1000
    realPlaybackProgress.value = newPlaybackProgress
    songLength.value = newLength
  }, [duration, time])

  useEffect(() => {
    if (!audio.current) return
    audio.current!.currentTime = progressOverride.value! * duration
  }, [progressOverride.value])

  useEffect(() => {
    onLoadProgress?.(buffered / duration)
  }, [buffered])

  return (
    <Container>
      <audio
        src={songPlaying.value.fileName}
        autoplay={autoPlay.value}
        type='audio/mp3'
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

const Container = styled.div`
  pointer-events: none;
  opacity: 0;
  display: none;
`
