import { Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import CartSidebar from './components/CartSidebar.jsx';
import Home from './pages/Home.jsx';
import Studio from './pages/Studio.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
import { CartProvider } from './store/cartStore.jsx';
import { useUIStore } from './store/uiStore.js';
import LoadingScreen from './components/LoadingScreen.jsx';
import Cursor from './components/Cursor.jsx';
import AudioManager from './components/AudioManager.jsx';
import './styles/globals.css';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import SignIn from './pages/SignIn.jsx';

export default function App() {
  const { isLoading, setLoading } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoadingScreen');
    
    if (hasSeenLoading) {
      // Skip loading screen, user has already entered
      setLoading(false);
      setMounted(true);
      
      // Check if audio was previously enabled
      const savedAudioPref = localStorage.getItem('audioEnabled');
      if (savedAudioPref === 'true') {
        setAudioEnabled(true);
      }
    }

    const handleAudioChoice = (e) => {
      setAudioEnabled(e.detail.withAudio);
      setLoading(false);
      setMounted(true);
      // Mark that user has seen the loading screen in this session
      sessionStorage.setItem('hasSeenLoadingScreen', 'true');
    };

    document.addEventListener('audioChoice', handleAudioChoice);
    return () => document.removeEventListener('audioChoice', handleAudioChoice);
  }, [setLoading]);

  return (
    <CartProvider>
      <div className="app-container">
        <Cursor />
        {audioEnabled && <AudioManager />}
        
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loading" />}
        </AnimatePresence>

        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
          >
            <div className="grain-overlay" />
            <Navbar />
            <CartSidebar />
            
            <main className="relative z-10">
              <Suspense fallback={<div className="loading-fallback">Loading experience...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/studio" element={<Studio />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
              </Suspense>
            </main>
          </motion.div>
        )}
      </div>
    </CartProvider>
  );
}
