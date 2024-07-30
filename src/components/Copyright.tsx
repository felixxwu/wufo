import { styled } from 'goober'
import { TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { ANIMATION_DELAY, ANIMATION_INTERVAL } from './Release'
import { singleSongMode } from '../lib/singleSongMode'

export function CopyRightFooter() {
  return <CopyRight>&copy; WUFO 2024</CopyRight>
}

const CopyRight = styled('span')`
  width: 100%;
  text-align: center;
  color: ${TEXT_COLOR};
  margin-bottom: ${singleSongMode() ? '' : '50vh'};
  opacity: 0;
  animation-name: fade-in;
  animation-delay: ${ANIMATION_INTERVAL * content.releases.length + ANIMATION_DELAY}s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
`
