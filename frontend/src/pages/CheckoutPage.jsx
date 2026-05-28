import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, ArrowLeft, Check, CreditCard, Tag, Truck } from 'lucide-react'

export default function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // State passed from ProductPage
  const {
    product,
    selectedSize,
    selectedQty,
    personalization,
    shloka,
    totalPrice: basePrice,
    uploadedFile
  } = location.state || {}

  const [contactInfo, setContactInfo] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  })
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null) // null or { code: 'NOVO20', discountPercent: 20 }
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Handlers
  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    const code = promoInput.trim().toUpperCase()
    if (code === 'NOVO20') {
      setAppliedPromo({ code: 'NOVO20', discountPercent: 20 })
      alert('Promo code NOVO20 applied successfully! 20% OFF.')
    } else {
      alert('Invalid or expired promo code.')
      setAppliedPromo(null)
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
  }

  const finalPrice = appliedPromo 
    ? Math.round(basePrice * (1 - appliedPromo.discountPercent / 100))
    : basePrice

  const handleOrder = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address || !contactInfo.city || !contactInfo.pincode) {
      alert('Please fill in all required contact and address details.')
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('product_id', product.id)
    formData.append('product_name', product.name)
    formData.append('size', selectedSize)
    formData.append('quantity', selectedQty)
    formData.append('personalization_text', personalization || '')
    formData.append('shloka', shloka || '')
    formData.append('total_price', finalPrice)
    formData.append('customer_name', contactInfo.name)
    formData.append('customer_email', contactInfo.email)
    formData.append('customer_phone', contactInfo.phone)
    formData.append('customer_address', contactInfo.address)
    formData.append('customer_city', contactInfo.city)
    formData.append('customer_state', contactInfo.state)
    formData.append('customer_pincode', contactInfo.pincode)
    if (appliedPromo) formData.append('promo_code', appliedPromo.code)
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
            theme: { color: '#ffa000' }
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

  // If no product state, show empty cart
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card glow-ring-gold p-12 text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-saffron-500/10 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-saffron-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            Browse our collection of non-tearable prints and add items directly via the product pages. 
          </p>
          <Link to="/" className="btn-gold inline-flex items-center gap-2" id="checkout-browse">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
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
          <p className="text-white/50 mb-8">We've received your order and will begin processing it right away.</p>
          <button onClick={() => { setOrderSuccess(false); navigate('/') }} className="btn-gold">Back to Home</button>
        </motion.div>
      </div>
    )
  }

  const isNeon = product.variant === 'neon'

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Product
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Forms */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display font-bold text-2xl text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name *" value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="input-default" id="checkout-name"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address *" value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="input-default" id="checkout-email"
                  />
                  <input type="tel" placeholder="Phone Number *" value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="input-default" id="checkout-phone"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display font-bold text-2xl text-white mb-6">Delivery Address</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Full Address (Street, House No, Landmark) *" value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="input-default" id="checkout-address"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City *" value={contactInfo.city}
                    onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                    className="input-default" id="checkout-city"
                  />
                  <input type="text" placeholder="State *" value={contactInfo.state}
                    onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                    className="input-default" id="checkout-state"
                  />
                </div>
                <input type="text" placeholder="Pincode *" value={contactInfo.pincode}
                  onChange={(e) => setContactInfo({ ...contactInfo, pincode: e.target.value })}
                  className="input-default w-full sm:w-1/2" id="checkout-pincode"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className={`glass-card ${isNeon ? 'glow-ring-neon' : 'glow-ring-gold'} p-6 sticky top-24`}
            >
              <h3 className="font-display font-bold text-xl text-white mb-6">Order Summary</h3>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-dark-800">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className={`font-medium ${isNeon ? 'text-neon-cyan' : 'text-saffron-300'}`}>{product.name}</h4>
                  <p className="text-white/50 text-sm mt-1">Size: {selectedSize}</p>
                  {selectedQty !== '1' && <p className="text-white/50 text-sm">Qty: {selectedQty}</p>}
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mb-6 pb-6 border-b border-white/10">
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input type="text" placeholder="Promo code" value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                      className="input-default flex-1 !bg-dark-800/50" id="promo-input"
                    />
                    <button onClick={handleApplyPromo} className={`px-4 rounded-xl font-medium ${isNeon ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-saffron-500/20 text-saffron-400'}`}>
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <Tag className="w-4 h-4" /> Code '{appliedPromo.code}' Applied!
                    </div>
                    <button onClick={removePromo} className="text-white/40 hover:text-white text-xs underline">Remove</button>
                  </div>
                )}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{product.currency}{basePrice}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (20%)</span>
                    <span>-{product.currency}{Math.round(basePrice * 0.2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-white/80">FREE</span>
                </div>
                <div className="flex justify-between text-white font-display font-bold text-xl pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className={isNeon ? 'text-neon-cyan' : 'text-saffron-400'}>{product.currency}{finalPrice}</span>
                </div>
              </div>

              <button onClick={handleOrder} disabled={submitting}
                className={`w-full flex items-center justify-center gap-3 text-lg ${isNeon ? 'btn-neon' : 'btn-gold'} ${submitting ? 'opacity-50' : ''}`}
                id="place-order-button"
              >
                <CreditCard className="w-5 h-5" />
                {submitting ? 'Processing...' : `Place Order`}
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/30 text-xs">
                <Truck className="w-3.5 h-3.5" /> Fast, free shipping via reliable partners
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
