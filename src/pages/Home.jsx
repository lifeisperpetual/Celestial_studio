import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OrbitControls, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ParticleField from '../components/3d/ParticleField.jsx';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      title: "3D Visualization",
      description: "Experience your designs in photorealistic 3D with real-time rendering and dynamic lighting.",
      icon: "🎨",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "AI-Powered Design",
      description: "Let our AI assist you in creating unique patterns and colorways based on your preferences.",
      icon: "🤖",
      gradient: "from-fuchsia-500 to-pink-600"
    },
    {
      title: "Material Physics",
      description: "Simulate real-world materials with advanced physics - feel leather, mesh, and rubber textures virtually.",
      icon: "⚡",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div ref={containerRef} className="touch-auto" style={{ touchAction: 'auto' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 45 }}
            style={{ pointerEvents: 'none', touchAction: 'auto' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
              
              <ParticleField />
              <Environment preset="city" />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                enableRotate={false}
                autoRotate 
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 touch-auto"
        >
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-['Orbitron'] font-black mb-4 sm:mb-6">
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent neon-glow">
                CELESTIAL
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 font-normal tracking-[0.1em] sm:tracking-[0.2em]">
                SNEAKER STUDIO
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Experience the future of footwear design in our immersive 3D studio. 
            Craft, customize, and create the perfect sneaker with cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <Link to="/studio" className="group w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                className="futuristic-btn text-base sm:text-lg w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 group-hover:shadow-violet-500/50"
              >
                <span className="relative z-10">Enter Studio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>

            <Link to="/gallery" className="group w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-violet-500/50 text-violet-300 rounded-lg font-semibold hover:border-violet-400 hover:text-white hover:bg-violet-500/10 transition-all duration-300"
              >
                View Gallery
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Hide on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-0 right-0 hidden sm:block z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center justify-center space-y-2 text-slate-400 text-center mx-auto w-fit"
          >
            <span className="text-sm uppercase tracking-wider whitespace-nowrap">Scroll to explore</span>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Orbitron'] font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Revolutionary Design Experience
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-4">
              Step into the future of sneaker design with our cutting-edge 3D technology and immersive experiences.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="holographic-border group cursor-pointer"
              >
                <div className="p-6 sm:p-8 h-full">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-violet-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Orbitron'] font-bold mb-6 sm:mb-8 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Ready to Create?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 px-4">
              Join thousands of designers already creating the future of footwear.
            </p>
            <Link to="/studio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="futuristic-btn text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 w-full sm:w-auto"
              >
                Start Designing Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
