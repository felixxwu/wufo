import { styled } from 'goober'
import { useRef } from 'react'
import { useRefWithOnChange } from '../utils/useRefWithOnChange.ts'
import { useWindowEventListeners } from '../lib/useWindowEventListeners.ts'

export function Knob() {
  const pointerDown = useRef(false)
  const circle = useRef<HTMLButtonElement>(null)
  const rotationDegs = useRef(0)
  const oldRotationDegs = useRef(0)
  const posFromLastMouseDown = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

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

  return <Circle ref={circle}>knob</Circle>
}

const Circle = styled('button')`
  width: 100px;
  height: 100px;
  border-radius: 50% 50% 50% 0;
  background-color: white;
  cursor: pointer;
`
