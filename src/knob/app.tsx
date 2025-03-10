import { styled } from 'goober'
import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { useRefWithOnChange } from './utils/useRefWithOnChange.ts'
import { useWindowEventListeners } from './lib/useWindowEventListeners.ts'

export function App() {
  const player = useRef<Tone.Player>(new Tone.Player('/audio/fromthestart.mp3').toDestination())
  const bpm = 174
  const clockFreqHz = 2
  const beatLength = 60 / bpm
  const loopNumBeats = 32
  const loopLength = loopNumBeats * beatLength
  const pointerDown = useRef(false)
  const circle = useRef<HTMLButtonElement>(null)
  const rotationDegs = useRef(0)
  const oldRotationDegs = useRef(0)
  const posFromLastMouseDown = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [loopStartInBeats, setLoopStartInBeats] = useState(0)
  const loopStartInBeatsRef = useRef(loopStartInBeats)
  const [currentLoopPlaying, setCurrentLoopPlaying] = useState(0)

  useEffect(() => {
    loopStartInBeatsRef.current = loopStartInBeats
  }, [loopStartInBeats])

  const currentMousePos = useRefWithOnChange({ x: 0, y: 0 }, value => {
    if (!pointerDown.current || !circle.current) return

    const yDiff = value.y - posFromLastMouseDown.current.y
    rotationDegs.current = oldRotationDegs.current - yDiff * 0.5

    circle.current.style.transform = `rotate(${rotationDegs.current}deg)`
  })

  useWindowEventListeners({
    currentMousePos,
    oldRotationDegs,
    pointerDown,
    posFromLastMouseDown,
    rotationDegs,
  })

  const handleStart = async () => {
    if (!player.current) return

    player.current.start(0, loopLength * loopStartInBeatsRef.current)
    player.current.loop = true

    new Tone.Clock(time => {
      const timeLeftUntilNextLoop = loopLength - (time % loopLength)
      if (timeLeftUntilNextLoop <= 1 / clockFreqHz) {
        console.log('seek', timeLeftUntilNextLoop, loopStartInBeatsRef.current)
        player.current.seek(loopLength * loopStartInBeatsRef.current, time + timeLeftUntilNextLoop)
        setCurrentLoopPlaying(loopStartInBeatsRef.current)
      }
    }, clockFreqHz).start()
  }

  const handleLoopIncrease = () => {
    setLoopStartInBeats(beats => beats + 1)
  }

  const handleLoopDecrease = () => {
    setLoopStartInBeats(beats => beats - 1)
  }

  return (
    <Container>
      <Circle ref={circle}>knob</Circle>
      <button onClick={handleStart}>Start</button>
      Current loop: {currentLoopPlaying}
      <button onClick={handleLoopIncrease}>Increase loop start ({loopStartInBeats})</button>
      <button onClick={handleLoopDecrease}>Decrease loop start ({loopStartInBeats})</button>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  color: white;
  gap: 20px;
`

const Circle = styled('button')`
  width: 100px;
  height: 100px;
  border-radius: 50% 50% 50% 0;
  background-color: white;
  cursor: pointer;
`
