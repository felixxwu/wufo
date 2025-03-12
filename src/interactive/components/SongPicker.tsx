import { useSongConfig } from '../computed/useSongConfig.ts'
import { styled } from 'goober'
import { useSetSong } from '../actions/useSetSong.ts'
import { useSongNum } from '../lib/store.ts'
import { config } from '../lib/config.ts'

export function SongPicker() {
  const { songName } = useSongConfig()
  const songNum = useSongNum.useState()
  const setSong = useSetSong()

  return (
    <Div>
      <Svg viewBox='0 0 2 2' onClick={() => setSong(songNum - 1)} active={songNum > 0}>
        <Polygon points='0,1 2,2 2,0' style={{ transform: 'translateX(-0.3px)' }} />
      </Svg>
      <SongName>{songName}</SongName>
      <Svg
        viewBox='0 0 2 2'
        onClick={() => setSong(songNum + 1)}
        active={songNum < config.length - 1}
      >
        <Polygon points='2,1 0,2 0,0' style={{ transform: 'translateX(0.3px)' }} />
      </Svg>
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  top: 30px;
`

const SongName = styled('div')`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
`

const Svg = styled('svg')<{ active: boolean }>`
  width: 12px;
  padding: 10px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;

  opacity: ${p => (p.active ? 1 : 0.5)};
  pointer-events: ${p => (p.active ? 'auto' : 'none')};

  &:hover {
    background-color: #333;
  }
`

const Polygon = styled('polygon')`
  fill: white;
`
