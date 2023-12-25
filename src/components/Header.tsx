import { BOX_SHADOW, TEXT_COLOR, UI_FADE_IN_DELAY } from '../lib/consts'
import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Color } from '../lib/types'
import { Link } from './Link'

export function Header({ setColor }: { setColor: (colors: Color) => void }) {
  if (content.releases.length === 1) return null

  return (
    <Container>
      <TopRow>
        <Avatar
          src={content.avatar}
          alt='WUFO Avatar'
          onclick={() => setColor([Math.random() * 150, Math.random() * 150, Math.random() * 150])}
        />
        <Name>WUFO</Name>
      </TopRow>
      <BottomRow>
        {content.socials.map(social => (
          <Link name={social.label} Icon={social.Icon} href={social.link} />
        ))}
      </BottomRow>
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

  opacity: '0',
  animationName: 'fade-in',
  animationDelay: `${UI_FADE_IN_DELAY - 0.5}s`,
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

const Name = styled('div', {
  fontSize: '30px',
  letterSpacing: '2ch',
  marginLeft: '2ch',
  textAlign: 'center',
})

const BottomRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
})
