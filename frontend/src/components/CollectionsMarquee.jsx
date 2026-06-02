import React from 'react';
import { Link } from 'react-router-dom';
import { collectionsData } from '../data/collectionsData';
import PosterImage from './PosterImage';

export default function CollectionsMarquee() {
  // Filter only collections with valid thumbnails (ignore empties)
  const validCollections = collectionsData.filter(c => c.thumbnail);
  
  // Sort or shuffle if desired, but default order is fine.
  // Split into two rows
  const midPoint = Math.floor(validCollections.length / 2);
  const row1 = validCollections.slice(0, midPoint);
  const row2 = validCollections.slice(midPoint);

  return (
    <section className="py-12 bg-dark-950 overflow-hidden border-y border-white/5 relative z-20">
      <div className="max-w-[1600px] mx-auto px-4 mb-8">
        <h2 className="text-white/60 font-medium text-sm md:text-base text-center uppercase tracking-widest flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-white/20"></span>
          Explore Our Collections ({validCollections.length}+ Collections)
          <span className="w-12 h-px bg-white/20"></span>
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 relative">
        {/* Row 1 - Scrolls Left */}
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused] w-max will-change-transform [transform:translateZ(0)]">
            {[...row1, ...row1, ...row1, ...row1].map((col, index) => (
              <MarqueeCard key={`r1-${index}`} collection={col} />
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolls Right */}
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee-right group-hover:[animation-play-state:paused] w-max will-change-transform [transform:translateZ(0)]">
            {[...row2, ...row2, ...row2, ...row2].map((col, index) => (
              <MarqueeCard key={`r2-${index}`} collection={col} />
            ))}
          </div>
        </div>
        
        {/* Edge Gradients for smooth fade out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-dark-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-dark-950 to-transparent z-10" />
      </div>
    </section>
  );
}

function MarqueeCard({ collection }) {
  return (
    <Link 
      to={`/collections/${collection.id}`}
      className="flex-shrink-0 w-[200px] md:w-[280px] mx-2 md:mx-3 group/card block"
    >
      <div className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden glass-card border border-white/5 shadow-lg hover:border-novo-500/50 hover:shadow-[0_0_20px_rgba(139,204,99,0.15)] transition-all duration-300 hover:-translate-y-1">
        <PosterImage 
          src={collection.thumbnail} 
          alt={collection.title} 
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/60 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
          <h3 className="text-white font-display font-bold text-sm md:text-lg leading-tight truncate">
            {collection.title}
          </h3>
          <p className="text-novo-400 text-[9px] md:text-[11px] font-semibold uppercase tracking-widest mt-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
            {collection.genreName}
          </p>
        </div>
      </div>
    </Link>
  );
}
