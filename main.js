const puppeteer = require('puppeteer');
const env = require('./env');

const main = async () => {
  const browser = await puppeteer.launch({
    // ignoreHTTPSErrors: true,  
    headless: true, // change to true if you want the chrome browser to pop up!
    args: ['--start-maximized'],
    // executablePath: './chrome-win/chrome.exe',
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      }
  });
  const page = await browser.newPage();
  await page.goto('https://www.itemmania.com/portal/user/p_login_form.html',{ waitUntil: 'networkidle0' });
  await page.focus('#user_id');
  await page.keyboard.type(env.TEST_ID);
  await page.focus('#user_password');
  await page.keyboard.type(env.TEST_PW);

  await Promise.all([
    page.click('.g_button'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  await page.goto('http://www.itemmania.com/myroom/',{ waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'myroom.png' });
  // await page.waitFor(5550);

  await browser.close();
};

main();