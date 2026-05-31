import https from 'https';

function searchWikimedia(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap%20${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.query && parsed.query.pages) {
            const pages = Object.values(parsed.query.pages);
            if (pages.length > 0 && pages[0].imageinfo) {
              resolve(pages[0].imageinfo[0].url);
              return;
            }
          }
          resolve(null);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const queries = [
    "Virat Kohli batting",
    "Royal Challengers Bangalore",
    "IPL Trophy",
    "Chennai Super Kings",
    "Mumbai Indians",
    "Cristiano Ronaldo Real Madrid",
    "Lionel Messi Barcelona",
    "Real Madrid Santiago Bernabeu",
    "Camp Nou",
    "Motivational quote neon"
  ];
  
  for (const q of queries) {
    const url = await searchWikimedia(q);
    console.log(`${q}: ${url}`);
  }
}

run();
