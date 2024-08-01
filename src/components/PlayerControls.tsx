import { Prev } from '../icons/prev'
import { Next } from '../icons/next'
import { useMemo } from 'preact/hooks'
import { BOX_SHADOW, TEXT_COLOR, TRANSITION } from '../lib/consts'
import {
  playing,
  progressOverride,
  realPlaybackProgress,
  showControls,
  songPlaying,
} from '../lib/signals'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { PlayPause } from './PlayPause'
import { styled } from 'goober'
import { getReleaseColourDark } from '../lib/getReleaseColourDark'
import { Slider } from './Slider'

const START_OF_SONG_THRESHOLD = 0.05
const PLAY_PAUSE_SIZE = 40
const CONTROLS_ID = 'player-controls'
const BUTTONS_ID = 'player-buttons'

export function PlayerControls({
  onPlay,
  onPause,
  onNext,
  onPrev,
  nextSongPlayable,
  prevSongPlayable,
}: {
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrev: () => void
  nextSongPlayable: boolean
  prevSongPlayable: boolean
}) {
  const progressIsNearStart = realPlaybackProgress.value < START_OF_SONG_THRESHOLD
  const showPrevButton = prevSongPlayable || !progressIsNearStart

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
  }

  const handlePlayPrev = () => {
    if (progressIsNearStart) {
      onPrev()
    } else {
      progressOverride.value = 0
    }
  }

  const release = useMemo(() => findReleaseFromSong(songPlaying.value), [songPlaying.value])

  const colorValue = getReleaseColourDark(release)

  return (
    <Container
      style={{
        transform: `translate(0, ${showControls.value ? '0' : '100'}%)`,
        backgroundColor: colorValue,
      }}
    >
      <Card id={CONTROLS_ID} onClick={handleClick}>
        {/* <TitleAndLinks>
          <Title>{loadedProgress.value === 0 ? 'Loading...' : songPlaying.value.title}</Title>
          <Links id={LINKS_ID}>
            <Link Icon={Spotify} href={release?.spotify} newWindow ariaLabel='Spotify' />
            <Link Icon={SoundCloud} href={release?.soundcloud} newWindow ariaLabel='SoundCloud' />
            <Link Icon={YouTube} href={release?.youtube} newWindow ariaLabel='YouTube' />
            <Link Icon={Apple} href={release?.apple} newWindow ariaLabel='Apple' />
            <Link Icon={Close} onclick={handleClose} ariaLabel='Close' />
          </Links>
        </TitleAndLinks> */}
        <Slider release={release!} />
        <Buttons id={BUTTONS_ID}>
          <div
            onClick={handlePlayPrev}
            style={{
              pointerEvents: showPrevButton ? 'auto' : 'none',
            }}
          >
            <Prev
              color={TEXT_COLOR}
              style={{
                width: `${smallIconSize}px`,
                opacity: showPrevButton ? 1 : 0.2,
              }}
            />
          </div>
          <PlayPauseButton
            onClick={() => {
              playing.value ? onPause() : onPlay()
            }}
          >
            <PlayPause playing={playing.value} size={PLAY_PAUSE_SIZE} />
          </PlayPauseButton>
          <div onClick={onNext} style={{ pointerEvents: nextSongPlayable ? 'auto' : 'none' }}>
            <Next
              color={TEXT_COLOR}
              style={{
                width: `${smallIconSize}px`,
                opacity: nextSongPlayable ? 1 : 0.2,
              }}
            />
          </div>
        </Buttons>
      </Card>
    </Container>
  )
}

const margin = 30
const smallIconSize = 15

const Container = styled('div')`
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  transition: ${TRANSITION};
  box-shadow: ${BOX_SHADOW};
  backdrop-filter: blur(40px);
`

const Card = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  flex-direction: column;
  width: 500px;
  max-width: calc(100% - ${margin * 2}px);
  border-radius: 10px;
  touch-action: none;
  transition: ${TRANSITION};
`

const Buttons = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  & > * {
    cursor: pointer;
  }
`

const PlayPauseButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${PLAY_PAUSE_SIZE}px;
  height: ${PLAY_PAUSE_SIZE}px;
  min-width: ${PLAY_PAUSE_SIZE}px;
  min-height: ${PLAY_PAUSE_SIZE}px;
`
