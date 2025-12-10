import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_RpPJAYduTK0PS7';

// Contact details
const CONTACT = {
  phone: "6380006001",
  whatsapp: "916380006001",
  email: "akshaymshankar@gmail.com",
};

export default function Payment() {
  const navigate = useNavigate();
  const { user, profile, selectedPlan, refreshSubscription } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [autopay, setAutopay] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Redirect if no plan selected or not logged in
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (!selectedPlan) {
      navigate('/select-plan');
    }
  }, [selectedPlan, user, navigate]);

  if (!selectedPlan || !user) {
    return null;
  }

  const getPrice = () => {
    if (selectedPlan.billingCycle === 'yearly') {
      return selectedPlan.price * 10;
    }
    return selectedPlan.price;
  };

  const getTax = () => {
    return Math.round(getPrice() * 0.18);
  };

  const getTotal = () => {
    return getPrice() + getTax();
  };

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create payment record in database
  const createPaymentRecord = async (razorpayOrderId) => {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        razorpay_order_id: razorpayOrderId,
        amount: getTotal() * 100, // Store in paise
        currency: 'INR',
        status: 'pending',
        description: `${selectedPlan.name} Plan - ${selectedPlan.billingCycle}`,
        receipt: `rcpt_${Date.now()}`,
      })
      .select()
      .single();

    return { data, error };
  };

  // Create subscription record
  const createSubscription = async (paymentId) => {
    const endDate = new Date();
    if (selectedPlan.billingCycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else if (selectedPlan.billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      // One-time - set end date to 1 year
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: selectedPlan.id,
        plan_name: selectedPlan.name,
        amount: getTotal() * 100,
        billing_cycle: selectedPlan.billingCycle,
        status: 'active',
        auto_renew: autopay && selectedPlan.billingCycle !== 'onetime',
        end_date: endDate.toISOString(),
      })
      .select()
      .single();

    return { data, error };
  };

  // Update payment status
  const updatePaymentStatus = async (paymentId, razorpayPaymentId, razorpaySignature, status) => {
    const { error } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        status: status,
        payment_method: paymentMethod,
      })
      .eq('id', paymentId);

    return { error };
  };

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setError('');
    
    // Set timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isProcessing) {
        console.error('Payment timeout - taking too long');
        setError('Payment is taking too long. Please try again or contact support.');
        setIsProcessing(false);
      }
    }, 30000); // 30 second timeout

    try {
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway. Please try again.');
      }

      // For local dev, create order directly with Razorpay
      // In production, this should go through your backend API
      let orderId;
      let orderAmount = getTotal() * 100; // Convert to paise
      
      try {
        // Try backend API first (for production)
        console.log('Creating payment order...', { amount: getTotal(), plan: selectedPlan.name });
        console.log('Environment:', { 
          PROD: import.meta.env.PROD, 
          MODE: import.meta.env.MODE,
          origin: window.location.origin 
        });
        
        // Use absolute URL in production, relative in development
        const apiUrl = import.meta.env.PROD 
          ? `${window.location.origin}/api/create-payment`
          : '/api/create-payment';
        
        console.log('Calling API:', apiUrl);
        console.log('Request payload:', {
          amount: getTotal(),
          currency: 'INR',
          plan_id: selectedPlan.id,
          plan_name: selectedPlan.name,
          billing_cycle: selectedPlan.billingCycle,
          user_id: user.id,
        });
        
        const fetchStartTime = Date.now();
        
        // Add timeout to fetch (25 seconds - longer than backend timeout)
        const fetchController = new AbortController();
        const fetchTimeout = setTimeout(() => {
          fetchController.abort();
        }, 25000); // 25 second timeout (backend has 15s + retries)
        
        let orderResponse;
        try {
          orderResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: getTotal(),
              currency: 'INR',
              plan_id: selectedPlan.id,
              plan_name: selectedPlan.name,
              billing_cycle: selectedPlan.billingCycle,
              user_id: user.id,
            }),
            signal: fetchController.signal,
          });
          clearTimeout(fetchTimeout);
        } catch (fetchError) {
          clearTimeout(fetchTimeout);
          if (fetchError.name === 'AbortError') {
            console.error('❌ API call timed out after 15 seconds');
            throw new Error('Payment server is taking too long to respond. Please try again.');
          }
          throw fetchError;
        }

        const fetchTime = Date.now() - fetchStartTime;
        console.log(`✅ API call completed in ${fetchTime}ms`);
        console.log('Order response status:', orderResponse.status);
        console.log('Order response statusText:', orderResponse.statusText);
        console.log('Order response headers:', Object.fromEntries(orderResponse.headers.entries()));

        if (!orderResponse.ok) {
          const errorText = await orderResponse.text();
          console.error('Order creation failed:', errorText);
          console.error('Response status:', orderResponse.status);
          console.error('Response statusText:', orderResponse.statusText);
          
          let errorMessage = 'Failed to create payment order. ';
          
          try {
            const errorData = JSON.parse(errorText);
            errorMessage += errorData.message || errorData.error || 'Please try again.';
            console.error('Parsed error:', errorData);
          } catch {
            errorMessage += errorText || 'Please check your connection and try again.';
          }
          
          // Show specific error for 500 (likely missing env vars)
          if (orderResponse.status === 500) {
            errorMessage = 'Payment server error. Please check that Razorpay credentials are configured in Vercel.';
          } else if (orderResponse.status === 404) {
            errorMessage = 'Payment API not found. Please check deployment.';
          }
          
          throw new Error(errorMessage);
        }

        const orderData = await orderResponse.json();
        console.log('Order created successfully:', orderData);
        
        if (!orderData || !orderData.order_id) {
          console.error('Invalid order response:', orderData);
          throw new Error('Invalid order response from server. Please try again.');
        }
        
        orderId = orderData.order_id;
        orderAmount = orderData.amount || orderAmount;
        console.log('Using order:', { orderId, orderAmount });
      } catch (apiError) {
        // Backend not available or error
        console.error('❌ Payment API error:', apiError);
        console.error('Error name:', apiError.name);
        console.error('Error message:', apiError.message);
        console.error('Error stack:', apiError.stack);
        
        // Check if it's a network error
        if (apiError.name === 'TypeError' && (apiError.message.includes('fetch') || apiError.message.includes('Failed to fetch'))) {
          console.error('❌ Network error - API endpoint may not be accessible');
          clearTimeout(timeoutId);
          setError('Cannot connect to payment server. The API endpoint may not be deployed. Please check Vercel deployment.');
          setIsProcessing(false);
          return;
        }
        
        // Check if it's a timeout
        if (apiError.message.includes('too long')) {
          console.error('❌ API timeout');
          clearTimeout(timeoutId);
          setError('Payment server is not responding. Please check Vercel function logs and try again.');
          setIsProcessing(false);
          return;
        }
        
        clearTimeout(timeoutId);
        setError(apiError.message || 'Payment server error. Please try again or contact support.');
        setIsProcessing(false);
        return;
      }

      // Note: For UPI autopay, users need to enable it in their UPI app (GPay, PhonePe, etc.)
      // Razorpay will show the mandate option if supported by the payment method

      if (!orderId) {
        throw new Error('Order ID is missing. Please try again.');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }

      console.log('Opening Razorpay checkout...', { orderId, amount: orderAmount, key: RAZORPAY_KEY_ID });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderAmount, // Amount in paise
        currency: 'INR',
        name: 'GrowMaxx',
        description: `${selectedPlan.name} Plan - ${selectedPlan.billingCycle === 'yearly' ? 'Yearly' : selectedPlan.billingCycle === 'onetime' ? 'One-time' : 'Monthly'}${autopay && selectedPlan.billingCycle !== 'onetime' ? ' (Autopay Enabled)' : ''}`,
        image: '/favicon.svg',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Save payment to database
            const { data: paymentData, error: paymentError } = await supabase
              .from('payments')
              .insert({
                user_id: user.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                amount: getTotal(),
                currency: 'INR',
                status: 'success',
                payment_method: 'razorpay',
                metadata: {
                  plan: {
                    id: selectedPlan.id,
                    name: selectedPlan.name,
                    billing_cycle: selectedPlan.billingCycle,
                  },
                  signature: response.razorpay_signature,
                },
              })
              .select()
              .single();

            if (paymentError) {
              console.error('Payment save error:', paymentError);
              // Continue anyway - payment was successful
            }

            // Create or update subscription
            if (selectedPlan.billingCycle !== 'onetime') {
              const endDate = new Date();
              if (selectedPlan.billingCycle === 'monthly') {
                endDate.setMonth(endDate.getMonth() + 1);
              } else if (selectedPlan.billingCycle === 'yearly') {
                endDate.setFullYear(endDate.getFullYear() + 1);
              }

              const { data: subscriptionData, error: subError } = await supabase
                .from('subscriptions')
                .upsert({
                  user_id: user.id,
                  plan_id: selectedPlan.id,
                  plan_name: selectedPlan.name,
                  billing_cycle: selectedPlan.billingCycle,
                  amount: getTotal(),
                  status: 'active',
                  start_date: new Date().toISOString(),
                  end_date: endDate.toISOString(),
                  next_billing_date: endDate.toISOString(),
                  autopay_enabled: autopay && selectedPlan.billingCycle !== 'onetime',
                }, {
                  onConflict: 'user_id',
                })
                .select()
                .single();

              if (subError) {
                console.error('Subscription error:', subError);
              }
            }

            // Try backend verification (optional - for production)
            try {
              const verifyResponse = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  user_id: user.id,
                  plan: {
                    id: selectedPlan.id,
                    name: selectedPlan.name,
                    billing_cycle: selectedPlan.billingCycle,
                    amount: getTotal(),
                  },
                }),
              });
              // Don't fail if backend verification fails - payment is already saved
            } catch (verifyErr) {
              console.warn('Backend verification not available:', verifyErr);
            }

            // Clear selected plan
            localStorage.removeItem('growmaxx_plan');

            // Navigate to success
            navigate('/payment-success', {
              state: {
                paymentId: response.razorpay_payment_id,
                plan: selectedPlan,
              }
            });
          } catch (err) {
            console.error('Post-payment error:', err);
            // Still navigate to success since Razorpay confirmed payment
            navigate('/payment-success', {
              state: {
                paymentId: response.razorpay_payment_id,
                plan: selectedPlan,
              }
            });
          }
        },
        prefill: {
          name: profile?.name || profile?.full_name || '',
          email: user?.email || '',
          contact: profile?.phone || '',
        },
        notes: {
          user_id: user.id,
          plan_id: selectedPlan.id,
          billing_cycle: selectedPlan.billingCycle,
          autopay_enabled: autopay && selectedPlan.billingCycle !== 'onetime' ? 'true' : 'false',
        },
        theme: {
          color: '#BFFF00',
        },
        modal: {
          ondismiss: function () {
            console.log('Razorpay modal dismissed');
            setIsProcessing(false);
            setError('Payment cancelled by user');
          },
        },
      };

      console.log('Initializing Razorpay instance...');
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async function (response) {
        console.error('Payment failed:', response.error);
        setError(response.error?.description || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });

      console.log('Opening Razorpay checkout modal...');
      clearTimeout(timeoutId); // Clear timeout since we're opening Razorpay
      razorpay.open();
      
      // If modal doesn't open after 2 seconds, show error
      setTimeout(() => {
        if (isProcessing) {
          console.warn('Razorpay modal may not have opened');
        }
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      clearTimeout(timeoutId);
      setError(err.message || 'Payment initialization failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle manual payment (WhatsApp)
  const handleManualPayment = () => {
    const message = `Hi! I want to pay for the ${selectedPlan.name} Plan.

📋 Order Details:
- Plan: ${selectedPlan.name}
- Billing: ${selectedPlan.billingCycle === 'yearly' ? 'Yearly' : selectedPlan.billingCycle === 'onetime' ? 'One-time' : 'Monthly'}
- Amount: ₹${getTotal().toLocaleString()}
- Autopay: ${autopay ? 'Yes' : 'No'}

👤 My Details:
- Name: ${profile?.full_name || 'N/A'}
- Email: ${user?.email || 'N/A'}
- Phone: ${profile?.phone || 'N/A'}

Please share the payment link.`;

    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 py-6 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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

          <Link to="/select-plan" className="text-sm text-neutral-400 hover:text-white transition-colors">
            ← Change plan
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/20 mb-6">
              <span className="text-lime-400 text-sm font-medium">Final Step</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Complete Your Payment
            </h1>
            <p className="text-lg text-neutral-400">
              Secure payment powered by Razorpay
            </p>
          </motion.div>

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

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-[#0A0A0A] rounded-2xl border border-white/[0.04] overflow-hidden">
                {/* Payment Method Tabs */}
                <div className="flex border-b border-white/[0.04]">
                  {[
                    { id: 'upi', label: 'UPI', icon: '📱' },
                    { id: 'card', label: 'Card', icon: '💳' },
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex-1 py-4 px-4 text-center transition-colors ${
                        paymentMethod === method.id
                          ? 'bg-lime-400/10 text-lime-400 border-b-2 border-lime-400'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="mr-2">{method.icon}</span>
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Payment Info */}
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">
                      {paymentMethod === 'upi' && '📱'}
                      {paymentMethod === 'card' && '💳'}
                      {paymentMethod === 'netbanking' && '🏦'}
                    </div>
                    <p className="text-neutral-400 mb-2">
                      Click "Pay Now" to open Razorpay
                    </p>
                    <p className="text-sm text-neutral-500">
                      You'll be able to choose {paymentMethod === 'upi' ? 'GPay, PhonePe, Paytm' : paymentMethod === 'card' ? 'any Visa, Mastercard, RuPay card' : 'your bank'} in the payment window
                    </p>
                  </div>

                  {/* Autopay Toggle */}
                  {selectedPlan.billingCycle !== 'onetime' && (
                    <div className="pt-6 border-t border-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">Enable Autopay</div>
                          <div className="text-sm text-neutral-500">
                            Automatically renew your subscription
                          </div>
                          {autopay && (
                            <div className="text-xs text-lime-400 mt-1">
                              💡 Enable autopay in your UPI app (GPay/PhonePe) when paying
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setAutopay(!autopay)}
                          className={`relative w-14 h-8 rounded-full transition-colors ${
                            autopay ? 'bg-lime-400' : 'bg-neutral-700'
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow"
                            animate={{ left: autopay ? '30px' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 flex items-center justify-center gap-6 text-neutral-500 text-xs">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  256-bit SSL Encryption
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  PCI DSS Compliant
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#0A0A0A] rounded-2xl border border-white/[0.04] p-6 sticky top-24">
                <h3 className="font-display font-bold text-white mb-6">Order Summary</h3>

                {/* Selected Plan */}
                <div className="p-4 bg-[#111] rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{selectedPlan.name} Plan</span>
                    {selectedPlan.popular && (
                      <span className="px-2 py-0.5 bg-lime-400/10 text-lime-400 text-xs rounded">Popular</span>
                    )}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {selectedPlan.billingCycle === 'yearly' 
                      ? 'Billed annually' 
                      : selectedPlan.billingCycle === 'onetime' 
                        ? 'One-time payment' 
                        : 'Billed monthly'}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Subtotal</span>
                    <span className="text-white">₹{getPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">GST (18%)</span>
                    <span className="text-white">₹{getTax().toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/[0.04] pt-3 flex justify-between">
                    <span className="font-medium text-white">Total</span>
                    <span className="font-display text-xl font-bold text-lime-400">
                      ₹{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-lime-400 text-[#050505] rounded-xl font-bold text-lg hover:bg-lime-500 transition-colors disabled:opacity-50 mb-4"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${getTotal().toLocaleString()}`
                  )}
                </button>

                {/* Alternative Payment */}
                <button
                  onClick={handleManualPayment}
                  className="w-full py-3 border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pay via WhatsApp
                </button>

                {/* Guarantee */}
                <div className="mt-6 p-4 bg-[#111] rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🛡️</span>
                    <div className="text-sm">
                      <div className="text-white font-medium">7-Day Money Back</div>
                      <div className="text-neutral-500">Full refund if you're not satisfied</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
