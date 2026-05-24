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
          <img src="/hero-banner.png" alt="NOVOPLAST Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/80 to-dark-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900 opacity-60" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-saffron-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="badge-durable mb-6 inline-flex">
              <Sparkles className="w-3.5 h-3.5" /> India's First Non-Tearable Print Store
            </span>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="section-heading mt-4 mb-6">
            <span className="text-white">Prints That </span>
            <span className="text-gold-gradient">Can't Be Torn.</span>
            <br />
            <span className="text-white/80">Ever.</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium posters, sacred shlokas & custom stickers — printed on indestructible, waterproof plastic sheets that last a lifetime.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/product/custom-posters" className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto" id="cta-shop-now">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/product/spiritual-prints" className="btn-outline-gold flex items-center justify-center gap-2 w-full sm:w-auto" id="cta-spiritual">
              Explore Spiritual Prints
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
                <item.icon className="w-4 h-4 text-saffron-500/50" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="py-24 px-4" id="products-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Our Collection</span>
            <h2 className="section-heading text-white mt-2">
              Choose Your <span className="text-gold-gradient">Print</span>
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
                      <h3 className={`font-display font-bold text-xl mb-2 ${isNeon ? 'text-neon-cyan' : isSpiritual ? 'text-saffron-300' : 'text-white'}`}>
                        {product.name}
                      </h3>
                      <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className={`font-display font-bold text-lg ${isNeon ? 'text-neon-cyan' : 'text-saffron-400'}`}>
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
              Why <span className="text-gold-gradient">NOVOPLAST</span>?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Non-Tearable', desc: 'Our plastic substrate is engineered to resist tearing, bending, and crumpling.', color: 'saffron' },
              { icon: Droplets, title: '100% Waterproof', desc: 'Splash it, soak it, hang it in your bathroom — it won\'t budge.', color: 'saffron' },
              { icon: Star, title: 'HD Printing', desc: '1200 DPI precision ensures every detail shines in vivid color.', color: 'saffron' },
              { icon: Infinity, title: 'Lifetime Durability', desc: 'UV resistant and fade-proof — your prints look new for decades.', color: 'saffron' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-ring-gold p-8 text-center hover:border-saffron-500/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-saffron-500/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-saffron-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-saffron-300 mb-2">{item.title}</h3>
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
            className="glass-card glow-ring-gold p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron-500/50 to-transparent" />
            <h2 className="section-heading text-white mb-4">Ready to Print <span className="text-gold-gradient">Something Eternal</span>?</h2>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">From posters to sacred shlokas — create prints that outlast everything.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/product/custom-posters" className="btn-gold w-full sm:w-auto" id="cta-bottom-shop">Start Customizing</Link>
              <Link to="/product/custom-stickers" className="btn-neon w-full sm:w-auto" id="cta-stickers">Design Stickers</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
