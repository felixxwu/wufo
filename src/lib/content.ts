import { Apple } from '../icons/apple'
import { Facebook } from '../icons/facebook'
import { Instagram } from '../icons/instagram'
import { SoundCloud } from '../icons/soundcloud'
import { Spotify } from '../icons/spotify'
// import { Twitter } from '../icons/twitter'
import { YouTube } from '../icons/youtube'
import { Content, IRelease } from './types'

const slug = window.location.pathname.split('/')[1]

function processReleases(releases: IRelease[]) {
  const singleRelease = releases.find(release => release.slug === slug)
  return singleRelease ? [singleRelease] : releases
}

export const content: Content = {
  bio: 'London based Drum & Bass producer, also known as Noxive',
  avatar: 'https://i1.sndcdn.com/avatars-HZXtNsgyyiU6yoGW-cpRyvQ-t50x50.jpg',
  socials: [
    {
      link: 'https://open.spotify.com/artist/5nONWldPVh7MEziwG8r7RY',
      label: 'Spotify',
      Icon: Spotify,
    },
    { link: 'https://soundcloud.com/wufo', label: 'SoundCloud', Icon: SoundCloud },
    { link: 'https://www.youtube.com/@wufodnb', label: 'YouTube', Icon: YouTube },
    {
      link: 'https://music.apple.com/us/artist/wufo/1643758828',
      label: 'Apple Music',
      Icon: Apple,
    },
    { link: 'https://www.instagram.com/wufodnb', label: 'Instagram', Icon: Instagram },
    {
      link: 'https://www.facebook.com/profile.php?id=100088831532494',
      label: 'Facebook',
      Icon: Facebook,
    },
    // { link: 'https://twitter.com/wufodnb', label: 'Twitter', Icon: Twitter },
  ],
  email: 'wufodnb@gmail.com',
  releases: processReleases([
    {
      title: 'Pulse EP',
      slug: 'pulse',
      color: [40, 40, 40],
      cover: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t50x50.jpg',
      spotify: 'https://open.spotify.com/album/43YxJFpXv4b3u3raxYkiNU',
      youtube: 'https://www.youtube.com/playlist?list=PL-BYmIN56P1_-rBvpthecPOpkynUKPByV',
      soundcloud: 'https://soundcloud.com/wufo/sets/pulse',
      apple: 'https://music.apple.com/us/album/pulse-single/1719663301',
      songs: [
        {
          title: 'Pulse',
          fileName: 'pulse.mp3',
          length: '4:08',
        },
        {
          title: 'Banana Bread',
          fileName: 'bananabread.mp3',
          length: '4:02',
        },
      ],
    },
    {
      title: 'Threaded EP',
      slug: 'threaded',
      color: [70, 30, 10],
      cover: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t50x50.jpg',
      spotify: 'https://open.spotify.com/album/4nbsKxedMA6bDQRtFJuKq5',
      youtube: 'https://youtube.com/playlist?list=PL-BYmIN56P18apP6__5MoElht0S1NvuD7',
      soundcloud: 'https://soundcloud.com/wufo/sets/threaded-ep',
      apple: 'https://music.apple.com/us/album/threaded-ep/1702145286',
      songs: [
        {
          title: 'Call Back',
          fileName: 'callback.mp3',
          length: '3:35',
        },
        {
          title: 'Threaded',
          fileName: 'threaded.mp3',
          length: '3:32',
        },
        {
          title: 'Control Flow',
          fileName: 'controlflow.mp3',
          length: '3:46',
        },
        {
          title: 'The Day',
          fileName: 'theday.mp3',
          length: '3:36',
        },
      ],
    },
    {
      title: 'Deadlock',
      slug: 'deadlock',
      color: [70, 20, 90],
      cover: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t50x50.jpg',
      spotify: 'https://open.spotify.com/track/1e9vJE6znQoBf8ayHexqDY',
      apple: 'https://music.apple.com/us/album/deadlock/1705651021?i=1705651022',
      soundcloud: 'https://soundcloud.com/blackprintuk/wufo-deadlock-free-download',
      youtube: 'https://www.youtube.com/watch?v=oad9XZCw-6o',
      songs: [
        {
          title: 'Deadlock',
          fileName: 'deadlock.mp3',
          length: '3:57',
        },
      ],
    },
    {
      title: 'Defiant (ft. Taylor B-W)',
      slug: 'defiant',
      color: [82, 20, 27],
      cover: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t50x50.jpg',
      spotify: 'https://open.spotify.com/track/2w4uaAV0k9ILj1BXXSOk2Y',
      apple: 'https://music.apple.com/us/album/defiant/1687242000',
      soundcloud: 'https://soundcloud.com/wufo/defiant',
      youtube: 'https://www.youtube.com/watch?v=AY3axDZug2w',
      songs: [{ title: 'Defiant', fileName: 'defiant.mp3', length: '3:35' }],
    },
    {
      title: 'Blockbuster Love (ft. Taylor B-W)',
      slug: 'blockbuster-love',
      color: [125, 98, 83],
      cover: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t50x50.jpg',
      soundcloud: 'https://soundcloud.com/wufo/sets/blockbuster-love',
      spotify: 'https://open.spotify.com/track/1gh4Tb7OtKeHOXm643ALIL',
      apple: 'https://music.apple.com/us/album/blockbuster-love/1677552561?i=1677552562',
      youtube: 'https://www.youtube.com/watch?v=NZZ6DxkbzEU',
      songs: [
        {
          title: 'Blockbuster Love',
          fileName: 'blockbusterlove.mp3',
          length: '3:09',
        },
      ],
    },
    {
      title: 'Night & Day EP',
      slug: 'night-and-day',
      color: [148, 91, 56],
      cover: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t50x50.jpg',
      soundcloud: 'https://soundcloud.com/soul-deep-recordings/sets/wufo-night-day',
      spotify: 'https://open.spotify.com/album/5hBYTI38j7NqTt9qKsg8n8',
      apple: 'https://music.apple.com/us/album/night-day-ep/1672463499',
      youtube: 'https://www.youtube.com/playlist?list=PL-BYmIN56P18OCfk0MSbjecJNcRzo9xOF',
      songs: [
        {
          title: 'Night & Day',
          fileName: 'nightandday.mp3',
          length: '3:50',
        },
        {
          title: "You Don't Know",
          fileName: 'youdontknow.mp3',
          length: '3:45',
        },
        {
          title: 'Sunday Secrets',
          fileName: 'sundaysecrets.mp3',
          length: '4:02',
        },

        {
          title: 'Endpoint',
          fileName: 'endpoint.mp3',
          length: '4:04',
        },
      ],
    },
    {
      title: 'Hyde Park',
      slug: 'hyde-park',
      color: [161, 139, 69],
      cover: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t50x50.jpg',
      soundcloud: 'https://soundcloud.com/argofox/wufo-hyde-park',
      spotify: 'https://open.spotify.com/album/4zQZHSrLIMp7MVcKLzuB27',
      apple: 'https://music.apple.com/us/album/hyde-park/1643758822',
      youtube: 'https://www.youtube.com/watch?v=GFohON2Fi8w',
      songs: [
        {
          title: 'Hyde Park',
          fileName: 'hydepark.mp3',
          length: '4:55',
        },
      ],
    },
  ]),
}
