import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-lime-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including name, email, phone number, 
              business details, and payment information. We also collect usage data and cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p>
              We use your information to provide, maintain, and improve our services, process payments, 
              send communications, and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, 
              no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We use third-party services (Supabase, Razorpay) for authentication and payments. 
              These services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. Contact us 
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Contact</h2>
            <p>
              For privacy concerns, contact us at{' '}
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

