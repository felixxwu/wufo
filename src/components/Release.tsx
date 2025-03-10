import { useEffect, useState } from 'react'
import {
  BG_DARK,
  BG_HIGHTLIGHT,
  BORDER_RADIUS,
  BORDER_RADIUS_LARGE,
  BOX_SHADOW,
  BOX_SHADOW_LARGE,
  MOBILE_CUTOFF,
  QUICK_TRANSITION,
  TEXT_COLOR,
  TRANSITION,
} from '../lib/consts'
import { IRelease, ISong } from '../lib/types'
import { Song, SONG_HEIGHT } from './Song'
import { singleSongMode } from '../lib/singleSongMode'
import { styled } from 'goober'
import { getReleaseColourDarkTransparent } from '../lib/getReleaseColourDark'
import { ButtonLinks } from './ButtonLinks'
import { Slider, SLIDER_HEIGHT } from './Slider'
import { useLargeTitleFontSize } from '../lib/useLargeTitleFontSize.ts'
import { useExpandedReleases, usePlaying, useScreenWidth, useSongPlaying } from '../lib/signals'
import { PlayingAnimation } from './PlayingAnimation.tsx'

const LARGE_IMAGE_SIZE = 300
export const IMAGE_SIZE = 130
export const SIDE_MARGIN = 3
const SMALL_IMAGE_SIZE = 50
export const GRID_GAP = 20
const EXTRA_SSM_HEIGHT = 100
const NUM_GRID_GAPS = 3
export const ANIMATION_INTERVAL = 0.1
export const ANIMATION_DELAY = 1.5

export function Release({
  release,
  index,
  onSongClick,
}: {
  release: IRelease
  index: number
  onSongClick: (song: ISong) => void
}) {
  const screenWidth = useScreenWidth.value()
  const playing = usePlaying.value()
  const songPlaying = useSongPlaying.value()
  const expandedReleases = useExpandedReleases.value()

  const [, setAfterInitialRender] = useState(false)
  const linksHeight = screenWidth < MOBILE_CUTOFF ? 90 : 45
  const [hovering, setHovering] = useState<number | null>(null)
  const largeFontSize = useLargeTitleFontSize(release.title)

  const expanded = !!expandedReleases.find(r => r.title === release.title) || singleSongMode()
  const releaseImageSize = getReleaseImageSize(expanded)
  const latestRelease = index === 0 && !singleSongMode()
  const releaseHeight = useReleaseHeight(release, expanded)
  const thisReleasePlaying = release.songs.includes(songPlaying)
  const showPlayingAnimation = !expanded && thisReleasePlaying && playing

  const setReleaseOpen = (open: boolean) => {
    if (open) {
      useExpandedReleases.set([release])
      if (!playing) {
        onSongClick(release.songs[0])
      }
    } else {
      useExpandedReleases.set([])
    }
  }

  useEffect(() => {
    setAfterInitialRender(true)
  }, [])

  useEffect(() => {
    if (release.songs.includes(songPlaying) && playing) {
      setReleaseOpen(true)
    }
  }, [songPlaying, playing])

  return (
    <Container
      {...(!expanded && { onClick: () => setReleaseOpen(true) })}
      expanded={expanded}
      index={index}
      releaseColor={getReleaseColourDarkTransparent(release)}
      releaseHeight={releaseHeight}
      releaseImageSize={releaseImageSize}
      linksHeight={linksHeight}
      showPlayingAnimation={showPlayingAnimation}
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
          src={expanded ? release.cover : release.coverSmall}
          alt={release.title}
          onClick={() => setReleaseOpen(!expanded)}
          style={{
            width: `${releaseImageSize}px`,
            height: `${releaseImageSize}px`,
            borderRadius: `${expanded ? BORDER_RADIUS_LARGE : BORDER_RADIUS}px`,
          }}
        />
      </ImageContainer>
      <TitleAndLinks onClick={() => setReleaseOpen(!expanded)}>
        <Title
          style={{
            fontSize: expanded ? `${largeFontSize}px` : '16px',
            letterSpacing: expanded ? '-1px' : '0',
          }}
        >
          {release.title}
        </Title>
        <Meta>
          {release.songs.length <= 2 ? 'Single' : 'EP'} •{' '}
          {latestRelease ? 'Latest Release' : release.year} • {release.songs.length} song
          {release.songs.length === 1 ? '' : 's'}
        </Meta>
      </TitleAndLinks>

      {!singleSongMode() && showPlayingAnimation && (
        <PlayingAnimationContainer>
          <PlayingAnimation />
        </PlayingAnimationContainer>
      )}
      <SliderWrapper>
        <Slider release={release} />
      </SliderWrapper>
      <Songs className='songs'>
        {release.songs.map((song, i) => (
          <Song
            key={i}
            song={song}
            index={i}
            hovering={hovering === i}
            pointerenter={() => setHovering(i)}
            pointerleave={() => setHovering(null)}
            onclick={() => onSongClick(song)}
          />
        ))}
      </Songs>
      <Links>
        {release.releaseDate ? (
          <ReleaseDate>Release Date: {release.releaseDate}</ReleaseDate>
        ) : (
          <ButtonLinks release={release} />
        )}
      </Links>
    </Container>
  )
}

export const useReleaseHeight = (release: IRelease, expanded: boolean) => {
  const screenWidth = useScreenWidth.value()
  const linksHeight = screenWidth < MOBILE_CUTOFF ? 90 : 45
  return expanded
    ? getReleaseImageSize(expanded) +
        release.songs.length * SONG_HEIGHT +
        GRID_GAP * NUM_GRID_GAPS +
        linksHeight +
        SLIDER_HEIGHT +
        (singleSongMode() ? EXTRA_SSM_HEIGHT : 0)
    : getReleaseImageSize(expanded)
}

export const getReleaseImageSize = (expanded: boolean) =>
  singleSongMode() ? LARGE_IMAGE_SIZE : expanded ? IMAGE_SIZE : SMALL_IMAGE_SIZE

const Container = styled('div')<{
  expanded: boolean
  index: number
  releaseColor: string
  releaseHeight: number
  releaseImageSize: number
  linksHeight: number
  showPlayingAnimation: boolean
}>`
  animation-delay: ${({ index }) =>
    `${singleSongMode() ? 0 : ANIMATION_DELAY + index * ANIMATION_INTERVAL}s`};
  height: ${({ releaseHeight }) => releaseHeight}px;
  grid-template-areas: ${({ showPlayingAnimation }) =>
    singleSongMode()
      ? `'image' 'title' 'slider' 'songs' 'links'`
      : showPlayingAnimation
        ? `'image title animation' 'slider slider slider' 'songs songs songs' 'links links links'`
        : `'image title' 'slider slider' 'songs songs' 'links links'`};
  grid-template-columns: ${({ releaseImageSize }) =>
    singleSongMode() ? '1fr' : `${releaseImageSize}px 1fr`};
  grid-template-rows: ${({ releaseImageSize, linksHeight }) =>
    singleSongMode()
      ? `${releaseImageSize}px 1fr auto auto ${linksHeight}px`
      : `${releaseImageSize}px auto auto ${linksHeight}px`};
  background-color: ${({ expanded, releaseColor }) => (expanded ? releaseColor : BG_DARK)};
  cursor: ${({ expanded }) => (expanded ? 'default' : 'pointer')};

  display: grid;
  gap: ${GRID_GAP}px;
  color: ${TEXT_COLOR};
  margin: 0 ${SIDE_MARGIN}px;
  padding: ${GRID_GAP}px;
  border-radius: ${BORDER_RADIUS_LARGE}px;
  overflow: hidden;
  transition: ${TRANSITION};
  opacity: 0;
  box-shadow: ${BOX_SHADOW};
  outline: 1px solid #292929;

  animation-name: fade-in;
  animation-duration: 2s;
  animation-fill-mode: forwards;

  &:hover {
    background-color: ${({ expanded, releaseColor }) => (expanded ? releaseColor : BG_HIGHTLIGHT)};
  }
`

const Meta = styled('div')`
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ReleaseDate = styled('div')`
  opacity: 0.8;
  width: 100%;
  text-align: center;
`

const ImageContainer = styled('div')`
  grid-area: image;
  border-radius: ${BORDER_RADIUS_LARGE}px;
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

const PlayingAnimationContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${TRANSITION};
  pointer-events: none;
`

const TitleAndLinks = styled('div')`
  grid-area: title;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`

const Title = styled('span')`
  letter-spacing: -1px;
  font-weight: 500;
  color: ${TEXT_COLOR};
  text-decoration: none;
  transition: ${TRANSITION};
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
  place-self: center;
  width: 100%;
`

const SliderWrapper = styled('div')`
  grid-area: slider;
  padding: 0 20px;
`
