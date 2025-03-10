import { styled } from 'goober'
import { useEffect, useRef } from 'react'
import * as Tone from 'tone'
import { useRefWithOnChange } from './utils/useRefWithOnChange.ts'

export function App() {
  const player = useRef<Tone.Player>(new Tone.Player('/audio/callback.mp3').toDestination())
  const pointerDown = useRef(false)
  const circle = useRef<HTMLButtonElement>(null)
  const rotationDegs = useRef(0)
  const oldRotationDegs = useRef(0)
  const posFromLastMouseDown = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const currentMousePos = useRefWithOnChange({ x: 0, y: 0 }, value => {
    if (!pointerDown.current || !circle.current) return

    const yDiff = value.y - posFromLastMouseDown.current.y
    rotationDegs.current = oldRotationDegs.current + yDiff * 0.5

    circle.current.style.transform = `rotate(${rotationDegs.current}deg)`
  })

  useEffect(() => {
    window.addEventListener('pointerdown', e => {
      pointerDown.current = true
      posFromLastMouseDown.current = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('pointermove', e => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('pointerup', () => {
      pointerDown.current = false
      oldRotationDegs.current = rotationDegs.current
    })
  }, [])

  return (
    <Container>
      <Circle
        ref={circle}
        onClick={async () => {
          if (!player.current) return

          player.current.start()
          player.current.loop = true
          player.current.loopStart = 0
          player.current.loopEnd = 1
        }}
      >
        Button 1
      </Circle>
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
`
