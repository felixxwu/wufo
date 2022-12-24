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
