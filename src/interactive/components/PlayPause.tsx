import { useSongLoaded, useStarted } from '../lib/store.ts'
import { styled } from 'goober'
import { useStop } from '../actions/useStop.ts'
import { useStartClock } from '../actions/useStartClock.ts'
import { useRef } from 'react'
import * as Tone from 'tone'

export function PlayPause() {
  const started = useStarted.useState()
  const startClock = useStartClock()
  const stop = useStop()
  const songLoaded = useSongLoaded.useState()
  const audio = useRef<HTMLAudioElement>(null)

  const handleStart = async () => {
    audio.current?.play()
    await Tone.start()
    await startClock()
  }

  if (!songLoaded) {
    return <Div>Loading...</Div>
  }

  return (
    <Div>
      {started ? (
        <IconContainer onClick={stop}>
          <Svg viewBox='0 0 3 3'>
            <Polygon points='0,0 0,3 1,3 1,0' />
            <Polygon points='2,0 2,3 3,3 3,0' />
          </Svg>
        </IconContainer>
      ) : (
        <IconContainer onClick={handleStart}>
          <Svg viewBox='0 0 2 2' style={{ transform: 'translateX(2px)' }}>
            <Polygon points='2,1 0,2 0,0' />
          </Svg>
        </IconContainer>
      )}
      <audio ref={audio}>
        <source src='/silence.mp3' type='audio/mp3'></source>
      </audio>
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  top: 80px;
`

const IconContainer = styled('div')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;

  &:hover {
    background-color: #555;
  }
`

const Svg = styled('svg')`
  width: 15px;
`

const Polygon = styled('polygon')`
  fill: white;
`
