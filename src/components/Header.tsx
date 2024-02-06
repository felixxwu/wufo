import { Down } from '../icons/down'
import { FadeInDelay } from '../lib/FadeInDelay'
import { BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { singleSongMode } from '../lib/singleSongMode'
import { styled } from '../lib/styled'
import { Link } from './Link'

export function Header() {
  if (singleSongMode()) return null

  return (
    <Container>
      <TopRow>
        <FadeInDelay delay={1000}>
          <Avatar src={content.avatar} alt='WUFO Avatar' />
        </FadeInDelay>
        <NameRow>
          <FadeInDelay delay={200}>
            <Name>W</Name>
          </FadeInDelay>
          <FadeInDelay delay={400}>
            <Name>U</Name>
          </FadeInDelay>
          <FadeInDelay delay={600}>
            <Name>F</Name>
          </FadeInDelay>
          <FadeInDelay delay={800}>
            <Name>O</Name>
          </FadeInDelay>
        </NameRow>
      </TopRow>
      <FadeInDelay delay={1500}>
        <BottomRow>
          {content.socials.map(social => (
            <Link name={social.label} Icon={social.Icon} href={social.link} />
          ))}
        </BottomRow>
      </FadeInDelay>
      <FadeInDelay delay={2000}>
        <Down color={TEXT_COLOR} style={{ width: '14px' }} />
      </FadeInDelay>
    </Container>
  )
}

const AVATAR_SIZE = 50

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
