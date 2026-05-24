import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Check, Package, Truck, CreditCard } from 'lucide-react'
import { products } from '../data/products'
import { DurabilityBadges, DurabilityStrip } from '../components/DurabilityBadges'
import PersonalizationInput from '../components/PersonalizationInput'
import StickerUploader from '../components/StickerUploader'

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
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-gold">Go Home</button>
        </div>
      </div>
    )
  }

  const isNeon = product.variant === 'neon'
  const isSpiritual = product.variant === 'spiritual'
  const badgeVariant = isNeon ? 'neon' : 'gold'

  const currentPrice = product.sizes[selectedSize]?.price || product.price
  const qtyMultiplier = product.quantities ? product.quantities[selectedQty]?.multiplier || 1 : 1
  const totalPrice = Math.round(currentPrice * qtyMultiplier)

  const handleOrder = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert('Please fill in your contact details.'); return
    }
    if (product.hasUpload && !uploadedFile) {
      alert('Please upload your design.'); return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('product_id', product.id)
    formData.append('product_name', product.name)
    formData.append('size', product.sizes[selectedSize]?.label || '')
    formData.append('quantity', product.quantities ? product.quantities[selectedQty]?.label : '1')
    formData.append('personalization_text', personalization)
    formData.append('shloka', selectedShloka || '')
    formData.append('total_price', totalPrice)
    formData.append('customer_name', contactInfo.name)
    formData.append('customer_email', contactInfo.email)
    formData.append('customer_phone', contactInfo.phone)
    if (uploadedFile) formData.append('design_file', uploadedFile)

    try {
      const res = await fetch('/api/orders', { method: 'POST', body: formData })
      if (res.ok) {
        const data = await res.json()
        setOrderSuccess(true)
        // Razorpay integration
        if (data.razorpay_order_id && window.Razorpay) {
          const options = {
            key: data.razorpay_key_id,
            amount: data.amount,
            currency: 'INR',
            name: 'NOVOPLAST',
            description: product.name,
            order_id: data.razorpay_order_id,
            handler: () => alert('Payment successful! Your order is confirmed.'),
            prefill: { name: contactInfo.name, email: contactInfo.email, contact: contactInfo.phone },
            theme: { color: '#ffa000' },
            config: {
              display: {
                blocks: {
                  upi: {
                    name: "Pay via UPI",
                    instruments: [
                      { method: "upi" }
                    ]
                  },
                  other: {
                    name: "Other Payment Modes",
                    instruments: [
                      { method: "card" },
                      { method: "netbanking" },
                      { method: "wallet" }
                    ]
                  }
                },
                sequence: ["block.upi", "block.other"],
                preferences: {
                  show_default_blocks: false
                }
              }
            }
          }
          new window.Razorpay(options).open()
        }
      } else alert('Failed to place order. Please try again.')
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card glow-ring-gold p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Order Placed!</h2>
          <p className="text-white/50 mb-8">We'll reach out with payment details and a proof before printing.</p>
          <button onClick={() => { setOrderSuccess(false); navigate('/') }} className="btn-gold">Back to Home</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
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
            <div className={`relative rounded-3xl overflow-hidden ${isNeon ? 'glow-ring-neon' : 'glow-ring-gold'}`}>
              <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
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
              <h1 className={`font-display font-bold text-3xl md:text-4xl mt-4 mb-2 ${isNeon ? 'text-neon-cyan' : isSpiritual ? 'text-saffron-300' : 'text-white'}`}>
                {product.name}
              </h1>
              <p className="text-white/40 leading-relaxed">{product.description}</p>
            </motion.div>

            {/* Price */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className={`glass-card p-4 sm:p-6 ${isNeon ? 'glow-ring-neon' : 'glow-ring-gold'}`}
            >
              <div className="flex items-baseline gap-2">
                <span className={`font-display font-bold text-3xl sm:text-4xl ${isNeon ? 'text-neon-cyan' : 'text-saffron-400'}`}>
                  {product.currency}{totalPrice}
                </span>
                <span className="text-white/30 text-sm">incl. GST</span>
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
              <label className={`block text-sm font-display font-semibold mb-3 ${isNeon ? 'text-neon-cyan' : 'text-saffron-300'}`}>
                Select Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size, i) => (
                  <button key={i} onClick={() => setSelectedSize(i)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                      selectedSize === i
                        ? isNeon
                          ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan'
                          : 'border-saffron-500/50 bg-saffron-500/10 text-saffron-300'
                        : 'border-white/5 bg-dark-800/50 text-white/60 hover:border-white/10'
                    }`}
                    id={`size-option-${i}`}
                  >
                    <span className="text-sm font-medium block">{size.label}</span>
                    <span className={`text-lg font-display font-bold mt-1 block ${selectedSize === i ? '' : 'text-white/80'}`}>
                      {product.currency}{size.price}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

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
                <label className="block text-sm font-display font-semibold text-saffron-300 mb-3">
                  Choose Shloka / Arti
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.shlokas.map((s) => (
                    <button key={s.name} onClick={() => setSelectedShloka(s.name)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedShloka === s.name
                          ? 'border-saffron-500/50 bg-saffron-500/10'
                          : 'border-white/5 bg-dark-800/50 hover:border-white/10'
                      }`}
                      id={`shloka-${s.name.replace(/\s/g, '-').toLowerCase()}`}
                    >
                      <span className={`text-sm font-medium block ${selectedShloka === s.name ? 'text-saffron-300' : 'text-white/70'}`}>
                        {s.name}
                      </span>
                      <span className="text-white/30 text-xs mt-1 block">{s.text}</span>
                    </button>
                  ))}
                </div>
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

            {/* File Upload (stickers) */}
            {product.hasUpload && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}>
                <StickerUploader onFileSelect={setUploadedFile} />
              </motion.div>
            )}

            {/* Contact Info */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="space-y-4">
              <label className={`block text-sm font-display font-semibold ${isNeon ? 'text-neon-cyan' : 'text-saffron-300'}`}>
                Your Details
              </label>
              <input type="text" placeholder="Full Name" value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                className={isSpiritual ? 'input-spiritual' : 'input-default'} id="contact-name"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email" value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className={isSpiritual ? 'input-spiritual' : 'input-default'} id="contact-email"
                />
                <input type="tel" placeholder="Phone Number" value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className={isSpiritual ? 'input-spiritual' : 'input-default'} id="contact-phone"
                />
              </div>
            </motion.div>

            {/* Buy Button */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7} className="space-y-4">
              <button onClick={handleOrder} disabled={submitting}
                className={`w-full flex items-center justify-center gap-3 text-lg ${isNeon ? 'btn-neon' : 'btn-gold'} ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="buy-now-button"
              >
                <CreditCard className="w-5 h-5" />
                {submitting ? 'Placing Order...' : `Buy Now — ${product.currency}${totalPrice}`}
              </button>

              <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
                <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Free Packaging</span>
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Ships in 3-5 Days</span>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
              <h3 className={`font-display font-semibold text-sm uppercase tracking-widest mb-4 ${isNeon ? 'text-neon-cyan/70' : 'text-saffron-400/70'}`}>
                Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/50 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isNeon ? 'text-neon-cyan' : 'text-saffron-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Durability Badges */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={9}>
              <DurabilityBadges variant={badgeVariant} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
