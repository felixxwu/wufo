import { useEffect, useRef, useState } from 'preact/hooks'
import { sleep } from '../lib/sleep'
import { styled } from '../lib/styled'

export function Player({
  songLink,
  playing,
  autoplay,
  onPlayChange,
  onTrackEnd,
  playbackProgress,
  onPlaybackProgress,
  onLoadProgress,
}: {
  songLink: string
  playing: boolean
  autoplay: boolean
  onPlayChange?: (playing: boolean) => void
  onTrackEnd?: () => void
  playbackProgress?: number // percentage
  onPlaybackProgress?: (progress: number) => void // percentage
  onLoadProgress?: (progress: number) => void
}) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    ;(async () => {
      setShowPlayer(false)
      await sleep(0)
      setShowPlayer(true)
      await sleep(0)
      onPlaybackProgress?.(0)
      onLoadProgress?.(0)
      if (!iframe.current) return

      window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.PAUSE, () => {
        onPlayChange?.(false)
      })
      window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.PLAY_PROGRESS, e => {
        onPlaybackProgress?.(e.relativePosition)
        onLoadProgress?.(e.loadedProgress)
      })
      window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.FINISH, () => {
        onTrackEnd?.()
      })
    })()
  }, [songLink])

  useEffect(() => {
    if (!iframe.current) return
    if (playing) {
      window.SC.Widget(iframe.current).play()
    } else {
      window.SC.Widget(iframe.current).pause()
    }
  }, [playing])

  useEffect(() => {
    if (!iframe.current) return
    if (playbackProgress !== undefined) {
      window.SC.Widget(iframe.current!).getDuration(length => {
        window.SC.Widget(iframe.current!).seekTo(playbackProgress * length)
      })
    }
  }, [playbackProgress])

  if (!showPlayer) return null

  return (
    <Container>
      <iframe
        ref={iframe}
        tabIndex={-1}
        scrolling='no'
        frameBorder='no'
        allow='autoplay'
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          songLink
        )}&color=%000000&auto_play=${autoplay}&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
      ></iframe>
    </Container>
  )
}

const Container = styled('div', {
  pointerEvents: 'none',
  opacity: 0,
  display: 'none',
})
