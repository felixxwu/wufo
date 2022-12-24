import { Content } from './types'
import hydepark from '../public/covers/hydepark.png'
import header from '../public/header.jpg'
import { Spotify } from '../icons/spotify'
import { SoundCloud } from '../icons/soundcloud'
import { Instagram } from '../icons/instagram'
import { Facebook } from '../icons/facebook'
import { YouTube } from '../icons/youtube'

export const content: Content = {
    avatar: header,
    bio: 'Drum & Bass producer based in London, also known as Noxive',
    socials: [
        { link: 'https://open.spotify.com/artist/5nONWldPVh7MEziwG8r7RY', Icon: Spotify },
        { link: 'https://soundcloud.com/wufo', Icon: SoundCloud },
        { link: 'https://www.youtube.com/@wufodnb', Icon: YouTube },
        { link: 'https://www.instagram.com/wufodnb', Icon: Instagram },
        { link: 'https://www.facebook.com/profile.php?id=100088831532494', Icon: Facebook },
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
            cover: hydepark,
            soundcloud: 'https://soundcloud.com/argofox/wufo-hyde-park',
            spotify: 'https://open.spotify.com/album/4zQZHSrLIMp7MVcKLzuB27',
            apple: 'https://music.apple.com/us/album/hyde-park/1643758822',
            youtube: 'https://www.youtube.com/watch?v=GFohON2Fi8w',
            songs: [{ title: 'Hyde Park', link: 'https://soundcloud.com/argofox/wufo-hyde-park' }],
        },
    ],
}
