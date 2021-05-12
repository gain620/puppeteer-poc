const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.itemmania.com/', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({ path: 'item.pdf', format: 'a4' });

  await browser.close();
})();