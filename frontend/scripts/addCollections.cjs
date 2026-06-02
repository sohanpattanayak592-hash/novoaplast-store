const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/collectionsData.js');
const curatedPath = path.join(__dirname, '../public/curated');

const newGenres = [
  { id: 'sports', name: 'Sports Events & Moments' },
  { id: 'athletes', name: 'Sports Legends' },
  { id: 'teams', name: 'Fan Clubs' },
  { id: 'cars', name: 'Cars & Vehicles' },
  { id: 'bikes', name: 'Bikes & Motorcycles' },
  { id: 'anime', name: 'Anime & Manga' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'superheroes', name: 'Superheroes' },
  { id: 'music', name: 'Music' },
  { id: 'motivation', name: 'Motivation & Success' },
  { id: 'business', name: 'Business & Entrepreneurs' },
  { id: 'travel', name: 'Travel' },
  { id: 'nature', name: 'Nature' },
  { id: 'space', name: 'Space & Science' },
  { id: 'lifestyle', name: 'Lifestyle & Art' },
  { id: 'art', name: 'Art' },
  { id: 'spiritual', name: 'Spiritual & Divine' },
  { id: 'history', name: 'History' },
  { id: 'college', name: 'College Life' },
  { id: 'internet', name: 'Memes & Internet Culture' }
];

const newColData = [
  { genre: 'entertainment', collections: ['Movies', 'TV Shows', 'Web Series', 'Bollywood', 'Hollywood', 'Classic Cinema'] },
  { genre: 'anime', collections: ['Anime Legends', 'Shonen Heroes', 'Anime Villains', 'Manga Art'] },
  { genre: 'gaming', collections: ['PC Gaming', 'Console Gaming', 'Retro Gaming', 'Esports', 'Open World Games'] },
  { genre: 'superheroes', collections: ['Marvel', 'DC Comics', 'Superheroes', 'Comic Art'] },
  { genre: 'music', collections: ['Music Legends', 'Rock', 'Pop', 'Hip Hop', 'Album Art'] },
  { genre: 'motivation', collections: ['Success Quotes', 'Hustle & Grind', 'Entrepreneur Mindset', 'Leadership', 'Productivity'] },
  { genre: 'business', collections: ['Startup Founders', 'Business Icons', 'Innovation', 'Wealth & Finance'] },
  { genre: 'travel', collections: ['World Destinations', 'Mountains', 'Beaches', 'Cities of the World', 'Adventure Travel'] },
  { genre: 'nature', collections: ['Landscapes', 'Forests', 'Wildlife', 'Oceans', 'Sunsets'] },
  { genre: 'space', collections: ['Space Exploration', 'Astronomy', 'Planets', 'Future Technology', 'Science Discoveries'] },
  { genre: 'cars', collections: ['Supercars', 'Hypercars', 'JDM Cars', 'Muscle Cars', 'Luxury Cars'] },
  { genre: 'bikes', collections: ['Superbikes', 'Cafe Racers', 'Adventure Bikes'] },
  { genre: 'lifestyle', collections: ['Minimalist Art', 'Aesthetic Rooms', 'Modern Design', 'Street Culture'] },
  { genre: 'art', collections: ['Digital Art', 'Abstract Art', 'Vintage Art', 'Contemporary Art'] },
  { genre: 'spiritual', collections: ['Hindu Deities', 'Temples', 'Sacred Symbols', 'Meditation', 'Spiritual Quotes'] },
  { genre: 'history', collections: ['Ancient Civilizations', 'Historical Figures', 'Historic Events', 'World Heritage'] },
  { genre: 'college', collections: ['Student Motivation', 'Hostel Life', 'Study Room Posters', 'Campus Culture'] },
  { genre: 'internet', collections: ['Viral Moments', 'Funny Posters', 'Internet Classics'] }
];

function run() {
  let content = fs.readFileSync(dataPath, 'utf8');
  
  const startIndex = content.indexOf('export const collectionsData = [');
  const helperIndex = content.indexOf('// Helper Functions');
  
  const arrayEndBracketIndex = content.lastIndexOf(']', helperIndex) + 1;
  
  if (startIndex === -1 || helperIndex === -1 || arrayEndBracketIndex < startIndex) {
    console.error("Could not parse collectionsData.js boundaries.");
    return;
  }
  
  const arrayStart = startIndex + 'export const collectionsData = '.length;
  const arrayStr = content.substring(arrayStart, arrayEndBracketIndex);
  
  let collections;
  try {
    collections = eval('(' + arrayStr + ')');
  } catch (e) {
    console.error("Failed to eval array:", e);
    return;
  }
  
  let globalColId = 50;
  
  for (const group of newColData) {
    const genreObj = newGenres.find(g => g.id === group.genre);
    for (const cName of group.collections) {
      if (!collections.some(c => c.title === cName)) {
        globalColId++;
        collections.push({
          id: `col_${globalColId}`,
          title: cName,
          slug: cName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: `Premium posters featuring ${cName}`,
          genre: group.genre,
          genreName: genreObj.name,
          priority: 5,
          tags: [cName.toLowerCase().split(' ')[0]],
          posters: [],
          thumbnail: null
        });
        
        // Create the folder
        const p = path.join(curatedPath, cName);
        if (!fs.existsSync(p)) {
          fs.mkdirSync(p, { recursive: true });
          fs.writeFileSync(path.join(p, '.gitkeep'), '');
        }
      }
    }
  }
  
  const newDataStr = JSON.stringify(collections, null, 2);
  let newContent = content.substring(0, arrayStart) + newDataStr + content.substring(arrayEndBracketIndex);
  
  // Now replace getAllGenres
  const genreStart = newContent.indexOf('export const getAllGenres = () => [');
  const genreEnd = newContent.indexOf('];', genreStart) + 2;
  
  if (genreStart !== -1 && genreEnd !== -1) {
    const newGenreStr = 'export const getAllGenres = () => ' + JSON.stringify(newGenres, null, 2) + ';';
    newContent = newContent.substring(0, genreStart) + newGenreStr + newContent.substring(genreEnd);
  }
  
  fs.writeFileSync(dataPath, newContent);
  console.log("Collections added successfully!");
}

run();
