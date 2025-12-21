import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

// Contact details
const CONTACT = {
  whatsapp: "916380006001",
  email: "akshaymshankar@gmail.com",
};

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { paymentId, plan, refresh } = location.state || {};
  const [showConfetti, setShowConfetti] = useState(true);
  const [subscription, setSubscription] = useState(null);

  // Simple confetti effect using CSS
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Refresh subscription data if payment was just completed
  useEffect(() => {
    if (refresh && user) {
      const refreshSubscription = async () => {
        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Fetch latest subscription
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (subData) {
          setSubscription(subData);
          console.log('✅ Subscription refreshed:', subData);
        }
      };
      
      refreshSubscription();
    }
  }, [refresh, user]);

  // Redirect if accessed directly without payment data
  useEffect(() => {
    if (!plan && !paymentId && !subscription) {
      const timer = setTimeout(() => navigate('/dashboard'), 5000);
      return () => clearTimeout(timer);
    }
  }, [plan, paymentId, subscription, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#BFFF00', '#A8E000', '#8BC700', '#ffffff', '#FFD700'][Math.floor(Math.random() * 5)],
              }}
              initial={{ y: -20, opacity: 1, scale: 1 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: Math.random() * 720,
                scale: [1, 0.5],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 bg-lime-400 rounded-full flex items-center justify-center"
        >
          <svg className="w-12 h-12 text-[#050505]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-neutral-400 mb-8">
            Welcome to GrowMaxx! Your {plan?.name || 'subscription'} is now active.
          </p>

          {/* Order Details */}
          {plan && (
            <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Plan</span>
                  <span className="text-white font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Billing</span>
                  <span className="text-white font-medium">
                    {plan.billingCycle === 'yearly' ? 'Yearly' : plan.billingCycle === 'onetime' ? 'One-time' : 'Monthly'}
                  </span>
                </div>
                {paymentId && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Payment ID</span>
                    <span className="text-lime-400 font-mono text-sm">{paymentId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-[#0A0A0A] border border-lime-400/20 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-lime-400">⚡</span> What's Next?
            </h3>
            <ul className="space-y-3">
              {[
                'We\'ll contact you within 2 hours on WhatsApp',
                'Share your business details & photos with us',
                'Your website will be live in 48 hours!',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-lime-400/10 text-lime-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-neutral-400">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I just subscribed to GrowMaxx. Ready to start!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20BD5C] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Message Us on WhatsApp
            </a>
            <Link
              to="/dashboard"
              state={{ refresh: true }}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Receipt */}
          <p className="mt-8 text-sm text-neutral-500">
            A receipt has been sent to your email. For any queries, contact{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-lime-400 hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
