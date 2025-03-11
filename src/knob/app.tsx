import { styled } from 'goober'
import { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import { useCreatePlayers } from './utils/useCreatePlayers.ts'
import { Knob } from './components/Knob.tsx'
import { refs } from './lib/refs.ts'

export function App() {
  const clockFreqHz = 1

  const [loopNum, setLoopNum] = useState(0)
  const [loopsLoaded, setLoopsLoaded] = useState(false)
  const [currentLoopPlaying, setCurrentLoopPlaying] = useState(loopNum)
  const [timeUntilNextLoopStart, setTimeUntilNextLoopStart] = useState(0)
  const [started, setStarted] = useState(false)

  const players = useCreatePlayers(
    '/knob/lookinhereye',
    [
      { name: 'piano.mp3', instruments: ['piano'] },
      { name: 'piano-voc2.mp3', instruments: ['piano', 'vocal'] },
      { name: 'drums-piano.mp3', instruments: ['drums', 'piano'] },
      {
        name: 'drums-piano-sax-chords-bells-voc.mp3',
        instruments: ['drums', 'piano', 'sax', 'chords', 'vocal'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells.mp3',
        instruments: ['drums', 'piano', 'bass', 'sax', 'chords'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc.mp3',
        instruments: ['drums', 'piano', 'bass', 'sax', 'chords', 'vocal'],
      },
      {
        name: 'drums-piano-bass-sax-chords-bells-voc2.mp3',
        instruments: ['drums', 'piano', 'bass', 'sax', 'chords', 'vocal (alt.)'],
      },
    ],
    172
  )

  useEffect(() => {
    players.preLoadAll().then(() => {
      setLoopsLoaded(true)
    })
  }, [])

  const clock = useRef<Tone.Clock>(null)

  useEffect(() => {
    refs.loopNum = loopNum
  }, [loopNum])

  const handleStart = async () => {
    if (!loopsLoaded) return

    setStarted(true)
    clock.current = new Tone.Clock(time => {
      const offset = players.loopLength - players.leadInLength - 0.2
      const timeLeftUntilNextLoop = players.loopLength - ((time + offset) % players.loopLength)
      setTimeUntilNextLoopStart(timeLeftUntilNextLoop)

      const timeUntilLoopStartDisabled = timeLeftUntilNextLoop - players.leadInLength
      if (timeUntilLoopStartDisabled <= 1 / clockFreqHz && timeUntilLoopStartDisabled > 0) {
        players.play(refs.loopNum, time + timeLeftUntilNextLoop - players.leadInLength)
        setCurrentLoopPlaying(refs.loopNum)
      }
    }, clockFreqHz).start()
  }

  const handleLoopIncrease = () => {
    setLoopNum(num => Math.min(num + 1, players.numLoops - 1))
  }

  const handleLoopDecrease = () => {
    setLoopNum(num => Math.max(num - 1, 0))
  }

  const handleStop = () => {
    players.stop()
    setStarted(false)
    clock.current?.stop()
    clock.current?.dispose()
  }

  return (
    <Container>
      <Knob />
      {!started && <button onClick={handleStart}>{loopsLoaded ? 'START' : 'Loading...'}</button>}
      {started && <button onClick={handleStop}>STOP</button>}
      <span style={{ color: timeUntilNextLoopStart < players.leadInLength ? 'red' : 'white' }}>
        Time until next loop start: {Math.round(timeUntilNextLoopStart)}s
      </span>
      <span>Playing loop: {currentLoopPlaying}</span>
      <div>
        <button onClick={handleLoopDecrease}>{'<'}</button> Selected loop: {loopNum}{' '}
        <button onClick={handleLoopIncrease}>{'>'}</button>
      </div>
      <span>Stems: {players.getInstruments(loopNum).join(', ')}</span>
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
