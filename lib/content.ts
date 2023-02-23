import { Content } from './types'
import header from '../public/header.jpg'
import { Spotify } from '../icons/spotify'
import { SoundCloudRound } from '../icons/soundcloud-round'
import { YouTubeRound } from '../icons/youtube-round'
import { AppleRound } from '../icons/apple-round'
import { InstagramRound } from '../icons/instagram-round'
import { FacebookRound } from '../icons/facebook-round'
import { TwitterRound } from '../icons/twitter-round'

export const content: Content = {
    avatar: header,
    bio: 'Drum & Bass producer based in London, also known as Noxive',
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
        //     title: 'Night & Day EP',
        //     hue: 180,
        //     cover: hydepark,
        //     soundcloud: 'https://soundcloud.com/argofox/wufo-hyde-park',
        //     songs: [
        //         { title: "You Don't Know", link: 'https://soundcloud.com/argofox/wufo-hyde-park' },
        //         { title: 'Night & Day', link: 'https://soundcloud.com/argofox/wufo-hyde-park' },
        //         { title: 'Sunday Secrets', link: 'https://soundcloud.com/argofox/wufo-hyde-park' },
        //         { title: 'Endpoint', link: 'https://soundcloud.com/argofox/wufo-hyde-park' },
        //     ],
        // },
        {
            title: 'Hyde Park',
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
