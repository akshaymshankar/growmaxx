import React from 'react';
import { Link } from 'react-router-dom';

export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-lime-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Cancellation and Refund Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Subscription Cancellation</h2>
            <p>
              You can cancel your subscription at any time from your dashboard. Cancellation takes 
              effect at the end of your current billing period. Your website will remain active until 
              the end of the paid period. To cancel UPI Autopay, cancel your subscription or revoke 
              the mandate from your UPI app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Refund Policy</h2>
            <p>
              Refunds are processed on a case-by-case basis. If you cancel within 7 days of initial 
              subscription, you may be eligible for a full refund. After 7 days, refunds are prorated 
              based on unused service time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Refund Processing</h2>
            <p>
              Approved refunds will be processed within 5-7 business days to your original payment method. 
              Processing times may vary based on your bank or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Service Termination</h2>
            <p>
              Upon cancellation, your website will be deactivated at the end of the billing period. 
              You can export your data before cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact</h2>
            <p>
              For cancellation or refund requests, contact us at{' '}
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

