import { CSSProperties, useEffect, useRef, useState } from 'preact/compat'
import { Color } from '../lib/types'
import { isMobile } from '../lib/isMobile'

export const DARKEN = 1.5

const seed = Math.random() * 100

export function Background({ color }: { color: Color }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const SVG = useRef<SVGSVGElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setHeight(document.body.clientHeight + 100)
    }, 200)
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(document.body.clientHeight + 100)
    })
    SVG.current!.animate([{ opacity: '0' }, { opacity: '1' }], { fill: 'forwards', duration: 1000 })
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
        <filter
          id='heavycloud'
          color-interpolation-filters='sRGB'
          x='0%'
          y='0%'
          height='100%'
          width='100%'
        >
          <feTurbulence
            type='fractalNoise'
            result='cloudbase'
            baseFrequency='0.002'
            numOctaves='2'
            seed={seed}
          />
          <feColorMatrix in='cloudbase' type='hueRotate' values='0' result='cloud'>
            {isMobile() ? null : (
              <animate attributeName='values' from='0' to='360' dur='5s' repeatCount='indefinite' />
            )}
          </feColorMatrix>
          <feColorMatrix
            in='cloud'
            result='wispy'
            type='matrix'
            values={`0.1 0   0   0 ${color[0] / 255 / DARKEN}
                     0   0.1 0   0 ${color[1] / 255 / DARKEN}
                     0   0   0.1 0 ${color[2] / 255 / DARKEN}
                     1   0   0   0 0`}
          ></feColorMatrix>
          <feGaussianBlur stdDeviation='6' />
        </filter>
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
      <rect fill='black' width={`${width}`} height={`${height}`}></rect>
      <rect filter='url(#heavycloud)' width={`${width}`} height={`${height}`}></rect>
      <rect
        style={Grain}
        fill='white'
        filter='url(#grain)'
        width={`${width}`}
        height={`${height}`}
      ></rect>
    </svg>
  )
}

const Container: CSSProperties = {
  position: 'absolute',
  zIndex: '-1',
  opacity: '0',
}

const Grain: CSSProperties = {
  opacity: '0.15',
}
