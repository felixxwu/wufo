import { CSSProperties, useEffect, useRef, useState } from 'preact/compat'

export const DARKEN = 1.5

export function Grain() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const SVG = useRef<SVGSVGElement>(null)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })
  }, [])

  return (
    <svg
      ref={SVG}
      style={Container}
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id='grain' x='0%' y='0%' height='100%' width='100%'>
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
        width={`${width}`}
        height={`${height}`}
      ></rect>
    </svg>
  )
}

const Container: CSSProperties = {
  position: 'fixed',
  top: '0',
  zIndex: '-1',
  // height: 0,
  overflow: 'visible',
  // opacity: '0.8',
  // animationName: 'fade-in',
  // animationDuration: '5s',
  // animationFillMode: 'forwards',
}

const GrainStyles: CSSProperties = {
  opacity: '0.25',
}
