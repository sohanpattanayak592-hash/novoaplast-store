import fs from 'fs';

let c = fs.readFileSync('src/data/collectionsData.js', 'utf-8');
c = c.replace(/"title": "IPL 2025 Champions"/g, '"title": "RCB IPL 2026 Champions"');
c = c.replace(/"slug": "ipl-2025-champions"/g, '"slug": "rcb-ipl-2026-champions"');
c = c.replace(/"title": "Virat Kohli Trophy Celebrations"/g, '"title": "RCB Celebration Posters"');
c = c.replace(/"slug": "virat-kohli-trophy-celebrations"/g, '"slug": "rcb-celebration-posters"');
c = c.replace(/"title": "Dhoni World Cup Winning Moments"/g, '"title": "Trophy Moments"');
c = c.replace(/"slug": "dhoni-world-cup-winning-moments"/g, '"slug": "trophy-moments"');
c = c.replace(/"title": "MS Dhoni Collection"/g, '"title": "Cricket Legends"');
c = c.replace(/"slug": "ms-dhoni-collection"/g, '"slug": "cricket-legends"');
c = c.replace(/"title": "Rohit Sharma Collection"/g, '"title": "Fan Club Posters"');
c = c.replace(/"slug": "rohit-sharma-collection"/g, '"slug": "fan-club-posters"');

// And replace in products as well if they appear there
fs.writeFileSync('src/data/collectionsData.js', c);
console.log('Collections renamed!');
