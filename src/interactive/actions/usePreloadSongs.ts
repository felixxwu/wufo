import { useEffect } from 'react'
import { useBase64Audio, useSongLoaded } from '../lib/store.ts'
import { useSongConfig } from '../computed/useSongConfig.ts'

const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export function usePreloadSongs() {
  const { files, path } = useSongConfig()

  useEffect(() => {
    ;(async () => {
      useSongLoaded.set(false)
      const base64Audio = {} as { [key: number]: string }
      for (let i = 0; i < files.length; i++) {
        if (files[i].name === null) continue
        const blob = await (await fetch(`${path}/${files[i].name}`)).blob()
        base64Audio[i] = (await toBase64(blob)) as string
      }
      useSongLoaded.set(true)
      useBase64Audio.set(base64Audio)
    })()
  }, [files])
}
