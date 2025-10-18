import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { useCartStore } from '../store/cartStore.jsx';
import SneakerModel from '../components/3d/SneakerModel.jsx';

export default function Studio() {
  const { addItem } = useCartStore();
  const [selectedColor, setSelectedColor] = useState('#8b5cf6');
  const [selectedMaterial, setSelectedMaterial] = useState('leather');
  const [selectedSize, setSelectedSize] = useState('9');

  const colors = [
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Fuchsia', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Red', value: '#ef4444' }
  ];

  const materials = [
    { name: 'Cotton', value: 'leather' },
    { name: 'Nylon', value: 'canvas' },
    { name: 'Leather', value: 'mesh' },
    { name: 'Synthetic', value: 'suede' }
  ];

  const sizes = [
    { name: 'US 6', value: '6' },
    { name: 'US 7', value: '7' },
    { name: 'US 8', value: '8' },
    { name: 'US 9', value: '9' },
    { name: 'US 10', value: '10' },
    { name: 'US 11', value: '11' },
    { name: 'US 12', value: '12' }
  ];

  const handleAddToCart = () => {
    const selectedColorObj = colors.find(c => c.value === selectedColor);
    const selectedMaterialObj = materials.find(m => m.value === selectedMaterial);
    const selectedSizeObj = sizes.find(s => s.value === selectedSize);
    
    const customShoe = {
      id: `custom-${Date.now()}`,
      name: `Custom Sneaker - ${selectedColorObj?.name}`,
      price: 29999, // $299.99
      color: selectedColor,
      colorName: selectedColorObj?.name,
      material: selectedMaterial,
      materialName: selectedMaterialObj?.name,
      size: selectedSize,
      sizeName: selectedSizeObj?.name,
      image: '/placeholder-shoe.jpg'
    };
    addItem(customShoe);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-['Orbitron'] font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Design Studio
          </h1>
          <p className="text-xl text-slate-300">Create your perfect sneaker with our 3D customization tools</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="holographic-border"
          >
            <div className="h-96 rounded-xl overflow-hidden">
              <Canvas camera={{ position: [8, 4, 8], fov: 75 }} shadows>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                  <pointLight position={[-5, 5, 5]} intensity={0.5} />
                  
                  <SneakerModel 
                    color={selectedColor} 
                    material={selectedMaterial}
                    position={[0, -2, 0]}
                    scale={0.05}
                    rotation={[0, Math.PI / 4, 0]}
                  />
                  
                  <Environment preset="city" />
                  <OrbitControls 
                    enableZoom={true} 
                    autoRotate 
                    autoRotateSpeed={3.3}
                    target={[0, 0, 0]}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Color Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Choose Color</h3>
              <div className="grid grid-cols-3 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm text-slate-300">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Choose Material</h3>
              <div className="grid grid-cols-2 gap-4">
                {materials.map((material) => (
                  <button
                    key={material.value}
                    onClick={() => setSelectedMaterial(material.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMaterial === material.value
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-slate-300">{material.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Choose Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedSize === size.value
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-sm text-slate-300">{size.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full futuristic-btn text-lg py-4"
            >
              Add to Cart - $299.99
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
