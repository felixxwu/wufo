import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { colours } from '../lib/colours'
import { flex } from '../lib/flex'

export function UI() {
    return (
        <Wrapper>
            <div>Content here.</div>
            <br />
            <Link href='https://open.spotify.com/artist/5nONWldPVh7MEziwG8r7RY' target='_blank'>
                Spotify
            </Link>
            <Link href='https://soundcloud.com/wufo' target='_blank'>
                SoundCloud
            </Link>
            <Link href='https://www.youtube.com/@wufodnb' target='_blank'>
                YouTube
            </Link>
            <Link href='https://www.instagram.com/wufodnb' target='_blank'>
                Instagram
            </Link>
            <Link href='https://www.facebook.com/profile.php?id=100088831532494' target='_blank'>
                Facebook
            </Link>
        </Wrapper>
    )
}

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const Wrapper = styled(flex)`
    position: absolute;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    animation: ${fadeIn} 1s;
`

const Link = styled('a')`
    color: ${colours.textSecondary};
`
