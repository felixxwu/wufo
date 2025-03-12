import { styled } from 'goober'
import { config } from '../lib/config.ts'
import { useCurrentLoopPlaying, useLoopRequested, useSongNum, useStarted } from '../lib/store.ts'
import { consts } from '../lib/consts.ts'
import { Arc } from './Arc.tsx'
import { useSetLoopNum } from '../actions/useSetLoopNum.ts'

export function LoopIndicator({ step }: { step: number }) {
  const setLoopNum = useSetLoopNum()
  const loopRequested = useLoopRequested.useState()
  const loopPlaying = useCurrentLoopPlaying.useState()
  const started = useStarted.useState()
  const { files } = config[useSongNum.ref()]
  const steps = files.map((_, i) => i / (files.length - 1))
  const angle = steps[step] * consts.knobRangeDeg - consts.knobRangeDeg / 2
  const distance = 270

  const x = distance * Math.cos((angle - 90) * (Math.PI / 180))
  const y = distance * Math.sin((angle - 90) * (Math.PI / 180))

  const handleClick = () => {
    console.log(`setLoopNum`, setLoopNum)
    setLoopNum(step)
  }

  const playing = loopPlaying === step
  const showArc = started && loopPlaying !== step && loopRequested === step
  const fileName = files[step].name
  const size = (() => {
    if (fileName === null) return 10
    if (playing) return 25
    return 20
  })()
  const color = (() => {
    if (fileName === null) return '#a22'
    if (showArc) return 'transparent'
    if (playing) return '#ccc'
    return '#666'
  })()

  return (
    <Div x={x} y={y} size={size} color={color} onClick={handleClick}>
      {showArc && <Arc />}
    </Div>
  )
}

const Div = styled('div')<{ x: number; y: number; size: number; color: string }>`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  background-color: ${p => p.color};
  transition: 200ms;
  margin-left: ${p => p.x}px;
  margin-top: ${p => p.y}px;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
`
