import styled from 'styled-components'
import { colours } from '../../lib/colours'
import { consts } from '../../lib/consts'
import { flex } from '../../lib/flex'
import { Pos } from '../../lib/types'

export function Cell(p: { pos: Pos; sleep: number; onAnimate: () => void }) {
    return (
        <Wrapper
            className='cell'
            style={{
                left: `${p.pos.x}px`,
                top: `${p.pos.y - 2 * consts.background.cellHeight}px`,
                animation: `fade ${consts.background.introFadeTime}ms ${
                    p.sleep === 0
                        ? `, zoom ${consts.background.introZoomTime}ms cubic-bezier(0.9, 0, 0.5, 1)`
                        : ''
                }`,
                animationFillMode: 'forwards',
                animationDelay: `${p.sleep}ms`,
            }}
            onAnimationStart={p.onAnimate}
        >
            WUFO
        </Wrapper>
    )
}

export const Wrapper = styled(flex)`
    color: ${colours.textDark};
    position: absolute;
    width: ${consts.background.cellWidth}px;
    height: ${consts.background.cellHeight}px;
    font-weight: bold;
    font-size: ${consts.background.fontSize}px;
    opacity: 0;
`
