import { useState } from 'preact/hooks'
import { BORDER_RADIUS, BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { IRelease, ISong } from '../lib/types'
import { PlayPause } from './PlayPause'
import { Song } from './Song'
import { Link } from './Link'
import { Spotify } from '../icons/spotify'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { css } from '@emotion/css'
import { Share } from '../icons/share'
import { singleSongMode } from '../lib/singleSongMode'

const IMAGE_SIZE = 120
export const ANIMATION_INTERVAL = 0.3
export const ANIMATION_DELAY = 0

export function Release({
  release,
  index,
  songPlaying,
  onSongClick,
}: {
  release: IRelease
  index: number
  songPlaying: string | null
  onSongClick: (song: ISong) => void
}) {
  const [hovering, setHovering] = useState<number | null>(null)

  return (
    <Container
      style={{
        animationDelay: `${ANIMATION_DELAY + index * ANIMATION_INTERVAL}s`,
        ...(index === 0
          ? { gridTemplateAreas: `'image' 'title' 'divider' 'songs'`, gridTemplateColumns: '1fr' }
          : {}),
      }}
    >
      <Image
        style={index === 0 ? { width: '100%', margin: 'auto' } : {}}
        className='blurry-load'
        src={release.coverTiny}
        data-large={index === 0 ? release.cover : release.coverSmall}
        alt={release.title}
        onclick={() => onSongClick(release.songs[0])}
      />
      <TitleAndLinks>
        <TitleAndPlayButton>
          <div onClick={() => onSongClick(release.songs[0])}>
            <PlayPause playing={!!release.songs.find(s => s.fileName === songPlaying)} size={30} />
          </div>
          <Title
            href={singleSongMode() ? null : `/${release.slug}`}
            onClick={singleSongMode() ? () => onSongClick(release.songs[0]) : null}
          >
            {release.title}
          </Title>
        </TitleAndPlayButton>
        <Links>
          <Link name='Spotify' Icon={Spotify} href={release.spotify} newWindow />
          <Link name='SoundCloud' Icon={SoundCloud} href={release.soundcloud} newWindow />
          <Link name='YouTube' Icon={YouTube} href={release.youtube} newWindow />
          <Link name='Apple' Icon={Apple} href={release.apple} newWindow />
          {!singleSongMode() && <Link name='Share' Icon={Share} href={`/${release.slug}`} />}
        </Links>
      </TitleAndLinks>
      <Divider />
      <Songs>
        {release.songs.map((song, i) => (
          <Song
            song={song}
            index={i}
            hovering={hovering === i}
            playing={songPlaying === song.fileName}
            pointerenter={() => setHovering(i)}
            pointerleave={() => setHovering(null)}
            onclick={() => onSongClick(song)}
          />
        ))}
      </Songs>
    </Container>
  )
}

const Container = styled(
  'div',
  {
    display: 'grid',
    gap: '20px',
    color: TEXT_COLOR,
    margin: '0 20px',

    opacity: '0',
    animationName: 'fade-in',
    animationDuration: '2s',
    animationFillMode: 'forwards',
  },
  css`
    grid-template-columns: ${IMAGE_SIZE}px 1fr;
    grid-template-areas: 'image title' 'divider divider' 'songs songs';

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'image' 'title' 'divider' 'songs';
    }
  `
)

const Image = styled('img', {
  gridArea: 'image',
  width: `${IMAGE_SIZE}px`,
  maxWidth: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  borderRadius: `${BORDER_RADIUS}px`,
  boxShadow: BOX_SHADOW,
  cursor: 'pointer',
})

const TitleAndLinks = styled('div', {
  gridArea: 'title',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const TitleAndPlayButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
})

const Title = styled(
  'a',
  {
    fontSize: '30px',
    letterSpacing: '-1px',
    fontWeight: '500',
    color: TEXT_COLOR,
  },
  css`
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `
)

const Links = styled(
  'div',
  {
    display: 'flex',
    flexWrap: 'wrap',
    opacity: '0.9',
  },
  css`
    & > * {
      margin-left: -10px;
      margin-right: 10px;
    }
  `
)

const Divider = styled('div', {
  gridArea: 'divider',
  width: '100%',
  height: '1px',
  backgroundColor: TEXT_COLOR,
  opacity: '0.8',
})

const Songs = styled('div', {
  gridArea: 'songs',
  display: 'flex',
  flexDirection: 'column',
})
