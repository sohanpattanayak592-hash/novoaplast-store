import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../src/data/collectionsData.js');

const collectionImages = {
  // Use provided curated images where available
  col_1: ['/curated/ipl2025champions.jpg', '/curated/ipl 2026 champions.webp', '/curated/0443f931-b727-4de6-8a35-cac66a92e265.avif', '/curated/0480be2d-a02b-43c0-a338-04b658755377.avif', '/curated/061b2208-0dda-41ba-a3c0-7183596556c8.avif', '/curated/071be717-eede-426c-a2d2-eb2b8f5aa504.avif', '/curated/0735e73e-1e8e-4184-ba15-a354fdb4ca3f.avif', '/curated/0e105afa-1686-4e1a-ad9e-afa7f13462e8.avif', '/curated/14ba60de-268e-45cb-87bd-d526e98fe3a6.avif', '/curated/1cf4e6b3-0bdd-4230-a496-6264378b6f69.avif', '/curated/317e198b-46b7-4e9b-a776-8fd3881287bb.avif', '/curated/3a660364-f8b2-4098-bc79-b8cd07524be1.avif', '/curated/4827a831-e840-4fa6-8f39-2b68392476b8.avif'], // IPL 2026 Champions
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
  col_16: ['/curated/rcb.jpg', '/curated/90013e3d-4a5f-4a0f-9106-d74667e3053e.avif', '/curated/95019e76-41ba-4976-b555-fd3baa16e952.avif', '/curated/9debc4b0-b528-4d54-adf6-b9ff4a5e4f75.avif', '/curated/9ed6f217-545f-4b58-802a-9775ebb079af.avif', '/curated/a5eb9862-5565-416c-a311-af7a5e2775f1.avif', '/curated/c16302e1-74de-45a8-b455-529577d666c4.avif', '/curated/c7763ac1-3570-42d5-beee-7684e7c74b18.avif', '/curated/c7f63b0e-49ba-4854-8e37-decd8a52406b.avif', '/curated/cb55e405-01e7-4687-8647-8d734ad0b7bb.avif', '/curated/dbb962eb-024c-4651-90e5-04e03165078a.avif', '/curated/e0a25344-d253-4593-a399-8d5b24ed00e4.avif'], // RCB Fan
  col_17: ['/curated/csk.jpg', '/curated/ipl 2023 champions.webp', '/curated/52360c53-711d-47c1-98a2-f1957d3c112c.avif', '/curated/52ad5986-c445-4536-8d90-9ec5cef1e947.avif', '/curated/54becc5b-4466-4865-bf43-1c218262a13e.avif', '/curated/5aaf5d1f-e915-4c5c-9ac2-fbef212fa037.avif', '/curated/5c735b73-6a9e-4044-b80c-7b03f5e59694.avif', '/curated/61d9a090-2642-4176-ac12-fe8270def8c0.avif', '/curated/6468e5aa-5d12-44f5-9443-1b1272f64193.avif', '/curated/671839d8-1cb6-4362-a6db-fa3a406fa3d2.avif', '/curated/85d100be-6662-4c6c-aba1-b2cfeeacdefb.avif', '/curated/85e1be4e-2b9e-4e67-abe1-f09afac1f557.avif', '/curated/88c136f7-26e5-4229-a18b-88c36bd6d15f.avif'], // CSK / IPL 2023
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
