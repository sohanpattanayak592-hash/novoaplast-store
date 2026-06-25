import https from 'https';

https.get('https://novoplast-store.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/);
    if (match) {
      const jsUrl = 'https://novoplast-store.vercel.app' + match[1];
      console.log('Found main JS:', jsUrl);
      https.get(jsUrl, (jsRes) => {
        if (jsRes.statusCode !== 200) {
          console.log('JS Fetch Failed! Status:', jsRes.statusCode);
        } else {
          console.log('JS Fetch Success! Downloading to inspect...');
          // we could save it, but if it's 200 it exists.
        }
      });
    } else {
      console.log('Main JS script tag not found!');
    }
  });
});
