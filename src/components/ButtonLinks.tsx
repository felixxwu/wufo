import { styled } from 'goober'
import { IRelease } from '../lib/types'
import { Spotify } from '../icons/spotify'
import { YouTube } from '../icons/youtube'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { ButtonLink } from './ButtonLink'
import { MOBILE_CUTOFF } from '../lib/consts.ts'

export const ButtonLinks = ({ release }: { release: IRelease }) => {
  return (
    <Wrapper>
      <Links>
        <ButtonLink name='Spotify' href={release.spotify} icon={Spotify} />
        <ButtonLink name='YouTube' href={release.youtube} icon={YouTube} />
        <ButtonLink name='Apple Music' href={release.apple} icon={Apple} />
        <ButtonLink name='SoundCloud' href={release.soundcloud} icon={SoundCloud} />
      </Links>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`

const Links = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (min-width: ${MOBILE_CUTOFF}px) {
    grid-template-columns: auto auto auto auto;
  }
`
