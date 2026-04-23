import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import React from 'react'
import { setup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'
import { noForwardProps } from '../noForwardProps.ts'
import { config } from './lib/config.ts'
import { useSongNum } from './lib/store.ts'

const initialSongNum = config.findIndex(s => s.path === window.location.pathname)
if (initialSongNum > 0) useSongNum.set(initialSongNum)

setup(
  React.createElement,
  undefined,
  undefined,
  shouldForwardProp(prop => {
    return !noForwardProps.includes(prop)
  })
)

createRoot(document.getElementById('app')!).render(<App />)
