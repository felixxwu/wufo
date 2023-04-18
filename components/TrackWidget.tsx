import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Play } from '../icons/play'
import { colors } from '../lib/colors'
import { consts } from '../lib/consts'
import { flex } from '../lib/flex'
import { Song } from '../lib/types'

export function TrackWidget(props: {
    song: Song
    trackNumber: number
    hue: number
    playing: boolean
    onPlayChange: (playing: boolean) => void
    onTrackEnd: () => void
}) {
    const iframe = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        if (!iframe.current) return
        window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.PAUSE, () => {
            console.log(`PAUSE`)
            props.onPlayChange(false)
        })
        window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.FINISH, () => {
            console.log(`FINISH`)
            props.onTrackEnd()
        })
    }, [])

    useEffect(() => {
        if (!iframe.current) return
        if (props.playing) {
            window.SC.Widget(iframe.current).play()
        } else {
            window.SC.Widget(iframe.current).pause()
        }
    }, [props.playing])

    function handleClick() {
        props.onPlayChange(true)
    }

    if (props.song.link) {
        return (
            <Clip onClick={handleClick} playing={props.playing}>
                <IFrame hue={props.hue}>
                    <iframe
                        ref={iframe}
                        style={{ pointerEvents: props.playing ? 'auto' : 'none' }}
                        width='100%'
                        height='20'
                        scrolling='no'
                        frameBorder='no'
                        allow='autoplay'
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                            props.song.link
                        )}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                    ></iframe>
                </IFrame>
            </Clip>
        )
    } else {
        return (
            <Wrapper
                key={props.song.title}
                onClick={() => props.onPlayChange && props.onPlayChange(true)}
                style={{ pointerEvents: props.song.link ? 'auto' : 'none' }}
            >
                {props.song.link && <Play color={colors.text} style={{ width: '12px' }} />}
                {props.song.title}
            </Wrapper>
        )
    }
}

const TRACK_HEIGHT = 45

const Wrapper = styled(flex)`
    justify-content: flex-start;
    color: ${colors.textSecondary};
    gap: 10px;
    width: 100%;
    padding: 0 10px;
    height: ${TRACK_HEIGHT}px;
    cursor: pointer;
    transition: ${consts.shortTransition}ms;
    border-radius: ${consts.borderRadiusSmall}px;

    &:hover {
        background-color: ${colors.highlight};
    }
`

const Clip = styled.div<{ playing: boolean }>`
    width: 100%;
    overflow: hidden;
    border-radius: ${consts.borderRadiusSmall}px;
    cursor: pointer;

    &:hover {
        background-color: ${({ playing }) => (playing ? 'transparent' : colors.highlight)};
    }
`

const IFrame = styled(flex)<{ hue: number }>`
    filter: invert() hue-rotate(${({ hue }) => (hue ?? 0) + 170}deg) contrast(1.5) brightness(1)
        saturate(50%);
    width: calc(100% + 110px);
    height: ${TRACK_HEIGHT}px;
    padding: 0 10px;
`
