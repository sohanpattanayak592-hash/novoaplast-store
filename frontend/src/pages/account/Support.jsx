import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { MessageSquare, Plus, Clock, CheckCircle2 } from 'lucide-react'

export default function Support() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [user])

  async function fetchTickets() {
    if (!user) return
    const { data } = await supabase.from('support_tickets').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setTickets(data)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from('support_tickets').insert([{ ...formData, user_id: user.id }])
    if (!error) {
      setShowForm(false)
      setFormData({ subject: '', message: '' })
      fetchTickets()
    }
    setSubmitting(false)
  }

  const getStatusStyle = (status) => {
    switch(status?.toLowerCase()) {
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Support Tickets</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-novo flex items-center gap-2 py-2 px-4 text-sm">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <h2 className="text-white font-medium mb-4">Raise a Support Ticket</h2>
          <input type="text" placeholder="Subject (e.g. Issue with Order #123)" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500" />
          <textarea placeholder="Describe your issue in detail..." required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-dark-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-novo-500 resize-none"></textarea>
          <div className="flex gap-4">
            <button type="submit" disabled={submitting} className="btn-novo py-2 px-6">{submitting ? 'Submitting...' : 'Submit Ticket'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="py-2 px-6 rounded-xl border border-white/10 text-white/60 hover:text-white">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {tickets.length === 0 && !showForm && (
          <div className="text-center py-12 glass-card">
            <MessageSquare className="w-12 h-12 mx-auto text-white/20 mb-4" />
            <p className="text-white/40 mb-2">You don't have any support tickets.</p>
            <p className="text-white/30 text-sm">Need help? Open a new ticket and we'll assist you.</p>
          </div>
        )}
        
        {tickets.map(ticket => (
          <div key={ticket.id} className="glass-card p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-white font-medium text-lg">{ticket.subject}</h3>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${getStatusStyle(ticket.status)}`}>
                {ticket.status?.toLowerCase() === 'resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {ticket.status || 'Open'}
              </div>
            </div>
            <p className="text-white/60 text-sm bg-dark-800/50 p-4 rounded-xl border border-white/5 mb-2">
              {ticket.message}
            </p>
            <p className="text-white/30 text-xs">Submitted on {new Date(ticket.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
