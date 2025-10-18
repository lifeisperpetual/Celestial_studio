import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const handleEnter = (withAudio) => {
    // Store audio preference
    localStorage.setItem('audioEnabled', withAudio.toString());
    // Dispatch custom event to notify App
    document.dispatchEvent(new CustomEvent('audioChoice', { detail: { withAudio } }));
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-spin" 
                 style={{ animationDuration: '2s' }}>
              <div className="absolute inset-2 rounded-full bg-slate-950"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                CS
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold font-['Orbitron'] bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            CELESTIAL SNEAKERS
          </h1>
          <p className="text-slate-400 text-lg">Crafting the future of footwear</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center mt-8"
        >
          <button
            onClick={() => handleEnter(true)}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span>🔊</span>
            <span>Enter with Audio</span>
          </button>
          
          <button
            onClick={() => handleEnter(false)}
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span>🔇</span>
            <span>Enter without Audio</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
