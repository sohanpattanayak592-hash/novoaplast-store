import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Package, MapPin, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({ orders: 0, wishlist: 0 })

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        
      setProfile(profileData)

      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        
      const { count: wishlistCount } = await supabase
        .from('wishlist')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      setStats({ 
        orders: orderCount || 0, 
        wishlist: wishlistCount || 0 
      })
    }
    
    fetchDashboardData()
  }, [user])

  return (
    <div className="space-y-6">
      <div className="glass-card glow-ring-novo p-8">
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Welcome back, {profile?.full_name || user?.email.split('@')[0]}!
        </h1>
        <p className="text-white/60">
          From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col items-center text-center hover:border-novo-500/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-novo-500/10 flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-novo-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">{stats.orders}</h3>
          <p className="text-white/40 mb-4">Total Orders</p>
          <Link to="/account/orders" className="text-novo-400 hover:text-novo-300 text-sm font-medium flex items-center gap-1 mt-auto">
            View Orders <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center hover:border-novo-500/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">{stats.wishlist}</h3>
          <p className="text-white/40 mb-4">Wishlist Items</p>
          <Link to="/account/wishlist" className="text-novo-400 hover:text-novo-300 text-sm font-medium flex items-center gap-1 mt-auto">
            View Wishlist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center hover:border-novo-500/30 transition-colors">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">Addresses</h3>
          <p className="text-white/40 mb-4">Manage Shipping</p>
          <Link to="/account/addresses" className="text-novo-400 hover:text-novo-300 text-sm font-medium flex items-center gap-1 mt-auto">
            Edit Addresses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
