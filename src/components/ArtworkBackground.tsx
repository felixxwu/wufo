import { useEffect, useState } from 'preact/hooks'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { screenHeight, screenWidth, scrollTop, songPlaying } from '../lib/signals'
import { styled } from '../lib/styled'

const MAX_OPACITY = 0.2
const ANIMATION_DURATION = 1500
const MIN_SCROLL_AMOUNT = 20

export function ArtworkBackground() {
  const [displayedSong, setDisplayedSong] = useState(songPlaying.value)
  const [opacity, setOpacity] = useState(MAX_OPACITY)
  const [imageLoaded, setImageLoaded] = useState(true)
  const realContentHeight = window.document.body.scrollHeight
  const minContentHeight = screenWidth.value * 2
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

  const imageOpacity = imageLoaded ? opacity : 0
  const minTranslate = `${MIN_SCROLL_AMOUNT / 2}vh - (${scrollPercentage * MIN_SCROLL_AMOUNT}vh))`
  const translateY = `calc(min(0px, ${scrollPercentage} * (100vh - 100vw)) + ${minTranslate}`
  const XYDiff = `(${100 + MIN_SCROLL_AMOUNT}vw - ${100 + MIN_SCROLL_AMOUNT}vh)`
  const translateX = `calc(min(0px, 0.5 * ${XYDiff}))`

  return (
    <Container>
      <Image
        src={displayedRelease?.background}
        style={{
          translate: `${translateX} ${translateY}`,
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
  width: `${100 + MIN_SCROLL_AMOUNT}vw`,
  height: `${100 + MIN_SCROLL_AMOUNT}vh`,
  position: 'fixed',
  top: `-${MIN_SCROLL_AMOUNT / 2}vh`,
  left: `-${MIN_SCROLL_AMOUNT / 2}vw`,

  opacity: '0',
  animationName: 'fade-in',
  animationDuration: '5s',
  animationFillMode: 'forwards',
})

const Image = styled('img', {
  width: '100%',
  height: '100%',
  minWidth: `${100 + MIN_SCROLL_AMOUNT}vh`,
  minHeight: `${100 + MIN_SCROLL_AMOUNT}vw`,
  transition: `opacity ${ANIMATION_DURATION}ms, filter ${ANIMATION_DURATION}ms`,
})

const ImagePreload = styled('img', {
  display: 'none',
  position: 'absolute',
})
