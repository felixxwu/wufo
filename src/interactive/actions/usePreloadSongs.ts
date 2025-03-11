import { useEffect } from 'react'
import { usePlayer2, useSongLoaded } from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function usePreloadSongs() {
  const { files, path } = useSongConfig()

  useEffect(() => {
    ;(async () => {
      useSongLoaded.set(false)
      for (const file of files) {
        if (file.name === null) continue
        await usePlayer2.ref().load(`${path}/${file.name}`)
      }
      useSongLoaded.set(true)
    })()
  }, [files])
}
