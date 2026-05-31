import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Users, ArrowLeft, Heart, Search } from 'lucide-react'
import { fanClubsData } from '../data/fanClubsData'
import { products } from '../data/products'
import SEOHead from '../components/SEOHead'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } })
}

export default function FanClubPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const club = fanClubsData[id]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!club) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <SEOHead title="Fan Club Not Found | NOVOPLAST" />
        <h1 className="text-2xl font-bold text-white mb-4">Fan Club not found</h1>
        <Link to="/" className="btn-novo inline-block">Return Home</Link>
      </div>
    )
  }

  // Filter products by tags to find trending and related posters for this club
  const clubProducts = Object.values(products).filter(p => 
    club.featuredPosters.includes(p.id) || 
    p.tags?.some(tag => club.tags.includes(tag))
  )

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <SEOHead 
        title={`${club.name} Posters & Merchandise | NOVOPLAST`} 
        description={`Official ${club.name} fan club collection. Shop the best posters, moments, and legends.`}
        image={club.banner}
      />
      
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img 
            src={club.banner} 
            alt={club.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent" />
          <div className="absolute inset-0" style={{ backgroundColor: `${club.primaryColor}20` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-widest uppercase mb-4">
              {club.sport} • {club.league}
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              {club.name}
            </h1>
            <p className="text-white/80 max-w-2xl text-lg mb-8 leading-relaxed">
              {club.history}
            </p>
            <button 
              className="px-8 py-4 rounded-xl font-bold text-white transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: club.primaryColor }}
            >
              <Heart className="w-5 h-5" /> I Support {club.shortName}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-24">
        
        {/* Trophy Cabinet & Stats */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="text-novo-400 w-8 h-8" />
            <h2 className="font-display text-3xl font-bold text-white">Trophy Cabinet</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.trophies.map((trophy, i) => (
              <div key={i} className="glass-card p-6 border-l-4" style={{ borderColor: club.primaryColor }}>
                <h3 className="font-bold text-xl text-white mb-2">{trophy.name}</h3>
                <p className="text-white/60 font-mono text-sm">{trophy.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Club Legends */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-novo-400 w-8 h-8" />
            <h2 className="font-display text-3xl font-bold text-white">Club Legends</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {club.legends.map((legend, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img 
                  src={legend.image} 
                  alt={legend.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{legend.name}</h3>
                  <p className="text-white/60 text-sm">{legend.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Posters */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold text-white">Fan Favorites</h2>
            <Link to="/search" className="text-novo-400 hover:text-novo-300 text-sm font-medium flex items-center gap-2">
              View All <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clubProducts.slice(0, 4).map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group relative block bg-dark-900 rounded-2xl overflow-hidden border border-white/5 hover:border-novo-400/50 transition-colors">
                <div className="aspect-[2/3] overflow-hidden bg-dark-800">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white tracking-widest uppercase">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium truncate mb-1">{product.name}</h3>
                  <div className="text-novo-400 font-bold">{product.currency || '₹'}{product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
