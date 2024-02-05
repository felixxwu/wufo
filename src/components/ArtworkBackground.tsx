import { background } from '../lib/signals'
import { styled } from '../lib/styled'

export function ArtworkBackground() {
  return (
    <Container>
      <Image src={background} />
    </Container>
  )
}

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
})

const Image = styled('img', {
  width: '100%',
  height: '100%',
  minWidth: '100vh',
  minHeight: '100vw',
  objectFit: 'cover',
  opacity: 0.5,
  filter: 'blur(10px)',
})
