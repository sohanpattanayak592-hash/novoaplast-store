import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Search, ArrowLeft, Download, Plus, Check } from 'lucide-react'
import { collectionsData, getSimilarCollections } from '../data/collectionsData'
import { useEngagement } from '../context/EngagementContext'

export default function CollectionDetails() {
  const { id } = useParams()
  const collection = collectionsData.find(c => c.id === id)
  
  const { isFavorite, toggleFavorite, isFollowed, toggleFollowCollection } = useEngagement()
  
  const [displayedPosters, setDisplayedPosters] = useState([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const observer = useRef()

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
                >
                  <img src={poster.image} alt={poster.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
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
                        <Link to={`/product/custom-posters`} className="text-xs font-semibold bg-white text-dark-950 px-3 py-1.5 rounded-full hover:bg-white/90">
                          View Details
                        </Link>
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
