import { styled } from 'goober'
import { FadeInDelay } from '../lib/FadeInDelay'
import { FontWeightAnimation } from '../lib/FontWeightAnimation'
import {
  BORDER_RADIUS_LARGE,
  BOX_SHADOW,
  HIGHLIGHT,
  QUICK_TRANSITION,
  TEXT_COLOR,
} from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { Link } from './Link'
import { Music } from '../icons/music'
import { showControls } from '../lib/signals'

const AVATAR_SIZE = 120
const TIMING_CONFIG = {
  name: [
    { letter: 'W', delay: 200 },
    { letter: 'U', delay: 400 },
    { letter: 'F', delay: 600 },
    // { letter: 'O', delay: 800 },
  ],
  fontWeightDuration: 5000,
  avatar: 1000,
  bottomRow: 1500,
  downArrow: 2000,
}

export function Header({ startPlaying }: { startPlaying: () => void }) {
  if (singleSongMode()) return null

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
                <Name>{letter}</Name>
              </FadeInDelay>
            </FontWeightAnimation>
          ))}
          <Stupid src={content.avatar} width={60} height={60} />
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

const Stupid = styled('img')`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 11px solid ${TEXT_COLOR};
  margin-top: 20px;

  animation: flyIn 2s ease-in-out 2s forwards;
  transform: translate(-1000px, -100px);

  @keyframes flyIn {
    0% {
      transform: translate(-1000px, -80px);
    }
    12% {
      transform: translate(-500px, -200px);
    }
    25% {
      transform: translate(-350px, -80px);
    }
    38% {
      transform: translate(-275px, -150px);
    }
    50% {
      transform: translate(-220px, -80px);
    }
    62% {
      transform: translate(-150px, -150px);
    }
    75% {
      transform: translate(-100px, -80px);
    }
    87% {
      transform: translate(-50px, -150px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`

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

const Avatar = styled('img')`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: ${AVATAR_SIZE}px;
  /* box-shadow: ${BOX_SHADOW}; */
  border: 1px solid #888;
`

const NameRow = styled('div')`
  display: flex;
  gap: 40px;
`

const Name = styled('div')`
  font-size: 100px;
  /* font-size: 30px; */
  text-align: center;
`

const BottomRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
