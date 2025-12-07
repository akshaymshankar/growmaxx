import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   GROWMAXX LANDING PAGE
   A stunning, professional landing page with motion graphics
   ═══════════════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-dark-950 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
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
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND
   ═══════════════════════════════════════════════════════════════════════════ */

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 bg-mesh" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-[120px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-coral-400/8 blur-[100px]"
        animate={{ 
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-lime-400/5 blur-[150px]"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.015]" />
    </div>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 80, x: '10%', y: '20%', delay: 0 },
    { type: 'square', size: 60, x: '85%', y: '15%', delay: 2 },
    { type: 'triangle', size: 70, x: '75%', y: '60%', delay: 4 },
    { type: 'circle', size: 40, x: '20%', y: '70%', delay: 1 },
    { type: 'square', size: 50, x: '90%', y: '80%', delay: 3 },
    { type: 'hexagon', size: 90, x: '5%', y: '50%', delay: 5 },
  ];
  
  return (
    <>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </>
  );
}

function ShapeSVG({ type, size }) {
  const strokeColor = "rgba(191, 255, 0, 0.2)";
  
  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" fill="none" stroke={strokeColor} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke={strokeColor} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'hexagon') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke={strokeColor} strokeWidth="1" />
      </svg>
    );
  }
  return null;
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
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'How it Works', 'FAQ'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-300"
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
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a href="#contact" className="btn-primary">
            Get Free Demo
          </a>
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
                  className="font-body text-lg text-slate-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="#contact" className="btn-primary mt-4 text-center">
                Get Free Demo
              </a>
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

function GrowMaxxLogo({ size = 40 }) {
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
            x="0" y="0" width="100" height="100" rx="24" 
            className="fill-lime-400 group-hover:fill-lime-500 transition-colors duration-300"
          />
          <path
            d="M28 62 L50 32 L72 62"
            stroke="#0A0A0B"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="68" r="6" fill="#0A0A0B" />
        </svg>
      </motion.div>
      <span className="font-display text-2xl font-extrabold tracking-tight text-white">
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
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-lime mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="kicker">Now serving Tamil Nadu</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-xl text-white mb-6"
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
              className="body-lg max-w-xl mb-10"
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
              <a href="#contact" className="btn-primary group">
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-12 mt-12 pt-12 border-t border-white/10"
            >
              {[
                { value: '48h', label: 'Delivery Time' },
                { value: '₹499', label: 'Starting Price' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-3xl font-bold text-lime-400">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right - Demo Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <DemoPreview />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-lime-400/20 via-transparent to-coral-400/20 rounded-3xl blur-xl opacity-50" />
      
      {/* Browser Frame */}
      <div className="relative glass rounded-2xl overflow-hidden border-animated">
        {/* Browser Header */}
        <div className="bg-dark-800/80 px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-coral-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-lime-400/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-dark-700 rounded-lg px-4 py-1 text-xs text-slate-500">
              annas-bakery.growmaxx.com
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 bg-gradient-to-b from-dark-900 to-dark-950">
          {/* Mini Hero */}
          <div className="relative h-32 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 mb-4 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🎂</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-950">
              <div className="text-sm font-bold text-white">Anna's Bakery</div>
              <div className="text-xs text-slate-400">Fresh Cakes Daily • Tiruppur</div>
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
                className={`p-3 rounded-xl text-center ${stat.highlight ? 'bg-lime-400/10 border border-lime-400/20' : 'bg-dark-800/50'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-lg">{stat.icon}</div>
                <div className={`text-lg font-bold ${stat.highlight ? 'text-lime-400' : 'text-white'}`}>{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
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
      
      {/* Floating Elements */}
      <motion.div
        className="absolute -top-6 -right-6 px-4 py-2 bg-lime-400 rounded-xl text-dark-950 font-bold text-sm shadow-glow-lime"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        +340% Orders 🚀
      </motion.div>
      
      <motion.div
        className="absolute -bottom-4 -left-4 px-4 py-2 glass rounded-xl text-white text-sm flex items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
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
    <section className="py-16 border-y border-white/5">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 mb-8"
        >
          Trusted by local businesses across Tamil Nadu
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {businesses.map((biz, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 py-3 rounded-full bg-dark-800/50 border border-white/5 text-slate-400 text-sm font-medium"
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
      gradient: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      icon: '💬',
      title: 'WhatsApp-First',
      description: 'One-tap WhatsApp ordering with auto-replies. Your customers message, you get notified instantly.',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: '📍',
      title: 'Google Visibility',
      description: 'We set up and optimize your Google Business Profile. Show up when locals search for your services.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: '🤖',
      title: 'AI FAQ Bot',
      description: 'Intelligent auto-responder handles common questions 24/7. Never miss a customer query.',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: '📊',
      title: 'Growth Analytics',
      description: 'Track visitors, leads, and conversions. Monthly reports show exactly how your site performs.',
      gradient: 'from-lime-500/20 to-green-500/20',
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Professional, mobile-first templates designed specifically for your business type.',
      gradient: 'from-pink-500/20 to-rose-500/20',
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
          className="text-center max-w-3xl mx-auto mb-16"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative h-full">
      <div className="card h-full flex flex-col">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="heading-sm text-white mb-3">{title}</h3>
        <p className="body-md flex-1">{description}</p>
        
        {/* Hover Arrow */}
        <div className="mt-6 flex items-center gap-2 text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-semibold">Learn more</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
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
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Simple Process</span>
          <h2 className="heading-lg text-white mb-6">
            From Zero to Live in{' '}
            <span className="text-gradient-lime">4 Easy Steps</span>
          </h2>
        </motion.div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-400/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number with Icon */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-dark-800 border border-white/10 flex items-center justify-center text-3xl relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-dark-950 text-xs font-bold">
                      {step.num}
                    </div>
                  </div>
                  
                  <h3 className="heading-sm text-white mb-3">{step.title}</h3>
                  <p className="body-md">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary">
            Start Your Free Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING SECTION
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
          className="text-center max-w-3xl mx-auto mb-16"
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
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
        
        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-800/50 border border-white/5">
            <span className="text-2xl">🛡️</span>
            <span className="text-sm text-slate-400">
              <span className="text-white font-semibold">100% Satisfaction Guarantee.</span>{' '}
              Don't love it? Full refund within 7 days.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, description, features, cta, popular }) {
  return (
    <div className={`relative h-full ${popular ? 'lg:-mt-4 lg:mb-4' : ''}`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime-400 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-full">
          Most Popular
        </div>
      )}
      
      <div className={`h-full p-8 rounded-3xl ${
        popular 
          ? 'bg-gradient-to-b from-lime-400/10 to-dark-800/50 border-2 border-lime-400/30' 
          : 'glass'
      }`}>
        {/* Header */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-white mb-2">{name}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        
        {/* Price */}
        <div className="mb-8">
          <span className="font-display text-5xl font-bold text-white">₹{price}</span>
          <span className="text-slate-500 ml-2">{period}</span>
        </div>
        
        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${popular ? 'text-lime-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <a 
          href="#contact" 
          className={`block w-full py-4 text-center rounded-xl font-semibold transition-all duration-300 ${
            popular 
              ? 'bg-lime-400 text-dark-950 hover:bg-lime-500 hover:shadow-glow-lime' 
              : 'border border-white/20 text-white hover:border-lime-400/50 hover:bg-lime-400/5'
          }`}
        >
          {cta}
        </a>
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="kicker mb-4 block">Testimonials</span>
          <h2 className="heading-lg text-white mb-6">
            Loved by{' '}
            <span className="text-gradient-lime">Local Businesses</span>
          </h2>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
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
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-lg text-white leading-relaxed mb-8 flex-1">"{quote}"</p>
      
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-2xl">
          {avatar}
        </div>
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className="text-sm text-slate-400">{business}, {location}</div>
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
      q: "Do you work only in Tiruppur?",
      a: "We started in Tiruppur but now serve businesses across Tamil Nadu - Coimbatore, Chennai, and expanding. Contact us to check availability in your city."
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
              href="https://wa.me/919999999999?text=Hi%20GrowMaxx,%20I%20have%20a%20question" 
              className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with us on WhatsApp
            </a>
          </motion.div>
          
          {/* Right - FAQ Accordion */}
          <div className="space-y-4">
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
    <div className={`rounded-2xl border transition-all duration-300 ${
      isOpen ? 'bg-dark-800/50 border-lime-400/20' : 'bg-dark-900/50 border-white/5 hover:border-white/10'
    }`}>
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className={`font-semibold transition-colors ${isOpen ? 'text-lime-400' : 'text-white'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ml-4 ${isOpen ? 'text-lime-400' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="px-6 pb-5 text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-lime-400/5 to-dark-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-lime-400/5 blur-[150px]" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 via-coral-400 to-lime-400 opacity-20" 
              style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 4s ease infinite' }} 
            />
            
            <div className="relative m-[1px] bg-dark-900 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="heading-lg text-white mb-4">
                  Ready to Grow Your Business?
                </h2>
                <p className="body-lg max-w-2xl mx-auto">
                  Get a free demo website in 48 hours. No payment required.
                  See how your business looks online before you decide.
                </p>
              </div>
              
              {/* Contact Form */}
              <form className="max-w-2xl mx-auto space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="input"
                  />
                  <input 
                    type="text" 
                    placeholder="Business name" 
                    className="input"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="tel" 
                    placeholder="WhatsApp number" 
                    className="input"
                  />
                  <select className="input text-slate-500">
                    <option>Business type</option>
                    <option>Bakery</option>
                    <option>Salon</option>
                    <option>Clinic</option>
                    <option>Tuition</option>
                    <option>Tailor</option>
                    <option>Boutique</option>
                    <option>Other</option>
                  </select>
                </div>
                <input 
                  type="text" 
                  placeholder="City / Area" 
                  className="input"
                />
                <textarea 
                  placeholder="Tell us about your business (optional)" 
                  rows={3}
                  className="input resize-none"
                />
                
                <button type="submit" className="btn-primary w-full py-5 text-base">
                  Request Free Demo
                </button>
              </form>
              
              {/* Alternative CTA */}
              <div className="text-center mt-8 pt-8 border-t border-white/10">
                <p className="text-slate-400 mb-4">Prefer WhatsApp? Message us directly</p>
                <a 
                  href="https://wa.me/919999999999?text=Hi%20GrowMaxx,%20I%20want%20a%20free%20demo%20for%20my%20business" 
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] rounded-full text-white font-semibold hover:bg-[#20BD5C] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Message on WhatsApp
                </a>
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
    <footer className="py-12 border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <GrowMaxxLogo size={36} />
            <p className="text-slate-400 mt-4 max-w-sm">
              Helping local businesses in Tamil Nadu grow online. Professional websites, 
              WhatsApp ordering, Google visibility — all in 48 hours.
            </p>
            <div className="flex gap-4 mt-6">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-lime-400 hover:border-lime-400/20 transition-all"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GrowMaxx. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Made with 💚 in Tamil Nadu • Tiruppur · Coimbatore · Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const icons = {
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
  };
  
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
}

