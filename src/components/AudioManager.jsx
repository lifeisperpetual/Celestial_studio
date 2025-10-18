import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../store/uiStore.js';

export default function AudioManager() {
  const { audioEnabled, toggleAudio } = useUIStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioEnabled]);

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        className={`p-3 rounded-full backdrop-blur-lg border transition-all ${
          audioEnabled 
            ? 'bg-violet-600/30 border-violet-500/50 text-violet-300' 
            : 'bg-slate-800/30 border-slate-600/50 text-slate-400'
        }`}
      >
        {audioEnabled ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.215 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.215l4.168-3.784zm2.617 1.52a1 1 0 011.414 0 6.095 6.095 0 010 8.608 1 1 0 11-1.414-1.414 4.095 4.095 0 000-5.78 1 1 0 010-1.414zm2.12 2.475a1 1 0 111.414 1.414 2 2 0 010 2.83 1 1 0 11-1.414-1.415 2 2 0 000-2.829z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.215 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.215l4.168-3.784zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>

      <audio ref={audioRef} loop autoPlay>
        <source src="/music/audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
