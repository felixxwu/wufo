import { useSongConfig } from '../computed/useSongConfig.ts'
import { styled } from 'goober'
import { useSetSong } from '../actions/useSetSong.ts'
import { useSongNum } from '../lib/store.ts'

export function SongPicker() {
  const { songName } = useSongConfig()
  const songNum = useSongNum.useState()
  const setSong = useSetSong()

  return (
    <Div>
      <Svg viewBox='0 0 2 2' onClick={() => setSong(songNum - 1)}>
        <Polygon points='0,1 2,2 2,0' style={{ transform: 'translateX(-0.3px)' }} />
      </Svg>
      <SongName>{songName}</SongName>
      <Svg viewBox='0 0 2 2' onClick={() => setSong(songNum + 1)}>
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

const Svg = styled('svg')`
  width: 12px;
  padding: 10px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

const Polygon = styled('polygon')`
  fill: white;
`
