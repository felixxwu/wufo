import './keyframes.css'
import { UI } from './components/UI'
import { useEffect, useState } from 'react'
import { ArtworkBackground } from './components/ArtworkBackground'
import { useAppElement, useScreenHeight, useScreenWidth, useScrollTop } from './lib/signals'
import { styled } from 'goober'

export function App() {
  const appElement = useAppElement.useState()
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    setShowBackground(true)

    appElement.onscroll = () => {
      useScrollTop.set(appElement.scrollTop)
    }

    window.addEventListener('resize', () => {
      useScreenWidth.set(window.innerWidth)
      useScreenHeight.set(window.innerHeight)
    })
  }, [])

  return (
    <Container>
      {showBackground && <ArtworkBackground />}
      <UI />
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`
