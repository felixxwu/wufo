import { Pause } from '../icons/pause'
import { Play } from '../icons/play'
import { TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { Color } from '../lib/types'

const ICON_CONTAINER_SIZE = 30
const ICON_SIZE = 15

export function PlayPause({ playing, color }: { playing: boolean; color: Color }) {
  return (
    <Container>
      {playing ? (
        <Pause color={`rgb(${color.join(', ')})`} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
      ) : (
        <Play color={`rgb(${color.join(', ')})`} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
      )}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: TEXT_COLOR,
  borderRadius: '100vw',
  width: `${ICON_CONTAINER_SIZE}px`,
  height: `${ICON_CONTAINER_SIZE}px`,
  minWidth: `${ICON_CONTAINER_SIZE}px`,
  minHeight: `${ICON_CONTAINER_SIZE}px`,
})
