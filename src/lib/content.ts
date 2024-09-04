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
  avatar: '/wufo256.png',
  socials: [
    {
      link: 'https://open.spotify.com/artist/5nONWldPVh7MEziwG8r7RY',
      label: 'Spotify',
      Icon: Spotify,
    },
    { link: 'https://www.instagram.com/wufodnb', label: 'Instagram', Icon: Instagram },
    { link: 'https://www.youtube.com/@wufodnb', label: 'YouTube', Icon: YouTube },
    { link: 'https://soundcloud.com/wufo', label: 'SoundCloud', Icon: SoundCloud },
    {
      link: 'https://music.apple.com/us/artist/wufo/1643758828',
      label: 'Apple Music',
      Icon: Apple,
    },
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
      title: 'Crossroads',
      slug: 'crossroads',
      color: [133, 33, 9],
      cover: 'https://i1.sndcdn.com/artworks-DRsTN99sMDrAP2B9-1vU57g-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-DRsTN99sMDrAP2B9-1vU57g-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-DRsTN99sMDrAP2B9-1vU57g-t50x50.jpg',
      background: 'https://i1.sndcdn.com/artworks-DRsTN99sMDrAP2B9-1vU57g-t200x200.jpg',
      soundcloud: 'https://soundcloud.com/wufo/sets/crossroads-ep',
      spotify: 'https://open.spotify.com/album/6THJhf2BMQfJAigYJYcAEb?si=WkLW50U5RLiU8ff6dqFxMA',
      youtube:
        'https://www.youtube.com/watch?v=HFJ3md1W7bQ&list=PL-BYmIN56P1986Rs1mUS3TD-gr96Mx7d_',
      apple: 'https://music.apple.com/us/album/crossroads-ep/1721875018',
      songs: [
        { title: 'From the Start', fileName: '/audio/fromthestart.mp3', length: '4:04' },
        { title: 'Slow Burn', fileName: '/audio/slowburn.mp3', length: '3:48' },
        { title: 'Who You Are', fileName: '/audio/whoyouare.mp3', length: '4:05' },
        { title: 'Crossroads', fileName: '/audio/crossroads.mp3', length: '3:56' },
      ],
      year: 2024,
    },
    {
      title: 'Skillz (ft. Taylor B-W)',
      slug: 'skillz',
      color: [11, 53, 171],
      cover: 'https://i1.sndcdn.com/artworks-RqEqZ6qHaCP2zej0-xfOZ4w-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-RqEqZ6qHaCP2zej0-xfOZ4w-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-RqEqZ6qHaCP2zej0-xfOZ4w-t50x50.jpg',
      background: 'https://i1.sndcdn.com/artworks-RqEqZ6qHaCP2zej0-xfOZ4w-t200x200.jpg',
      spotify: 'https://open.spotify.com/track/03tvSW6YMWvMeSB8l5j92v?si=1fa8586e6e874b6d',
      youtube: 'https://www.youtube.com/watch?v=Y59zJgRwALE',
      soundcloud: 'https://soundcloud.com/wufo/skillz',
      apple: 'https://music.apple.com/us/album/skillz/1753842716',
      songs: [{ title: 'Skillz', fileName: '/audio/skillz.mp3', length: '3:14' }],
      year: 2024,
    },
    {
      title: 'Resolver',
      slug: 'resolver',
      color: [230, 180, 190],
      cover: 'https://i1.sndcdn.com/artworks-RwnlwdflA2iae14E-MTfqBg-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-RwnlwdflA2iae14E-MTfqBg-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-RwnlwdflA2iae14E-MTfqBg-t50x50.jpg',
      background: 'https://i1.sndcdn.com/artworks-RwnlwdflA2iae14E-MTfqBg-t200x200.jpg',
      spotify: 'https://open.spotify.com/track/095FBldvMtg7GervaVSRJB',
      youtube: 'https://www.youtube.com/watch?v=wgyXULwqLJU',
      soundcloud:
        'https://soundcloud.com/fokuzrecordings/wufo-resolver-master?in=wufo/sets/resolver',
      apple: 'https://music.apple.com/us/album/resolver/1751297001',
      songs: [
        {
          title: 'Resolver',
          fileName: '/audio/resolver.mp3',
          length: '4:17',
        },
      ],
      year: 2024,
    },
    {
      title: 'Echo Chamber',
      slug: 'echo-chamber',
      color: [12, 67, 86],
      cover: 'https://i1.sndcdn.com/artworks-TTdnTKGcGnV045aQ-EYsCRQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-TTdnTKGcGnV045aQ-EYsCRQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-TTdnTKGcGnV045aQ-EYsCRQ-t50x50.jpg',
      background: '/backgrounds/echochamber.jpg',
      spotify: 'https://open.spotify.com/track/4VWF5gT68ucW0nNIrOPhBX',
      youtube: 'https://www.youtube.com/watch?v=liE3DCRahp0',
      soundcloud: 'https://soundcloud.com/celsiusrecordings/wufo-echo-chamber',
      apple: 'https://music.apple.com/us/album/echo-chamber/1716576833',
      songs: [
        {
          title: 'Echo Chamber',
          fileName: '/audio/echochamber.mp3',
          length: '4:17',
        },
      ],
      year: 2024,
    },
    {
      title: 'Pulse',
      slug: 'pulse',
      color: [40, 40, 40],
      cover: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-I1k73bEsIDCEH43q-XQYKYA-t50x50.jpg',
      background: '/backgrounds/pulse.jpg',
      spotify: 'https://open.spotify.com/album/43YxJFpXv4b3u3raxYkiNU',
      youtube: 'https://www.youtube.com/playlist?list=PL-BYmIN56P1_-rBvpthecPOpkynUKPByV',
      soundcloud: 'https://soundcloud.com/wufo/sets/pulse',
      apple: 'https://music.apple.com/us/album/pulse-single/1719663301',
      songs: [
        {
          title: 'Pulse',
          fileName: '/audio/pulse.mp3',
          length: '4:08',
        },
        {
          title: 'Banana Bread',
          fileName: '/audio/bananabread.mp3',
          length: '4:02',
        },
      ],
      year: 2023,
    },
    {
      title: 'Threaded',
      slug: 'threaded',
      color: [70, 30, 10],
      cover: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-q118zuvRNDyfvPer-Zc0nsg-t50x50.jpg',
      background: '/backgrounds/threaded.jpg',
      spotify: 'https://open.spotify.com/album/4nbsKxedMA6bDQRtFJuKq5',
      youtube: 'https://youtube.com/playlist?list=PL-BYmIN56P18apP6__5MoElht0S1NvuD7',
      soundcloud: 'https://soundcloud.com/wufo/sets/threaded-ep',
      apple: 'https://music.apple.com/us/album/threaded-ep/1702145286',
      songs: [
        {
          title: 'Call Back',
          fileName: '/audio/callback.mp3',
          length: '3:34',
        },
        {
          title: 'Threaded',
          fileName: '/audio/threaded.mp3',
          length: '3:32',
        },
        {
          title: 'Control Flow',
          fileName: '/audio/controlflow.mp3',
          length: '3:46',
        },
        {
          title: 'The Day',
          fileName: '/audio/theday.mp3',
          length: '3:36',
        },
      ],
      year: 2023,
    },
    {
      title: 'Deadlock',
      slug: 'deadlock',
      color: [70, 20, 90],
      cover: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-Or0tFk53aj7IM3Rl-I7w5Vg-t50x50.jpg',
      background: '/backgrounds/deadlock.jpg',
      spotify: 'https://open.spotify.com/track/1e9vJE6znQoBf8ayHexqDY',
      apple: 'https://music.apple.com/us/album/deadlock/1705651021?i=1705651022',
      soundcloud: 'https://soundcloud.com/blackprintuk/wufo-deadlock-free-download',
      youtube: 'https://www.youtube.com/watch?v=oad9XZCw-6o',
      songs: [
        {
          title: 'Deadlock',
          fileName: '/audio/deadlock.mp3',
          length: '3:55',
        },
      ],
      year: 2023,
    },
    {
      title: 'Defiant (ft. Taylor B-W)',
      slug: 'defiant',
      color: [230, 180, 190],
      cover: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-UBOydV63uEQkMQJc-xWt0uQ-t50x50.jpg',
      background: '/backgrounds/defiant.jpg',
      spotify: 'https://open.spotify.com/track/2w4uaAV0k9ILj1BXXSOk2Y',
      apple: 'https://music.apple.com/us/album/defiant/1687242000',
      soundcloud: 'https://soundcloud.com/wufo/defiant',
      youtube: 'https://www.youtube.com/watch?v=AY3axDZug2w',
      songs: [{ title: 'Defiant', fileName: '/audio/defiant.mp3', length: '3:35' }],
      year: 2023,
    },
    {
      title: 'Blockbuster Love (ft. Taylor B-W)',
      slug: 'blockbuster-love',
      color: [125, 98, 83],
      cover: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-ofaH272bjVphos4i-xs2Iuw-t50x50.jpg',
      background: '/backgrounds/blockbuster.jpg',
      soundcloud: 'https://soundcloud.com/wufo/sets/blockbuster-love',
      spotify: 'https://open.spotify.com/track/1gh4Tb7OtKeHOXm643ALIL',
      apple: 'https://music.apple.com/us/album/blockbuster-love/1677552561?i=1677552562',
      youtube: 'https://www.youtube.com/watch?v=NZZ6DxkbzEU',
      songs: [
        {
          title: 'Blockbuster Love',
          fileName: '/audio/blockbusterlove.mp3',
          length: '3:09',
        },
      ],
      year: 2023,
    },
    {
      title: 'Night & Day',
      slug: 'night-and-day',
      color: [148, 91, 56],
      cover: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-ZyxWR15thSF4EYeL-C2VLjQ-t50x50.jpg',
      background: '/backgrounds/nightandday.jpg',
      soundcloud: 'https://soundcloud.com/soul-deep-recordings/sets/wufo-night-day',
      spotify: 'https://open.spotify.com/album/5hBYTI38j7NqTt9qKsg8n8',
      apple: 'https://music.apple.com/us/album/night-day-ep/1672463499',
      youtube: 'https://www.youtube.com/playlist?list=PL-BYmIN56P18OCfk0MSbjecJNcRzo9xOF',
      songs: [
        {
          title: 'Night & Day',
          fileName: '/audio/nightandday.mp3',
          length: '3:50',
        },
        {
          title: "You Don't Know",
          fileName: '/audio/youdontknow.mp3',
          length: '3:46',
        },
        {
          title: 'Sunday Secrets',
          fileName: '/audio/sundaysecrets.mp3',
          length: '4:02',
        },

        {
          title: 'Endpoint',
          fileName: '/audio/endpoint.mp3',
          length: '4:04',
        },
      ],
      year: 2023,
    },
    {
      title: 'Hyde Park',
      slug: 'hyde-park',
      color: [161, 139, 69],
      cover: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t500x500.jpg',
      coverSmall: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t200x200.jpg',
      coverTiny: 'https://i1.sndcdn.com/artworks-80gYiY5bOUD9UvpU-3jg2yQ-t50x50.jpg',
      background: '/backgrounds/hydepark.jpg',
      soundcloud: 'https://soundcloud.com/argofox/wufo-hyde-park',
      spotify: 'https://open.spotify.com/album/4zQZHSrLIMp7MVcKLzuB27',
      apple: 'https://music.apple.com/us/album/hyde-park/1643758822',
      youtube: 'https://www.youtube.com/watch?v=GFohON2Fi8w',
      songs: [
        {
          title: 'Hyde Park',
          fileName: '/audio/hydepark.mp3',
          length: '4:55',
        },
      ],
      year: 2022,
    },
  ]),
}
