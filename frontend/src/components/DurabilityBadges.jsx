import React from 'react'
import { Shield, Droplets, Zap, ThumbsUp, Infinity, Sun } from 'lucide-react'

const badges = [
  { icon: Shield, label: 'Non-Tearable', description: 'Cannot be torn or ripped' },
  { icon: Droplets, label: 'Waterproof', description: '100% water resistant' },
  { icon: Sun, label: 'UV Resistant', description: 'No fading in sunlight' },
  { icon: Infinity, label: 'Long-Lasting', description: 'Built to endure decades' },
  { icon: Zap, label: 'Premium HD', description: 'Ultra-high definition' },
  { icon: ThumbsUp, label: 'Eco-Friendly', description: 'Recycled plastic sheets' },
]

export function DurabilityBadges({ variant = 'gold', compact = false }) {
  const isNeon = variant === 'neon'

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {badges.slice(0, 4).map((badge) => (
          <span
            key={badge.label}
            className={isNeon ? 'badge-neon' : 'badge-durable'}
          >
            <badge.icon className="w-3.5 h-3.5" />
            {badge.label}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`glass-card p-5 text-center group hover:scale-[1.03] transition-all duration-300 ${
            isNeon ? 'glow-ring-neon hover:border-neon-cyan/20' : 'glow-ring-gold hover:border-saffron-500/20'
          }`}
        >
          <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
            isNeon
              ? 'bg-neon-cyan/10 group-hover:bg-neon-cyan/20'
              : 'bg-saffron-500/10 group-hover:bg-saffron-500/20'
          } transition-colors`}>
            <badge.icon className={`w-6 h-6 ${isNeon ? 'text-neon-cyan' : 'text-saffron-400'}`} />
          </div>
          <h4 className={`font-display font-semibold text-sm ${isNeon ? 'text-neon-cyan' : 'text-saffron-300'}`}>
            {badge.label}
          </h4>
          <p className="text-white/40 text-xs mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}

export function DurabilityStrip({ variant = 'gold' }) {
  const isNeon = variant === 'neon'
  return (
    <div className={`flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6 py-4 px-4 sm:px-6 rounded-2xl ${
      isNeon ? 'bg-neon-cyan/5 border border-neon-cyan/10' : 'bg-saffron-500/5 border border-saffron-500/10'
    }`}>
      {badges.slice(0, 4).map((badge) => (
        <div key={badge.label} className="flex items-center gap-2">
          <badge.icon className={`w-4 h-4 ${isNeon ? 'text-neon-cyan/70' : 'text-saffron-500/70'}`} />
          <span className={`text-xs font-medium ${isNeon ? 'text-neon-cyan/70' : 'text-saffron-400/70'}`}>
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  )
}
