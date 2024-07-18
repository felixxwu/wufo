import { CSSProperties, useRef } from 'preact/compat'
import { MIN_SCROLL_AMOUNT } from '../lib/consts'

export const DARKEN = 2
const GRAIN_DENSITY = 1500

export function Grain({ styles }: { styles?: CSSProperties }) {
  const SVG = useRef<SVGSVGElement>(null)

  return (
    <svg
      ref={SVG}
      style={{ ...Container, ...styles }}
      viewBox={`0 0 ${GRAIN_DENSITY} ${GRAIN_DENSITY}`}
    >
      <defs>
        <filter id='grain' x='0%' y='0%' height={`${GRAIN_DENSITY}px`} width={`${GRAIN_DENSITY}px`}>
          <feTurbulence type='fractalNoise' result='cloudbase' baseFrequency='0.7' numOctaves='1' />
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
        width={`1300px`}
        height={`1300px`}
      ></rect>
    </svg>
  )
}

const Container: CSSProperties = {
  position: 'fixed',
  top: `-${MIN_SCROLL_AMOUNT / 2}vh`,
  left: `-${MIN_SCROLL_AMOUNT / 2}vw`,
  width: '100%',
  height: '100%',
  minWidth: `${100 + MIN_SCROLL_AMOUNT}vh`,
  minHeight: `${100 + MIN_SCROLL_AMOUNT}vw`,
  zIndex: '-1',
  overflow: 'visible',
}

const GrainStyles: CSSProperties = {
  opacity: '0.25',
}
