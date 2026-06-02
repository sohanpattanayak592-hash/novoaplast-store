const fs = require('fs');
const path = require('path');

const curatedPath = path.join(__dirname, '../public/curated');
const dataPath = path.join(__dirname, '../src/data/collectionsData.js');

async function syncCollections() {
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
  
  let globalPosterId = 3000;
  let totalUpdated = 0;
  
  for (const collection of collections) {
    const folderName = collection.title;
    const folderPath = path.join(curatedPath, folderName);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      fs.writeFileSync(path.join(folderPath, '.gitkeep'), '');
    }
    
    const files = fs.readdirSync(folderPath).filter(f => 
      f.toLowerCase().endsWith('.jpg') || 
      f.toLowerCase().endsWith('.jpeg') || 
      f.toLowerCase().endsWith('.png') || 
      f.toLowerCase().endsWith('.webp') || 
      f.toLowerCase().endsWith('.avif')
    );
    
    const tags = collection.tags || [];
    
    const newPosters = files.map((file, idx) => {
      globalPosterId++;
      return {
        id: `p_sync_${globalPosterId}`,
        title: `${collection.title} Poster ${idx + 1}`,
        image: `/curated/${folderName}/${file}`,
        price: 199,
        downloads: Math.floor(Math.random() * 4000) + 500,
        tags: [...tags, "sync"],
        isNew: Math.random() > 0.7,
        isTrending: Math.random() > 0.8,
        badge: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'BESTSELLER' : 'TRENDING') : null
      };
    });
    
    // Always sync the collection posters to match the folder exactly (even if empty)
    // To see if we should update, check if lengths changed or first image changed (simplistic check)
    // For safety, we'll just overwrite and always update the file.
    collection.posters = newPosters;
    
    if (newPosters.length > 0) {
      collection.thumbnail = newPosters[0].image;
      console.log(`Synced collection ${collection.id} (${collection.title}) with ${files.length} images.`);
    } else {
      collection.thumbnail = null;
      console.log(`Synced collection ${collection.id} (${collection.title}) - EMPTY.`);
    }
    
    totalUpdated++;
  }
  
  if (totalUpdated > 0) {
    const newDataStr = JSON.stringify(collections, null, 2);
    const newContent = content.substring(0, arrayStart) + newDataStr + content.substring(arrayEndBracketIndex);
    
    fs.writeFileSync(dataPath, newContent);
    console.log("Successfully updated collectionsData.js! All collections strictly mirror the curated folders.");
  }
}

syncCollections();
