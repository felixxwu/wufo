import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import React from 'react'
import { setup } from 'goober'

setup(React.createElement)

createRoot(document.getElementById('app')!).render(<App />)
