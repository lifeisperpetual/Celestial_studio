import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore.jsx';
import { useUIStore } from '../store/uiStore.js';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { cartOpen, setCartOpen } = useUIStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md lg:max-w-lg bg-slate-900 z-50 shadow-2xl border-l border-violet-500/20"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-violet-500/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Cart</h2>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-full hover:bg-violet-600/20 transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                {items.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-4">🛒</div>
                    <p className="text-slate-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                      >
                        <div 
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-lg sm:text-2xl flex-shrink-0"
                          style={{ backgroundColor: item.color + '20' }}
                        >
                          👟
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm sm:text-base truncate">{item.name}</h3>
                          <p className="text-violet-400 text-sm sm:text-base">${(item.price / 100).toFixed(2)}</p>
                          
                          {/* Color and Material Display */}
                          <div className="flex items-center space-x-4 mt-1">
                            {item.colorName && (
                              <div className="flex items-center space-x-1">
                                <div 
                                  className="w-3 h-3 rounded-full border border-slate-600"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs text-slate-400">{item.colorName}</span>
                              </div>
                            )}
                            {item.materialName && (
                              <span className="text-xs text-slate-400">• {item.materialName}</span>
                            )}
                            {item.sizeName && (
                              <span className="text-xs text-slate-400">• {item.sizeName}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 transition-colors text-sm sm:text-base"
                            >
                              -
                            </button>
                            <span className="w-6 sm:w-8 text-center text-white text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 transition-colors text-sm sm:text-base"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-violet-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-white">Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-violet-400">
                      ${(getTotalPrice() / 100).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={clearCart}
                      className="w-full py-2 sm:py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800/50 transition-colors text-sm sm:text-base"
                    >
                      Clear Cart
                    </button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all text-sm sm:text-base"
                    >
                      Checkout
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
