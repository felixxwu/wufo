import styled from 'styled-components'
import { consts } from '../../lib/consts'
import { flex } from '../../lib/flex'

export const Wrapper = styled('div')`
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`
export const CellWrapper = styled('div')`
    rotate: -${consts.background.angle}deg;
    filter: url('#filter');
`
export const Cells = styled(flex)`
    width: 100vw;
    height: 100vh;
    transform-origin: 50% 50%;
    animation: move ${consts.background.animationInterval}s infinite linear;
`

export const Keyframes = () => (
    <style jsx>
        {`
            @keyframes move {
                0% {
                    translate: -${consts.background.shiftLeft}px 0;
                }
                100% {
                    translate: ${consts.background.cellWidth - consts.background.shiftLeft}px 0;
                }
            }
            @keyframes fade {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            @keyframes zoom {
                0% {
                    scale: ${consts.background.introZoomAmount};
                    color: ${consts.background.introTextColour};
                }
                100% {
                    scale: 1;
                    color: ${consts.background.textColour};
                }
            }
            @keyframes move {
                0% {
                    translate: -${consts.background.shiftLeft}px 0;
                }
                100% {
                    translate: ${consts.background.cellWidth - consts.background.shiftLeft}px 0;
                }
            }
        `}
    </style>
)
