import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { scrollTop, songPlaying } from '../lib/signals'
import { styled } from '../lib/styled'

export function ArtworkBackground() {
  const screenHeight = window.innerHeight
  const contentHeight = window.document.body.scrollHeight
  const scrollPercentage = scrollTop.value / (contentHeight - screenHeight)
  return (
    <Container>
      <Image
        src={findReleaseFromSong(songPlaying.value)?.background}
        style={{ transform: `translateY(calc(min(0px, ${scrollPercentage} * (100vh - 100vw))))` }}
      />
    </Container>
  )
}

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,

  opacity: '0',
  animationName: 'fade-in',
  animationDuration: '5s',
  animationFillMode: 'forwards',
})

const Image = styled('img', {
  width: '100%',
  height: '100%',
  minWidth: '100vh',
  minHeight: '100vw',
  opacity: 0.2,
})
