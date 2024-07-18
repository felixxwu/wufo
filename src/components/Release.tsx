import { useState } from 'preact/hooks'
import {
  BORDER_RADIUS,
  BORDER_RADIUS_LARGE,
  BOX_SHADOW,
  BOX_SHADOW_LARGE,
  QUICK_TRANSITION,
  TEXT_COLOR,
} from '../lib/consts'
import { IRelease, ISong } from '../lib/types'
import { PlayPause } from './PlayPause'
import { Song } from './Song'
import { singleSongMode } from '../lib/singleSongMode'
import { styled } from 'goober'
import { Links } from './Links'

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
          ? {
              backgroundColor: 'rgba(255,255,255,0.15)',
              boxShadow: BOX_SHADOW,
            }
          : {}),
      }}
    >
      {index === 0 && !singleSongMode() && <Notice>Latest Release</Notice>}
      <ImageContainer
        style={{
          backgroundColor: `rgb(${release?.color.join(', ')})`,
          backgroundImage: `url("${release.coverTiny}")`,
          backgroundSize: 'cover',
        }}
      >
        <Image
          src={release.coverSmall}
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
            onClick={() => onSongClick(release.songs[0])}
            style={singleSongMode() ? { textDecoration: 'none' } : {}}
          >
            {release.title}
          </Title>
        </TitleAndPlayButton>
        <Links release={release} />
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

const Container = styled('div')`
  display: grid;
  gap: 20px;
  color: ${TEXT_COLOR};
  padding: 20px;
  border-radius: ${BORDER_RADIUS_LARGE}px;

  opacity: 0;
  animation-name: fade-in;
  animation-duration: 2s;
  animation-fill-mode: forwards;

  grid-template-columns: ${IMAGE_SIZE}px 1fr;
  grid-template-areas: 'notice notice' 'image title' 'divider divider' 'songs songs';

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'notice' 'image' 'title' 'divider' 'songs';
  }
`

const Notice = styled('div')`
  grid-area: notice;
  opacity: 0.8;
`

const ImageContainer = styled('div')`
  grid-area: image;
  border-radius: ${BORDER_RADIUS}px;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`

const Image = styled('img')`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
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

const TitleAndLinks = styled('div')`
  grid-area: title;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TitleAndPlayButton = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const Title = styled('a')`
  font-size: 30px;
  letter-spacing: -1px;
  font-weight: 500;
  color: ${TEXT_COLOR};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Divider = styled('div')`
  grid-area: divider;
  width: 100%;
  height: 1px;
  background-color: ${TEXT_COLOR};
  opacity: 0.8;
`

const Songs = styled('div')`
  grid-area: songs;
  display: flex;
  flex-direction: column;
`
