import { styled } from 'goober'
import { useEffect, useRef } from 'react'
import { useRefWithOnChange } from '../utils/useRefWithOnChange.ts'
import { useWindowEventListeners } from '../lib/useWindowEventListeners.ts'
import {
  useLoopRequested,
  useOldRotationDegs,
  usePointerDown,
  usePosFromLastMouseDown,
  useRotationDegs,
  useSongNum,
} from '../lib/store.ts'
import knobSvg from '../assets/knob.svg'
import { config } from '../lib/config.ts'
import { useSetLoopNum } from '../actions/useSetLoopNum.ts'
import { LoopIndicator } from './LoopIndicator.tsx'
import { consts } from '../lib/consts.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function Knob() {
  const circle = useRef<HTMLButtonElement>(null)
  const setLoopNum = useSetLoopNum()
  const loopRequested = useLoopRequested.useState()
  const songNum = useSongNum.useState()
  const pointerDown = usePointerDown.useState()
  const { files } = useSongConfig()

  const currentMousePos = useRefWithOnChange({ x: 0, y: 0 }, value => {
    if (!usePointerDown.ref() || !circle.current) return

    const { files } = config[useSongNum.ref()]

    const yDiff = value.y - usePosFromLastMouseDown.ref().y
    useRotationDegs.set(useOldRotationDegs.ref() - yDiff * consts.knobSensitivity)

    circle.current.style.transition = '0ms'
    circle.current.style.transform = `rotate(${useRotationDegs.ref()}deg)`

    const progress = (useRotationDegs.ref() + consts.knobRangeDeg / 2) / consts.knobRangeDeg
    const steps = files.map((_, i) => i / (files.length - 1))
    const nearestStepIndex = steps.reduce(
      (acc, step, i) => (Math.abs(step - progress) < Math.abs(steps[acc] - progress) ? i : acc),
      0
    )
    if (nearestStepIndex !== useLoopRequested.ref()) {
      setLoopNum(nearestStepIndex)
    }
  })

  const handleResetKnobPosition = () => {
    if (!circle.current) return

    const { files } = config[useSongNum.ref()]
    const steps = files.map((_, i) => i / (files.length - 1))
    const angle = steps[useLoopRequested.ref()] * consts.knobRangeDeg - consts.knobRangeDeg / 2

    circle.current.style.transition = '200ms'
    circle.current.style.transform = `rotate(${angle}deg)`
    useRotationDegs.set(angle)
    useOldRotationDegs.set(angle)
  }

  useEffect(() => {
    if (!pointerDown) handleResetKnobPosition()
  }, [pointerDown, loopRequested])

  useWindowEventListeners(currentMousePos)

  return (
    <Div>
      <Circle ref={circle}>
        <img
          src={knobSvg}
          width={consts.knobSize}
          height={consts.knobSize}
          draggable={false}
          alt='Knob'
        />
      </Circle>
      {files.map((_, i) => (
        <LoopIndicator step={i} key={songNum + '-' + i} />
      ))}
      <Svg viewBox='0 0 2 5'>
        <Polygon points='1,0 2,2 0,2' />
        <Polygon points='1,5 0,3 2,3' />
      </Svg>
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
  pointer-events: none;
`

const Circle = styled('div')`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${consts.knobSize}px;
  height: ${consts.knobSize}px;
  cursor: pointer;
`

const Svg = styled('svg')`
  position: fixed;
  width: 12px;
  opacity: 0.3;
`

const Polygon = styled('polygon')`
  fill: white;
  transform: translateY(${p => p.offset}px);
`
