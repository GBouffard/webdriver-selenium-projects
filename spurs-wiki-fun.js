const webdriver = require('selenium-webdriver');
const {
  By,
  Key,
  until
} = require('selenium-webdriver');
require("chromedriver");

const TIMEOUT = 5000;

const browser = new webdriver
  .Builder()
  .usingServer()
  .withCapabilities({
    'browserName': 'chrome'
  })
  .build();
 
// browser.manage().window().setSize(1280, 720)

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function closeBrowser() {
    console.log('Closing with 5 championships!');
    browser.quit();
}

function isPageOpenedSuccessfully(title, comparator) {
  const result = title === `${comparator} - Wikipedia` ? `${comparator} Page Opened Successfully` : 'There is an error';
  console.log(result)
}

console.log('Drafting!');
browser
  .get('https://en.wikipedia.org/wiki/San_Antonio_Spurs');


browser
  .wait(until.elementLocated(By.css('img[alt="San Antonio Spurs logo"]')), TIMEOUT)


  .then(() => {
    browser
      .getTitle()
      .then((title) => isPageOpenedSuccessfully(title, 'San Antonio Spurs'));
  })


  .then(() => {
    browser
      .findElements(By.css('[href^="/wiki/"]'))
      .then((links) => console.log('Found', links.length, 'Wiki links.'));
   })


  .then(() => {
    browser
      .findElement(By.css('[href^="/wiki/Tim_Duncan"]'))
      .click();
  });


browser
  .wait(until.elementLocated(By.css('img[alt="Tim Duncan.jpg"]')), TIMEOUT)


  .then(() => {
    browser
      .getTitle()
      .then((title) => isPageOpenedSuccessfully(title, 'Tim Duncan'));
  })

  .then(() => {
  	const wikiInput = browser.findElement(By.id('searchInput'));

    wikiInput
      .sendKeys('Manu Ginóbili', Key.ENTER);
  })



browser
  .wait(until.elementLocated(By.css('img[alt="Manu Ginóbili (cropped 2).jpg"]')), TIMEOUT)


  .then(() => {
    browser
      .getTitle()
      .then((title) => isPageOpenedSuccessfully(title, 'Manu Ginóbili'));
  });

browser
  .sleep(10000)
  .then(closeBrowser, handleFailure);
