import { TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'

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

const Container = styled('div', {
  opacity: '0.5',
  position: 'absolute',
  height: '0',
  overflow: 'visible',
})

const Logo = styled('div', {
  fontSize: '150px',
  margin: '-0.75ch 0 0 -50px',
  color: TEXT_COLOR,
  fontWeight: 'bold',
  letterSpacing: '-0.2ch',
  fontStyle: 'italic',
  opacity: '0',
  animationName: 'pop-in-out',
  animationDuration: `${LOGO_ANIMATION_DURATION}s`,
  animationFillMode: 'forwards',
})
