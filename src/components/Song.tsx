import { Play } from '../icons/play'
import { BG_DARK, BORDER_RADIUS_LARGE, HIGHLIGHT, TEXT_COLOR, TRANSITION } from '../lib/consts'
import { pointerHelper } from '../lib/pointerHelper'
import { ISong } from '../lib/types'
import { styled } from 'goober'
import { convertSongLengthToString } from '../lib/convertSongLengthToString'
import {
  playing as playingSignal,
  realPlaybackProgress,
  songLength,
  songPlaying,
} from '../lib/signals'

const PLAY_ICON_SIZE = 13
export const SONG_HEIGHT = 50

export function Song({
  song,
  index,
  hovering,
  pointerenter,
  pointerleave,
  onclick,
}: {
  song: ISong
  index: number
  hovering: boolean
  pointerenter: () => void
  pointerleave: () => void
  onclick: () => void
}) {
  const playing = songPlaying.value.fileName === song.fileName && playingSignal.value

  return (
    <Container
      {...pointerHelper(pointerenter, pointerleave)}
      onClick={onclick}
      style={{ backgroundColor: playing ? BG_DARK : null, color: playing ? 'white' : TEXT_COLOR }}
    >
      <NumberOrPlay>
        {hovering || playing ? (
          playing ? (
            <Bars>
              <Bar />
              <Bar />
              <Bar />
            </Bars>
          ) : (
            <Play color={TEXT_COLOR} style={{ width: PLAY_ICON_SIZE, height: PLAY_ICON_SIZE }} />
          )
        ) : (
          <div>{index + 1}.</div>
        )}
      </NumberOrPlay>
      <SongTitle style={{ fontWeight: playing ? '600' : '400' }}>{song.title}</SongTitle>
      <SongLength style={{ opacity: playing ? 1 : 0.8, color: playing ? 'white' : TEXT_COLOR }}>
        {playing
          ? `${convertSongLengthToString(songLength.value * realPlaybackProgress.value)} / `
          : ''}
        {song.length}
      </SongLength>
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
  transition: ${TRANSITION};

  &:hover {
    background-color: ${HIGHLIGHT};
  }
`

const Bars = styled('div')`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: ${PLAY_ICON_SIZE}px;
  height: ${PLAY_ICON_SIZE}px;
`

const Bar = styled('span')`
  width: 3px;
  height: 100%;
  background-color: ${TEXT_COLOR};
  border-radius: 3px;
  transform-origin: bottom;
  animation: bounce 1.9s ease-in infinite;
  content: '';

  &:nth-of-type(2) {
    animation: bounce 1.7s ease-in infinite;
  }

  &:nth-of-type(3) {
    animation: bounce 2.3s ease-in infinite;
  }

  @keyframes bounce {
    0% {
      transform: scaleY(0);
    }
    5% {
      transform: scaleY(0.7);
    }
    40% {
      transform: scaleY(0.35);
    }
    45% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
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
  transition: ${TRANSITION};
`

const SongTitle = styled('div')`
  transition: 1s;
`
