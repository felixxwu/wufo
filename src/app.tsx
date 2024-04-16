import './styles.css'
import './keyframes.css'
import './fonts.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect, useState } from 'preact/hooks'
import { ArtworkBackground } from './components/ArtworkBackground'
import { appElement, screenHeight, screenWidth, scrollTop } from './lib/signals'

export function App() {
  const [showBackground, setShowBackground] = useState(false)
  useEffect(() => {
    setShowBackground(true)

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
