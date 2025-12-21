import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-lime-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using GrowMaxx services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do 
              not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
            <p>
              GrowMaxx provides professional landing page creation, hosting, and related services. 
              Services are provided on a subscription basis with monthly or yearly billing cycles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Payment Terms</h2>
            <p>
              All payments are processed securely through Razorpay. Subscriptions automatically renew 
              unless cancelled. You are responsible for maintaining valid payment information. 
              UPI Autopay mandates can be set up for automatic recurring payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. UPI Autopay</h2>
            <p>
              When you enable UPI Autopay, you authorize GrowMaxx to automatically debit payments 
              from your UPI account on the billing date. You can cancel the mandate at any time 
              through your UPI app or by cancelling your subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to provide accurate and complete information when creating your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              GrowMaxx shall not be liable for any indirect, incidental, special, or consequential 
              damages resulting from the use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:akshaymshankar@gmail.com" className="text-lime-400 hover:underline">
                akshaymshankar@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

