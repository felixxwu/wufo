import { styled } from 'goober'
import { FadeInDelay } from '../lib/FadeInDelay'
import { TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { Link } from './Link'
import { useState } from 'react'

const LETTER_CONFIG = {
  name: [
    { letter: 'w', delay: 0, kerning: 0 },
    { letter: 'u', delay: 200, kerning: 0 },
    { letter: 'f', delay: 400, kerning: 0 },
    { letter: 'o', delay: 600, kerning: 2 },
  ],
  fontWeightDuration: 4000,
  avatar: 1000,
  bottomRow: 1000,
  downArrow: 2000,
}

export function Header({}: { startPlaying: () => void }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  if (singleSongMode()) return null

  const handleEasterEgg = (letter: string) => {
    if (letter === 'O') setShowEasterEgg(true)
  }

  return (
    <Container>
      <TopRow>
        <NameRow>
          {LETTER_CONFIG.name.map(({ letter, delay, kerning }) => (
            <FadeInDelay key={letter + delay + kerning} delay={delay}>
              <>
                <NameLetter left={kerning} onClick={() => handleEasterEgg(letter)}>
                  {letter}
                </NameLetter>
                {letter === 'O' && showEasterEgg && <Egg src={content.avatar} />}
              </>
            </FadeInDelay>
          ))}
        </NameRow>
      </TopRow>
      <FadeInDelay delay={LETTER_CONFIG.bottomRow}>
        <BottomRow>
          {content.socials.map(social => (
            <Link
              key={social.label}
              name={social.label}
              Icon={social.Icon}
              href={social.link}
              ariaLabel={social.label}
            />
          ))}
        </BottomRow>
      </FadeInDelay>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${TEXT_COLOR};
  max-width: 500px;
  height: calc(100vh - 240px);
  margin: auto;
  opacity: 0;
  animation-name: fade-in;
  animation-delay: 0.2s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
`

const TopRow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`

const Egg = styled('img')`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transform: translate(7px, -73px);
  z-index: -1;

  animation: fadeIn 1s ease-in-out;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const NameRow = styled('div')`
  display: flex;
`

const NameLetter = styled('div')<{ left: number }>`
  font-size: 110px;
  text-align: center;
  font-family: 'Kimura', sans-serif;
  font-optical-sizing: auto;
  margin-left: ${props => props.left}px;
  transform: scaleY(1.3);
`

const BottomRow = styled('div')`
  display: flex;
  gap: 10px;
`
