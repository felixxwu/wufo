import { useEffect, useState } from 'react'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import {
  useAppElement,
  useScreenHeight,
  useScreenWidth,
  useScrollTop,
  useSongPlaying,
} from '../lib/signals'
import { Grain } from './Grain'
import { MIN_SCROLL_AMOUNT } from '../lib/consts'
import { styled } from 'goober'

const MAX_OPACITY = 0.15
const ANIMATION_DURATION = 1500

export function ArtworkBackground() {
  const songPlaying = useSongPlaying.useState()
  const screenWidth = useScreenWidth.useState()
  const scrollTop = useScrollTop.useState()
  const appElement = useAppElement.useState()
  const screenHeight = useScreenHeight.useState()

  const [displayedSong, setDisplayedSong] = useState(songPlaying)
  const [opacity, setOpacity] = useState(MAX_OPACITY)
  const [imageLoaded, setImageLoaded] = useState(true)

  const realContentHeight = appElement.scrollHeight
  const minContentHeight = screenWidth * 2
  const contentHeight = Math.max(minContentHeight, realContentHeight)
  const smallContentOffset = Math.max(0, minContentHeight - realContentHeight) / 2
  const scrollBottom = contentHeight - screenHeight
  const scrollPercentage = (scrollTop + smallContentOffset) / scrollBottom

  const displayedRelease = findReleaseFromSong(displayedSong)
  const playingRelease = findReleaseFromSong(songPlaying)

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
        setDisplayedSong(songPlaying)
        setOpacity(MAX_OPACITY)
      }
    })()
  }, [songPlaying])

  const imageOpacity = imageLoaded ? opacity : 0
  const minTranslate = `${MIN_SCROLL_AMOUNT / 2}vh - (${scrollPercentage * MIN_SCROLL_AMOUNT}vh)`
  const translateY = `calc(min(0px, ${scrollPercentage} * (100vh - 100vw)) + ${minTranslate})`
  const XYDiff = `(${100 + MIN_SCROLL_AMOUNT}vw - ${100 + MIN_SCROLL_AMOUNT}vh)`
  const translateX = `calc(min(0px, 0.5 * ${XYDiff}))`

  return (
    <Container>
      <Image
        src={displayedRelease?.cover}
        alt={songPlaying?.title || 'WUFO'}
        style={{
          translate: `${translateX} ${translateY}`,
          opacity: imageOpacity,
          // filter: `blur(${imageOpacity === 0 ? 20 : 0}px)`,
          // filter: `blur(50px)`,
        }}
      />
      <Grain
        styles={{
          translate: `${translateX} ${translateY}`,
        }}
      />
      <ImagePreload
        id='artwork-background'
        src={playingRelease?.background}
        alt={songPlaying?.title || 'WUFO'}
      />
    </Container>
  )
}

const Container = styled('div')`
  position: fixed;
  width: ${100 + MIN_SCROLL_AMOUNT}vw;
  height: ${100 + MIN_SCROLL_AMOUNT}vh;
  top: -${MIN_SCROLL_AMOUNT / 2}vh;
  left: -${MIN_SCROLL_AMOUNT / 2}vw;
  pointer-events: none;
  opacity: 0;
  animation-name: fade-in;
  animation-duration: 5s;
  animation-fill-mode: forwards;
`

const Image = styled('img')`
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: ${100 + MIN_SCROLL_AMOUNT}vh;
  min-height: ${100 + MIN_SCROLL_AMOUNT}vw;
  transition:
    opacity ${ANIMATION_DURATION}ms,
    filter ${ANIMATION_DURATION}ms,
    translate 20ms;
`

const ImagePreload = styled('img')`
  display: none;
  position: absolute;
`
