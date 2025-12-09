import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 499,
    period: 'month',
    description: 'Perfect for getting started online',
    features: [
      'Professional landing page',
      'Mobile-optimized design',
      'WhatsApp CTA button',
      '1 content edit/month',
      'Google Analytics tracking',
      'Basic SEO setup',
    ],
    popular: false,
    color: 'white',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 999,
    period: 'month',
    description: 'Best for growing businesses',
    features: [
      'Everything in Basic',
      'AI FAQ chatbot',
      'Booking/appointment system',
      '3 content edits/month',
      'Monthly performance report',
      'Priority support',
      'Google Business optimization',
    ],
    popular: true,
    color: 'lime',
  },
  {
    id: 'onetime',
    name: 'One-Time E2E',
    price: 14999,
    period: 'one-time',
    description: 'Complete digital transformation',
    features: [
      '5-page custom website',
      'Complete brand kit',
      'Google Business setup',
      'Social media templates',
      '30-day support included',
      '3 revision rounds',
      'Domain setup assistance',
    ],
    popular: false,
    color: 'white',
  },
];

export default function SelectPlan() {
  const [selectedPlan, setSelectedPlanLocal] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const navigate = useNavigate();
  const { user, selectPlan, signOut } = useAuth();

  const handleSelectPlan = (plan) => {
    setSelectedPlanLocal(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      selectPlan({
        ...selectedPlan,
        billingCycle: selectedPlan.period === 'month' ? billingCycle : 'onetime',
      });
      navigate('/payment');
    }
  };

  const getPrice = (plan) => {
    if (plan.period === 'one-time') return plan.price;
    if (billingCycle === 'yearly') {
      // 2 months free on yearly
      return Math.round(plan.price * 10);
    }
    return plan.price;
  };

  const getSavings = (plan) => {
    if (plan.period === 'one-time') return null;
    if (billingCycle === 'yearly') {
      return plan.price * 2; // 2 months free
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 py-6 border-b border-white/[0.04]">
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <svg width={38} height={38} viewBox="0 0 100 100" fill="none">
              <rect x="0" y="0" width="100" height="100" rx="22" fill="#BFFF00"/>
              <path d="M28 62 L50 32 L72 62" stroke="#050505" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="68" r="5" fill="#050505"/>
            </svg>
            <span className="font-display text-xl font-extrabold text-white">
              GROW<span className="text-lime-400">MAXX</span>
            </span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-white font-medium">{user?.name || user?.email}</div>
              <div className="text-xs text-neutral-500">{user?.email}</div>
            </div>
            <button
              onClick={async () => {
                try {
                  await signOut();
                } catch (err) {
                  console.error('Sign out error:', err);
                  window.location.href = '/';
                }
              }}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/20 mb-6">
              <span className="text-lime-400 text-sm font-medium">Step 1 of 2</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Choose Your Growth Plan
            </h1>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              Select the plan that best fits your business needs. You can upgrade or downgrade anytime.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-neutral-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-lime-400' : 'bg-neutral-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow"
                animate={{ left: billingCycle === 'yearly' ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-neutral-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="px-2 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded">
                Save 2 months
              </span>
            )}
          </motion.div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={plan.popular ? 'md:-mt-4 md:mb-4' : ''}
              >
                <PlanCard
                  plan={plan}
                  price={getPrice(plan)}
                  savings={getSavings(plan)}
                  billingCycle={billingCycle}
                  isSelected={selectedPlan?.id === plan.id}
                  onSelect={() => handleSelectPlan(plan)}
                />
              </motion.div>
            ))}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              disabled={!selectedPlan}
              className={`px-12 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedPlan
                  ? 'bg-lime-400 text-[#050505] hover:bg-lime-500 cursor-pointer'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {selectedPlan 
                ? `Continue with ${selectedPlan.name} Plan` 
                : 'Select a plan to continue'}
            </button>

            <p className="mt-4 text-sm text-neutral-500">
              🛡️ 7-day money-back guarantee • Cancel anytime
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function PlanCard({ plan, price, savings, billingCycle, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative h-full cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime-400 text-[#050505] text-xs font-bold uppercase tracking-wider rounded-full z-10">
          Most Popular
        </div>
      )}

      <div className={`h-full p-6 rounded-2xl border-2 transition-all ${
        isSelected
          ? 'bg-lime-400/5 border-lime-400'
          : plan.popular
            ? 'bg-[#0f0f0f] border-lime-400/30 hover:border-lime-400/50'
            : 'bg-[#0A0A0A] border-white/[0.04] hover:border-white/10'
      }`}>
        {/* Selection Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
            <p className="text-sm text-neutral-500">{plan.description}</p>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected 
              ? 'border-lime-400 bg-lime-400' 
              : 'border-neutral-600'
          }`}>
            {isSelected && (
              <svg className="w-4 h-4 text-[#050505]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display font-bold text-white">₹{price.toLocaleString()}</span>
            <span className="text-neutral-500 text-sm">
              {plan.period === 'one-time' ? '' : billingCycle === 'yearly' ? '/year' : '/month'}
            </span>
          </div>
          {savings && (
            <div className="text-lime-400 text-sm mt-1">
              Save ₹{savings.toLocaleString()}/year
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                isSelected || plan.popular ? 'text-lime-400' : 'text-neutral-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-neutral-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


