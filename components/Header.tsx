import Image from 'next/image'
import styled from 'styled-components'
import { colors } from '../lib/colors'
import { consts } from '../lib/consts'
import { useContent } from '../lib/content'
import { flex } from '../lib/flex'
import { fadeInDown } from '../lib/keyframes'

export function Header() {
    const content = useContent()

    return (
        <Wrapper>
            <Logo src='/logo.svg' alt='WUFO' width='100' height='70' />

            <Bio>{content.bio}</Bio>
            <Links>
                {content.socials.map(({ link, Icon }) => (
                    <Link href={link} target='_blank' key={link}>
                        <Icon
                            color={colors.textSecondary}
                            style={{
                                width: consts.headerIconSize + 'px',
                                height: consts.headerIconSize + 'px',
                            }}
                        />
                    </Link>
                ))}
            </Links>
            <Email href={`mailto:${content.email}`}>{content.email}</Email>
        </Wrapper>
    )
}

const Wrapper = styled(flex)`
    flex-direction: column;
    gap: 20px;
    animation: ${fadeInDown} 1s;
`

const Name = styled('div')`
    font-size: 60px;
    font-weight: 900;
    font-style: italic;
    color: ${colors.text};
`

const Avatar = styled(Image)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    box-shadow: ${consts.shadow};
`

const Logo = styled(Image)`
    filter: brightness(${colors.textSecondaryLightness});
`

const Links = styled(flex)`
    gap: 20px;
`

const Link = styled('a')`
    &:hover {
        filter: brightness(2);
    }
`

const Email = styled('a')`
    color: ${colors.textSecondary};
    &:hover {
        filter: brightness(2);
    }
`

const Bio = styled('div')`
    color: ${colors.textSecondary};
    text-align: center;
`
