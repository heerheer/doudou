import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { PlayerContextType, Song, AudioState, Theme } from './types';
import { SONGS } from './constants';
import { CoverCarousel } from './components/CoverCarousel';
import { BottomPlayerDock } from './components/BottomPlayerDock';
import { TopMiniDock } from './components/TopMiniDock';
import { LyricView } from './components/LyricView';
import { Sun, Moon } from 'lucide-react';

// --- Context Setup ---
const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(SONGS[0]); 
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
  });
  const [isLyricViewOpen, setLyricViewOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // --- Audio Logic ---
  useEffect(() => {
    const audio = audioRef.current;
    
    // Initialize first song
    if (currentSong && !audio.src) {
        audio.src = currentSong.audioUrl;
    }

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioState(prev => ({
          ...prev,
          currentTime: audio.currentTime,
          duration: audio.duration,
          progress: (audio.currentTime / audio.duration) * 100
        }));
      }
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false, progress: 0 }));
      nextSong();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Play immediately
  const playSong = (song: Song) => {
    if (currentSong?.id === song.id && audioState.isPlaying) {
      setLyricViewOpen(true);
      return;
    }

    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setAudioState(prev => ({ ...prev, isPlaying: true }));
    setLyricViewOpen(true); // Open view on play
  };

  // Select without playing (Preview / Browsing)
  const selectSong = (song: Song) => {
    if (currentSong?.id === song.id) return;
    
    // Switch context: Pause previous, load new, but don't play
    audioRef.current.pause();
    audioRef.current.src = song.audioUrl;
    audioRef.current.currentTime = 0;
    
    setCurrentSong(song);
    setAudioState(prev => ({ ...prev, isPlaying: false, progress: 0, currentTime: 0 }));
  };

  const togglePlayPause = () => {
    if (audioState.isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current.src && currentSong) {
        audioRef.current.src = currentSong.audioUrl;
      }
      audioRef.current.play();
    }
    setAudioState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
  };

  const nextSong = () => {
    if (!currentSong) return;
    const idx = SONGS.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % SONGS.length;
    playSong(SONGS[nextIdx]);
  };

  const prevSong = () => {
    if (!currentSong) return;
    const idx = SONGS.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + SONGS.length) % SONGS.length;
    playSong(SONGS[prevIdx]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // --- Dynamic Style Injection ---
  // We use this to inject the CSS variables for the current song's theme
  const activeTheme = currentSong ? currentSong.theme[theme] : SONGS[0].theme[theme];
  
  const styleVariables = {
    '--theme-base': activeTheme.base,
    '--theme-surface': activeTheme.surface,
    '--theme-text': activeTheme.text,
    '--theme-subtext': activeTheme.subtext,
    '--theme-accent': activeTheme.accent,
    '--theme-glow': activeTheme.glow,
  } as React.CSSProperties;

  return (
    <PlayerContext.Provider value={{
      currentSong,
      playlist: SONGS,
      audioState,
      theme,
      isLyricViewOpen,
      toggleTheme,
      playSong,
      selectSong,
      togglePlayPause,
      setLyricViewOpen,
      seek,
      nextSong,
      prevSong
    }}>
      <div 
        className="relative w-full h-screen overflow-hidden transition-colors duration-1000 ease-in-out bg-theme-base"
        style={styleVariables}
      >
        {/* Background Atmosphere */}
        <div className={`absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-0 mix-blend-overlay`} />
        
        {/* Dynamic Light Effect - Background Blob */}
        <div 
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] transition-all duration-1000 opacity-40 mix-blend-screen"
            style={{ backgroundColor: activeTheme.accent }}
        />
        <div 
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-all duration-1000 opacity-20 mix-blend-screen"
             style={{ backgroundColor: activeTheme.accent }}
        />

        {/* Header / Theme Toggle */}
        <header className="fixed top-0 left-0 w-full p-6 z-30 flex justify-end items-start pointer-events-none">
          <button 
            onClick={toggleTheme}
            className="pointer-events-auto p-2 rounded-full transition-colors text-theme-subtext hover:bg-theme-surface"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <TopMiniDock />
          <CoverCarousel />
          <LyricView />
          <BottomPlayerDock />
        </main>

      </div>
    </PlayerContext.Provider>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);