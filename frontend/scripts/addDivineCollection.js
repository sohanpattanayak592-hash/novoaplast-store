import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../src/data/collectionsData.js');

async function addCollection() {
  console.log('Reading collectionsData.js...');
  let content = fs.readFileSync(dataFilePath, 'utf-8');
  
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
  
  // Create Divine & Spiritual collection
  const curatedDir = path.join(__dirname, '../public/curated');
  const files = fs.readdirSync(curatedDir).filter(f => f.startsWith('WhatsApp Image') && f.endsWith('.jpeg'));
  
  const posters = files.map((file, idx) => ({
    id: `p_divine_${idx + 1}`,
    title: `Divine Artwork ${idx + 1}`,
    image: `/curated/${file}`,
    price: 199,
    downloads: Math.floor(Math.random() * 5000) + 500,
    tags: ["divine", "spiritual", "god", "peace"],
    isNew: true,
    isTrending: idx < 10,
    badge: idx === 0 ? "BESTSELLER" : null
  }));
  
  const newCollection = {
    id: "col_26",
    title: "Divine & Spiritual",
    slug: "divine-spiritual",
    description: "Premium divine and spiritual posters featuring gods, temples, sacred symbols, meditation themes, devotional artwork, and inspirational spiritual wall decor.",
    genre: "spiritual",
    genreName: "Spiritual",
    priority: 1,
    tags: ["spiritual", "divine", "meditation", "god"],
    posters: posters,
    thumbnail: posters[0] ? posters[0].image : ''
  };
  
  collections.push(newCollection);
  
  const newContent = content.substring(0, startIndex) + JSON.stringify(collections, null, 2) + content.substring(endIndex);
  fs.writeFileSync(dataFilePath, newContent, 'utf-8');
  console.log('✅ collectionsData.js updated with Divine & Spiritual collection!');
}

addCollection().catch(console.error);
