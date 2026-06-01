import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, Truck, ChevronDown, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getAllGenres } from '../data/collectionsData'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/collections', hasDropdown: true },
  { name: 'Custom Posters', path: '/product/custom-posters' },
  { name: 'Divine & Spiritual', path: '/collections/col_26' },
  { name: 'Custom Stickers', path: '/product/custom-stickers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { user } = useAuth()
  const dropdownRef = useRef(null)
  
  const genres = getAllGenres()

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
    setCollectionsDropdownOpen(false)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCollectionsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownRef])

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
              <div key={link.path} className="relative" ref={link.hasDropdown ? dropdownRef : null}>
                <Link
                  to={link.path}
                  onMouseEnter={() => link.hasDropdown && setCollectionsDropdownOpen(true)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path
                      ? 'text-novo-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${collectionsDropdownOpen ? 'rotate-180' : ''}`} />}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-novo-500 to-novo-300 rounded-full"
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {collectionsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={() => setCollectionsDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-[400px] bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl grid grid-cols-2 gap-4"
                      >
                        {genres.map(genre => (
                          <Link 
                            key={genre.id} 
                            to={`/collections?genre=${genre.id}`}
                            className="block p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            <h4 className="font-display font-bold text-white group-hover/item:text-novo-400 transition-colors text-sm">{genre.name}</h4>
                          </Link>
                        ))}
                        <div className="col-span-2 pt-4 mt-2 border-t border-white/5">
                           <Link to="/collections" className="text-novo-400 text-sm font-medium hover:text-novo-300 flex items-center gap-1">
                             View All Collections <ArrowRight className="w-3 h-3" />
                           </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
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
            <form onSubmit={handleSearch} className="hidden sm:flex items-center relative group">
              <input 
                type="text" 
                name="q"
                placeholder="Search posters..."
                className="bg-dark-800/80 border border-white/10 rounded-full py-1.5 pl-4 pr-8 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50 w-32 focus:w-56 transition-all"
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
            className="lg:hidden bg-dark-800/95 backdrop-blur-2xl border-b border-white/5 max-h-[80vh] overflow-y-auto"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0 }}
                className="pb-4 mb-2 border-b border-white/5 flex gap-2"
              >
                 <Link to="/account" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-white/80">
                   <User className="w-4 h-4"/> Account
                 </Link>
                 <Link to="/track" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl text-white/80">
                   <Truck className="w-4 h-4"/> Track
                 </Link>
              </motion.div>

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
                  {link.hasDropdown && (
                    <div className="pl-8 pr-4 py-2 space-y-2 border-l-2 border-white/5 ml-6 my-2">
                       {genres.map(genre => (
                         <Link 
                           key={genre.id} 
                           to={`/collections?genre=${genre.id}`}
                           onClick={() => setMobileOpen(false)}
                           className="block py-2 text-sm text-white/50 hover:text-novo-400"
                         >
                           {genre.name}
                         </Link>
                       ))}
                    </div>
                  )}
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
                    placeholder="Search posters..."
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
