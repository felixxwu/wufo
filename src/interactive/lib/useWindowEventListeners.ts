import React, { useEffect } from 'react'
import {
  useOldRotationDegs,
  usePointerDown,
  usePosFromLastMouseDown,
  useRotationDegs,
} from './store.ts'

export function useWindowEventListeners(
  currentMousePos: React.RefObject<{ x: number; y: number }>
) {
  useEffect(() => {
    window.addEventListener('pointerdown', e => {
      usePointerDown.set(true)
      usePosFromLastMouseDown.set({ x: e.clientX, y: e.clientY })
    })

    window.addEventListener('pointermove', e => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('pointerup', () => {
      usePointerDown.set(false)
      useOldRotationDegs.set(useRotationDegs.ref())
    })
  }, [])
}
