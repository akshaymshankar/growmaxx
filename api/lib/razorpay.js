// Razorpay client initialization
import Razorpay from 'razorpay';

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_live_RpPJAYduTK0PS7';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '7CjgSBmlW2rhdtWKrcJ4fH75';

export const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

// Verify payment signature
export function verifyPaymentSignature(orderId, paymentId, signature) {
  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  
  return generatedSignature === signature;
}

export default razorpay;

