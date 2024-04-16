import { Down } from '../icons/down'
import { FadeInDelay } from '../lib/FadeInDelay'
import { FontWeightAnimation } from '../lib/FontWeightAnimation'
import { BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { styled } from '../lib/styled'
import { Link } from './Link'

const AVATAR_SIZE = 50
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

export function Header() {
  if (singleSongMode()) return null

  return (
    <Container>
      <TopRow>
        <FadeInDelay delay={TIMING_CONFIG.avatar}>
          <Avatar src={content.avatar} alt='WUFO Avatar' />
        </FadeInDelay>
        <NameRow>
          {TIMING_CONFIG.name.map(({ letter, delay }) => (
            <FontWeightAnimation delay={delay} duration={TIMING_CONFIG.fontWeightDuration}>
              <FadeInDelay delay={delay}>
                <Name>{letter}</Name>
              </FadeInDelay>
            </FontWeightAnimation>
          ))}
        </NameRow>
      </TopRow>
      <FadeInDelay delay={TIMING_CONFIG.bottomRow}>
        <BottomRow>
          {content.socials.map(social => (
            <Link name={social.label} Icon={social.Icon} href={social.link} />
          ))}
        </BottomRow>
      </FadeInDelay>
      <FadeInDelay delay={TIMING_CONFIG.downArrow}>
        <Down color={TEXT_COLOR} style={{ width: '14px' }} />
      </FadeInDelay>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: TEXT_COLOR,
  maxWidth: '500px',
  margin: 'auto',
  height: '100vh',

  opacity: '0',
  animationName: 'fade-in',
  animationDelay: `0.2s`,
  animationDuration: '2s',
  animationFillMode: 'forwards',
})

const TopRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
})

const Avatar = styled('img', {
  width: `${AVATAR_SIZE}px`,
  height: `${AVATAR_SIZE}px`,
  borderRadius: `${AVATAR_SIZE}px`,
  boxShadow: BOX_SHADOW,
})

const NameRow = styled('div', {
  display: 'flex',
  gap: '40px',
})

const Name = styled('div', {
  fontSize: '30px',
  textAlign: 'center',
})

const BottomRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
})
