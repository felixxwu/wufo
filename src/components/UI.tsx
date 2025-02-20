import { content } from '../lib/content'
import { Release } from './Release'
import { usePlayerController } from '../lib/usePlayerController'
import { useEffect } from 'preact/hooks'
import { Header } from './Header'
import { AudioPlayer } from './AudioPlayer'
import { CopyRightFooter } from './Copyright'
import { ReleaseTopBar } from './ReleaseTopBar'
import { loadedProgress, playing, progressOverride, songPlaying } from '../lib/signals'
import { styled } from 'goober'
import { MOBILE_CUTOFF } from '../lib/consts'
import { SliderListeners } from './SliderListeners'

export const RELEASES_GAP = 20

export function UI() {
  useEffect(() => {
    if (progressOverride.value !== 0) {
      play()
    }
  }, [progressOverride.value])

  const { play, pause, next, prev, onSongClick, onTrackEnd } = usePlayerController()

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        playing.value ? pause() : play()
        e.preventDefault()
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next()
        e.preventDefault()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prev()
        e.preventDefault()
      }
    }
  }, [playing.value, songPlaying.value])

  return (
    <Container>
      <Header startPlaying={play} />

      <ReleaseTopBar />

      {content.releases.map((release, i) => (
        <Release release={release} index={i} onSongClick={onSongClick} />
      ))}

      <CopyRightFooter />

      <AudioPlayer
        onLoadProgress={progress => (loadedProgress.value = progress)}
        onTrackEnd={onTrackEnd}
      />

      <SliderListeners />
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${RELEASES_GAP}px;
  width: 100vw;
  max-width: ${MOBILE_CUTOFF}px;
`
