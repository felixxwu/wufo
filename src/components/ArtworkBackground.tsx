import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { screenHeight, screenWidth, scrollTop, songPlaying } from '../lib/signals'
import { styled } from '../lib/styled'

export function ArtworkBackground() {
  const contentHeight = window.document.body.scrollHeight
  const scrollPercentage = scrollTop.value / (contentHeight - screenHeight.value)
  return (
    <Container>
      <Image
        src={findReleaseFromSong(songPlaying.value)?.background}
        style={{
          translate: `calc(min(0px, 0.5 * (100vw - 100vh))) calc(min(0px, ${scrollPercentage} * (100vh - 100vw)))`,
          opacity: screenWidth.value > screenHeight.value ? 0.25 : 0,
        }}
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
  transition: 'opacity 0.5s',
})
