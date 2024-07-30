import { styled } from 'goober'
import { BORDER_RADIUS_LARGE, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { IconProps } from '../lib/types'
import { VNode } from 'preact'

export const LINK_ICON_SIZE = 16

export const ButtonLink = ({
  name,
  href,
  icon: Icon,
}: {
  name: string
  href?: string
  icon: (props: IconProps) => VNode
}) => {
  if (!href) return null

  return (
    <Wrapper href={href} target='_blank' aria-label={name}>
      <Name>{name}</Name>
      <Icon color={TEXT_COLOR} style={{ width: LINK_ICON_SIZE, height: LINK_ICON_SIZE }} />
    </Wrapper>
  )
}

const Wrapper = styled('a')`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${BORDER_RADIUS_LARGE}px;
  cursor: pointer;
  transition: ${QUICK_TRANSITION};
  color: ${TEXT_COLOR};
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const Name = styled('div')`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(100% - ${LINK_ICON_SIZE}px - 10px);
  opacity: 0.8;
`
