import { StaticImageData } from 'next/image'

export interface IRelease {
    title: string
    hue: number
    cover: StaticImageData
    soundcloud: string
    spotify?: string
    apple?: string
    youtube?: string
    songs: Song[]
}

export interface Song {
    title: string
    link: string
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
