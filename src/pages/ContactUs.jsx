import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CONTACT = {
  phone: "6380006001",
  whatsapp: "916380006001",
  email: "akshaymshankar@gmail.com",
};

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="text-lime-400 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a href={`mailto:${CONTACT.email}`} className="text-lime-400 hover:underline">
                {CONTACT.email}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <a href={`tel:${CONTACT.phone}`} className="text-lime-400 hover:underline">
                +91 {CONTACT.phone}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <a 
                href={`https://wa.me/${CONTACT.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400"
            />
            <input
              type="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400"
            />
            <textarea
              placeholder="Your Message *"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
            >
              {submitted ? 'Opening Email...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

