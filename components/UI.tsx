import styled from 'styled-components'
import { consts } from '../lib/consts'
import { content } from '../lib/content'
import { flex } from '../lib/flex'
import { Header } from './Header'
import { Release } from './Release'
import { useEffect, useState } from 'react'
import { useControls } from './useControls'
import { initialStateValues } from './initialStateValues'

export function UI() {
    const [playState, setPlayState] = useState(initialStateValues.playState)
    const [lastPlayed, setLastPlayed] = useState(initialStateValues.lastPlayed)

    console.log(`playState`, playState)
    console.log(`lastPlayed`, lastPlayed)

    const { playPause, playNext, playPrev } = useControls(
        playState,
        setPlayState,
        lastPlayed,
        setLastPlayed
    )

    // useEffect(() => {
    //     const onkeydown = (e: KeyboardEvent) => {
    //         if (e.key === ' ') {
    //             playPause()
    //             e.preventDefault()
    //         }
    //         if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    //             playNext()
    //             e.preventDefault()
    //         }
    //         if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    //             playPrev()
    //             e.preventDefault()
    //         }
    //     }
    //     window.document.onkeydown = onkeydown
    // }, [playState])

    return (
        <Wrapper>
            <Content>
                <Header />
                {content.releases.map((release, releaseIndex) => (
                    <Release
                        release={release}
                        animationDelay={(releaseIndex + 1) * consts.releaseAnimationStaggerDelay}
                        playState={playState[releaseIndex]}
                        onPlayStateChange={(playing, index) => {
                            const newPlayState = [...playState]
                            newPlayState[releaseIndex].songs[index].playing = playing
                            playing && setLastPlayed({ releaseIndex, songIndex: index })
                            setPlayState(newPlayState)
                        }}
                        onTrackEnd={song => {
                            const newPlayState = [...playState]
                            newPlayState[releaseIndex].songs[song].playing = false
                            const nextSong = newPlayState[releaseIndex].songs[song + 1]
                            if (nextSong) {
                                newPlayState[releaseIndex].songs[song + 1].playing = true
                                setLastPlayed({ releaseIndex, songIndex: song + 1 })
                            } else {
                                const nextRelease = newPlayState[releaseIndex + 1]
                                if (nextRelease) {
                                    newPlayState[releaseIndex + 1].songs[0].playing = true
                                    setLastPlayed({ releaseIndex: releaseIndex + 1, songIndex: 0 })
                                }
                            }
                            setPlayState(newPlayState)
                        }}
                        key={releaseIndex}
                    />
                ))}
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled(flex)`
    align-items: flex-start;
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 30vh 0;
`

const Content = styled(flex)`
    justify-content: flex-start;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    flex-direction: column;
    gap: 30px;
`
