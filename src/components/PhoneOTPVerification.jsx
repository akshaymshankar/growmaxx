import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhoneOTPVerification({ phone, onVerify, onCancel }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Send OTP via API
  const sendOTP = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      
      // For development: show OTP in console (remove in production)
      if (data.otp) {
        console.log(`OTP for ${phone}: ${data.otp}`);
        alert(`OTP sent! Check console for OTP (development only).`);
      } else {
        alert(`OTP sent to ${phone}. Please check your SMS.`);
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      document.getElementById(`otp-${Math.min(pastedData.length - 1, 5)}`)?.focus();
    }
  };

  const verifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp: otpString }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // OTP verified successfully
      await onVerify(phone);
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-xl font-bold text-white mb-2">Verify Phone Number</h3>
        <p className="text-neutral-400 text-sm mb-6">
          We'll send a 6-digit OTP to <span className="text-white font-medium">{phone}</span>
        </p>

        {!otpSent ? (
          <div>
            <button
              onClick={sendOTP}
              disabled={isLoading}
              className="w-full py-3 bg-lime-400 text-[#050505] rounded-xl font-bold hover:bg-lime-500 transition-colors disabled:opacity-50 mb-4"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
            <button
              onClick={onCancel}
              className="w-full py-2 text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-sm text-neutral-400 mb-3 text-center">
                Enter 6-digit OTP
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-[#111] border border-white/10 rounded-xl text-white focus:border-lime-400 focus:outline-none"
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-500 text-center mt-3">
                Didn't receive? <button onClick={sendOTP} className="text-lime-400 hover:underline">Resend</button>
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-3 border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={verifyOTP}
                disabled={isLoading || otp.join('').length !== 6}
                className="flex-1 py-3 bg-lime-400 text-[#050505] rounded-xl font-bold hover:bg-lime-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

