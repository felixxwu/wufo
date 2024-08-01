import { useEffect, useRef, useState } from 'preact/hooks'
import { SLIDER_CLASSNAME } from './Slider'
import { progressOverride, songPlaying } from '../lib/signals'
import { findReleaseFromSong } from '../lib/findReleaseFromSong'
import { usePlayerController } from '../lib/usePlayerController'
import { findReleaseFromSlug } from '../lib/findReleaseFromSlug'

export const SliderListeners = () => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLElement | undefined>()

  const { onSongClick } = usePlayerController()

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      sliderRef.current = e
        .composedPath()
        .find(el =>
          [...((el as HTMLElement).classList?.values() ?? [])].includes(SLIDER_CLASSNAME)
        ) as HTMLElement

      if (!sliderRef.current) return
      const releasePlaying = findReleaseFromSong(songPlaying.value)

      if (releasePlaying && sliderRef.current.id && sliderRef.current.id !== releasePlaying.slug) {
        const release = findReleaseFromSlug(sliderRef.current.id)
        if (release) {
          onSongClick(release.songs[0])
          progressOverride.value = 0
        }
      } else {
        setIsDragging(true)
        handlePointerSeek(e)
      }
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
