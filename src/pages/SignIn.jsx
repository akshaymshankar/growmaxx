import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      // The redirect will happen automatically - don't set loading to false
      // User will be redirected to Google, then back to /auth/callback
    } catch (err) {
      console.error('Google sign in error:', err);
      setIsLoading(false);
      setError(err.message || 'Failed to connect to Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <svg width={48} height={48} viewBox="0 0 100 100" fill="none">
              <rect x="0" y="0" width="100" height="100" rx="22" fill="#BFFF00"/>
              <path d="M28 62 L50 32 L72 62" stroke="#050505" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="68" r="5" fill="#050505"/>
            </svg>
            <span className="font-display text-2xl font-extrabold text-white">
              GROW<span className="text-lime-400">MAXX</span>
            </span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
            Start Growing Your
            <br />
            <span className="text-gradient-lime">Business Today</span>
          </h1>

          <p className="text-lg text-neutral-400 max-w-md mb-12">
            Join hundreds of local businesses who've transformed their online presence with GrowMaxx.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: '⚡', text: '48-hour website delivery' },
              { icon: '💬', text: 'WhatsApp-first customer flow' },
              { icon: '📍', text: 'Google Business optimization' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-xl bg-[#111] border border-white/[0.06] flex items-center justify-center text-lg">
                  {feature.icon}
                </span>
                <span className="text-neutral-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <svg width={40} height={40} viewBox="0 0 100 100" fill="none">
              <rect x="0" y="0" width="100" height="100" rx="22" fill="#BFFF00"/>
              <path d="M28 62 L50 32 L72 62" stroke="#050505" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="68" r="5" fill="#050505"/>
            </svg>
            <span className="font-display text-xl font-extrabold text-white">
              GROW<span className="text-lime-400">MAXX</span>
            </span>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">
              Welcome to GrowMaxx
            </h2>
            <p className="text-neutral-500">
              Sign in with Google to access your dashboard
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Sign In - Only Option */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-white text-[#050505] rounded-xl font-semibold hover:bg-neutral-100 transition-colors disabled:opacity-50 text-lg shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <p className="mt-6 text-center text-sm text-neutral-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>

          {/* Back to Home */}
          <Link
            to="/"
            className="mt-8 flex items-center justify-center gap-2 text-neutral-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
