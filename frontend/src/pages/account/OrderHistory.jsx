import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OrderHistory() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return
      try {
        const response = await fetch(`/api/user-orders?user_id=${user.id}`)
        if (response.ok) {
          const result = await response.json()
          // Sort by newest first
          const sorted = (result.orders || []).sort((a, b) => new Date(b.created_at || b.order_id) - new Date(a.created_at || a.order_id))
          setOrders(sorted)
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case 'shipped': return <Truck className="w-5 h-5 text-novo-400" />
      default: return <Clock className="w-5 h-5 text-orange-400" />
    }
  }

  if (loading) return <div>Loading...</div>

  if (orders.length === 0) {
    return (
      <div className="glass-card glow-ring-novo p-12 text-center">
        <Package className="w-16 h-16 mx-auto text-white/20 mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">No Orders Yet</h2>
        <p className="text-white/40 mb-6">Looks like you haven't placed any orders with us yet.</p>
        <Link to="/" className="btn-novo px-6 py-3">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id || order.order_id} className="glass-card p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-novo-500/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-dark-800 flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-white/20" />
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Order #{order.order_id}</p>
                <h3 className="font-display font-bold text-lg text-white mb-1">
                  {order.product_name}
                </h3>
                <p className="text-white/60 text-sm">
                  {new Date(order.created_at).toLocaleDateString()} • ₹{order.total_price} • Qty: {order.quantity}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto gap-4">
              <div className="flex items-center gap-2 bg-dark-800/50 px-3 py-1.5 rounded-full border border-white/5">
                {getStatusIcon(order.tracking_status)}
                <span className="text-sm font-medium text-white/80">{order.tracking_status || 'Placed'}</span>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link to={`/track?id=${order.order_id}&email=${order.customer?.email}`} className="btn-novo flex-1 md:flex-none text-center px-4 py-2 text-sm">
                  Track Order
                </Link>
                <button className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white transition-colors text-sm">
                  Reorder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
