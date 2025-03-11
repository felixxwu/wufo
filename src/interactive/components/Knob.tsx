import { styled } from 'goober'
import { useEffect, useRef } from 'react'
import { useRefWithOnChange } from '../utils/useRefWithOnChange.ts'
import { useWindowEventListeners } from '../lib/useWindowEventListeners.ts'
import {
  useLoopNum,
  useOldRotationDegs,
  usePointerDown,
  usePosFromLastMouseDown,
  useRotationDegs,
  useSongNum,
  useTimeUntilNextLoopStart,
} from '../lib/store.ts'
import knobSvg from '../assets/knob.svg'
import { config } from '../lib/config.ts'
import { useSetLoopNum } from '../actions/useSetLoopNum.ts'

const knobSize = 250
const knobSensitivity = 0.6
const knobRangeDeg = 240

export function Knob() {
  const circle = useRef<HTMLButtonElement>(null)
  const arc = useRef<HTMLDivElement>(null)
  const setLoopNum = useSetLoopNum()
  const pointerDown = usePointerDown.useState()

  const currentMousePos = useRefWithOnChange({ x: 0, y: 0 }, value => {
    if (!usePointerDown.ref() || !circle.current) return

    const { files } = config[useSongNum.ref()]

    const yDiff = value.y - usePosFromLastMouseDown.ref().y
    useRotationDegs.set(useOldRotationDegs.ref() - yDiff * knobSensitivity)

    circle.current.style.transition = '0ms'
    circle.current.style.transform = `rotate(${useRotationDegs.ref()}deg)`

    const progress = (useRotationDegs.ref() + knobRangeDeg / 2) / knobRangeDeg
    const steps = files.map((_, i) => i / (files.length - 1))
    const nearestStepIndex = steps.reduce(
      (acc, step, i) => (Math.abs(step - progress) < Math.abs(steps[acc] - progress) ? i : acc),
      0
    )
    if (nearestStepIndex !== useLoopNum.ref()) {
      setLoopNum(nearestStepIndex)
    }
  })

  useEffect(() => {
    if (pointerDown || !circle.current) return

    const { files } = config[useSongNum.ref()]
    const steps = files.map((_, i) => i / (files.length - 1))
    const angle = steps[useLoopNum.ref()] * knobRangeDeg - knobRangeDeg / 2

    circle.current.style.transition = '200ms'
    circle.current.style.transform = `rotate(${angle}deg)`
    useRotationDegs.set(angle)
    useOldRotationDegs.set(angle)
  }, [pointerDown])

  useEffect(() => {
    setInterval(() => {
      if (!arc.current) return

      const timeLeft = useTimeUntilNextLoopStart.ref().time
      const adjustment = Date.now() - useTimeUntilNextLoopStart.ref().when

      const timeLeftAdjusted = timeLeft - adjustment / 1000
      const loopLength = 32 / (config[useSongNum.ref()].bpm / 60)
      const progress = Math.max(0, Math.min(1, timeLeftAdjusted / loopLength))
      arc.current.style.mask = `conic-gradient(#000 ${(1 - progress) * 360}deg, #0000 0)`
    }, 200)
  }, [])

  useWindowEventListeners(currentMousePos)

  return (
    <Div>
      <Circle ref={circle}>
        <img src={knobSvg} width={knobSize} height={knobSize} draggable={false} alt='Knob' />
      </Circle>
      <Arc ref={arc} />
    </Div>
  )
}

const Div = styled('div')`
  width: 0;
  height: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 180px;
`

const Circle = styled('div')`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${knobSize}px;
  height: ${knobSize}px;
  cursor: pointer;
`

const Arc = styled('div')`
  width: 250px;
  aspect-ratio: 1;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 4px solid white;
  animation: rotate 1s linear infinite;
`
