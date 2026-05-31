import React, { useState } from 'react'
import { Star, CheckCircle, ThumbsUp, Camera } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock reviews for now
const mockReviews = [
  {
    id: 1,
    author: "Rahul S.",
    rating: 5,
    date: "2 weeks ago",
    content: "Absolutely blown away by the quality. I accidentally spilled water on it while framing, wiped it off and it was perfectly fine! The colours are incredibly vibrant.",
    verified: true,
    helpful: 12
  },
  {
    id: 2,
    author: "Priya M.",
    rating: 5,
    date: "1 month ago",
    content: "The A2 size looks massive and beautiful on my bedroom wall. The material feels thick and premium, unlike the flimsy paper posters I used to buy. Worth every penny.",
    verified: true,
    helpful: 8
  },
  {
    id: 3,
    author: "Vikram K.",
    rating: 4,
    date: "2 months ago",
    content: "Great poster, very durable. Took one star off because shipping took 5 days instead of 3, but the product itself is flawless.",
    verified: true,
    helpful: 3
  }
]

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState(mockReviews)

  return (
    <div className="mt-20 pt-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Stats Column */}
        <div className="md:w-1/3">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Customer Reviews</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl font-display font-black text-novo-400">4.8</div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-novo-500 fill-novo-500" />
                ))}
              </div>
              <p className="text-white/50 text-sm">Based on 124 reviews</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {[5, 4, 3, 2, 1].map((rating, i) => {
              const percentages = [82, 12, 4, 2, 0] // Mock distribution
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-white/60 text-sm w-8">{rating} <Star className="inline w-3 h-3 mb-0.5" /></span>
                  <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-novo-500 rounded-full" 
                      style={{ width: `${percentages[i]}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-8">{percentages[i]}%</span>
                </div>
              )
            })}
          </div>

          <button className="btn-outline-novo w-full flex justify-center items-center gap-2">
            Write a Review
          </button>
        </div>

        {/* Right Reviews List Column */}
        <div className="md:w-2/3 space-y-6">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-800/30 border border-white/5 p-6 rounded-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{review.author}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[10px] text-novo-400 bg-novo-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'text-novo-500 fill-novo-500' : 'text-white/20 fill-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-white/40 text-xs">{review.date}</span>
              </div>
              
              <p className="text-white/70 leading-relaxed text-sm mb-4">
                {review.content}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <button className="flex items-center gap-2 text-white/40 hover:text-novo-400 text-xs transition-colors">
                  <ThumbsUp className="w-4 h-4" /> Helpful ({review.helpful})
                </button>
              </div>
            </motion.div>
          ))}

          <button className="w-full py-4 text-novo-400 hover:text-novo-300 font-bold text-sm text-center transition-colors">
            Load More Reviews
          </button>
        </div>

      </div>
    </div>
  )
}
