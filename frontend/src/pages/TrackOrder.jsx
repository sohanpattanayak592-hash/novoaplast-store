import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react'

export default function TrackOrder() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [orderId, setOrderId] = useState(searchParams.get('id') || '')
  const [email, setEmail] = useState(searchParams.get('email') || '')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (orderId && email) {
      handleTrack()
    }
  }, [])

  const handleTrack = async (e) => {
    if (e) e.preventDefault()
    if (!orderId || !email) return
    
    setLoading(true)
    setError('')
    setOrder(null)

    // Public fetch using service key or open policy for guest tracking?
    // Wait, the API already has /api/orders/{order_id}, let's use that instead if RLS blocks public query
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      if (res.ok) {
        const { order } = await res.json()
        if (order && order.customer?.email?.toLowerCase() === email.toLowerCase()) {
          setOrder(order)
        } else {
          setError('Order found, but email does not match.')
        }
      } else {
        setError('Order not found. Please check your Order ID.')
      }
    } catch (err) {
      setError('Failed to fetch order tracking details.')
    } finally {
      setLoading(false)
    }
  }

  const stages = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']
  const currentStageIndex = order ? stages.indexOf(order.tracking_status) : -1
  const effectiveStage = currentStageIndex === -1 ? 0 : currentStageIndex

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-white mb-4">Track Your Order</h1>
          <p className="text-white/60">Enter your order ID and email address to track your shipment.</p>
        </div>

        <form onSubmit={handleTrack} className="glass-card p-4 sm:p-6 mb-8 flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Order ID (e.g. 8A9B1C2D)" 
            required 
            value={orderId} 
            onChange={(e) => setOrderId(e.target.value)} 
            className="flex-1 bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-novo-500"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="flex-1 bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-novo-500"
          />
          <button type="submit" disabled={loading} className="btn-novo py-3 px-8 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> {loading ? 'Tracking...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center mb-8">
            {error}
          </div>
        )}

        {order && (
          <div className="glass-card glow-ring-novo p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <p className="text-white/40 text-sm mb-1">Order #{order.order_id}</p>
                <h2 className="font-display text-2xl font-bold text-white">{order.product_name}</h2>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-sm mb-1">Estimated Delivery</p>
                <p className="text-novo-400 font-bold">{order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : 'Pending'}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pt-10 pb-8">
              <div className="absolute top-14 left-4 right-4 h-1 bg-dark-700 rounded-full"></div>
              <div 
                className="absolute top-14 left-4 h-1 bg-novo-500 rounded-full transition-all duration-1000"
                style={{ width: `${(effectiveStage / (stages.length - 1)) * 100}%` }}
              ></div>
              
              <div className="relative flex justify-between">
                {stages.map((stage, idx) => {
                  const isCompleted = idx <= effectiveStage
                  const isActive = idx === effectiveStage
                  return (
                    <div key={stage} className="flex flex-col items-center relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${isCompleted ? 'bg-novo-500 text-dark-900' : 'bg-dark-800 text-white/20 border border-white/10'}`}>
                        {idx === 0 ? <Package className="w-4 h-4" /> : idx === 2 ? <Truck className="w-4 h-4" /> : idx === 4 ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <p className={`mt-3 text-xs sm:text-sm font-medium absolute top-10 whitespace-nowrap text-center ${isActive ? 'text-novo-400' : isCompleted ? 'text-white' : 'text-white/30'}`}>
                        {stage}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-16 bg-dark-800/30 rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-medium mb-4">Order Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/40 text-xs">Courier</p>
                  <p className="text-white text-sm font-medium">{order.tracking_number ? 'Delhivery / FedEx' : 'Assigning Courier...'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Tracking Number</p>
                  <p className="text-white text-sm font-medium">{order.tracking_number || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Shipping Address</p>
                  <p className="text-white text-sm font-medium">{order.customer?.address}, {order.customer?.city}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Total Paid</p>
                  <p className="text-white text-sm font-medium">₹{order.total_price}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
