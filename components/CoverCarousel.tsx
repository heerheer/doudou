import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SONGS } from '../constants';
import { usePlayer } from '../App';
import { PlayCircle } from 'lucide-react';

export const CoverCarousel: React.FC = () => {
  const { currentSong, playSong, selectSong, isLyricViewOpen } = usePlayer();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync activeIndex FROM currently playing song (e.g. when using Bottom Dock Next/Prev)
  useEffect(() => {
    if (currentSong) {
      const index = SONGS.findIndex(s => s.id === currentSong.id);
      if (index >= 0 && index !== activeIndex) {
          setActiveIndex(index);
      }
    }
  }, [currentSong]);

  // Sync currentSong TO activeIndex (when Browsing/Dragging)
  useEffect(() => {
    const selectedSong = SONGS[activeIndex];
    if (currentSong?.id !== selectedSong.id) {
        selectSong(selectedSong);
    }
  }, [activeIndex]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 20; 
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % SONGS.length);
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    }
  };

  const activeSong = SONGS[activeIndex];

  // Helper to calculate circular distance
  // Returns: 0 (active), 1 (right), -1 (left), etc.
  const getOffset = (index: number, active: number, length: number) => {
    let diff = index - active;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  return (
    <AnimatePresence>
      {!isLyricViewOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[60vh] md:h-[70vh] flex flex-col items-center justify-center perspective-1000"
        >
          {/* Carousel Container */}
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            {SONGS.map((song, index) => {
              const offset = getOffset(index, activeIndex, SONGS.length);
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2; // Increased visibility range for mobile stack

              // Styles calculation based on offset
              let animateProps = {};
              
              if (isMobile) {
                // Stacked Deck Effect (Mobile) - Tuned
                animateProps = {
                  x: offset * 40, // 40px overlap
                  y: Math.abs(offset) * 10, // Slight drop for background cards
                  scale: 1 - Math.abs(offset) * 0.15, // Scale down background
                  opacity: isVisible ? (isActive ? 1 : 0.5) : 0, // Lower opacity for background
                  zIndex: 20 - Math.abs(offset), // Layering
                  rotateY: 0, // No rotation for cleaner look
                  rotateZ: offset * 5, // Slight tilt
                };
              } else {
                // Flat Gallery Effect (Desktop)
                animateProps = {
                  x: offset * 110 + '%',
                  scale: isActive ? 1 : 0.85,
                  opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                  zIndex: isActive ? 20 : (10 - Math.abs(offset)),
                  rotateY: offset * -15, 
                  rotateZ: 0,
                };
              }

              return (
                <motion.div
                  key={song.id}
                  className={`absolute rounded-2xl overflow-hidden shadow-2xl origin-center transition-shadow duration-500
                    ${isActive ? 'shadow-glow cursor-pointer' : 'cursor-default'}
                  `}
                  initial={false} 
                  animate={animateProps}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30 
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (isActive) {
                        playSong(song);
                    } else if (Math.abs(offset) <= 1) {
                        // Click immediate neighbor to navigate (selects song via activeIndex effect)
                        if (offset === 1) setActiveIndex((prev) => (prev + 1) % SONGS.length);
                        if (offset === -1) setActiveIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    visibility: isVisible ? 'visible' : 'hidden', 
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                >
                  <div className="relative w-full h-full bg-theme-surface">
                    <img 
                      src={song.coverUrl} 
                      alt={song.title} 
                      loading="eager"
                      draggable={false}
                      className="w-full h-full object-cover select-none pointer-events-none" 
                    />
                    
                    {!isActive && <div className="absolute inset-0 bg-black/40 transition-colors duration-500" />}
                    
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle size={64} className="text-white/90 drop-shadow-lg" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Song Info */}
          <motion.div 
            key={activeSong.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-16 md:mt-12 text-center z-10"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-widest mb-2 text-theme-accent transition-colors duration-500">
              {activeSong.title}
            </h2>
            <p className="text-xs tracking-[0.3em] font-light uppercase text-theme-subtext transition-colors duration-500">
              {activeSong.artist}
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};