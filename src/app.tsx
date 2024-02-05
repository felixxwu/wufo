import './styles.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect } from 'preact/hooks'
import { BlurryImageLoad } from './lib/blurryLoad'
import { ArtworkBackground } from './components/ArtworkBackground'
import { scrollTop } from './lib/signals'
import { Grain } from './components/Grain'

export function App() {
  useEffect(() => {
    const blurryImageLoad = new BlurryImageLoad()
    blurryImageLoad.load()

    window.onscroll = () => {
      console.log('scroll')
      scrollTop.value = window.scrollY
    }
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
