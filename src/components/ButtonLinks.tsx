import { styled } from 'goober'
import { IRelease } from '../lib/types'
import { Spotify } from '../icons/spotify'
import { YouTube } from '../icons/youtube'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { ButtonLink } from './ButtonLink'
import { Button } from './Button'
import { URL } from '../icons/url'
import { singleSongMode } from '../lib/singleSongMode'

export const LINKS_HEIGHT = singleSongMode() ? 90 : 130

export const ButtonLinks = ({ release }: { release: IRelease }) => {
  return (
    <Wrapper>
      <Links>
        <ButtonLink name='Spotify' href={release.spotify} icon={Spotify} />
        <ButtonLink name='YouTube' href={release.youtube} icon={YouTube} />
        <ButtonLink name='Apple Music' href={release.apple} icon={Apple} />
        <ButtonLink name='SoundCloud' href={release.soundcloud} icon={SoundCloud} />
      </Links>
      <Share>
        {!singleSongMode() && <Button label='Share Link' Icon={URL} href={`/${release.slug}`} />}
      </Share>
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
`

const Share = styled('div')`
  margin: auto;
  opacity: 0.8;
`
