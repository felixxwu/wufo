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

function Link(link: string | undefined, Icon: (props: IconProps) => JSX.Element) {
    if (!link) return null
    const iconSize = 30
    const linkProps = {
        style: { width: `${iconSize}px`, height: `${iconSize}px`, cursor: 'pointer' },
        color: colors.text,
    }
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
}) {
    const [lastPlayed, setLastPlayed] = useState(0)

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

    return (
        <Wrapper
            {...props}
            style={{ animationDelay: props.animationDelay + 'ms', animationFillMode: 'forwards' }}
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
        release.hue === null ? '#333' : `hsl(${release.hue}, 30%, 30%)`};
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
    width: ${consts.coverArtSize}px;
    height: ${consts.coverArtSize}px;
    border-radius: ${consts.borderRadius}px;

    @media (max-width: ${consts.mobileViewWidth}px) {
        width: 100%;
        height: 100%;
    }
`

const ImgCover = styled('img')`
    grid-area: cover;
    border-radius: ${consts.borderRadius}px;

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
    left: ${CARD_PADDING}px;
    top: ${CARD_PADDING}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${consts.coverArtSize}px;
    height: ${consts.coverArtSize}px;
    background-color: #000000c1;
    border-radius: ${consts.borderRadius}px;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`
