import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../App';

interface LyricLine {
  time: number;
  text: string;
}

export const LyricView: React.FC = () => {
  const { currentSong, isLyricViewOpen, audioState, seek } = usePlayer();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- 1. Fetch & Parse Lyrics ---
  useEffect(() => {
    if (!currentSong?.lyricUrl) {
      setLyrics([]);
      return;
    }

    // Reset lyrics while loading
    setLyrics([]); 
    setActiveIndex(0);

    fetch(currentSong.lyricUrl)
      .then(async res => {
          const text = await res.text();
          try {
             // Try parsing as JSON first (common for some APIs)
             const json = JSON.parse(text);
             return typeof json.lyric === 'string' ? json.lyric : text;
          } catch {
             // If JSON parse fails, it's likely plain text (standard LRC)
             return text;
          }
      })
      .then(text => {
        const parsedLines: LyricLine[] = [];
        // Regex to match [mm:ss.xx]Text
        // Matches [00:00.00] or [00:00]
        const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/;

        text.split('\n').forEach(line => {
          const match = line.match(regex);
          if (match) {
            const minutes = parseInt(match[1], 10);
            const seconds = parseInt(match[2], 10);
            const ms = match[3] ? parseFloat("0." + match[3]) : 0;
            const content = match[4].trim();
            
            if (content) { 
              parsedLines.push({
                time: minutes * 60 + seconds + ms,
                text: content
              });
            }
          }
        });
        
        if (parsedLines.length === 0) {
             setLyrics([{ time: 0, text: "纯音乐 / No Lyrics" }]);
        } else {
             setLyrics(parsedLines);
        }
      })
      .catch(err => {
        console.error("Failed to load lyrics", err);
        setLyrics([{ time: 0, text: "歌词加载失败 / Failed to load" }]);
      });

  }, [currentSong]);

  // --- 2. Sync Logic ---
  useEffect(() => {
    if (lyrics.length === 0) return;

    const currentTime = audioState.currentTime;
    let newIndex = lyrics.findIndex((line, i) => {
      const nextTime = lyrics[i + 1]?.time || Infinity;
      return currentTime >= line.time && currentTime < nextTime;
    });

    if (newIndex === -1 && currentTime < lyrics[0].time) {
        newIndex = -1; // Intro
    } else if (newIndex === -1) {
        newIndex = lyrics.length - 1; // End
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [audioState.currentTime, lyrics]);

  // --- 3. Auto Scroll ---
  useEffect(() => {
    if (activeIndex >= 0 && lineRefs.current[activeIndex] && containerRef.current) {
        const activeEl = lineRefs.current[activeIndex];
        const container = containerRef.current;
        
        // Calculate the scroll position to center the active element
        const offset = activeEl!.offsetTop - container.clientHeight / 2 + activeEl!.clientHeight / 2;

        container.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isLyricViewOpen && currentSong && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="fixed inset-0 z-20 flex flex-col items-center justify-center pt-20 pb-32 px-6 bg-theme-base/95 backdrop-blur-md"
        >
          {/* Lyrics Container - Centered and Focused */}
          <div className="w-full max-w-2xl h-full flex items-center justify-center relative">
            
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
               <div className="w-[80vw] h-[80vw] md:w-[30vw] md:h-[30vw] border-[1px] rounded-full border-theme-accent animate-spin-slow" style={{ animationDuration: '60s' }} />
               <div className="absolute w-[60vw] h-[60vw] md:w-[22vw] md:h-[22vw] border-[1px] rounded-full border-dashed border-theme-accent animate-reverse-spin" style={{ animationDuration: '40s' }} />
            </div>

            <div 
                ref={containerRef}
                className="w-full h-[70vh] overflow-y-auto no-scrollbar text-center space-y-6 mask-image-gradient py-10"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
            >
                {/* Top Spacer for centering first line */}
                <div className="h-[35vh]" />
                
                {lyrics.length > 0 ? (
                  lyrics.map((line, idx) => {
                      const isActive = idx === activeIndex;

                      return (
                          <motion.div
                              key={idx}
                              ref={(el) => { lineRefs.current[idx] = el; }}
                              animate={{ 
                                scale: isActive ? 1.1 : 1, 
                                opacity: isActive ? 1 : 0.4,
                                filter: isActive ? 'blur(0px)' : 'blur(0.8px)',
                              }}
                              transition={{ duration: 0.4 }}
                              className={`
                                  transition-all duration-500 ease-out font-serif tracking-wider cursor-pointer
                                  ${isActive 
                                      ? 'text-lg md:text-2xl font-bold text-theme-accent' 
                                      : 'text-base md:text-lg text-theme-subtext hover:text-theme-text hover:opacity-70'
                                  }
                              `}
                              onClick={() => {
                                // Tap lyric line to seek to that position
                                seek(line.time); 
                              }}
                          >
                              <p className="py-1 leading-relaxed">{line.text}</p>
                          </motion.div>
                      )
                  })
                ) : (
                  <div className="text-theme-subtext animate-pulse">Loading Lyrics...</div>
                )}

                {/* Bottom Spacer */}
                <div className="h-[35vh]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};