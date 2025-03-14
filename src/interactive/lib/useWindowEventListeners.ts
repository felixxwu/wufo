import React, { useEffect } from 'react'
import {
  useLoopRequested,
  useOldRotationDegs,
  usePointerDown,
  usePosFromLastMouseDown,
  useRotationDegs,
  useScreenSize,
  useSongNum,
  useStarted,
} from './store.ts'
import { useStop } from '../actions/useStop.ts'
import { useStartClock } from '../actions/useStartClock.ts'
import { config } from './config.ts'
import { useSetRequestedLoopNum } from '../actions/useSetRequestedLoopNum.ts'

export function useWindowEventListeners(
  currentMousePos: React.RefObject<{ x: number; y: number }>
) {
  const stop = useStop()
  const start = useStartClock()
  const setRequestedLoopNum = useSetRequestedLoopNum()

  useEffect(() => {
    window.onpointerdown = e => {
      usePointerDown.set(true)
      usePosFromLastMouseDown.set({ x: e.clientX, y: e.clientY })
    }

    window.onpointermove = e => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.onpointerup = () => {
      usePointerDown.set(false)
      useOldRotationDegs.set(useRotationDegs.ref())
    }

    window.onkeydown = async e => {
      const { files } = config[useSongNum.ref()]

      if (e.key === ' ') {
        if (useStarted.ref()) {
          stop()
        } else {
          await start()
        }
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setRequestedLoopNum(Math.max(0, useLoopRequested.ref() - 1))
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setRequestedLoopNum(Math.min(files.length - 1, useLoopRequested.ref() + 1))
      }
    }

    window.onresize = () => {
      useScreenSize.set({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])
}
