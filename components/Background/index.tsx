import { useEffect, useRef, useState } from 'react'
import { range } from '../../lib/array'
import { consts } from '../../lib/consts'
import { debounce } from '../../lib/debounce'
import { isPointInside } from '../../lib/isPointInside'
import { BGKeyframes } from '../../lib/keyframes'
import { rotate } from '../../lib/rotate'
import { Pos } from '../../lib/types'
import { Cell } from './Cell'
import { Wrapper, CellWrapper, Cells, NoiseWrapper } from './styles'
import { SvgFilter } from './SvgFilter'
import { Noise } from './noise'

export function Background(props: { onLoad: () => void }) {
    const [size, setSize] = useState({ w: 0, h: 0 })
    const [timing, setTiming] = useState({ start: 0, end: 0 })
    const [debugCount, setDebugCount] = useState(0)
    const deviceIsTooSlow = timing.end - timing.start > consts.performanceCutoff
    const setSizeDebounced = useRef(debounce(setSize, 500))
    const wrapper = useRef<HTMLDivElement>(null)
    const numAnimationsStarted = useRef(0)

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.clientY < 30) setDebugCount(x => x + 1)
        }
        window.addEventListener('click', onClick)
        return () => {
            window.removeEventListener('click', onClick)
        }
    }, [])

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
        setTiming({ ...timing, start: new Date().getTime() })
    }, [])

    const cellPositions = (() => {
        const positions: { pos: Pos; rotated: Pos }[] = []
        const numVCells = Math.ceil(size.h / consts.background.cellHeight)
        const numHCells = Math.ceil(size.w / consts.background.cellWidth)
        if (numVCells === 0 || numHCells === 0) return []
        range(-consts.background.overflow, numVCells + consts.background.overflow, j =>
            range(-consts.background.overflow, numHCells + consts.background.overflow, i => {
                const pos = {
                    x: Math.round(
                        i * consts.background.cellWidth +
                            ((j % consts.background.stagger) * consts.background.cellWidth) /
                                consts.background.stagger
                    ),
                    y: Math.round(j * consts.background.cellHeight),
                }
                const rotated = rotate(pos, -consts.background.angle, {
                    x: size.w / 2,
                    y: size.h / 2,
                })
                positions.push({ pos, rotated })
            })
        )
        return positions
    })()

    const filteredPositions = cellPositions.filter(cell =>
        isPointInside(cell.rotated, size, {
            w: consts.background.cellWidth,
            h: consts.background.cellHeight,
        })
    )

    function calculateDistFromCentre(pos: Pos) {
        return Math.sqrt(Math.pow(pos.x - size.w / 2, 2) + Math.pow(pos.y - size.h / 2, 2))
    }

    function getSleepTime(pos: Pos) {
        return isCentreCell(pos)
            ? 0
            : calculateDistFromCentre(pos) / consts.background.introAnimationSpeed +
                  consts.background.introAnimationDelay
    }

    const closestPointToCentre = (() => {
        let closest = cellPositions[0]?.pos
        let minDist = Infinity
        cellPositions.forEach(({ pos }) => {
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

    function handleAnimationStart() {
        numAnimationsStarted.current++
        if (
            numAnimationsStarted.current >
            filteredPositions.length * consts.background.onLoadCutoff
        ) {
            props.onLoad()
        }
        if (timing.end === 0) {
            setTiming({ ...timing, end: new Date().getTime() })
        }
    }

    return (
        <Wrapper ref={wrapper}>
            <SvgFilter
                noiseAmp={consts.background.noiseAmp}
                noiseFrequency={consts.background.noiseFrequency}
                noiseOctave={consts.background.noiseOctave}
                seed={consts.background.seed}
            />

            <CellWrapper style={deviceIsTooSlow ? { filter: 'none' } : {}}>
                <Cells style={deviceIsTooSlow ? { animation: 'none' } : {}}>
                    {filteredPositions.map(({ pos }) => (
                        <Cell
                            onAnimate={handleAnimationStart}
                            pos={pos}
                            sleep={getSleepTime(pos)}
                            key={`${pos.x} ${pos.y}`}
                        />
                    ))}
                </Cells>
            </CellWrapper>
            <BGKeyframes />
            <NoiseWrapper>
                <Noise />
            </NoiseWrapper>
            {debugCount > 20 && (
                <div style={{ position: 'fixed', top: 0 }}>{timing.end - timing.start}</div>
            )}
        </Wrapper>
    )
}
