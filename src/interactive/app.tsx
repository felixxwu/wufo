import { styled } from 'goober'
import * as Tone from 'tone'
import { usePlayer } from './utils/usePlayer.ts'
import { Knob } from './components/Knob.tsx'
import { config } from './lib/config.ts'
import {
  useClock,
  useCurrentLoopPlaying,
  useLoopNum,
  useSongLoaded,
  useSongNum,
  useStarted,
  useTimeUntilNextLoopStart,
} from './lib/store.ts'

export function App() {
  const clockFreqHz = 1

  const loopNum = useLoopNum.value()
  const songNum = useSongNum.value()
  const songLoaded = useSongLoaded.value()
  const currentLoopPlaying = useCurrentLoopPlaying.value()
  const timeUntilNextLoopStart = useTimeUntilNextLoopStart.value()
  const started = useStarted.value()

  const player = usePlayer()

  const handleStart = async () => {
    if (!songLoaded) return

    useStarted.set(true)
    useClock.set(
      new Tone.Clock(time => {
        const offset = player.loopLength - player.leadInLength - 0.2
        const timeLeftUntilNextLoop = player.loopLength - ((time + offset) % player.loopLength)
        useTimeUntilNextLoopStart.set(timeLeftUntilNextLoop)

        const timeUntilLoopStartDisabled = timeLeftUntilNextLoop - player.leadInLength
        if (timeUntilLoopStartDisabled <= 1 / clockFreqHz && timeUntilLoopStartDisabled > 0) {
          player.play(useLoopNum.localValue(), time + timeLeftUntilNextLoop - player.leadInLength)
        }
      }, clockFreqHz).start()
    )
  }

  const handleStop = () => {
    player.stop()
    useClock.localValue()?.stop()
    useClock.localValue()?.dispose()
  }

  const handleChangeLoop = (diff: number) => {
    useLoopNum.set(num => Math.max(Math.min(num - diff, player.numLoops - 1), 0))
  }

  const handleChangeSong = (diff: number) => {
    if (songNum - diff < 0 || songNum - diff >= config.length) return

    useLoopNum.set(1)
    useSongNum.set(num => num - diff)
    handleStop()
  }

  return (
    <Container>
      <div>
        <button onClick={() => handleChangeSong(1)}>{'<'}</button> {player.songName}{' '}
        <button onClick={() => handleChangeSong(-1)}>{'>'}</button>
      </div>
      <Knob />
      {!started && <button onClick={handleStart}>{songLoaded ? 'START' : 'Loading...'}</button>}
      {started && <button onClick={handleStop}>STOP</button>}
      <span style={{ color: timeUntilNextLoopStart < player.leadInLength ? 'red' : 'white' }}>
        Time until next loop start: {Math.round(timeUntilNextLoopStart)}s
      </span>
      <span>Playing loop: {currentLoopPlaying}</span>
      <div>
        <button onClick={() => handleChangeLoop(1)}>{'<'}</button> Selected loop: {loopNum}{' '}
        <button onClick={() => handleChangeLoop(-1)}>{'>'}</button>
      </div>
      <span>Stems: {player.getInstruments(loopNum).join(', ')}</span>
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
