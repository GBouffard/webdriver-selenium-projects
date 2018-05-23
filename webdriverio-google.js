var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

webdriverio
    .remote(options)
    .init()
    .url('http://www.google.com')
    .saveScreenshot('goog.png')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .setValue('#lst-ib',"Thulium")
    .click('*[name="btnK"]')
    .pause(3000)
    .end()
    .catch(function(err) {
        console.log(err);
    });