/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;


/**
 *  InsideHook logo clicks through to the homepage
 */
exports.insidehookLogo = function(driver) {
  
  var logo = driver.findElement(webdriver.By.css('.title-area a'));
  logo.click();
  
  driver.wait(webdriver.until.stalenessOf(logo), 10000);
  driver.getCurrentUrl().then(function(url) {

    expect(url, "InsideHook logo won't direct to homepage").
    	to.equal("http://www-stage.insidehook.com/");
  });

};
