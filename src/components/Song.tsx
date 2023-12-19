import { css } from '@emotion/css'
import { Play } from '../icons/play'
import { BORDER_RADIUS, HIGHLIGHT, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { pointerHelper } from '../lib/pointerHelper'
import { styled } from '../lib/styled'
import { ISong } from '../lib/types'
import { Pause } from '../icons/pause'

const PLAY_ICON_SIZE = 13

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
      onclick={onclick}
      style={{ backgroundColor: playing ? HIGHLIGHT : null }}
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
      <div>{song.title}</div>
      <SongLength>{song.length}</SongLength>
    </Container>
  )
}

const Container = styled(
  'div',
  {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '0 20px',
    borderRadius: `${BORDER_RADIUS}px`,
    cursor: 'pointer',
    transition: QUICK_TRANSITION,
  },
  css`
    &:hover {
      background-color: ${HIGHLIGHT};
    }
  `
)

const NumberOrPlay = styled('div', {
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const SongLength = styled('div', {
  marginLeft: 'auto',
})
