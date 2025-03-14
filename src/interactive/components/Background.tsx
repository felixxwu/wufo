import { styled } from 'goober'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { Grain } from './Grain.tsx'

export function Background() {
  const { cover } = useSongConfig()

  return (
    <>
      <Img src={cover} alt='Cover art' draggable='false' />
      <Grain />
    </>
  )
}

const Img = styled('img')`
  position: fixed;
  width: 100vw;
  height: 100svh;
  object-fit: cover;
  filter: brightness(0.2) blur(50px);
  top: 0;
  left: 0;
`
