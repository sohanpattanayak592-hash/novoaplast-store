import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Droplets, Sun, Infinity, Star, Sparkles, Box, Truck, ShoppingCart } from 'lucide-react'
import { products } from '../data/products'
import { getTrendingCollections, getBestSellers, getAllGenres, collectionsData, getCollectionsByGenre } from '../data/collectionsData'
import { fanClubsData } from '../data/fanClubsData'
import PosterImage from '../components/PosterImage'
import SEOHead from '../components/SEOHead'
import CollectionsMarquee from '../components/CollectionsMarquee'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
}

export default function HomePage() {
  const productList = Object.values(products)
  const trendingCollections = getTrendingCollections()
  const bestSellers = getBestSellers()
  const genres = getAllGenres()

  return (
    <div className="relative">
      <SEOHead 
        title="NOVOPLAST — India's Premium Poster Brand | RCB 2026 Champions" 
        description="Shop the exclusive RCB IPL 2026 Champions collection, Virat Kohli fan art, and premium waterproof posters starting at ₹199. Aesthetic room decor delivered across India."
      />

      {/* ===== DYNAMIC COLLECTIONS MARQUEE ===== */}
      <CollectionsMarquee />

      {/* ===== 🔥 TRENDING COLLECTIONS (Horizontal Scroll) ===== */}
      <section className="py-20 px-4 bg-dark-950 border-y border-white/5" id="trending-collections">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-orange-500">🔥</span> Trending Right Now
            </h2>
            <Link to="/collections" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {trendingCollections.map(collection => (
              <Link 
                key={collection.id} 
                to={`/collections/${collection.id}`}
                className="snap-start shrink-0 w-[280px] md:w-[320px] group block"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden glass-card mb-4">
                  <img 
                    src={collection.thumbnail} 
                    alt={collection.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/20 to-transparent opacity-80" />
                  <div className="absolute top-2 left-2">
                    <span className="badge-durable text-[10px] py-0.5 px-2 bg-dark-900/80 backdrop-blur border border-novo-500/30 text-novo-400">
                      {collection.genreName}
                    </span>
                  </div>
                  {collection.priority === 1 && (
                    <div className="absolute top-2 right-2">
                      <span className="badge-neon text-[10px] py-0.5 px-2 bg-red-500/20 text-red-400 border border-red-500/30">
                        Champions
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-novo-400 transition-colors">{collection.title}</h3>
                <p className="text-white/40 text-sm mt-1">{collection.posters.length} Posters</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 🏆 IPL 2026 CHAMPIONS CAROUSEL ===== */}
      <section className="py-20 px-4 border-y border-white/5" id="champions-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-yellow-500">🏆</span> RCB Champions 2026
            </h2>
            <Link to="/collections/col_1" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_1')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/col_1" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-red-500/20 backdrop-blur text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      CHAMPIONS
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      {/* ===== ✨ DIVINE & SPIRITUAL COLLECTION CARD ===== */}
      <section className="py-20 px-4 bg-dark-950 border-y border-white/5" id="divine-collection">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-dark-900 border border-white/5 rounded-3xl p-6 md:p-12 overflow-hidden relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-novo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex-1 z-10">
              <span className="badge-neon text-[10px] py-1 px-3 bg-novo-500/20 text-novo-400 border border-novo-500/30 mb-4 inline-block">
                NEW COLLECTION
              </span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4 leading-tight">
                Divine & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-novo-400 to-novo-600">Spiritual</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                Premium divine and spiritual posters featuring gods, temples, sacred symbols, meditation themes, devotional artwork, and inspirational spiritual wall decor.
              </p>
              
              <div className="flex items-center gap-6">
                <Link to="/collections/col_26" className="btn-novo flex items-center gap-2">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white">
                    {collectionsData.find(c => c.id === 'col_26')?.posters.length || 47}
                  </span>
                  <span className="text-white/40 text-sm uppercase tracking-wider font-bold">Premium Posters</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={collectionsData.find(c => c.id === 'col_26')?.thumbnail || "/curated/WhatsApp Image 2026-06-01 at 5.14.30 PM.jpeg"} 
                  alt="Divine & Spiritual Collection" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </section>
\n      {/* ===== 👑 VIRAT KOHLI CAROUSEL ===== */}
      <section className="py-20 px-4 bg-dark-950 border-y border-white/5" id="virat-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-orange-500">👑</span> King Kohli Collection
            </h2>
            <Link to="/collections/col_10" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_10')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/col_10" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      VIRAT KOHLI
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ❤️ RCB FAN FAVORITES CAROUSEL ===== */}
      <section className="py-20 px-4 border-y border-white/5" id="rcb-fan-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-red-500">❤️</span> RCB Fan Favorites
            </h2>
            <Link to="/collections/col_16" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_16')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/col_16" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      FAN CLUB
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ===== 🛡️ OFFICIAL FAN CLUBS ===== */}
      <section className="py-20 px-4 bg-dark-900" id="fan-clubs">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-blue-500">🛡️</span> Official Fan Clubs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(fanClubsData).map(club => (
              <Link 
                key={club.id} 
                to={`/fanclub/${club.id}`}
                className="group block relative rounded-2xl overflow-hidden glass-card border border-white/5 hover:border-novo-500/50 transition-colors h-[200px]"
              >
                <img 
                  src={club.banner} 
                  alt={club.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <div className="absolute inset-0" style={{ backgroundColor: `${club.primaryColor}20` }} />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block px-2 py-1 mb-2 rounded bg-black/50 backdrop-blur border border-white/10 text-[10px] font-bold text-white tracking-widest uppercase">
                    {club.sport}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white leading-tight">{club.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      {/* ===== RECENTLY ADDED ===== */}
      <section className="py-24 px-4 bg-dark-900" id="recently-added">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Fresh Drops</span>
            <h2 className="section-heading text-white mt-2">
              Recently <span className="text-novo-gradient">Added</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">The newest arrivals in our premium poster collection.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collectionsData.flatMap(c => c.posters.map(p => ({...p, collectionTitle: c.title, collectionId: c.id}))).filter(p => p.isNew).slice(0, 8).map((poster, i) => (
              <motion.div key={poster.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/collections/${poster.collectionId}`} className="block glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.collectionTitle}
                      </span>
                      <span className="bg-novo-500/20 backdrop-blur text-novo-400 border border-novo-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        NEW
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{poster.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-novo-400 font-bold">₹{poster.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR THIS WEEK ===== */}
      <section className="py-24 px-4 border-y border-white/5" id="popular-this-week">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Trending High</span>
            <h2 className="section-heading text-white mt-2">
              Popular <span className="text-novo-gradient">This Week</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Based on the highest views and orders across India.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collectionsData.flatMap(c => c.posters.map(p => ({...p, collectionTitle: c.title, collectionId: c.id}))).sort((a, b) => b.downloads - a.downloads).slice(0, 8).map((poster, i) => (
              <motion.div key={poster.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/collections/${poster.collectionId}`} className="block glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.collectionTitle}
                      </span>
                      <span className="bg-orange-500/20 backdrop-blur text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {Math.floor(poster.downloads / 100) * 100}+ SOLD
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{poster.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-novo-400 font-bold">₹{poster.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* ===== BESTSELLERS GRID ===== */}
      <section className="py-24 px-4" id="bestsellers">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Top Rated</span>
            <h2 className="section-heading text-white mt-2">
              Our <span className="text-novo-gradient">Bestsellers</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">The most loved premium posters by our community.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((poster, i) => (
              <motion.div key={poster.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/collections/${poster.collectionId}`} className="block glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.collectionTitle}
                      </span>
                      {poster.badge && (
                        <span className="bg-novo-500/20 backdrop-blur text-novo-400 border border-novo-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {poster.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{poster.title}</h3>
                    <p className="text-white/40 text-xs mb-3 truncate">{poster.collectionTitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-novo-400 font-bold">₹{poster.price}</span>
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-novo-400 hover:bg-novo-500/20 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link to="/collections" className="btn-outline-novo">View All Posters</Link>
          </div>
        </div>
      </section>

      {/* ===== BUNDLE OFFER BANNER ===== */}
      <section className="py-12 px-4 bg-gradient-to-r from-dark-900 via-novo-900/20 to-dark-900 border-y border-novo-500/20" id="bundle-offer">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card glow-ring-novo p-8 md:p-12 text-center relative overflow-hidden border-novo-500/30 bg-novo-500/5">
             <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-novo-500/20 rounded-full blur-[80px]" />
             <div className="absolute bottom-[-50%] right-[-20%] w-64 h-64 bg-neon-cyan/20 rounded-full blur-[80px]" />
             
             <div className="relative z-10">
               <span className="badge-durable mb-4 inline-flex">Bundle & Save</span>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                 Buy 3 Posters, Get <span className="text-novo-400">15% OFF!</span>
               </h2>
               <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                 Mix and match any posters from any collection. Discount applies automatically at checkout. Buy 5 for 20% OFF!
               </p>
               <Link to="/collections" className="btn-novo px-8 py-4 text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                 Start Building Your Bundle
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US (Premium Positioning) ===== */}
      <section className="py-24 px-4 bg-dark-950/50" id="why-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="section-heading text-white">
              Why <span className="text-novo-gradient">NOVOPLAST</span>?
            </h2>
            <p className="text-white/40 mt-4">We don't make cheap paper posters. We craft premium art pieces.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Droplets, title: '100% Waterproof', desc: 'Splash it, soak it, clean it — our plastic substrate won\'t warp or ruin.', color: 'novo' },
              { icon: Star, title: 'Premium Print Quality', desc: 'High-definition 1200 DPI printing for vivid colors and deep blacks.', color: 'novo' },
              { icon: Shield, title: 'Sports & Fan Collections', desc: 'Curated exclusive collections for die-hard fans and sports lovers.', color: 'novo' },
              { icon: Box, title: 'Secure Packaging', desc: 'Shipped in crush-proof tubes to ensure your posters arrive in pristine condition.', color: 'novo' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-ring-novo p-8 text-center hover:border-novo-500/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-novo-500/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-novo-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-novo-300 mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES (Genres) ===== */}
      <section className="py-24 px-4" id="categories">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="section-heading text-white">Shop by <span className="text-novo-gradient">Category</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.slice(0, 6).map((genre, i) => {
              // Find first collection in this genre to use as thumbnail
              const genreCollections = getCollectionsByGenre(genre.id)
              const thumbnail = genreCollections.length > 0 ? genreCollections[0].thumbnail : '/aesthetic_candid_poster.png'
              
              return (
                <Link key={genre.id} to={`/collections?genre=${genre.id}`} className="group relative rounded-3xl overflow-hidden glass-card aspect-[4/3] block">
                  <img src={thumbnail} alt={genre.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-novo-400 transition-colors drop-shadow-lg">{genre.name}</h3>
                    <p className="text-white/80 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore {genreCollections.length} Collections
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CORE PRODUCTS (Custom, Spiritual, Stickers) ===== */}
      <section className="py-24 px-4 bg-dark-900 border-y border-white/5" id="core-products">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Custom Prints</span>
            <h2 className="section-heading text-white mt-2">
              Beyond <span className="text-novo-gradient">Posters</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Looking for something specific? We offer personalized prints too.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productList.map((product, i) => {
              const isNeon = product.variant === 'neon'
              const isSpiritual = product.variant === 'spiritual'
              return (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Link to={`/product/${product.id}`} className="block product-card group" id={`product-card-${product.id}`}>
                    <div className="relative h-72 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={isNeon ? 'badge-neon' : 'badge-durable'}>
                          {isSpiritual ? '🕉 Spiritual' : isNeon ? '✨ Custom' : '🖼 Upload Yours'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`font-display font-bold text-xl mb-2 ${isNeon ? 'text-neon-cyan' : isSpiritual ? 'text-novo-300' : 'text-white'}`}>
                        {product.name}
                      </h3>
                      <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className={`font-display font-bold text-lg ${isNeon ? 'text-neon-cyan' : 'text-novo-400'}`}>
                          Starting {product.currency}{product.price}
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-sm group-hover:text-white transition-colors">
                          Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-4" id="cta-section">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="glass-card glow-ring-novo p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-novo-500/50 to-transparent" />
            <h2 className="section-heading text-white mb-4">Ready to Upgrade <span className="text-novo-gradient">Your Room</span>?</h2>
            <p className="text-white/40 mb-8 max-w-lg mx-auto">Get India's most premium waterproof posters delivered to your doorstep.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/collections" className="btn-novo w-full sm:w-auto" id="cta-bottom-shop">Browse All Collections</Link>
              <Link to="/product/custom-posters" className="btn-outline-novo w-full sm:w-auto">Print Your Own</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
