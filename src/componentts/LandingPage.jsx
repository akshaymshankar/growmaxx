import React from "react";
import { motion } from "framer-motion";

/* ---------------- GrowMaxx Logo (SVG) ---------------- */
export function GrowMaxxLogo({ size = 42, wordmark = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <rect x="0" y="0" width="100" height="100" rx="22" fill="url(#grad1)" />
        <path
          d="M30 65 L50 35 L70 65"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#0A53F0" />
            <stop offset="100%" stopColor="#01C48F" />
          </linearGradient>
        </defs>
      </svg>

      {wordmark && (
        <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[#0A53F0] to-[#01C48F]">
          GROWMAXX
        </span>
      )}
    </div>
  );
}

/* ---------------- Default Landing Page ---------------- */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 antialiased">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <HeroSection />
        <ConsoleSection />
        <Features />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  return (
    <header className="py-6 border-b border-slate-200 bg-white/70 backdrop-blur-xl sticky top-0 z-30">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <GrowMaxxLogo size={36} />
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
          <a href="#features" className="hover:text-[#0A53F0]">Features</a>
          <a href="#pricing" className="hover:text-[#0A53F0]">Pricing</a>
          <a href="#contact" className="px-4 py-2 rounded-md bg-[#0A53F0] text-white shadow hover:bg-[#0845c5]">Get Started</a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function HeroSection() {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          Grow your business with <span className="text-[#0A53F0]">AI-powered</span>
          <br />
          websites & workflows.
        </h1>
        <p className="mt-4 text-slate-600 max-w-lg text-lg">
          GrowMaxx helps local businesses get more customers with stunning landing pages, WhatsApp-first funnels, and automation — built in just 48 hours.
        </p>

        <div className="mt-6 flex gap-4">
          <a href="#contact" className="px-6 py-3 bg-[#0A53F0] text-white rounded-lg shadow-md hover:bg-[#0845c5]">Start Free Demo</a>
          <a href="#pricing" className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-white shadow">See Pricing</a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass p-6 rounded-3xl shadow-xl border border-white/40">
        <h3 className="text-xl font-bold">Live Demo Snapshot</h3>
        <div className="mt-4 bg-white rounded-xl p-6 shadow-inner border border-slate-100">
          <p className="font-semibold text-lg">Anna's Bakery</p>
          <p className="text-slate-500 text-sm">WhatsApp orders • Menu • Map</p>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <Metric label="Visitors" value="1.2k" />
            <Metric label="Leads" value="120" green />
            <Metric label="Conversion" value="9%" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Metric ---------------- */
function Metric({ label, value, green }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`text-lg font-bold ${green ? "text-[#01C48F]" : ""}`}>{value}</div>
    </div>
  );
}

/* ---------------- Console (demo generator) ---------------- */
function ConsoleSection() {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold">Try it — generate a demo</h2>

      <div className="mt-6 glass rounded-3xl p-6 shadow-xl border border-white/40">
        <div className="text-sm text-slate-600">Describe your business:</div>
        <div className="mt-3 flex gap-3">
          <input
            placeholder="e.g., Bakery in Tiruppur with cake menu + WhatsApp orders"
            className="flex-1 p-3 rounded-xl border border-slate-200 shadow-inner focus:ring-2 focus:ring-[#0A53F0] outline-none"
          />
          <button className="px-6 bg-[#0A53F0] text-white rounded-xl shadow hover:bg-[#0845c5]">Generate</button>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap text-sm">
          {['Bakery','Clinic','Salon','Tuition','Tailor'].map((t,i)=>(
            <span key={i} className="px-3 py-1 bg-slate-100 rounded-full border text-slate-600">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
function Features() {
  const items = [
    { t: "AI Copywriting", d: "Auto-generate perfect landing page content." },
    { t: "WhatsApp Funnels", d: "One-tap contact flows + autoresponders." },
    { t: "Google Business Setup", d: "Appear in searches instantly." },
    { t: "Local SEO", d: "Rank higher in your area with optimized pages." },
    { t: "Fast Delivery", d: "48-hour turnaround for SMB websites." },
    { t: "Growth Analytics", d: "Visitor, lead & conversion insights." }
  ];

  return (
    <section id="features" className="mt-24">
      <h2 className="text-3xl font-bold">Features</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it,i)=>(
          <div key={i} className="bg-white rounded-2xl p-6 shadow border border-slate-100 hover:shadow-lg transition">
            <div className="font-bold text-lg">{it.t}</div>
            <div className="text-sm text-slate-600 mt-2">{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function Pricing() {
  return (
    <section id="pricing" className="mt-24">
      <h2 className="text-3xl font-bold">Pricing</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <PriceCard
          title="One-time E2E"
          price="24,999"
          list={["5-page custom site","Brand kit","Google setup","30 days support"]}
          primary
        />
        <PriceCard
          title="Basic"
          price="499/mo"
          list={["Landing page","Hosting","WhatsApp CTA","1 edit/month"]}
        />
        <PriceCard
          title="Growth"
          price="1,499/mo"
          list={["AI bot","Booking system","Priority support","Monthly report"]}
        />
      </div>
    </section>
  );
}

/* ---------------- Price Card ---------------- */
function PriceCard({ title, price, list = [], primary }) {
  return (
    <div className={`rounded-2xl p-6 border shadow ${primary ? "bg-[#0A53F0] text-white" : "bg-white border-slate-200"}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="mt-4 text-3xl font-black">₹{price}</div>

      <ul className={`mt-4 text-sm ${primary ? "text-white/90" : "text-slate-600"} space-y-2`}>
        {list.map((li, idx) => <li key={idx}>• {li}</li>)}
      </ul>

      <div className="mt-6">
        <button className={`${primary ? "bg-white text-[#0A53F0] hover:opacity-95" : "bg-[#0A53F0] text-white hover:bg-[#0845c5]"} px-5 py-3 rounded-lg w-full font-semibold`}>
          {primary ? "Order Now" : "Select"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="mt-24 bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-xl border border-white/40">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold">Get started — free 48-hour demo</h3>
          <p className="text-sm text-slate-600 mt-2">Fill the form or message on WhatsApp — we’ll build a demo for your business.</p>
        </div>

        <div className="mt-4 md:mt-0">
          <a href="https://wa.me/919999999999?text=Hi%20GrowMaxx%20I%20want%20a%20demo" className="bg-[#01C48F] text-white px-5 py-3 rounded-lg shadow">Message on WhatsApp</a>
        </div>
      </div>

      <form action="/api/lead" method="POST" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" placeholder="Business owner's name" className="border p-3 rounded-md" />
        <input name="business" placeholder="Business name (e.g., Anna's Bakery)" className="border p-3 rounded-md" />
        <input name="phone" placeholder="Phone (WhatsApp)" className="border p-3 rounded-md" />
        <input name="location" placeholder="City / Area" className="border p-3 rounded-md" />
        <textarea name="notes" placeholder="Tell us a little about your business" className="border p-3 rounded-md md:col-span-2" />
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="bg-[#0A53F0] text-white px-6 py-3 rounded-md">Request Demo</button>
          <a href="mailto:hello@growmaxx.com" className="px-6 py-3 rounded-md border">Email us</a>
        </div>
      </form>

      <div className="mt-6 text-xs text-slate-400">We do not store payment info on this page. Payment & invoicing handled on acceptance.</div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="mt-12 bg-white border-t py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GrowMaxxLogo size={32} wordmark={false} />
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} GrowMaxx</div>
        </div>

        <div className="text-sm text-slate-500">Made for local businesses • Tiruppur · Coimbatore · Chennai</div>
      </div>
    </footer>
  );
}
