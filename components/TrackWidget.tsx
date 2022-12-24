import { useState } from 'react'
import styled from 'styled-components'
import { Play } from '../icons/play'
import { colors } from '../lib/colors'
import { consts } from '../lib/consts'
import { flex } from '../lib/flex'
import { Song } from '../lib/types'

export function TrackWidget(props: { song: Song; trackNumber: number }) {
    const [loaded, setLoaded] = useState(false)
    if (loaded && props.song.link) {
        return (
            <IFrame>
                <iframe
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
        )
    } else {
        return (
            <Wrapper key={props.song.title} onClick={() => setLoaded(true)}>
                <Play color={colors.text} style={{ width: '12px' }} />
                {props.trackNumber}. {props.song.title}
            </Wrapper>
        )
    }
}

const Wrapper = styled(flex)`
    justify-content: flex-start;
    color: ${colors.textSecondary};
    gap: 10px;
    width: 100%;
    padding: 0 10px;
    height: 45px;
    cursor: pointer;
    transition: ${consts.shortTransition}ms;
    border-radius: ${consts.borderRadiusSmall}px;

    &:hover {
        background-color: ${colors.highlight};
    }
`

const IFrame = styled(flex)`
    filter: invert() grayscale() contrast(3) brightness(0.9);
    width: 100%;
    height: 45px;
    padding: 0 10px;
`
