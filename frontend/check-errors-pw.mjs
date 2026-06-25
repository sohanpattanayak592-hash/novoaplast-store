import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to production...');
  await page.goto('https://novoplast-store.vercel.app', { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.log(e));
  
  await browser.close();
})();
