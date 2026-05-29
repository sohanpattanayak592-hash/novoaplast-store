import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Droplets, Sun, Infinity, Star, Sparkles } from 'lucide-react'
import { products } from '../data/products'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
}

export default function HomePage() {
  const productList = Object.values(products)

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero-section">
        {/* BG image */}
        <div className="absolute inset-0">
          <img src="/aesthetic_candid_poster.png" alt="NOVOPLAST Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/80 to-dark-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80 opacity-80" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-novo-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="badge-durable mb-6 inline-flex">
              <Sparkles className="w-3.5 h-3.5" /> India's First Non-Tearable Print Store
            </span>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="section-heading mt-4 mb-6">
            <span className="text-white">Prints That </span>
            <span className="text-novo-gradient">Can't Be Torn.</span>
            <br />
            <span className="text-white/80">Ever.</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium posters, sacred shlokas & custom stickers — printed on indestructible, waterproof plastic sheets that last a lifetime.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/product/custom-posters" className="btn-novo flex items-center justify-center gap-2 w-full sm:w-auto" id="cta-shop-now">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/30 text-xs sm:text-sm">
            {[
              { icon: Shield, text: 'Non-Tearable' },
              { icon: Droplets, text: 'Waterproof' },
              { icon: Sun, text: 'UV Resistant' },
              { icon: Infinity, text: 'Lasts Forever' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-novo-500/50" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== REAL EMOTIONS ===== */}
      <section className="py-24 px-4 bg-dark-900 border-t border-b border-white/5" id="emotions-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Real Moments</span>
            <h2 className="section-heading text-white mt-2">
              The <span className="text-novo-gradient">Impact</span> of Forever
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">See how our indestructible prints are bringing joy and style to homes and lives everywhere.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: '/aesthetic_candid_poster.png', title: 'Home Décor that Endures', desc: 'Premium posters that won\'t fade in the sun.' },
              { img: '/aesthetic_candid_spiritual.png', title: 'Sacred & Serene', desc: 'Spiritual prints that bring peace and elegance.' },
              { img: '/aesthetic_candid_sticker.png', title: 'Vibrant Expressions', desc: 'Custom vinyl stickers for your personal gear.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group relative rounded-3xl overflow-hidden glass-card aspect-[4/5]"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANIMATED SHOWCASE & OFFER ===== */}
      <section className="py-24 px-4 bg-dark-950 overflow-hidden relative" id="promo-showcase">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-gradient-to-r from-novo-500/20 to-neon-cyan/20 rounded-full blur-[120px]"
           />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Animated Text & Offer */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold tracking-widest uppercase mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" /> Limited Time Offer
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                We Build <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-novo-400 to-neon-purple">
                  Indestructible
                </span><br/>
                Memories.
              </h2>
              <p className="text-white/50 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                Here is our legendary collection. We print your most cherished moments, sacred texts, and boldest designs on non-tearable, 100% waterproof substrates. 
              </p>
              
              <div className="glass-card glow-ring-novo p-6 border-novo-500/30 bg-novo-500/5 hover:bg-novo-500/10 transition-colors">
                <h3 className="text-2xl font-display font-bold text-novo-400 mb-2">Grab 20% OFF Today!</h3>
                <p className="text-white/60 mb-6 text-sm">Use code <span className="font-mono bg-dark-900 px-2 py-1 rounded text-white font-bold border border-white/10 shadow-inner">NOVO20</span> at checkout. Valid across all collections.</p>
                <a href="#products-section" className="btn-novo w-full flex justify-center items-center gap-2 group">
                  Claim Your Offer Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Right: Floating Animation Showcase */}
            <div className="relative h-[500px] lg:h-[600px] w-full hidden md:block">
              {/* Center Main Display */}
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 lg:w-72 h-80 lg:h-96 rounded-2xl overflow-hidden glass-card glow-ring-novo z-20 border-2 border-novo-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
              >
                <img src="/aesthetic_candid_spiritual.png" alt="Showcase Spiritual" className="w-full h-full object-cover opacity-90" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark-950 to-transparent">
                  <span className="badge-durable">Spiritual Canvas</span>
                </div>
              </motion.div>

              {/* Top Right Float */}
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [5, 10, 5] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-4 lg:top-10 right-0 lg:right-4 w-48 lg:w-56 h-64 lg:h-72 rounded-2xl overflow-hidden glass-card glow-ring-neon z-10 opacity-80"
              >
                <img src="/aesthetic_candid_sticker.png" alt="Showcase Stickers" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark-950 to-transparent">
                  <span className="badge-neon">Custom Stickers</span>
                </div>
              </motion.div>

              {/* Bottom Left Float */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [-5, -10, -5] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-4 lg:bottom-10 left-0 lg:left-4 w-56 lg:w-64 h-56 lg:h-64 rounded-2xl overflow-hidden glass-card glow-ring-novo z-30 opacity-90"
              >
                <img src="/aesthetic_candid_poster.png" alt="Showcase Posters" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark-950 to-transparent">
                  <span className="badge-durable">Premium Posters</span>
                </div>
              </motion.div>

              {/* Decorative particles */}
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_20px_#00f0ff] animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-novo-400 rounded-full shadow-[0_0_20px_#f59e0b] animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }} />
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_15px_#d946ef] animate-ping" style={{ animationDelay: '2s', animationDuration: '2.5s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="py-24 px-4" id="products-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Our Collection</span>
            <h2 className="section-heading text-white mt-2">
              Choose Your <span className="text-novo-gradient">Print</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Three categories. One promise — prints that endure everything.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productList.map((product, i) => {
              const isNeon = product.variant === 'neon'
              const isSpiritual = product.variant === 'spiritual'
              return (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Link to={`/product/${product.id}`} className="block product-card group" id={`product-card-${product.id}`}>
                    <div className="relative h-72 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={isNeon ? 'badge-neon' : 'badge-durable'}>
                          {isSpiritual ? '🕉 Spiritual' : isNeon ? '✨ Custom' : '🖼 Poster'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`font-display font-bold text-xl mb-2 ${isNeon ? 'text-neon-cyan' : isSpiritual ? 'text-novo-300' : 'text-white'}`}>
                        {product.name}
                      </h3>
                      <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className={`font-display font-bold text-lg ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`}>
                          Starting {product.currency}{product.price}
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-sm group-hover:text-white transition-colors">
                          Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 px-4 bg-dark-950/50" id="why-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="section-heading text-white">
              Why <span className="text-novo-gradient">NOVOPLAST</span>?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Non-Tearable', desc: 'Our plastic substrate is engineered to resist tearing, bending, and crumpling.', color: 'novo' },
              { icon: Droplets, title: '100% Waterproof', desc: 'Splash it, soak it, hang it in your bathroom — it won\'t budge.', color: 'novo' },
              { icon: Star, title: 'HD Printing', desc: '1200 DPI precision ensures every detail shines in vivid color.', color: 'novo' },
              { icon: Infinity, title: 'Lifetime Durability', desc: 'UV resistant and fade-proof — your prints look new for decades.', color: 'novo' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-ring-novo p-8 text-center hover:border-novo-500/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-novo-500/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-novo-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-novo-300 mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-4" id="cta-section">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="glass-card glow-ring-novo p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-novo-500/50 to-transparent" />
            <h2 className="section-heading text-white mb-4">Ready to Print <span className="text-novo-gradient">Something Eternal</span>?</h2>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">From posters to sacred shlokas — create prints that outlast everything.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/product/custom-posters" className="btn-novo w-full sm:w-auto" id="cta-bottom-shop">Start Customizing</Link>
              <Link to="/product/custom-stickers" className="btn-neon w-full sm:w-auto" id="cta-stickers">Design Stickers</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
