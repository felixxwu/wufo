import { VNode } from 'preact'
import { IconProps } from '../lib/types'
import { styled } from '../lib/styled'
import { BORDER_RADIUS, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { css } from '@emotion/css'

const ICON_SIZE = 14

export function Link({
  name,
  Icon,
  href,
  newWindow,
}: {
  name?: string
  Icon: (props: IconProps) => VNode
  href?: string
  newWindow?: boolean
}) {
  if (!href) return null

  return (
    <Container href={href} {...(newWindow ? { target: '_blank' } : {})}>
      <Icon color={TEXT_COLOR} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
      {name && <Name>{name}</Name>}
    </Container>
  )
}

const Container = styled(
  'a',
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '5px 10px',
    borderRadius: `${BORDER_RADIUS}px`,
    cursor: 'pointer',
    textDecoration: 'none',
    color: TEXT_COLOR,
    transition: QUICK_TRANSITION,
  },
  css`
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `
)

const Name = styled('div', {
  fontSize: `${ICON_SIZE}px`,
})
