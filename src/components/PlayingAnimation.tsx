import { styled } from 'goober'
import { TEXT_COLOR } from '../lib/consts.ts'

export const PLAY_ICON_SIZE = 13

export function PlayingAnimation({ color = TEXT_COLOR }: { color?: string }) {
  return (
    <Bars>
      <Bar color={color} />
      <Bar color={color} />
      <Bar color={color} />
    </Bars>
  )
}

const Bars = styled('div')`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: ${PLAY_ICON_SIZE}px;
  height: ${PLAY_ICON_SIZE}px;
`

const Bar = styled('span')<{ color: string }>`
  width: 3px;
  height: 100%;
  background-color: ${p => p.color};
  border-radius: 3px;
  transform-origin: bottom;
  animation: bounce 1.9s ease-in infinite;
  content: '';

  &:nth-of-type(2) {
    animation: bounce 1.7s ease-in infinite;
  }

  &:nth-of-type(3) {
    animation: bounce 2.3s ease-in infinite;
  }

  @keyframes bounce {
    0% {
      transform: scaleY(0);
    }
    5% {
      transform: scaleY(0.7);
    }
    40% {
      transform: scaleY(0.35);
    }
    45% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }
`
