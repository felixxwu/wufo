import styled from 'styled-components'
import { consts } from '../lib/consts'
import { useEffect, useRef, useState } from 'react'
import { Pause } from '../icons/pause'
import { colors } from '../lib/colors'
import { Play } from '../icons/play'
import { Prev } from '../icons/prev'
import { Next } from '../icons/next'
import { useControls } from './useControls'

export function PlayerControls(props: {
    songName: string
    playing: boolean
    isLastPlayed: boolean
    playbackProgress: number
    loadedProgress: number
    onSeek: (percent: number) => void
    onPlayPause: () => void
    controls: ReturnType<typeof useControls>
}) {
    const slider = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const progressIsNearStart = props.playbackProgress < consts.startOfSongThreshold
    const showPrevButton = props.controls.prevSongPlayable() || !progressIsNearStart

    useEffect(() => {
        function handlePointerDown(e: PointerEvent) {
            if (e.target !== slider.current) return
            setIsDragging(true)
            handlePointerSeek(e)
        }
        function handlePointerMove(e: PointerEvent) {
            if (!isDragging) return
            handlePointerSeek(e)
        }
        function handlePointerUp() {
            setIsDragging(false)
        }

        window.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointercancel', handlePointerUp)
        window.addEventListener('pointerleave', handlePointerUp)
        window.addEventListener('blur', handlePointerUp)

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
            window.removeEventListener('pointerleave', handlePointerUp)
            window.removeEventListener('blur', handlePointerUp)
        }
    }, [isDragging])

    function handlePointerSeek(e: PointerEvent) {
        const sliderRect = slider.current!.getBoundingClientRect()
        const percent = (e.clientX - sliderRect.left) / sliderRect.width
        const clampedPercent = Math.max(0, Math.min(1, percent))
        props.onSeek(clampedPercent)
    }

    const handlePlayPrev = () => {
        if (progressIsNearStart) {
            props.controls.playPrev()
        } else {
            props.onSeek(0)
        }
    }

    return (
        <Wrapper style={{ display: props.isLastPlayed ? '' : 'none' }}>
            <div>{props.songName}</div>
            <Slider ref={slider} onClick={() => {}}>
                <SliderBarBG />
                <SliderBarLoaded style={{ width: `${props.loadedProgress * 100}%` }} />
                <SliderBarProgress style={{ width: `${props.playbackProgress * 100}%` }} />
                <SliderThumb style={{ left: `${props.playbackProgress * 100}%` }} />
            </Slider>
            <Buttons>
                <div
                    onClick={handlePlayPrev}
                    style={{
                        pointerEvents: showPrevButton ? 'auto' : 'none',
                    }}
                >
                    <Prev
                        color={colors.text}
                        style={{
                            width: `${smallIconSize}px`,
                            opacity: showPrevButton ? 1 : 0.2,
                        }}
                    />
                </div>
                <PlayPauseButton
                    onClick={() => {
                        props.controls.currentlyPlaying()
                            ? props.controls.pause()
                            : props.controls.play()
                    }}
                >
                    {props.playing ? (
                        <Pause color={colors.textDark} style={{ width: `${largeIconSize}px` }} />
                    ) : (
                        <Play color={colors.textDark} style={{ width: `${largeIconSize}px` }} />
                    )}
                </PlayPauseButton>
                <div
                    onClick={props.controls.playNext}
                    style={{ pointerEvents: props.controls.nextSongPlayable() ? 'auto' : 'none' }}
                >
                    <Next
                        color={colors.text}
                        style={{
                            width: `${smallIconSize}px`,
                            opacity: props.controls.nextSongPlayable() ? 1 : 0.2,
                        }}
                    />
                </div>
            </Buttons>
        </Wrapper>
    )
}

const margin = 30
const thumbSize = 15
const sliderHeight = 15
const barPositionFromTop = 7
const largeIconSize = 30
const smallIconSize = 15

const Wrapper = styled('div')`
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    flex-direction: column;
    position: fixed;
    bottom: ${margin}px;
    width: 400px;
    max-width: calc(100% - ${margin * 2}px);
    backdrop-filter: blur(30px) brightness(60%);
    border-radius: ${consts.borderRadius}px;
    box-shadow: ${consts.shadow};

    & * {
        touch-action: none;
    }
`

const Slider = styled('div')`
    pointer-events: all;
    position: relative;
    width: 100%;
    height: ${sliderHeight}px;
    cursor: pointer;
`

const SliderThumb = styled('div')`
    position: absolute;
    width: ${thumbSize}px;
    height: ${thumbSize}px;
    background-color: ${colors.text};
    border-radius: 50%;
    margin-left: ${-thumbSize / 2}px;
`

const SliderBarProgress = styled('div')`
    margin-top: ${barPositionFromTop}px;
    position: absolute;
    height: 2px;
    background-color: ${colors.text};
`

const SliderBarLoaded = styled('div')`
    margin-top: ${barPositionFromTop}px;
    position: absolute;
    height: 2px;
    background-color: #8a8a8a;
`

const SliderBarBG = styled('div')`
    position: absolute;
    width: 100%;
    margin-top: ${barPositionFromTop}px;
    height: 2px;
    background-color: #424242;
`

const Buttons = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    & > * {
        pointer-events: all;
        cursor: pointer;
    }
`

const PlayPauseButton = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${colors.text};
`
