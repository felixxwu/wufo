import './styles.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect } from 'preact/hooks'
import { BlurryImageLoad } from './lib/blurryLoad'
import { Logos2 } from './components/Logo2'
import { sleep } from './lib/sleep'
import { UI_FADE_IN_DELAY } from './lib/consts'
import { singleSongMode } from './lib/singleSongMode'
// import { ArtworkBackground } from './components/ArtworkBackground'

export function App() {
  useEffect(() => {
    const blurryImageLoad = new BlurryImageLoad()
    blurryImageLoad.load()

    document.body.parentElement!.style.overflowY = 'hidden'
    sleep(singleSongMode() ? 0 : UI_FADE_IN_DELAY * 1000).then(() => {
      document.body.parentElement!.style.overflowY = 'auto'
    })
  }, [])

  return (
    <Container>
      {/* <ArtworkBackground /> */}
      {!singleSongMode() && <Logos2 />}
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
