// Generate 100+ collections across different genres
const genres = [
  {
    id: 'sports',
    name: 'Sports',
    categories: ['Football', 'Cricket', 'Basketball', 'Tennis', 'Formula 1', 'UFC', 'Olympics', 'IPL', 'FIFA World Cup', 'Champions League', 'Premier League']
  },
  {
    id: 'athletes',
    name: 'Athletes',
    categories: ['Virat Kohli', 'MS Dhoni', 'Rohit Sharma', 'Cristiano Ronaldo', 'Lionel Messi', 'Neymar', 'Kylian Mbappé', 'LeBron James']
  },
  {
    id: 'cars',
    name: 'Cars & Vehicles',
    categories: ['Supercars', 'Hypercars', 'Luxury Cars', 'JDM Cars', 'Muscle Cars', 'Electric Cars', 'Classic Cars', 'Bikes', 'Superbikes', 'Off-Road Vehicles']
  },
  {
    id: 'travel',
    name: 'Travel',
    categories: ['Beaches', 'Mountains', 'Switzerland', 'Dubai', 'Paris', 'Japan', 'Bali', 'Maldives', 'Road Trips', 'Adventure Travel', 'Nature Photography']
  },
  {
    id: 'motivation',
    name: 'Motivation & Success',
    categories: ['Motivational Quotes', 'Success Mindset', 'Discipline', 'Entrepreneurship', 'Productivity', 'Leadership', 'Self-Improvement', 'Study Motivation']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    categories: ['Movies', 'TV Shows', 'Anime', 'Marvel', 'DC', 'Gaming', 'Esports', 'Music', 'K-Pop', 'Bollywood', 'Hollywood']
  },
  {
    id: 'tech',
    name: 'Technology',
    categories: ['AI', 'Coding', 'Startups', 'Robotics', 'Space', 'Cybersecurity', 'Gadgets', 'Smartphones']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    categories: ['Fitness', 'Gym', 'Bodybuilding', 'Fashion', 'Luxury Lifestyle', 'Watches', 'Sneakers', 'Food', 'Coffee', 'Streetwear']
  },
  {
    id: 'art',
    name: 'Art & Creativity',
    categories: ['Digital Art', 'Photography', 'Wallpapers', 'Minimalism', 'Abstract Art', 'Typography', 'Architecture']
  },
  {
    id: 'trending',
    name: 'Trending',
    categories: ['Viral Trends', 'Memes', 'Internet Culture', 'Trending Celebrities', 'Current Events']
  }
];

// Unsplash keywords for thumbnails to make them look real
const thumbnailKeywords = {
  'sports': 'sports,stadium,athlete',
  'athletes': 'portrait,athlete,sports',
  'cars': 'sports-car,supercar,vehicle',
  'travel': 'landscape,city,travel',
  'motivation': 'success,hustle,quotes',
  'entertainment': 'cinema,movie,concert',
  'tech': 'technology,code,circuit',
  'lifestyle': 'lifestyle,fashion,coffee',
  'art': 'abstract,art,design',
  'trending': 'fire,popular,trend'
};

const generateCollections = () => {
  const collections = [];
  let idCounter = 1;

  genres.forEach(genre => {
    genre.categories.forEach(category => {
      // Create random popularity score between 50 and 100
      const popularityScore = Math.floor(Math.random() * 50) + 50;
      
      // We will generate 10-20 fake posters for each collection
      const numPosters = Math.floor(Math.random() * 11) + 10;
      const posters = [];
      
      for (let i = 0; i < numPosters; i++) {
        posters.push({
          id: `p_${idCounter}_${i}`,
          title: `${category} Poster ${i + 1}`,
          // Generate a specific random unsplash image
          image: `https://source.unsplash.com/random/400x600/?${encodeURIComponent(category)},${i}`,
          price: 299,
          downloads: Math.floor(Math.random() * 5000),
          tags: [category, genre.name, 'Premium', 'Poster']
        });
      }

      collections.push({
        id: `col_${idCounter}`,
        title: category,
        genre: genre.id,
        genreName: genre.name,
        thumbnail: `https://source.unsplash.com/random/800x600/?${encodeURIComponent(thumbnailKeywords[genre.id] + ',' + category)}`,
        popularityScore,
        posters,
        isNew: Math.random() > 0.8 // 20% chance to be "New"
      });
      
      idCounter++;
    });
  });

  return collections;
};

export const collectionsData = generateCollections();

// Helper functions for smart discovery
export const getTrendingCollections = () => {
  return [...collectionsData].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 15);
};

export const getRecentlyAdded = () => {
  return collectionsData.filter(c => c.isNew);
};

export const getCollectionsByGenre = (genreId) => {
  return collectionsData.filter(c => c.genre === genreId);
};

export const getDailyFeatured = () => {
  // Just grab a highly popular one for daily feature
  return collectionsData.reduce((prev, current) => (prev.popularityScore > current.popularityScore) ? prev : current);
};

export const getSimilarCollections = (collectionId) => {
  const target = collectionsData.find(c => c.id === collectionId);
  if (!target) return [];
  return collectionsData
    .filter(c => c.genre === target.genre && c.id !== target.id)
    .slice(0, 10);
};

export const getAllGenres = () => genres;
