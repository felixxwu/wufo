import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Play } from '../icons/play'
import { Pause } from '../icons/pause'
import { colors } from '../lib/colors'
import { consts } from '../lib/consts'
import { flex } from '../lib/flex'
import { Song } from '../lib/types'
import { PlayerControls } from './PlayerControls'
import { createPortal } from 'react-dom'
import { LastPlayed } from './initialStateValues'
import { useControls } from './useControls'

export function TrackWidget(props: {
    song: Song
    releaseIndex: number
    songIndex: number
    hue: number
    playing: boolean
    lastPlayed: LastPlayed
    onPlayChange: (playing: boolean) => void
    onTrackEnd: () => void
    controls: ReturnType<typeof useControls>
}) {
    const iframe = useRef<HTMLIFrameElement>(null)
    const [playbackProgress, setPlaybackProgress] = useState(0)
    const [loadProgress, setLoadProgress] = useState(0)

    const isLastPlayed =
        props.releaseIndex === props.lastPlayed.releaseIndex &&
        props.songIndex === props.lastPlayed.songIndex

    useEffect(() => {
        if (!iframe.current) return
        window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.PAUSE, () => {
            props.onPlayChange(false)
        })
        window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.PLAY_PROGRESS, e => {
            setPlaybackProgress(e.relativePosition)
            setLoadProgress(e.loadedProgress)
        })
        window.SC.Widget(iframe.current).bind(window.SC.Widget.Events.FINISH, () => {
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

    function handleSeek(percent: number) {
        if (!iframe.current) return
        window.SC.Widget(iframe.current).getDuration(length => {
            window.SC.Widget(iframe.current!).seekTo(percent * length)
        })
    }

    function handlePlayPause() {
        if (!props.onPlayChange) return

        if (props.playing) {
            props.onPlayChange(false)
        } else {
            props.onPlayChange(true)
        }
    }

    const mainContent = document.getElementById('main-content')

    return (
        <>
            <Wrapper
                key={props.song.title}
                onClick={handlePlayPause}
                style={{
                    pointerEvents: props.song.link ? 'auto' : 'none',
                    color: props.playing ? colors.text : colors.textSecondary,
                    backgroundColor: isLastPlayed ? colors.highlight : '',
                }}
            >
                {props.song.link &&
                    (props.playing ? (
                        <Pause color={colors.text} style={{ width: '12px' }} />
                    ) : (
                        <Play color={colors.text} style={{ width: '12px' }} />
                    ))}
                {props.song.title}
            </Wrapper>

            {props.song.link && (
                <IFrame>
                    <iframe
                        style={{ pointerEvents: 'none' }}
                        ref={iframe}
                        tabIndex={-1}
                        width='100%'
                        height='20'
                        scrolling='no'
                        frameBorder='no'
                        allow='autoplay'
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                            props.song.link
                        )}&color=%000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                    ></iframe>
                </IFrame>
            )}

            {mainContent &&
                createPortal(
                    <PlayerControls
                        songName={props.song.title}
                        playing={props.playing}
                        isLastPlayed={isLastPlayed}
                        playbackProgress={playbackProgress}
                        loadedProgress={loadProgress}
                        onSeek={handleSeek}
                        onPlayPause={handlePlayPause}
                        controls={props.controls}
                    />,
                    mainContent
                )}
        </>
    )
}

const TRACK_HEIGHT = 45

const Wrapper = styled(flex)`
    justify-content: flex-start;
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

const IFrame = styled(flex)`
    display: none;
    width: calc(100% + 110px);
    height: ${TRACK_HEIGHT}px;
    padding: 0 10px;
`
