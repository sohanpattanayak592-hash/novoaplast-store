import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { collectionsData } from '../data/collectionsData'
import { Heart, Download, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useEngagement } from '../context/EngagementContext'
import { motion } from 'framer-motion'

export default function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search).get('q') || ''
  
  const [collectionResults, setCollectionResults] = useState([])
  const [posterResults, setPosterResults] = useState([])
  
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useEngagement()

  useEffect(() => {
    if (!query.trim()) {
      setCollectionResults([])
      setPosterResults([])
      return
    }

    const q = query.toLowerCase()
    
    // Search Collections
    const cResults = collectionsData.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.genreName.toLowerCase().includes(q)
    )
    setCollectionResults(cResults)

    // Search Posters across all collections
    const pResults = []
    collectionsData.forEach(c => {
      c.posters.forEach(p => {
        if (
          p.title.toLowerCase().includes(q) || 
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
        ) {
          pResults.push({ ...p, collectionId: c.id, collectionTitle: c.title })
        }
      })
    })
    setPosterResults(pResults)
    
  }, [query])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const input = form.elements.q.value
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input)}`)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-6">
          Search Results for <span className="text-novo-400">"{query}"</span>
        </h1>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-1/2">
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search collections, themes, or posters..."
            className="w-full bg-dark-800 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50 text-lg"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-novo-500 hover:text-novo-400">
            Search
          </button>
        </form>
      </div>

      {!query && (
        <p className="text-white/50 text-lg">Type something above to start searching.</p>
      )}

      {query && collectionResults.length === 0 && posterResults.length === 0 && (
        <p className="text-white/50 text-lg">No results found. Try a different keyword like "Football", "Motivation", or "Batman".</p>
      )}

      {collectionResults.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Collections ({collectionResults.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collectionResults.map(c => (
              <Link to={`/collections/${c.id}`} key={c.id} className="group rounded-xl overflow-hidden relative aspect-video glass-card">
                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/20 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-display font-bold">{c.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {posterResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Posters ({posterResults.length})</h2>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {posterResults.map(poster => {
              const saved = isFavorite(poster.id)
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={poster.id}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card cursor-pointer"
                >
                  <img src={poster.image} alt={poster.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          const item = {
                            productId: poster.id,
                            productName: poster.title,
                            image: poster.image,
                            currency: '₹',
                            variant: 'standard',
                            selectedSize: 'A4 - 8.2" x 11.7"',
                            selectedQty: '1',
                            totalPrice: poster.price || 299,
                          }
                          addToCart(item);
                          alert('Added to Cart!');
                        }}
                        className="p-2.5 rounded-full backdrop-blur-md transition-all bg-dark-900/60 text-white hover:bg-novo-500 hover:text-dark-950"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>

                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(poster.id);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                          saved ? 'bg-novo-500/90 text-dark-950 shadow-[0_0_15px_rgba(139,204,99,0.5)]' : 'bg-dark-900/60 text-white hover:bg-dark-900/90'
                        }`}
                      >
                        <Heart className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold font-display truncate mb-1">{poster.title}</h4>
                      <div className="flex items-center gap-3">
                        <Link to={`/collections/${poster.collectionId}`} className="text-xs font-semibold bg-white text-dark-950 px-3 py-1.5 rounded-full hover:bg-white/90">
                          {poster.collectionTitle}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
