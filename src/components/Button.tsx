import { VNode } from 'preact'
import { IconProps } from '../lib/types'
import { BORDER_RADIUS, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { styled } from 'goober'

const ICON_SIZE = 16

export function Button({
  label,
  Icon,
  onClick,
  href,
}: {
  label: string
  Icon: (props: IconProps) => VNode
  onClick?: () => void
  href?: string
}) {
  return (
    <Container
      {...(onClick ? { onClick, role: 'button' } : {})}
      {...(href ? { href } : {})}
      role='button'
    >
      <Icon color={TEXT_COLOR} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
      <Label>{label}</Label>
    </Container>
  )
}

const Container = styled('a')`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  color: ${TEXT_COLOR};
  transition: ${QUICK_TRANSITION};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    text-decoration: underline;
  }
`

const Label = styled('div')`
  font-size: ${ICON_SIZE}px;
`
