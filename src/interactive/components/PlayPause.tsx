import { useStarted } from '../lib/store.ts'
import { styled } from 'goober'
import { useStop } from '../actions/useStop.ts'
import { useStartClock } from '../actions/useStartClock.ts'

export function PlayPause() {
  const started = useStarted.useState()
  const startClock = useStartClock()
  const stop = useStop()

  return (
    <Div>
      {started ? (
        <Svg viewBox='0 0 3 3' onClick={stop}>
          <Polygon points='0,0 0,3 1,3 1,0' />
          <Polygon points='2,0 2,3 3,3 3,0' />
        </Svg>
      ) : (
        <Svg viewBox='0 0 2 2' onClick={startClock}>
          <Polygon points='2,1 0,2 0,0' style={{ transform: 'translateX(0.3px)' }} />
        </Svg>
      )}
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  top: 80px;
`

const Svg = styled('svg')`
  width: 15px;
  padding: 10px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

const Polygon = styled('polygon')`
  fill: white;
`
