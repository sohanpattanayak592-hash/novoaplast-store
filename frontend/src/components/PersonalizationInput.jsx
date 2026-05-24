import React, { useState } from 'react'
import { Pen, Heart } from 'lucide-react'

export default function PersonalizationInput({ value, onChange, variant = 'spiritual' }) {
  const [focused, setFocused] = useState(false)
  const isSpiritual = variant === 'spiritual'

  return (
    <div className="space-y-3">
      <label className={`flex items-center gap-2 text-sm font-display font-semibold ${isSpiritual ? 'text-saffron-300' : 'text-white/80'}`}>
        <Heart className={`w-4 h-4 ${isSpiritual ? 'text-saffron-400' : 'text-neon-cyan'}`} />
        Add Personal Dedication
      </label>
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused ? (isSpiritual ? 'text-saffron-400' : 'text-neon-cyan') : 'text-white/20'}`}>
          <Pen className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder='e.g., "Dedicated to Maa & Papa"'
          className={`${isSpiritual ? 'input-spiritual' : 'input-default'} pl-11`}
          id="personalization-input"
          maxLength={100}
        />
      </div>
      {value && (
        <div className={`glass-card p-4 ${isSpiritual ? 'glow-ring-gold' : 'glow-ring-neon'}`}>
          <p className="text-xs text-white/40 mb-1 uppercase tracking-wider font-display">Preview</p>
          <p className={`font-spiritual text-lg italic ${isSpiritual ? 'text-saffron-200' : 'text-neon-cyan'}`}>
            "{value}"
          </p>
        </div>
      )}
      <p className="text-white/30 text-xs">{value.length}/100 characters</p>
    </div>
  )
}
