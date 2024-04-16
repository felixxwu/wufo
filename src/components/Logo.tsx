import styled from 'styled-components'
import { TEXT_COLOR } from '../lib/consts'

export const NUM_LOGOS = 20
export const LOGO_ANIMATION_INTERVAL = 0.1
export const LOGO_ANIMATION_DURATION = 1.5

export function Logos() {
  return (
    <Container>
      {[...Array(NUM_LOGOS)].map((_, i) => (
        <Logo style={{ animationDelay: `${0.5 + i * LOGO_ANIMATION_INTERVAL}s` }}>WUFO</Logo>
      ))}
    </Container>
  )
}

const Container = styled.div`
  opacity: 0.5;
  position: absolute;
  height: 0;
  overflow: visible;
`

const Logo = styled.div`
  font-size: 150px;
  margin: -0.75ch 0 0 -50px;
  color: ${TEXT_COLOR};
  font-weight: bold;
  letter-spacing: -0.2ch;
  font-style: italic;
  opacity: 0;
  animation-name: pop-in-out;
  animation-duration: ${LOGO_ANIMATION_DURATION}s;
  animation-fill-mode: forwards;
`
