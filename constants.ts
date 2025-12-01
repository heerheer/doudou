import { Song } from './types';

// Mock audio URLs
const DEMO_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// Helper to create data URI for lyrics to simulate fetching from a URL
const createLrcDataUri = (lrc: string) => `data:text/plain;charset=utf-8,${encodeURIComponent(lrc)}`;

const lrc1 = `[00:00.00] (前奏)
[00:15.00] 虚空寂静之中
[00:20.00] 金尘落于肌肤
[00:28.00] 我们向古日祈祷
[00:35.00] 祈求光芒引路
[00:45.00] (间奏)
[01:00.00] 神殿永恒伫立
[01:10.00] 观望世界交汇
[01:20.00] 灵魂的共鸣
[01:30.00] 在此刻苏醒`;

const lrc2 = `[00:00.00] (前奏)
[00:10.00] 雪上猩红的泪
[00:20.00] 往昔记忆如碎
[00:30.00] 紧握昨日残像
[00:40.00] 在消逝前凝望
[00:50.00] 那红豆生南国
[01:00.00] 此物最相思`;

const lrc3 = `[00:05.00] 踏入这扇门
[00:15.00] 抛下你的恐惧
[00:25.00] 众灵在此静候
[00:35.00] 寻找那颗真心
[00:45.00] 圣域的光辉
[00:55.00] 照亮归途`;

const lrc4 = `[00:00.00] 困于其中
[00:05.00] 光的世界
[00:15.00] 美丽却冰冷
[00:25.00] 无人知晓的故事
[00:35.00] 金色的笼子
[00:45.00] 锁住了自由`;

const lrc5 = `[00:00.00] 叮... 咚...
[00:10.00] 醒来吧 孩子
[00:20.00] 黎明已至
[00:30.00] 长夜终尽
[00:40.00] 晨钟敲响
[00:50.00] 新的篇章`;

export const SONGS: Song[] = [
  {
    id: '1',
    title: "嗵嗵",
    artist: "DOUDOU",
    coverUrl: "https://doudou-r2.realme.top/covers/%E5%97%B5%E5%97%B5.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E5%97%B5%E5%97%B5%20%E6%97%A0%E6%8D%9F%E9%9F%B3%E8%B4%A8%20-%20DOUDOU.mp3",
    theme: {
      dark: {
        base: '#07140f',                 // 深墨绿，像森林最底层的土
        surface: 'rgba(12, 32, 24, 0.78)', // 微亮深绿，潮湿泥土感
        text: '#e9fef5',                 // 薄荷白，清透又有生命气
        subtext: '#9ed9c2',              // 淡叶青，柔和辅助
        accent: '#4ade80',               // 嗵嗵的核心：鲜嫩、有弹性的生命绿
        glow: 'rgba(74, 222, 128, 0.30)', // 绿色的“呼吸感”光晕
      },
      light: {
        base: '#f0fdf4',                 // 淡嫩芽绿，轻盈又干净
        surface: 'rgba(255, 255, 255, 0.85)', // 让内容更通透
        text: '#064e3b',                 // 深青绿，稳重但不冷
        subtext: '#15803d',              // 苦绿、嫩绿之间，充满能量
        accent: '#22c55e',               // 更亮的生命绿，像叶片反光
        glow: 'rgba(34, 197, 94, 0.22)',  // 轻柔的绿光
      }
    },
    lyricUrl: "https://api.lrc.cx/lyrics?title=%E5%97%B5%E5%97%B5"
  },
  {
    id: '2',
    title: "Fearless",
    artist: "福禄寿",
    coverUrl: "https://doudou-r2.realme.top/covers/fearless.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BF%20-%20Fearless.mp3",
    theme: {
      dark: {
        base: '#080e1a',                   // 深靛蓝，宇宙背景的“静”
        surface: 'rgba(18, 26, 46, 0.72)', // 低亮星云蓝，像远处的光雾
        text: '#e2e8f0',                   // 星光白，柔不刺眼
        subtext: '#94a3b8',                // 钢蓝灰，像恒星的冷光
        accent: '#6366f1',                 // 靛紫星辉，存在感但不张扬
        glow: 'rgba(99, 102, 241, 0.32)',  // 星云紫光，漂浮感
      },
      light: {
        base: '#f1f5ff',                   // 很淡的宇宙蓝白，像黎明前的天穹
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#1e2a47',                   // 靛蓝文字，沉静、深远
        subtext: '#475569',                // 蓝灰，像薄云遮住的光
        accent: '#4f46e5',                 // 更深的星辉紫，强调力量感
        glow: 'rgba(79, 70, 229, 0.22)',   // 温柔的蓝紫光晕
      }
    },
    //https://music.163.com/song?id=1495719804&uct2=U2FsdGVkX18JLvyaSu26gmlj7XaQd+R1KGTytI1gWR4=
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1495719804&level=standard&type=json"
  },
  {
    id: '3',
    title: "我用什么把你留住",// 1818819577
    artist: "福禄寿",
    coverUrl:"https://p1.music.126.net/OYhP32O2KQfgX_im1gIvgg==/109951165710244988.jpg",
    audioUrl: "https://m8.music.126.net/20251201174705/41dcd55f2b1ff4c61241bdf316da998b/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/13125100571/469f/40ff/3382/5c2775346c6ad03cf07c8c6bf51a0c4e.mp3?vuutv=+ut0P6xjd10SrIt/AtSPsOM661v/yQ2wHgwYBZvCykx50ztEEbTWaoBmJsYEJdjFnK1DOSrjZzuVE1/vnD7ahevCT7cmnsqoCHp4JS0vqOo=",
    theme: {
      dark: {
        base: '#1a0004',              // 深酒红，厚重背景
        surface: 'rgba(66, 0, 7, 0.75)', // 深红半透明，营造舞台感
        text: '#ffeaea',              // 浅肉粉，温暖柔和
        subtext: '#f29e9e',           // 淡珊瑚红，层次感
        accent: '#ff4c4c',            // 鲜明正红，突出“生命力”
        glow: 'rgba(255, 76, 76, 0.28)', // 红色光晕
      },
      light: {
        base: '#fff5f5',              // 浅胭脂粉，柔和高级
        surface: 'rgba(255, 255, 255, 0.9)', // 保持白色观感
        text: '#7f0d0d',              // 深红文本，更有力量
        subtext: '#d43b3b',           // 明亮红色的次要文字
        accent: '#e11d48',            // 玫瑰红点缀，热烈又不刺眼
        glow: 'rgba(225, 29, 72, 0.25)', // 玫瑰红光晕
      }
    },
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1818819577&level=standard&type=json"
  },
  {
    id: '4',
    title: "没咯",
    artist: "福禄寿",
    coverUrl: "https://p1.music.126.net/d_UYn20K6s9cvsm422YeYQ==/109951164580192863.jpg",
    audioUrl: "https://doudou-r2.realme.top/audios/%E7%A6%8F%E7%A6%84%E5%AF%BFFloruitShow%20-%20%E6%B2%A1%E5%92%AF.mp3",
    theme: {
      dark: {
        base: '#0f0f0f',                  // 深炭黑，像唱完后的空旷
        surface: 'rgba(28, 28, 28, 0.75)', // 半透明冷灰，像余音后的空气
        text: '#e5e5e5',                  // 干净的骨白，冷静、不带柔光
        subtext: '#a3a3a3',               // 更钝的中性灰，沙化般的触感
        accent: '#d4d4d4',                // 失温的白灰，像终点的平静
        glow: 'rgba(212, 212, 212, 0.22)', // 淡淡的白灰光，像呼出的最后一口气
      },
      light: {
        base: '#fafafa',                  // 淡雾白，像磨损过的纸面
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#1a1a1a',                  // 深炭墨，沉稳又像看破尘世
        subtext: '#525252',               // 中灰，像脚底的土
        accent: '#737373',                // 稍重的钢灰，“终点却未冷却”
        glow: 'rgba(115, 115, 115, 0.20)' // 一点金属灰影子，让画面有余波
      }
    },
    //https://music.163.com/song?id=1412102163&uct2=U2FsdGVkX19ph9TuHnz3xWHHbXPHFa/kpQqRlD2oft4=
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1412102163&level=standard&type=json"
  },
  {
    id: '5',
    title: "马",
    artist: "福禄寿",
    coverUrl: "https://p1.music.126.net/a7laDsHV-SzNvvXnUHHJOg==/109951163853896659.jpg",
    audioUrl: "https://m701.music.126.net/20251201174931/eaf042ee027120de22894d7f402642f1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096492201/fab2/2979/8efb/5138b5c350ea003b6ed69762fd6b136a.mp3?vuutv=as8UfNbeSQys00aQy4WiG1Xeli+wyPB9CWU5KzG4pA95ccvHoYMdRp0R3jTsuulp8neeJW60b3NSIzEipUKYpjp84R8gXeiX/XQlwjh9f3g",
    theme: {
      dark: {
        base: '#110d09',                  // 暗暖土褐，像马踏过的旧路
        surface: 'rgba(32, 26, 20, 0.78)', // 更浅的褐色，像黄昏里剩下的影子
        text: '#f5efe9',                  // 微黄的旧纸色，柔和怀旧
        subtext: '#c7a98a',               // 淡暖驼色，有点风沙、有点故事感
        accent: '#d4a055',                // 温暖却不刺眼的金棕，像马鬃尾端的光
        glow: 'rgba(212, 160, 85, 0.28)', // 金棕色光晕，轻轻的，不炫
      },
      light: {
        base: '#faf7f2',                  // 旧相纸的米白
        surface: 'rgba(255, 255, 255, 0.85)',
        text: '#4b3a2c',                  // 深褐文字，沉稳、有情绪
        subtext: '#8c6f57',               // 柔棕，有点沙土气质
        accent: '#c88232',                // 暖橘棕，像夕阳映在马背上
        glow: 'rgba(200, 130, 50, 0.22)', // 温柔的日落光晕
      }
    },
    //https://music.163.com/song?id=1345353903&uct2=U2FsdGVkX19yBLixmTtVy/gy+WETYeMDc2BBBLTVxu0=
    lyricUrl: "https://api.bugpk.com/api/163_music?ids=1345353903&level=standard&type=json"
  }
];