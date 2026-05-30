import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'Custom Posters', path: '/product/custom-posters' },
  { name: 'Spiritual Prints', path: '/product/spiritual-prints' },
  { name: 'Custom Stickers', path: '/product/custom-stickers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { user } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = e.target.elements.q.value
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/80 backdrop-blur-2xl border-b border-white/5 shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Exact Logo Match */}
          <Link to="/" className="flex flex-col items-center justify-center group py-2">
            <h1 className="font-display font-black text-2xl tracking-normal text-novo-500 group-hover:text-novo-400 transition-colors leading-none">
              NOVOPLAST
            </h1>
            <p className="text-[10px] font-medium text-white/80 mt-1">
              recycle.reuse.flaunt.
            </p>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-novo-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-novo-500 to-novo-300 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <Link to="/track" className="p-2 text-white/60 hover:text-white transition-colors" title="Track Order">
                <Truck className="w-5 h-5" />
              </Link>
              <Link to={user ? "/account" : "/login"} className="p-2 text-white/60 hover:text-white transition-colors" title={user ? "My Account" : "Sign In"}>
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
              <input 
                type="text" 
                name="q"
                placeholder="Search..."
                className="bg-dark-800/80 border border-white/10 rounded-full py-1.5 pl-4 pr-8 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50 w-32 focus:w-48 transition-all"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-novo-400">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <Link
              to="/checkout"
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              id="cart-button"
            >
              <ShoppingBag className="w-5 h-5 text-white/70" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-novo-500 rounded-full text-[10px] font-bold text-dark-900 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-800/95 backdrop-blur-2xl border-b border-white/5"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 rounded-xl font-display font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'bg-novo-500/10 text-novo-400'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
                className="pt-4 pb-2 px-4"
              >
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="relative">
                  <input 
                    type="text" 
                    name="q"
                    placeholder="Search..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-novo-400">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
