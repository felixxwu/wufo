import { styled } from 'goober'
import { Knob } from './components/Knob.tsx'
import { usePreloadSongs } from './actions/usePreloadSongs.ts'
import { SongPicker } from './components/SongPicker.tsx'
import { PlayPause } from './components/PlayPause.tsx'
import { Background } from './components/Background.tsx'
import { useScreenSize } from './lib/store.ts'
import { StemsBoxes } from './components/StemsBoxes.tsx'

export function App() {
  usePreloadSongs()
  const screenSize = useScreenSize.useState()
  const appHeight = 800
  const scale = screenSize.height / appHeight

  return (
    <Container>
      <Background />
      <Div style={{ scale }}>
        <SongPicker />
        <PlayPause />
        <StemsBoxes />
        <Knob />
      </Div>
      <audio id='silence'>
        <source src='/silence.mp3' type='audio/mp3'></source>
      </audio>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  color: white;
`

const Div = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
