import { styled } from 'goober'
import { FadeInDelay } from '../lib/FadeInDelay'
import { FontWeightAnimation } from '../lib/FontWeightAnimation'
import { BORDER_RADIUS_LARGE, HIGHLIGHT, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { Link } from './Link'
import { Music } from '../icons/music'
import { showControls } from '../lib/signals'
import { useState } from 'preact/hooks'

const TIMING_CONFIG = {
  name: [
    { letter: 'W', delay: 200 },
    { letter: 'U', delay: 400 },
    { letter: 'F', delay: 600 },
    { letter: 'O', delay: 800 },
  ],
  fontWeightDuration: 5000,
  avatar: 1000,
  bottomRow: 1500,
  downArrow: 2000,
}

export function Header({ startPlaying }: { startPlaying: () => void }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  console.log(`showEasterEgg`, showEasterEgg)

  if (singleSongMode()) return null

  const handleEasterEgg = (letter: string) => {
    if (letter === 'O') setShowEasterEgg(true)
  }

  return (
    <Container>
      <TopRow>
        {/* <FadeInDelay delay={TIMING_CONFIG.avatar}>
            <Avatar src={content.avatar} alt='WUFO Avatar' />
          </FadeInDelay> */}
        <NameRow>
          {TIMING_CONFIG.name.map(({ letter, delay }) => (
            <FontWeightAnimation delay={delay} duration={TIMING_CONFIG.fontWeightDuration}>
              <FadeInDelay delay={delay}>
                <>
                  <Name onClick={() => handleEasterEgg(letter)}>{letter}</Name>
                  {letter === 'O' && showEasterEgg && <Egg src={content.avatar} />}
                </>
              </FadeInDelay>
            </FontWeightAnimation>
          ))}
        </NameRow>
      </TopRow>
      <FadeInDelay delay={TIMING_CONFIG.bottomRow}>
        <BottomRow>
          {content.socials.map(social => (
            <Link
              name={social.label}
              Icon={social.Icon}
              href={social.link}
              ariaLabel={social.label}
            />
          ))}
        </BottomRow>
      </FadeInDelay>
      <FadeInDelay delay={TIMING_CONFIG.downArrow}>
        <StartListening onClick={startPlaying} style={{ opacity: showControls.value ? 0 : 1 }}>
          <Music color={TEXT_COLOR} style={{ width: '35px', height: '35px' }} />
          Start Listening
        </StartListening>
      </FadeInDelay>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${TEXT_COLOR};
  max-width: 500px;
  margin: auto;
  height: 100vh;
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
  gap: 40px;
`

const Name = styled('div')`
  font-size: 80px;
  text-align: center;
`

const BottomRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`

const StartListening = styled('div')`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 10px;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  font-size: 14px;
  color: ${TEXT_COLOR};
  cursor: pointer;
  transition: ${QUICK_TRANSITION};

  &:hover {
    background-color: ${HIGHLIGHT};
  }
`
