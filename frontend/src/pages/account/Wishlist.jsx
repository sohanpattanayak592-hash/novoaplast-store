import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collectionsData } from '../../data/collectionsData'

export default function Wishlist() {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [user])

  async function fetchWishlist() {
    if (!user) return
    const { data } = await supabase.from('wishlist').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) {
      // Map product_ids to local mock data (for demonstration purposes, since products aren't in Supabase yet)
      const mappedItems = data.map(item => {
        let matchedProduct = null
        for (const cat in collectionsData) {
          const found = collectionsData[cat].find(p => p.id === item.product_id)
          if (found) matchedProduct = found
        }
        return { ...item, product: matchedProduct }
      }).filter(item => item.product) // Only keep valid ones
      
      setWishlist(mappedItems)
    }
    setLoading(false)
  }

  async function removeWishlist(id) {
    await supabase.from('wishlist').delete().eq('id', id)
    fetchWishlist()
  }

  if (loading) return <div>Loading...</div>

  if (wishlist.length === 0) {
    return (
      <div className="glass-card glow-ring-novo p-12 text-center">
        <Heart className="w-16 h-16 mx-auto text-white/20 mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h2>
        <p className="text-white/40 mb-6">Explore our collections and heart the posters you love.</p>
        <Link to="/collections" className="btn-novo px-6 py-3">Explore Collections</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button 
                onClick={() => removeWishlist(item.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-dark-900/50 backdrop-blur border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-dark-900 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-white mb-1 truncate">{item.product.name}</h3>
              <p className="text-novo-400 font-medium mb-3">₹{item.product.price}</p>
              <Link to={`/collections/${item.product_id}`} className="w-full btn-novo py-2 flex items-center justify-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" /> View Item
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
