import Image from 'next/image'
import styled from 'styled-components'
import { AppleRound } from '../icons/apple-round'
import { SoundCloudRound } from '../icons/soundcloud-round'
import { SpotifyRound } from '../icons/spotify-round'
import { YouTubeRound } from '../icons/youtube-round'
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

const iconSize = 30
const linkProps = {
    style: { width: `${iconSize}px`, height: `${iconSize}px`, cursor: 'pointer' },
    color: colors.text,
}

function Link(link: string | undefined, Icon: (props: IconProps) => JSX.Element) {
    if (!link) return null
    return (
        <Social href={link} target='_blank'>
            <Icon {...linkProps} />
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
    hide: boolean
}) {
    const [lastPlayed, setLastPlayed] = useState(0)
    const [shared, setShared] = useState(false)

    function handlePlayPause() {
        if (props.playState.songs.some(song => song.playing)) {
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
                filter: props.playState.songs.some(song => song.playing) ? 'invert(1)' : '',
                display: props.hide ? 'none' : '',
            }}
        >
            <ImgWrapper
                style={{
                    filter: props.playState.songs.some(song => song.playing) ? 'invert(1)' : '',
                }}
            >
                {!props.release.releaseDate && (
                    <HoverPlayIcon onClick={handlePlayPause}>
                        {props.playState.songs.some(song => song.playing) ? (
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
                <Title>
                    {props.release.title}
                    <Links>
                        {props.release.releaseDate ? (
                            <ReleaseDate>{props.release.releaseDate}</ReleaseDate>
                        ) : (
                            <>
                                {Link(props.release.spotify, SpotifyRound)}
                                {Link(props.release.soundcloud, SoundCloudRound)}
                                {Link(props.release.apple, AppleRound)}
                                {Link(props.release.youtube, YouTubeRound)}
                                <Social onClick={handleShare}>
                                    {shared ? <Tick {...linkProps} /> : <Share {...linkProps} />}
                                </Social>
                                {shared && <CopiedNotification>Copied</CopiedNotification>}
                            </>
                        )}
                    </Links>
                </Title>
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
                        key={i}
                    />
                ))}
            </Songs>
        </Wrapper>
    )
}

const CARD_PADDING = 20

const Wrapper = styled('div')<Parameters<typeof Release>[0]>`
    display: grid;
    grid-template-areas: 'cover songs';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    padding: ${CARD_PADDING}px;
    width: 100%;
    background-color: ${({ release }) =>
        release.hue === null ? '#333' : `hsl(${release.hue}, 25%, 30%)`};
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
    @media (max-width: ${consts.mobileViewWidth}px) {
        width: 100%;
        height: 100%;
    }
`

const Songs = styled(flex)`
    grid-area: songs;
    align-items: flex-start;
    flex-direction: column;
    flex: 1;
`

const Title = styled(flex)`
    font-weight: 600;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`

const ReleaseDate = styled('em')`
    font-weight: 500;
`

const Links = styled(flex)`
    grid-area: links;
    gap: 10px;
`

const Social = styled('a')`
    &:hover {
        filter: brightness(2);
    }
`

const HoverPlayIcon = styled('div')`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000c1;
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
