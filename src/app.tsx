import './styles.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect, useState } from 'preact/hooks'
import { BlurryImageLoad } from './lib/blurryLoad'
import { ArtworkBackground } from './components/ArtworkBackground'
import { appElement, screenHeight, screenWidth, scrollTop } from './lib/signals'
import { Grain } from './components/Grain'

export function App() {
  const [showBackground, setShowBackground] = useState(false)
  useEffect(() => {
    setShowBackground(true)

    const blurryImageLoad = new BlurryImageLoad()
    blurryImageLoad.load()

    appElement.value.onscroll = () => {
      scrollTop.value = appElement.value.scrollTop
    }

    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
      screenHeight.value = window.innerHeight
    })
  }, [])

  return (
    <Container>
      {showBackground && <ArtworkBackground />}
      <Grain />
      <UI />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
})
