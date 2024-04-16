import { useState } from 'preact/hooks'
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  BOX_SHADOW_LARGE,
  QUICK_TRANSITION,
  TEXT_COLOR,
} from '../lib/consts'
import { IRelease, ISong } from '../lib/types'
import { PlayPause } from './PlayPause'
import { Song } from './Song'
import { Link } from './Link'
import { Spotify } from '../icons/spotify'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { Share } from '../icons/share'
import { singleSongMode } from '../lib/singleSongMode'
import styled from 'styled-components'

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
      <ImageContainer
        style={{
          backgroundColor: `rgb(${release?.color.join(', ')})`,
          backgroundImage: `url("${release.coverTiny}")`,
          backgroundSize: 'cover',
          ...(index === 0 ? { width: '100%' } : {}),
        }}
      >
        <Image
          style={index === 0 ? { width: '100%', margin: 'auto' } : {}}
          src={index === 0 ? release.cover : release.coverSmall}
          alt={release.title}
          onclick={() => onSongClick(release.songs[0])}
        />
      </ImageContainer>
      <TitleAndLinks>
        <TitleAndPlayButton>
          <div onClick={() => onSongClick(release.songs[0])}>
            <PlayPause playing={!!release.songs.find(s => s.fileName === songPlaying)} size={30} />
          </div>
          <Title
            href={singleSongMode() ? null : `/${release.slug}`}
            onClick={singleSongMode() ? () => onSongClick(release.songs[0]) : null}
            style={singleSongMode() ? { textDecoration: 'none' } : {}}
          >
            {release.title}
          </Title>
        </TitleAndPlayButton>
        <Links>
          <Link
            name='Spotify'
            Icon={Spotify}
            href={release.spotify}
            newWindow
            ariaLabel='Spotify'
          />
          <Link
            name='SoundCloud'
            Icon={SoundCloud}
            href={release.soundcloud}
            newWindow
            ariaLabel='SoundCloud'
          />
          <Link
            name='YouTube'
            Icon={YouTube}
            href={release.youtube}
            newWindow
            ariaLabel='YouTube'
          />
          <Link name='Apple' Icon={Apple} href={release.apple} newWindow ariaLabel='Apple' />
          {!singleSongMode() && (
            <Link name='Share' Icon={Share} href={`/${release.slug}`} ariaLabel='Share' />
          )}
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

const Container = styled.div`
  display: grid;
  gap: 20px;
  color: ${TEXT_COLOR};
  margin: 0 20px;

  opacity: 0;
  animation-name: fade-in;
  animation-duration: 2s;
  animation-fill-mode: forwards;

  grid-template-columns: ${IMAGE_SIZE}px 1fr;
  grid-template-areas: 'image title' 'divider divider' 'songs songs';

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'image' 'title' 'divider' 'songs';
  }
`

const ImageContainer = styled.div`
  grid-area: image;
  border-radius: ${BORDER_RADIUS}px;
  width: ${IMAGE_SIZE}px;
`

const Image = styled.img`
  width: ${IMAGE_SIZE}px;
  max-width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  transition: box-shadow ${QUICK_TRANSITION};
  display: block;

  box-shadow: ${BOX_SHADOW};

  &:hover {
    box-shadow: ${BOX_SHADOW_LARGE};
  }
`

const TitleAndLinks = styled.div`
  grid-area: title;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TitleAndPlayButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const Title = styled.a`
  font-size: 30px;
  letter-spacing: -1px;
  font-weight: 500;
  color: ${TEXT_COLOR};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  opacity: 0.9;

  & > * {
    margin-left: -10px;
    margin-right: 10px;
  }
`

const Divider = styled.div`
  grid-area: divider;
  width: 100%;
  height: 1px;
  background-color: ${TEXT_COLOR};
  opacity: 0.8;
`

const Songs = styled.div`
  grid-area: songs;
  display: flex;
  flex-direction: column;
`
