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
            <Top>
                <Avatar src={content.avatar} alt='Avatar' />
                <Bio>
                    <Name>WUFO</Name>
                    <span>{content.bio}</span>
                </Bio>
            </Top>
            <Links>
                {content.socials.map(({ link, Icon, ariaLabel }) => (
                    <Link href={link} target='_blank' key={link} aria-label={ariaLabel}>
                        <Icon
                            color={colors.text}
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
    gap: 30px;
    animation: ${fadeInDown} 1s;
    backdrop-filter: blur(10px) brightness(1.4);
    padding: 30px;
    border-radius: ${consts.borderRadius}px;
    box-shadow: ${consts.shadow};
    width: 100%;
`

const Top = styled(flex)`
    gap: 20px;
    max-width: 400px;
`

const Avatar = styled(Image)`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    box-shadow: ${consts.shadow};
`

const Logo = styled(Image)`
    filter: brightness(${colors.textSecondaryLightness});
`

const Links = styled(flex)`
    gap: 10px;
    flex-wrap: wrap;
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
    display: flex;
    flex-direction: column;
    color: ${colors.text};
`

const Name = styled('h1')`
    margin: 0;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 700;
`
