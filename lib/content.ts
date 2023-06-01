import { Content } from './types'
import header from '../public/header.jpg'
import { Spotify } from '../icons/spotify'
import { SoundCloudRound } from '../icons/soundcloud-round'
import { YouTubeRound } from '../icons/youtube-round'
import { AppleRound } from '../icons/apple-round'
import { InstagramRound } from '../icons/instagram-round'
import { FacebookRound } from '../icons/facebook-round'
import { TwitterRound } from '../icons/twitter-round'
import fokuz from '../public/fokuz.png'

export const content: Content = {
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
        // {
        //     title: 'Callback EP',
        //     hue: null,
        //     cover: fokuz,
        //     songs: [
        //         { title: 'Callback' },
        //         { title: 'Threaded' },
        //         { title: 'Control Flow' },
        //         { title: 'The Day' },
        //     ],
        //     releaseDate: 'Coming Soon',
        // },
        {
            title: 'Blockbuster Love',
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
