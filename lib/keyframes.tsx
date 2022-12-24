import { keyframes } from 'styled-components'
import { consts } from './consts'

export const fadeInDown = keyframes`
    0% { opacity: 0; scale: 0.9; }
    100% { opacity: 1; scale: 1; }
`

export const BGKeyframes = () => (
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
                    color: ${consts.background.introTextColor};
                }
                100% {
                    scale: 1;
                    color: ${consts.background.textColor};
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
