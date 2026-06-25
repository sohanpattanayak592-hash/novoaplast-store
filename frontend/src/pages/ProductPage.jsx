import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Check, Package, Truck, CreditCard, Plus, Shield } from 'lucide-react'
import { products } from '../data/products'
import { POSTER_SIZES, CURRENCY, BUNDLE_DISCOUNTS } from '../data/pricingConfig'
import { DurabilityBadges, DurabilityStrip } from '../components/DurabilityBadges'
import PersonalizationInput from '../components/PersonalizationInput'
import StickerUploader from '../components/StickerUploader'
import ReviewSection from '../components/ReviewSection'
import { useCart } from '../context/CartContext'
import SEOHead from '../components/SEOHead'
import RoomVisualizerModal from '../components/RoomVisualizerModal'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
}

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products[slug]

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedQty, setSelectedQty] = useState(0)
  const [personalization, setPersonalization] = useState('')
  const [selectedShloka, setSelectedShloka] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [showVisualizer, setShowVisualizer] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <SEOHead title="Product Not Found | NOVOPLAST" />
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-novo">Go Home</button>
        </div>
      </div>
    )
  }

  const isNeon = product.variant === 'neon'
  const isSpiritual = product.variant === 'spiritual'
  const isPoster = product.category === 'posters' || product.category === 'spiritual'
  const badgeVariant = isNeon ? 'neon' : 'novo'

  // Determine sizes array to use
  const sizesToUse = isPoster ? POSTER_SIZES : product.sizes || []
  const currentSizeObj = sizesToUse[selectedSize] || {}

  const currentPrice = currentSizeObj.price || product.price
  const qtyMultiplier = product.quantities ? product.quantities[selectedQty]?.multiplier || 1 : 1
  const totalPrice = Math.round(currentPrice * qtyMultiplier)

  const buildCartItem = () => {
    return {
      productId: product.id,
      productName: product.name,
      image: product.image,
      currency: CURRENCY,
      variant: product.variant,
      category: product.category,
      selectedSize: currentSizeObj.dimensions ? `${currentSizeObj.label} - ${currentSizeObj.dimensions}` : currentSizeObj.label,
      sizeId: currentSizeObj.id,
      selectedQty: product.quantities ? product.quantities[selectedQty]?.label : '1',
      personalization: personalization,
      shloka: selectedShloka || '',
      totalPrice: totalPrice,
      uploadedFileName: uploadedFile?.name || null,
    }
  }

  const handleAddToCart = () => {
    if (product.hasUpload && !uploadedFile) {
      alert('Please upload your design first.'); return
    }
    addToCart(buildCartItem())
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBuyNow = () => {
    if (product.hasUpload && !uploadedFile) {
      alert('Please upload your design first.'); return
    }
    addToCart(buildCartItem())
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <SEOHead 
        title={`${product.name} | NOVOPLAST`} 
        description={product.tagline}
        image={product.image}
      />
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <motion.button initial="hidden" animate="visible" variants={fadeUp}
          onClick={() => navigate('/')} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT — Product Image */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <div className={`relative rounded-3xl overflow-hidden ${isNeon ? 'glow-ring-neon' : 'glow-ring-novo'}`}>
              <img src={product.image} alt={product.name} className="w-full aspect-[2/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <DurabilityStrip variant={badgeVariant} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Product Details */}
          <div className="space-y-8">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
              <span className={isNeon ? 'badge-neon' : 'badge-durable'}>
                {isSpiritual ? '🕉 Spiritual Collection' : isNeon ? '✨ Custom Design' : '🖼 Premium Posters'}
              </span>
              <h1 className={`font-display font-bold text-3xl md:text-4xl mt-4 mb-2 ${isNeon ? 'text-neon-cyan' : isSpiritual ? 'text-novo-300' : 'text-white'}`}>
                {product.name}
              </h1>
              <p className="text-white/40 leading-relaxed">{product.description}</p>
            </motion.div>

            {/* Price */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className={`glass-card p-4 sm:p-6 ${isNeon ? 'glow-ring-neon' : 'glow-ring-novo'}`}
            >
              <div className="flex items-baseline gap-2">
                <span className={`font-display font-bold text-3xl sm:text-4xl ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`}>
                  {CURRENCY}{totalPrice}
                </span>
                <span className="text-white/30 text-sm">incl. GST</span>
              </div>
            </motion.div>

            {/* Size Selection */}
            {sizesToUse.length > 0 && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
                <label className={`block text-sm font-display font-semibold mb-3 ${isNeon ? 'text-neon-cyan' : 'text-novo-300'}`}>
                  Select Size
                </label>
                <div className="space-y-3">
                  {sizesToUse.map((size, i) => (
                    <button key={i} onClick={() => setSelectedSize(i)}
                      className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                        selectedSize === i
                          ? isNeon
                            ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : 'border-novo-500 bg-novo-500/10 text-novo-300 shadow-[0_0_15px_rgba(139,204,99,0.15)]'
                          : 'border-white/10 bg-dark-800/50 hover:border-white/20'
                      }`}
                      id={`size-option-${i}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-bold ${selectedSize === i ? '' : 'text-white'}`}>{size.label}</span>
                        {size.dimensions && <span className="text-white/40 text-xs mt-0.5">{size.dimensions}</span>}
                      </div>
                      <span className={`font-display font-bold text-lg mt-2 sm:mt-0 ${selectedSize === i ? '' : 'text-white/80'}`}>
                        {CURRENCY}{size.price}
                      </span>
                    </button>
                  ))}
                </div>

                {isPoster && (
                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center flex items-center justify-center gap-2">
                    <Check className="w-3.5 h-3.5" /> Bundle Offer: Add {BUNDLE_DISCOUNTS[BUNDLE_DISCOUNTS.length-1].minQty} posters to cart for {BUNDLE_DISCOUNTS[BUNDLE_DISCOUNTS.length-1].discount * 100}% OFF!
                  </div>
                )}
              </motion.div>
            )}

            {/* Quantity (stickers only) */}
            {product.quantities && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3.5}>
                <label className="block text-sm font-display font-semibold text-neon-cyan mb-3">Quantity</label>
                <div className="grid grid-cols-2 gap-3">
                  {product.quantities.map((qty, i) => (
                    <button key={i} onClick={() => setSelectedQty(i)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedQty === i
                          ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
                          : 'border-white/5 bg-dark-800/50 text-white/60 hover:border-white/10'
                      }`}
                      id={`qty-option-${i}`}
                    >
                      {qty.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Shloka Selector (spiritual only) */}
            {product.shlokas && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}>
                <label className="block text-sm font-display font-semibold text-novo-300 mb-3">
                  Choose Shloka / Arti
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.shlokas.map((s) => (
                    <button key={s.name} onClick={() => setSelectedShloka(s.name)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedShloka === s.name
                          ? 'border-novo-500/50 bg-novo-500/10'
                          : 'border-white/5 bg-dark-800/50 hover:border-white/10'
                      }`}
                      id={`shloka-${s.name.replace(/\s/g, '-').toLowerCase()}`}
                    >
                      <span className={`text-sm font-medium block ${selectedShloka === s.name ? 'text-novo-300' : 'text-white/70'}`}>
                        {s.name}
                      </span>
                      <span className="text-white/30 text-xs mt-1 block">{s.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* File Upload (stickers and posters) */}
            {product.hasUpload && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4.5}>
                <StickerUploader onFileSelect={setUploadedFile} variant={isNeon ? 'neon' : 'default'} />
              </motion.div>
            )}

            {/* Personalization Input */}
            {product.hasPersonalization && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}>
                <PersonalizationInput
                  value={personalization}
                  onChange={setPersonalization}
                  variant={isSpiritual ? 'spiritual' : 'default'}
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7} className="space-y-4">
              {isPoster && (
                <button 
                  onClick={() => setShowVisualizer(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-semibold text-sm uppercase tracking-widest border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 shadow-lg"
                >
                  👁️ See It In Your Room
                </button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-semibold text-base border transition-all duration-300 ${
                    isNeon
                      ? 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'
                      : 'border-novo-500/30 text-novo-400 hover:bg-novo-500/10'
                  }`}
                  id="add-to-cart-button"
                >
                  <Plus className="w-5 h-5" /> Add to Cart
                </button>
                <button onClick={handleBuyNow}
                  className={`flex items-center justify-center gap-2 text-base ${isNeon ? 'btn-neon' : 'btn-novo'}`}
                  id="buy-now-button"
                >
                  <CreditCard className="w-5 h-5" /> Buy Now
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
                <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Free Packaging</span>
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Ships in 3-5 Days</span>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
              <h3 className={`font-display font-semibold text-sm uppercase tracking-widest mb-4 ${isNeon ? 'text-neon-cyan/70' : 'text-novo-400/70'}`}>
                Features
              </h3>
              <ul className="space-y-3">
                {product.features?.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/50 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`} />
                    {f}
                  </li>
                )) || (
                  // Fallback features if not defined directly on the product obj
                  <>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`} />100% Non-Tearable Substrate</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`} />Waterproof & Washable</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`} />Premium Matte Finish</li>
                  </>
                )}
              </ul>
            </motion.div>

            {/* Durability Badges */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={9}>
              <DurabilityBadges variant={badgeVariant} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products (Smart Recommendations) */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-white/5 pt-16">
        <h2 className="font-display text-3xl font-bold text-white mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Object.values(products)
            .filter(p => p.id !== product.id && p.tags?.some(tag => product.tags?.includes(tag)))
            .sort((a, b) => {
              // Sort by number of matching tags
              const aMatches = a.tags.filter(t => product.tags?.includes(t)).length
              const bMatches = b.tags.filter(t => product.tags?.includes(t)).length
              return bMatches - aMatches
            })
            .slice(0, 4)
            .map(related => (
              <Link key={related.id} to={`/product/${related.id}`} className="block glass-card rounded-2xl overflow-hidden group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{related.name}</h3>
                  <div className="text-novo-400 font-bold">₹{related.price}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <ReviewSection productId={product.id} />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-500/90 backdrop-blur-xl text-dark-900 px-6 py-3 rounded-2xl font-display font-semibold flex items-center gap-2 shadow-2xl"
          >
            <Check className="w-5 h-5" /> Added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <RoomVisualizerModal 
        isOpen={showVisualizer} 
        onClose={() => setShowVisualizer(false)} 
        posterImage={product.image} 
      />
    </div>
  )
}
