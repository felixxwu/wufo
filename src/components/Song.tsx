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
import { PLAY_ICON_SIZE, PlayingAnimation } from './PlayingAnimation.tsx'

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
            <PlayingAnimation />
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
