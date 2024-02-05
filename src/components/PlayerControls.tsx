import { Pause } from '../icons/pause'
import { Play } from '../icons/play'
import { Prev } from '../icons/prev'
import { Next } from '../icons/next'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { css } from '@emotion/css'
import { Color } from '../lib/types'
import { DARKEN } from './Background'
import { Spotify } from '../icons/spotify'
import { Link } from './Link'
import { content } from '../lib/content'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { Apple } from '../icons/apple'
import {
  loadedProgress,
  playing,
  realPlaybackProgress,
  songLength,
  songPlaying,
} from '../lib/signals'

const START_OF_SONG_THRESHOLD = 0.05

export function PlayerControls({
  show,
  color,
  onSeek,
  onPlay,
  onPause,
  onNext,
  onPrev,
  nextSongPlayable,
  prevSongPlayable,
}: {
  show: boolean
  color: Color
  onSeek: (percent: number) => void
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrev: () => void
  nextSongPlayable: boolean
  prevSongPlayable: boolean
}) {
  const slider = useRef<{ base: HTMLDivElement }>(null)
  const controls = useRef<{ base: HTMLDivElement }>(null)
  const buttons = useRef<{ base: HTMLDivElement }>(null)
  const [isDragging, setIsDragging] = useState(false)

  const progressIsNearStart = realPlaybackProgress.value < START_OF_SONG_THRESHOLD
  const showPrevButton = prevSongPlayable || !progressIsNearStart

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (controls.current && !e.composedPath().includes(controls.current.base)) return
      if (buttons.current && e.composedPath().includes(buttons.current.base)) return
      if (e.composedPath().includes(document.getElementById('player-links')!)) return

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
    if (!slider.current) return
    const sliderRect = slider.current.base.getBoundingClientRect()
    const percent = (e.clientX - sliderRect.left) / sliderRect.width
    const clampedPercent = Math.max(0, Math.min(1, percent))
    onSeek(clampedPercent)
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
  }

  const handlePlayPrev = () => {
    if (progressIsNearStart) {
      onPrev()
    } else {
      onSeek(0)
    }
  }

  function convertSongLengthToString(length: number) {
    if (length === 0) return '-:--'
    const seconds = Math.floor(length / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const release = useMemo(
    () =>
      content.releases.find(release =>
        release.songs.find(song => song.title === songPlaying.value.title)
      ),
    [songPlaying.value]
  )

  if (!show) return null

  const colorValue = `rgb(${color.map(c => c / DARKEN).join(', ')})`

  return (
    <Container>
      <Card ref={controls} onClick={handleClick} style={{ backgroundColor: colorValue }}>
        <TitleAndLinks>
          <Title>{loadedProgress.value === 0 ? 'Loading...' : songPlaying.value.title}</Title>
          <Links id='player-links'>
            <Link Icon={Spotify} href={release?.spotify} newWindow />
            <Link Icon={SoundCloud} href={release?.soundcloud} newWindow />
            <Link Icon={YouTube} href={release?.youtube} newWindow />
            <Link Icon={Apple} href={release?.apple} newWindow />
          </Links>
        </TitleAndLinks>
        <Slider ref={slider} onClick={() => {}}>
          <SliderLeftNumber>
            {convertSongLengthToString(songLength.value * realPlaybackProgress.value)}
          </SliderLeftNumber>
          <SliderRightNumber>{convertSongLengthToString(songLength.value)}</SliderRightNumber>
          <SliderBarBG />
          <SliderBarLoaded style={{ width: `${loadedProgress.value * 100}%` }} />
          <SliderBarProgress style={{ width: `${realPlaybackProgress.value * 100}%` }} />
          <SliderThumb style={{ left: `${realPlaybackProgress.value * 100}%` }} />
        </Slider>
        <Buttons ref={buttons}>
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
            {playing.value ? (
              <Pause color={colorValue} style={{ width: `${largeIconSize}px` }} />
            ) : (
              <Play color={colorValue} style={{ width: `${largeIconSize}px` }} />
            )}
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
const largeIconSize = 20
const smallIconSize = 15

const Container = styled('div', {
  width: '100%',
  left: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
})

const Card = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '20px',
  flexDirection: 'column',
  marginBottom: `${margin}px`,
  width: '400px',
  maxWidth: `calc(100% - ${margin * 2}px)`,
  backgroundColor: '#222',
  borderRadius: '10px',
  boxShadow: BOX_SHADOW,
  touchAction: 'none',
})

const TitleAndLinks = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const Title = styled('div', {
  color: TEXT_COLOR,
  width: '100%',
})

const Links = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Slider = styled('div', {
  pointerEvents: 'all',
  position: 'relative',
  width: '100%',
  height: `${sliderHeight}px`,
  cursor: 'pointer',
})

const SliderThumb = styled('div', {
  position: 'absolute',
  width: `${thumbSize}px`,
  height: `${thumbSize}px`,
  backgroundColor: TEXT_COLOR,
  borderRadius: '50%',
  marginLeft: `${-thumbSize / 2}px`,
  marginTop: `${thumbTopOffset}px`,
})

const SliderBarProgress = styled('div', {
  marginTop: `${barPositionFromTop}px`,
  position: 'absolute',
  height: `${barHeight}px`,
  backgroundColor: TEXT_COLOR,
})

const SliderBarLoaded = styled('div', {
  marginTop: `${barPositionFromTop}px`,
  position: 'absolute',
  height: `${barHeight}px`,
  backgroundColor: 'rgba(255,255,255,0.4)',
})

const SliderBarBG = styled('div', {
  position: 'absolute',
  width: '100%',
  marginTop: `${barPositionFromTop}px`,
  height: `${barHeight}px`,
  backgroundColor: `rgba(255,255,255,0.2)`,
})

const SliderLeftNumber = styled('div', {
  position: 'absolute',
  color: TEXT_COLOR,
  left: '0',
  top: '30px',
  opacity: 0.8,
})

const SliderRightNumber = styled('div', {
  position: 'absolute',
  color: TEXT_COLOR,
  right: '0',
  top: '30px',
  opacity: 0.8,
})

const Buttons = styled(
  'div',
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  css`
    & > * {
      cursor: pointer;
    }
  `
)

const PlayPauseButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  minWidth: '40px',
  miHeight: '40px',
  borderRadius: '50%',
  backgroundColor: TEXT_COLOR,
})
