const fs = require('fs');
const content = fs.readFileSync('src/data/collectionsData.js', 'utf-8');
const matches = [...content.matchAll(/"id": "(col_\d+)",\s*"title": "([^"]+)"/g)];
console.log(matches.map(m => m[1] + ': ' + m[2]).join('\n'));
