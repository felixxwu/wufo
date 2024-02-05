import './styles.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect } from 'preact/hooks'
import { BlurryImageLoad } from './lib/blurryLoad'
import { ArtworkBackground } from './components/ArtworkBackground'
import { screenHeight, screenWidth, scrollTop } from './lib/signals'
import { Grain } from './components/Grain'

export function App() {
  useEffect(() => {
    const blurryImageLoad = new BlurryImageLoad()
    blurryImageLoad.load()

    window.onscroll = () => {
      scrollTop.value = window.scrollY
    }

    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth
      screenHeight.value = window.innerHeight
    })
  }, [])

  return (
    <Container>
      <ArtworkBackground />
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
