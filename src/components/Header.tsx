import { styled } from 'goober'
import { FadeInDelay } from '../lib/FadeInDelay'
import { FontWeightAnimation } from '../lib/FontWeightAnimation'
import { TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { Link } from './Link'
import { useState } from 'preact/hooks'

const LETTER_CONFIG = {
  name: [
    { letter: 'W', delay: 0, kerning: 0 },
    { letter: 'U', delay: 200, kerning: 0 },
    { letter: 'F', delay: 400, kerning: -6 },
    { letter: 'O', delay: 600, kerning: -6 },
  ],
  fontWeightDuration: 4000,
  avatar: 1000,
  bottomRow: 1500,
  downArrow: 2000,
}

export function Header({}: { startPlaying: () => void }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  console.log(`showEasterEgg`, showEasterEgg)

  if (singleSongMode()) return null

  const handleEasterEgg = (letter: string) => {
    if (letter === 'O') setShowEasterEgg(true)
  }

  return (
    <Container
      style={{
        height: `calc(100vh - 250px)`,
      }}
    >
      <TopRow>
        {/* <FadeInDelay delay={TIMING_CONFIG.avatar}>
            <Avatar src={content.avatar} alt='WUFO Avatar' />
          </FadeInDelay> */}
        <NameRow>
          {LETTER_CONFIG.name.map(({ letter, delay, kerning }) => (
            <FontWeightAnimation delay={delay} duration={LETTER_CONFIG.fontWeightDuration}>
              <FadeInDelay delay={delay}>
                <>
                  <NameLetter left={kerning} onClick={() => handleEasterEgg(letter)}>
                    {letter}
                  </NameLetter>
                  {letter === 'O' && showEasterEgg && <Egg src={content.avatar} />}
                </>
              </FadeInDelay>
            </FontWeightAnimation>
          ))}
        </NameRow>
      </TopRow>
      <FadeInDelay delay={LETTER_CONFIG.bottomRow}>
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
      {/*<FadeInDelay delay={TIMING_CONFIG.downArrow}>*/}
      {/*  <StartListening onClick={startPlaying} style={{ opacity: showControls.value ? 0 : 1 }}>*/}
      {/*    <Music color={TEXT_COLOR} style={{ width: '35px', height: '35px' }} />*/}
      {/*    Start Listening*/}
      {/*  </StartListening>*/}
      {/*</FadeInDelay>*/}
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
  font-size: 130px;
  text-align: center;
  font-family: 'Rethink Sans', sans-serif;
  font-optical-sizing: auto;
  font-style: italic;
  margin-left: ${props => props.left}px;
  transform: scaleY(1.15);
`

const BottomRow = styled('div')`
  display: flex;
  gap: 10px;
`

// const StartListening = styled('div')`
//   display: flex;
//   gap: 10px;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   margin-top: 10px;
//   border-radius: ${BORDER_RADIUS_LARGE}px;
//   font-size: 14px;
//   color: ${TEXT_COLOR};
//   cursor: pointer;
//   transition: ${QUICK_TRANSITION};
//
//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }
// `
