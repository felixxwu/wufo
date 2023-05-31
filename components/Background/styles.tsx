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
    translate: -70px 0;
    filter: url('#filter');
`
export const Cells = styled(flex)`
    width: 100vw;
    height: 100vh;
    transform-origin: 50% 50%;
    animation: move ${consts.background.animationInterval}s infinite linear;
`

export const NoiseWrapper = styled('div')`
    position: absolute;
    top: 0;
    opacity: 0.3;
    width: 2000px;
    min-width: 100vw;
    min-height: 100vh;
`
