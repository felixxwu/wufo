import { useLoopRequested } from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function useSetRequestedLoopNum() {
  const { files } = useSongConfig()

  return (loopNum: number) => {
    if (loopNum < 0 || loopNum >= files.length) return

    useLoopRequested.set(loopNum)
  }
}
