var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;

exports.insidehookLogo = function(driver) {
  
  var logo = driver.findElement(webdriver.By.css('.name a'));
  logo.click();
  driver.wait(webdriver.until.stalenessOf(logo), 10000);

  driver.getCurrentUrl().then(function(url) {
    expect(url).to.equal("http://www-stage.insidehook.com/");
  });

};
