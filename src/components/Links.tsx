import { styled } from 'goober'
import { LINK_ICON_SIZE, Link } from './Link'
import { Spotify } from '../icons/spotify'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { Apple } from '../icons/apple'
import { singleSongMode } from '../lib/singleSongMode'
import { IRelease } from '../lib/types'
import { BG_DARK, BORDER_RADIUS_LARGE, QUICK_TRANSITION, TEXT_COLOR } from '../lib/consts'
import { URL } from '../icons/url'

export const Links = ({ release }: { release: IRelease }) => {
  const colour = TEXT_COLOR

  return (
    <Wrapper>
      <Button href={release.spotify} target='_blank' style={{ color: colour }} aria-label='Spotify'>
        <Spotify color={colour} style={{ width: LINK_ICON_SIZE }} />
        Spotify
      </Button>
      <LinksRow>
        <Link
          name='SoundCloud'
          Icon={SoundCloud}
          href={release.soundcloud}
          newWindow
          ariaLabel='SoundCloud'
        />
        <Link name='YouTube' Icon={YouTube} href={release.youtube} newWindow ariaLabel='YouTube' />
        <Link name='Apple' Icon={Apple} href={release.apple} newWindow ariaLabel='Apple' />
        {!singleSongMode() && (
          <Link name='Share' Icon={URL} href={`/${release.slug}`} ariaLabel='Share' />
        )}
      </LinksRow>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const LinksRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  opacity: 0.9;

  & > * {
    margin-left: -10px;
    margin-right: 10px;
  }
`

const Button = styled('a')`
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  font-size: ${LINK_ICON_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #eeeeeecd;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  opacity: 1;
  background-color: transparent;
  transition: ${QUICK_TRANSITION};
  text-decoration: none;

  &:hover {
    background-color: ${BG_DARK};
  }
`
