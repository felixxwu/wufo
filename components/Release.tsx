import Image from 'next/image'
import styled from 'styled-components'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { Spotify } from '../icons/spotify'
import { YouTube } from '../icons/youtube'
import { colors } from '../lib/colors'
import { consts } from '../lib/consts'
import { flex } from '../lib/flex'
import { IconProps, IRelease } from '../lib/types'
import { fadeInDown } from '../lib/keyframes'
import { TrackWidget } from './TrackWidget'
import { Play } from '../icons/play'
import { Pause } from '../icons/pause'
import { useState } from 'react'
import { LastPlayed } from './initialStateValues'
import { useControls } from './useControls'
import { Share } from '../icons/share'
import { Tick } from '../icons/tick'

const CARD_PADDING = 20
const largeIconSize = 15
const iconSize = 16
const linkProps = (release: IRelease) => ({
    style: { width: `${iconSize}px`, height: `${iconSize}px`, cursor: 'pointer' },
    color: consts.getReleaseColor(release.hue),
})

function Link(
    link: string | undefined,
    text: string,
    Icon: (props: IconProps) => JSX.Element,
    release: IRelease
) {
    if (!link) return null
    return (
        <Social
            style={{ backgroundColor: consts.getLighterReleaseColor(release.hue) }}
            href={link}
            target='_blank'
        >
            <Icon {...linkProps(release)} />
            {text}
        </Social>
    )
}

export function Release(props: {
    release: IRelease
    releaseIndex: number
    animationDelay: number
    playState: { songs: { playing: boolean }[] }
    lastPlayed: LastPlayed
    onPlayStateChange: (playing: boolean, index: number) => void
    onTrackEnd: (song: number) => void
    controls: ReturnType<typeof useControls>
}) {
    const [lastPlayed, setLastPlayed] = useState(0)
    const [shared, setShared] = useState(false)

    const isPlaying = props.playState.songs.some(song => song.playing)

    function handlePlayPause() {
        if (isPlaying) {
            props.onPlayStateChange(false, lastPlayed)
        } else {
            props.onPlayStateChange(true, lastPlayed)
        }
    }

    function handleTrackPlayStateChange(playing: boolean, index: number) {
        props.onPlayStateChange(playing, index)
        if (playing) {
            setLastPlayed(index)
        }
    }

    function handleShare() {
        navigator.clipboard.writeText('https://wufo.uk/' + props.release.slug)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
    }

    return (
        <Wrapper
            {...props}
            style={{
                animationDelay: props.animationDelay + 'ms',
                animationFillMode: 'forwards',
                filter: isPlaying ? 'invert(1)' : '',
            }}
            onClick={handlePlayPause}
        >
            <ImgWrapper
                style={{
                    filter: isPlaying ? 'invert(1)' : '',
                }}
            >
                {!props.release.releaseDate && (
                    <HoverPlayIcon>
                        {isPlaying ? (
                            <Pause color={colors.text} style={{ scale: '2' }} />
                        ) : (
                            <Play color={colors.text} style={{ scale: '2' }} />
                        )}
                    </HoverPlayIcon>
                )}

                {typeof props.release.cover === 'string' ? (
                    <ImgCover
                        src={props.release.cover}
                        width={consts.coverArtSize}
                        height={consts.coverArtSize}
                    />
                ) : (
                    <Cover src={props.release.cover} alt={props.release.title} />
                )}
            </ImgWrapper>

            <Songs>
                <Title
                    style={{
                        color: consts.getLighterReleaseColor(props.release.hue),
                    }}
                >
                    <PlayPauseButton
                        style={{
                            backgroundColor: consts.getLighterReleaseColor(props.release.hue),
                        }}
                    >
                        {isPlaying ? (
                            <Pause
                                color={consts.getReleaseColor(props.release.hue)}
                                style={{ width: `${largeIconSize}px` }}
                            />
                        ) : (
                            <Play
                                color={consts.getReleaseColor(props.release.hue)}
                                style={{ width: `${largeIconSize}px` }}
                            />
                        )}
                    </PlayPauseButton>
                    {props.release.title}
                </Title>
                <TrackWidgets>
                    {props.release.songs.map((song, i) => (
                        <TrackWidget
                            song={song}
                            releaseIndex={props.releaseIndex}
                            songIndex={i}
                            hue={props.release.hue ?? 0}
                            playing={props.playState.songs[i].playing}
                            lastPlayed={props.lastPlayed}
                            onPlayChange={playing => handleTrackPlayStateChange(playing, i)}
                            onTrackEnd={() => props.onTrackEnd(i)}
                            controls={props.controls}
                            hide={false}
                            key={i}
                        />
                    ))}
                </TrackWidgets>

                <Links onClick={e => e.stopPropagation()}>
                    {props.release.releaseDate ? (
                        <ReleaseDate>{props.release.releaseDate}</ReleaseDate>
                    ) : (
                        <>
                            {Link(props.release.spotify, 'Spotify', Spotify, props.release)}
                            {Link(
                                props.release.soundcloud,
                                'SoundCloud',
                                SoundCloud,
                                props.release
                            )}
                            {Link(props.release.apple, 'Apple', Apple, props.release)}
                            {Link(props.release.youtube, 'YouTube', YouTube, props.release)}
                            <Social
                                style={{
                                    backgroundColor: consts.getLighterReleaseColor(
                                        props.release.hue
                                    ),
                                }}
                                onClick={handleShare}
                            >
                                {shared ? (
                                    <Tick {...linkProps(props.release)} />
                                ) : (
                                    <Share {...linkProps(props.release)} />
                                )}
                                Copy Link
                            </Social>
                            {/* {shared && <CopiedNotification>Copied</CopiedNotification>} */}
                        </>
                    )}
                </Links>
            </Songs>
        </Wrapper>
    )
}

const Wrapper = styled('div')<Parameters<typeof Release>[0]>`
    display: grid;
    cursor: pointer;
    grid-template-areas: 'cover songs';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    padding: ${CARD_PADDING}px;
    width: 100%;
    background-color: ${({ release }) => consts.getReleaseColor(release.hue)};
    border-radius: ${consts.borderRadius}px;
    box-shadow: ${consts.shadow};
    gap: 20px;
    opacity: 0;
    animation: ${fadeInDown} 1s;

    @media (max-width: ${consts.mobileViewWidth}px) {
        grid-template-areas: 'cover' 'songs';
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
    }
`

const Cover = styled(Image)`
    grid-area: cover;
    border-radius: ${consts.borderRadius}px;
    width: 100%;
    height: 100%;
`

const ImgCover = styled('img')`
    width: 100%;
    height: 100%;
    grid-area: cover;
    border-radius: ${consts.borderRadius}px;
`

const ImgWrapper = styled('div')`
    position: relative;
    width: ${consts.coverArtSize}px;
    height: ${consts.coverArtSize}px;
    box-shadow: ${consts.shadow};
    border-radius: ${consts.borderRadius}px;

    @media (max-width: ${consts.mobileViewWidth}px) {
        width: 100%;
        height: 100%;
    }
`

const Songs = styled(flex)`
    grid-area: songs;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    flex: 1;
    gap: 10px;
    height: 100%;
`

const TrackWidgets = styled('div')`
    width: 100%;
`

const Title = styled(flex)`
    font-weight: 600;
    font-size: 18px;
    gap: 10px;
    padding-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    cursor: pointer;
`

const PlayPauseButton = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    background-color: ${colors.text};
`

const ReleaseDate = styled('em')`
    font-weight: 500;
`

const Links = styled(flex)`
    grid-area: links;
    padding-top: 5px;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: auto;
`

const Social = styled('a')`
    background-color: ${colors.text};
    color: ${colors.textDark};
    font-size: 13px;
    display: flex;
    padding: 4px 10px;
    gap: 5px;
    border-radius: ${consts.borderRadiusSmall}px;
    text-decoration: none;
    font-weight: normal;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    /* opacity: 0.8; */

    &:hover {
        filter: brightness(1.2);
    }
`

const HoverPlayIcon = styled('div')`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0000005c;
    border-radius: ${consts.borderRadius}px;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.2s;
    width: 100%;
    height: 100%;

    &:hover {
        opacity: 1;
    }
`

const CopiedNotification = styled('div')`
    position: absolute;
    translate: 100% 100%;
    background-color: ${colors.textSecondary};
    padding: 10px;
    border-radius: ${consts.borderRadius}px;
    color: ${colors.textDark};
    box-shadow: ${consts.shadow};
    font-weight: lighter;
`
