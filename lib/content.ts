import { Content } from './types'
import header from '../public/header.jpg'
import { Spotify } from '../icons/spotify'
import { SoundCloudRound } from '../icons/soundcloud-round'
import { YouTubeRound } from '../icons/youtube-round'
import { AppleRound } from '../icons/apple-round'
import { InstagramRound } from '../icons/instagram-round'
import { FacebookRound } from '../icons/facebook-round'
import { TwitterRound } from '../icons/twitter-round'
import { useRouter } from 'next/router'

export const useContent = () => {
    const router = useRouter()

    return router.query.slug
        ? {
              ...content,
              releases: content.releases.filter(release => release.slug === router.query.slug),
          }
        : content
}

const content: Content = {
    avatar: header,
    bio: 'London based Drum & Bass producer, also known as Noxive',
    socials: [
        { link: 'https://open.spotify.com/artist/5nONWldPVh7MEziwG8r7RY', Icon: Spotify },
        { link: 'https://music.apple.com/us/artist/wufo/1643758828', Icon: AppleRound },
        { link: 'https://soundcloud.com/wufo', Icon: SoundCloudRound },
        { link: 'https://www.youtube.com/@wufodnb', Icon: YouTubeRound },
        { link: 'https://www.instagram.com/wufodnb', Icon: InstagramRound },
        { link: 'https://www.facebook.com/profile.php?id=100088831532494', Icon: FacebookRound },
        { link: 'https://twitter.com/wufodnb', Icon: TwitterRound },
    ],
    email: 'wufodnb@gmail.com',
    releases: [
        {
            title: 'Threaded EP',
            slug: 'threaded',
            hue: 350,
            cover: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t500x500.jpg',
            spotify: 'https://open.spotify.com/album/4nbsKxedMA6bDQRtFJuKq5',
            youtube: 'https://youtube.com/playlist?list=PL-BYmIN56P18apP6__5MoElht0S1NvuD7',
            soundcloud: 'https://soundcloud.com/wufo/sets/threaded-ep',
            songs: [
                {
                    title: 'Call Back',
                    link: 'https://soundcloud.com/fokuzrecordings/wufo-call-back',
                },
                { title: 'Threaded', link: 'https://soundcloud.com/fokuzrecordings/wufo-threaded' },
                {
                    title: 'Control Flow',
                    link: 'https://soundcloud.com/fokuzrecordings/wufo-control-flow',
                },
                { title: 'The Day', link: 'https://soundcloud.com/fokuzrecordings/wufo-the-day' },
            ],
        },
        {
            title: 'Deadlock',
            slug: 'deadlock',
            hue: 276,
            cover: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t500x500.jpg',
            spotify: 'https://open.spotify.com/track/1e9vJE6znQoBf8ayHexqDY',
            apple: 'https://music.apple.com/us/album/deadlock/1705651021?i=1705651022',
            soundcloud: 'https://soundcloud.com/blackprintuk/wufo-deadlock-free-download',
            youtube: 'https://www.youtube.com/watch?v=oad9XZCw-6o',
            songs: [
                {
                    title: 'Deadlock',
                    link: 'https://soundcloud.com/blackprintuk/wufo-deadlock-free-download',
                },
            ],
        },
        {
            title: 'Defiant (ft. Taylor B-W)',
            slug: 'defiant',
            hue: 100,
            cover: 'https://i.scdn.co/image/ab67616d00001e02fd33e759a068cea3ddffe7f7',
            spotify: 'https://open.spotify.com/track/2w4uaAV0k9ILj1BXXSOk2Y',
            apple: 'https://music.apple.com/us/album/defiant/1687242000',
            soundcloud: 'https://soundcloud.com/wufo/defiant',
            youtube: 'https://www.youtube.com/watch?v=AY3axDZug2w',
            songs: [{ title: 'Defiant', link: 'https://soundcloud.com/wufo/defiant' }],
        },
        {
            title: 'Blockbuster Love (ft. Taylor B-W)',
            slug: 'blockbuster-love',
            hue: 10,
            cover: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t500x500.jpg',
            soundcloud: 'https://soundcloud.com/wufo/sets/blockbuster-love',
            spotify: 'https://open.spotify.com/track/1gh4Tb7OtKeHOXm643ALIL',
            apple: 'https://music.apple.com/us/album/blockbuster-love/1677552561?i=1677552562',
            youtube: 'https://www.youtube.com/watch?v=NZZ6DxkbzEU',
            songs: [
                {
                    title: 'Blockbuster Love (ft. Taylor B-W)',
                    link: 'https://soundcloud.com/celsiusrecordings/wufo-taylor-b-w-blockbuster',
                },
            ],
        },
        {
            title: 'Night & Day EP',
            slug: 'night-and-day',
            hue: 210,
            cover: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t500x500.jpg',
            soundcloud: 'https://soundcloud.com/soul-deep-recordings/sets/wufo-night-day',
            spotify: 'https://open.spotify.com/album/5hBYTI38j7NqTt9qKsg8n8',
            apple: 'https://music.apple.com/us/album/night-day-ep/1672463499',
            youtube: 'https://www.youtube.com/playlist?list=PL-BYmIN56P18OCfk0MSbjecJNcRzo9xOF',
            songs: [
                {
                    title: 'Night & Day',
                    link: 'https://soundcloud.com/soul-deep-recordings/wufo-night-day',
                },
                {
                    title: "You Don't Know (ft. Jitsu)",
                    link: 'https://soundcloud.com/soul-deep-recordings/wufo-jitsu-you-dont-know',
                },
                {
                    title: 'Sunday Secrets',
                    link: 'https://soundcloud.com/soul-deep-recordings/wufo-sunday-secrets',
                },
                {
                    title: 'Endpoint',
                    link: 'https://soundcloud.com/soul-deep-recordings/wufo-endpoint',
                },
            ],
        },
        {
            title: 'Hyde Park',
            slug: 'hyde-park',
            hue: 45,
            cover: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t500x500.jpg',
            soundcloud: 'https://soundcloud.com/argofox/wufo-hyde-park',
            spotify: 'https://open.spotify.com/album/4zQZHSrLIMp7MVcKLzuB27',
            apple: 'https://music.apple.com/us/album/hyde-park/1643758822',
            youtube: 'https://www.youtube.com/watch?v=GFohON2Fi8w',
            songs: [{ title: 'Hyde Park', link: 'https://soundcloud.com/argofox/wufo-hyde-park' }],
        },
    ],
}
