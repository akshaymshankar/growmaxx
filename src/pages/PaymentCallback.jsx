import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

// This page handles the callback from Razorpay Payment Link
// Users are redirected here after payment (success or failure)
export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState('Checking payment status...');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const verifyAndProcessPayment = async () => {
      // Check for payment status in URL params
      const paymentId = searchParams.get('razorpay_payment_id');
      const paymentLinkId = searchParams.get('razorpay_payment_link_id');
      const paymentStatus = searchParams.get('razorpay_payment_link_status');
      const subscriptionId = searchParams.get('razorpay_subscription_id');
      const signature = searchParams.get('razorpay_signature');
      const status = searchParams.get('status');

      console.log('Payment callback params:', {
        paymentId,
        paymentLinkId,
        paymentStatus,
        subscriptionId,
      });

      // Get pending plan from localStorage
      const pendingPlan = localStorage.getItem('pending_plan');
      const pendingPaymentId = localStorage.getItem('pending_payment_id');
      const expectedAmount = localStorage.getItem('expected_amount');

      // If payment successful, verify with backend
      if (paymentStatus === 'paid' || paymentId || subscriptionId) {
        setStatus('Verifying payment...');
        
        try {
          // Verify payment with backend
          const verifyUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD 
            ? `${window.location.origin}/api/verify-payment-callback`
            : '/api/verify-payment-callback');
          
          const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              payment_id: paymentId,
              payment_link_id: paymentLinkId,
              subscription_id: subscriptionId,
              user_id: user.id,
              pending_payment_id: pendingPaymentId,
            }),
          });

          if (verifyResponse.ok) {
            const verifyData = await verifyResponse.json();
            console.log('Payment verified:', verifyData);
            
            // Wait a moment for webhook to process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Refresh subscription data from database
            const { data: subscriptionData } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            
            if (subscriptionData) {
              console.log('Subscription updated:', subscriptionData);
            }
            
            setStatus('Payment successful! Redirecting...');
            
            // Clean up localStorage
            localStorage.removeItem('pending_payment_id');
            localStorage.removeItem('pending_plan');
            localStorage.removeItem('expected_amount');
            localStorage.removeItem('subscription_id');
            
            // Navigate to success page
            setTimeout(() => {
              navigate('/payment-success', {
                state: {
                  paymentId: paymentId || paymentLinkId || subscriptionId,
                  plan: pendingPlan ? JSON.parse(pendingPlan) : null,
                  refresh: true, // Flag to refresh dashboard
                },
              });
            }, 1000);
          } else {
            // Verification failed, but payment might still be processing
            setStatus('Payment received. Verifying with server...');
            
            // Wait for webhook to process (up to 5 seconds)
            let attempts = 0;
            const checkInterval = setInterval(async () => {
              attempts++;
              
              // Check if subscription/payment was created
              const { data: subscriptionData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
              
              if (subscriptionData || attempts >= 5) {
                clearInterval(checkInterval);
                
                // Clean up
                localStorage.removeItem('pending_payment_id');
                localStorage.removeItem('pending_plan');
                localStorage.removeItem('expected_amount');
                localStorage.removeItem('subscription_id');
                
                navigate('/payment-success', {
                  state: {
                    paymentId: paymentId || paymentLinkId || subscriptionId,
                    plan: pendingPlan ? JSON.parse(pendingPlan) : null,
                    refresh: true,
                  },
                });
              }
            }, 1000);
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          // Still redirect to success - webhook will handle it
          setStatus('Payment received. Processing...');
          
          setTimeout(() => {
            localStorage.removeItem('pending_payment_id');
            localStorage.removeItem('pending_plan');
            localStorage.removeItem('expected_amount');
            localStorage.removeItem('subscription_id');
            
            navigate('/payment-success', {
              state: {
                paymentId: paymentId || paymentLinkId || subscriptionId,
                plan: pendingPlan ? JSON.parse(pendingPlan) : null,
                refresh: true,
              },
            });
          }, 2000);
        }
      } else if (paymentStatus === 'cancelled' || paymentStatus === 'expired') {
        // Payment failed or cancelled
        setStatus('Payment was cancelled or expired. Redirecting...');
        
        // Clean up
        localStorage.removeItem('pending_payment_id');
        localStorage.removeItem('pending_plan');
        localStorage.removeItem('expected_amount');
        localStorage.removeItem('subscription_id');
        
        setTimeout(() => {
          navigate('/payment', {
            state: {
              error: 'Payment was cancelled. Please try again.',
            },
          });
        }, 2000);
      } else {
        // Unknown status - wait for webhook
        setStatus('Verifying payment...');
        
        // Check database for payment updates
        setTimeout(async () => {
          const { data: subscriptionData } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          
          if (subscriptionData) {
            // Payment processed
            localStorage.removeItem('pending_payment_id');
            localStorage.removeItem('pending_plan');
            localStorage.removeItem('expected_amount');
            localStorage.removeItem('subscription_id');
            
            navigate('/payment-success', {
              state: {
                plan: subscriptionData,
                refresh: true,
              },
            });
          } else {
            // No payment found, redirect to dashboard
            navigate('/dashboard');
          }
        }, 3000);
      }
    };

    verifyAndProcessPayment();
  }, [searchParams, navigate, user]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-neutral-400">{status}</p>
        <p className="text-neutral-500 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
}






