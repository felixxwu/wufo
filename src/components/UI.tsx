import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Player } from './Player'
import { ANIMATION_DELAY, ANIMATION_INTERVAL, Release } from './Release'
import { usePlayerController } from '../lib/usePlayerController'
import { PlayerControls } from './PlayerControls'
import { useEffect, useState } from 'preact/hooks'
import { Color } from '../lib/types'
import { TEXT_COLOR } from '../lib/consts'
import { Header } from './Header'
import { Button } from './Button'
import { CopyLink } from './CopyList'
import { Back } from '../icons/back'

export function UI({ setColor }: { setColor: (colors: Color) => void }) {
  const [progressOverride, setProgressOverride] = useState<number>(0)
  useEffect(() => {
    if (progressOverride !== 0) {
      play()
    }
  }, [progressOverride])

  const {
    songPlaying,
    playing,
    play,
    pause,
    next,
    prev,
    autoplay,
    showControls,
    realPlaybackProgress,
    onSongClick,
    setRealPlaybackProgress,
    loadedProgress,
    setLoadedProgress,
    nextSongPlayable,
    prevSongPlayable,
    onTrackEnd,
  } = usePlayerController(setColor)

  useEffect(() => {
    const onkeydown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        playing ? pause() : play()
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
  }, [playing, songPlaying])

  return (
    <Container>
      {content.releases.length > 1 && <Header />}
      {content.releases.map((release, i) => (
        <Release
          release={release}
          index={i}
          onSongClick={onSongClick}
          songLinkPlaying={playing ? songPlaying.link : null}
        />
      ))}
      <Player
        songLink={songPlaying.link}
        playing={playing}
        autoplay={autoplay}
        playbackProgress={progressOverride}
        onPlaybackProgress={progress => setRealPlaybackProgress(progress)}
        onLoadProgress={progress => setLoadedProgress(progress)}
        onTrackEnd={onTrackEnd}
      />
      <PlayerControls
        songName={songPlaying.title}
        playing={playing}
        show={showControls}
        color={content.releases.find(release => release.songs.includes(songPlaying))!.color}
        playbackProgress={realPlaybackProgress}
        loadedProgress={loadedProgress}
        onSeek={progress => setProgressOverride(progress)}
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        nextSongPlayable={nextSongPlayable}
        prevSongPlayable={prevSongPlayable}
      />
      {content.releases.length === 1 ? (
        <Buttons>
          <CopyLink release={content.releases[0]} />
          <Button label='All songs' href='/' Icon={Back} />
        </Buttons>
      ) : (
        <CopyRight>&copy; WUFO 2023</CopyRight>
      )}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '80px',
  padding: '80px 0',
  width: '100vw',
  maxWidth: '560px',
})

const CopyRight = styled('span', {
  width: '100%',
  textAlign: 'center',
  color: TEXT_COLOR,
  zIndex: -1,

  opacity: '0',
  animationName: 'fade-in',
  animationDelay: `${ANIMATION_INTERVAL * content.releases.length + ANIMATION_DELAY}s`,
  animationDuration: '1s',
  animationFillMode: 'forwards',
})

const Buttons = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})
