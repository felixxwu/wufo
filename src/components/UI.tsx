import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Player } from './Player'
import { ANIMATION_INTERVAL, Release } from './Release'
import { usePlayerController } from '../lib/usePlayerController'
import { PlayerControls } from './PlayerControls'
import { useState } from 'preact/hooks'
import { Color } from '../lib/types'
import { TEXT_COLOR } from '../lib/consts'
import { Profile } from './Profile'

export function UI({ setColor }: { setColor: (colors: Color) => void }) {
  const [progressOverride, setProgressOverride] = useState<number>(0)
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
  } = usePlayerController(setColor)

  return (
    <Container>
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
        nextSongPlayable={true}
        prevSongPlayable={true}
      />
      <Profile />
      <CopyRight>&copy; WUFO 2023</CopyRight>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '80px',
  padding: '80px 0',
})

const CopyRight = styled('span', {
  width: '100%',
  textAlign: 'center',
  color: TEXT_COLOR,

  opacity: '0',
  animationName: 'fade-in',
  animationDelay: `${ANIMATION_INTERVAL * content.releases.length + 2}s`,
  animationDuration: '1s',
  animationFillMode: 'forwards',
})
