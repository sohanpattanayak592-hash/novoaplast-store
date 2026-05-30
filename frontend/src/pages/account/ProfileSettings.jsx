import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function ProfileSettings() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({ full_name: '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile({ full_name: data.full_name || '', phone: data.phone || '' })
      }
      setLoading(false)
    }
    loadProfile()
  }, [user])

  async function handleUpdate(e) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('profiles').update(profile).eq('id', user.id)
    setSaving(false)
    alert('Profile updated!')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="glass-card glow-ring-novo p-8 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-white mb-6">Profile Settings</h1>
      
      <div className="mb-8">
        <label className="block text-white/60 text-sm mb-2">Email Address</label>
        <div className="w-full bg-dark-800/30 border border-white/5 rounded-xl py-3 px-4 text-white/40 cursor-not-allowed">
          {user?.email}
        </div>
        <p className="text-xs text-white/30 mt-2">Email address cannot be changed currently.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-white/60 text-sm mb-2">Full Name</label>
          <input 
            type="text" 
            value={profile.full_name} 
            onChange={e => setProfile({...profile, full_name: e.target.value})}
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" 
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2">Phone Number</label>
          <input 
            type="tel" 
            value={profile.phone} 
            onChange={e => setProfile({...profile, phone: e.target.value})}
            className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" 
          />
        </div>
        <button type="submit" disabled={saving} className="btn-novo py-3 px-8 mt-4">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
