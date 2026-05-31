import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Shield, Settings, Users, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiKey, setApiKey] = useState(localStorage.getItem('novoplast_admin_key') || '')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (apiKey) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [apiKey])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'api-key': apiKey
        }
      })
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
        setError('')
      } else {
        setError('Unauthorized: Invalid API Key')
        setOrders([])
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveKey = (e) => {
    e.preventDefault()
    localStorage.setItem('novoplast_admin_key', apiKey)
    fetchOrders()
  }

  const handleLogout = () => {
    localStorage.removeItem('novoplast_admin_key')
    setApiKey('')
    setOrders([])
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <SEOHead title="Admin Dashboard | NOVOPLAST" />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="text-novo-400" /> Admin Dashboard
          </h1>
          {apiKey && (
            <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors text-sm">
              Lock Dashboard
            </button>
          )}
        </div>

        {!apiKey || error ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card glow-ring-novo p-8 max-w-md mx-auto text-center mt-20">
            <Shield className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white mb-2">Secure Access</h2>
            <p className="text-white/40 text-sm mb-6">Enter your Admin API key to access the store dashboard.</p>
            <form onSubmit={handleSaveKey} className="space-y-4">
              <input 
                type="password" 
                placeholder="Admin API Key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-default w-full text-center tracking-widest"
              />
              <button type="submit" className="btn-novo w-full flex justify-center items-center gap-2">
                Unlock <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <div className="glass-card p-6">
                <h3 className="text-white/40 text-sm mb-1">Total Orders</h3>
                <p className="text-3xl font-display font-bold text-white">{orders.length}</p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-white/40 text-sm mb-1">System Status</h3>
                <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-display font-bold text-white">Recent Orders</h3>
                  <button onClick={fetchOrders} className="text-novo-400 text-sm hover:underline">Refresh</button>
                </div>
                
                {loading ? (
                  <div className="p-12 text-center text-white/40">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="p-12 text-center text-white/40">No orders found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white/60">
                      <thead className="bg-dark-800/50 text-white/40 uppercase text-xs">
                        <tr>
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {orders.slice().reverse().map(order => (
                          <tr key={order.order_id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-novo-400">{order.order_id}</td>
                            <td className="px-6 py-4">
                              <p className="text-white font-medium">{order.customer?.name || 'Guest'}</p>
                              <p className="text-xs text-white/40">{order.customer?.email}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-white truncate max-w-[200px]">{order.product_name}</p>
                              <p className="text-xs text-white/40">Qty: {order.quantity}</p>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">₹{order.total_price}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded-full bg-dark-800 border border-white/10 text-xs">
                                {order.tracking_status || 'Placed'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
