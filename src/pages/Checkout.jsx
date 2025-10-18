import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

// Sign In/Up Form Component
function SignInForm({ items, getTotalPrice }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (activeTab === 'signup') {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        // Validate password length
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          setIsLoading(false);
          return;
        }

        // Sign up API call
        const response = await fetch(API_ENDPOINTS.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Sign up failed');
        }

        // Store user data
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        window.location.reload(); // Reload to update auth state
        
      } else {
        // Sign in API call
        const response = await fetch(API_ENDPOINTS.signin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Sign in failed');
        }

        // Store user data
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        window.location.reload(); // Reload to update auth state
      }
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Auto-scroll to form on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('auth-form')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-0 holographic-border overflow-hidden"
        >
          {/* Left Side - Navigation */}
          <div className="bg-gradient-to-br from-violet-900/40 via-fuchsia-900/40 to-purple-900/40 p-6 md:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-['Orbitron'] font-bold mb-4 md:mb-6 bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Welcome to CELESTIAL
              </h1>
              <p className="text-slate-300 mb-8 md:mb-12 text-base md:text-lg leading-relaxed">
                Join the future of sneaker customization. Create your account or sign in to unlock exclusive features.
              </p>

              {/* Tab Buttons */}
              <div className="space-y-3 md:space-y-4">
                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabChange('signin')}
                  className={`w-full text-left px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ${
                    activeTab === 'signin'
                      ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/50'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Sign In</span>
                    <span className="text-xl md:text-2xl">🔐</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabChange('signup')}
                  className={`w-full text-left px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ${
                    activeTab === 'signup'
                      ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/50'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Sign Up</span>
                    <span className="text-xl md:text-2xl">✨</span>
                  </div>
                </motion.button>
              </div>

              <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-slate-700">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">Your Cart Summary</h3>
                <div className="text-slate-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base">{items.length} item{items.length !== 1 ? 's' : ''}</span>
                    <span className="text-xl md:text-2xl font-bold text-violet-400">${(getTotalPrice() / 100).toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Your cart will be saved when you create an account
                </p>
                
                <div className="mt-6 hidden md:block">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Why Join Us?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Customize unique sneakers',
                      'Track your orders',
                      'Exclusive member deals',
                      'Early access to new designs'
                    ].map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-center space-x-3 text-slate-300"
                      >
                        <span className="text-violet-400">✓</span>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div id="auth-form" className="bg-slate-900/50 backdrop-blur-lg p-6 md:p-12 flex items-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                {activeTab === 'signin' ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-['Orbitron'] font-bold text-white mb-2">
                        Sign In
                      </h2>
                      <p className="text-sm md:text-base text-slate-400">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 md:p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-xs md:text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="••••••••"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full futuristic-btn py-2.5 md:py-3 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          'Sign In'
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-['Orbitron'] font-bold text-white mb-2">
                        Create Account
                      </h2>
                      <p className="text-sm md:text-base text-slate-400">Join CELESTIAL and start customizing.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 md:p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-xs md:text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all text-sm md:text-base"
                          placeholder="••••••••"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-2.5 md:py-3 rounded-lg font-semibold text-base md:text-lg hover:from-fuchsia-600 hover:to-pink-600 transition-all shadow-lg shadow-fuchsia-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('creditcard');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      setIsAuthenticated(!!(userId && userEmail));
      setAuthChecking(false);
    };
    
    checkAuth();
  }, []);

  const paymentMethods = [
    { id: 'creditcard', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'venmo', name: 'Venmo', icon: '💰' },
    { id: 'applepay', name: 'Apple Pay', icon: '🍎' },
    { id: 'googlepay', name: 'Google Pay', icon: '🟢' }
  ];

  const handlePayment = async () => {
    setOrderProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderProcessing(false);
      clearCart();
      navigate('/order-success');
    }, 3000);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen pt-20 px-6 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Show sign-up prompt if not authenticated
  if (!isAuthenticated) {
    return <SignInForm items={items} getTotalPrice={getTotalPrice} />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/studio')}
            className="futuristic-btn px-8 py-3"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-['Orbitron'] font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Checkout
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="holographic-border">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/50">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: item.color + '20' }}
                      >
                        👟
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <div 
                              className="w-3 h-3 rounded-full border border-slate-600"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-slate-400">{item.colorName}</span>
                          </div>
                          <span className="text-xs text-slate-400">• {item.materialName}</span>
                          <span className="text-xs text-slate-400">• {item.sizeName}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-slate-400">Qty: {item.quantity}</span>
                          <span className="text-violet-400 font-semibold">${(item.price / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-violet-500/20 pt-4 mt-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-violet-400">${(getTotalPrice() / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Payment Methods */}
            <div className="holographic-border">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === method.id
                          ? 'border-violet-500 bg-violet-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <span className="text-sm text-slate-300">{method.name}</span>
                    </button>
                  ))}
                </div>

                {/* Payment Forms */}
                {selectedPayment === 'creditcard' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                )}

                {selectedPayment === 'upi' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="UPI ID (e.g., user@paytm)"
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                )}

                {selectedPayment === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🅿️</div>
                    <p className="text-slate-400">You will be redirected to PayPal to complete your payment</p>
                  </div>
                )}

                {selectedPayment === 'venmo' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Venmo Username"
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                )}

                {(selectedPayment === 'applepay' || selectedPayment === 'googlepay') && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">{selectedPayment === 'applepay' ? '🍎' : '🟢'}</div>
                    <p className="text-slate-400">Touch ID or Face ID required to complete payment</p>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="holographic-border">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Billing Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={orderProcessing}
              className="w-full futuristic-btn text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {orderProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Complete Order - $${(getTotalPrice() / 100).toFixed(2)}`
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
