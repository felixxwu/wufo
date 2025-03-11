import { GRID_GAP, IMAGE_SIZE, SIDE_MARGIN } from '../components/Release'
import { MOBILE_CUTOFF } from './consts'
import { useScreenWidth } from './signals'
import { singleSongMode } from './singleSongMode'

export function useLargeTitleFontSize(title: string) {
  const screenWidth = useScreenWidth.useState()
  const titleWidth =
    Math.min(MOBILE_CUTOFF, screenWidth) -
    (singleSongMode() ? 0 : IMAGE_SIZE + GRID_GAP) -
    GRID_GAP * 2 -
    SIDE_MARGIN * 2

  const titleHeight = singleSongMode() ? 60 : IMAGE_SIZE - GRID_GAP

  let fontSize = 48
  let elWidth = Infinity
  let elHeight = Infinity

  while (elWidth > titleWidth || elHeight > titleHeight) {
    const parentEl = document.createElement('div')
    parentEl.style.position = 'absolute'
    parentEl.style.width = `${titleWidth}px`
    parentEl.style.height = `${IMAGE_SIZE}px`
    parentEl.style.display = 'flex'
    parentEl.style.flexDirection = 'column'
    parentEl.style.justifyContent = 'space-between'

    const el = document.createElement('div')
    el.style.fontSize = `${fontSize--}px`
    el.style.letterSpacing = '-1px'
    el.style.fontWeight = '500'
    el.style.lineHeight = '1'
    el.style.width = 'fit-content'
    el.style.color = 'white'
    el.innerHTML = title

    parentEl.appendChild(el)

    document.body.appendChild(parentEl)
    elWidth = el.clientWidth
    elHeight = el.clientHeight
    parentEl.remove()
  }

  return fontSize
}
