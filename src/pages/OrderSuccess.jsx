import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen pt-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-8xl mb-8"
        >
          ✅
        </motion.div>
        
        <h1 className="text-4xl font-['Orbitron'] font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Order Confirmed!
        </h1>
        
        <p className="text-xl text-slate-300 mb-8">
          Thank you for your purchase! Your custom sneakers are being crafted with love and will be shipped soon.
        </p>
        
        <div className="holographic-border mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <span className="text-violet-400">📧</span>
                <span className="text-slate-300">Order confirmation sent to your email</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-violet-400">🏭</span>
                <span className="text-slate-300">Your sneakers will be crafted within 3-5 business days</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-violet-400">🚚</span>
                <span className="text-slate-300">Free shipping - delivered in 7-10 business days</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/studio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="futuristic-btn px-8 py-3"
            >
              Design Another Pair
            </motion.button>
          </Link>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-violet-500/50 text-violet-300 rounded-lg font-semibold hover:border-violet-400 hover:text-white hover:bg-violet-500/10 transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
