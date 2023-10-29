import { BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Link } from './Link'

export function Header() {
  return (
    <Container>
      <TopRow>
        <Avatar src={content.avatar} alt='WUFO Avatar' />
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
  animationDelay: '1.5s',
  animationDuration: '1s',
  animationFillMode: 'forwards',
})

const TopRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})

const Avatar = styled('img', {
  width: `${AVATAR_SIZE}px`,
  height: `${AVATAR_SIZE}px`,
  borderRadius: `${AVATAR_SIZE}px`,
  boxShadow: BOX_SHADOW,
})

const Name = styled('div', {
  fontSize: '40px',
  fontWeight: '900',
  letterSpacing: '-0.18ch',
  fontStyle: 'italic',
})

const BottomRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
})
