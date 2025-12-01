import { Song } from './types';


export const SONGS: Song[] = [
  {
    id: '1',
    title: "嗵嗵",
    artist: "DOUDOU",
    coverUrl: "https://doudou-r2.realme.top/covers/%E5%97%B5%E5%97%B5.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E5%97%B5%E5%97%B5%20%E6%97%A0%E6%8D%9F%E9%9F%B3%E8%B4%A8%20-%20DOUDOU.mp3",
    theme: {
      dark: {
        base: '#07140f',
        surface: 'rgba(12, 32, 24, 0.78)',
        text: '#e9fef5',
        subtext: '#9ed9c2',
        accent: '#4ade80',
        glow: 'rgba(74, 222, 128, 0.30)',
      },
      light: {
        base: '#f0fdf4',
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#064e3b',
        subtext: '#15803d',
        accent: '#22c55e',
        glow: 'rgba(34, 197, 94, 0.22)',
      }
    },
    lyricUrl: "https://api.lrc.cx/lyrics?title=%E5%97%B5%E5%97%B5"
  },

  {
    id: '2', //1495719804
    title: "Fearless",
    artist: "福禄寿",
    coverUrl: "https://doudou-r2.realme.top/covers/fearless.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BF%20-%20Fearless.mp3",
    theme: {
      dark: {
        base: '#080e1a',
        surface: 'rgba(18, 26, 46, 0.72)',
        text: '#e2e8f0',
        subtext: '#94a3b8',
        accent: '#6366f1',
        glow: 'rgba(99, 102, 241, 0.32)',
      },
      light: {
        base: '#f1f5ff',
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#1e2a47',
        subtext: '#475569',
        accent: '#4f46e5',
        glow: 'rgba(79, 70, 229, 0.22)',
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1495719804&level=standard&type=json"
  },
  {
    id: '3', // 1818819577
    title: "我用什么把你留住",
    artist: "福禄寿",
    coverUrl:"https://p1.music.126.net/OYhP32O2KQfgX_im1gIvgg==/109951165710244988.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BFFloruitShow%20-%20%E6%88%91%E7%94%A8%E4%BB%80%E4%B9%88%E6%8A%8A%E4%BD%A0%E7%95%99%E4%BD%8F.flac",
    theme: {
      dark: {
        base: '#1a0004',
        surface: 'rgba(66, 0, 7, 0.75)',
        text: '#ffeaea',
        subtext: '#f29e9e',
        accent: '#ff4c4c',
        glow: 'rgba(255, 76, 76, 0.28)',
      },
      light: {
        base: '#fff5f5',
        surface: 'rgba(255, 255, 255, 0.9)',
        text: '#7f0d0d',
        subtext: '#d43b3b',
        accent: '#e11d48',
        glow: 'rgba(225, 29, 72, 0.25)',
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1818819577&level=standard&type=json"
  },
  {
    id: '4', //1412102163
    title: "没咯",
    artist: "福禄寿",
    coverUrl: "https://p1.music.126.net/d_UYn20K6s9cvsm422YeYQ==/109951164580192863.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BFFloruitShow%20-%20%E6%B2%A1%E5%92%AF.mp3",
    theme: {
      dark: {
        base: '#0f0f0f',
        surface: 'rgba(28, 28, 28, 0.75)',
        text: '#e5e5e5',
        subtext: '#a3a3a3',
        accent: '#d4d4d4',
        glow: 'rgba(212, 212, 212, 0.22)',
      },
      light: {
        base: '#fafafa',
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#1a1a1a',
        subtext: '#525252',
        accent: '#737373',
        glow: 'rgba(115, 115, 115, 0.20)'
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1412102163&level=standard&type=json"
  },
  {
    id: '5',
    title: "马",
    artist: "福禄寿",
    coverUrl: "https://p1.music.126.net/a7laDsHV-SzNvvXnUHHJOg==/109951163853896659.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BFFloruitShow%20-%20%E9%A9%AC.flac",
    theme: {
      dark: {
        base: '#110d09',
        surface: 'rgba(32, 26, 20, 0.78)',
        text: '#f5efe9',
        subtext: '#c7a98a',
        accent: '#d4a055',
        glow: 'rgba(212, 160, 85, 0.28)',
      },
      light: {
        base: '#faf7f2',
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#4b3a2c',
        subtext: '#8c6f57',
        accent: '#c88232',
        glow: 'rgba(200, 130, 50, 0.22)',
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1345353903&level=standard&type=json"
  },
  {
    id: '6', // 2052454512
    title: "南三环东路",
    artist: "DOUDOU",
    coverUrl: "https://p2.music.126.net/oEjZdksnQLrqLuDLWgoE2Q==/109951168652913819.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/DOUDOU%20-%20%E5%8D%97%E4%B8%89%E7%8E%AF%E4%B8%9C%E8%B7%AF.flac",
    theme: {
      dark: {
        base: '#0e131a',
        surface: 'rgba(20, 27, 36, 0.78)',
        text: '#e2e8f0',
        subtext: '#a3acb7',
        accent: '#94a3b8',
        glow: 'rgba(148, 163, 184, 0.28)',
      },
      light: {
        base: '#f3f4f6',
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#1f2937',
        subtext: '#6b7280',
        accent: '#475569',
        glow: 'rgba(71, 85, 105, 0.20)',
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=2052454512&level=standard&type=json"
  },
];