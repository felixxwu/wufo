import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Release } from './Release'
import { usePlayerController } from '../lib/usePlayerController'
import { PlayerControls } from './PlayerControls'
import { useEffect, useState } from 'preact/hooks'
import { IRelease } from '../lib/types'
import { Header } from './Header'
import { CoverPreview } from './CoverPreview'
import { AudioPlayer } from './AudioPlayer'
import { CopyRightFooter } from './Copyright'
import { singleSongMode } from '../lib/singleSongMode'
import { ReleaseTopBar } from './ReleaseTopBar'
import {
  loadedProgress,
  playing,
  realPlaybackProgress,
  songLength,
  songPlaying,
} from '../lib/signals'

export function UI() {
  const [progressOverride, setProgressOverride] = useState<number>(0)
  const [coverPreview, setCoverPreview] = useState<IRelease | null>(null)

  useEffect(() => {
    if (progressOverride !== 0) {
      play()
    }
  }, [progressOverride])

  const { play, pause, next, prev, onSongClick, nextSongPlayable, prevSongPlayable, onTrackEnd } =
    usePlayerController()

  useEffect(() => {
    const onkeydown = (e: KeyboardEvent) => {
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
    window.onkeydown = onkeydown
  }, [playing.value, songPlaying.value])

  return (
    <Container>
      <Header />

      <ReleaseTopBar />

      {content.releases.map((release, i) => (
        <Release
          release={release}
          index={i}
          onSongClick={onSongClick}
          songPlaying={playing.value ? songPlaying.value.fileName : null}
          onCoverClick={() => setCoverPreview(release)}
        />
      ))}

      <CopyRightFooter />

      <AudioPlayer
        playbackProgress={progressOverride}
        onPlaybackProgress={(progress, length) => {
          realPlaybackProgress.value = progress
          songLength.value = length
        }}
        onLoadProgress={progress => (loadedProgress.value = progress)}
        onTrackEnd={onTrackEnd}
      />

      <PlayerControls
        color={content.releases.find(release => release.songs.includes(songPlaying.value))!.color}
        onSeek={progress => setProgressOverride(progress)}
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        nextSongPlayable={nextSongPlayable}
        prevSongPlayable={prevSongPlayable}
      />

      <CoverPreview release={coverPreview} onClose={() => setCoverPreview(null)} />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: singleSongMode() ? '30px' : '80px',
  padding: '80px 0',
  width: '100vw',
  maxWidth: '560px',
})
