// API helper functions
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('growmaxx_token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Auth API
export const authAPI = {
  signup: (email, password, name, phone) =>
    apiRequest('/auth/signup', {
      method: 'POST',
      body: { email, password, name, phone },
    }),

  signin: (email, password) =>
    apiRequest('/auth/signin', {
      method: 'POST',
      body: { email, password },
    }),

  getMe: () => apiRequest('/auth/me'),

  googleAuth: () => {
    window.location.href = `${API_URL}/auth/google?redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
  },
};

// Payment API
export const paymentAPI = {
  createOrder: (planId, planName, amount, billingCycle) =>
    apiRequest('/payments/create-order', {
      method: 'POST',
      body: { plan_id: planId, plan_name: planName, amount, billing_cycle: billingCycle },
    }),

  verifyPayment: (orderId, paymentId, signature, planId, planName, billingCycle, amount) =>
    apiRequest('/payments/verify', {
      method: 'POST',
      body: {
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        plan_id: planId,
        plan_name: planName,
        billing_cycle: billingCycle,
        amount,
      },
    }),
};

// User API
export const userAPI = {
  getDashboard: () => apiRequest('/user/dashboard'),
};

