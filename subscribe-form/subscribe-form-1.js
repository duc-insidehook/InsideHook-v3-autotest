/**
 *  Import Modules
 */
var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-as-promised'));


/**
 *  Subscribe form pops up after clicking subscribe hyperlink
 */    
exports.openForm = function(driver, formPosition) {

  if( formPosition == 'top') {
    var subscribeButton = driver.findElement(webdriver.By.linkText("SUBSCRIBE"));
  	var signUpForm = driver.findElement(webdriver.By.css("#modal-sign-up"));
    subscribeButton.click(); 
	  driver.wait(webdriver.until.elementIsVisible(signUpForm), 5000);
    driver.sleep(1000);
  }
  else if( formPosition == 'right') {
    // wait until the sign up form to be loaded, timeout 10s
    driver.wait(webdriver.until.elementLocated(webdriver.By.css(".col-signup.signup")), 10000);
  	var signUpForm = driver.findElement(webdriver.By.css(".col-signup.signup"));
  	expect(signUpForm.isDisplayed()).to.eventually.equal(true);
  } 
  else if( formPosition == 'bot') {
    var signUpForm = driver.findElement(webdriver.By.css(".global-footer .visible-for-medium-up"));
    expect(signUpForm.isDisplayed()).to.eventually.equal(true);
  } 
  else return null;

  return signUpForm;
  
}
