import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../src/data/collectionsData.js');

const collectionImages = {
  // Use provided curated images where available
  col_1: ['/curated/ipl2025champions.jpg'], // IPL 2025
  col_2: ['https://images.unsplash.com/photo-1518609878373-06d740f60d8b', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20'], // FIFA
  col_3: ['https://images.unsplash.com/photo-1531415074955-060416999e52', 'https://images.unsplash.com/photo-1582236528828-5d8f61587399'], // ICC
  col_4: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2', 'https://images.unsplash.com/photo-1489944440615-453fc2b6604e'], // UEFA
  col_5: ['https://images.unsplash.com/photo-1517026575980-3e1e2fd0af62', 'https://images.unsplash.com/photo-1563249023456-4ed8c4e0f49c'], // F1
  col_6: ['/curated/virat.jpg'], // Virat
  col_7: ['/curated/messi.jpg'], // Messi
  col_8: ['https://images.unsplash.com/photo-1593341646782-e0bf8b1115b8', 'https://images.unsplash.com/photo-1582236528828-5d8f61587399'], // Dhoni
  col_9: ['/curated/ronaldo.jpg'], // Ronaldo
  col_10: ['/curated/virat.jpg'], // Virat Col
  col_11: ['https://images.unsplash.com/photo-1593341646782-e0bf8b1115b8'], // MS Dhoni
  col_12: ['https://images.unsplash.com/photo-1531415074955-060416999e52'], // Rohit
  col_13: ['/curated/ronaldo.jpg'], // Ronaldo
  col_14: ['/curated/messi.jpg'], // Messi
  col_15: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2'], // Neymar
  col_16: ['/curated/rcb.jpg'], // RCB Fan
  col_17: ['/curated/csk.jpg'], // CSK Fan
  col_18: ['/curated/mi.jpg'], // MI Fan
  col_19: ['https://images.unsplash.com/photo-1518609878373-06d740f60d8b'], // Real Madrid
  col_20: ['/curated/barcelona.jpg'], // Barcelona
  col_21: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d', 'https://images.unsplash.com/photo-1503376712394-6d9b0ccb5125'], // Supercars
  col_22: ['https://images.unsplash.com/photo-1578632767115-351597cf2477', 'https://images.unsplash.com/photo-1580477659159-4ba3ff710dfb'], // Anime
  col_23: ['https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'https://images.unsplash.com/photo-1441974231531-c6227dbb6b4e'], // Travel
  col_24: ['https://images.unsplash.com/photo-1528698827591-e408bfb0ffdc', 'https://images.unsplash.com/photo-1552664730-d307ca884978', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'], // Motivation
  col_25: ['https://images.unsplash.com/photo-1552820728-8b83bb6b7738', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc'], // Gaming
};

function getCuratedImage(collectionId, posterId) {
  const images = collectionImages[collectionId] || ['https://images.unsplash.com/photo-1550684848-fac1c5b4e853']; // fallback to abstract neon
  const idHash = posterId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selected = images[idHash % images.length];
  
  // If it's a local curated image, return as is. Otherwise format Unsplash URL
  if (selected.startsWith('/curated/')) {
    return selected;
  }
  return `${selected}?auto=format&fit=crop&w=800&q=80`;
}

async function fixDatabase() {
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
  let fixedCount = 0;
  
  collections.forEach(collection => {
    // ALWAYS override thumbnail to ensure it perfectly matches the mapping
    collection.thumbnail = getCuratedImage(collection.id, collection.id);
    fixedCount++;
    
    if (collection.posters) {
      collection.posters.forEach(poster => {
        poster.image = getCuratedImage(collection.id, poster.id);
        fixedCount++;
      });
    }
  });
  
  console.log(`Updated ${fixedCount} images with locally curated images and perfect Unsplash IDs.`);
  
  const newContent = content.substring(0, startIndex) + JSON.stringify(collections, null, 2) + content.substring(endIndex);
  fs.writeFileSync(dataFilePath, newContent, 'utf-8');
  console.log('✅ collectionsData.js updated successfully!');
}

fixDatabase().catch(console.error);
