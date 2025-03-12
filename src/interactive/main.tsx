import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import React from 'react'
import { setup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'
import { noForwardProps } from '../noForwardProps.ts'

setup(
  React.createElement,
  undefined,
  undefined,
  shouldForwardProp(prop => {
    return !noForwardProps.includes(prop)
  })
)

createRoot(document.getElementById('app')!).render(<App />)
