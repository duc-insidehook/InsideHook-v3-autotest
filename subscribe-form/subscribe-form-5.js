var webdriver = require('selenium-webdriver'),
    chai = require('chai'),
    expect = chai.expect,
    testEmail = 'valid-email@insidehook.com',
    subscribeForm3 = require('./subscribe-form-3');
chai.use(require('chai-as-promised'));
    
exports.validInput = function(driver, formPosition) {

  // open Subscribe Form and get form elements
  var formElements = subscribeForm3.displayForm(driver, formPosition);
  // [description, emailInput, zipInput, joinButton, termsAndCons, emailError, termsError]
  var emailInput = formElements[1];
  var joinButton = formElements[3];
  var thxForm = driver.findElement(webdriver.By.css("#modal-sign-thx"));

  // subscribe with valid email
  emailInput.sendKeys(testEmail);
  joinButton.submit(); 
  driver.wait(webdriver.until.elementIsVisible(thxForm), 5000);
  
  return thxForm;

}
