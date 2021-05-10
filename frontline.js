const puppeteer = require('puppeteer');

console.log("Running");

(async () => {
  console.log("Starting");
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,800']});
  const page = await browser.newPage();
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  await page.goto('https://app.healthofficeportal.com/SHM_Lafayette_School_District/Portal/Login.aspx');
  await page.type('#Login1_UserName', process.env['USER_LOGIN']);
  await page.type('#Login1_Password', process.env['USER_PASS']);
  await page.click('#Login1_LoginButton');
  await page.waitForNavigation();
  await page.click('a[title="Click to Open Questionnaire Form"]');
  await page.waitForNavigation();

  await page.click('#ctl00_Body_ddlAttending_Input');

  await page.waitForXPath('//div/ul/li[@class="rcbItem"]');
  await page.waitFor(2000);
  const buttons = await page.$x('//div/ul/li[@class="rcbItem" and contains(text(), "Yes")]');
  console.log(buttons);
  await buttons[0].click();
  await page.waitForSelector('#ctl00_Body_btnNext');
  await page.click('#ctl00_Body_btnNext');

  await page.waitForNavigation();
  await page.click('#ctl00_Body_btnSave');
  await browser.close();
})();
