import { VNode } from 'preact'
import { IconProps } from '../lib/types'
import { styled } from '../lib/styled'
import { BORDER_RADIUS, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { css } from '@emotion/css'

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
    <Container {...(onClick ? { onClick, role: 'button' } : {})} {...(href ? { href } : {})}>
      <Icon color={TEXT_COLOR} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
      <Label>{label}</Label>
    </Container>
  )
}

const Container = styled(
  'a',
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    borderRadius: `${BORDER_RADIUS}px`,
    cursor: 'pointer',
    textDecoration: 'none',
    color: TEXT_COLOR,
    transition: QUICK_TRANSITION,
    margin: 'auto',
    fontWeight: '500',
    role: 'button',
  },
  css`
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `
)

const Label = styled('div', {
  fontSize: `${ICON_SIZE}px`,
  textDecoration: 'underline',
})
