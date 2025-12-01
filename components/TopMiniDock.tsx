import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePlayer } from '../App';

export const TopMiniDock: React.FC = () => {
  const { currentSong, isLyricViewOpen, setLyricViewOpen } = usePlayer();

  return (
    <AnimatePresence>
      {isLyricViewOpen && currentSong && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          {/* Dynamic Island Container */}
          <div 
            className="pointer-events-auto relative flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-full shadow-lg backdrop-blur-xl border transition-colors duration-500 bg-theme-surface border-theme-accent/30 text-theme-accent shadow-theme-glow min-w-[180px] max-w-[240px]"
          >
            {/* Tiny Cover Art */}
            <motion.div 
              layoutId={`cover-${currentSong.id}`} 
              className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-theme-accent/50"
            >
              <img src={currentSong.coverUrl} alt="mini cover" className="w-full h-full object-cover" />
            </motion.div>

            {/* Song Info - Marquee Scroll */}
            <div className="flex flex-col items-start justify-center flex-1 overflow-hidden h-8">
               <div className="w-full overflow-hidden flex items-center h-full">
                  <div className="animate-marquee whitespace-nowrap flex gap-8">
                     {/* Duplicate content to create seamless loop effect */}
                     <span className="text-sm font-serif font-bold tracking-widest text-theme-text">
                       {currentSong.title} - {currentSong.artist}
                     </span>
                     <span className="text-sm font-serif font-bold tracking-widest text-theme-text">
                       {currentSong.title} - {currentSong.artist}
                     </span>
                  </div>
               </div>
            </div>

            {/* Close Button Only */}
            <div className="flex items-center">
              <button 
                onClick={() => setLyricViewOpen(false)}
                className="p-1 rounded-full transition-colors flex-shrink-0 hover:bg-theme-subtext/20 text-theme-subtext hover:text-theme-text"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};