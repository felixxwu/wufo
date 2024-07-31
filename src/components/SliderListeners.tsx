import { useEffect, useRef, useState } from 'preact/hooks'
import { SLIDER_CLASSNAME } from './Slider'
import { progressOverride } from '../lib/signals'

export const SliderListeners = () => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLElement | undefined>()

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      sliderRef.current = e
        .composedPath()
        .find(el =>
          [...((el as HTMLElement).classList?.values() ?? [])].includes(SLIDER_CLASSNAME)
        ) as HTMLElement

      if (!sliderRef.current) return

      setIsDragging(true)
      handlePointerSeek(e)
    }
    function handlePointerMove(e: PointerEvent) {
      if (!isDragging) return
      handlePointerSeek(e)
    }
    function handlePointerUp() {
      setIsDragging(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
    window.addEventListener('pointerleave', handlePointerUp)
    window.addEventListener('blur', handlePointerUp)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('pointerleave', handlePointerUp)
      window.removeEventListener('blur', handlePointerUp)
    }
  }, [isDragging])

  function handlePointerSeek(e: PointerEvent) {
    if (!sliderRef.current) return
    const sliderRect = sliderRef.current.getBoundingClientRect()
    const percent = (e.clientX - sliderRect.left) / sliderRect.width
    const clampedPercent = Math.max(0, Math.min(1, percent))
    progressOverride.value = clampedPercent
  }

  return null
}
