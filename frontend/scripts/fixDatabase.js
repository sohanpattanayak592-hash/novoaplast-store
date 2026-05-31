import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the existing data (must read as string to avoid module caching issues if we rewrite)
const dataFilePath = path.join(__dirname, '../src/data/collectionsData.js');

// Curated high-quality Unsplash image IDs grouped by category
const curatedImages = {
  cricket: [
    '1540747913346-19e32dc3e97e', // Stadium
    '1593341646782-e0bf8b1115b8', // Cricket gear
    '1531415074955-060416999e52', // Cricket field
    '1608228079968-c14ec76e036e', // Cricket ball
    '1518605368461-1ee790672e42'  // Stadium lights
  ],
  football: [
    '1518609878373-06d740f60d8b', // Football stadium
    '1522778119026-d647f0596c20', // Football match
    '1508098682722-e99c43a406b2', // Football field
    '1553158022-79361a49f506',    // Messi/Barca style
    '1489944440615-453fc2b6604e'  // Ronaldo/Real Madrid style
  ],
  motivation: [
    '1519834785169-f8ee0c690184', // Do something great
    '1492684223066-81342ee5ff30', // Never give up
    '1552664730-d307ca884978',    // Success
    '1506784951209-6834ab01a750', // Hustle
    '1528698827591-e408bfb0ffdc'  // Neon quotes
  ],
  anime: [
    '1578632767115-351597cf2477', // Anime style street
    '1580477659159-4ba3ff710dfb', // Japan neon
    '1613376023733-f54247055e81', // Manga style
    '1578632767115-351597cf2477', // Anime scenery
    '1605806616949-1e87b487cb2a'  // Cyberpunk anime
  ],
  gaming: [
    '1550745165-9bc0b252726f', // Retro gaming
    '1542751371-adc38448a05e', // Esports arena
    '1538481199705-c710c4e965fc', // Console controller
    '1552820728-8b83bb6b7738', // PC setup
    '1542751371-adc38448a05e'  // Neon gaming
  ],
  abstract: [
    '1550684848-fac1c5b4e853', // Abstract neon
    '1563089145-599997674d42', // Abstract fluid
    '1557672172-298e090bd0f1', // Abstract geometry
    '1618005182384-a83a8bd57fbe', // Fluid dark
    '1604871000636-074fa5117945'  // Cyberpunk textures
  ],
  movies: [
    '1536440136628-849c177e76a1', // Movie theater
    '1485846234645-a62644f84728', // Film slate
    '1440404653325-ab127d49abc1', // Cinema
    '1585647347345-d86895b6a718', // Hollywood
    '1489599874457-3f9f31548e24'  // Popcorn/Movies
  ],
  music: [
    '1511671782636-81141c26b5fa', // Concert
    '1493225457224-06c1388b7da5', // Guitar
    '1514525253161-7a46d19cd819', // DJ
    '1459749411175-04bf5292ceea', // Piano
    '1510915361894-08966d9f4ba7'  // Neon music
  ],
  superhero: [
    '1608889175123-8ee3a41b518a', // Super hero figure
    '1534809027769-6218f9c84e18', // Comic books
    '1586348633757-ee3f938a1682', // Heroic pose
    '1612036782180-6f0b6cd846fe', // Marvel style
    '1585507119565-d602db0ef4ab'  // Action figure
  ],
  nature: [
    '1472214103451-9374bd1c798e', // Nature landscape
    '1441974231531-c6227dbb6b4e', // Forest
    '1470071131385-9fe8d90f1118', // Mountains
    '1465146849373-b292e5971597', // Ocean
    '1501854140801-50d01698950b'  // Stars
  ]
};

// Map collections/tags to category keys
const categoryMapping = {
  'cricket': 'cricket',
  'sports': 'cricket', // Assume cricket by default for this store's sports
  'football': 'football',
  'soccer': 'football',
  'motivation': 'motivation',
  'anime': 'anime',
  'gaming': 'gaming',
  'abstract': 'abstract',
  'movie': 'movies',
  'movies': 'movies',
  'music': 'music',
  'superhero': 'superhero',
  'nature': 'nature',
  'art': 'abstract',
  'cars': 'abstract' // fallback
};

function getCuratedImage(collection, title, posterId) {
  // Determine best category
  let matchedCategory = 'abstract'; // default
  
  const searchString = `${collection.title} ${collection.description} ${collection.tags?.join(' ')} ${title}`.toLowerCase();
  
  for (const [key, category] of Object.entries(categoryMapping)) {
    if (searchString.includes(key)) {
      matchedCategory = category;
      break;
    }
  }

  // Get images for category
  const images = curatedImages[matchedCategory] || curatedImages['abstract'];
  
  // Deterministic pick based on posterId string to ensure same poster gets same image
  const idHash = posterId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageId = images[idHash % images.length];

  return `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=800&q=80`;
}

async function fixDatabase() {
  console.log('Reading collectionsData.js...');
  let content = fs.readFileSync(dataFilePath, 'utf-8');
  
  // Extract the array by finding the start of the array and counting brackets
  const startIndex = content.indexOf('export const collectionsData = [') + 'export const collectionsData = '.length;
  let bracketCount = 0;
  let endIndex = -1;
  
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    else if (content[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }

  if (endIndex === -1) {
    console.error('Could not parse collectionsData array.');
    process.exit(1);
  }
  
  const arrayString = content.substring(startIndex, endIndex);
  let collections = JSON.parse(arrayString);
  let fixedCount = 0;
  
  collections.forEach(collection => {
    // Fix collection thumbnail
    if (collection.thumbnail && (collection.thumbnail.includes('loremflickr') || collection.thumbnail.includes('picsum'))) {
      collection.thumbnail = getCuratedImage(collection, collection.title, collection.id);
      fixedCount++;
    }
    
    // Fix poster images
    if (collection.posters) {
      collection.posters.forEach(poster => {
        if (poster.image && (poster.image.includes('loremflickr') || poster.image.includes('picsum'))) {
          poster.image = getCuratedImage(collection, poster.title, poster.id);
          fixedCount++;
        }
      });
    }
  });
  
  console.log(`Replaced ${fixedCount} generic images with highly relevant curated URLs.`);
  
  // Re-serialize the file
  const newContent = content.substring(0, startIndex) + JSON.stringify(collections, null, 2) + content.substring(endIndex);
  
  fs.writeFileSync(dataFilePath, newContent, 'utf-8');
  console.log('✅ collectionsData.js updated successfully!');
}

fixDatabase().catch(console.error);
