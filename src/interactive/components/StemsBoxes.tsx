import { styled } from 'goober'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { useCurrentLoopPlaying, useLoopRequested } from '../lib/store.ts'
import { PlayingAnimation } from '../../components/PlayingAnimation.tsx'

export function StemsBoxes() {
  const { files, stemList } = useSongConfig()
  const loopRequested = useLoopRequested.useState()
  const currentLoopPlaying = useCurrentLoopPlaying.useState()

  const requestedStems = files[loopRequested].stems
  const playingStems = files[currentLoopPlaying].stems

  return (
    <Div>
      {stemList.map(stem => (
        <Stem
          key={stem.label}
          playing={playingStems.includes(stem)}
          requested={requestedStems.includes(stem)}
        >
          <LeftIconWrapper playing={playingStems.includes(stem)}>
            <PlayingAnimation />
          </LeftIconWrapper>
          {stem.label}
        </Stem>
      ))}
    </Div>
  )
}

const Div = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  margin-top: 20px;
`

const Stem = styled('div')<{ playing: boolean; requested: boolean }>`
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => (p.playing ? '#333' : '#222')};
  border-radius: 5px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 12px;
  transition: opacity 200ms;
  outline: ${p => (p.requested ? '1px solid #777' : 'none')};
`

const LeftIconWrapper = styled('div')<{ playing: boolean }>`
  position: absolute;
  transform: translateX(-55px);
  opacity: ${p => (p.playing ? 0.5 : 0)};
  transition: 200ms;
`
