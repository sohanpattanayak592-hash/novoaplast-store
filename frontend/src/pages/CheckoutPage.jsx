import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, ArrowLeft, Check, CreditCard, Tag, Truck, Trash2, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, removeFromCart, clearCart, getCartTotal } = useCart()

  const [contactInfo, setContactInfo] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  })
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState(null) // { orderId, orderIds[] }

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    const code = promoInput.trim().toUpperCase()
    if (code === 'NOVO20') {
      setAppliedPromo({ code: 'NOVO20', discountPercent: 20 })
    } else {
      alert('Invalid or expired promo code.')
      setAppliedPromo(null)
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
  }

  const subtotal = getCartTotal()
  const discount = appliedPromo ? Math.round(subtotal * appliedPromo.discountPercent / 100) : 0
  const finalPrice = subtotal - discount

  const handleOrder = async () => {
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address || !contactInfo.city || !contactInfo.pincode) {
      alert('Please fill in all required fields.')
      return
    }
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }

    setSubmitting(true)
    const orderIds = []

    try {
      // Build the single JSON payload for the entire cart
      const orderPayload = {
        items: items,
        contactInfo: contactInfo,
        promo: appliedPromo || null,
        totalAmount: getCartTotal()
      }

      const res = await fetch('/api/orders', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload) 
      })

      if (res.ok) {
        const data = await res.json()
        orderIds.push(...data.order_ids)

        // Save email to localStorage for order tracking
        localStorage.setItem('novoplast_customer_email', contactInfo.email)
        localStorage.setItem('novoplast_customer_phone', contactInfo.phone)

        // Open Razorpay for the total order
        if (data.razorpay_order_id && window.Razorpay) {
          const options = {
            key: data.razorpay_key_id,
            amount: data.amount,
            currency: 'INR',
            name: 'NOVOPLAST',
            description: `Order of ${items.length} item(s)`,
            order_id: data.razorpay_order_id,
            handler: async (response) => {
              // Verify payment on backend
              const verifyFormData = new FormData()
              verifyFormData.append('razorpay_order_id', response.razorpay_order_id)
              verifyFormData.append('razorpay_payment_id', response.razorpay_payment_id)
              verifyFormData.append('razorpay_signature', response.razorpay_signature)
              
              await fetch('/api/verify-payment', {
                method: 'POST',
                body: verifyFormData
              })
              
              setOrderResult({ orderIds })
              clearCart()
            },
            prefill: { name: contactInfo.name, email: contactInfo.email, contact: contactInfo.phone },
            theme: { color: '#8BCC63' }
          }
          new window.Razorpay(options).open()
        } else {
          // No razorpay (fallback or local)
          setOrderResult({ orderIds })
          clearCart()
        }
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch {
      alert('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Empty cart view
  if (items.length === 0 && !orderResult) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card glow-ring-novo p-12 text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-novo-500/10 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-novo-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            Browse our collection of non-tearable prints and add items to your cart.
          </p>
          <Link to="/" className="btn-novo inline-flex items-center gap-2" id="checkout-browse">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  // Order success view
  if (orderResult) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card glow-ring-novo p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Order Placed!</h2>
          <p className="text-white/50 mb-2">Your order has been successfully submitted.</p>
          <div className="my-4 p-3 rounded-lg bg-dark-800/50 border border-white/10">
            <p className="text-white/40 text-xs mb-1">Order ID(s)</p>
            {orderResult.orderIds.map((id) => (
              <p key={id} className="text-novo-400 font-display font-bold text-lg">{id}</p>
            ))}
          </div>
          <p className="text-white/40 text-sm mb-6">We'll send updates to your email.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/orders')} className="btn-novo inline-flex items-center gap-2">
              <Package className="w-4 h-4" /> Track Orders
            </button>
            <button onClick={() => navigate('/')}
              className="px-6 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-display font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>

        <h1 className="font-display font-bold text-3xl text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Cart Items + Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Cart Items */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-display font-bold text-xl text-white mb-4">Your Items ({items.length})</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="glass-card p-4 flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-dark-800">
                        <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{item.productName}</h4>
                        <p className="text-white/40 text-xs mt-0.5">{item.selectedSize} · Qty: {item.selectedQty}</p>
                        {item.personalization && (
                          <p className="text-white/30 text-xs mt-0.5 truncate">"{item.personalization}"</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-novo-400 font-display font-bold">{item.currency}{item.totalPrice}</p>
                        <button onClick={() => removeFromCart(item.cartId)}
                          className="text-white/30 hover:text-red-400 transition-colors mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display font-bold text-xl text-white mb-4">Contact Information</h2>
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

            {/* Delivery Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display font-bold text-xl text-white mb-4">Delivery Address</h2>
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
                  <input type="text" placeholder="State" value={contactInfo.state}
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
              className="glass-card glow-ring-novo p-6 sticky top-24"
            >
              <h3 className="font-display font-bold text-xl text-white mb-6">Order Summary</h3>

              {/* Promo Code Section */}
              <div className="mb-6 pb-6 border-b border-white/10">
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input type="text" placeholder="Promo code" value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                      className="input-default flex-1 !bg-dark-800/50" id="promo-input"
                    />
                    <button onClick={handleApplyPromo} className="px-4 rounded-xl font-medium bg-novo-500/20 text-novo-400 hover:bg-novo-500/30 transition-colors">
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <Tag className="w-4 h-4" /> {appliedPromo.code} — {appliedPromo.discountPercent}% OFF
                    </div>
                    <button onClick={removePromo} className="text-white/40 hover:text-white text-xs underline">Remove</button>
                  </div>
                )}
              </div>

              {/* Cost Calculation */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-white font-display font-bold text-xl pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-novo-400">₹{finalPrice}</span>
                </div>
              </div>

              <button onClick={handleOrder} disabled={submitting}
                className={`w-full flex items-center justify-center gap-3 text-lg btn-novo ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="place-order-button"
              >
                <CreditCard className="w-5 h-5" />
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/30 text-xs">
                <Truck className="w-3.5 h-3.5" /> Free shipping on all orders
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
