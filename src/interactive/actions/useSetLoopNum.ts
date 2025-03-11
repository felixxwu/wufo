import { useLoopNum } from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function useSetLoopNum() {
  const { files } = useSongConfig()

  return (loopNum: number) => {
    if (loopNum < 0 || loopNum >= files.length) return

    useLoopNum.set(loopNum)
  }
}
