import { Song } from './types';

// Helper to generate Data URI for lyrics
const createLyricDataUrl = (lyric: string) => {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(lyric)}`;
};

const LYRICS = {
  1: `[00:00.00]嗵嗵 - DOUDOU
[00:18.00]在森林的深处
[00:25.00]听见心跳的鼓
[00:32.00]嗵嗵 嗵嗵
[00:38.00]那是生命的脚步
[00:45.00]穿过迷雾
[00:52.00]寻找归宿
[01:10.00]大地呼吸的声音
[01:18.00]伴随着万物苏醒
[01:25.00]在这片寂静之地
[01:32.00]只有我和你
[01:45.00]嗵嗵 嗵嗵...`,
  
  2: `[00:00.00]Fearless - 福禄寿
[00:01.00]词：豆豆
[00:02.00]曲：豆豆
[00:10.00]Can you hear me
[00:15.00]Falling down
[00:20.00]Into the abyss
[00:25.00]Where no light is found
[00:35.00]But I am fearless
[00:42.00]Even in the dark
[00:48.00]I see the spark
[00:55.00]Of a new beginning
[01:05.00]Oh oh oh...
[01:20.00]Nothing can stop me now`,

  3: `[00:00.00]我用什么把你留住 - 福禄寿
[00:05.00]词曲：福禄寿FloruitShow
[00:27.00]你就在我的身后
[00:33.00]此时此刻
[00:36.00]我却没有回头
[00:42.00]我知道
[00:45.00]无论是谁
[00:48.00]都无法
[00:50.00]让时间停留
[00:54.00]哪怕一刻
[01:08.00]我只想
[01:11.00]再看你一眼
[01:14.00]再看你一眼
[01:17.00]在一切
[01:20.00]崩塌之前`,

  4: `[00:00.00]没咯 - 福禄寿
[00:05.00]起风了
[00:10.00]散了
[00:15.00]都不见了
[00:22.00]剩下的
[00:28.00]只有回忆
[00:35.00]和这首歌
[00:45.00]就像一场梦
[00:52.00]醒来之后
[00:58.00]什么都
[01:05.00]没咯`,

  5: `[00:00.00]马 - 福禄寿
[00:02.00]词曲：福禄寿FloruitShow
[00:10.00]有一匹白马
[00:15.00]在我的心里
[00:20.00]它奔跑在
[00:25.00]无尽的旷野
[00:32.00]没有缰绳
[00:37.00]没有束缚
[00:45.00]带我去
[00:50.00]任何地方
[01:00.00]哒哒 哒哒...`,

  6: `[00:00.00]南三环东路 - DOUDOU
[00:05.00]词曲：DOUDOU
[00:10.00]车窗外的灯光
[00:15.00]拉长了身影
[00:22.00]这条路
[00:26.00]走了多少遍
[00:32.00]看不清
[00:36.00]前面的终点
[00:42.00]只有
[00:45.00]车轮的声音
[00:50.00]陪着我
[00:55.00]向前`
};

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
    lyricUrl: createLyricDataUrl(LYRICS[1])
  },

  {
    id: '2',
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
    lyricUrl: createLyricDataUrl(LYRICS[2])
  },
  {
    id: '3',
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
    lyricUrl: createLyricDataUrl(LYRICS[3])
  },
  {
    id: '4',
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
    lyricUrl: createLyricDataUrl(LYRICS[4])
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
    lyricUrl: createLyricDataUrl(LYRICS[5])
  },
  {
    id: '6',
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
    lyricUrl: createLyricDataUrl(LYRICS[6])
  },
];