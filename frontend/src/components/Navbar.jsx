import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Custom Posters', path: '/product/custom-posters' },
  { name: 'Spiritual Prints', path: '/product/spiritual-prints' },
  { name: 'Custom Stickers', path: '/product/custom-stickers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-700 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-dark-900" />
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-700 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-wider text-white group-hover:text-saffron-300 transition-colors">
                NOVOPLAST
              </h1>
              <p className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">
                Non-Tearable Prints
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-saffron-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-saffron-500 to-saffron-300 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/checkout"
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              id="cart-button"
            >
              <ShoppingBag className="w-5 h-5 text-white/70" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-saffron-500 rounded-full text-[10px] font-bold text-dark-900 flex items-center justify-center">
                0
              </span>
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
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-4 rounded-xl text-base font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-saffron-500/10 text-saffron-400'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
