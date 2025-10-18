import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ShoeCanvas from '../three/ShoeCanvas.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.99 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 18 }}
      className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/60 hover:bg-neutral-900"
    >
      <div className="h-56 bg-neutral-950">
        <Suspense fallback={<div className="h-full w-full grid place-items-center text-neutral-600">Loading 3D…</div>}>
          <ShoeCanvas modelUrl={product.modelUrl} color={product.color} small />
        </Suspense>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{product.name}</h4>
          <span className="text-brand-400 font-semibold">${(product.price / 100).toFixed(2)}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 rounded bg-brand-500 hover:bg-brand-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
