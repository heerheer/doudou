export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  lyricUrl: string;
  theme: {
    dark: ColorTheme;
    light: ColorTheme;
  }
}

export interface ColorTheme {
  base: string;    // Background base color (hex)
  surface: string; // Card/Dock background color (rgba)
  text: string;    // Primary text color
  subtext: string; // Secondary text color
  accent: string;  // Interactive elements / Highlights
  glow: string;    // Box shadows / Glow effects
}

export type Theme = 'dark' | 'light';

export interface AudioState {
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
}

export interface PlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  audioState: AudioState;
  theme: Theme;
  isLyricViewOpen: boolean;
  toggleTheme: () => void;
  playSong: (song: Song) => void;
  selectSong: (song: Song) => void;
  togglePlayPause: () => void;
  setLyricViewOpen: (open: boolean) => void;
  seek: (time: number) => void;
  nextSong: () => void;
  prevSong: () => void;
}