import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Mail, Phone, Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-saffron-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-700 flex items-center justify-center">
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
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-saffron-400 mb-5">Products</h4>
            <ul className="space-y-3">
              {[
                { name: 'Custom Posters', path: '/product/custom-posters' },
                { name: 'Spiritual Prints', path: '/product/spiritual-prints' },
                { name: 'Custom Stickers', path: '/product/custom-stickers' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white/40 hover:text-saffron-300 text-sm transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-saffron-400 mb-5">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Process', 'Sustainability', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-saffron-300 text-sm transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-saffron-400 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-saffron-500/60" />
                hello@novoplast.in
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-saffron-500/60" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-saffron-500/60" />
                New Delhi, India
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-saffron-500/10 hover:border-saffron-500/30 transition-all">
                <Instagram className="w-4 h-4 text-white/50" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2026 NOVOPLAST. All rights reserved. A product of EVERRLEAF.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
