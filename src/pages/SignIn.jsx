import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

export default function SignIn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

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

        console.log('Attempting signup with:', { name: formData.name, email: formData.email });

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
        console.log('Signup response:', data);

        if (!response.ok) {
          throw new Error(data.message || 'Sign up failed');
        }

        // Store user data
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        
        setSuccess('Account created successfully! Redirecting...');
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          name: '',
          confirmPassword: ''
        });
        
        setTimeout(() => {
          navigate('/checkout');
        }, 1500);

      } else {
        console.log('Attempting signin with:', { email: formData.email });

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
        console.log('Signin response:', data);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          throw new Error(data.message || 'Sign in failed');
        }

        // Store user data
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/checkout');
        }, 1500);
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Check if it's a network error
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

  return (
    <div className="min-h-screen pt-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-0 holographic-border overflow-hidden"
        >
          {/* Left Side - Navigation */}
          <div className="bg-gradient-to-br from-violet-900/40 via-fuchsia-900/40 to-purple-900/40 p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-['Orbitron'] font-bold mb-6 bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                Welcome to CELESTIAL
              </h1>
              <p className="text-slate-300 mb-12 text-lg leading-relaxed">
                Join the future of sneaker customization. Create your account or sign in to unlock exclusive features.
              </p>

              {/* Tab Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('signin')}
                  className={`w-full text-left px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    activeTab === 'signin'
                      ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/50'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Sign In</span>
                    <span className="text-2xl">🔐</span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('signup')}
                  className={`w-full text-left px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    activeTab === 'signup'
                      ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/50'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Sign Up</span>
                    <span className="text-2xl">✨</span>
                  </div>
                </motion.button>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-700">
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
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-slate-900/50 backdrop-blur-lg p-12 flex items-center">
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
                    <div className="mb-8">
                      <h2 className="text-3xl font-['Orbitron'] font-bold text-white mb-2">
                        Sign In
                      </h2>
                      <p className="text-slate-400">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                      
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm"
                        >
                          {success}
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-violet-500 focus:ring-violet-500"
                          />
                          <span className="text-sm text-slate-400">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full futuristic-btn py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          'Sign In'
                        )}
                      </motion.button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-slate-900 text-slate-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                        >
                          <span className="text-xl">🔍</span>
                          <span className="text-slate-300">Google</span>
                        </button>
                        <button
                          type="button"
                          className="px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                        >
                          <span className="text-xl">📘</span>
                          <span className="text-slate-300">Facebook</span>
                        </button>
                      </div>
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
                    <div className="mb-8">
                      <h2 className="text-3xl font-['Orbitron'] font-bold text-white mb-2">
                        Create Account
                      </h2>
                      <p className="text-slate-400">Join CELESTIAL and start customizing.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                      
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm"
                        >
                          {success}
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all"
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all"
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all"
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
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="w-4 h-4 mt-1 rounded border-slate-700 bg-slate-800 text-fuchsia-500 focus:ring-fuchsia-500"
                        />
                        <span className="text-sm text-slate-400">
                          I agree to the{' '}
                          <button type="button" className="text-fuchsia-400 hover:text-fuchsia-300">
                            Terms of Service
                          </button>
                          {' '}and{' '}
                          <button type="button" className="text-fuchsia-400 hover:text-fuchsia-300">
                            Privacy Policy
                          </button>
                        </span>
                      </label>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-fuchsia-600 hover:to-pink-600 transition-all shadow-lg shadow-fuchsia-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </motion.button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-slate-900 text-slate-400">Or sign up with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                        >
                          <span className="text-xl">🔍</span>
                          <span className="text-slate-300">Google</span>
                        </button>
                        <button
                          type="button"
                          className="px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                        >
                          <span className="text-xl">📘</span>
                          <span className="text-slate-300">Facebook</span>
                        </button>
                      </div>
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
