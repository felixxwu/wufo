import { Prev } from '../icons/prev'
import { Next } from '../icons/next'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { BOX_SHADOW, MOBILE_CUTOFF, TEXT_COLOR, TRANSITION } from '../lib/consts'
import { Spotify } from '../icons/spotify'
import { Link } from './Link'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { Apple } from '../icons/apple'
import {
  loadedProgress,
  playing,
  progressOverride,
  realPlaybackProgress,
  showControls,
  songLength,
  songPlaying,
} from '../lib/signals'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { PlayPause } from './PlayPause'
import { Close } from '../icons/close'
import { styled } from 'goober'
import { getReleaseColourDark } from '../lib/getReleaseColourDark'

const START_OF_SONG_THRESHOLD = 0.05
const PLAY_PAUSE_SIZE = 40
const CONTROLS_ID = 'player-controls'
const BUTTONS_ID = 'player-buttons'
const LINKS_ID = 'player-links'
const SLIDER_ID = 'player-slider'

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
  const [isDragging, setIsDragging] = useState(false)

  const progressIsNearStart = realPlaybackProgress.value < START_OF_SONG_THRESHOLD
  const showPrevButton = prevSongPlayable || !progressIsNearStart

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (!e.composedPath().includes(document.getElementById(CONTROLS_ID)!)) return
      if (e.composedPath().includes(document.getElementById(BUTTONS_ID)!)) return
      if (e.composedPath().includes(document.getElementById(LINKS_ID)!)) return

      setIsDragging(true)
      handlePointerSeek(e)
    }
    function handlePointerMove(e: PointerEvent) {
      if (!isDragging) return
      handlePointerSeek(e)
    }
    function handlePointerUp() {
      setIsDragging(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
    window.addEventListener('pointerleave', handlePointerUp)
    window.addEventListener('blur', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('pointerleave', handlePointerUp)
      window.removeEventListener('blur', handlePointerUp)
    }
  }, [isDragging])

  function handlePointerSeek(e: PointerEvent) {
    if (!document.getElementById(SLIDER_ID)) return
    const sliderRect = document.getElementById(SLIDER_ID)!.getBoundingClientRect()
    const percent = (e.clientX - sliderRect.left) / sliderRect.width
    const clampedPercent = Math.max(0, Math.min(1, percent))
    progressOverride.value = clampedPercent
  }

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
  const handleClose = () => {
    showControls.value = false
    playing.value = false
  }

  function convertSongLengthToString(length: number) {
    if (length === 0) return '-:--'
    const seconds = Math.floor(length / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
        <TitleAndLinks>
          <Title>{loadedProgress.value === 0 ? 'Loading...' : songPlaying.value.title}</Title>
          <Links id={LINKS_ID}>
            <Link Icon={Spotify} href={release?.spotify} newWindow ariaLabel='Spotify' />
            <Link Icon={SoundCloud} href={release?.soundcloud} newWindow ariaLabel='SoundCloud' />
            <Link Icon={YouTube} href={release?.youtube} newWindow ariaLabel='YouTube' />
            <Link Icon={Apple} href={release?.apple} newWindow ariaLabel='Apple' />
            <Link Icon={Close} onclick={handleClose} ariaLabel='Close' />
          </Links>
        </TitleAndLinks>
        <Slider id={SLIDER_ID} onClick={() => {}}>
          <SliderLeftNumber>
            {convertSongLengthToString(songLength.value * realPlaybackProgress.value)}
          </SliderLeftNumber>
          <SliderRightNumber>{convertSongLengthToString(songLength.value)}</SliderRightNumber>
          <SliderBarBG />
          <SliderBarLoaded style={{ width: `${loadedProgress.value * 100}%` }} />
          <SliderBarProgress style={{ width: `${realPlaybackProgress.value * 100}%` }} />
          <SliderThumb style={{ left: `${realPlaybackProgress.value * 100}%` }} />
        </Slider>
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
const thumbSize = 15
const sliderHeight = 25
const barPositionFromTop = 12
const thumbTopOffset = 6
const barHeight = 3
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
  width: ${MOBILE_CUTOFF}px;
  max-width: calc(100% - ${margin * 2}px);
  border-radius: 10px;
  touch-action: none;
  transition: ${TRANSITION};
`

const TitleAndLinks = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Title = styled('div')`
  color: ${TEXT_COLOR};
  width: 100%;
`

const Links = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Slider = styled('div')`
  pointer-events: all;
  position: relative;
  width: 100%;
  height: ${sliderHeight}px;
  cursor: pointer;
`

const SliderThumb = styled('div')`
  position: absolute;
  width: ${thumbSize}px;
  height: ${thumbSize}px;
  background-color: ${TEXT_COLOR};
  border-radius: 50%;
  margin-left: ${-thumbSize / 2}px;
  margin-top: ${thumbTopOffset}px;
`

const SliderBarProgress = styled('div')`
  margin-top: ${barPositionFromTop}px;
  position: absolute;
  height: ${barHeight}px;
  background-color: ${TEXT_COLOR};
`

const SliderBarLoaded = styled('div')`
  margin-top: ${barPositionFromTop}px;
  position: absolute;
  height: ${barHeight}px;
  background-color: rgba(255, 255, 255, 0.4);
`

const SliderBarBG = styled('div')`
  position: absolute;
  width: 100%;
  margin-top: ${barPositionFromTop}px;
  height: ${barHeight}px;
  background-color: rgba(255, 255, 255, 0.2);
`

const SliderLeftNumber = styled('div')`
  position: absolute;
  color: ${TEXT_COLOR};
  left: 0;
  top: 30px;
  opacity: 0.8;
`

const SliderRightNumber = styled('div')`
  position: absolute;
  color: ${TEXT_COLOR};
  right: 0;
  top: 30px;
  opacity: 0.8;
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
