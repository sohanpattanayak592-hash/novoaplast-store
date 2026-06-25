import https from 'https';

https.get('https://novoplast-store.vercel.app/collections/col_1', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", res.headers);
    console.log("Response Body First 500 chars:");
    console.log(data.substring(0, 500));
  });
}).on('error', err => console.log("Error:", err));
