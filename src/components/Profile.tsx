import { useState } from 'react'
import { BORDER_RADIUS_LARGE, BOX_SHADOW, HIGHLIGHT, TEXT_COLOR } from '../lib/consts'
import { content } from '../lib/content'
import { sleep } from '../lib/sleep'
import { styled } from 'goober'

const COLLAPSED_SIZE = 60
const OPEN_WIDTH = 200
const OPEN_HEIGHT = 380
const AVATAR_TRANSITION = 100
const MENU_TRANSITION = 300

export function Profile() {
  const [open, setOpen] = useState(false)
  const [showAvatar, setShowAvatar] = useState(true)

  async function openProfile() {
    setShowAvatar(false)
    await sleep(AVATAR_TRANSITION)
    setOpen(true)
  }

  async function closeProfile() {
    setOpen(false)
    await sleep(MENU_TRANSITION)
    setShowAvatar(true)
  }

  return (
    <Container
      style={{
        width: open ? OPEN_WIDTH : COLLAPSED_SIZE,
        height: open ? OPEN_HEIGHT : COLLAPSED_SIZE,
        borderRadius: open ? BORDER_RADIUS_LARGE : COLLAPSED_SIZE / 2,
      }}
      onClick={async () => {
        if (open) {
          closeProfile()
        } else {
          openProfile()
        }
      }}
    >
      <Backdrop style={open ? { opacity: 1, pointerEvents: 'all' } : {}} />
      <Avatar src={content.avatar} style={{ opacity: showAvatar ? 1 : 0 }} alt='WUFO Avatar' />
      <Links style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
        {content.socials.map(social => {
          const Icon = social.Icon
          return (
            <Link href={social.link} target='_blank' aria-label={social.label}>
              <Icon color={TEXT_COLOR} style={{ width: 20, height: 20 }} />
              {social.label}
            </Link>
          )
        })}
      </Links>
    </Container>
  )
}

const Container = styled('div')`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #333;
  box-shadow: ${BOX_SHADOW};
  overflow: hidden;
  transition: ${MENU_TRANSITION}ms;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  transition: ${MENU_TRANSITION}ms;
  pointer-events: none;
  opacity: 0;
`

const Avatar = styled('img')`
  width: ${COLLAPSED_SIZE}px;
  height: ${COLLAPSED_SIZE}px;
  cursor: pointer;
  transition: ${AVATAR_TRANSITION}ms;
`

const Links = styled('div')`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const Link = styled('a')`
  display: flex;
  gap: 10px;
  color: ${TEXT_COLOR};
  padding: 15px 20px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${HIGHLIGHT};
  }
`
