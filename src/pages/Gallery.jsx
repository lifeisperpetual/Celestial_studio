import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useCartStore } from '../store/cartStore.jsx';

export default function Gallery() {
  const { addItem } = useCartStore();
  const [selectedSizes, setSelectedSizes] = useState({});

  // Detect mobile for performance optimization
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  // Simplified animations for mobile
  const cardVariants = {
    initial: { opacity: 0, y: isMobile ? 20 : 50 },
    animate: { opacity: 1, y: 0 },
    hover: isMobile ? {} : { y: -10, scale: 1.02 }
  };

  const buttonVariants = {
    hover: isMobile ? {} : { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

  const handleSizeSelect = (sneakerId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [sneakerId]: size
    }));
  };

  const handleAddToCart = (sneaker) => {
    const selectedSize = selectedSizes[sneaker.id];
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    
    addItem({
      ...sneaker,
      size: selectedSize
    });
  };

  const sneakers = [
    {
      id: 'air-flux-violet',
      name: 'Air Flux Violet',
      price: 24999,
      color: '#8b5cf6',
      image: '/placeholder-shoe.jpg',
      description: 'Futuristic design meets comfort'
    },
    {
      id: 'cyber-runner-pink',
      name: 'Cyber Runner Pink',
      price: 27999,
      color: '#ec4899',
      image: '/placeholder-shoe.jpg',
      description: 'High-performance athletic sneaker'
    },
    {
      id: 'neon-glide-cyan',
      name: 'Neon Glide Cyan',
      price: 22999,
      color: '#06b6d4',
      image: '/placeholder-shoe.jpg',
      description: 'Street style with neon accents'
    },
    {
      id: 'quantum-leap-green',
      name: 'Quantum Leap Green',
      price: 31999,
      color: '#10b981',
      image: '/placeholder-shoe.jpg',
      description: 'Limited edition quantum series'
    },
    {
      id: 'solar-burst-orange',
      name: 'Solar Burst Orange',
      price: 25999,
      color: '#f97316',
      image: '/placeholder-shoe.jpg',
      description: 'Bold and energetic design'
    },
    {
      id: 'crimson-velocity-red',
      name: 'Crimson Velocity Red',
      price: 28999,
      color: '#ef4444',
      image: '/placeholder-shoe.jpg',
      description: 'Speed-inspired performance shoe'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-['Orbitron'] font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Sneaker Gallery
          </h1>
          <p className="text-xl text-slate-300">Explore our collection of premium designer sneakers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {sneakers.map((sneaker, index) => (
            <motion.div
              key={sneaker.id}
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={cardVariants}
              transition={{ 
                delay: isMobile ? 0 : index * 0.1,
                duration: isMobile ? 0.2 : 0.3,
                ease: "easeOut"
              }}
              className="holographic-border group cursor-pointer"
            >
              <div className="p-4 md:p-6">
                {/* Placeholder for 3D shoe */}
                <div 
                  className="h-32 md:h-48 rounded-lg mb-4 flex items-center justify-center text-4xl md:text-6xl transition-colors duration-200"
                  style={{ backgroundColor: sneaker.color + '20' }}
                >
                  👟
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-violet-300 transition-colors duration-200">
                  {sneaker.name}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4">{sneaker.description}</p>
                
                {/* Size Selection */}
                <div className="mb-4">
                  <p className="text-sm text-slate-300 mb-2">Size (US)</p>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(sneaker.id, size)}
                        className={`py-1 px-1 md:px-2 text-xs rounded border transition-all duration-200 ${
                          selectedSizes[sneaker.id] === size
                            ? 'bg-violet-600 border-violet-600 text-white'
                            : 'border-slate-600 text-slate-400 hover:border-violet-500 hover:text-violet-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl md:text-2xl font-bold text-violet-400">
                    ${(sneaker.price / 100).toFixed(2)}
                  </span>
                  
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.1 }}
                    onClick={() => handleAddToCart(sneaker)}
                    className="px-4 md:px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 text-sm md:text-base"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
