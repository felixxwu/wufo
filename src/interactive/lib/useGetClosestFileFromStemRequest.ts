import { useSetRequestedLoopNum } from '../actions/useSetRequestedLoopNum'
import { useStartClock } from '../actions/useStartClock'
import { useSongConfig } from '../computed/useSongConfig'
import type { Stem } from './stemNames'
import { useCurrentLoopPlaying, useStarted } from './store'

export const useGetClosestFileFromStemRequest = () => {
  const { files } = useSongConfig()
  const currentLoopPlaying = useCurrentLoopPlaying.useState()
  const startClock = useStartClock()
  const started = useStarted.useState()

  const setRequestedLoopNum = useSetRequestedLoopNum()

  return (stem: Stem, requestStemToBePresent: boolean) => {
    let closestFileIndex = null
    let closestFileDistance = Infinity

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (requestStemToBePresent) {
        if (file.stems.includes(stem)) {
          const distance = Math.abs(i - currentLoopPlaying)
          if (distance <= closestFileDistance) {
            closestFileDistance = distance
            closestFileIndex = i
          }
        }
      } else {
        if (!file.stems.includes(stem)) {
          const distance = Math.abs(i - currentLoopPlaying)
          if (distance <= closestFileDistance) {
            closestFileDistance = distance
            closestFileIndex = i
          }
        }
      }
    }
    if (closestFileIndex === null) return
    setRequestedLoopNum(closestFileIndex)
    if (!started) startClock()
  }
}
