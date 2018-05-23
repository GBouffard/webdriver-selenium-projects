var secrets = require('./secrets.js');

const webdriverio = require('webdriverio');
const options = {
    desiredCapabilities: {
        browserName: 'firefox'
        // browserName: 'chrome'
    }
};

const browser = webdriverio
  .remote(options)
  .init();

const notLoggedIn = () => browser.isExisting('.btn btn-primary btn-lg btn-login'[0]);

const logIn = () => {
  if (notLoggedIn()) {
    console.log('Logging in');
    browser
      .url('https://ticket.thameslinkrailway.com/search?modal=login')
      .setValue('#username', secrets.username)
      .setValue('#password', secrets.password)
      .click('.continue btn-lg pull-right btn btn-primary'[0])
      .pause(3000)
  } else {
    console.log('Already logged in');
  }
}

/* login process */
browser
  .url('https://ticket.thameslinkrailway.com')
  // waitForVisible / waitForExist don't seem to work so using a pause instead.
  // .waitForVisible('.header__logo active', 3000)
  .pause(3000)
  .then(() => logIn())
