import { useEffect, useRef, useState } from 'preact/hooks'
import { styled } from '../lib/styled'
import { autoPlay, playing, songPlaying } from '../lib/signals'

export function AudioPlayer({
  onPlayChange,
  onTrackEnd,
  playbackProgress,
  onPlaybackProgress,
  onLoadProgress,
}: {
  onPlayChange?: (playing: boolean) => void
  onTrackEnd?: () => void
  playbackProgress?: number // percentage
  onPlaybackProgress?: (progress: number, length: number) => void // percentage
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
    onPlaybackProgress?.(time / duration, duration * 1000)
  }, [duration, time])

  useEffect(() => {
    if (!audio.current) return
    audio.current!.currentTime = playbackProgress! * duration
  }, [playbackProgress])

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

const Container = styled('div', {
  pointerEvents: 'none',
  opacity: 0,
  display: 'none',
})
