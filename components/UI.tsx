import styled from 'styled-components'
import { consts } from '../lib/consts'
import { content } from '../lib/content'
import { flex } from '../lib/flex'
import { Header } from './Header'
import { Release } from './Release'
import { useState } from 'react'

export function UI() {
    const [playState, setPlayState] = useState(
        content.releases.map(release => ({
            songs: release.songs.map(() => ({ playing: false })),
        }))
    )

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
                            setPlayState(newPlayState)
                        }}
                        onTrackEnd={song => {
                            const newPlayState = [...playState]
                            newPlayState[releaseIndex].songs[song].playing = false
                            const nextSong = newPlayState[releaseIndex].songs[song + 1]
                            if (nextSong) {
                                newPlayState[releaseIndex].songs[song + 1].playing = true
                            } else {
                                const nextRelease = newPlayState[releaseIndex + 1]
                                if (nextRelease) {
                                    newPlayState[releaseIndex + 1].songs[0].playing = true
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
