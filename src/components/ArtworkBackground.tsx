import { useEffect, useState } from 'preact/hooks'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { screenHeight, screenWidth, scrollTop, songPlaying } from '../lib/signals'
import { styled } from '../lib/styled'

const MAX_OPACITY = 0.25
const ANIMATION_DURATION = 1500

export function ArtworkBackground() {
  const [displayedSong, setDisplayedSong] = useState(songPlaying.value)
  const [opacity, setOpacity] = useState(MAX_OPACITY)
  const [imageLoaded, setImageLoaded] = useState(true)
  const realContentHeight = window.document.body.scrollHeight
  const minContentHeight = screenWidth.value * 1.5
  const contentHeight = Math.max(minContentHeight, realContentHeight)
  const smallContentOffset = Math.max(0, minContentHeight - realContentHeight) / 2
  const scrollBottom = contentHeight - screenHeight.value
  const scrollPercentage = (scrollTop.value + smallContentOffset) / scrollBottom

  const displayedRelease = findReleaseFromSong(displayedSong)
  const playingRelease = findReleaseFromSong(songPlaying.value)

  useEffect(() => {
    setInterval(() => {
      const imageLoaded = (document.getElementById('artwork-background') as HTMLImageElement)
        .complete
      setImageLoaded(imageLoaded)
    }, 1000)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (displayedRelease?.title !== playingRelease?.title) {
        setOpacity(0)
        await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION))
        setDisplayedSong(songPlaying.value)
        setOpacity(MAX_OPACITY)
      }
    })()
  }, [songPlaying.value])

  const imageOpacity = screenWidth.value > screenHeight.value && imageLoaded ? opacity : 0

  return (
    <Container>
      <Image
        src={displayedRelease?.background}
        style={{
          translate: `calc(min(0px, 0.5 * (100vw - 100vh))) calc(min(0px, ${scrollPercentage} * (100vh - 100vw)))`,
          opacity: imageOpacity,
          filter: `blur(${imageOpacity === 0 ? 20 : 0}px)`,
        }}
        alt={songPlaying.value?.title || 'WUFO'}
      />
      <ImagePreload
        id='artwork-background'
        src={playingRelease?.background}
        alt={songPlaying.value?.title || 'WUFO'}
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
  transition: `opacity ${ANIMATION_DURATION}ms, filter ${ANIMATION_DURATION}ms`,
})

const ImagePreload = styled('img', {
  display: 'none',
  position: 'absolute',
})
