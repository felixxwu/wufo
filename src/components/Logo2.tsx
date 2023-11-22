import { useEffect, useState } from 'preact/hooks'
import { WufoSerif } from '../icons/wufo-serif'
import { TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { sleep } from '../lib/sleep'

export const NUM_LOGOS = 8
export const LOGO_ANIMATION_INTERVAL = 0.1
export const LOGO_ANIMATION_DURATION = 1.5

const LETTER_ANIMATION_INTERVAL = 150
const LOGO_WIDTH = 440
const TRANSLATION_ANIMATION_DURATION = 700
const TRANSLATION_STEP_DISTANCE = 110
const TRANSLATION_STEP_DELAY = 100
const OPACITY_DROPOFF = 1 / (NUM_LOGOS + 1)

export function Logos2() {
  const [lettersShown, setLettersShown] = useState(1)
  const [logosTransformed, setLogosTransformed] = useState(0)
  const [logosFadedOut, setLogosFadedOut] = useState(0)

  useEffect(() => {
    ;(async () => {
      for (let i = 2; i < 5; i++) {
        await sleep(LETTER_ANIMATION_INTERVAL)
        setLettersShown(i)
      }
      for (let i = 0; i < NUM_LOGOS; i++) {
        setLogosTransformed(i)
        setTimeout(() => {
          setLogosFadedOut(i)
        }, TRANSLATION_ANIMATION_DURATION)
        await sleep(TRANSLATION_STEP_DELAY)
      }
    })()
  }, [])

  return (
    <Container>
      <WufoSerif
        style={{
          width: `${LOGO_WIDTH}px`,
          opacity: logosFadedOut > 0 ? 0 : 1,
          transition: `${TRANSLATION_ANIMATION_DURATION - 100}ms ease-in-out`,
        }}
        color={TEXT_COLOR}
        lettersShown={lettersShown}
      />
      {[...Array(NUM_LOGOS)].map((_, i) => (
        <>
          {getLogoComponent(i, true)}
          {getLogoComponent(i, false)}
        </>
      ))}
    </Container>
  )

  function getLogoComponent(i: number, above: boolean) {
    return (
      <WufoSerif
        color={TEXT_COLOR}
        lettersShown={lettersShown}
        style={{
          transform:
            i < logosTransformed
              ? `translateY(${TRANSLATION_STEP_DISTANCE * (above ? 1 : -1) * (i + 1)}px)`
              : 'translateX(0)',
          transition: `${TRANSLATION_ANIMATION_DURATION}ms ease-in-out`,
          width: `${LOGO_WIDTH}px`,
          opacity: getLogoOpacity(i),
        }}
      />
    )
  }

  function getLogoOpacity(i: number) {
    if (logosTransformed > 0) {
      if (logosFadedOut > i) {
        return 0
      } else {
        return 1 - OPACITY_DROPOFF * (i + 3)
      }
    } else {
      return 0
    }
  }
}

const Container = styled('div', {
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: `${TRANSLATION_ANIMATION_DURATION}ms ease-in-out, scale ease-in, blur ease-out`,
  pointerEvents: 'none',
})
