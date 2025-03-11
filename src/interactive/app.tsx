import { styled } from 'goober'
import { Knob } from './components/Knob.tsx'
import {
  useCurrentLoopPlaying,
  useLoopNum,
  useSongLoaded,
  useSongNum,
  useStarted,
  useTimeUntilNextLoopStart,
} from './lib/store.ts'
import { useStartClock } from './actions/useStartClock.ts'
import { useStop } from './actions/useStop.ts'
import { useLeadInLength } from './computed/useLeadInLength.ts'
import { usePreloadSongs } from './actions/usePreloadSongs.ts'
import { useSetSong } from './actions/useSetSong.ts'
import { useSetLoopNum } from './actions/useSetLoopNum.ts'
import { useSongConfig } from './computed/useSongConfig.ts'

export function App() {
  const { files, songName } = useSongConfig()
  const loopNum = useLoopNum.useState()
  const songNum = useSongNum.useState()
  const songLoaded = useSongLoaded.useState()
  const currentLoopPlaying = useCurrentLoopPlaying.useState()
  const timeUntilNextLoopStart = useTimeUntilNextLoopStart.useState()
  const started = useStarted.useState()

  usePreloadSongs()

  const leadInLength = useLeadInLength()
  const setSong = useSetSong()
  const setLoopNum = useSetLoopNum()
  const startClock = useStartClock()
  const stop = useStop()

  return (
    <Container>
      <div>
        <button onClick={() => setSong(songNum - 1)}>{'<'}</button> {songName}{' '}
        <button onClick={() => setSong(songNum + 1)}>{'>'}</button>
      </div>
      <Knob />
      {!started && <button onClick={startClock}>{songLoaded ? 'START' : 'Loading...'}</button>}
      {started && <button onClick={stop}>STOP</button>}
      <span style={{ color: timeUntilNextLoopStart < leadInLength ? 'red' : 'white' }}>
        Time until next loop start: {Math.round(timeUntilNextLoopStart)}s
      </span>
      <span>Playing loop: {currentLoopPlaying}</span>
      <div>
        <button onClick={() => setLoopNum(loopNum - 1)}>{'<'}</button> Selected loop: {loopNum}{' '}
        <button onClick={() => setLoopNum(loopNum + 1)}>{'>'}</button>
      </div>
      <span>Stems: {files[loopNum].stems.join(', ')}</span>
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
