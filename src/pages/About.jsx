import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function About() {
  // Detect mobile for performance optimization
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  const team = [
    {
      name: 'Chirag Nagpal',
      role: 'Creative Developer',
      email: 'ChiragNagpal@outlook.in',
      linkedin: 'https://www.linkedin.com/in/chirag-nagpal-613777221/',
      avatar: '👨‍🎨'
    },
    {
      name: 'Druv Nagpal',
      role: 'Creative Developer',
      email: 'DruvNagpal@gmail.com',
      linkedin: 'https://linkedin.com/in/druv-nagpal',
      avatar: '👨‍💻'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of what\'s possible in digital design',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'Every detail matters in creating premium experiences',
      icon: '💎'
    },
    {
      title: 'Accessibility',
      description: 'Making professional design tools available to everyone',
      icon: '🌍'
    },
    {
      title: 'Sustainability',
      description: 'Reducing waste through digital-first design processes',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-['Orbitron'] font-bold mb-4 md:mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            About Celestial Sneakers
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the sneaker industry by combining cutting-edge 3D technology
            with premium craftsmanship to create the future of footwear design.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="mb-16 md:mb-20"
        >
          <div className="holographic-border">
            <div className="p-6 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Our Mission</h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
                To democratize sneaker design by providing creators worldwide with professional-grade
                3D tools, enabling anyone to bring their footwear visions to life with unprecedented
                detail and realism.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-white">Meet Our Team</h2>
          <p className="text-base md:text-lg text-slate-300 text-center mb-6 md:mb-8 max-w-3xl mx-auto">
            We are passionate developers specializing in Three.js and creating immersive web experiences. 
            Our expertise lies in building cutting-edge 3D websites that push the boundaries of what's possible in the browser.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={isMobile ? {} : { y: -5 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: isMobile ? 0 : index * 0.1,
                  duration: isMobile ? 0.2 : 0.3
                }}
                className="holographic-border"
              >
                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-violet-400 font-semibold mb-4">{member.role}</p>
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${member.email}`}
                      className="block text-slate-400 hover:text-violet-400 transition-colors duration-200 text-sm md:text-base"
                    >
                      📧 {member.email}
                    </a>
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-400 hover:text-violet-400 transition-colors duration-200 text-sm md:text-base"
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -30 : 30) }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={isMobile ? {} : { scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: isMobile ? 0 : index * 0.1,
                  duration: isMobile ? 0.2 : 0.3
                }}
                className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-200"
              >
                <div className="text-3xl md:text-4xl">{value.icon}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
