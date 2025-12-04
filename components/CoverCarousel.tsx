import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { usePlayer } from '../App';
import { PlayCircle } from 'lucide-react';

// Touch/drag configuration
const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe to register
const VELOCITY_THRESHOLD = 300; // Minimum velocity for a quick swipe

// Wheel scroll configuration
const WHEEL_COOLDOWN = 200; // Minimum ms between wheel-triggered switches (reduced for smoother feel)
const WHEEL_THRESHOLD = 20; // Minimum accumulated delta to trigger switch (lowered for better responsiveness)

export const CoverCarousel: React.FC = () => {
  const { currentSong, playSong, selectSong, isLyricViewOpen, playlist } = usePlayer();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [continuousOffset, setContinuousOffset] = useState(0); // Fractional offset for smooth scrolling
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for carousel container
  const outerContainerRef = useRef<HTMLDivElement>(null); // Ref for outer container (for wheel events)
  
  // Wheel scroll state
  const wheelAccumulatorRef = useRef(0);
  const lastWheelSwitchRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      const index = playlist.findIndex(s => s.id === currentSong.id);
      if (index >= 0 && index !== activeIndex) {
          setActiveIndex(index);
      }
    }
  }, [currentSong]);

  // Sync currentSong TO activeIndex (when Browsing/Dragging)
  useEffect(() => {
    if (playlist.length === 0) return;
    const selectedSong = playlist[activeIndex];
    if (selectedSong && currentSong?.id !== selectedSong.id) {
        selectSong(selectedSong);
    }
  }, [activeIndex]);

  // Mouse wheel handler for desktop horizontal scrolling
  useEffect(() => {
    if (isMobile || isLyricViewOpen || playlist.length === 0) return;

    const container = outerContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling
      e.preventDefault();
      
      const now = Date.now();
      
      // Check cooldown - prevent rapid switching
      if (now - lastWheelSwitchRef.current < WHEEL_COOLDOWN) {
        return;
      }
      
      // Accumulate scroll delta
      wheelAccumulatorRef.current += e.deltaY;
      
      // Clear any pending reset timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      
      // Check if accumulated delta exceeds threshold
      if (Math.abs(wheelAccumulatorRef.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
        
        setActiveIndex((prev) => {
          const newIndex = prev + direction;
          if (newIndex < 0) return playlist.length - 1;
          if (newIndex >= playlist.length) return 0;
          return newIndex;
        });
        
        // Reset accumulator and record switch time
        wheelAccumulatorRef.current = 0;
        lastWheelSwitchRef.current = now;
      }
      
      // Reset accumulator after a period of inactivity
      wheelTimeoutRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 150);
    };

    // Add wheel event listener to the outer container for better coverage
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [isMobile, isLyricViewOpen, playlist.length]);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Convert drag distance to continuous offset for visual feedback
    // Positive drag (right) should show previous song (move carousel left)
    const cardWidth = isMobile ? 256 : 384;
    // Use a more controlled sensitivity that caps at ~1 card offset
    const maxOffset = 1.2;
    const rawOffset = info.offset.x / cardWidth;
    const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
    setContinuousOffset(clampedOffset);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = isMobile ? 256 : 384;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    
    let direction = 0;
    
    // Check if velocity is high enough for a quick swipe (prioritize velocity)
    if (Math.abs(velocityX) > VELOCITY_THRESHOLD) {
      direction = velocityX > 0 ? -1 : 1; // Swipe right = previous, swipe left = next
    } 
    // Otherwise, check if drag distance exceeds threshold
    else if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
      direction = offsetX > 0 ? -1 : 1;
    }
    
    // Only switch by ONE song at a time for predictable behavior
    if (direction !== 0) {
      setActiveIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return playlist.length - 1;
        if (newIndex >= playlist.length) return 0;
        return newIndex;
      });
    }
    
    // Reset continuous offset
    setContinuousOffset(0);
  };

  const activeSong = playlist.length > 0 ? playlist[activeIndex] : null;

  // Helper to calculate circular distance
  // Returns: 0 (active), 1 (right), -1 (left), etc.
  const getOffset = (index: number, active: number, length: number) => {
    let diff = index - active;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  // Don't render carousel if no playlist
  if (playlist.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLyricViewOpen && (
        <motion.div
          ref={outerContainerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[60vh] md:h-[70vh] flex flex-col items-center justify-center perspective-1000"
        >
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="carousel-container relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center"
          >
            {playlist.map((song, index) => {
              const baseOffset = getOffset(index, activeIndex, playlist.length);
              // Add continuous offset for smooth dragging
              const offset = baseOffset + continuousOffset;
              const isActive = Math.abs(baseOffset) < 0.5;
              const isVisible = Math.abs(offset) <= 3;

              // Styles calculation based on offset
              let animateProps = {};
              
              if (isMobile) {
                // Stacked Deck Effect (Mobile) - Tuned
                animateProps = {
                  x: offset * 40, // 40px overlap
                  y: Math.abs(offset) * 10, // Slight drop for background cards
                  scale: 1 - Math.abs(offset) * 0.15, // Scale down background
                  opacity: isVisible ? (isActive ? 1 : 0.5) : 0, // Lower opacity for background
                  zIndex: Math.round(20 - Math.abs(offset)), // Layering
                  rotateY: 0, // No rotation for cleaner look
                  rotateZ: offset * 5, // Slight tilt
                };
              } else {
                // Flat Gallery Effect (Desktop)
                animateProps = {
                  x: offset * 110 + '%',
                  scale: isActive ? 1 : 0.85,
                  opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                  zIndex: isActive ? 20 : Math.round(10 - Math.abs(offset)),
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
                  onDrag={isActive ? handleDrag : undefined}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                  onClick={() => {
                    if (isActive) {
                        playSong(song);
                    } else if (Math.abs(baseOffset) <= 1) {
                        // Click immediate neighbor to navigate
                        if (baseOffset === 1) setActiveIndex((prev) => (prev + 1) % playlist.length);
                        if (baseOffset === -1) setActiveIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
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
             {/* 可选的「主题原因?」 */}
            <p className="text-xs tracking-[0.3em] font-light text-theme-subtext transition-colors duration-500">
              {/* TODO */}
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};