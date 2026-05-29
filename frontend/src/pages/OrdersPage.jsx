import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Search, ArrowLeft, Clock, CheckCircle, Truck, Box, AlertCircle } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Order Received', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', step: 1 },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', step: 2 },
  printing: { label: 'Printing', icon: Box, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', step: 3 },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20', step: 4 },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', step: 5 },
  cancelled: { label: 'Cancelled', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', step: 0 },
}

const STEPS = ['Order Received', 'Confirmed', 'Printing', 'Shipped', 'Delivered']

export default function OrdersPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('email') // 'email' | 'phone' | 'orderId'
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('novoplast_customer_email')
    const savedPhone = localStorage.getItem('novoplast_customer_phone')
    if (savedEmail) {
      setSearchQuery(savedEmail)
      setSearchType('email')
    } else if (savedPhone) {
      setSearchQuery(savedPhone)
      setSearchType('phone')
    }
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        const allOrders = data.orders || []

        // Filter based on search type
        let filtered = []
        if (searchType === 'email') {
          filtered = allOrders.filter(o => o.customer?.email?.toLowerCase() === searchQuery.trim().toLowerCase())
        } else if (searchType === 'phone') {
          filtered = allOrders.filter(o => o.customer?.phone === searchQuery.trim())
        } else {
          filtered = allOrders.filter(o => o.order_id?.toUpperCase() === searchQuery.trim().toUpperCase())
        }

        // Sort by created_at descending
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setOrders(filtered)
      }
    } catch {
      alert('Could not fetch orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Auto-search on mount if we have saved credentials
  useEffect(() => {
    if (searchQuery) {
      handleSearch()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-white mb-2">My Orders</h1>
          <p className="text-white/40 mb-8">Track the status of your orders</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-5 mb-8"
        >
          <div className="flex gap-2 mb-3">
            {['email', 'phone', 'orderId'].map((type) => (
              <button key={type} onClick={() => setSearchType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  searchType === type
                    ? 'bg-novo-500/20 text-novo-400 border border-novo-500/30'
                    : 'text-white/40 border border-white/5 hover:border-white/10'
                }`}
              >
                {type === 'email' ? 'Email' : type === 'phone' ? 'Phone' : 'Order ID'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={searchType === 'email' ? 'Enter your email' : searchType === 'phone' ? 'Enter your phone number' : 'Enter Order ID (e.g. A6B17FFA)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="input-default flex-1"
              id="order-search-input"
            />
            <button onClick={handleSearch} disabled={loading}
              className="btn-novo px-6 flex items-center gap-2"
              id="order-search-button"
            >
              <Search className="w-4 h-4" /> {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-10 h-10 border-2 border-novo-500/30 border-t-novo-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/40">Fetching your orders...</p>
            </motion.div>
          ) : searched && orders.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass-card p-12 text-center"
            >
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-white mb-2">No Orders Found</h3>
              <p className="text-white/40 text-sm">We couldn't find any orders matching your search. Please check and try again.</p>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {orders.map((order, i) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
                const StatusIcon = status.icon

                return (
                  <motion.div
                    key={order.order_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-5"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white/40 text-xs">Order</span>
                          <span className="text-novo-400 font-display font-bold">{order.order_id}</span>
                        </div>
                        <p className="text-white/30 text-xs">{formatDate(order.created_at)}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.color} border ${status.border}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                      <div className="w-12 h-12 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-novo-400/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm">{order.product_name}</h4>
                        <p className="text-white/40 text-xs">
                          {order.size && `Size: ${order.size}`}
                          {order.quantity && order.quantity !== '1' && ` · Qty: ${order.quantity}`}
                        </p>
                      </div>
                      <p className="text-novo-400 font-display font-bold">₹{order.total_price}</p>
                    </div>

                    {/* Progress Tracker */}
                    {order.status !== 'cancelled' && (
                      <div className="flex items-center gap-1">
                        {STEPS.map((step, idx) => {
                          const isCompleted = (idx + 1) <= status.step
                          const isCurrent = (idx + 1) === status.step
                          return (
                            <React.Fragment key={step}>
                              <div className="flex flex-col items-center flex-1">
                                <div className={`w-3 h-3 rounded-full transition-all ${
                                  isCompleted ? 'bg-novo-500' : 'bg-white/10'
                                } ${isCurrent ? 'ring-2 ring-novo-500/30' : ''}`} />
                                <span className={`text-[9px] mt-1 text-center leading-tight ${
                                  isCompleted ? 'text-novo-400' : 'text-white/20'
                                }`}>{step}</span>
                              </div>
                              {idx < STEPS.length - 1 && (
                                <div className={`h-0.5 flex-1 rounded -mt-3 ${
                                  (idx + 1) < status.step ? 'bg-novo-500' : 'bg-white/10'
                                }`} />
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    )}

                    {/* Promo code if applied */}
                    {order.promo_code && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <span className="text-xs text-green-400/70">Promo: {order.promo_code}</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
