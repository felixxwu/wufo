import { TEXT_COLOR_DARKER } from '../lib/consts'
import { styled } from '../lib/styled'

const ANIMATION_START_DELAY = 700
const ANIMATION_DURATION = 1500
const ROWS = 17
const REPEATS = 5
const ROW_BY_ROW_OFFSET = -70
const LEFT_OFFSET = 500
const ROTATION = -10
const FONT_SIZE = 60
const LETTER_SPACING = 40

export function Logos2() {
  return (
    <Container>
      {Array.from({ length: ROWS }).map((_, i) => (
        <Row style={{ transform: `translateX(${i * ROW_BY_ROW_OFFSET + LEFT_OFFSET}px)` }}>
          {Array.from({ length: REPEATS }).map(() => {
            return (
              <>
                <Letter style={{ animationDelay: getRandomDelay() }}>W</Letter>
                <Letter style={{ animationDelay: getRandomDelay() }}>U</Letter>
                <Letter style={{ animationDelay: getRandomDelay() }}>F</Letter>
                <Letter style={{ animationDelay: getRandomDelay() }}>O</Letter>
              </>
            )
          })}
        </Row>
      ))}
    </Container>
  )
}

function getRandomDelay() {
  return `${ANIMATION_START_DELAY + Math.random() * ANIMATION_DURATION}ms`
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
  pointerEvents: 'none',
  flexDirection: 'column',
  transform: `rotate(${ROTATION}deg)`,
  opacity: '0',
  animation: 'pop-in 1000ms ease-in forwards',
})

const Row = styled('div', {
  color: TEXT_COLOR_DARKER,
  fontSize: `${FONT_SIZE}px`,
  letterSpacing: `${LETTER_SPACING}px`,
  transform: 'scaleY(0.9)',
})

const Letter = styled('span', {
  animation: 'pop-out 300ms forwards',
})
