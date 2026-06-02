const fs = require('fs');
const path = require('path');

const curatedPath = path.join(__dirname, '../public/curated');
const dataPath = path.join(__dirname, '../src/data/collectionsData.js');

const collectionsToSync = {
  'FIFA World Cup Champions': 'col_2',
  'ICC Cricket World Cup Moments': 'col_3',
  'UEFA Champions League Winners': 'col_4',
  'Formula 1 World Champions': 'col_5',
  'RCB Celebration Posters': 'col_6'
};

async function syncCollections() {
  let content = fs.readFileSync(dataPath, 'utf8');
  
  const startIndex = content.indexOf('export const collectionsData = [');
  const helperIndex = content.indexOf('// Helper Functions');
  
  // Find the exact location of `];` just before `// Helper Functions`
  const arrayEndBracketIndex = content.lastIndexOf(']', helperIndex) + 1;
  const arrayEndSemiIndex = content.indexOf(';', arrayEndBracketIndex);
  
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
  
  let globalPosterId = 2000;
  
  for (const [folderName, colId] of Object.entries(collectionsToSync)) {
    const folderPath = path.join(curatedPath, folderName);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.avif'));
      
      const colIndex = collections.findIndex(c => c.id === colId);
      if (colIndex !== -1 && files.length > 0) {
        const collection = collections[colIndex];
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
        
        collection.posters = newPosters;
        
        if (newPosters.length > 0) {
          collection.thumbnail = newPosters[0].image;
        }
        
        console.log(`Updated collection ${colId} (${collection.title}) with ${files.length} images from folder.`);
      }
    }
  }
  
  const newDataStr = JSON.stringify(collections, null, 2);
  const newContent = content.substring(0, arrayStart) + newDataStr + content.substring(arrayEndBracketIndex);
  
  fs.writeFileSync(dataPath, newContent);
  console.log("Successfully updated collectionsData.js!");
}

syncCollections();
