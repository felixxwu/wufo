import { useEffect, useRef, useState } from 'preact/hooks'
import { styled } from '../lib/styled'

export function AudioPlayer({
  fileName,
  playing,
  autoplay,
  onPlayChange,
  onTrackEnd,
  playbackProgress,
  onPlaybackProgress,
  onLoadProgress,
}: {
  fileName: string
  playing: boolean
  autoplay: boolean
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
    if (playing) {
      audio.current?.play()
    } else {
      audio.current?.pause()
    }
  }, [playing])

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
        src={fileName}
        autoplay={autoplay}
        type='audio/mp3'
        ref={audio}
        onLoadedMetadata={() => setDuration(audio.current!.duration)}
        onTimeUpdate={() => setTime(audio.current!.currentTime)}
        onProgress={() => {
          if (!audio.current) return
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
