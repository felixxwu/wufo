import React, { useEffect } from 'react'

export function useWindowEventListeners({
  currentMousePos,
  oldRotationDegs,
  pointerDown,
  posFromLastMouseDown,
  rotationDegs,
}: {
  pointerDown: React.RefObject<boolean>
  posFromLastMouseDown: React.RefObject<{ x: number; y: number }>
  currentMousePos: React.RefObject<{ x: number; y: number }>
  oldRotationDegs: React.RefObject<number>
  rotationDegs: React.RefObject<number>
}) {
  useEffect(() => {
    window.addEventListener('pointerdown', e => {
      pointerDown.current = true
      posFromLastMouseDown.current = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('pointermove', e => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('pointerup', () => {
      pointerDown.current = false
      oldRotationDegs.current = rotationDegs.current
    })
  }, [])
}
