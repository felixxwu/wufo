import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import React from 'react'
import { setup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'

setup(
  React.createElement,
  undefined,
  undefined,
  shouldForwardProp(prop => {
    return (
      prop !== 'releaseColor' &&
      prop !== 'releaseImageSize' &&
      prop !== 'releaseHeight' &&
      prop !== 'showPlayingAnimation' &&
      prop !== 'autoplay' &&
      prop !== 'linksHeight' &&
      prop !== 'expanded'
    )
  })
)

createRoot(document.getElementById('app')!).render(<App />)
