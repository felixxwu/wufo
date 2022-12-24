import styled from 'styled-components'
import { colors } from '../../lib/colors'
import { consts } from '../../lib/consts'
import { flex } from '../../lib/flex'
import { Pos } from '../../lib/types'

export function Cell(props: { pos: Pos; sleep: number; onAnimate: () => void }) {
    return (
        <Wrapper
            style={{
                left: `${props.pos.x}px`,
                top: `${props.pos.y - 2 * consts.background.cellHeight}px`,
                animation: `fade ${consts.background.introFadeTime}ms ${
                    props.sleep === 0
                        ? `, zoom ${consts.background.introZoomTime}ms cubic-bezier(0.9, 0, 0.5, 1)`
                        : ''
                }`,
                animationFillMode: 'forwards',
                animationDelay: `${props.sleep}ms`,
            }}
            onAnimationStart={props.onAnimate}
        >
            WUFO
        </Wrapper>
    )
}

export const Wrapper = styled(flex)`
    color: ${colors.textDark};
    position: absolute;
    width: ${consts.background.cellWidth}px;
    height: ${consts.background.cellHeight}px;
    font-weight: 900;
    font-size: ${consts.background.fontSize}px;
    opacity: 0;
`
