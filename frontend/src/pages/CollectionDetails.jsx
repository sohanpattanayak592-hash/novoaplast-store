import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Search, ArrowLeft, Download, Plus, Check, ShoppingBag, X } from 'lucide-react'
import { collectionsData, getSimilarCollections } from '../data/collectionsData'
import { POSTER_SIZES, CURRENCY } from '../data/pricingConfig'
import { useEngagement } from '../context/EngagementContext'
import { useCart } from '../context/CartContext'
import PosterImage from '../components/PosterImage'

// Modal Component for Size Selection
const SizeSelectorModal = ({ poster, isOpen, onClose, onAdd, onBuy }) => {
  const [selectedSizeId, setSelectedSizeId] = useState('a4')

  if (!isOpen || !poster) return null

  const handleAdd = () => {
    const size = POSTER_SIZES.find(s => s.id === selectedSizeId)
    onAdd(poster, size)
    onClose()
  }

  const handleBuy = () => {
    const size = POSTER_SIZES.find(s => s.id === selectedSizeId)
    onBuy(poster, size)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl glass-card border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-dark-900/50 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Poster Preview */}
        <div className="w-full md:w-1/2 bg-dark-900 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5">
           <img src={poster.image} alt={poster.title} className="max-w-full max-h-[40vh] md:max-h-[60vh] object-contain shadow-2xl rounded" />
        </div>

        {/* Size Selection */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="mb-2">
            {poster.badge && <span className="badge-novo mb-2 inline-block px-2 py-0.5 text-[10px]">{poster.badge}</span>}
            <h3 className="text-2xl font-display font-bold text-white">{poster.title}</h3>
          </div>
          <p className="text-white/50 text-sm mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-novo-500" /> Premium Waterproof Print
          </p>

          <div className="flex-1">
            <h4 className="text-white/80 font-medium mb-3">Select Size</h4>
            <div className="space-y-3">
              {POSTER_SIZES.map(size => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSizeId(size.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selectedSizeId === size.id 
                    ? 'border-novo-500 bg-novo-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                    : 'border-white/10 bg-dark-800/50 hover:border-white/20 hover:bg-dark-800'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className={`font-bold ${selectedSizeId === size.id ? 'text-novo-400' : 'text-white'}`}>{size.label}</span>
                    <span className="text-white/40 text-xs mt-0.5">{size.dimensions}</span>
                  </div>
                  <span className={`font-display font-bold text-lg ${selectedSizeId === size.id ? 'text-white' : 'text-white/80'}`}>
                    {CURRENCY}{size.price}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center">
              Bundle Offer: Add 3 posters to cart for 15% OFF!
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={handleAdd} className="flex-1 btn-outline-novo flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button onClick={handleBuy} className="flex-1 btn-novo flex items-center justify-center">
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
const Shield = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>


export default function CollectionDetails() {
  const { id } = useParams()
  const collection = collectionsData.find(c => c.id === id)
  
  const { isFavorite, toggleFavorite, isFollowed, toggleFollowCollection } = useEngagement()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  
  const [displayedPosters, setDisplayedPosters] = useState([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const observer = useRef()

  // Modal State
  const [selectedPoster, setSelectedPoster] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Reset when collection changes
  useEffect(() => {
    if (collection) {
      setDisplayedPosters(collection.posters.slice(0, 10)) // initial load
      setPage(1)
      setSearchQuery('')
    }
  }, [id, collection])

  // Infinite Scroll simulation
  const loadMore = useCallback(() => {
    if (!collection) return
    setLoading(true)
    setTimeout(() => {
      const filtered = collection.posters.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      const nextBatch = filtered.slice(page * 10, (page + 1) * 10)
      if (nextBatch.length > 0) {
        setDisplayedPosters(prev => [...prev, ...nextBatch])
        setPage(p => p + 1)
      }
      setLoading(false)
    }, 800) // fake network delay
  }, [collection, page, searchQuery])

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, loadMore])

  // Handle Search
  useEffect(() => {
    if (!collection) return
    const filtered = collection.posters.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setDisplayedPosters(filtered.slice(0, 10))
    setPage(1)
  }, [searchQuery, collection])

  const openSizeSelector = (poster) => {
    setSelectedPoster(poster)
    setIsModalOpen(true)
  }

  const handleAddToCart = (poster, size) => {
    const item = {
      productId: poster.id,
      productName: poster.title,
      image: poster.image,
      currency: CURRENCY,
      variant: 'collection-poster',
      selectedSize: `${size.label} - ${size.dimensions}`,
      sizeId: size.id,
      selectedQty: '1',
      totalPrice: size.price,
      collectionId: collection.id
    }
    addToCart(item)
    // could show a toast here
  }

  const handleBuyNow = (poster, size) => {
    handleAddToCart(poster, size)
    navigate('/checkout')
  }

  if (!collection) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <h1 className="text-3xl text-white font-display">Collection Not Found</h1>
        <Link to="/collections" className="btn-novo mt-8 inline-block">Back to Collections</Link>
      </div>
    )
  }

  const followed = isFollowed(collection.id)
  const similarCollections = getSimilarCollections(collection.id)

  return (
    <div className="min-h-screen pb-20">
      
      <AnimatePresence>
        {isModalOpen && (
          <SizeSelectorModal 
            poster={selectedPoster} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddToCart}
            onBuy={handleBuyNow}
          />
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="relative h-[40vh] w-full flex items-end">
        <img src={collection.thumbnail} alt={collection.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/collections" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{collection.title}</h1>
            <p className="text-novo-400 font-medium">{collection.posters.length} Premium Posters in {collection.genreName}</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => toggleFollowCollection(collection.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${
                followed 
                ? 'bg-dark-800 text-white border border-white/20 hover:bg-dark-700' 
                : 'bg-novo-500 text-dark-950 hover:bg-novo-400'
              }`}
            >
              {followed ? <><Check className="w-4 h-4" /> Following</> : <><Plus className="w-4 h-4" /> Follow</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder={`Search in ${collection.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-novo-500/50"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {['All', 'Trending', 'New', 'Most Downloaded'].map(tag => (
              <button key={tag} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {displayedPosters.map((poster, index) => {
              const saved = isFavorite(poster.id)
              const isLast = index === displayedPosters.length - 1
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={poster.id}
                  ref={isLast ? lastElementRef : null}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card cursor-pointer"
                  onClick={() => openSizeSelector(poster)}
                >
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    {poster.badge && (
                      <span className="bg-dark-900/80 backdrop-blur border border-novo-500/30 text-novo-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.badge}
                      </span>
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openSizeSelector(poster)
                        }}
                        className="p-2.5 rounded-full backdrop-blur-md transition-all bg-dark-900/60 text-white hover:bg-novo-500 hover:text-dark-950"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(poster.id);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                          saved ? 'bg-novo-500/90 text-dark-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-dark-900/60 text-white hover:bg-dark-900/90'
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
                            e.stopPropagation();
                            openSizeSelector(poster)
                          }}
                          className="text-xs font-semibold bg-novo-500 text-dark-950 px-4 py-2 rounded-full hover:bg-novo-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                        >
                          Select Size
                        </button>
                        <span className="text-white/60 text-xs flex items-center gap-1">
                          <Download className="w-3 h-3" /> {poster.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        {loading && (
          <div className="flex justify-center mt-10 mb-10">
            <div className="w-8 h-8 border-4 border-novo-500/30 border-t-novo-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Similar Collections (Bottom Row) */}
        {similarCollections.length > 0 && (
          <div className="mt-24 border-t border-white/5 pt-12">
            <h3 className="text-2xl font-display font-bold text-white mb-6">More like {collection.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarCollections.map(sim => (
                <Link to={`/collections/${sim.id}`} key={sim.id} className="group rounded-xl overflow-hidden relative aspect-video glass-card">
                  <img src={sim.thumbnail} alt={sim.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-display font-bold">{sim.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
