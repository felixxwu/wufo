import { VNode } from 'preact'

declare global {
  interface Window {
    SC: {
      Widget: {
        (iframe: HTMLIFrameElement): {
          play(): void
          pause(): void
          load(url: string, options: { auto_play: boolean }, callback?: () => void): void
          bind(event: string, callback: (e: any) => void): void
          seekTo(milliseconds: number): void
          getDuration(callback: (milliseconds: number) => void): void
          getPosition(callback: (milliseconds: number) => void): void
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

export type Color = [number, number, number]

export interface IRelease {
  title: string
  color: Color
  cover: string
  coverSmall: string
  coverTiny: string
  soundcloud?: string
  spotify?: string
  apple?: string
  youtube?: string
  songs: ISong[]
  releaseDate?: string
  slug?: string
}

export interface ISong {
  title: string
  fileName: string
  length: string
}

export interface Pos {
  x: number
  y: number
}

export interface Content {
  bio: string
  avatar: string
  email: string
  socials: { link: string; label: string; Icon: (props: IconProps) => VNode }[]
  releases: IRelease[]
}

export interface IconProps {
  color: string
  style?: React.CSSProperties
}
