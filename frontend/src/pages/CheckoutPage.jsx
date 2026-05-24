import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card glow-ring-gold p-12 text-center max-w-lg"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-saffron-500/10 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-saffron-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
        <p className="text-white/40 mb-8 leading-relaxed">
          Browse our collection of non-tearable prints and add items directly via the product pages. 
          Each product has a "Buy Now" flow built-in!
        </p>
        <Link to="/" className="btn-gold inline-flex items-center gap-2" id="checkout-browse">
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
