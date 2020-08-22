const puppeteer = require('puppeteer');
const cookies = require('./options');
var argv = require('minimist')(process.argv.slice(2));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/google-chrome',
  });
  const page = await browser.newPage();

  // optional viewport
  await page.setViewport({
    width: 1124,
    height: 768,
  });

  // get the user cookies, posted in options.js
  await page.setCookie(...cookies);
  page.goto(`https://twitch.tv/${argv.stream}`, { waitUntil: 'networkidle0' });

  setInterval(async () => {
    // click to the bonus +50
    try {
      await page.evaluate(() => {

        // class name of bonus buttom twitch

        let className = 'tw-button tw-button--success tw-interactive';

        let element = document.getElementsByClassName(className)[0];
        element.click();
      });
      console.log('+50');
    } catch (err) {}

    // pass adult restriction

    try {
      await page.evaluate(() => {

        // class name of adult restriction button

        let className =
          'tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative';

        let element = document.getElementsByClassName(className)[1];
        element.click();
      });
    } catch (err) {}
  }, 10000);
})();
