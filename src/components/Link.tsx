import { VNode } from 'preact'
import { IconProps } from '../lib/types'
import { BORDER_RADIUS_LARGE, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { styled } from 'goober'

export const LINK_ICON_SIZE = 14

export function Link({
  name,
  Icon,
  href,
  onclick,
  newWindow,
  ariaLabel,
}: {
  name?: string
  Icon: (props: IconProps) => VNode
  href?: string
  onclick?: () => void
  newWindow?: boolean
  ariaLabel: string
}) {
  if (!href && !onclick) return null

  return (
    <Container
      href={href}
      {...(newWindow ? { target: '_blank' } : {})}
      onClick={onclick}
      {...(href ? {} : { role: 'button' })}
      aria-label={ariaLabel}
    >
      {name && <Name>{name}</Name>}
      <Icon color={TEXT_COLOR} style={{ width: LINK_ICON_SIZE, height: LINK_ICON_SIZE }} />
    </Container>
  )
}

const Container = styled('a')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  cursor: pointer;
  text-decoration: none;
  color: ${TEXT_COLOR};
  transition: ${QUICK_TRANSITION};

  background-color: rgba(255, 255, 255, 0.06);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const Name = styled('div')`
  font-size: ${LINK_ICON_SIZE}px;
`
