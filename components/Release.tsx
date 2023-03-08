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

export function Release(props: { release: IRelease; animationDelay: number }) {
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

    return (
        <Wrapper
            {...props}
            style={{ animationDelay: props.animationDelay + 'ms', animationFillMode: 'forwards' }}
        >
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
                        trackNumber={i + 1}
                        hue={props.release.hue ?? 0}
                        key={i}
                    />
                ))}
            </Songs>
        </Wrapper>
    )
}

const Wrapper = styled('div')<Parameters<typeof Release>[0]>`
    display: grid;
    grid-template-areas: 'cover songs';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    padding: 20px;
    width: 100%;
    background-color: ${({ release }) =>
        release.hue === null ? '#333' : `hsl(${release.hue}, 50%, 35%)`};
    border-radius: ${consts.borderRadius}px;
    box-shadow: ${consts.shadow};
    gap: 20px;
    opacity: 0;
    animation: ${fadeInDown} 1s;

    @media (max-width: 600px) {
        grid-template-areas: 'cover' 'songs';
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
    }
`

const Cover = styled(Image)`
    grid-area: cover;
    margin: 0 auto;
    width: ${consts.coverArtSize}px;
    height: ${consts.coverArtSize}px;
    border-radius: ${consts.borderRadius}px;
`

const ImgCover = styled('img')`
    grid-area: cover;
    margin: 0 auto;
    border-radius: ${consts.borderRadius}px;
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
