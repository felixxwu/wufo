import { styled } from 'goober'
import { TEXT_COLOR } from '../lib/consts'
import {
  useLoadedProgress,
  usePlaying,
  useRealPlaybackProgress,
  useSongPlaying,
} from '../lib/signals'
import { PlayPause } from './PlayPause'
import { usePlayerController } from '../lib/usePlayerController'
import { IRelease } from '../lib/types'

export const Slider = ({ release }: { release: IRelease }) => {
  const songPlaying = useSongPlaying.value()
  const playing = usePlaying.value()
  const realPlaybackProgress = useRealPlaybackProgress.value()
  const loadedProgress = useLoadedProgress.value()

  const { play, pause, onSongClick } = usePlayerController()
  const thisReleasePlaying = release.songs.includes(songPlaying)
  const [loaded, progress] = thisReleasePlaying ? [loadedProgress, realPlaybackProgress] : [0, 0]

  return (
    <Wrapper>
      <PlayPauseWrapper
        onClick={() => {
          if (thisReleasePlaying) {
            playing ? pause() : play()
          } else {
            onSongClick(release.songs[0])
          }
        }}
      >
        <PlayPause playing={thisReleasePlaying && playing} size={SLIDER_HEIGHT} />
      </PlayPauseWrapper>

      <SliderWrapper id={release.slug} className={SLIDER_CLASSNAME} onClick={() => {}}>
        <SliderBarBG />
        <SliderBarLoaded style={{ width: `${loaded * 100}%` }} />
        <SliderBarProgress style={{ width: `${progress * 100}%` }} />
        <SliderThumb style={{ left: `${progress * 100}%` }} />
      </SliderWrapper>
    </Wrapper>
  )
}

export const SLIDER_HEIGHT = 30
export const SLIDER_CLASSNAME = 'player-slider'
const THUMB_SIZE = 15
const INNER_SLIDER_HEIGHT = 25
const barPositionFromTop = 12
const THUMB_TOP_OFFSET = 6
const BAR_HEIGHT = 3

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
`

const PlayPauseWrapper = styled('div')`
  cursor: pointer;
`

const SliderWrapper = styled('div')`
  pointer-events: all;
  position: relative;
  width: 100%;
  height: ${INNER_SLIDER_HEIGHT}px;
  cursor: pointer;
`

const SliderThumb = styled('div')`
  position: absolute;
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  background-color: ${TEXT_COLOR};
  border-radius: 50%;
  margin-left: ${-THUMB_SIZE / 2}px;
  margin-top: ${THUMB_TOP_OFFSET}px;
`

const SliderBarProgress = styled('div')`
  margin-top: ${barPositionFromTop}px;
  position: absolute;
  height: ${BAR_HEIGHT}px;
  background-color: ${TEXT_COLOR};
`

const SliderBarLoaded = styled('div')`
  margin-top: ${barPositionFromTop}px;
  position: absolute;
  height: ${BAR_HEIGHT}px;
  background-color: rgba(255, 255, 255, 0.4);
`

const SliderBarBG = styled('div')`
  position: absolute;
  width: 100%;
  margin-top: ${barPositionFromTop}px;
  height: ${BAR_HEIGHT}px;
  background-color: rgba(255, 255, 255, 0.2);
`
