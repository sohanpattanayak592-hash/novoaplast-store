import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Play, Plus, Info } from 'lucide-react'
import { 
  collectionsData, 
  getTrendingCollections, 
  getRecentlyAdded, 
  getDailyFeatured, 
  getAllGenres,
  getCollectionsByGenre
} from '../data/collectionsData'
import { useEngagement } from '../context/EngagementContext'

// Helper component for horizontal scrolling row
const CollectionRow = ({ title, collections }) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 50 : scrollLeft + clientWidth - 50
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  if (!collections || collections.length === 0) return null

  return (
    <div className="mb-10 relative group">
      <h3 className="text-white font-display font-semibold text-xl mb-4 px-4 md:px-12">{title}</h3>
      
      {/* Scroll Controls */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-[50%] -translate-y-[50%] z-40 bg-dark-900/80 p-3 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      <div 
        ref={scrollRef} 
        className="flex gap-4 overflow-x-auto px-4 md:px-12 pb-8 pt-2 hide-scrollbar snap-x scroll-smooth"
      >
        {collections.map(collection => (
          <Link 
            to={`/collections/${collection.id}`} 
            key={collection.id}
            className="relative flex-none w-[280px] md:w-[320px] aspect-[16/9] rounded-xl overflow-hidden glass-card transition-all duration-300 hover:scale-105 hover:z-30 hover:border-novo-500/50 hover:shadow-[0_0_30px_rgba(139,204,99,0.3)] snap-start group/card"
          >
            <img 
              src={collection.thumbnail} 
              alt={collection.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/40 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h4 className="text-white font-display font-bold text-lg">{collection.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-novo-400 text-xs">{collection.posters.length} Posters</span>
                <span className="text-white/30 text-[10px]">&bull;</span>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">A4, A3, A2, A1 Sizes</span>
              </div>
            </div>
            
            {/* Hover Play Button (Netflix Style) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity bg-dark-900/40">
               <div className="w-12 h-12 rounded-full bg-novo-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,204,99,0.5)]">
                  <Play className="w-5 h-5 text-dark-950 fill-dark-950 ml-1" />
               </div>
            </div>
          </Link>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-[50%] -translate-y-[50%] z-40 bg-dark-900/80 p-3 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  )
}

export default function CollectionsHub() {
  const featured = getDailyFeatured()
  const trending = getTrendingCollections()
  const newAdditions = getRecentlyAdded()
  const genres = getAllGenres()

  return (
    <div className="min-h-screen pb-20 overflow-hidden">
      
      {/* Featured Hero (Netflix Main Showcase Style) */}
      <div className="relative h-[70vh] md:h-[85vh] w-full mb-12">
        <img 
          src={featured.thumbnail} 
          alt={featured.title} 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays to blend into the black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/40 to-transparent" />
        
        <div className="absolute bottom-[10%] left-0 w-full px-4 md:px-12 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-novo-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              <span className="inline-block w-2 h-2 rounded-full bg-novo-500 animate-pulse mr-2"></span>
              Trending #1 Today
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-tight shadow-black drop-shadow-2xl">
              {featured.title}
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-xl text-shadow">
              Discover the most sought-after {featured.title.toLowerCase()} posters this week. 
              Indestructible, waterproof, and absolutely stunning.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={`/collections/${featured.id}`} className="btn-novo flex items-center gap-2 px-8 py-3 bg-white text-dark-950 hover:bg-white/90 font-bold rounded-md">
                <Play className="w-5 h-5 fill-dark-950" /> Explore Collection
              </Link>
              <button className="flex items-center gap-2 px-8 py-3 bg-dark-800/60 backdrop-blur-md text-white border border-white/20 hover:bg-dark-800/80 font-bold rounded-md transition-colors">
                <Info className="w-5 h-5" /> More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Scrolling Rows */}
      <div className="-mt-24 relative z-20">
        <CollectionRow title="🔥 Trending Now" collections={trending} />
        
        {/* Personalized Row based on engagement context (Mocking it for now) */}
        <CollectionRow title="✨ Recommended For You" collections={[...collectionsData].sort(() => 0.5 - Math.random()).slice(0, 10)} />
        
        <CollectionRow title="🆕 Recently Added" collections={newAdditions} />
        
        {/* Render a row for each major genre */}
        {genres.map(genre => {
          const collections = getCollectionsByGenre(genre.id)
          if (collections.length === 0) return null
          return (
            <CollectionRow key={genre.id} title={genre.name} collections={collections} />
          )
        })}
      </div>

      {/* Custom styles to hide scrollbar in sliders but allow scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
