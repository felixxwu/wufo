import styled from 'styled-components'
import { consts } from '../lib/consts'
import { useRef } from 'react'
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
    const handlePointerEvent = (e: React.PointerEvent) => {
        if (e.buttons !== 1) return
        const sliderRect = slider.current!.getBoundingClientRect()
        const isInsideSlider = e.clientY > sliderRect.top && e.clientY < sliderRect.bottom
        const percent = (e.clientX - sliderRect.left) / sliderRect.width
        const clampedPercent = Math.max(0, Math.min(1, percent))
        isInsideSlider && props.onSeek(clampedPercent)
    }

    const progressIsNearStart = props.playbackProgress < consts.startOfSongThreshold
    const showPrevButton = props.controls.prevSongPlayable() || !progressIsNearStart

    const handlePlayPrev = () => {
        if (progressIsNearStart) {
            props.controls.playPrev()
        } else {
            props.onSeek(0)
        }
    }

    return (
        <Wrapper
            onPointerDown={handlePointerEvent}
            onPointerMove={handlePointerEvent}
            style={{ display: props.isLastPlayed ? '' : 'none' }}
        >
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

const margin = 20
const thumbSize = 15
const sliderHeight = 15
const barPositionFromTop = 7
const largeIconSize = 30
const smallIconSize = 15

const Wrapper = styled('div')`
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
`

const Slider = styled('div')`
    position: relative;
    width: 100%;
    height: ${sliderHeight}px;
    cursor: pointer;
`

const SliderThumb = styled('div')`
    position: absolute;
    width: ${thumbSize}px;
    height: ${thumbSize}px;
    background-color: #fff;
    border-radius: 50%;
    margin-left: ${-thumbSize / 2}px;
`

const SliderBarProgress = styled('div')`
    margin-top: ${barPositionFromTop}px;
    position: absolute;
    height: 2px;
    background-color: #fff;
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
    background-color: #fff;
`