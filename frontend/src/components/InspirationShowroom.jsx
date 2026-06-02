import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collectionsData } from '../data/collectionsData';
import { ArrowRight } from 'lucide-react';

const InspirationShowroom = () => {
  // Get col_24 (Motivation & Quotes)
  const motivationCollection = collectionsData.find(c => c.id === 'col_24');
  const posters = motivationCollection?.posters || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Preload and cycle
  useEffect(() => {
    if (posters.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % posters.length;
        // Preload the next one after the new one
        const future = (next + 1) % posters.length;
        const img = new Image();
        img.src = posters[future].image;
        return next;
      });
    }, 2500); // 2.5s is much more readable for quotes than 1s, but feels fast enough
    
    return () => clearInterval(interval);
  }, [posters]);

  if (posters.length === 0) {
    return null; // Fallback
  }

  const currentPoster = posters[currentIndex];

  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-dark-950 border-y border-white/5">
      {/* Background Image with slow zoom parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/showroom-bg.png')` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-900/60 to-transparent"></div>
      </motion.div>

      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between pt-24 lg:pt-32">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-novo-500 animate-pulse"></span>
              <span className="text-white/80 text-xs font-bold tracking-wider uppercase">Inspiration In Action</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              See Inspiration <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-novo-400 to-novo-600">Come Alive.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl font-light">
              Watch our premium Motivation & Quotes collections transform real spaces. 
              Visualize exactly how these masterpieces will elevate your daily environment.
            </p>
            
            <Link 
              to={`/collections/${motivationCollection.id}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-novo-600 hover:bg-novo-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-novo-900/20"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* The Wall Frame */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center lg:justify-end pb-12 lg:pb-0 relative">
          {/* We position the frame artificially in the 3D space of the image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:-translate-x-12 xl:-translate-x-32 2xl:-translate-x-48"
          >
            {/* The physical frame styling */}
            <div className="relative bg-white p-[12px] md:p-[16px] shadow-2xl rounded-sm">
              <div className="absolute inset-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] -z-10 rounded-sm"></div>
              
              {/* Matte board */}
              <div className="relative bg-[#f8f8f8] p-[30px] md:p-[45px] border border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                
                {/* Poster Container */}
                <div className="relative w-[220px] h-[330px] md:w-[320px] md:h-[480px] bg-black/5 overflow-hidden border border-black/20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={currentPoster.id}
                      src={currentPoster.image}
                      alt={currentPoster.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle glass reflection over the poster */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-full animate-[shimmer_8s_infinite]"></div>
                </div>
              </div>
            </div>
            
            {/* Dynamic Label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPoster.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/60 text-sm font-medium tracking-wide drop-shadow-md truncate px-4"
                >
                  {currentPoster.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50% { transform: translateX(150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
      `}} />
    </section>
  );
};

export default InspirationShowroom;
