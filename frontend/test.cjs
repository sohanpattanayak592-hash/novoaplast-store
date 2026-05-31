const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  console.log("Page loaded. Moving mouse...");
  
  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 1000));
  await page.mouse.move(500, 500);
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Mouse moved.");
  await browser.close();
})();
