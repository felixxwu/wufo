import { TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { ANIMATION_DELAY, ANIMATION_INTERVAL } from './Release'

export function CopyRightFooter() {
  return <CopyRight>&copy; WUFO 2023</CopyRight>
}

const CopyRight = styled('span', {
  width: '100%',
  textAlign: 'center',
  color: TEXT_COLOR,
  zIndex: -1,

  opacity: '0',
  animationName: 'fade-in',
  animationDelay: `${ANIMATION_INTERVAL * content.releases.length + ANIMATION_DELAY}s`,
  animationDuration: '1s',
  animationFillMode: 'forwards',
})
