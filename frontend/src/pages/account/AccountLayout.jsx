import React from 'react'
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, Package, MapPin, Heart, MessageSquare, LogOut, Settings } from 'lucide-react'

export default function AccountLayout() {
  const { user, signOut, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="min-h-screen pt-24 text-center text-white">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  const navItems = [
    { name: 'Dashboard', path: '/account', icon: User, exact: true },
    { name: 'Order History', path: '/account/orders', icon: Package },
    { name: 'Addresses', path: '/account/addresses', icon: MapPin },
    { name: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { name: 'Support Tickets', path: '/account/support', icon: MessageSquare },
    { name: 'Profile Settings', path: '/account/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass-card glow-ring-novo p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-white mb-6">My Account</h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path)
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-novo-500/20 text-novo-400 border border-novo-500/30' 
                        : 'text-white/60 hover:text-white hover:bg-dark-700/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              
              <button 
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
