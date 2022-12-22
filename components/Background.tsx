import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { range } from '../lib/array'
import { colours } from '../lib/colours'
import { debounce } from '../lib/debounce'
import { flex } from '../lib/flex'

const config = {
    cellWidth: 120,
    cellHeight: 36,
    fontSize: 35,
    noiseFrequency: 0.0015,
    noiseAmp: 500,
    noiseOctave: 1,
    animationInterval: 10,
    zoom: 0.85,
    angle: 10,
    stagger: 3,
    introAnimationSpeed: 0.5,
    introAnimationDelay: 1500,
    introFadeTime: 800,
    seed: 3,
    overflow: 0.5,
}

interface Pos {
    x: number
    y: number
}

export function Background() {
    const [size, setSize] = useState({ w: 0, h: 0 })
    const setSizeDebounced = useRef(debounce(setSize, 1000))
    const wrapper = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onresize = () => {
            if (!wrapper.current) return
            setSizeDebounced.current({
                w: wrapper.current.clientWidth,
                h: wrapper.current.clientHeight,
            })
        }
        window.onresize = onresize
        onresize()
    }, [])

    const cellPositions = (() => {
        const positions: Pos[] = []
        const numVCells = Math.ceil(size.h / config.cellHeight)
        const numHCells = Math.ceil(size.w / config.cellWidth)
        range(-numVCells * config.overflow, numVCells * (1 + config.overflow), j =>
            range(-numHCells * config.overflow, numHCells * (1 + config.overflow), i => {
                positions.push({
                    x: Math.round(
                        i * config.cellWidth +
                            ((j % config.stagger) * config.cellWidth) / config.stagger
                    ),
                    y: Math.round(j * config.cellHeight),
                })
            })
        )
        return positions
    })()

    function calculateDistFromCentre(pos: Pos) {
        return Math.sqrt(Math.pow(pos.x - size.w / 2, 2) + Math.pow(pos.y - size.h / 2, 2))
    }

    function getSleepTime(pos: Pos) {
        return isCentreCell(pos)
            ? 0
            : calculateDistFromCentre(pos) / config.introAnimationSpeed + config.introAnimationDelay
    }

    const closestPointToCentre = (() => {
        let closest = cellPositions[0]
        let minDist = Infinity
        cellPositions.forEach(pos => {
            const dist = calculateDistFromCentre(pos)
            if (dist < minDist) {
                closest = pos
                minDist = dist
            }
        })
        return closest
    })()

    function isCentreCell(pos: Pos) {
        return pos.x === closestPointToCentre.x && pos.y === closestPointToCentre.y
    }

    return (
        <Wrapper ref={wrapper}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                style={{ position: 'absolute', display: 'hidden' }}
            >
                <defs>
                    <filter id='filter'>
                        <feTurbulence
                            type='fractalNoise'
                            baseFrequency={config.noiseFrequency}
                            numOctaves={config.noiseOctave}
                            result='warp'
                            seed={config.seed}
                        ></feTurbulence>
                        <feDisplacementMap scale={config.noiseAmp} in='SourceGraphic' in2='warp' />
                    </filter>
                </defs>
            </svg>

            <ZoomIntro>
                <CellWrapper>
                    <Cells>
                        {cellPositions.map(({ x, y }) => (
                            <Cell x={x} y={y} sleep={getSleepTime({ x, y })} key={`${x}${y}`}>
                                WUFO
                            </Cell>
                        ))}
                    </Cells>
                </CellWrapper>
            </ZoomIntro>
        </Wrapper>
    )
}

const zoom = keyframes`
    0% {
        scale: 2;
    }
    100% {
        scale: 1;
    }
`

const Wrapper = styled('div')`
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const ZoomIntro = styled('div')`
    scale: 2;
    animation: ${zoom} 1s cubic-bezier(0.75, 0, 0.25, 1);
    animation-fill-mode: forwards;
    animation-delay: ${config.introAnimationDelay}ms;
`

const CellWrapper = styled('div')`
    rotate: -${config.angle}deg;
    scale: ${config.zoom};
    filter: url('#filter');
`

const move = keyframes`
    0% {
        translate: -${config.cellWidth / 2}px  0 ;
    }
    100% {
        translate: ${config.cellWidth / 2}px 0 ;
    }
`

const Cells = styled(flex)`
    width: 100vw;
    height: 100vh;
    transform-origin: 50% 50%;
    animation: ${move} ${config.animationInterval}s infinite linear;
`

const fade = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const Cell = styled(flex)<{ x: number; y: number; sleep: number }>`
    color: ${colours.textDark};
    position: absolute;
    width: ${config.cellWidth}px;
    height: ${config.cellHeight}px;
    font-weight: bold;
    font-size: ${config.fontSize}px;
    left: ${({ x }) => x - config.cellWidth / 2}px;
    opacity: 0;
    top: ${({ y }) => y - config.cellHeight}px;
    animation: ${fade} ${config.introFadeTime}ms;
    animation-delay: ${({ sleep }) => sleep}ms;
    animation-fill-mode: forwards;
`
