import { Pause } from '../icons/pause'
import { Play } from '../icons/play'
import { Prev } from '../icons/prev'
import { Next } from '../icons/next'
import { useEffect, useRef, useState } from 'preact/hooks'
import { BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { css } from '@emotion/css'
import { Color } from '../lib/types'
import { DARKEN } from './Background'

const START_OF_SONG_THRESHOLD = 0.05

export function PlayerControls({
  songName,
  playing,
  playbackProgress,
  loadedProgress,
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
  songName: string
  playing: boolean
  playbackProgress: number
  loadedProgress: number
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

  const progressIsNearStart = playbackProgress < START_OF_SONG_THRESHOLD
  const showPrevButton = prevSongPlayable || !progressIsNearStart

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (!e.composedPath().includes(controls.current!.base)) return
      if (e.composedPath().includes(buttons.current!.base)) return

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
    const sliderRect = slider.current!.base.getBoundingClientRect()
    const percent = (e.clientX - sliderRect.left) / sliderRect.width
    const clampedPercent = Math.max(0, Math.min(1, percent))
    onSeek(clampedPercent)
  }

  const handlePlayPrev = () => {
    if (progressIsNearStart) {
      onPrev()
    } else {
      onSeek(0)
    }
  }

  if (!show) return null

  const colorValue = `rgb(${color.map(c => c / DARKEN).join(', ')})`

  return (
    <Container>
      <Card
        ref={controls}
        onClick={(e: any) => e.stopPropagation()}
        style={{ backgroundColor: colorValue }}
      >
        <Title>{songName}</Title>
        <Slider ref={slider} onClick={() => {}}>
          <SliderBarBG />
          <SliderBarLoaded style={{ width: `${loadedProgress * 100}%` }} />
          <SliderBarProgress style={{ width: `${playbackProgress * 100}%` }} />
          <SliderThumb style={{ left: `${playbackProgress * 100}%` }} />
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
              playing ? onPause() : onPlay()
            }}
          >
            {playing ? (
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

const Title = styled('div', {
  color: TEXT_COLOR,
  width: '100%',
  textAlign: 'center',
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
  borderRadius: '50%',
  backgroundColor: TEXT_COLOR,
})
