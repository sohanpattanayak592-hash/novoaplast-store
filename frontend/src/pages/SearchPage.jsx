import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { collectionsData } from '../data/collectionsData'
import { fanClubsData } from '../data/fanClubsData'
import { Heart, Download, ShoppingBag, Tag, Search, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useEngagement } from '../context/EngagementContext'
import PosterImage from '../components/PosterImage'
import { motion } from 'framer-motion'
import { POSTER_SIZES, CURRENCY } from '../data/pricingConfig'
import SEOHead from '../components/SEOHead'

const POPULAR_TAGS = ['RCB', 'Messi', 'Anime', 'Football', 'Motivation', 'Gaming', 'Cars']

export default function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search).get('q') || ''
  
  const [collectionResults, setCollectionResults] = useState([])
  const [posterResults, setPosterResults] = useState([])
  const [fanClubResults, setFanClubResults] = useState([])
  
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useEngagement()

  useEffect(() => {
    if (!query.trim()) {
      setCollectionResults([])
      setPosterResults([])
      setFanClubResults([])
      return
    }

    const q = query.toLowerCase()
    
    // Search Fan Clubs
    const fResults = Object.values(fanClubsData).filter(fc =>
      fc.name.toLowerCase().includes(q) ||
      fc.shortName.toLowerCase().includes(q) ||
      fc.tags.some(tag => tag.toLowerCase().includes(q))
    )
    setFanClubResults(fResults)

    // Search Collections (Prioritize higher priority)
    const cResults = collectionsData.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.genreName.toLowerCase().includes(q) ||
      (c.tags && c.tags.some(tag => tag.toLowerCase().includes(q)))
    ).sort((a, b) => (a.priority || 5) - (b.priority || 5))
    
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

  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`)
  }

  const getDefaultPosterCartItem = (poster) => {
    const defaultSize = POSTER_SIZES[0] // A4
    return {
      productId: poster.id,
      productName: poster.title,
      image: poster.image,
      currency: CURRENCY,
      variant: 'standard',
      category: 'posters',
      selectedSize: `${defaultSize.label} - ${defaultSize.dimensions}`,
      sizeId: defaultSize.id,
      selectedQty: '1',
      totalPrice: defaultSize.price,
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-6">
          {query ? (
            <>Search Results for <span className="text-novo-400">"{query}"</span></>
          ) : (
            'Discover Premium Posters'
          )}
        </h1>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-1/2 mb-8">
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search collections, themes, or posters..."
            className="w-full bg-dark-800 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50 text-lg transition-colors"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-novo-500 hover:text-novo-400">
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-white/40 text-sm flex items-center gap-1"><Tag className="w-4 h-4" /> Popular:</span>
          {POPULAR_TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                query.toLowerCase() === tag.toLowerCase() 
                  ? 'bg-novo-500 text-dark-950 font-bold shadow-[0_0_15px_rgba(139,204,99,0.3)]' 
                  : 'bg-dark-800 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {!query && (
        <div className="py-20 text-center">
          <div className="w-24 h-24 bg-novo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-novo-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">What are you looking for?</h2>
          <p className="text-white/50 max-w-md mx-auto">Explore our huge collection of indestructible posters. Type a keyword above or pick a popular tag to get started.</p>
        </div>
      )}

      {query && collectionResults.length === 0 && posterResults.length === 0 && fanClubResults.length === 0 && (
        <div className="py-20 text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white/30" />
          </div>
          <p className="text-white text-2xl font-display font-bold mb-4">No results found for "{query}"</p>
          <p className="text-white/50 mb-8">
            We couldn't find exactly what you were looking for. But don't worry, you can easily print your own design!
          </p>
          <Link 
            to="/product/custom-posters"
            className="inline-flex items-center gap-2 px-8 py-4 bg-novo-600 hover:bg-novo-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-novo-900/20"
          >
            Create Custom Poster
          </Link>
        </div>
      )}

      {fanClubResults.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-blue-500 w-6 h-6" /> Fan Clubs ({fanClubResults.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fanClubResults.map(club => (
              <Link to={`/fanclub/${club.id}`} key={club.id} className="group relative rounded-2xl overflow-hidden glass-card aspect-video block">
                <PosterImage src={club.banner} alt={club.name} className="opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <div className="absolute inset-0" style={{ backgroundColor: `${club.primaryColor}20` }} />
                <div className="absolute bottom-4 left-4">
                  <span className="badge-durable mb-2 inline-block text-[10px]">{club.sport}</span>
                  <h3 className="text-xl font-display font-bold text-white">{club.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {collectionResults.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Collections ({collectionResults.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collectionResults.map(c => (
              <Link to={`/collections/${c.id}`} key={c.id} className="group rounded-xl overflow-hidden relative aspect-video glass-card">
                <PosterImage src={c.thumbnail} alt={c.title} className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
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
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card virtualized-card cursor-pointer"
                >
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(getDefaultPosterCartItem(poster));
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
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(getDefaultPosterCartItem(poster));
                            navigate('/checkout');
                          }}
                          className="text-xs font-semibold bg-novo-500 text-dark-950 px-4 py-2 rounded-full hover:bg-novo-400 shadow-[0_0_15px_rgba(139,204,99,0.3)] transition-all"
                        >
                          Buy Now
                        </button>
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
