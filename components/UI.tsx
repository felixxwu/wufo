import styled from 'styled-components'
import { consts } from '../lib/consts'
import { content } from '../lib/content'
import { flex } from '../lib/flex'
import { Header } from './Header'
import { Release } from './Release'

export function UI() {
    return (
        <Wrapper>
            <Content>
                <Header />
                {content.releases.map((release, i) => (
                    <Release
                        release={release}
                        animationDelay={(i + 1) * consts.releaseAnimationStaggerDelay}
                        key={i}
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
