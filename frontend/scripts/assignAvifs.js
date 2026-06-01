import fs from 'fs';
import path from 'path';

// Get all AVIF files
const curatedDir = 'src/../public/curated';
const files = fs.readdirSync(curatedDir).filter(f => f.endsWith('.avif'));

// Split the 33 images into 3 groups
const group1 = files.slice(0, 11).map(f => `'/curated/${f}'`); // col_1: IPL 2026
const group2 = files.slice(11, 22).map(f => `'/curated/${f}'`); // col_17: CSK / IPL 2023
const group3 = files.slice(22).map(f => `'/curated/${f}'`); // col_10: Virat / col_16: RCB

// Read fixDatabase.js
let content = fs.readFileSync('scripts/fixDatabase.js', 'utf-8');

// Replace the arrays
content = content.replace(
  /col_1: \[.*?\], \/\/ IPL 2025/g,
  `col_1: ['/curated/ipl2025champions.jpg', '/curated/ipl 2026 champions.webp', ${group1.join(', ')}], // IPL 2026 Champions`
);

content = content.replace(
  /col_17: \[.*?\], \/\/ CSK Fan/g,
  `col_17: ['/curated/csk.jpg', '/curated/ipl 2023 champions.webp', ${group2.join(', ')}], // CSK / IPL 2023`
);

content = content.replace(
  /col_16: \[.*?\], \/\/ RCB Fan/g,
  `col_16: ['/curated/rcb.jpg', ${group3.join(', ')}], // RCB Fan`
);

fs.writeFileSync('scripts/fixDatabase.js', content, 'utf-8');
console.log('Updated fixDatabase.js with 33 AVIF images!');
