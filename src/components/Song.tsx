import { Play } from '../icons/play'
import { BORDER_RADIUS_LARGE, HIGHLIGHT, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { pointerHelper } from '../lib/pointerHelper'
import { ISong } from '../lib/types'
import { Pause } from '../icons/pause'
import { styled } from 'goober'

const PLAY_ICON_SIZE = 13
export const SONG_HEIGHT = 50

export function Song({
  song,
  index,
  hovering,
  playing,
  pointerenter,
  pointerleave,
  onclick,
}: {
  song: ISong
  index: number
  hovering: boolean
  playing: boolean
  pointerenter: () => void
  pointerleave: () => void
  onclick: () => void
}) {
  return (
    <Container
      {...pointerHelper(pointerenter, pointerleave)}
      onClick={onclick}
      style={{ backgroundColor: playing ? 'black' : null }}
    >
      <NumberOrPlay>
        {hovering || playing ? (
          playing ? (
            <Pause color={TEXT_COLOR} style={{ width: PLAY_ICON_SIZE, height: PLAY_ICON_SIZE }} />
          ) : (
            <Play color={TEXT_COLOR} style={{ width: PLAY_ICON_SIZE, height: PLAY_ICON_SIZE }} />
          )
        ) : (
          <div>{index + 1}.</div>
        )}
      </NumberOrPlay>
      <SongTitle style={{ fontWeight: playing ? '600' : '400' }}>{song.title}</SongTitle>
      <SongLength>{song.length}</SongLength>
    </Container>
  )
}

const Container = styled('div')`
  height: ${SONG_HEIGHT}px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  cursor: pointer;
  transition: ${QUICK_TRANSITION};

  &:hover {
    background-color: ${HIGHLIGHT};
  }
`

const NumberOrPlay = styled('div')`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SongLength = styled('div')`
  margin-left: auto;
`

const SongTitle = styled('div')`
  transition: 1s;
`
