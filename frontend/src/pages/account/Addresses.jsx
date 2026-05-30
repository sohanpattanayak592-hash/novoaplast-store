import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react'

export default function Addresses() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    address_line1: '', city: '', state: '', pincode: '', is_default: false
  })

  useEffect(() => {
    fetchAddresses()
  }, [user])

  async function fetchAddresses() {
    if (!user) return
    const { data } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setAddresses(data)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return
    const { error } = await supabase.from('addresses').insert([{ ...formData, user_id: user.id }])
    if (!error) {
      setShowForm(false)
      setFormData({ address_line1: '', city: '', state: '', pincode: '', is_default: false })
      fetchAddresses()
    }
  }

  async function handleDelete(id) {
    await supabase.from('addresses').delete().eq('id', id)
    fetchAddresses()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Saved Addresses</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-novo flex items-center gap-2 py-2 px-4 text-sm">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <h2 className="text-white font-medium mb-4">Add New Address</h2>
          <input type="text" placeholder="Street Address" required value={formData.address_line1} onChange={e => setFormData({...formData, address_line1: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" />
            <input type="text" placeholder="State" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" />
          </div>
          <input type="text" placeholder="Pincode" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" />
          <label className="flex items-center gap-2 text-white/60">
            <input type="checkbox" checked={formData.is_default} onChange={e => setFormData({...formData, is_default: e.target.checked})} className="rounded bg-dark-800 border-white/10 text-novo-500 focus:ring-novo-500" />
            Set as default address
          </label>
          <div className="flex gap-4">
            <button type="submit" className="btn-novo py-2 px-6">Save Address</button>
            <button type="button" onClick={() => setShowForm(false)} className="py-2 px-6 rounded-xl border border-white/10 text-white/60 hover:text-white">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 && !showForm && (
          <div className="col-span-2 text-center py-12 glass-card">
            <MapPin className="w-12 h-12 mx-auto text-white/20 mb-4" />
            <p className="text-white/40">You have no saved addresses.</p>
          </div>
        )}
        {addresses.map(address => (
          <div key={address.id} className="glass-card p-6 relative group">
            {address.is_default && (
              <span className="absolute top-4 right-4 bg-novo-500/20 text-novo-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Default
              </span>
            )}
            <h3 className="text-white font-medium mb-2 pr-20">{address.address_line1}</h3>
            <p className="text-white/60 text-sm mb-4">
              {address.city}, {address.state} {address.pincode}
            </p>
            <button onClick={() => handleDelete(address.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 transition-colors">
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
