import { styled } from 'goober'
import { useEffect, useRef } from 'react'
import { useSongNum, useTimeUntilNextLoopStart } from '../lib/store.ts'
import { config } from '../lib/config.ts'
import { useLeadInLength } from '../computed/useLeadInLength.ts'

export function Arc() {
  const arc = useRef<HTMLDivElement>(null)
  const leadInLength = useLeadInLength()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!arc.current) return

      const timeLeft = useTimeUntilNextLoopStart.ref().time - leadInLength

      const adjustment = Date.now() - useTimeUntilNextLoopStart.ref().when

      const timeLeftAdjusted = timeLeft - adjustment / 1000

      const loopLength = 32 / (config[useSongNum.ref()].bpm / 60)
      const progress = (1 - timeLeftAdjusted / loopLength) % 1
      arc.current.style.mask = `conic-gradient(#000 ${progress * 360}deg, #0000 0)`
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return <Div ref={arc}></Div>
}

const Div = styled('div')`
  position: absolute;
  aspect-ratio: 1;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 4px solid #bbb;
  animation: rotate 1s linear infinite;
  mask: conic-gradient(#000 0deg, #0000 0);
`
