import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  console.log("Page loaded. Moving mouse...");
  
  await page.mouse.move(100, 100);
  await page.waitForTimeout(1000);
  await page.mouse.move(500, 500);
  await page.waitForTimeout(1000);
  
  console.log("Mouse moved.");
  await browser.close();
})();
