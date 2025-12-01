import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, ListMusic } from 'lucide-react';
import { usePlayer } from '../App';

export const BottomPlayerDock: React.FC = () => {
  const { currentSong, audioState, togglePlayPause, setLyricViewOpen, nextSong, prevSong } = usePlayer();

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-center"
    >
      <div 
        className="w-full md:w-[600px] rounded-3xl backdrop-blur-2xl border shadow-glow p-4 flex flex-col gap-3 transition-colors duration-500 bg-theme-surface border-theme-accent/30"
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Info & Open Lyric Click Area */}
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer group"
            onClick={() => setLyricViewOpen(true)}
          >
            {/* Spinning Vinyl Effect on Cover */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 shadow-lg relative border-theme-accent/50 transition-colors duration-500">
              <img 
                src={currentSong.coverUrl} 
                className={`w-full h-full object-cover ${audioState.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`} 
                alt="cover" 
              />
              {/* Central hole for vinyl look */}
              <div className="absolute inset-0 m-auto w-3 h-3 bg-black rounded-full border border-theme-accent/30 z-10" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold font-serif tracking-wide group-hover:text-theme-accent transition-colors text-theme-text">
                {currentSong.title}
              </span>
              <span className="text-xs text-theme-subtext">
                {currentSong.artist}
              </span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-4">
             <button 
              onClick={prevSong}
              className="hidden md:block hover:scale-110 transition-transform text-theme-subtext hover:text-theme-accent"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all bg-theme-accent text-theme-base shadow-theme-glow"
            >
              {audioState.isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>

            <button 
              onClick={nextSong}
              className="hover:scale-110 transition-transform text-theme-subtext hover:text-theme-accent"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
            
            <button className="hidden md:block opacity-50 hover:opacity-100 text-theme-subtext hover:text-theme-accent">
              <ListMusic size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-theme-subtext/20 rounded-full overflow-hidden cursor-pointer group">
          <motion.div 
            className="h-full bg-theme-accent"
            style={{ width: `${audioState.progress}%` }}
            layoutId="progressBar"
          />
        </div>
      </div>
    </motion.div>
  );
};