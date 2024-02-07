import { PauseRound } from '../icons/pauseRound'
import { PlayRound } from '../icons/playRound'
import { TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'

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

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
