import { styled } from 'goober'
import { useSongConfig } from '../computed/useSongConfig.ts'

export function Background() {
  const { cover } = useSongConfig()

  return <Img src={cover} alt='Cover art' draggable='false' />
}

const Img = styled('img')`
  position: fixed;
  width: 100vw;
  height: 100svh;
  object-fit: cover;
  filter: contrast(0.3) brightness(0.2) blur(10px);
  top: 0;
  left: 0;
`
