import { styled } from 'goober'
import { Knob } from './components/Knob.tsx'
import { usePreloadSongs } from './actions/usePreloadSongs.ts'
import { Stems } from './components/Stems.tsx'
import { SongPicker } from './components/SongPicker.tsx'
import { PlayPause } from './components/PlayPause.tsx'
import { Background } from './components/Background.tsx'

export function App() {
  usePreloadSongs()

  return (
    <Container>
      <Background />
      <SongPicker />
      <PlayPause />
      <Stems />
      <Knob />
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
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  justify-content: center;
  color: white;
  gap: 10px;
`
