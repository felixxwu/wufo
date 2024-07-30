import { useState } from 'preact/hooks'
import {
  BORDER_RADIUS,
  BORDER_RADIUS_LARGE,
  BOX_SHADOW,
  BOX_SHADOW_LARGE,
  QUICK_TRANSITION,
  TEXT_COLOR,
  TRANSITION,
} from '../lib/consts'
import { IRelease, ISong } from '../lib/types'
import { SONG_HEIGHT, Song } from './Song'
import { singleSongMode } from '../lib/singleSongMode'
import { styled } from 'goober'
import { getReleaseColourDark } from '../lib/getReleaseColourDark'
import { songPlaying as songPlayingSignal } from '../lib/signals'
import { ButtonLinks, LINKS_HEIGHT } from './ButtonLinks'

const LARGE_IMAGE_SIZE = 300
const IMAGE_SIZE = 130
const SMALL_IMAGE_SIZE = 50
const GRID_GAP = 20
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
  const thisReleasePlaying = !!release.songs.find(
    s => s.fileName === songPlayingSignal.value.fileName
  )
  const releaseImageSize = singleSongMode()
    ? LARGE_IMAGE_SIZE
    : thisReleasePlaying
    ? IMAGE_SIZE
    : SMALL_IMAGE_SIZE
  const latestRelease = index === 0 && !singleSongMode()
  const expanded = thisReleasePlaying || singleSongMode()
  const releaseHeight = expanded
    ? releaseImageSize +
      release.songs.length * SONG_HEIGHT +
      GRID_GAP * 2 +
      LINKS_HEIGHT +
      (singleSongMode() ? 100 : 0)
    : releaseImageSize

  return (
    <Container
      {...(!thisReleasePlaying && { onClick: () => onSongClick(release.songs[0]) })}
      style={{
        animationDelay: `${ANIMATION_DELAY + index * ANIMATION_INTERVAL}s`,
        height: releaseHeight,
        gridTemplateAreas: singleSongMode()
          ? `'image' 'title' 'songs' 'links'`
          : `'image title' 'songs songs' 'links links'`,
        gridTemplateColumns: singleSongMode() ? '1fr' : `${releaseImageSize}px 1fr`,
        gridTemplateRows: singleSongMode()
          ? `${releaseImageSize}px 1fr auto ${LINKS_HEIGHT}px`
          : `${releaseImageSize}px auto ${LINKS_HEIGHT}px`,
        backgroundColor: thisReleasePlaying ? getReleaseColourDark(release) : 'black',
        cursor: thisReleasePlaying ? 'default' : 'pointer',
      }}
    >
      <ImageContainer
        style={{
          backgroundColor: `rgb(${release?.color.join(', ')})`,
          backgroundImage: `url("${release.coverTiny}")`,
          width: `${releaseImageSize}px`,
          height: `${releaseImageSize}px`,
        }}
      >
        <Image
          src={release.coverSmall}
          alt={release.title}
          onclick={() => onSongClick(release.songs[0])}
          style={{
            width: `${releaseImageSize}px`,
            height: `${releaseImageSize}px`,
            borderRadius: `${expanded ? BORDER_RADIUS_LARGE : BORDER_RADIUS}px`,
          }}
        />
      </ImageContainer>
      <TitleAndLinks>
        <TitleAndPlayButton>
          <Title
            onClick={() => onSongClick(release.songs[0])}
            style={{
              ...(singleSongMode() ? { textDecoration: 'none' } : {}),
              fontSize: thisReleasePlaying ? `${50 - release.title.length * 0.6}px` : '16px',
              letterSpacing: thisReleasePlaying ? '-1px' : '0',
            }}
          >
            {release.title}
          </Title>
        </TitleAndPlayButton>
        <Meta>
          {release.songs.length === 1 ? 'Single' : 'EP'} •{' '}
          {latestRelease ? 'Latest Release' : release.year} • {release.songs.length} song
          {release.songs.length === 1 ? '' : 's'}
        </Meta>
      </TitleAndLinks>
      <Songs className='songs'>
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
      <Links>
        <ButtonLinks release={release} />
      </Links>
    </Container>
  )
}

const Container = styled('div')`
  display: grid;
  gap: ${GRID_GAP}px;
  color: ${TEXT_COLOR};
  margin: 0 3px;
  padding: 20px;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  overflow: hidden;
  transition: ${TRANSITION};
  opacity: 0;
  box-shadow: ${BOX_SHADOW};

  animation-name: fade-in;
  animation-duration: 2s;
  animation-fill-mode: forwards;
`

const Meta = styled('div')`
  opacity: 0.8;
  place-self: bottom;
`

const ImageContainer = styled('div')`
  grid-area: image;
  border-radius: ${BORDER_RADIUS}px;
  background-size: cover;
  transition: ${TRANSITION};
  place-self: center;
`

const Image = styled('img')`
  max-width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  cursor: pointer;
  transition: box-shadow ${QUICK_TRANSITION};
  display: block;
  transition: ${TRANSITION};

  box-shadow: ${BOX_SHADOW};

  &:hover {
    box-shadow: ${BOX_SHADOW_LARGE};
  }
`

const TitleAndLinks = styled('div')`
  grid-area: title;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`

const TitleAndPlayButton = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const Title = styled('a')`
  letter-spacing: -1px;
  font-weight: 500;
  color: ${TEXT_COLOR};
  text-decoration: none;
  transition: ${TRANSITION};
  word-wrap: break-word;
  width: 100%;
  line-height: 1;
`

const Songs = styled('div')`
  grid-area: songs;
  display: flex;
  flex-direction: column;
`

const Links = styled('div')`
  grid-area: links;
`
