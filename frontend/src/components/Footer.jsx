import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Mail, Phone, Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-novo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-novo-500 to-novo-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-dark-900" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg tracking-wider">NOVOPLAST</h3>
                <p className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">Non-Tearable Prints</p>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium non-tearable, waterproof plastic prints that last forever. 
              From custom posters to spiritual art — we print what endures.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-novo-400 mb-5">Products</h4>
            <ul className="space-y-3">
              {[
                { name: 'Custom Posters', path: '/product/custom-posters' },
                { name: 'Spiritual Prints', path: '/product/spiritual-prints' },
                { name: 'Custom Stickers', path: '/product/custom-stickers' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white/40 hover:text-novo-300 text-sm transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/40 hover:text-novo-400 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-white/40 hover:text-novo-400 transition-colors">FAQ</Link></li>
              <li><Link to="/collections" className="text-white/40 hover:text-novo-400 transition-colors">Collections</Link></li>
              <li><Link to="/search" className="text-white/40 hover:text-novo-400 transition-colors">Search</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li><a href="mailto:hello@novoplast.in" className="text-white/40 hover:text-novo-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> hello@novoplast.in</a></li>
              <li><a href="tel:+919876543210" className="text-white/40 hover:text-novo-400 transition-colors flex items-center gap-2"><Phone className="w-4 h-4"/> +91 98765 43210</a></li>
              <li className="text-white/40 flex items-center gap-2"><MapPin className="w-4 h-4"/> New Delhi, India</li>
              <li className="pt-2"><a href="https://instagram.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-novo-400 hover:bg-white/10 transition-colors"><Instagram className="w-5 h-5"/></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} NOVOPLAST. A product of EVERRLEAF.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-white/30 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/30 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/refund-policy" className="text-white/30 hover:text-white transition-colors">Refund Policy</Link>
            <Link to="/shipping-policy" className="text-white/30 hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
