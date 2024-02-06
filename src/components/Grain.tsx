import { CSSProperties, useRef } from 'preact/compat'
import { screenHeight, screenWidth } from '../lib/signals'

export const DARKEN = 1.5

export function Grain() {
  const SVG = useRef<SVGSVGElement>(null)

  return (
    <svg
      ref={SVG}
      style={Container}
      width={`${screenWidth.value}px`}
      height={`${screenHeight.value}px`}
      viewBox={`0 0 ${screenWidth.value} ${screenHeight.value}`}
    >
      <defs>
        <filter id='grain' x='0%' y='0%' height='150%' width='100%'>
          <feTurbulence
            type='fractalNoise'
            result='cloudbase'
            baseFrequency='0.7'
            numOctaves='1'
            seed='24'
          />
          <feColorMatrix
            in='cloud'
            result='wispy'
            type='matrix'
            values='0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    1 0 0 0 0'
          />
        </filter>
      </defs>
      <rect
        style={GrainStyles}
        fill='white'
        filter='url(#grain)'
        width={`${screenWidth.value}`}
        height={`${screenHeight.value}`}
      ></rect>
    </svg>
  )
}

const Container: CSSProperties = {
  position: 'fixed',
  top: '0',
  zIndex: '-1',
  overflow: 'visible',
}

const GrainStyles: CSSProperties = {
  opacity: '0.25',
}
