import { styled } from 'goober'
import { Knob } from './components/Knob.tsx'
import { useSongLoaded, useSongNum, useStarted } from './lib/store.ts'
import { useStartClock } from './actions/useStartClock.ts'
import { useStop } from './actions/useStop.ts'
import { usePreloadSongs } from './actions/usePreloadSongs.ts'
import { useSetSong } from './actions/useSetSong.ts'
import { useSongConfig } from './computed/useSongConfig.ts'
import { Stems } from './components/Stems.tsx'

export function App() {
  const { songName } = useSongConfig()
  const songNum = useSongNum.useState()
  const songLoaded = useSongLoaded.useState()
  const started = useStarted.useState()

  usePreloadSongs()

  const setSong = useSetSong()
  const startClock = useStartClock()
  const stop = useStop()

  return (
    <Container>
      <Knob />
      <div>
        <button onClick={() => setSong(songNum - 1)}>{'<'}</button> {songName}{' '}
        <button onClick={() => setSong(songNum + 1)}>{'>'}</button>
      </div>
      {!started && <button onClick={startClock}>{songLoaded ? 'START' : 'Loading...'}</button>}
      {started && <button onClick={stop}>STOP</button>}
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
  justify-content: center;
  color: white;
  gap: 20px;
`
