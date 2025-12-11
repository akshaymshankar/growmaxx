import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// This page handles the callback from Razorpay Payment Link
// Users are redirected here after payment (success or failure)
export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState('Checking payment status...');

  useEffect(() => {
    // Check for payment status in URL params
    const paymentId = searchParams.get('razorpay_payment_id');
    const paymentLinkId = searchParams.get('razorpay_payment_link_id');
    const paymentStatus = searchParams.get('razorpay_payment_link_status');

    console.log('Payment callback params:', {
      paymentId,
      paymentLinkId,
      paymentStatus,
    });

    // Get pending plan from localStorage
    const pendingPlan = localStorage.getItem('pending_plan');
    const pendingPaymentId = localStorage.getItem('pending_payment_id');

    if (paymentStatus === 'paid' || paymentId) {
      // Payment successful
      setStatus('Payment successful! Redirecting...');
      
      // Clean up localStorage
      localStorage.removeItem('pending_payment_id');
      localStorage.removeItem('pending_plan');
      
      // Navigate to success page
      setTimeout(() => {
        navigate('/payment-success', {
          state: {
            paymentId: paymentId || paymentLinkId,
            plan: pendingPlan ? JSON.parse(pendingPlan) : null,
          },
        });
      }, 1500);
    } else if (paymentStatus === 'cancelled' || paymentStatus === 'expired') {
      // Payment failed or cancelled
      setStatus('Payment was cancelled or expired. Redirecting...');
      
      // Clean up
      localStorage.removeItem('pending_payment_id');
      localStorage.removeItem('pending_plan');
      
      setTimeout(() => {
        navigate('/payment', {
          state: {
            error: 'Payment was cancelled. Please try again.',
          },
        });
      }, 2000);
    } else {
      // Unknown status - wait a bit for webhook, then check
      setStatus('Verifying payment...');
      
      setTimeout(() => {
        // If webhook processed, user will be redirected
        // Otherwise, redirect to dashboard
        navigate('/dashboard');
      }, 3000);
    }
  }, [searchParams, navigate]);

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




