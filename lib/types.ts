import { StaticImageData } from 'next/image'

declare global {
    interface Window {
        SC: {
            Widget: {
                (iframe: HTMLIFrameElement): {
                    play(): void
                    pause(): void
                    bind(event: string, callback: (e: any) => void): void
                    seekTo(milliseconds: number): void
                    getDuration(callback: (milliseconds: number) => void): void
                }
                Events: {
                    PLAY: string
                    PAUSE: string
                    FINISH: string
                    PLAY_PROGRESS: string
                }
            }
        }
    }
}

export interface IRelease {
    title: string
    hue: number | null
    cover: StaticImageData | string
    soundcloud?: string
    spotify?: string
    apple?: string
    youtube?: string
    songs: Song[]
    releaseDate?: string
}

export interface Song {
    title: string
    link?: string
}

export interface Pos {
    x: number
    y: number
}

export interface Content {
    avatar: StaticImageData
    bio: string
    socials: { link: string; Icon: (props: IconProps) => JSX.Element }[]
    email: string
    releases: IRelease[]
}

export interface IconProps {
    color: string
    style?: React.CSSProperties
}
