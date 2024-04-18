import { styled } from 'goober'
import { PauseRound } from '../icons/pauseRound'
import { PlayRound } from '../icons/playRound'
import { TEXT_COLOR } from '../lib/consts'

export function PlayPause({ playing, size }: { playing: boolean; size: number }) {
  return (
    <Container>
      {playing ? (
        <PauseRound color={TEXT_COLOR} style={{ width: size, height: size }} />
      ) : (
        <PlayRound color={TEXT_COLOR} style={{ width: size, height: size }} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
