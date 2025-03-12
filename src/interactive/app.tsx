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
      <Knob />
      <PlayPause />
      <Stems />
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  justify-content: flex-start;
  padding-top: 90px;
  color: white;
  gap: 20px;
`
