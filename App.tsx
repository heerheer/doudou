import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { PlayerContextType, Song, AudioState, Theme } from './types';
import { CoverCarousel } from './components/CoverCarousel';
import { BottomPlayerDock } from './components/BottomPlayerDock';
import { TopMiniDock } from './components/TopMiniDock';
import { LyricView } from './components/LyricView';
import { ConfigurationModal } from './components/ConfigurationModal';
import { Sun, Moon, Settings } from 'lucide-react';

// --- Context Setup ---
const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};

// --- Main App Component ---
const App: React.FC = () => {
  // Initialize with empty playlist - user must configure a data source
  const [playlist, setPlaylist] = useState<Song[]>([]); 
  const [currentSong, setCurrentSong] = useState<Song | null>(null); // null until songs are loaded
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
  });
  const [isLyricViewOpen, setLyricViewOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [dataSourceUrl, setDataSourceUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // --- Data Fetching Logic ---
  const loadSongsFromUrl = async (url: string) => {
    setIsLoading(true);
    setError('');
    try {
      // Basic URL validation
      try {
        new URL(url);
      } catch {
        throw new Error('Invalid URL format');
      }

      // Fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Validate that it's an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }
      
      // Validate that array elements have required Song properties
      if (data.length > 0) {
        const requiredFields = ['id', 'title', 'artist', 'coverUrl', 'audioUrl', 'lyricUrl', 'theme'];
        const invalidSongs = data.filter(song => 
          !requiredFields.every(field => field in song)
        );
        if (invalidSongs.length > 0) {
          throw new Error('Invalid song data: missing required fields');
        }
      }
      
      setPlaylist(data);
      setDataSourceUrl(url);
      
      // Set first song as current if available
      if (data.length > 0) {
        setCurrentSong(data[0]);
      }
    } catch (err) {
      let errorMessage = 'Failed to load songs';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timeout: Failed to load songs';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      console.error('Error loading songs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigSubmit = (url: string) => {
    loadSongsFromUrl(url);
  };

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
    if (!currentSong || playlist.length === 0) return;
    const idx = playlist.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % playlist.length;
    playSong(playlist[nextIdx]);
  };

  const prevSong = () => {
    if (!currentSong || playlist.length === 0) return;
    const idx = playlist.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIdx]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // --- Dynamic Style Injection ---
  // We use this to inject the CSS variables for the current song's theme
  // Default theme when no song is loaded
  const defaultTheme = {
    dark: {
      base: '#0a0a0a',
      surface: 'rgba(20, 20, 20, 0.75)',
      text: '#e5e5e5',
      subtext: '#a3a3a3',
      accent: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.25)',
    },
    light: {
      base: '#fafafa',
      surface: 'rgba(255, 255, 255, 0.85)',
      text: '#1a1a1a',
      subtext: '#525252',
      accent: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.20)',
    }
  };
  
  const activeTheme = currentSong ? currentSong.theme[theme] : defaultTheme[theme];
  
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
      playlist: playlist,
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

        {/* Header / Configuration and Theme Toggle */}
        <header className="fixed top-0 left-0 w-full p-6 z-30 flex justify-between items-start pointer-events-none">
          <button 
            onClick={() => setIsConfigModalOpen(true)}
            className="pointer-events-auto p-2 rounded-full transition-colors text-theme-subtext hover:bg-theme-surface"
            title="Configure Music Source"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className="pointer-events-auto p-2 rounded-full transition-colors text-theme-subtext hover:bg-theme-surface"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Configuration Modal */}
        <ConfigurationModal 
          isOpen={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          onSubmit={handleConfigSubmit}
          currentUrl={dataSourceUrl}
        />

        {/* Loading/Error State */}
        {isLoading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-theme-text text-lg">Loading songs...</div>
          </div>
        )}
        {error && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && playlist.length === 0 && (
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-theme-text mb-4">Welcome to DouDou Player</h2>
              <p className="text-theme-subtext mb-6">Click the settings icon to load your music library</p>
              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="px-6 py-3 bg-theme-accent text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Configure Music Source
              </button>
            </div>
          </div>
        )}

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