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
      <IconContainer onClick={() => setSong((songNum - 1 + config.length) % config.length)}>
        <Svg viewBox='0 0 2 2' style={{ transform: 'translateX(-1px)' }}>
          <Polygon points='0,1 2,2 2,0' />
        </Svg>
      </IconContainer>
      <SongName>{songName}</SongName>
      <IconContainer onClick={() => setSong((songNum + 1) % config.length)}>
        <Svg viewBox='0 0 2 2' style={{ transform: 'translateX(1px)' }}>
          <Polygon points='2,1 0,2 0,0' />
        </Svg>
      </IconContainer>
    </Div>
  )
}

const Div = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

const SongName = styled('div')`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`

const IconContainer = styled('div')`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  &:hover {
    background-color: #333;
  }
`

const Svg = styled('svg')`
  width: 12px;
  padding: 10px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;
`

const Polygon = styled('polygon')`
  fill: white;
`
