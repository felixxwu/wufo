import { useRef, useState } from 'preact/hooks'
import { TEXT_COLOR } from '../lib/consts'

export function Test() {
  const audio = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [showTest, setShowTest] = useState<boolean>(false)

  if (!showTest) return <span onClick={() => setShowTest(true)}>show test</span>

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <audio
        controls
        ref={audio}
        onLoadedMetadata={() => setDuration(audio.current!.duration)}
        onTimeUpdate={() => setTime(audio.current!.currentTime)}
      >
        <source src='pulse.mp3' type='audio/mp3' />
      </audio>
      <span style={{ color: TEXT_COLOR }}>{duration}</span>
      <span style={{ color: TEXT_COLOR }}>{time}</span>
      <button onClick={() => audio.current?.play()}>play</button>
      <button onClick={() => audio.current?.pause()}>pause</button>
      <button
        onClick={() => {
          audio.current!.currentTime += 10
        }}
      >
        forward
      </button>
    </div>
  )
}
