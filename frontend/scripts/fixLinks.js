import fs from 'fs';

let c = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

c = c.replaceAll('"/collections/rcb-ipl-2026-champions"', '"/collections/col_1"');
c = c.replaceAll("'/collections/rcb-ipl-2026-champions'", "'/collections/col_1'");

c = c.replaceAll('"/collections/virat-kohli-collection"', '"/collections/col_10"');
c = c.replaceAll("'/collections/virat-kohli-collection'", "'/collections/col_10'");

c = c.replaceAll('"/collections/rcb-fan-collection"', '"/collections/col_16"');
c = c.replaceAll("'/collections/rcb-fan-collection'", "'/collections/col_16'");

fs.writeFileSync('src/pages/HomePage.jsx', c);
console.log('Fixed collection links in HomePage!');
