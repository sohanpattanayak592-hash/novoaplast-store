export const products = {
  'custom-posters': {
    id: 'custom-posters',
    name: 'Custom Posters',
    tagline: 'Your art, photos, or designs printed on indestructible sheets.',
    description: 'Transform your room with premium-quality posters. Printed on completely waterproof, non-tearable substrate with a premium finish that lasts forever.',
    price: 199,
    currency: '₹',
    image: '/poster-hero.png',
    variant: 'default',
    category: 'posters',
    hasUpload: true,
    hasPersonalization: true,
    specifications: [
      { label: 'Material', value: '100% Non-Tearable Plastic Substrate' },
      { label: 'Finish', value: 'Premium Matte / Gloss options' },
      { label: 'Waterproof', value: 'Yes, fully washable' },
      { label: 'Durability', value: 'Fade-resistant, UV-protected' }
    ],
    faqs: [
      { q: 'Can I hang this in my bathroom?', a: 'Yes! Our posters are 100% waterproof and moisture resistant.' },
      { q: 'Do I need a frame?', a: 'No frame needed. They look stunning directly mounted on the wall using double-sided tape.' },
      { q: 'Will the colors fade?', a: 'No, we use UV-resistant inks that stay vibrant for decades.' }
    ],
    shippingInfo: 'Dispatches in 24-48 hours. Delivery in 3-5 days across India.',
    relatedProductSlugs: ['spiritual-prints', 'custom-stickers']
  },
  'spiritual-prints': {
    id: 'spiritual-prints',
    name: 'Spiritual Canvas',
    tagline: 'Sacred shlokas and divine art that endure time.',
    description: 'Bring peace and elegance to your space with our premium spiritual prints. Complete with beautiful typography and completely waterproof material.',
    price: 199,
    currency: '₹',
    image: '/spiritual-hero.png',
    variant: 'spiritual',
    category: 'spiritual',
    hasUpload: false,
    hasPersonalization: true,
    shlokas: [
      { name: 'Gayatri Mantra', text: 'Om Bhur Bhuva Swaha...' },
      { name: 'Hanuman Chalisa', text: 'Shri Guru Charan Saroj Raj...' },
      { name: 'Ganesh Aarti', text: 'Jai Ganesh Jai Ganesh...' },
      { name: 'Lakshmi Aarti', text: 'Om Jai Lakshmi Mata...' },
      { name: 'Mahamrityunjaya Mantra', text: 'Om Tryambakam Yajamahe...' },
      { name: 'Custom Shloka / Arti', text: 'Provide your own text below' }
    ],
    specifications: [
      { label: 'Material', value: '100% Non-Tearable Plastic Substrate' },
      { label: 'Theme', value: 'Saffron & Gold Accents' },
      { label: 'Waterproof', value: 'Yes' },
      { label: 'Durability', value: 'Fade-resistant, UV-protected' }
    ],
    faqs: [
      { q: 'Can I add a custom mantra?', a: 'Yes, select "Custom Shloka" and provide the text in the personalization box.' },
      { q: 'Is it suitable for the pooja room?', a: 'Perfectly suitable. It is waterproof, so accidental splashes during pooja won\'t damage it.' }
    ],
    shippingInfo: 'Dispatches in 24-48 hours. Delivery in 3-5 days across India.',
    relatedProductSlugs: ['custom-posters']
  },
  'custom-stickers': {
    id: 'custom-stickers',
    name: 'Custom Stickers',
    tagline: 'Weatherproof vinyl stickers for your gear.',
    description: 'Personalize your laptop, bike, or water bottle with vibrant, die-cut custom stickers. Engineered to survive sun, rain, and scratches.',
    price: 149,
    currency: '₹',
    image: '/stickers-hero.png',
    variant: 'neon',
    category: 'stickers',
    hasUpload: true,
    hasPersonalization: false,
    sizes: [
      { label: 'Small (2"x2")', price: 49 },
      { label: 'Medium (3"x3")', price: 99 },
      { label: 'Large (4"x4")', price: 149 },
      { label: 'Sheet (A4 size)', price: 349 }
    ],
    quantities: [
      { label: '10 Stickers', multiplier: 1 },
      { label: '25 Stickers', multiplier: 2.2 },
      { label: '50 Stickers', multiplier: 3.8 },
      { label: '100 Stickers', multiplier: 6.5 }
    ],
    specifications: [
      { label: 'Material', value: 'Premium Vinyl' },
      { label: 'Adhesive', value: 'Strong but leaves no residue' },
      { label: 'Waterproof', value: 'Yes, dishwasher safe' },
      { label: 'Scratch-Resistant', value: 'Yes, laminated finish' }
    ],
    faqs: [
      { q: 'Can I put these on my car?', a: 'Yes, they are UV and weather-resistant.' },
      { q: 'Will it leave sticky residue?', a: 'No, we use premium adhesive that peels off cleanly.' }
    ],
    shippingInfo: 'Dispatches in 24-48 hours. Delivery in 3-5 days across India.',
    relatedProductSlugs: ['custom-posters']
  }
};
