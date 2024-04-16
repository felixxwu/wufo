import { useEffect } from 'preact/hooks'
import styled from 'styled-components'

const ANIMATION_START_DELAY = 1000
const ANIMATION_DURATION = 5000
const ROWS = 22
const REPEATS = 12
const ROW_BY_ROW_OFFSET = -70
const LEFT_OFFSET = 500
const ROTATION = -10
const FONT_SIZE = 60
const LETTER_SPACING = 40

export function Logos2() {
  useEffect(() => {
    const letters = document.querySelectorAll('.letter')
    const screenMiddleX = window.innerWidth / 2
    const screenMiddleY = window.innerHeight / 2
    for (const letter of letters as NodeListOf<HTMLElement>) {
      const rect = letter.getBoundingClientRect()
      const distanceToMiddle = Math.sqrt(
        Math.pow(screenMiddleX - rect.x, 2) + Math.pow(screenMiddleY - rect.y, 2)
      )
      letter.style.animationDelay = `${distanceToMiddle}ms`
    }
  }, [])

  return (
    <Container>
      {Array.from({ length: ROWS }).map((_, i) => (
        <Row style={{ transform: `translateX(${i * ROW_BY_ROW_OFFSET + LEFT_OFFSET}px)` }}>
          {Array.from({ length: REPEATS }).map(() => {
            return (
              <>
                <LetterWrapper className='letter'>
                  <Letter style={{ animationDelay: getRandomDelay() }}>W</Letter>
                </LetterWrapper>
                <LetterWrapper className='letter'>
                  <Letter style={{ animationDelay: getRandomDelay() }}>U</Letter>
                </LetterWrapper>
                <LetterWrapper className='letter'>
                  <Letter style={{ animationDelay: getRandomDelay() }}>F</Letter>
                </LetterWrapper>
                <LetterWrapper className='letter'>
                  <Letter style={{ animationDelay: getRandomDelay() }}>O</Letter>
                </LetterWrapper>
              </>
            )
          })}
        </Row>
      ))}
    </Container>
  )
}

function getRandomDelay() {
  return `${ANIMATION_START_DELAY + Math.pow(Math.random(), 5) * ANIMATION_DURATION}ms`
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-direction: column;
  transform: rotate(${ROTATION}deg);
`

const Row = styled.div`
  color: white;
  opacity: 0.1;
  font-size: ${FONT_SIZE}px;
  letter-spacing: ${LETTER_SPACING}px;
  transform: scaleY(0.9);
`

const Letter = styled.span`
  animation: pop-out ${ANIMATION_START_DELAY}ms forwards;
`

const LetterWrapper = styled.span`
  opacity: 0;
  animation: fade-in 500ms ease-in forwards;
`
