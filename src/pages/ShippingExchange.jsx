import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingExchange() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-lime-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Shipping and Exchange Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Digital Services</h2>
            <p>
              GrowMaxx provides digital services (website creation and hosting). There is no physical 
              shipping involved. Services are delivered electronically upon subscription activation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Service Delivery</h2>
            <p>
              Your website will be created and made live within 48 hours of subscription activation. 
              You will receive email notifications at each step of the process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Plan Changes</h2>
            <p>
              You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
              and billing is adjusted accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Content Updates</h2>
            <p>
              Basic plan includes 1 content edit. Growth plan includes unlimited edits. Request edits 
              through your dashboard, and we'll complete them within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact</h2>
            <p>
              For questions about service delivery, contact us at{' '}
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

