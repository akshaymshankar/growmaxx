import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════════════════
   GROWMAXX LANDING PAGE
   Professional dark theme with motion graphics
   ═══════════════════════════════════════════════════════════════════════════ */

// Contact Details
const CONTACT = {
  phone: "6380006001",
  whatsapp: "916380006001", // with country code for wa.me
  email: "akshaymshankar@gmail.com",
  instagram: "g_akshay_ro45",
};

// Razorpay Payment Links (you'll replace these with your actual Razorpay payment links)
const PAYMENT_LINKS = {
  basic: "https://razorpay.me/@growmaxx/499",
  growth: "https://razorpay.me/@growmaxx/999",
  onetime: "https://razorpay.me/@growmaxx/14999",
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Subtle Background */}
      <BackgroundElements />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <LogoCloud />
          <FeaturesSection />
          <HowItWorks />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */

function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi GrowMaxx! I'm interested in getting a website for my business.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BD5C] transition-all group"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="font-semibold text-sm hidden sm:block">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BACKGROUND ELEMENTS - Pure Dark Theme
   ═══════════════════════════════════════════════════════════════════════════ */

function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - pure dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Very subtle top highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl" />
      
      {/* Noise texture for depth */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════════════════════ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4 glass-dark' : 'py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <GrowMaxxLogo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'How it Works', 'FAQ'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-body text-sm text-neutral-400 hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/signin" className="btn-primary">
            Get Started
          </Link>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-white absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`} />
          <div className={`w-6 h-0.5 bg-white absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white absolute transition-all duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {['Features', 'Pricing', 'How it Works', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-body text-lg text-neutral-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link to="/signin" className="btn-primary mt-4 text-center">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO
   ═══════════════════════════════════════════════════════════════════════════ */

function GrowMaxxLogo({ size = 38 }) {
  return (
    <a href="/" className="flex items-center gap-3 select-none group">
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect 
            x="0" y="0" width="100" height="100" rx="22" 
            className="fill-lime-400"
          />
          <path
            d="M28 62 L50 32 L72 62"
            stroke="#050505"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="68" r="5" fill="#050505" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-extrabold tracking-tight text-white">
        GROW<span className="text-lime-400">MAXX</span>
      </span>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-32 pb-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10"
          >
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="kicker">Now serving Tamil Nadu</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-xl text-white mb-8"
            >
              Your Business
              <br />
              <span className="text-gradient-lime">Online in 48h</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg max-w-lg mb-10"
            >
              Professional landing pages, WhatsApp ordering, and Google visibility 
              for bakeries, salons, clinics & local shops.{' '}
              <span className="text-lime-400 font-semibold">Starting ₹499/month.</span>
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/signin" className="btn-primary group">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <a 
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi! I want to know more about GrowMaxx")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-12 mt-14 pt-10 border-t border-white/[0.06]"
            >
              {[
                { value: '48h', label: 'Delivery Time' },
                { value: '₹499', label: 'Starting Price' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-3xl font-bold text-lime-400">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right - Demo Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:pl-8"
          >
            <DemoPreview />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-600 uppercase tracking-wider">Scroll</span>
          <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DEMO PREVIEW COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function DemoPreview() {
  return (
    <div className="relative">
      {/* Browser Frame */}
      <div className="relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
        {/* Browser Header */}
        <div className="bg-[#111] px-4 py-3 flex items-center gap-3 border-b border-white/[0.04]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1a1a1a] rounded-md px-4 py-1.5 text-xs text-neutral-500 font-mono">
              annas-bakery.growmaxx.com
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Mini Hero */}
          <div className="relative h-28 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#111] mb-4 overflow-hidden border border-white/[0.04]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🎂</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]">
              <div className="text-sm font-semibold text-white">Anna's Bakery</div>
              <div className="text-xs text-neutral-500">Fresh Cakes Daily • Tiruppur</div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: '👁️', value: '1.2k', label: 'Views' },
              { icon: '💬', value: '89', label: 'Messages', highlight: true },
              { icon: '📈', value: '12%', label: 'Conv.' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`p-3 rounded-xl text-center border ${
                  stat.highlight 
                    ? 'bg-lime-400/[0.08] border-lime-400/20' 
                    : 'bg-[#111] border-white/[0.04]'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="text-base">{stat.icon}</div>
                <div className={`text-base font-bold ${stat.highlight ? 'text-lime-400' : 'text-white'}`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* WhatsApp CTA */}
          <motion.button
            className="w-full py-3 bg-[#25D366] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </motion.button>
        </div>
      </div>
      
      {/* Floating Badge - Top Right */}
      <motion.div
        className="absolute -top-4 -right-4 px-4 py-2 bg-lime-400 rounded-xl text-[#050505] font-bold text-sm shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        +340% Orders 🚀
      </motion.div>
      
      {/* Floating Badge - Bottom Left */}
      <motion.div
        className="absolute -bottom-3 -left-3 px-4 py-2 bg-[#111] border border-white/[0.08] rounded-xl text-white text-sm flex items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full bg-lime-400" />
        Live in 48 hours
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO CLOUD
   ═══════════════════════════════════════════════════════════════════════════ */

function LogoCloud() {
  const businesses = [
    '🎂 Bakeries', '💇 Salons', '🏥 Clinics', '✂️ Tailors', '📚 Tuition', '👗 Boutiques'
  ];
  
  return (
    <section className="py-16 border-y border-white/[0.04]">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-neutral-500 mb-8"
        >
          Trusted by local businesses across Tamil Nadu
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {businesses.map((biz, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-5 py-2.5 rounded-full bg-[#111] border border-white/[0.04] text-neutral-400 text-sm"
            >
              {biz}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: '48-Hour Delivery',
      description: 'From concept to live website in just two days. We handle everything while you focus on your business.',
    },
    {
      icon: '💬',
      title: 'WhatsApp-First',
      description: 'One-tap WhatsApp ordering with auto-replies. Your customers message, you get notified instantly.',
    },
    {
      icon: '📍',
      title: 'Google Visibility',
      description: 'We set up and optimize your Google Business Profile. Show up when locals search for your services.',
    },
    {
      icon: '🤖',
      title: 'AI FAQ Bot',
      description: 'Intelligent auto-responder handles common questions 24/7. Never miss a customer query.',
    },
    {
      icon: '📊',
      title: 'Growth Analytics',
      description: 'Track visitors, leads, and conversions. Monthly reports show exactly how your site performs.',
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Professional, mobile-first templates designed specifically for your business type.',
    },
  ];
  
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Why GrowMaxx</span>
          <h2 className="heading-lg text-white mb-6">
            Everything Your Shop Needs to{' '}
            <span className="text-gradient-lime">Grow Online</span>
          </h2>
          <p className="body-lg">
            No technical skills required. We handle the tech so you can focus on serving customers.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group card h-full">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/[0.06] flex items-center justify-center text-xl mb-5 group-hover:border-lime-400/20 transition-colors">
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="heading-sm text-white mb-3">{title}</h3>
      <p className="body-md">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Share Your Details',
      description: 'Tell us about your business via WhatsApp or form. Share photos, menu, and contact info.',
      icon: '📝',
    },
    {
      num: '02',
      title: 'We Build Your Site',
      description: 'Our team creates a beautiful, mobile-first landing page tailored to your business.',
      icon: '🛠️',
    },
    {
      num: '03',
      title: 'Review & Approve',
      description: 'Check your preview site, request any changes. We refine until you love it.',
      icon: '✅',
    },
    {
      num: '04',
      title: 'Go Live & Grow',
      description: 'Your site goes live, Google listing activated. Start getting more customers!',
      icon: '🚀',
    },
  ];
  
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Simple Process</span>
          <h2 className="heading-lg text-white mb-6">
            From Zero to Live in{' '}
            <span className="text-gradient-lime">4 Easy Steps</span>
          </h2>
        </motion.div>
        
        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                {/* Step Icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/[0.06] flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-lime-400 flex items-center justify-center text-[#050505] text-xs font-bold">
                    {step.num}
                  </div>
                </div>
                
                <h3 className="heading-sm text-white mb-3">{step.title}</h3>
                <p className="body-md text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/signin" className="btn-primary">
            Start Your Free Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING SECTION WITH PAYMENT INTEGRATION
   ═══════════════════════════════════════════════════════════════════════════ */

function PricingSection() {
  const plans = [
    {
      name: 'Basic',
      price: '499',
      period: '/month',
      description: 'Perfect for getting started online',
      features: [
        'Professional landing page',
        'Mobile-optimized design',
        'WhatsApp CTA button',
        '1 content edit/month',
        'Google Analytics tracking',
        'Basic SEO setup',
      ],
      cta: 'Get Started',
      paymentLink: PAYMENT_LINKS.basic,
      popular: false,
    },
    {
      name: 'Growth',
      price: '999',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Everything in Basic',
        'AI FAQ chatbot',
        'Booking/appointment system',
        '3 content edits/month',
        'Monthly performance report',
        'Priority support',
        'Google Business optimization',
      ],
      cta: 'Get Started',
      paymentLink: PAYMENT_LINKS.growth,
      popular: true,
    },
    {
      name: 'One-Time E2E',
      price: '14,999',
      period: 'one-time',
      description: 'Complete digital transformation',
      features: [
        '5-page custom website',
        'Complete brand kit',
        'Google Business setup',
        'Social media templates',
        '30-day support included',
        '3 revision rounds',
        'Domain setup assistance',
      ],
      cta: 'Contact Us',
      paymentLink: PAYMENT_LINKS.onetime,
      popular: false,
    },
  ];
  
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Pricing</span>
          <h2 className="heading-lg text-white mb-6">
            Simple, Transparent{' '}
            <span className="text-gradient-lime">Pricing</span>
          </h2>
          <p className="body-lg">
            No hidden fees. No surprises. Choose the plan that fits your business.
          </p>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={plan.popular ? 'md:-mt-4' : ''}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
        
        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#111] border border-white/[0.04]">
              <span className="text-xl">🛡️</span>
              <span className="text-sm text-neutral-400">
                <span className="text-white font-medium">100% Satisfaction Guarantee.</span>{' '}
                Full refund within 7 days.
              </span>
            </div>
            <div className="flex items-center gap-4 text-neutral-500 text-xs">
              <span>Powered by</span>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#0A0A0A] border border-white/[0.04] rounded text-neutral-400">Razorpay</span>
                <span className="px-3 py-1 bg-[#0A0A0A] border border-white/[0.04] rounded text-neutral-400">UPI</span>
                <span className="px-3 py-1 bg-[#0A0A0A] border border-white/[0.04] rounded text-neutral-400">Cards</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, description, features, cta, paymentLink, popular }) {
  return (
    <div className={`relative h-full ${popular ? 'z-10' : ''}`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime-400 text-[#050505] text-xs font-bold uppercase tracking-wider rounded-full z-10">
          Most Popular
        </div>
      )}
      
      <div className={`h-full p-7 rounded-2xl ${
        popular 
          ? 'bg-[#0f0f0f] border-2 border-lime-400/30' 
          : 'bg-[#0A0A0A] border border-white/[0.04]'
      }`}>
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-bold text-white mb-1">{name}</h3>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
        
        {/* Price */}
        <div className="mb-6">
          <span className="font-display text-4xl font-bold text-white">₹{price}</span>
          <span className="text-neutral-500 ml-1 text-sm">{period}</span>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${popular ? 'text-lime-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-neutral-400">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <Link 
          to="/signin"
          className={`block w-full py-3.5 text-center rounded-xl font-semibold text-sm transition-all duration-300 ${
            popular 
              ? 'bg-lime-400 text-[#050505] hover:bg-lime-500' 
              : 'border border-white/10 text-white hover:border-lime-400/40 hover:bg-lime-400/5'
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "WhatsApp orders tripled within the first month! GrowMaxx made it so easy for my customers to reach me.",
      author: "Anna",
      business: "Anna's Bakery",
      location: "Tiruppur",
      avatar: "🎂",
    },
    {
      quote: "Finally my clinic shows up on Google. Patients find me easily now. Worth every rupee!",
      author: "Dr. Kumar",
      business: "Kumar Health Clinic",
      location: "Coimbatore",
      avatar: "🏥",
    },
    {
      quote: "I was scared of technology but GrowMaxx handled everything. My salon looks so professional online!",
      author: "Priya",
      business: "Style & Shine Salon",
      location: "Tiruppur",
      avatar: "💇‍♀️",
    },
  ];
  
  return (
    <section className="py-24 md:py-32 border-y border-white/[0.04]">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Testimonials</span>
          <h2 className="heading-lg text-white mb-6">
            Loved by{' '}
            <span className="text-gradient-lime">Local Businesses</span>
          </h2>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, business, location, avatar }) {
  return (
    <div className="card h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-base text-neutral-300 leading-relaxed mb-6 flex-1">"{quote}"</p>
      
      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/[0.04]">
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-lg">
          {avatar}
        </div>
        <div>
          <div className="font-medium text-white text-sm">{author}</div>
          <div className="text-xs text-neutral-500">{business}, {location}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    {
      q: "How fast can you deliver my website?",
      a: "We deliver your website within 48 hours of receiving all required assets (photos, menu, contact info). For One-Time E2E packages, delivery is within 5-7 business days."
    },
    {
      q: "Do I need any technical knowledge?",
      a: "Absolutely not! We handle everything technical. You just provide your business info and photos. Messages come to your regular WhatsApp - no apps to learn."
    },
    {
      q: "What if I don't like the design?",
      a: "We offer unlimited revisions until you're happy. Plus, there's a 7-day money-back guarantee. If you don't love it, you get a full refund."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel anytime with no penalties. Your site remains live until the end of your billing period."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major payment methods via Razorpay - UPI, debit/credit cards, net banking, and wallets like Paytm and PhonePe."
    },
    {
      q: "What's included in monthly edits?",
      a: "Monthly edits include updating text, prices, photos, adding new services, or seasonal promotions. Basically, any content changes you need."
    },
  ];
  
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <span className="kicker mb-4 block">FAQ</span>
            <h2 className="heading-lg text-white mb-6">
              Got{' '}
              <span className="text-gradient-lime">Questions?</span>
            </h2>
            <p className="body-lg mb-8">
              Everything you need to know about GrowMaxx. Can't find what you're looking for? Message us on WhatsApp!
            </p>
            <a 
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi GrowMaxx, I have a question")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lime-400 font-semibold text-sm hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us on WhatsApp
            </a>
          </motion.div>
          
          {/* Right - FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`rounded-xl border transition-all duration-300 ${
      isOpen ? 'bg-[#0f0f0f] border-white/[0.08]' : 'bg-[#0A0A0A] border-white/[0.04] hover:border-white/[0.06]'
    }`}>
      <button
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className={`font-medium text-sm transition-colors ${isOpen ? 'text-lime-400' : 'text-white'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ml-4 ${isOpen ? 'text-lime-400' : 'text-neutral-500'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-neutral-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION WITH CONTACT FORM
   ═══════════════════════════════════════════════════════════════════════════ */

function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    type: '',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with form data
    const message = `🚀 New GrowMaxx Lead!

👤 Name: ${formData.name}
🏪 Business: ${formData.business}
📱 Phone: ${formData.phone}
📍 City: ${formData.city}
🏷️ Type: ${formData.type}
📝 Notes: ${formData.notes || 'None'}

Sent from GrowMaxx website`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Also send email (mailto)
    const emailSubject = `New Lead: ${formData.business} - ${formData.city}`;
    const emailBody = message;
    window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', business: '', phone: '', type: '', city: '', notes: '' });
    }, 3000);
  };
  
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.06]">
            <div className="p-8 md:p-10">
              <div className="text-center mb-10">
                <h2 className="heading-lg text-white mb-4">
                  Ready to Grow Your Business?
                </h2>
                <p className="body-lg max-w-xl mx-auto">
                  Get a free demo website in 48 hours. No payment required.
                  See how your business looks online before you decide.
                </p>
              </div>
              
              {/* Contact Form */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-neutral-400">We'll contact you within 2 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your name *" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input"
                    />
                    <input 
                      type="text" 
                      placeholder="Business name *" 
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({...formData, business: e.target.value})}
                      className="input"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="tel" 
                      placeholder="WhatsApp number *" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input"
                    />
                    <select 
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="input text-neutral-500"
                    >
                      <option value="">Business type *</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Salon">Salon</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Tuition">Tuition</option>
                      <option value="Tailor">Tailor</option>
                      <option value="Boutique">Boutique</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <input 
                    type="text" 
                    placeholder="City / Area *" 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="input"
                  />
                  <textarea 
                    placeholder="Tell us about your business (optional)" 
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="input resize-none"
                  />
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Free Demo'}
                  </button>
                </form>
              )}
              
              {/* Alternative Contact Methods */}
              <div className="mt-8 pt-8 border-t border-white/[0.04]">
                <p className="text-neutral-500 text-sm text-center mb-4">Or contact us directly</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {/* WhatsApp */}
                  <a 
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi GrowMaxx! I want a free demo for my business")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] rounded-full text-white font-semibold text-sm hover:bg-[#20BD5C] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                  {/* Email */}
                  <a 
                    href={`mailto:${CONTACT.email}?subject=GrowMaxx%20Demo%20Request`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#111] border border-white/[0.06] rounded-full text-white font-semibold text-sm hover:bg-[#1a1a1a] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  
                  {/* Phone */}
                  <a 
                    href={`tel:+91${CONTACT.phone}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#111] border border-white/[0.06] rounded-full text-white font-semibold text-sm hover:bg-[#1a1a1a] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.04]">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <GrowMaxxLogo size={34} />
            <p className="text-neutral-500 text-sm mt-4 max-w-sm leading-relaxed">
              Helping local businesses in Tamil Nadu grow online. Professional websites, 
              WhatsApp ordering, Google visibility — all in 48 hours.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {/* Instagram */}
              <a 
                href={`https://instagram.com/${CONTACT.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#111] border border-white/[0.04] flex items-center justify-center text-neutral-500 hover:text-[#E4405F] hover:border-[#E4405F]/20 transition-all"
                title="Follow us on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* WhatsApp */}
              <a 
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#111] border border-white/[0.04] flex items-center justify-center text-neutral-500 hover:text-[#25D366] hover:border-[#25D366]/20 transition-all"
                title="Message us on WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              
              {/* Email */}
              <a 
                href={`mailto:${CONTACT.email}`}
                className="w-9 h-9 rounded-lg bg-[#111] border border-white/[0.04] flex items-center justify-center text-neutral-500 hover:text-lime-400 hover:border-lime-400/20 transition-all"
                title="Email us"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'How it Works', href: '#how-it-works' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-neutral-500 text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:+91${CONTACT.phone}`} className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @{CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} GrowMaxx. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Made with 💚 in Tamil Nadu • Tiruppur · Coimbatore · Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}
